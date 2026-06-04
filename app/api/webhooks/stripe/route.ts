import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase-server";
import { generateToken, getDownloadExpiry } from "@/lib/tokens";
import { DOWNLOAD_CONFIG, SITE_CONFIG } from "@/lib/constants";
import { sendPurchaseEmail } from "@/lib/email";

type DbProduct = {
  id: string;
  name: string;
  price: number;
  file_path: string | null;
  stripe_payment_link: string | null;
};

const norm = (s: string | null | undefined) =>
  (s ?? "").toLowerCase().replace(/\s+/g, " ").trim();

// Map a Stripe line item to one of our products (by name, then payment link).
function mapProduct(
  li: Stripe.LineItem,
  products: DbProduct[],
  plinkUrl: string | null
): DbProduct | null {
  const prod = li.price?.product;
  const stripeName =
    prod && typeof prod === "object" && "name" in prod ? prod.name : null;
  const name = norm(stripeName ?? li.description);

  if (name) {
    const exact = products.find((p) => norm(p.name) === name);
    if (exact) return exact;
    const partial = products.find(
      (p) => norm(p.name).includes(name) || name.includes(norm(p.name))
    );
    if (partial) return partial;
  }
  if (plinkUrl) {
    const byLink = products.find((p) => p.stripe_payment_link === plinkUrl);
    if (byLink) return byLink;
  }
  return null;
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("[webhook] signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const supabase = createAdminClient();

  try {
    // Idempotency 1: this webhook already fulfilled this exact session
    const { data: existing } = await supabase
      .from("orders")
      .select("id")
      .eq("stripe_session_id", session.id)
      .maybeSingle();
    if (existing) {
      return NextResponse.json({ received: true, dedup: "session" });
    }

    // Expand line items + their products + the payment link
    const full = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ["line_items.data.price.product", "payment_link"],
    });

    const email = (full.customer_details?.email ?? full.customer_email ?? "")
      .trim()
      .toLowerCase();
    const lineItems = full.line_items?.data ?? [];
    const plinkUrl =
      full.payment_link && typeof full.payment_link !== "string"
        ? full.payment_link.url
        : null;

    if (lineItems.length === 0) {
      console.error("[webhook] session has no line items:", session.id);
      return NextResponse.json({ received: true, warning: "no_line_items" });
    }

    const { data: products } = await supabase
      .from("products")
      .select("id, name, price, file_path, stripe_payment_link")
      .eq("is_active", true);
    const productList = (products ?? []) as DbProduct[];

    // Idempotency 2: products already fulfilled for this email recently
    // (e.g. by the elitewebconsult → ingest automation). Avoids duplicates.
    const alreadyFulfilled = new Set<string>();
    if (email) {
      const cutoff = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString();
      const { data: recent } = await supabase
        .from("orders")
        .select("created_at, order_items(product_id)")
        .eq("customer_email", email)
        .gte("created_at", cutoff);
      for (const o of recent ?? []) {
        for (const it of (o.order_items as { product_id: string }[] | null) ?? []) {
          alreadyFulfilled.add(it.product_id);
        }
      }
    }

    // Decide what to fulfill
    const toFulfill: DbProduct[] = [];
    for (const li of lineItems) {
      const product = mapProduct(li, productList, plinkUrl);
      if (!product) {
        console.error("[webhook] no product match for line item:", li.description);
        continue;
      }
      if (alreadyFulfilled.has(product.id)) continue; // already delivered
      if (!toFulfill.some((p) => p.id === product.id)) toFulfill.push(product);
    }

    if (toFulfill.length === 0) {
      // Nothing new to do (already fulfilled elsewhere, or unmatched)
      return NextResponse.json({ received: true, dedup: "already_fulfilled" });
    }

    // Create the order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        stripe_session_id: session.id,
        stripe_payment_intent_id: (session.payment_intent as string) ?? null,
        customer_email: email,
        total: full.amount_total ?? toFulfill.reduce((s, p) => s + p.price, 0),
        status: "completed",
      })
      .select("id")
      .single();

    if (orderError || !order) {
      console.error("[webhook] order insert failed:", orderError);
      return NextResponse.json({ error: "Order create failed" }, { status: 500 });
    }

    // Create items + download tokens
    const downloadLinks: { product_name: string; price: number; download_url: string }[] = [];
    for (const product of toFulfill) {
      const { data: orderItem } = await supabase
        .from("order_items")
        .insert({
          order_id: order.id,
          product_id: product.id,
          price: product.price,
          product_name: product.name,
        })
        .select("id")
        .single();
      if (!orderItem) continue;

      const token = generateToken();
      await supabase.from("download_tokens").insert({
        order_item_id: orderItem.id,
        product_id: product.id,
        token,
        max_downloads: DOWNLOAD_CONFIG.maxDownloads,
        expires_at: getDownloadExpiry().toISOString(),
      });

      downloadLinks.push({
        product_name: product.name,
        price: product.price,
        download_url: `${SITE_CONFIG.url}/scarica/${token}`,
      });
    }

    // Send the email with the download links
    if (email && downloadLinks.length > 0) {
      try {
        await sendPurchaseEmail({
          order_id: order.id,
          customer_email: email,
          items: downloadLinks,
          total: full.amount_total ?? downloadLinks.reduce((s, l) => s + l.price, 0),
        });
      } catch (emailError) {
        console.error("[webhook] sendPurchaseEmail:", emailError);
      }
    }

    return NextResponse.json({ received: true, fulfilled: downloadLinks.length });
  } catch (err) {
    console.error("[webhook] processing error:", err);
    return NextResponse.json({ error: "Processing error" }, { status: 500 });
  }
}
