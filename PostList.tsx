import { PostCard } from "./PostCard";
import type { Post } from "@/types";

interface PostListProps {
  posts: Post[];
}

export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return <p className="py-12 text-center text-neutral-500">暂无资讯。</p>;
  }
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {posts.map((post) => (
        <li key={post.id}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
}
