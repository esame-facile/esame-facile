import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";
import { generateToken, getDownloadExpiry } from "@/lib/tokens";
import { sendPurchaseEmail } from "@/lib/email";
import { DOWNLOAD_CONFIG, SITE_CONFIG } from "@/lib/constants";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-api-key",
};

// Gestisce preflight CORS
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(request: NextRequest) {
  // Auth: verifica API key
  const apiKey = request.headers.get("x-api-key");
  if (!apiKey || apiKey !== process.env.SEND_KIT_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: CORS_HEADERS });
  }

  let body: { esame?: string; email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400, headers: CORS_HEADERS });
  }

  const { esame, email } = body;

  if (!esame || typeof esame !== "string") {
    return NextResponse.json({ error: "Parametro 'esame' mancante" }, { status: 400, headers: CORS_HEADERS });
  }
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "Parametro 'email' non valido" }, { status: 400, headers: CORS_HEADERS });
  }

  const supabase = createAdminClient();

  // Trova il prodotto per slug
  const { data: product, error: productError } = await supabase
    .from("products")
    .select("id, name, price, slug")
    .eq("slug", esame)
    .single();

  if (productError || !product) {
    return NextResponse.json(
      { error: `Prodotto '${esame}' non trovato` },
      { status: 404, headers: CORS_HEADERS }
    );
  }

  // Crea ordine completed
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      customer_email: email,
      total: product.price,
      status: "completed",
      stripe_session_id: `manual_${Date.now()}`,
    })
    .select()
    .single();

  if (orderError || !order) {
    console.error("[send-kit] Errore creazione ordine:", orderError);
    return NextResponse.json({ error: "Errore interno" }, { status: 500, headers: CORS_HEADERS });
  }

  // Crea order_item
  const { data: orderItem, error: itemError } = await supabase
    .from("order_items")
    .insert({
      order_id: order.id,
      product_id: product.id,
      price: product.price,
      product_name: product.name,
    })
    .select()
    .single();

  if (itemError || !orderItem) {
    console.error("[send-kit] Errore creazione order_item:", itemError);
    return NextResponse.json({ error: "Errore interno" }, { status: 500, headers: CORS_HEADERS });
  }

  // Genera token di download
  const token = generateToken();
  const { error: tokenError } = await supabase.from("download_tokens").insert({
    order_item_id: orderItem.id,
    product_id: product.id,
    token,
    max_downloads: DOWNLOAD_CONFIG.maxDownloads,
    download_count: 0,
    expires_at: getDownloadExpiry().toISOString(),
  });

  if (tokenError) {
    console.error("[send-kit] Errore creazione token:", tokenError);
    return NextResponse.json({ error: "Errore interno" }, { status: 500, headers: CORS_HEADERS });
  }

  const downloadUrl = `${SITE_CONFIG.url}/scarica/${token}`;

  // Invia email
  try {
    await sendPurchaseEmail({
      order_id: order.id,
      customer_email: email,
      items: [
        {
          product_name: product.name,
          price: product.price,
          download_url: downloadUrl,
        },
      ],
      total: product.price,
    });
  } catch (emailError) {
    console.error("[send-kit] Errore invio email:", emailError);
    return NextResponse.json({
      success: true,
      order_id: order.id,
      download_url: downloadUrl,
      email_error: emailError instanceof Error ? emailError.message : String(emailError),
    }, { headers: CORS_HEADERS });
  }

  return NextResponse.json({
    success: true,
    order_id: order.id,
    download_url: downloadUrl,
  }, { headers: CORS_HEADERS });
}
