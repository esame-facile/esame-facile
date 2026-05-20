import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionCookie } from "@/lib/affiliati-auth";
import { readStore, writeStore } from "@/lib/affiliate-store";
import type { PushSubscriptionJSON } from "@/lib/affiliate-store";

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const session = cookieStore.get("aff_session")?.value;
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const affiliateId = verifySessionCookie(session);
  if (!affiliateId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let subscription: PushSubscriptionJSON;
  try {
    subscription = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const store = await readStore();
  const idx = store.affiliates.findIndex((a) => a.id === affiliateId);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const existing = store.affiliates[idx].push_subscriptions ?? [];
  if (!existing.some((s) => s.endpoint === subscription.endpoint)) {
    store.affiliates[idx] = {
      ...store.affiliates[idx],
      push_subscriptions: [...existing, subscription],
    };
    await writeStore(store);
  }

  return NextResponse.json({ success: true });
}
