import { createClient } from "@supabase/supabase-js";
import process from "node:process";

// Server-only. The ".server.ts" suffix keeps this out of the client bundle,
// so the secret key never ships to the browser.
//
// Reads process.env INSIDE a function so it works with per-request env
// binding (e.g. Cloudflare Workers) and not just at module load time.
export function getSupabaseServerClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;

  if (!url || !key) {
    throw new Error(
      "SUPABASE_URL / SUPABASE_SECRET_KEY are not set. Add them in your .env (local) or Vercel Project Settings -> Environment Variables.",
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
