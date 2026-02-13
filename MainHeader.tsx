"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_NAME } from "@/lib/constants";

const tabs = [
  { label: "常用", href: "/" },
  { label: "全部工具", href: "/tools" },
  { label: "资讯", href: "/news" },
];

export function MainHeader() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-30 border-b border-cyber-blue/20 bg-black/80 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="group flex items-center gap-2">
            <div className="h-9 w-9 bg-cyber-yellow flex items-center justify-center font-black text-black" style={{ clipPath: "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)" }}>
              AI
            </div>
            <span className="text-xl font-black tracking-tighter text-white group-hover:text-cyber-blue transition-colors">
              {SITE_NAME.toUpperCase()}
            </span>
          </Link>
          <ul className="hidden md:flex gap-2">
            {tabs.map((tab) => {
              const active = pathname === tab.href;
              return (
                <li key={tab.label}>
                  <Link
                    href={tab.href}
                    className={`px-4 py-2 text-xs font-black uppercase tracking-widest transition-all ${
                      active 
                        ? "text-cyber-yellow border-b-2 border-cyber-yellow" 
                        : "text-cyber-blue/60 hover:text-cyber-blue"
                    }`}
                  >
                    {tab.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-[10px] font-bold text-cyber-blue/40 tracking-widest uppercase">
            Status: <span className="text-cyber-blue">Encrypted</span>
          </div>
          <button className="cyber-button px-6 py-1.5 text-[10px]">
            Access
          </button>
        </div>
      </div>
      
      {/* Decorative scanning line effect */}
      <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-cyber-blue to-transparent opacity-30"></div>
    </header>
  );
}
