import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

async function verifyAffSession(cookie: string, secret: string): Promise<boolean> {
  const parts = cookie.split(".");
  if (parts.length !== 2) return false;
  const [payload, sig] = parts;
  try {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      enc.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );
    const b64 = sig.replace(/-/g, "+").replace(/_/g, "/");
    const padded = b64 + "=".repeat((4 - b64.length % 4) % 4);
    const sigBytes = Uint8Array.from(atob(padded), (c) => c.charCodeAt(0));
    return await crypto.subtle.verify("HMAC", key, sigBytes, enc.encode(payload));
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login" || pathname.startsWith("/api/admin/")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const session = request.cookies.get("admin_session")?.value;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword || session !== adminPassword) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  if (pathname === "/affiliati" || pathname.startsWith("/api/affiliati/")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/affiliati/")) {
    const cookie = request.cookies.get("aff_session")?.value;
    const secret = process.env.AFFILIATE_SESSION_SECRET;
    if (!cookie || !secret || !(await verifyAffSession(cookie, secret))) {
      return NextResponse.redirect(new URL("/affiliati", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/affiliati/:path*"],
};
