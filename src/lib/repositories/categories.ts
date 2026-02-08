import type { SupabaseClient } from "@supabase/supabase-js";
import type { Category } from "@/types";

export async function getCategories(supabase: SupabaseClient | null): Promise<Category[]> {
  if (!supabase) return [];
  const { data } = await supabase
    .from("categories")
    .select("id, slug, name, description, sort_order, created_at")
    .order("sort_order", { ascending: true });
  return (data ?? []) as Category[];
}

export async function getCategoryBySlug(
  supabase: SupabaseClient | null,
  slug: string
): Promise<Category | null> {
  if (!supabase) return null;
  const { data } = await supabase
    .from("categories")
    .select("id, slug, name, description, sort_order, created_at")
    .eq("slug", slug)
    .single();
  return data as Category | null;
}

export async function getCategorySlugs(supabase: SupabaseClient | null): Promise<string[]> {
  if (!supabase) return [];
  const { data } = await supabase.from("categories").select("slug");
  return (data ?? []).map((r) => r.slug);
}
