import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { getPostBySlug } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { formatDate } from "@/lib/utils";
import { ArticleJsonLd } from "@/components/shared/JsonLd";
import { SITE_URL } from "@/lib/constants";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "资讯" };
  return { title: post.title, description: post.excerpt ?? undefined };
}

export default async function PostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const publishedAt = post.published_at ?? post.created_at;

  return (
    <div className="min-h-screen bg-neutral-50 py-10">
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt ?? ""}
        datePublished={publishedAt}
        url={`${SITE_URL}/news/${post.slug}`}
      />
      <Container className="max-w-3xl">
        <nav className="mb-6 text-sm text-neutral-500">
          <Link href="/news" className="hover:text-neutral-900">资讯</Link>
          <span className="mx-2">/</span>
          <span className="text-neutral-900">{post.title}</span>
        </nav>
        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-neutral-900">{post.title}</h1>
          <time className="mt-2 block text-sm text-neutral-500" dateTime={publishedAt}>
            {formatDate(publishedAt)}
          </time>
          {post.excerpt && <p className="mt-4 text-lg text-neutral-600">{post.excerpt}</p>}
          {post.content && (
            <div className="prose prose-neutral mt-8 max-w-none">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          )}
        </article>
      </Container>
    </div>
  );
}
