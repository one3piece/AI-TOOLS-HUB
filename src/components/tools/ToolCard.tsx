import Link from "next/link";
import { getFaviconUrl } from "@/lib/utils";
import type { ToolWithRelations } from "@/types";

interface ToolCardProps {
  tool: ToolWithRelations;
}

/** 卡片统一进入详情页；详情页内再提供「访问官网」。图标优先用 logo_url，否则用官网 favicon（可后续用 MCP 换官方 logo） */
export function ToolCard({ tool }: ToolCardProps) {
  const category = tool.categories;
  const iconSrc = tool.logo_url || getFaviconUrl(tool.website_url);

  const content = (
    <article className="flex h-full flex-col items-center rounded-xl border border-neutral-200 bg-white p-4 text-center shadow-sm transition hover:border-violet-200 hover:shadow-md">
      {iconSrc ? (
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-neutral-100 ring-2 ring-neutral-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={iconSrc}
            alt=""
            width={56}
            height={56}
            className="h-14 w-14 object-cover"
          />
        </div>
      ) : (
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-violet-100 text-lg font-bold text-violet-600 ring-2 ring-violet-50">
          {tool.name.charAt(0)}
        </div>
      )}
      <h3 className="mt-3 font-semibold text-neutral-900">{tool.name}</h3>
      {category && (
        <span className="mt-0.5 text-xs text-neutral-500">
          {(category as { name: string }).name}
        </span>
      )}
      {tool.short_description && (
        <p className="mt-2 line-clamp-2 text-sm text-neutral-600">{tool.short_description}</p>
      )}
      <span className="mt-3 inline-flex items-center text-sm font-medium text-violet-600">
        查看详情
        <svg className="ml-0.5 h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </article>
  );

  return (
    <Link href={`/tools/${tool.slug}`} className="block h-full">
      {content}
    </Link>
  );
}
