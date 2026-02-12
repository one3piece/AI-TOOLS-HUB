import Link from "next/link";

const cards = [
  { title: "AI 模型", desc: "大模型与对话助手", href: "/category/model", icon: "🧠", color: "var(--cyber-blue)" },
  { title: "UI 设计", desc: "AI 驱动的设计工具", href: "/category/design", icon: "🎨", color: "var(--cyber-yellow)" },
  { title: "零代码平台", desc: "快速构建全栈应用", href: "/category/nocode", icon: "🖥️", color: "var(--cyber-pink)" },
  { title: "智能体平台", desc: "自主规划与执行", href: "/category/agent", icon: "⚡", color: "var(--cyber-purple)" },
  { title: "代码编辑器", desc: "AI 原生编程环境", href: "/category/editor", icon: "⌨️", color: "var(--cyber-blue)" },
  { title: "部署上线", desc: "高效托管与加速", href: "/category/deploy", icon: "🚀", color: "var(--cyber-pink)" },
  { title: "自动化", desc: "工作流自动集成", href: "/category/automation", icon: "⚙️", color: "var(--cyber-yellow)" },
  { title: "支付集成", desc: "全球支付解决方案", href: "/category/payment", icon: "💳", color: "var(--cyber-blue)" },
];

export function FeaturedCards() {
  return (
    <div className="grid grid-cols-2 gap-4 px-6 sm:grid-cols-4 lg:grid-cols-8">
      {cards.map((card) => (
        <Link
          key={card.title}
          href={card.href}
          className="group relative flex flex-col border border-white/10 bg-black/40 p-4 transition-all hover:border-cyber-blue/50"
        >
          <div 
            className="absolute -right-2 -top-2 h-8 w-8 opacity-10 transition-all group-hover:opacity-20"
            style={{ backgroundColor: card.color, filter: "blur(10px)" }}
          ></div>
          
          <span className="text-2xl group-hover:scale-110 transition-transform">{card.icon}</span>
          <span className="mt-2 text-xs font-black uppercase tracking-widest text-white group-hover:text-cyber-blue">
            {card.title}
          </span>
          <span className="mt-1 text-[10px] font-bold text-neutral-500 uppercase tracking-tighter">
            {card.desc}
          </span>
          
          <div 
            className="absolute bottom-0 left-0 h-0.5 w-0 transition-all group-hover:w-full"
            style={{ backgroundColor: card.color }}
          ></div>
        </Link>
      ))}
    </div>
  );
}
