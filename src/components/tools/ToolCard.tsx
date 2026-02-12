"use client";

import Link from "next/link";
import type { ToolWithRelations } from "@/types";
import { useState } from "react";

interface ToolCardProps {
  tool: ToolWithRelations;
}

export function ToolCard({ tool }: ToolCardProps) {
  const category = tool.categories;
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="cyber-card group flex h-full flex-col p-5"
    >
      <div className="flex items-center justify-between">
        {tool.logo_url && !imgError ? (
          <img
            src={tool.logo_url}
            alt={tool.name}
            onError={() => setImgError(true)}
            className="h-12 w-12 rounded-none border border-cyber-blue/30 bg-white/5 p-1 object-contain"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center border border-cyber-blue/30 bg-cyber-dark text-xl font-black text-cyber-blue">
            {tool.name.charAt(0)}
          </div>
        )}
        <div className="flex flex-col items-end gap-1">
          {tool.price_tier && (
            <span className="inline-flex items-center bg-cyber-pink/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-tighter text-cyber-pink ring-1 ring-inset ring-cyber-pink/30">
              {tool.price_tier}
            </span>
          )}
        </div>
      </div>

      <h3 className="mt-4 text-lg font-black tracking-tight text-white group-hover:text-cyber-yellow transition-colors">
        {tool.name}
      </h3>
      
      {category && (
        <span className="mt-1 text-[10px] font-bold uppercase tracking-widest text-cyber-blue/60">
          {category.name}
        </span>
      )}

      {tool.short_description && (
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-neutral-400">
          {tool.short_description}
        </p>
      )}

      <div className="mt-auto pt-5 flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-widest text-cyber-yellow opacity-0 group-hover:opacity-100 transition-opacity">
          View System &gt;
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyber-blue/20 ml-4"></div>
      </div>
    </Link>
  );
}
