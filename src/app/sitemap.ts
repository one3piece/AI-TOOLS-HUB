import type { MetadataRoute } from "next";
import { getToolSlugs, getCategorySlugs } from "@/lib/data";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL;
  const toolSlugs = getToolSlugs();
  const categorySlugs = getCategorySlugs();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${base}/tools`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
  ];

  const toolUrls: MetadataRoute.Sitemap = toolSlugs.map((slug) => ({
    url: `${base}/tools/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryUrls: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
    url: `${base}/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...toolUrls, ...categoryUrls];
}
