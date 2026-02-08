import Link from "next/link";

const cards = [
  { title: "AI 模型", desc: "大模型与对话助手", href: "/category/model", icon: "🧠", color: "bg-violet-50 text-violet-700" },
  { title: "零代码平台", desc: "无需写代码搭建应用", href: "/category/nocode", icon: "🖥️", color: "bg-sky-50 text-sky-700" },
  { title: "智能体平台", desc: "AI 自主规划与执行", href: "/category/agent", icon: "⚡", color: "bg-amber-50 text-amber-700" },
  { title: "代码编辑器", desc: "AI 辅助编程开发", href: "/category/editor", icon: "⌨️", color: "bg-emerald-50 text-emerald-700" },
  { title: "部署上线", desc: "部署与 CDN 平台", href: "/category/deploy", icon: "🚀", color: "bg-orange-50 text-orange-700" },
  { title: "全部工具", desc: "浏览所有收录", href: "/tools", icon: "📋", color: "bg-neutral-800 text-white" },
];

export function FeaturedCards() {
  return (
    <div className="grid grid-cols-2 gap-4 px-6 sm:grid-cols-3 lg:grid-cols-6">
      {cards.map((card) => (
        <Link
          key={card.title}
          href={card.href}
          className={`flex flex-col rounded-xl border border-neutral-200 p-4 shadow-sm transition hover:shadow-md ${card.color}`}
        >
          <span className="text-2xl">{card.icon}</span>
          <span className="mt-2 font-semibold">{card.title}</span>
          <span className="mt-0.5 text-xs opacity-90">{card.desc}</span>
        </Link>
      ))}
    </div>
  );
}
