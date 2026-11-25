import {
  pgTable,
  uuid,
  text,
  date,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

export const newsItems = pgTable(
  "news_items",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    summary: text("summary").notNull(),
    keyPoints: text("key_points").array().notNull(),
    category: text("category").notNull(),
    sourceName: text("source_name"),
    sourceUrl: text("source_url").unique().notNull(),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    fetchedOn: date("fetched_on").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("idx_news_items_fetched_on").on(table.fetchedOn),
    index("idx_news_items_category").on(table.category),
  ]
);
