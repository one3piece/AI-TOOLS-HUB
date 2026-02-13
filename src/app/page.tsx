import Link from "next/link";
import { getTools, getNewsItems } from "@/lib/data";
import { SearchBar } from "@/components/home/SearchBar";
import { FeaturedCards } from "@/components/home/FeaturedCards";
import { ToolList } from "@/components/tools/ToolList";
import { NewsCard } from "@/components/news/NewsCard";
import { PostList } from "@/components/news/PostList";
import { getPosts } from "@/lib/data";

export default function HomePage() {
  const featuredTools = getTools({ featured: true, limit: 12 });
  const latestNews = getNewsItems().slice(0, 6);
  const editorialPosts = getPosts().slice(0, 4);

  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black py-24">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyber-blue/5 to-transparent"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <div className="mb-4 inline-block border border-cyber-blue/30 bg-cyber-blue/5 px-4 py-1 text-[10px] font-black uppercase tracking-[0.4em] text-cyber-blue">
            Neural Network Access // 神经网络接入
          </div>
          <h1 className="max-w-4xl text-5xl font-black tracking-tighter text-white md:text-7xl lg:text-8xl">
            AI TOOLS <span className="text-cyber-yellow cyber-glitch-text">NAVIGATOR</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg font-bold tracking-wide text-cyber-blue/60 uppercase">
            发现、对比、订阅 AI 工具动态。独立开发者的数字军火库。
          </p>
          
          <div className="mt-12 w-full">
            <SearchBar />
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-pink to-transparent opacity-50"></div>
      </section>

      {/* Featured Categories */}
      <section className="container mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between px-6">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-cyber-yellow">
            Core Modules // 核心模块
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-cyber-yellow/20 to-transparent ml-8"></div>
        </div>
        <FeaturedCards />
      </section>

      {/* 热门工具 */}
      <section className="container mx-auto max-w-7xl px-6">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-black tracking-tighter text-white uppercase">
              Featured <span className="text-cyber-blue">Hardware</span>
            </h2>
            <p className="mt-2 text-xs font-bold uppercase tracking-widest text-neutral-500">
              热门工具 // 性能卓越的 AI 插件
            </p>
          </div>
          <Link
            href="/tools"
            className="text-xs font-black uppercase tracking-widest text-cyber-blue hover:text-cyber-yellow transition-colors"
          >
            View All Database &gt;
          </Link>
        </div>
        <ToolList tools={featuredTools} />
      </section>

      {/* Live Feed - RSS 聚合新闻 */}
      {latestNews.length > 0 && (
        <section className="container mx-auto max-w-7xl px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-black tracking-tighter text-white uppercase">
                Live <span className="text-cyber-blue">Feed</span>
              </h2>
              <p className="mt-2 text-xs font-bold uppercase tracking-widest text-neutral-500">
                实时聚合 // RSS/API 构建时自动抓取
              </p>
            </div>
            <Link
              href="/news"
              className="text-xs font-black uppercase tracking-widest text-cyber-blue hover:text-cyber-yellow transition-colors"
            >
              View All Intel &gt;
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {latestNews.map((item) => (
              <NewsCard key={item.slug} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* 编辑推荐资讯 */}
      <section className="container mx-auto max-w-7xl px-6 pb-16">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-black tracking-tighter text-white uppercase">
              Editorial <span className="text-cyber-pink">Intel</span>
            </h2>
            <p className="mt-2 text-xs font-bold uppercase tracking-widest text-neutral-500">
              编辑推荐 // 精选行业深度资讯
            </p>
          </div>
          <Link
            href="/news"
            className="text-xs font-black uppercase tracking-widest text-cyber-pink hover:text-cyber-yellow transition-colors"
          >
            Access Newsfeed &gt;
          </Link>
        </div>
        <PostList posts={editorialPosts} />
      </section>
      
      {/* Footer Decoration */}
      <div className="mt-20 h-20 bg-gradient-to-t from-cyber-blue/5 to-transparent"></div>
    </div>
  );
}
