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
    <header className="border-b border-neutral-200 bg-white">
      <div className="flex items-center gap-6 px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </span>
          <span className="text-xl font-bold text-violet-700">{SITE_NAME}</span>
        </Link>
        <ul className="flex gap-1">
          {tabs.map((tab) => {
            const active = pathname === tab.href || (tab.href === "/" && pathname === "/");
            return (
              <li key={tab.label}>
                <Link
                  href={tab.href}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    active ? "bg-violet-100 text-violet-700" : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                  }`}
                >
                  {tab.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
