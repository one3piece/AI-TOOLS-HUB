import Link from "next/link";
import { getTools } from "@/lib/data";
import { SearchBar } from "@/components/home/SearchBar";
import { FeaturedCards } from "@/components/home/FeaturedCards";
import { ToolList } from "@/components/tools/ToolList";

export default function HomePage() {
  const featuredTools = getTools({ featured: true, limit: 12 });

  return (
    <div className="min-h-screen">
      <SearchBar />
      <div className="px-6 pb-8">
        <FeaturedCards />
      </div>
      {/* 热门工具 */}
      <section className="mt-6 px-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-neutral-900">
            <span className="text-orange-500" aria-hidden>
              🔥
            </span>
            热门工具
          </h2>
          <Link href="/tools" className="text-sm text-violet-600 hover:underline">
            查看更多 →
          </Link>
        </div>
        <ToolList tools={featuredTools} />
      </section>
    </div>
  );
}
