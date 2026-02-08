-- AI Tools Directory: initial schema
-- Run this in Supabase SQL Editor or via Supabase CLI

-- Categories
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- Tags
CREATE TABLE IF NOT EXISTS tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_tags_slug ON tags(slug);

-- Tools
CREATE TABLE IF NOT EXISTS tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  short_description TEXT,
  description TEXT,
  pros JSONB,
  cons JSONB,
  price_tier TEXT,
  price_note TEXT,
  website_url TEXT,
  affiliate_url TEXT,
  logo_url TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  sort_order INT NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_tools_slug ON tools(slug);
CREATE INDEX IF NOT EXISTS idx_tools_category_id ON tools(category_id);
CREATE INDEX IF NOT EXISTS idx_tools_published_featured ON tools(published, is_featured, sort_order);

-- Tool-Tag many-to-many
CREATE TABLE IF NOT EXISTS tool_tags (
  tool_id UUID NOT NULL REFERENCES tools(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (tool_id, tag_id)
);

-- Posts (news/updates)
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  cover_image_url TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts(published, published_at DESC);

-- Subscribers
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  source TEXT,
  unsubscribed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);

-- RLS: allow public read for categories, tags, tools, posts; allow insert for subscribers
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read tags" ON tags FOR SELECT USING (true);
CREATE POLICY "Public read tools" ON tools FOR SELECT USING (true);
CREATE POLICY "Public read tool_tags" ON tool_tags FOR SELECT USING (true);
CREATE POLICY "Public read posts" ON posts FOR SELECT USING (true);

CREATE POLICY "Public read subscribers" ON subscribers FOR SELECT USING (false);
CREATE POLICY "Anyone can subscribe" ON subscribers FOR INSERT WITH CHECK (true);
