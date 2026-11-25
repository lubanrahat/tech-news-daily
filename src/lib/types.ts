export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  key_points: string[];
  category: string;
  source_name: string;
  source_url: string;
  published_at: string;
  fetched_on: string;
  created_at: string;
}

export const CATEGORIES = [
  "All",
  "AI",
  "Programming",
  "Software Engineering",
  "Tools",
  "Security",
  "Open Source",
] as const;

export type Category = (typeof CATEGORIES)[number];
