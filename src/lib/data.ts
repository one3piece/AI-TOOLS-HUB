import type { Category, Post, Tag, ToolWithRelations, NewsItem } from "@/types";
import { categories } from "@/data/categories";
import { tools } from "@/data/tools";
import { news as staticNews } from "@/data/news";
import * as fs from "fs";
import * as path from "path";

// ─── Categories ──────────────────────────────────────────────────────────────

export function getCategories(): Category[] {
  return [...categories].sort((a, b) => a.sort_order - b.sort_order);
}

export function getCategoryBySlug(slug: string): Category | null {
  return categories.find((c) => c.slug === slug) ?? null;
}

export function getCategorySlugs(): string[] {
  return categories.map((c) => c.slug);
}

// ─── Tools ───────────────────────────────────────────────────────────────────

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

// ─── Tags ────────────────────────────────────────────────────────────────────

export function getTags(): Tag[] {
  return [];
}

export function getTagBySlug(_slug: string): Tag | null {
  return null;
}

// ─── Posts (legacy static news) ──────────────────────────────────────────────

export function getPosts(): Post[] {
  return [...staticNews].sort((a, b) => {
    const dateA = a.published_at ? new Date(a.published_at).getTime() : 0;
    const dateB = b.published_at ? new Date(b.published_at).getTime() : 0;
    return dateB - dateA;
  });
}

export function getPostBySlug(slug: string): Post | null {
  return staticNews.find((p) => p.slug === slug) ?? null;
}

// ─── News (RSS/API aggregated from news.json) ────────────────────────────────

function loadNewsJson(): NewsItem[] {
  try {
    const jsonPath = path.join(process.cwd(), "src", "data", "news.json");
    if (fs.existsSync(jsonPath)) {
      const raw = fs.readFileSync(jsonPath, "utf-8");
      return JSON.parse(raw) as NewsItem[];
    }
  } catch (e) {
    console.warn("Failed to load news.json:", e);
  }
  return [];
}

let _newsCache: NewsItem[] | null = null;

export function getNewsItems(): NewsItem[] {
  if (_newsCache === null) {
    _newsCache = loadNewsJson();
  }
  return _newsCache;
}

export function getNewsItemBySlug(slug: string): NewsItem | null {
  return getNewsItems().find((n) => n.slug === slug) ?? null;
}

export function getNewsSlugs(): string[] {
  return getNewsItems().map((n) => n.slug);
}
