import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Sidebar } from "@/components/layout/Sidebar";
import { MainHeader } from "@/components/layout/MainHeader";
import { Footer } from "@/components/layout/Footer";
import { SITE_NAME, SITE_DESCRIPTION, DEFAULT_OG } from "@/lib/constants";
import { getCategories } from "@/lib/data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: DEFAULT_OG.title,
    description: DEFAULT_OG.description,
    url: DEFAULT_OG.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = getCategories();
  return (
    <html lang="zh-CN">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased bg-neutral-50`}>
        <div className="flex">
          <Sidebar categories={categories} />
          <div className="ml-56 flex min-h-screen flex-1 flex-col">
            <MainHeader />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
