import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";
import { getCategories } from "@/lib/data";

const categories = getCategories();

export function Footer() {
  return (
    <footer className="border-t border-cyber-blue/20 bg-black py-12 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 bg-cyber-yellow flex items-center justify-center font-black text-black" style={{ clipPath: "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)" }}>
                AI
              </div>
              <span className="text-xl font-black tracking-tighter text-white">
                {SITE_NAME.toUpperCase()}
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-xs font-bold leading-relaxed text-neutral-500 uppercase tracking-wider">
              Discover the ultimate digital arsenal for independent developers. 
              发现、对比、订阅 AI 工具动态。
            </p>
          </div>
          
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-cyber-blue">
              Navigation // 导航
            </h3>
            <ul className="mt-6 space-y-3">
              <li>
                <Link href="/" className="text-xs font-bold text-neutral-400 hover:text-cyber-blue transition-colors">
                  HOME // 首页
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-xs font-bold text-neutral-400 hover:text-cyber-blue transition-colors">
                  DATABASE // 工具库
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-xs font-bold text-neutral-400 hover:text-cyber-blue transition-colors">
                  INTEL // 资讯动态
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-cyber-pink">
              Categories // 分类
            </h3>
            <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link href={`/category/${c.slug}`} className="text-[10px] font-bold text-neutral-400 hover:text-cyber-pink transition-colors uppercase">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 flex flex-col items-center justify-between border-t border-white/5 pt-8 md:flex-row">
          <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">
            © {new Date().getFullYear()} {SITE_NAME} // ALL RIGHTS RESERVED
          </p>
          <div className="mt-4 flex gap-6 md:mt-0">
            <span className="text-[10px] font-bold text-cyber-blue/40 uppercase tracking-widest">
              Security: Level 4
            </span>
            <span className="text-[10px] font-bold text-cyber-blue/40 uppercase tracking-widest">
              Location: Night City
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
