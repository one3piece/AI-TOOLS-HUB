"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { isValidEmail } from "@/lib/utils";

interface SubscribeFormProps {
  source?: string;
  className?: string;
}

export function SubscribeForm({ source = "homepage", className = "" }: SubscribeFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const trimmed = email.trim();
    if (!trimmed) {
      setError("请输入邮箱地址");
      return;
    }
    if (!isValidEmail(trimmed)) {
      setError("请输入有效的邮箱地址");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, source }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "订阅失败，请稍后重试");
        return;
      }
      router.push("/subscribe?success=1");
    } catch {
      setError("网络错误，请稍后重试");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-3 ${className}`}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className="flex-1"
          aria-label="邮箱"
        />
        <Button type="submit" disabled={loading} className="sm:w-auto">
          {loading ? "提交中…" : "订阅更新"}
        </Button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}
