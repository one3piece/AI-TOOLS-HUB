import Link from "next/link";
import type { Category } from "@/types";

interface CategoryNavProps {
  categories: Category[];
}

export function CategoryNav({ categories }: CategoryNavProps) {
  return (
    <nav className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/category/${cat.slug}`}
          className="rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm transition hover:border-neutral-300 hover:bg-neutral-50"
        >
          {cat.name}
        </Link>
      ))}
    </nav>
  );
}
