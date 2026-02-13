/**
 * fetch-news.ts
 *
 * Build-time script that fetches AI-related news from multiple RSS/API sources,
 * normalizes the data, deduplicates, and outputs a static news.json file.
 *
 * Usage:
 *   npx tsx scripts/fetch-news.ts
 *   npm run build-news
 *
 * Pipeline: RSS/API → fetch → normalize → deduplicate → sort → news.json
 */

import Parser from "rss-parser";
import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";

// ─── Types ───────────────────────────────────────────────────────────────────

interface NewsItem {
  title: string;
  slug: string;
  date: string;
  source: string;
  summary: string;
  url: string;
  tags: string[];
}

interface FeedSource {
  name: string;
  url: string;
  tags: string[];
}

// ─── Configuration ───────────────────────────────────────────────────────────

const MAX_ITEMS = 100;
const FETCH_TIMEOUT = 15000; // 15 seconds per feed

const FEED_SOURCES: FeedSource[] = [
  // Product/Tools
  {
    name: "Product Hunt",
    url: "https://www.producthunt.com/feed",
    tags: ["product", "tools"],
  },
  // Developer/Trending
  {
    name: "Hacker News",
    url: "https://hnrss.org/newest?q=AI+artificial+intelligence+LLM+GPT",
    tags: ["developer", "trending"],
  },
  {
    name: "Hacker News - ML",
    url: "https://hnrss.org/newest?q=machine+learning+deep+learning",
    tags: ["developer", "ml"],
  },
  // Research/Industry
  {
    name: "OpenAI Blog",
    url: "https://openai.com/blog/rss.xml",
    tags: ["research", "openai"],
  },
  {
    name: "Google AI Blog",
    url: "https://blog.google/technology/ai/rss/",
    tags: ["research", "google"],
  },
  {
    name: "Microsoft AI Blog",
    url: "https://blogs.microsoft.com/ai/feed/",
    tags: ["research", "microsoft"],
  },
  {
    name: "Towards Data Science",
    url: "https://towardsdatascience.com/feed",
    tags: ["research", "tutorial"],
  },
  // Community
  {
    name: "Reddit r/MachineLearning",
    url: "https://www.reddit.com/r/MachineLearning/.rss",
    tags: ["community", "ml"],
  },
  {
    name: "Reddit r/artificial",
    url: "https://www.reddit.com/r/artificial/.rss",
    tags: ["community", "ai"],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function generateSlug(title: string, date: string): string {
  const base = slugify(title);
  const hash = crypto.createHash("md5").update(title + date).digest("hex").slice(0, 6);
  return `${base}-${hash}`;
}

function extractSummary(content: string | undefined, maxLen = 200): string {
  if (!content) return "";

  // Strip HTML tags
  let text = content.replace(/<[^>]*>/g, " ");
  // Decode common HTML entities
  text = text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
  // Collapse whitespace
  text = text.replace(/\s+/g, " ").trim();

  // Try to extract first 1-2 sentences
  const sentenceEnd = text.indexOf(". ", 60);
  if (sentenceEnd > 0 && sentenceEnd < maxLen) {
    return text.slice(0, sentenceEnd + 1);
  }

  // Fallback: trim to maxLen
  if (text.length > maxLen) {
    return text.slice(0, maxLen).replace(/\s+\S*$/, "") + "...";
  }

  return text;
}

function normalizeDate(dateStr: string | undefined): string {
  if (!dateStr) return new Date().toISOString();
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return new Date().toISOString();
    return d.toISOString();
  } catch {
    return new Date().toISOString();
  }
}

// ─── Fetch Logic ─────────────────────────────────────────────────────────────

async function fetchFeed(source: FeedSource): Promise<NewsItem[]> {
  const parser = new Parser({
    timeout: FETCH_TIMEOUT,
    headers: {
      "User-Agent": "AI-Tools-Navigator/1.0 (RSS Reader)",
      Accept: "application/rss+xml, application/xml, text/xml, */*",
    },
  });

  try {
    console.log(`  📡 Fetching: ${source.name} (${source.url})`);
    const feed = await parser.parseURL(source.url);
    const items: NewsItem[] = [];

    for (const entry of feed.items || []) {
      const title = (entry.title || "").trim();
      if (!title) continue;

      const date = normalizeDate(entry.pubDate || entry.isoDate);
      const url = entry.link || "";
      const summary = extractSummary(
        entry.contentSnippet || entry.content || entry.summary || entry.title || ""
      );

      items.push({
        title,
        slug: generateSlug(title, date),
        date,
        source: source.name,
        summary,
        url,
        tags: [...source.tags],
      });
    }

    console.log(`  ✅ ${source.name}: ${items.length} items`);
    return items;
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.warn(`  ⚠️  Failed to fetch ${source.name}: ${msg}`);
    return [];
  }
}

// ─── GitHub Trending (HTML scraping alternative via API) ─────────────────────

async function fetchGitHubTrending(): Promise<NewsItem[]> {
  const topics = ["artificial-intelligence", "machine-learning"];
  const items: NewsItem[] = [];

  for (const topic of topics) {
    try {
      console.log(`  📡 Fetching: GitHub Trending (${topic})`);
      const res = await fetch(
        `https://api.github.com/search/repositories?q=topic:${topic}&sort=stars&order=desc&per_page=10`,
        {
          headers: {
            "User-Agent": "AI-Tools-Navigator/1.0",
            Accept: "application/vnd.github.v3+json",
          },
          signal: AbortSignal.timeout(FETCH_TIMEOUT),
        }
      );

      if (!res.ok) {
        console.warn(`  ⚠️  GitHub API returned ${res.status}`);
        continue;
      }

      const data = await res.json();
      for (const repo of data.items || []) {
        const title = `${repo.full_name}: ${repo.description || "A trending AI repository"}`;
        const date = normalizeDate(repo.pushed_at || repo.updated_at);

        items.push({
          title,
          slug: generateSlug(repo.full_name, date),
          date,
          source: "GitHub Trending",
          summary: `⭐ ${repo.stargazers_count.toLocaleString()} stars · ${repo.language || "Multi-language"} · ${repo.description || ""}`.slice(0, 200),
          url: repo.html_url,
          tags: ["developer", "github", topic],
        });
      }
      console.log(`  ✅ GitHub Trending (${topic}): ${data.items?.length || 0} items`);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      console.warn(`  ⚠️  Failed to fetch GitHub Trending (${topic}): ${msg}`);
    }
  }

  return items;
}

// ─── Deduplication ───────────────────────────────────────────────────────────

function deduplicateItems(items: NewsItem[]): NewsItem[] {
  const seen = new Map<string, NewsItem>();

  for (const item of items) {
    // Normalize key: lowercase title, strip non-alphanumeric
    const key = item.title.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]/g, "");

    if (!seen.has(key)) {
      seen.set(key, item);
    }
  }

  return Array.from(seen.values());
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log("\n🚀 AI Tools Navigator — News Aggregator\n");
  console.log("═".repeat(50));

  // 1. Fetch all RSS feeds in parallel
  console.log("\n📥 Phase 1: Fetching RSS feeds...\n");
  const feedPromises = FEED_SOURCES.map((source) => fetchFeed(source));
  const feedResults = await Promise.allSettled(feedPromises);

  let allItems: NewsItem[] = [];
  for (const result of feedResults) {
    if (result.status === "fulfilled") {
      allItems.push(...result.value);
    }
  }

  // 2. Fetch GitHub Trending
  console.log("\n📥 Phase 2: Fetching GitHub Trending...\n");
  const githubItems = await fetchGitHubTrending();
  allItems.push(...githubItems);

  console.log(`\n📊 Total raw items: ${allItems.length}`);

  // 3. Deduplicate
  console.log("🔄 Phase 3: Deduplicating...");
  allItems = deduplicateItems(allItems);
  console.log(`   After dedup: ${allItems.length}`);

  // 4. Sort by date (newest first)
  allItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // 5. Keep only latest MAX_ITEMS
  allItems = allItems.slice(0, MAX_ITEMS);
  console.log(`   Keeping latest ${allItems.length} items`);

  // 6. Write to news.json
  const outputPath = path.join(__dirname, "..", "src", "data", "news.json");
  fs.writeFileSync(outputPath, JSON.stringify(allItems, null, 2), "utf-8");
  console.log(`\n✅ Written to: ${outputPath}`);
  console.log(`   Items: ${allItems.length}`);

  // Print source breakdown
  const sourceCounts: Record<string, number> = {};
  for (const item of allItems) {
    sourceCounts[item.source] = (sourceCounts[item.source] || 0) + 1;
  }
  console.log("\n📈 Source breakdown:");
  for (const [source, count] of Object.entries(sourceCounts).sort((a, b) => b[1] - a[1])) {
    console.log(`   ${source}: ${count}`);
  }

  console.log("\n" + "═".repeat(50));
  console.log("🎉 News aggregation complete!\n");
}

main().catch((err) => {
  console.error("❌ Fatal error:", err);
  process.exit(1);
});
