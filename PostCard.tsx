import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { Post } from "@/types";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const date = post.published_at ?? post.created_at;
  return (
    <Link
      href={`/news/${post.slug}`}
      className="group relative flex flex-col border border-white/10 bg-black/40 p-6 transition-all hover:border-cyber-pink/50"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-widest text-cyber-pink">
          Intel Report // 资讯
        </span>
        <time className="text-[10px] font-bold text-neutral-600" dateTime={date}>
          {formatDate(date)}
        </time>
      </div>

      <h3 className="text-lg font-black leading-tight text-white group-hover:text-cyber-pink transition-colors">
        {post.title}
      </h3>

      {post.excerpt && (
        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-neutral-400">
          {post.excerpt}
        </p>
      )}

      <div className="mt-6 flex items-center gap-2">
        <div className="h-px flex-1 bg-gradient-to-r from-cyber-pink/20 to-transparent"></div>
        <span className="text-[10px] font-black uppercase tracking-widest text-cyber-pink opacity-0 group-hover:opacity-100 transition-opacity">
          Read More
        </span>
      </div>
      
      {/* Decorative corner */}
      <div className="absolute bottom-0 right-0 h-4 w-4 bg-cyber-pink opacity-0 group-hover:opacity-100 transition-opacity" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}></div>
    </Link>
  );
}
