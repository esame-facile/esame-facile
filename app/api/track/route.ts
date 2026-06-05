import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";
import { sendTelegram } from "@/lib/telegram";
import { SITE_CONFIG } from "@/lib/constants";

const ALLOWED = new Set(["view", "scroll", "buy_click", "exit"]);

// Soglie per l'alert "funnel rotto" (tanti click acquista, zero ordini)
const FUNNEL_WINDOW_MIN = 30;
const FUNNEL_MIN_CLICKS = 6;
const ALERT_COOLDOWN_MIN = 60;

function clip(s: unknown, n: number): string | null {
  if (typeof s !== "string") return null;
  return s.slice(0, n);
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(await req.text());
  } catch {
    return NextResponse.json({ error: "bad body" }, { status: 400 });
  }

  const event = clip(body.event, 32);
  if (!event || !ALLOWED.has(event)) {
    return NextResponse.json({ error: "bad event" }, { status: 400 });
  }

  const row = {
    session_id: clip(body.session_id, 64) ?? "anon",
    event,
    page: clip(body.page, 200),
    product_slug: clip(body.product_slug, 80),
    value: typeof body.value === "number" && isFinite(body.value) ? body.value : null,
    meta: body.meta && typeof body.meta === "object" ? body.meta : null,
  };

  const supabase = createAdminClient();
  await supabase.from("landing_events").insert(row);

  // Rilevamento problema in tempo reale: solo sui buy_click (eventi rari)
  if (event === "buy_click") {
    try {
      await checkFunnel(supabase);
    } catch (err) {
      console.error("[track] funnel check:", err);
    }
  }

  return NextResponse.json({ ok: true });
}

async function checkFunnel(
  supabase: ReturnType<typeof createAdminClient>
): Promise<void> {
  const now = Date.now();
  const cooldownSince = new Date(now - ALERT_COOLDOWN_MIN * 60_000).toISOString();
  const windowSince = new Date(now - FUNNEL_WINDOW_MIN * 60_000).toISOString();

  // Debounce: già allertato di recente?
  const { count: recentAlerts } = await supabase
    .from("landing_events")
    .select("id", { count: "exact", head: true })
    .eq("event", "alert_sent")
    .gte("created_at", cooldownSince);
  if ((recentAlerts ?? 0) > 0) return;

  const { count: clicks } = await supabase
    .from("landing_events")
    .select("id", { count: "exact", head: true })
    .eq("event", "buy_click")
    .gte("created_at", windowSince);

  if ((clicks ?? 0) < FUNNEL_MIN_CLICKS) return;

  const { count: orders } = await supabase
    .from("orders")
    .select("id", { count: "exact", head: true })
    .eq("status", "completed")
    .gte("created_at", windowSince);

  if ((orders ?? 0) > 0) return; // ci sono ordini → tutto ok

  // Problema: tanti click, zero ordini
  const msg =
    `🚨 <b>Funnel a rischio</b>\n\n` +
    `${clicks} click su "Acquista ora" negli ultimi ${FUNNEL_WINDOW_MIN} min, ` +
    `ma <b>0 ordini completati</b>.\n` +
    `Possibile problema su checkout / link / sconto.\n\n` +
    `Controlla: ${SITE_CONFIG.url}`;
  const sent = await sendTelegram(msg);

  // Marker di cooldown (anche se l'invio fallisce, evita spam di tentativi)
  await supabase.from("landing_events").insert({
    session_id: "system",
    event: "alert_sent",
    meta: { kind: "funnel", clicks: clicks ?? 0, orders: orders ?? 0, sent },
  });
}
