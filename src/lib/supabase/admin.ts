import { createClient as createSupabaseClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * High-privilege client for admin/backend only. Uses service role key.
 * Never expose this to the browser.
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  return createSupabaseClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });
}
