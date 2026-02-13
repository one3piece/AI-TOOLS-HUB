import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { getPostBySlug, getNewsItemBySlug, getNewsSlugs } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { formatDate } from "@/lib/utils";
import { ArticleJsonLd } from "@/components/shared/JsonLd";
import { SITE_URL } from "@/lib/constants";
import { ExternalLink } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  // Try RSS news first
  const newsItem = getNewsItemBySlug(slug);
  if (newsItem) {
    return {
      title: `${newsItem.title} | AI Tools Navigator`,
      description: newsItem.summary,
    };
  }

  // Fallback to editorial post
  const post = getPostBySlug(slug);
  if (!post) return { title: "资讯" };
  return { title: post.title, description: post.excerpt ?? undefined };
}

function formatNewsDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateStr;
  }
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Try RSS news item first
  const newsItem = getNewsItemBySlug(slug);
  if (newsItem) {
    return (
      <div className="min-h-screen py-10">
        <Container className="max-w-3xl">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
            <Link href="/news" className="text-cyber-blue hover:text-white transition-colors">
              资讯
            </Link>
            <span className="text-neutral-600">/</span>
            <span className="text-neutral-400 line-clamp-1">{newsItem.title}</span>
          </nav>

          {/* Article */}
          <article className="cyber-card p-8 bg-black/60 border-cyber-blue/20">
            {/* Source & Date */}
            <div className="mb-6 flex items-center justify-between">
              <span className="inline-flex items-center px-3 py-1 text-[10px] font-black uppercase tracking-tighter text-cyber-pink ring-1 ring-inset ring-cyber-pink/30">
                {newsItem.source}
              </span>
              <time className="text-xs font-bold text-neutral-500" dateTime={newsItem.date}>
                {formatNewsDate(newsItem.date)}
              </time>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-black tracking-tight text-white leading-tight">
              {newsItem.title}
            </h1>

            {/* Tags */}
            {newsItem.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {newsItem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-bold uppercase tracking-widest text-cyber-yellow bg-cyber-yellow/10 px-2 py-0.5"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Divider */}
            <div className="my-8 h-px bg-gradient-to-r from-cyber-blue/30 via-transparent to-transparent"></div>

            {/* Summary */}
            <div className="prose prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-neutral-300 font-medium">
                {newsItem.summary}
              </p>
            </div>

            {/* External Link */}
            <div className="mt-10 pt-6 border-t border-white/10">
              <a
                href={newsItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-cyber-blue px-6 py-3 text-sm font-black uppercase tracking-[0.2em] text-black transition-all hover:bg-white hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 70%, 90% 100%, 0 100%)" }}
              >
                Read Original Source
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </article>

          {/* Back link */}
          <div className="mt-8">
            <Link
              href="/news"
              className="text-xs font-black uppercase tracking-widest text-cyber-blue hover:text-white transition-colors"
            >
              &lt; Back to News Feed
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  // Fallback to editorial post
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const publishedAt = post.published_at ?? post.created_at;

  return (
    <div className="min-h-screen py-10">
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt ?? ""}
        datePublished={publishedAt}
        url={`${SITE_URL}/news/${post.slug}`}
      />
      <Container className="max-w-3xl">
        <nav className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
          <Link href="/news" className="text-cyber-blue hover:text-white transition-colors">
            资讯
          </Link>
          <span className="text-neutral-600">/</span>
          <span className="text-neutral-400">{post.title}</span>
        </nav>

        <article className="cyber-card p-8 bg-black/60 border-cyber-pink/20">
          <span className="inline-flex items-center px-3 py-1 text-[10px] font-black uppercase tracking-tighter text-cyber-pink ring-1 ring-inset ring-cyber-pink/30 mb-4">
            Editorial
          </span>
          <h1 className="text-3xl font-black tracking-tight text-white">{post.title}</h1>
          <time className="mt-2 block text-xs font-bold text-neutral-500" dateTime={publishedAt}>
            {formatDate(publishedAt)}
          </time>
          {post.excerpt && (
            <p className="mt-6 text-lg text-cyber-blue/80 font-bold">{post.excerpt}</p>
          )}
          {post.content && (
            <div className="prose prose-invert mt-8 max-w-none text-neutral-300">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          )}
        </article>

        <div className="mt-8">
          <Link
            href="/news"
            className="text-xs font-black uppercase tracking-widest text-cyber-blue hover:text-white transition-colors"
          >
            &lt; Back to News Feed
          </Link>
        </div>
      </Container>
    </div>
  );
}
