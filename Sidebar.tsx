"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/types";
import { 
  Cpu, 
  Palette, 
  Zap, 
  Code, 
  Rocket, 
  Workflow, 
  CreditCard, 
  LayoutGrid,
  Home,
  Newspaper
} from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  model: <Cpu className="h-4 w-4" />,
  design: <Palette className="h-4 w-4" />,
  nocode: <LayoutGrid className="h-4 w-4" />,
  agent: <Zap className="h-4 w-4" />,
  editor: <Code className="h-4 w-4" />,
  deploy: <Rocket className="h-4 w-4" />,
  automation: <Workflow className="h-4 w-4" />,
  payment: <CreditCard className="h-4 w-4" />,
};

interface SidebarProps {
  categories: Category[];
}

export function Sidebar({ categories }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-56 border-r border-cyber-blue/20 bg-black/80 backdrop-blur-xl">
      <nav className="flex h-full flex-col gap-1 overflow-y-auto py-6 pl-4 pr-3">
        <div className="mb-8 px-2">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-cyber-pink">
            Navigation // 导航
          </h2>
          <div className="mt-2 h-px bg-gradient-to-r from-cyber-pink to-transparent"></div>
        </div>

        <Link
          href="/"
          className={`mb-1 flex items-center gap-3 px-3 py-2.5 text-xs font-bold uppercase tracking-widest transition-all ${
            pathname === "/" 
              ? "bg-cyber-blue text-black shadow-[4px_4px_0px_rgba(0,240,255,0.3)]" 
              : "text-cyber-blue/60 hover:bg-cyber-blue/10 hover:text-cyber-blue"
          }`}
          style={pathname === "/" ? { clipPath: "polygon(0 0, 100% 0, 100% 75%, 90% 100%, 0 100%)" } : {}}
        >
          <Home className="h-4 w-4" />
          首页
        </Link>
        <Link
          href="/tools"
          className={`mb-1 flex items-center gap-3 px-3 py-2.5 text-xs font-bold uppercase tracking-widest transition-all ${
            pathname === "/tools" 
              ? "bg-cyber-blue text-black shadow-[4px_4px_0px_rgba(0,240,255,0.3)]" 
              : "text-cyber-blue/60 hover:bg-cyber-blue/10 hover:text-cyber-blue"
          }`}
          style={pathname === "/tools" ? { clipPath: "polygon(0 0, 100% 0, 100% 75%, 90% 100%, 0 100%)" } : {}}
        >
          <LayoutGrid className="h-4 w-4" />
          全部工具
        </Link>
        <Link
          href="/news"
          className={`mb-6 flex items-center gap-3 px-3 py-2.5 text-xs font-bold uppercase tracking-widest transition-all ${
            pathname === "/news" 
              ? "bg-cyber-blue text-black shadow-[4px_4px_0px_rgba(0,240,255,0.3)]" 
              : "text-cyber-blue/60 hover:bg-cyber-blue/10 hover:text-cyber-blue"
          }`}
          style={pathname === "/news" ? { clipPath: "polygon(0 0, 100% 0, 100% 75%, 90% 100%, 0 100%)" } : {}}
        >
          <Newspaper className="h-4 w-4" />
          资讯动态
        </Link>

        <div className="mb-4 px-2">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-cyber-yellow">
            Categories // 分类
          </h2>
          <div className="mt-2 h-px bg-gradient-to-r from-cyber-yellow to-transparent"></div>
        </div>

        {categories.map((c) => {
          const isActive = pathname === `/category/${c.slug}`;
          const icon = categoryIcons[c.slug] ?? <LayoutGrid className="h-4 w-4" />;
          return (
            <Link
              key={c.id}
              href={`/category/${c.slug}`}
              className={`flex items-center gap-3 px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                isActive
                  ? "border-l-2 border-cyber-yellow bg-cyber-yellow/10 text-cyber-yellow"
                  : "text-neutral-500 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className={isActive ? "text-cyber-yellow" : "text-neutral-600"}>{icon}</span>
              <span>{c.name}</span>
            </Link>
          );
        })}

        <div className="mt-auto pt-10 pb-4">
          <div className="cyber-border p-3 bg-cyber-blue/5">
            <p className="text-[9px] font-bold text-cyber-blue/60 leading-tight">
              SYSTEM STATUS: <span className="text-cyber-blue">ONLINE</span><br/>
              VERSION: <span className="text-cyber-blue">2.0.77</span>
            </p>
          </div>
        </div>
      </nav>
    </aside>
  );
}
