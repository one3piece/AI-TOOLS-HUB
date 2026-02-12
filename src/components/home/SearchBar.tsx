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
    <div className="py-8">
      <form onSubmit={handleSubmit} className="mx-auto max-w-2xl px-4">
        <div className="relative group">
          {/* 3D Effect Layers */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyber-pink to-cyber-blue rounded-none blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          
          <div className="relative flex items-center">
            <input
              type="search"
              placeholder="搜索 AI 工具、资讯或教程..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-black border-2 border-cyber-blue py-4 pl-6 pr-24 text-cyber-blue placeholder:text-cyber-blue/40 focus:outline-none focus:ring-0 focus:border-cyber-yellow transition-colors shadow-[6px_6px_0px_rgba(0,240,255,0.2)] focus:shadow-[6px_6px_0px_rgba(252,238,10,0.2)]"
              style={{
                clipPath: "polygon(0 0, 97% 0, 100% 15%, 100% 100%, 3% 100%, 0 85%)"
              }}
            />
            <button
              type="submit"
              className="absolute right-2 bg-cyber-yellow px-6 py-2 text-sm font-black uppercase text-black transition-colors hover:bg-cyber-blue"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 70%, 85% 100%, 0 100%)"
              }}
            >
              SEARCH
            </button>
          </div>
          
          {/* Decorative corner elements */}
          <div className="absolute -top-2 -left-2 h-4 w-4 border-l-2 border-t-2 border-cyber-yellow"></div>
          <div className="absolute -bottom-2 -right-2 h-4 w-4 border-b-2 border-r-2 border-cyber-pink"></div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-bold tracking-widest uppercase">
          <span className="text-cyber-blue/60">SCOPE:</span>
          {scopes.map((s) =>
            "href" in s ? (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-cyber-blue/30 px-3 py-1 text-cyber-blue/70 transition hover:bg-cyber-blue hover:text-black"
              >
                {s.label}
              </a>
            ) : (
              <button
                key={s.label}
                type="button"
                onClick={() => setScope(s.value)}
                className={`border px-3 py-1 transition ${
                  scope === s.value 
                    ? "bg-cyber-blue border-cyber-blue text-black" 
                    : "border-cyber-blue/30 text-cyber-blue/70 hover:bg-cyber-blue/10"
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
