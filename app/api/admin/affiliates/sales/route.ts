import { NextRequest, NextResponse } from "next/server";
import { readStore, writeStore, type Sale } from "@/lib/affiliate-store";
import { randomUUID } from "crypto";

function isAuthorized(request: NextRequest): boolean {
  const session = request.cookies.get("admin_session")?.value;
  return !!session && session === process.env.ADMIN_PASSWORD;
}

// POST /api/admin/affiliates/sales — add a sale
export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { affiliate_id, amount } = body;

  if (!affiliate_id || ![10, 20].includes(amount)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const store = await readStore();
  const newSale: Sale = {
    id: randomUUID(),
    affiliate_id,
    amount: amount as 10 | 20,
    paid_at: null,
    created_at: new Date().toISOString(),
  };

  store.sales.push(newSale);
  await writeStore(store);

  return NextResponse.json(newSale, { status: 201 });
}
