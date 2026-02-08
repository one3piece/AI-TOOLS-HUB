import type { ToolWithRelations } from "@/types";
import { SITE_URL } from "@/lib/constants";

interface SoftwareApplicationJsonLdProps {
  tool: ToolWithRelations;
}

export function SoftwareApplicationJsonLd({ tool }: SoftwareApplicationJsonLdProps) {
  const url = tool.affiliate_url || tool.website_url;
  const json = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.short_description ?? tool.description ?? "",
    applicationCategory: "DeveloperApplication",
    ...(url && { url }),
    ...(tool.logo_url && { image: tool.logo_url }),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

interface ArticleJsonLdProps {
  title: string;
  description: string;
  datePublished: string;
  url: string;
}

export function ArticleJsonLd({ title, description, datePublished, url }: ArticleJsonLdProps) {
  const json = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    url: url.startsWith("http") ? url : `${SITE_URL}${url}`,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
