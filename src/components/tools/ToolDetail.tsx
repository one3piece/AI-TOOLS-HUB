"use client";

import type { ToolWithRelations } from "@/types";
import { useState } from "react";
import { ExternalLink, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

interface ToolDetailProps {
  tool: ToolWithRelations;
}

export function ToolDetail({ tool }: ToolDetailProps) {
  const [imgError, setImgError] = useState(false);
  const category = tool.categories;

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="cyber-card p-8 bg-black/60 backdrop-blur-xl border-cyber-blue/30">
        <div className="flex flex-col md:flex-row md:items-center gap-8">
          <div className="relative">
            {tool.logo_url && !imgError ? (
              <img
                src={tool.logo_url}
                alt={tool.name}
                onError={() => setImgError(true)}
                className="h-24 w-24 border-2 border-cyber-blue/50 bg-white/5 p-2 object-contain shadow-[0_0_20px_rgba(0,240,255,0.2)]"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center border-2 border-cyber-blue/50 bg-cyber-dark text-4xl font-black text-cyber-blue shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                {tool.name.charAt(0)}
              </div>
            )}
            <div className="absolute -bottom-2 -right-2 h-6 w-6 bg-cyber-yellow shadow-[2px_2px_0px_black]"></div>
          </div>

          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">
                {tool.name}
              </h1>
              {tool.price_tier && (
                <span className="bg-cyber-pink px-3 py-1 text-xs font-black uppercase tracking-widest text-black shadow-[4px_4px_0px_rgba(255,0,60,0.3)]">
                  {tool.price_tier}
                </span>
              )}
            </div>
            
            <p className="text-xl font-bold text-cyber-blue/80 leading-tight">
              {tool.short_description}
            </p>

            <div className="flex flex-wrap gap-6 pt-2">
              <a
                href={tool.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 bg-cyber-blue px-6 py-3 text-sm font-black uppercase tracking-[0.2em] text-black transition-all hover:bg-white hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 70%, 85% 100%, 0 100%)" }}
              >
                Access System <ExternalLink className="h-4 w-4" />
              </a>
              {category && (
                <Link
                  href={`/category/${category.slug}`}
                  className="flex items-center gap-2 border border-cyber-yellow/30 px-4 py-3 text-xs font-bold uppercase tracking-widest text-cyber-yellow hover:bg-cyber-yellow/10 transition-colors"
                >
                  <span className="h-2 w-2 bg-cyber-yellow animate-pulse"></span>
                  Sector: {category.name}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <section className="cyber-card p-8 bg-black/40 border-white/10">
            <h2 className="mb-6 flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-cyber-blue">
              <span className="h-1 w-8 bg-cyber-blue"></span>
              Mission Briefing // 详细介绍
            </h2>
            <div className="prose prose-invert max-w-none">
              {tool.description ? (
                tool.description.split("\n").map((p, i) => (
                  <p key={i} className="text-lg leading-relaxed text-neutral-300 font-medium mb-4">
                    {p}
                  </p>
                ))
              ) : (
                <p className="text-lg leading-relaxed text-neutral-300 font-medium">
                  No detailed description available for this module.
                </p>
              )}
            </div>
          </section>

          {/* Pros & Cons */}
          {(tool.pros?.length || tool.cons?.length) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {tool.pros && tool.pros.length > 0 && (
                <section className="cyber-card p-6 bg-cyber-blue/5 border-cyber-blue/20">
                  <h3 className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-cyber-blue">
                    <CheckCircle2 className="h-4 w-4" />
                    System Advantages // 优势
                  </h3>
                  <ul className="space-y-3">
                    {tool.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-neutral-400">
                        <span className="mt-1.5 h-1 w-1 bg-cyber-blue"></span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              {tool.cons && tool.cons.length > 0 && (
                <section className="cyber-card p-6 bg-cyber-pink/5 border-cyber-pink/20">
                  <h3 className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-cyber-pink">
                    <AlertCircle className="h-4 w-4" />
                    Known Limitations // 局限
                  </h3>
                  <ul className="space-y-3">
                    {tool.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-neutral-400">
                        <span className="mt-1.5 h-1 w-1 bg-cyber-pink"></span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          <section className="cyber-card p-6 bg-black/60 border-cyber-yellow/20">
            <h3 className="mb-6 text-xs font-black uppercase tracking-[0.2em] text-cyber-yellow">
              Technical Specs // 技术规格
            </h3>
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-1">Price Model</p>
                <p className="text-sm font-bold text-white">{tool.price_tier || "Unknown"}</p>
              </div>
              {tool.price_note && (
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-1">Price Details</p>
                  <p className="text-sm font-bold text-white">{tool.price_note}</p>
                </div>
              )}
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-1">Last Sync</p>
                <p className="text-sm font-bold text-white">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/5">
              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-tighter text-cyber-yellow/40">
                <span>Status: Encrypted</span>
                <span>Signal: Strong</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
