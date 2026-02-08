import { notFound } from "next/navigation";
import Link from "next/link";
import { getTools, getCategoryBySlug, getCategories } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { ToolList } from "@/components/tools/ToolList";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "分类" };
  return { title: category.name, description: category.description ?? undefined };
}

export function generateStaticParams() {
  return getCategories().map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const categories = getCategories();
  const tools = getTools({ categorySlug: slug });

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <Container>
        <nav className="mb-4 text-sm text-neutral-500">
          <Link href="/" className="hover:text-neutral-900">首页</Link>
          <span className="mx-2">/</span>
          <Link href="/tools" className="hover:text-neutral-900">工具</Link>
          <span className="mx-2">/</span>
          <span className="text-neutral-900">{category.name}</span>
        </nav>
        <h1 className="mb-2 text-2xl font-bold text-neutral-900">{category.name}</h1>
        {category.description && (
          <p className="mb-6 text-neutral-600">{category.description}</p>
        )}
        <div className="mb-6 flex flex-wrap gap-2">
          <Link
            href="/tools"
            className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-neutral-600 shadow-sm ring-1 ring-neutral-200 hover:bg-neutral-50"
          >
            全部
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/category/${c.slug}`}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                c.slug === slug
                  ? "bg-violet-600 text-white"
                  : "bg-white text-neutral-600 shadow-sm ring-1 ring-neutral-200 hover:bg-neutral-50"
              }`}
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