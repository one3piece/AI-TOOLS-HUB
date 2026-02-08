"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const scopes = [
  { label: "站内", value: "internal" },
  { label: "Bing", href: "https://www.bing.com" },
  { label: "百度", href: "https://www.baidu.com" },
  { label: "Google", href: "https://www.google.com" },
  { label: "Perplexity", href: "https://www.perplexity.ai" },
];

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState("internal");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (scope === "internal" && q) {
      router.push(`/tools?q=${encodeURIComponent(q)}`);
    }
  }

  return (
    <div className="px-6 py-6">
      <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
        <div className="flex gap-2 rounded-xl border border-neutral-200 bg-white shadow-sm focus-within:ring-2 focus-within:ring-violet-500">
          <input
            type="search"
            placeholder="站内AI工具搜索"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 rounded-l-xl border-0 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:ring-0"
            aria-label="搜索"
          />
          <button
            type="submit"
            className="rounded-r-xl bg-violet-600 px-4 text-white transition hover:bg-violet-700"
            aria-label="搜索"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-neutral-500">搜索范围：</span>
          {scopes.map((s) =>
            "href" in s ? (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-3 py-1 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
              >
                {s.label}
              </a>
            ) : (
              <button
                key={s.label}
                type="button"
                onClick={() => setScope(s.value)}
                className={`rounded-full px-3 py-1 transition ${
                  scope === s.value ? "bg-violet-100 font-medium text-violet-700" : "text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                {s.label}
              </button>
            )
          )}
        </div>
      </form>
    </div>
  );
}
