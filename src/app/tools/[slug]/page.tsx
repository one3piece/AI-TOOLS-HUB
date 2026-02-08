import { notFound } from "next/navigation";
import Link from "next/link";
import { getToolBySlug, getToolSlugs } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { ToolDetail } from "@/components/tools/ToolDetail";
import { SoftwareApplicationJsonLd } from "@/components/shared/JsonLd";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: "工具" };
  return {
    title: tool.name,
    description: tool.short_description ?? tool.description ?? undefined,
  };
}

export function generateStaticParams() {
  return getToolSlugs().map((slug) => ({ slug }));
}

export default async function ToolDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <SoftwareApplicationJsonLd tool={tool} />
      <Container>
        <nav className="mb-6 text-sm text-neutral-500">
          <Link href="/" className="hover:text-neutral-900">首页</Link>
          <span className="mx-2">/</span>
          <Link href="/tools" className="hover:text-neutral-900">工具</Link>
          <span className="mx-2">/</span>
          <span className="text-neutral-900">{tool.name}</span>
        </nav>
        <ToolDetail tool={tool} />
      </Container>
    </div>
  );
}
