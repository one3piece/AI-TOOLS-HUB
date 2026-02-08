import type { SupabaseClient } from "@supabase/supabase-js";
import type { ToolWithRelations } from "@/types";

async function fetchToolsWithRelations(
  supabase: SupabaseClient,
  filter: { categoryId?: string; tagId?: string; featured?: boolean; limit?: number }
) {
  let query = supabase
    .from("tools")
    .select(
      `
      *,
      categories (id, slug, name, description, sort_order),
      tool_tags (tag_id, tags (id, slug, name))
    `
    )
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (filter.featured) query = query.eq("is_featured", true);
  if (filter.limit) query = query.limit(filter.limit);
  if (filter.categoryId) query = query.eq("category_id", filter.categoryId);
  if (filter.tagId) {
    const { data: toolIds } = await supabase
      .from("tool_tags")
      .select("tool_id")
      .eq("tag_id", filter.tagId);
    const ids = (toolIds ?? []).map((r) => r.tool_id);
    if (ids.length === 0) return { data: [], error: null };
    query = query.in("id", ids);
  }

  return await query;
}

export async function getTools(
  supabase: SupabaseClient | null,
  options?: { categorySlug?: string; tagSlug?: string; featured?: boolean; limit?: number }
) {
  if (!supabase) return { data: [], error: null };

  let categoryId: string | undefined;
  let tagId: string | undefined;
  if (options?.categorySlug) {
    const { data: cat } = await supabase.from("categories").select("id").eq("slug", options.categorySlug).single();
    categoryId = cat?.id;
  }
  if (options?.tagSlug) {
    const { data: tag } = await supabase.from("tags").select("id").eq("slug", options.tagSlug).single();
    tagId = tag?.id;
  }

  const { data, error } = await fetchToolsWithRelations(supabase, {
    categoryId,
    tagId,
    featured: options?.featured,
    limit: options?.limit,
  });

  const normalized: ToolWithRelations[] = (data ?? []).map((row: unknown) => {
    const r = row as Record<string, unknown>;
    const categories = r.categories as Record<string, unknown> | null;
    const toolTags = (r.tool_tags as Array<{ tags: Record<string, unknown> | null }>) ?? [];
    const tags = toolTags.map((tt) => tt.tags).filter(Boolean) as Array<{ id: string; slug: string; name: string }>;
    return {
      ...r,
      categories,
      tags,
      tool_tags: undefined,
    } as unknown as ToolWithRelations;
  });

  return { data: normalized, error };
}

export async function getToolBySlug(supabase: SupabaseClient | null, slug: string) {
  if (!supabase) return { data: null, error: null };

  const { data, error } = await supabase
    .from("tools")
    .select(
      `
      *,
      categories (id, slug, name, description, sort_order),
      tool_tags (tag_id, tags (id, slug, name))
    `
    )
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !data) return { data: null, error };

  const r = data as Record<string, unknown>;
  const categories = r.categories as Record<string, unknown> | null;
  const toolTags = (r.tool_tags as Array<{ tags: Record<string, unknown> | null }>) ?? [];
  const tags = toolTags.map((tt) => tt.tags).filter(Boolean) as Array<{ id: string; slug: string; name: string }>;

  const normalized = {
    ...r,
    categories,
    tags,
    tool_tags: undefined,
  } as unknown as ToolWithRelations;

  return { data: normalized, error: null };
}

export async function getToolSlugs(supabase: SupabaseClient | null) {
  if (!supabase) return [];
  const { data } = await supabase.from("tools").select("slug").eq("published", true);
  return (data ?? []).map((r) => r.slug);
}
