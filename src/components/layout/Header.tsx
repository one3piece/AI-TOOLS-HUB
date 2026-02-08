"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SITE_NAME } from "@/lib/constants";
import { getCategories } from "@/lib/data";

const categories = getCategories();

export function Header() {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white shadow-sm">
      <Container>
        <nav className="flex h-14 items-center justify-between gap-4">
          <Link
            href="/"
            className="shrink-0 text-xl font-bold text-neutral-900 transition hover:text-blue-600"
          >
            {SITE_NAME}
          </Link>
          <ul className="flex items-center gap-1 sm:gap-2">
            <li>
              <Link
                href="/"
                className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900"
              >
                首页
              </Link>
            </li>
            <li>
              <Link
                href="/tools"
                className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900"
              >
                全部工具
              </Link>
            </li>
            <li className="relative">
              <button
                type="button"
                onClick={() => setOpenDropdown((v) => !v)}
                onBlur={() => setTimeout(() => setOpenDropdown(false), 150)}
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900"
              >
                工具分类
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown && (
                <div className="absolute left-0 top-full mt-1 w-56 rounded-xl border border-neutral-200 bg-white py-2 shadow-lg">
                  {categories.map((c) => (
                    <Link
                      key={c.id}
                      href={`/category/${c.slug}`}
                      className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-blue-600"
                      onClick={() => setOpenDropdown(false)}
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
