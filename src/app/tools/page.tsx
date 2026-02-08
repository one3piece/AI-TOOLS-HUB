import Link from "next/link";
import { getTools, getCategories } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { ToolList } from "@/components/tools/ToolList";

export const metadata = {
  title: "AI 工具库",
  description: "浏览与筛选 AI 工具，按分类发现写作、编程、图像、办公等工具。",
};

export default async function ToolsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const categories = getCategories();
  const tools = getTools({ q: params.q });

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <Container>
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-bold text-neutral-900">全部工具</h1>
          <span className="text-neutral-500">共 {tools.length} 个</span>
        </div>
        <div className="mb-8 flex flex-wrap gap-2">
          <Link
            href="/tools"
            className="rounded-full bg-violet-600 px-4 py-1.5 text-sm font-medium text-white"
          >
            全部
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/category/${c.slug}`}
              className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-neutral-600 shadow-sm ring-1 ring-neutral-200 transition hover:bg-neutral-50 hover:ring-neutral-300"
            >
              {c.name}
            </Link>
          ))}
        </div>
        <ToolList tools={tools} />
      </Container>
    </div>
  );
}
