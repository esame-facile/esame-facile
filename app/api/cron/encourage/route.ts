import { NextRequest, NextResponse } from "next/server";
import { readStore, writeStore } from "@/lib/affiliate-store";
import { sendPushNotifications } from "@/lib/web-push-server";

export const dynamic = "force-dynamic";

// Promemoria "creator": la costanza batte la viralità. 3 contenuti al giorno
// (21 a settimana) portano vendite organiche costanti più di 1 video virale a settimana.
const FRASI = [
  "3 video oggi battono 1 virale a settimana. La costanza vince 🎯",
  "Meglio 3 contenuti mediocri oggi che 1 perfetto tra una settimana. Pubblica! 💪",
  "21 contenuti a settimana > 1 capolavoro. Le vendite costanti nascono così 📈",
  "Non aspettare il video perfetto: pubblica 3 cose oggi e crea il flusso 🌊",
  "1 virale = vendite per 2 giorni. 3 al giorno = vendite ogni giorno 🔥",
  "Costanza batte perfezione. 3 contenuti al giorno, ogni giorno 🚀",
  "Il segreto non è il colpo di fortuna, è la ripetizione. Posta 3 volte oggi! ⚡",
  "La quantità crea l'abitudine, l'abitudine crea i risultati. Crea 3 contenuti! 🎬",
];

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const auth = req.headers.get("authorization");
  const key = req.nextUrl.searchParams.get("key");
  if (!secret || (auth !== `Bearer ${secret}` && key !== secret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const slot = req.nextUrl.searchParams.get("slot");
  const title = slot === "pomeriggio" ? "Spinta del pomeriggio 💪" : "Buongiorno, creator! 🎬";
  const body = FRASI[Math.floor(Math.random() * FRASI.length)];

  const store = await readStore();
  const subs = [
    ...store.affiliates.flatMap((a) => a.push_subscriptions ?? []),
    ...(store.admin_subscriptions ?? []),
  ];
  if (subs.length === 0) {
    return NextResponse.json({ ok: true, sent: 0 });
  }

  const expired = await sendPushNotifications(subs, { title, body, url: "/affiliati/dashboard" });

  if (expired.length > 0) {
    const dead = new Set(expired.map((e) => e.endpoint));
    for (const a of store.affiliates) {
      if (a.push_subscriptions?.length) {
        a.push_subscriptions = a.push_subscriptions.filter((s) => !dead.has(s.endpoint));
      }
    }
    if (store.admin_subscriptions?.length) {
      store.admin_subscriptions = store.admin_subscriptions.filter((s) => !dead.has(s.endpoint));
    }
    await writeStore(store);
  }

  return NextResponse.json({ ok: true, sent: subs.length, expired: expired.length });
}
