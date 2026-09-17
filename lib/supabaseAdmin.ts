import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client.
 *
 * This uses the SERVICE ROLE key, which bypasses Row Level Security.
 * It must never be imported into a client component. The "server-only"
 * import above turns that mistake into a build error rather than a
 * silent leak of the key into the browser bundle.
 *
 * The env check is deferred to first use (not module load): `next build`
 * statically imports every API route to collect its metadata, which would
 * otherwise fail the whole build whenever real Supabase credentials aren't
 * configured yet, e.g. during local development before a project exists.
 */
let cached: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Copy .env.example to .env.local and fill both in.",
    );
  }

  cached = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
