import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";
import { SITE_CONFIG } from "@/lib/constants";

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "session_id richiesto" }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { data: order, error } = await supabase
    .from("orders")
    .select(`
      id, customer_email, total, status, created_at,
      order_items(
        id, product_name, price,
        download_tokens(token, expires_at, download_count, max_downloads)
      )
    `)
    .eq("stripe_session_id", sessionId)
    .single();

  if (error || !order) {
    return NextResponse.json({ error: "Ordine non trovato" }, { status: 404 });
  }

  const items = (order.order_items as {
    id: string;
    product_name: string;
    price: number;
    download_tokens: { token: string; expires_at: string; download_count: number; max_downloads: number }[];
  }[]).map((item) => {
    const token = item.download_tokens?.[0];
    return {
      product_name: item.product_name,
      price: item.price,
      download_url: token ? `${SITE_CONFIG.url}/scarica/${token.token}` : null,
      expires_at: token?.expires_at ?? null,
      downloads_left: token ? token.max_downloads - token.download_count : null,
    };
  });

  return NextResponse.json({
    id: order.id,
    email: order.customer_email,
    total: order.total,
    status: order.status,
    created_at: order.created_at,
    items,
  });
}
