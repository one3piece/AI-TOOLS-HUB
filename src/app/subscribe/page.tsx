import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SubscribeForm } from "@/components/subscribe/SubscribeForm";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "订阅",
  description: "订阅 AI 工具与资讯更新，我们会将最新内容发送到您的邮箱。",
};

interface PageProps {
  searchParams: Promise<{ success?: string }>;
}

export default async function SubscribePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const success = params.success === "1";

  return (
    <div className="py-16">
      <Container className="max-w-md">
        {success ? (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-neutral-900">订阅成功</h1>
            <p className="mt-4 text-neutral-600">
              感谢订阅！我们会将 AI 工具与资讯更新发送到您的邮箱。
            </p>
            <Link href="/" className="mt-6 inline-block">
              <Button>返回首页</Button>
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-neutral-900">订阅更新</h1>
            <p className="mt-4 text-neutral-600">
              填写邮箱，获取 AI 工具与资讯更新。我们不会发送垃圾邮件。
            </p>
            <div className="mt-6">
              <SubscribeForm source="subscribe_page" />
            </div>
          </>
        )}
      </Container>
    </div>
  );
}
