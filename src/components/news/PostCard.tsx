import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { Post } from "@/types";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/news/${post.slug}`} className="block">
        <h3 className="font-semibold text-neutral-900 hover:underline">{post.title}</h3>
        {post.excerpt && (
          <p className="mt-1 line-clamp-2 text-sm text-neutral-600">{post.excerpt}</p>
        )}
        <time className="mt-2 block text-xs text-neutral-500" dateTime={post.published_at ?? post.created_at}>
          {formatDate(post.published_at ?? post.created_at)}
        </time>
      </Link>
    </article>
  );
}
