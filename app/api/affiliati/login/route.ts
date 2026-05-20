import { NextRequest, NextResponse } from "next/server";
import { readStore } from "@/lib/affiliate-store";
import { verifyPassword, signSessionCookie } from "@/lib/affiliati-auth";

export async function POST(req: NextRequest) {
  let body: { username?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { username, password } = body;
  if (!username || !password) {
    return NextResponse.json({ error: "Credenziali mancanti" }, { status: 400 });
  }

  const store = await readStore();
  const affiliate = store.affiliates.find(
    (a) => a.username === username.trim().toLowerCase()
  );

  if (!affiliate || !verifyPassword(password, affiliate.password_hash)) {
    return NextResponse.json({ error: "Credenziali errate" }, { status: 401 });
  }

  const cookieValue = signSessionCookie(affiliate.id);
  const res = NextResponse.json({ success: true });
  res.cookies.set("aff_session", cookieValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
  return res;
}
