CREATE TABLE "news_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"summary" text NOT NULL,
	"key_points" text[] NOT NULL,
	"category" text NOT NULL,
	"source_name" text,
	"source_url" text NOT NULL,
	"published_at" timestamp with time zone,
	"fetched_on" date NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "news_items_source_url_unique" UNIQUE("source_url")
);
--> statement-breakpoint
CREATE INDEX "idx_news_items_fetched_on" ON "news_items" USING btree ("fetched_on");--> statement-breakpoint
CREATE INDEX "idx_news_items_category" ON "news_items" USING btree ("category");