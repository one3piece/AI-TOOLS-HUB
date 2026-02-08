"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import type { Category, Tag } from "@/types";

interface FilterBarProps {
  categories: Category[];
  tags: Tag[];
  currentCategorySlug?: string | null;
  currentTagSlug?: string | null;
  title?: string;
}

export function FilterBar({
  categories,
  tags,
  currentCategorySlug,
  currentTagSlug,
  title,
}: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function setFilter(type: "category" | "tag", slug: string | null) {
    const params = new URLSearchParams(searchParams?.toString() ?? {});
    if (type === "category") {
      params.delete("tag");
      if (slug) params.set("category", slug);
      else params.delete("category");
    } else {
      params.delete("category");
      if (slug) params.set("tag", slug);
      else params.delete("tag");
    }
    const q = params.toString();
    router.push(q ? `/tools?${q}` : "/tools");
  }

  return (
    <div className="space-y-4">
      {title && <h2 className="text-lg font-semibold text-neutral-900">{title}</h2>}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-neutral-500">分类：</span>
        <button
          type="button"
          onClick={() => setFilter("category", null)}
          className={!currentCategorySlug ? "font-medium text-neutral-900" : "text-neutral-600 hover:text-neutral-900"}
        >
          全部
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setFilter("category", currentCategorySlug === cat.slug ? null : cat.slug)}
          >
            <Badge variant={currentCategorySlug === cat.slug ? "default" : "secondary"}>
              {cat.name}
            </Badge>
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-neutral-500">标签：</span>
        <button
          type="button"
          onClick={() => setFilter("tag", null)}
          className={!currentTagSlug ? "font-medium text-neutral-900" : "text-neutral-600 hover:text-neutral-900"}
        >
          全部
        </button>
        {tags.map((tag) => (
          <button
            key={tag.id}
            type="button"
            onClick={() => setFilter("tag", currentTagSlug === tag.slug ? null : tag.slug)}
          >
            <Badge variant={currentTagSlug === tag.slug ? "default" : "outline"}>
              {tag.name}
            </Badge>
          </button>
        ))}
      </div>
    </div>
  );
}
