import { pbkdf2Sync, randomBytes, timingSafeEqual, createHmac } from "crypto";

const ITERATIONS = 100_000;
const KEYLEN = 64;
const DIGEST = "sha512";

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, salt, ITERATIONS, KEYLEN, DIGEST).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const candidate = pbkdf2Sync(password, salt, ITERATIONS, KEYLEN, DIGEST).toString("hex");
  try {
    return timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(candidate, "hex"));
  } catch {
    return false;
  }
}

const getSecret = () => {
  const s = process.env.AFFILIATE_SESSION_SECRET;
  if (!s) throw new Error("AFFILIATE_SESSION_SECRET not set");
  return s;
};

export function signSessionCookie(affiliateId: string): string {
  const payload = Buffer.from(affiliateId).toString("base64url");
  const sig = createHmac("sha256", getSecret()).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function verifySessionCookie(cookie: string): string | null {
  const parts = cookie.split(".");
  if (parts.length !== 2) return null;
  const [payload, sig] = parts;
  const expected = createHmac("sha256", getSecret()).update(payload).digest("base64url");
  try {
    if (!timingSafeEqual(Buffer.from(sig, "base64url"), Buffer.from(expected, "base64url"))) return null;
  } catch {
    return null;
  }
  return Buffer.from(payload, "base64url").toString();
}
