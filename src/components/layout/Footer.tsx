import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SITE_NAME } from "@/lib/constants";
import { getCategories } from "@/lib/data";

const categories = getCategories();

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <Container>
        <div className="py-10">
          <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
            <div>
              <Link href="/" className="text-lg font-bold text-neutral-900 hover:text-violet-600">
                {SITE_NAME}
              </Link>
              <p className="mt-2 text-sm text-neutral-600">
                收录优质 AI 工具，一键跳转官网。
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-900">导航</h3>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-neutral-600">
                <li><Link href="/" className="hover:text-violet-600">首页</Link></li>
                <li><Link href="/tools" className="hover:text-violet-600">全部工具</Link></li>
                {categories.map((c) => (
                  <li key={c.id}>
                    <Link href={`/category/${c.slug}`} className="hover:text-violet-600">{c.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-10 border-t border-neutral-200 pt-8 text-center text-sm text-neutral-500">
            © {new Date().getFullYear()} {SITE_NAME}
          </p>
        </div>
      </Container>
    </footer>
  );
}
