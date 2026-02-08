import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { getFaviconUrl } from "@/lib/utils";
import type { ToolWithRelations } from "@/types";

interface ToolDetailProps {
  tool: ToolWithRelations;
}

export function ToolDetail({ tool }: ToolDetailProps) {
  const category = tool.categories;
  const url = tool.affiliate_url || tool.website_url;
  const iconSrc = tool.logo_url || getFaviconUrl(tool.website_url);
  const pros = Array.isArray(tool.pros) ? tool.pros : [];
  const cons = Array.isArray(tool.cons) ? tool.cons : [];

  return (
    <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          {iconSrc ? (
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-neutral-100 ring-2 ring-neutral-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={iconSrc} alt="" width={64} height={64} className="h-16 w-16 object-cover" />
            </div>
          ) : (
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-violet-100 text-2xl font-semibold text-violet-600">
              {tool.name.charAt(0)}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">{tool.name}</h1>
            {category && (
              <Link
                href={`/category/${(category as { slug: string }).slug}`}
                className="mt-1 inline-block text-sm text-neutral-500 hover:text-violet-600"
              >
                {(category as { name: string }).name}
              </Link>
            )}
          </div>
        </div>
        {url && (
          <a href={url} target="_blank" rel="noopener noreferrer" className="shrink-0">
            <Button size="lg" className="bg-violet-600 hover:bg-violet-700">
              访问官网
            </Button>
          </a>
        )}
      </div>
      {tool.short_description && (
        <p className="mt-6 text-lg text-neutral-600">{tool.short_description}</p>
      )}
      {(tool.price_tier || tool.price_note) && (
        <div className="mt-4 rounded-lg bg-neutral-50 px-4 py-3">
          <span className="text-sm font-medium text-neutral-700">价格：</span>
          <span className="text-sm text-neutral-600">
            {[tool.price_tier, tool.price_note].filter(Boolean).join(" · ")}
          </span>
        </div>
      )}
      {pros.length > 0 && (
        <section className="mt-6">
          <h2 className="text-sm font-semibold text-neutral-900">特点 / 优势</h2>
          <ul className="mt-2 list-inside list-disc space-y-1 text-neutral-600">
            {pros.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>
      )}
      {cons.length > 0 && (
        <section className="mt-4">
          <h2 className="text-sm font-semibold text-neutral-900">局限 / 注意</h2>
          <ul className="mt-2 list-inside list-disc space-y-1 text-neutral-600">
            {cons.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>
      )}
      {tool.description && (
        <div className="prose prose-neutral mt-6 max-w-none text-neutral-600">
          {tool.description.split("\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      )}
    </article>
  );
}
