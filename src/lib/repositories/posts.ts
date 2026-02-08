import type { SupabaseClient } from "@supabase/supabase-js";
import type { Post } from "@/types";

export async function getPosts(
  supabase: SupabaseClient | null,
  options?: { limit?: number; offset?: number }
): Promise<Post[]> {
  if (!supabase) return [];
  let query = supabase
    .from("posts")
    .select("id, slug, title, excerpt, cover_image_url, published, published_at, created_at, updated_at, content")
    .eq("published", true)
    .order("published_at", { ascending: false });
  if (options?.limit) query = query.limit(options.limit);
  if (options?.offset) query = query.range(options.offset, options.offset + (options.limit ?? 10) - 1);
  const { data } = await query;
  return (data ?? []) as Post[];
}

export async function getPostBySlug(supabase: SupabaseClient | null, slug: string): Promise<Post | null> {
  if (!supabase) return null;
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();
  return data as Post | null;
}

export async function getPostSlugs(supabase: SupabaseClient | null): Promise<string[]> {
  if (!supabase) return [];
  const { data } = await supabase.from("posts").select("slug").eq("published", true);
  return (data ?? []).map((r) => r.slug);
}
