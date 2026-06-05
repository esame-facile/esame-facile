import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";
import { sendTelegram } from "@/lib/telegram";

export const dynamic = "force-dynamic";

type EvRow = { session_id: string; event: string; value: number | null; meta: Record<string, unknown> | null };

function pct(n: number, d: number): string {
  if (d <= 0) return "0%";
  return `${Math.round((n / d) * 100)}%`;
}

export async function GET(req: NextRequest) {
  // Auth: Vercel Cron invia "Authorization: Bearer <CRON_SECRET>"; oppure ?key= per trigger manuale
  const secret = process.env.CRON_SECRET;
  const auth = req.headers.get("authorization");
  const key = req.nextUrl.searchParams.get("key");
  if (!secret || (auth !== `Bearer ${secret}` && key !== secret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const hours = Math.min(168, Math.max(1, Number(req.nextUrl.searchParams.get("hours")) || 24));
  const since = new Date(Date.now() - hours * 3600_000).toISOString();
  const supabase = createAdminClient();

  const { data: rows } = await supabase
    .from("landing_events")
    .select("session_id, event, value, meta")
    .gte("created_at", since)
    .neq("event", "alert_sent")
    .limit(20000);
  const events = (rows ?? []) as EvRow[];

  const { count: orders } = await supabase
    .from("orders")
    .select("id", { count: "exact", head: true })
    .eq("status", "completed")
    .gte("created_at", since);

  const sessions = new Set(events.filter((e) => e.event === "view").map((e) => e.session_id));
  const nSessions = sessions.size;
  const nViews = events.filter((e) => e.event === "view").length;
  const buyClicks = events.filter((e) => e.event === "buy_click");
  const buyClickSessions = new Set(buyClicks.map((e) => e.session_id)).size;

  // Scroll: per sessione il massimo milestone raggiunto
  const reach: Record<number, Set<string>> = { 25: new Set(), 50: new Set(), 75: new Set(), 100: new Set() };
  for (const e of events) {
    if (e.event === "scroll" && typeof e.value === "number") {
      for (const m of [25, 50, 75, 100]) if (e.value >= m) reach[m].add(e.session_id);
    }
  }

  // Uscite: dove se ne vanno (maxScroll) + tempo medio
  const exits = events.filter((e) => e.event === "exit");
  const buckets = { "0-25%": 0, "25-50%": 0, "50-75%": 0, "75-100%": 0 };
  let totDur = 0, nDur = 0;
  for (const e of exits) {
    const ms = Number((e.meta as { maxScroll?: number })?.maxScroll ?? 0);
    if (ms < 25) buckets["0-25%"]++;
    else if (ms < 50) buckets["25-50%"]++;
    else if (ms < 75) buckets["50-75%"]++;
    else buckets["75-100%"]++;
    if (typeof e.value === "number") { totDur += e.value; nDur++; }
  }
  const avgSec = nDur > 0 ? Math.round(totDur / nDur / 1000) : 0;
  const nOrders = orders ?? 0;

  const msg =
    `📊 <b>Report landing — ultime ${hours}h</b>\n\n` +
    `👀 Visite: <b>${nViews}</b> · Sessioni: <b>${nSessions}</b>\n` +
    `📜 Scroll (su sessioni): 25%→${pct(reach[25].size, nSessions)} · 50%→${pct(reach[50].size, nSessions)} · 75%→${pct(reach[75].size, nSessions)} · 100%→${pct(reach[100].size, nSessions)}\n` +
    `🛒 Click "Acquista": <b>${buyClicks.length}</b> (da ${buyClickSessions} sessioni)\n` +
    `✅ Ordini completati: <b>${nOrders}</b>\n` +
    `📈 Conversione: <b>${pct(nOrders, nSessions)}</b> (ordini/sessioni)\n` +
    `⏱️ Tempo medio in pagina: <b>${avgSec}s</b>\n\n` +
    `🚪 Dove escono (max scroll):\n` +
    `   0-25%: ${buckets["0-25%"]} · 25-50%: ${buckets["25-50%"]} · 50-75%: ${buckets["50-75%"]} · 75-100%: ${buckets["75-100%"]}`;

  const sent = await sendTelegram(msg);
  return NextResponse.json({ ok: true, telegram_sent: sent, sessions: nSessions, views: nViews, buyClicks: buyClicks.length, orders: nOrders });
}
