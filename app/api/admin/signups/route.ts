import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Constant-time comparison so an attacker cannot narrow the token down
 * one character at a time by measuring response timing.
 */
function tokenMatches(supplied: string, expected: string): boolean {
  const a = Buffer.from(supplied);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function authorized(req: NextRequest): boolean {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected || expected.length < 20) return false; // refuse weak/missing tokens
  const supplied =
    req.headers.get("x-admin-token") ??
    new URL(req.url).searchParams.get("token") ??
    "";
  return tokenMatches(supplied, expected);
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Not authorized." }, { status: 401 });
  }

  const format = new URL(req.url).searchParams.get("format");

  const { data, error } = await getSupabaseAdmin()
    .from("signups")
    .select("email, created_at, source")
    .order("created_at", { ascending: false })
    .limit(5000);

  if (error) {
    console.error("admin read failed", error.message);
    return NextResponse.json({ error: "Read failed." }, { status: 500 });
  }

  const rows = data ?? [];

  if (format === "csv") {
    const esc = (v: string) => `"${String(v).replace(/"/g, '""')}"`;
    const csv = [
      "email,created_at,source",
      ...rows.map((r) => [r.email, r.created_at, r.source ?? ""].map(esc).join(",")),
    ].join("\n");
    return new NextResponse(csv, {
      headers: {
        "content-type": "text/csv; charset=utf-8",
        "content-disposition": `attachment; filename="squared-away-signups.csv"`,
        "cache-control": "no-store",
      },
    });
  }

  return NextResponse.json(
    { count: rows.length, signups: rows },
    { headers: { "cache-control": "no-store" } },
  );
}
