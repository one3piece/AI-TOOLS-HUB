import Link from "next/link";
import type { NewsItem } from "@/types";

interface NewsCardProps {
  item: NewsItem;
}

const SOURCE_COLORS: Record<string, string> = {
  "Product Hunt": "text-orange-400 ring-orange-400/30",
  "Hacker News": "text-amber-400 ring-amber-400/30",
  "GitHub Trending": "text-green-400 ring-green-400/30",
  "OpenAI Blog": "text-emerald-400 ring-emerald-400/30",
  "Google AI Blog": "text-blue-400 ring-blue-400/30",
  "Microsoft AI Blog": "text-sky-400 ring-sky-400/30",
  "Towards Data Science": "text-purple-400 ring-purple-400/30",
  "Reddit r/MachineLearning": "text-red-400 ring-red-400/30",
  "Reddit r/artificial": "text-red-400 ring-red-400/30",
};

function formatNewsDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export function NewsCard({ item }: NewsCardProps) {
  const sourceColor = SOURCE_COLORS[item.source] || "text-cyber-pink ring-cyber-pink/30";

  return (
    <div className="group relative flex flex-col border border-white/10 bg-black/40 p-6 transition-all hover:border-cyber-blue/40 hover:bg-black/60">
      {/* Header: source + date */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <span
          className={`inline-flex items-center px-2 py-0.5 text-[10px] font-black uppercase tracking-tighter ring-1 ring-inset ${sourceColor}`}
        >
          {item.source}
        </span>
        <time
          className="text-[10px] font-bold text-neutral-600 whitespace-nowrap"
          dateTime={item.date}
        >
          {formatNewsDate(item.date)}
        </time>
      </div>

      {/* Title */}
      <h3 className="text-base font-black leading-tight text-white group-hover:text-cyber-blue transition-colors line-clamp-2">
        {item.title}
      </h3>

      {/* Summary */}
      {item.summary && (
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-500">
          {item.summary}
        </p>
      )}

      {/* Tags */}
      {item.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {item.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-bold uppercase tracking-widest text-neutral-600 bg-white/5 px-1.5 py-0.5"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer: read more link */}
      <div className="mt-auto pt-5 flex items-center justify-between">
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] font-black uppercase tracking-widest text-cyber-yellow hover:text-white transition-colors"
        >
          Read Source &gt;
        </a>
        <Link
          href={`/news/${item.slug}`}
          className="text-[10px] font-black uppercase tracking-widest text-cyber-blue opacity-0 group-hover:opacity-100 transition-opacity"
        >
          View Detail &gt;
        </Link>
      </div>

      {/* Decorative corner */}
      <div
        className="absolute bottom-0 right-0 h-4 w-4 bg-cyber-blue opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
      ></div>
    </div>
  );
}
