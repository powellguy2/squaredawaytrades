import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * In-memory rate limiter.
 *
 * HONEST LIMIT: this map lives in one serverless instance's memory. It
 * resets on cold start and is not shared across instances, so it slows
 * down casual abuse but is not a hard guarantee. If signup volume ever
 * justifies it, move this to Upstash Redis or Vercel KV — the interface
 * below is small enough to swap in place.
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 10_000) hits.clear(); // crude memory bound
  return recent.length > MAX_PER_WINDOW;
}

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

/**
 * We store a SALTED HASH of the IP, never the raw address. That is enough
 * to spot abuse patterns without keeping personal location data we have
 * no use for.
 */
function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT ?? "";
  return createHash("sha256").update(salt + ip).digest("hex").slice(0, 32);
}

// Deliberately simple and permissive. Over-clever email regexes reject
// valid addresses; real verification is the confirmation email.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const {
    email: rawEmail,
    website,
    elapsedMs,
  } = (body ?? {}) as { email?: unknown; website?: unknown; elapsedMs?: unknown };

  // Honeypot: a hidden field real people never see or fill. Bots fill it.
  // Respond with success so the bot does not learn it was caught.
  if (typeof website === "string" && website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  // Bots submit near-instantly. Humans take at least a couple of seconds.
  if (typeof elapsedMs === "number" && elapsedMs >= 0 && elapsedMs < 1500) {
    return NextResponse.json({ ok: true });
  }

  if (typeof rawEmail !== "string") {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  const email = rawEmail.trim().toLowerCase();

  if (email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "That doesn't look like a valid email address." },
      { status: 400 },
    );
  }

  const ip = clientIp(req);
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many attempts. Please wait a minute and try again." },
      { status: 429 },
    );
  }

  const { error } = await getSupabaseAdmin().from("signups").insert({
    email,
    source: "site",
    ip_hash: hashIp(ip),
    user_agent: (req.headers.get("user-agent") ?? "").slice(0, 300),
  });

  if (error) {
    // 23505 = unique violation. Already on the list is a success, not an
    // error — and we must not reveal whether an address is already stored.
    if (error.code === "23505") {
      return NextResponse.json({ ok: true, already: true });
    }
    console.error("signup insert failed", error.code, error.message);
    return NextResponse.json(
      { error: "Couldn't save that just now. Please try again shortly." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
