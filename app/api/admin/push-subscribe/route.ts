import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readStore, writeStore } from "@/lib/affiliate-store";
import type { PushSubscriptionJSON } from "@/lib/affiliate-store";

export async function POST(req: NextRequest) {
  const session = cookies().get("admin_session")?.value;
  if (!session || session !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let subscription: PushSubscriptionJSON;
  try {
    subscription = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const store = await readStore();
  const existing = store.admin_subscriptions ?? [];
  if (!existing.some((s) => s.endpoint === subscription.endpoint)) {
    store.admin_subscriptions = [...existing, subscription];
    await writeStore(store);
  }

  return NextResponse.json({ success: true });
}
