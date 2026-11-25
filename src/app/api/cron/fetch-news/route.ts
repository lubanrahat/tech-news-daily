import { NextRequest, NextResponse } from "next/server";
import { fetchNewsFromGemini } from "@/lib/gemini";
import { db } from "@/lib/db";
import { newsItems } from "@/lib/db/schema";

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get("authorization");
  const expectedToken = `Bearer ${process.env.CRON_SECRET}`;

  if (!authHeader || authHeader !== expectedToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const items = await fetchNewsFromGemini();
    const today = new Date().toISOString().slice(0, 10);

    let upsertedCount = 0;
    for (const item of items) {
      try {
        await db
          .insert(newsItems)
          .values({
            title: item.title,
            summary: item.summary,
            keyPoints: item.key_points,
            category: item.category,
            sourceName: item.source_name,
            sourceUrl: item.source_url,
            publishedAt: new Date(item.published_at),
            fetchedOn: today,
          })
          .onConflictDoUpdate({
            target: newsItems.sourceUrl,
            set: {
              title: item.title,
              summary: item.summary,
              keyPoints: item.key_points,
              category: item.category,
              sourceName: item.source_name,
              publishedAt: new Date(item.published_at),
              fetchedOn: today,
            },
          });
        upsertedCount++;
      } catch (err) {
        console.error(
          `Failed to upsert "${item.title}":`,
          err instanceof Error ? err.message : err
        );
      }
    }

    return NextResponse.json({
      success: true,
      fetched: items.length,
      upserted: upsertedCount,
      date: today,
    });
  } catch (error) {
    console.error("Cron fetch-news failed:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch news",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
