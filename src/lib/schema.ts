import { z } from "zod/v4";

export const newsItemSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  key_points: z.array(z.string()).min(1).max(5),
  category: z.enum([
    "AI",
    "Programming",
    "Software Engineering",
    "Tools",
    "Security",
    "Open Source",
  ]),
  source_name: z.string().min(1),
  source_url: z.url(),
  published_at: z.string().min(1),
});

export const newsResponseSchema = z.array(newsItemSchema).min(1).max(20);

export type NewsItemInput = z.infer<typeof newsItemSchema>;
