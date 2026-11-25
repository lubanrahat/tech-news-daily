import { db } from "./db";
import { newsItems } from "./db/schema";
import { desc } from "drizzle-orm";
import type { NewsItem } from "./types";

export async function getLatestNews(): Promise<{
  items: NewsItem[];
  fetchedOn: string | null;
}> {
  try {
    const rows = await db
      .select()
      .from(newsItems)
      .orderBy(desc(newsItems.publishedAt))
      .limit(20);

    if (rows.length === 0) {
      return { items: [], fetchedOn: null };
    }

    const items: NewsItem[] = rows.map((row) => ({
      id: row.id,
      title: row.title,
      summary: row.summary,
      key_points: row.keyPoints,
      category: row.category,
      source_name: row.sourceName ?? "",
      source_url: row.sourceUrl,
      published_at: row.publishedAt?.toISOString() ?? "",
      fetched_on: row.fetchedOn,
      created_at: row.createdAt?.toISOString() ?? "",
    }));

    return {
      items,
      fetchedOn: rows[0].fetchedOn,
    };
  } catch (error: unknown) {
    const err = error as Record<string, unknown>;
    console.error(
      "Failed to fetch news:",
      err?.message ?? err,
      "code:", err?.code,
      "detail:", err?.detail,
      "cause:", err?.cause
    );
    return { items: [], fetchedOn: null };
  }
}
