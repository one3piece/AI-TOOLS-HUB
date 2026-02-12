import { Container } from "@/components/ui/Container";
import { PostList } from "@/components/news/PostList";
import { getPosts } from "@/lib/data";

export const metadata = {
  title: "资讯",
  description: "AI 工具与产品更新、新工具推荐与行业资讯。",
};

export default function NewsPage() {
  const posts = getPosts();
  
  return (
    <div className="min-h-screen bg-neutral-50 py-10">
      <Container>
        <h1 className="mb-8 text-2xl font-bold text-neutral-900">资讯</h1>
        <PostList posts={posts} />
      </Container>
    </div>
  );
}
