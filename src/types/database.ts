export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  sort_order: number;
  created_at: string;
}

export interface Tag {
  id: string;
  slug: string;
  name: string;
  created_at: string;
}

export interface Tool {
  id: string;
  slug: string;
  name: string;
  short_description: string | null;
  description: string | null;
  pros: string[] | null;
  cons: string[] | null;
  price_tier: string | null;
  price_note: string | null;
  website_url: string | null;
  affiliate_url: string | null;
  logo_url: string | null;
  category_id: string | null;
  is_featured: boolean;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
  categories?: Category | null;
  tags?: Tag[];
}

export interface ToolTag {
  tool_id: string;
  tag_id: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  cover_image_url: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

/** News item from RSS/API aggregation (news.json) */
export interface NewsItem {
  title: string;
  slug: string;
  date: string;
  source: string;
  summary: string;
  url: string;
  tags: string[];
}

export interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
  source: string | null;
  unsubscribed_at: string | null;
}

export type ToolWithRelations = Tool & {
  categories: Category | null;
  tags: Tag[];
};
