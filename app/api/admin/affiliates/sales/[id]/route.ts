import { NextRequest, NextResponse } from "next/server";
import { readStore, writeStore } from "@/lib/affiliate-store";

function isAuthorized(request: NextRequest): boolean {
  const session = request.cookies.get("admin_session")?.value;
  return !!session && session === process.env.ADMIN_PASSWORD;
}

// PATCH /api/admin/affiliates/sales/[id] — toggle paid status
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const store = await readStore();
  const idx = store.sales.findIndex((s) => s.id === params.id);

  if (idx === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  store.sales[idx] = {
    ...store.sales[idx],
    paid_at: store.sales[idx].paid_at ? null : new Date().toISOString(),
  };

  await writeStore(store);
  return NextResponse.json(store.sales[idx]);
}

// DELETE /api/admin/affiliates/sales/[id] — remove a sale
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const store = await readStore();
  const idx = store.sales.findIndex((s) => s.id === params.id);

  if (idx === -1) {
    return new NextResponse(null, { status: 204 });
  }

  store.sales.splice(idx, 1);
  await writeStore(store);

  return new NextResponse(null, { status: 204 });
}
