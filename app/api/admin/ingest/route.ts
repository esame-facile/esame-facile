import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  // API key auth
  const apiKey = req.headers.get("x-api-key");
  if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Parse body
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { email, ebook, discount_code } = body;

  // Validate required fields
  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "email is required" }, { status: 400 });
  }
  if (!ebook || typeof ebook !== "string") {
    return NextResponse.json({ error: "ebook is required" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("inbound_orders")
    .insert({
      email: email.trim().toLowerCase(),
      ebook: ebook.trim(),
      discount_code:
        typeof discount_code === "string" && discount_code.trim()
          ? discount_code.trim()
          : null,
    })
    .select("id")
    .single();

  if (error) {
    console.error("[admin/ingest]", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  return NextResponse.json({ success: true, id: data.id }, { status: 201 });
}
