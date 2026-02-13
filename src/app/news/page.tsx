import { Container } from "@/components/ui/Container";
import { getNewsItems, getPosts } from "@/lib/data";
import { NewsCard } from "@/components/news/NewsCard";
import { PostCard } from "@/components/news/PostCard";
import Link from "next/link";

export const metadata = {
  title: "资讯 | AI Tools Navigator",
  description: "AI 工具与产品更新、新工具推荐、热门仓库与行业资讯。每日构建时自动聚合。",
};

export default function NewsPage() {
  const newsItems = getNewsItems();
  const editorialPosts = getPosts();

  // Group news by source for stats
  const sourceCounts: Record<string, number> = {};
  for (const item of newsItems) {
    sourceCounts[item.source] = (sourceCounts[item.source] || 0) + 1;
  }

  return (
    <div className="min-h-screen py-10">
      <Container>
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-black uppercase italic tracking-tighter text-white">
            Latest <span className="text-cyber-pink">Intel</span>
          </h1>
          <p className="mt-2 text-sm font-bold uppercase tracking-widest text-neutral-500">
            AI 工具与产品更新 // 构建时自动聚合
          </p>
          <div className="mt-4 h-px bg-gradient-to-r from-cyber-pink via-cyber-pink/20 to-transparent"></div>
        </div>

        {/* Source Stats Bar */}
        {Object.keys(sourceCounts).length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-cyber-blue mr-2 self-center">
              Sources:
            </span>
            {Object.entries(sourceCounts)
              .sort((a, b) => b[1] - a[1])
              .map(([source, count]) => (
                <span
                  key={source}
                  className="inline-flex items-center gap-1 border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-bold text-neutral-400"
                >
                  {source}
                  <span className="text-cyber-yellow">{count}</span>
                </span>
              ))}
          </div>
        )}

        {/* RSS Aggregated News Grid */}
        {newsItems.length > 0 && (
          <section className="mb-16">
            <h2 className="mb-6 flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-cyber-blue">
              <span className="h-1 w-8 bg-cyber-blue"></span>
              Live Feed // 实时聚合
              <span className="text-[10px] font-bold text-neutral-600 normal-case tracking-normal">
                ({newsItems.length} items)
              </span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {newsItems.map((item) => (
                <NewsCard key={item.slug} item={item} />
              ))}
            </div>
          </section>
        )}

        {/* Fallback: if no RSS news, show static editorial posts */}
        {newsItems.length === 0 && editorialPosts.length > 0 && (
          <section>
            <h2 className="mb-6 flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-cyber-pink">
              <span className="h-1 w-8 bg-cyber-pink"></span>
              Editorial // 编辑推荐
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {editorialPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* Editorial section when RSS news exists */}
        {newsItems.length > 0 && editorialPosts.length > 0 && (
          <section>
            <h2 className="mb-6 flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-cyber-pink">
              <span className="h-1 w-8 bg-cyber-pink"></span>
              Editorial // 编辑推荐
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {editorialPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* Empty state */}
        {newsItems.length === 0 && editorialPosts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-lg font-bold text-neutral-500">
              暂无资讯。运行 <code className="text-cyber-blue">npm run build-news</code> 获取最新内容。
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}
