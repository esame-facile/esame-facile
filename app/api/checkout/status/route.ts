import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";
import { stripe } from "@/lib/stripe";
import { SITE_CONFIG } from "@/lib/constants";

type OrderRow = {
  id: string;
  customer_email: string;
  total: number;
  status: string;
  created_at: string;
  order_items: {
    id: string;
    product_name: string;
    price: number;
    download_tokens: { token: string; expires_at: string; download_count: number; max_downloads: number }[];
  }[];
};

const ORDER_SELECT = `
  id, customer_email, total, status, created_at,
  order_items(
    id, product_name, price,
    download_tokens(token, expires_at, download_count, max_downloads)
  )
`;

function serialize(order: OrderRow) {
  const items = (order.order_items ?? []).map((item) => {
    const token = item.download_tokens?.[0];
    return {
      product_name: item.product_name,
      price: item.price,
      download_url: token ? `${SITE_CONFIG.url}/scarica/${token.token}` : null,
      expires_at: token?.expires_at ?? null,
      downloads_left: token ? token.max_downloads - token.download_count : null,
    };
  });
  return {
    id: order.id,
    email: order.customer_email,
    total: order.total,
    status: order.status,
    created_at: order.created_at,
    items,
  };
}

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "session_id richiesto" }, { status: 400 });
  }

  const supabase = createAdminClient();

  // 1. Direct match by Stripe session id (webhook-created orders)
  const { data: order } = await supabase
    .from("orders")
    .select(ORDER_SELECT)
    .eq("stripe_session_id", sessionId)
    .maybeSingle();

  if (order) {
    return NextResponse.json(serialize(order as unknown as OrderRow));
  }

  // 2. Fallback: resolve the buyer's email from Stripe, then find their most
  //    recent completed order (covers orders created by the ingest automation
  //    under a different id, so the thank-you page still shows the download).
  if (sessionId.startsWith("cs_")) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      const email = (session.customer_details?.email ?? session.customer_email ?? "")
        .trim()
        .toLowerCase();
      if (email) {
        const { data: byEmail } = await supabase
          .from("orders")
          .select(ORDER_SELECT)
          .eq("customer_email", email)
          .eq("status", "completed")
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();
        if (byEmail) {
          return NextResponse.json(serialize(byEmail as unknown as OrderRow));
        }
      }
    } catch (err) {
      console.error("[checkout/status] stripe fallback:", err);
    }
  }

  return NextResponse.json({ error: "Ordine non trovato" }, { status: 404 });
}
