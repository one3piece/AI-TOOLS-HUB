"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/types";

const categoryIcons: Record<string, React.ReactNode> = {
  model: (
    <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  nocode: (
    <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
    </svg>
  ),
  agent: (
    <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  editor: (
    <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  deploy: (
    <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
  ),
};

interface SidebarProps {
  categories: Category[];
}

export function Sidebar({ categories }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-56 border-r border-neutral-200 bg-white">
      <nav className="flex h-full flex-col gap-1 overflow-y-auto py-4 pl-3 pr-2">
        <Link
          href="/"
          className="mb-2 rounded-lg px-3 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-100"
        >
          首页
        </Link>
        <Link
          href="/tools"
          className="mb-2 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
        >
          全部工具
        </Link>
        {categories.map((c) => {
          const isActive = pathname === `/category/${c.slug}`;
          const icon = categoryIcons[c.slug] ?? null;
          return (
            <Link
              key={c.id}
              href={`/category/${c.slug}`}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                isActive
                  ? "bg-violet-50 font-medium text-violet-700"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
              }`}
            >
              {icon}
              <span>{c.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
