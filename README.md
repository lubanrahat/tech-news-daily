# Tech News Daily

A curated daily digest of the most important stories in AI, programming, and software engineering. Built with Next.js, Drizzle ORM, Postgres, and the Gemini API.

## Setup

### 1. Create the database table

You can either use Drizzle Kit to push the schema, or run the SQL manually.

**Option A: Drizzle Kit (recommended)**

```bash
pnpm drizzle-kit push
```

**Option B: Manual SQL**

```sql
CREATE TABLE news_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  summary text NOT NULL,
  key_points text[] NOT NULL,
  category text NOT NULL CHECK (category IN ('AI', 'Programming', 'Software Engineering', 'Tools', 'Security', 'Open Source')),
  source_name text,
  source_url text UNIQUE NOT NULL,
  published_at timestamptz,
  fetched_on date NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_news_items_fetched_on ON news_items (fetched_on DESC);
CREATE INDEX idx_news_items_category ON news_items (category);
```

### 2. Set environment variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

| Variable | Where to find it |
|---|---|
| `DATABASE_URL` | Your Postgres connection string. For Supabase: Settings → Database → Connection string → URI |
| `GEMINI_API_KEY` | [Google AI Studio](https://aistudio.google.com/apikey) |
| `CRON_SECRET` | Any strong random string (e.g. `openssl rand -base64 32`) |

### 3. Run locally

```bash
pnpm install
pnpm dev
```

### 4. Test the cron route manually

```bash
curl -X GET http://localhost:3000/api/cron/fetch-news \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

### 5. Deploy to Vercel

```bash
vercel deploy
```

The `vercel.json` configures a cron job to call `/api/cron/fetch-news` daily at 02:00 UTC.

## Architecture

- **Home page** (`app/page.tsx`): Server component that reads latest news from Postgres via Drizzle
- **Cron API route** (`app/api/cron/fetch-news/route.ts`): Protected endpoint that fetches news via Gemini with Google Search grounding
- **Scheduler**: Vercel cron at 02:00 UTC daily
- **Database**: Postgres with Drizzle ORM

## Tech Stack

- Next.js 16 (App Router, TypeScript)
- Tailwind CSS 4
- Drizzle ORM + Postgres
- Gemini 2.0 Flash (free tier with Google Search grounding)
- Zod for validation
# tech-news-daily
