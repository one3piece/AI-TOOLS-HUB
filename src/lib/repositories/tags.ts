import type { SupabaseClient } from "@supabase/supabase-js";
import type { Tag } from "@/types";

export async function getTags(supabase: SupabaseClient | null): Promise<Tag[]> {
  if (!supabase) return [];
  const { data } = await supabase.from("tags").select("id, slug, name, created_at").order("name");
  return (data ?? []) as Tag[];
}

export async function getTagBySlug(supabase: SupabaseClient | null, slug: string): Promise<Tag | null> {
  if (!supabase) return null;
  const { data } = await supabase.from("tags").select("id, slug, name, created_at").eq("slug", slug).single();
  return data as Tag | null;
}

export async function getTagSlugs(supabase: SupabaseClient | null): Promise<string[]> {
  if (!supabase) return [];
  const { data } = await supabase.from("tags").select("slug");
  return (data ?? []).map((r) => r.slug);
}
