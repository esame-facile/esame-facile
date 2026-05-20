import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";
import { generateToken, getDownloadExpiry } from "@/lib/tokens";
import { sendPurchaseEmail } from "@/lib/email";
import { DOWNLOAD_CONFIG, SITE_CONFIG } from "@/lib/constants";
import { randomUUID } from "crypto";
import { readStore, writeStore } from "@/lib/affiliate-store";
import { sendPushNotifications } from "@/lib/web-push-server";

export async function POST(req: NextRequest) {
  // API key auth
  const apiKey = req.headers.get("x-api-key");
  if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Parse body
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { email, ebook, discount_code } = body;

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "email is required" }, { status: 400 });
  }
  if (!ebook || typeof ebook !== "string") {
    return NextResponse.json({ error: "ebook is required" }, { status: 400 });
  }

  const cleanEmail = email.trim().toLowerCase();
  const cleanEbook = ebook.trim();

  const supabase = createAdminClient();

  // 1. Log inbound order
  const { data: inboundOrder, error: inboundError } = await supabase
    .from("inbound_orders")
    .insert({
      email: cleanEmail,
      ebook: cleanEbook,
      discount_code:
        typeof discount_code === "string" && discount_code.trim()
          ? discount_code.trim()
          : null,
    })
    .select("id")
    .single();

  if (inboundError) {
    console.error("[admin/ingest] inbound_orders insert:", inboundError);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  // 2. Find matching product (slug exact → slug partial → name partial)
  const { data: products } = await supabase
    .from("products")
    .select("id, name, slug, price, file_path")
    .eq("is_active", true);

  const ebookLower = cleanEbook.toLowerCase().replace(/\s+/g, "-");
  const product = products?.find(
    (p) =>
      p.slug === ebookLower ||
      p.slug === cleanEbook.toLowerCase() ||
      p.name.toLowerCase().includes(cleanEbook.toLowerCase()) ||
      cleanEbook.toLowerCase().includes(p.slug)
  ) ?? null;

  if (!product) {
    console.error(`[admin/ingest] No product match for ebook: "${cleanEbook}"`);
    return NextResponse.json(
      { success: true, id: inboundOrder.id, warning: "product_not_found" },
      { status: 201 }
    );
  }

  // 3. Create order (fake session ID for ingest orders)
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      stripe_session_id: `ingest_${randomUUID()}`,
      customer_email: cleanEmail,
      total: product.price,
      status: "completed",
    })
    .select("id")
    .single();

  if (orderError || !order) {
    console.error("[admin/ingest] order insert:", orderError);
    return NextResponse.json(
      { success: true, id: inboundOrder.id, warning: "order_create_failed" },
      { status: 201 }
    );
  }

  // 4. Create order item
  const { data: orderItem, error: itemError } = await supabase
    .from("order_items")
    .insert({
      order_id: order.id,
      product_id: product.id,
      price: product.price,
      product_name: product.name,
    })
    .select("id")
    .single();

  if (itemError || !orderItem) {
    console.error("[admin/ingest] order_item insert:", itemError);
    return NextResponse.json(
      { success: true, id: inboundOrder.id, warning: "item_create_failed" },
      { status: 201 }
    );
  }

  // 5. Create download token
  const token = generateToken();
  await supabase.from("download_tokens").insert({
    order_item_id: orderItem.id,
    product_id: product.id,
    token,
    max_downloads: DOWNLOAD_CONFIG.maxDownloads,
    expires_at: getDownloadExpiry().toISOString(),
  });

  // 6. Send email via Resend
  try {
    await sendPurchaseEmail({
      order_id: order.id,
      customer_email: cleanEmail,
      items: [
        {
          product_name: product.name,
          price: product.price,
          download_url: `${SITE_CONFIG.url}/scarica/${token}`,
        },
      ],
      total: product.price,
    });
  } catch (emailError) {
    // Don't fail the request — token is already created
    console.error("[admin/ingest] sendPurchaseEmail:", emailError);
  }

  // 7. Record sale + push notification if coupon code matches an affiliate
  if (typeof discount_code === "string" && discount_code.trim()) {
    try {
      const affiliateStore = await readStore();
      const affiliate = affiliateStore.affiliates.find(
        (a) => a.code.toLowerCase() === discount_code.trim().toLowerCase()
      );
      if (affiliate) {
        // Always record the sale in the store
        affiliateStore.sales.push({
          id: randomUUID(),
          affiliate_id: affiliate.id,
          amount: 10,
          paid_at: null,
          created_at: new Date().toISOString(),
        });

        // Send push notification if subscriptions exist
        if (affiliate.push_subscriptions?.length) {
          const expired = await sendPushNotifications(affiliate.push_subscriptions, {
            title: "Nuova vendita!",
            body: `${product.name} — commissione in arrivo`,
          });
          // Clean up expired subscriptions
          if (expired.length > 0) {
            const idx = affiliateStore.affiliates.findIndex((a) => a.id === affiliate.id);
            affiliateStore.affiliates[idx].push_subscriptions =
              affiliate.push_subscriptions.filter(
                (s) => !expired.some((e) => e.endpoint === s.endpoint)
              );
          }
        }

        await writeStore(affiliateStore);
      }
    } catch (pushErr) {
      console.error("[admin/ingest] push notification:", pushErr);
    }
  }

  return NextResponse.json({ success: true, id: inboundOrder.id }, { status: 201 });
}
