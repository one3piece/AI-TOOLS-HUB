import { createClient as createSupabaseClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Browser-safe client (uses anon key). Use for client components if needed.
 * For server-side data fetching, prefer getSupabaseServer().
 */
export function createClient(): SupabaseClient | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return createSupabaseClient(supabaseUrl, supabaseAnonKey);
}
