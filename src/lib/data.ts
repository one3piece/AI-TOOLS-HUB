import type { Category, Post, Tag, ToolWithRelations } from "@/types";
import { categories } from "@/data/categories";
import { tools } from "@/data/tools";

export function getCategories(): Category[] {
  return [...categories].sort((a, b) => a.sort_order - b.sort_order);
}

export function getCategoryBySlug(slug: string): Category | null {
  return categories.find((c) => c.slug === slug) ?? null;
}

export function getCategorySlugs(): string[] {
  return categories.map((c) => c.slug);
}

export function getTools(options?: {
  categorySlug?: string;
  featured?: boolean;
  limit?: number;
  q?: string;
}): ToolWithRelations[] {
  let list = tools;
  if (options?.categorySlug) {
    list = list.filter((t) => (t.categories as { slug: string } | null)?.slug === options.categorySlug);
  }
  if (options?.featured) {
    list = list.filter((t) => t.is_featured);
  }
  if (options?.q?.trim()) {
    const q = options.q.trim().toLowerCase();
    list = list.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        (t.short_description && t.short_description.toLowerCase().includes(q)) ||
        (t.description && t.description.toLowerCase().includes(q))
    );
  }
  if (options?.limit) {
    list = list.slice(0, options.limit);
  }
  return list;
}

export function getToolBySlug(slug: string): ToolWithRelations | null {
  return tools.find((t) => t.slug === slug) ?? null;
}

export function getToolSlugs(): string[] {
  return tools.map((t) => t.slug);
}

export function getTags(): Tag[] {
  return [];
}

export function getTagBySlug(_slug: string): Tag | null {
  return null;
}

export function getPosts(): Post[] {
  return [];
}

export function getPostBySlug(_slug: string): Post | null {
  return null;
}
