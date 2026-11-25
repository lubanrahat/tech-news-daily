import { GoogleGenAI } from "@google/genai";
import { newsResponseSchema, type NewsItemInput } from "./schema";

const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

const PROMPT = `You are a senior tech news editor. Find the top 12 to 15 most important and newsworthy stories from the last 24 hours about AI, programming, and software engineering.

For each story, provide:
- title: a clear, concise headline in English
- summary: 2 to 3 sentences written in fluent, professional, and natural Bengali (বাংলা). Plain, factual, and informative with accurate terminology (e.g., কৃত্রিম বুদ্ধিমত্তা, ফ্রেমওয়ার্ক, এপিআই). No promotional hype.
- key_points: exactly 3 short bullet points in Bengali (বাংলা) (each under 100 characters) highlighting key facts.
- category: exactly one of "AI", "Programming", "Software Engineering", "Tools", "Security", "Open Source"
- source_name: the publication or organization name
- source_url: the actual URL of the article (must be a real, grounded URL from search results)
- published_at: ISO 8601 timestamp of publication

Rules:
- Only include stories published in the last 24 hours
- Prefer primary sources and reputable outlets (e.g., official blogs, major tech publications)
- No duplicates, no marketing fluff, no invented URLs
- Every URL must come from actual search results
- The summary and key_points MUST be written in Bengali (বাংলা)
- Aim for a balanced mix across categories
- Return ONLY valid JSON: an array of objects, nothing else. No markdown, no code fences, no explanation.`;

export async function fetchNewsFromGemini(): Promise<NewsItemInput[]> {
  const response = await genai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: PROMPT,
    config: {
      tools: [{ googleSearch: {} }],
      temperature: 0.3,
    },
  });

  const text = response.text?.trim();
  if (!text) {
    throw new Error("Gemini returned empty response");
  }

  // Strip markdown code fences if present
  const cleaned = text
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  const parsed = JSON.parse(cleaned);
  const result = newsResponseSchema.safeParse(parsed);

  if (result.success) {
    return result.data;
  }

  // Retry once on parse failure
  console.error("First parse failed, retrying...", result.error);

  const retryResponse = await genai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `${PROMPT}\n\nIMPORTANT: Your previous response had JSON errors. Return ONLY a valid JSON array.`,
    config: {
      tools: [{ googleSearch: {} }],
      temperature: 0.1,
    },
  });

  const retryText = retryResponse.text?.trim();
  if (!retryText) {
    throw new Error("Gemini retry returned empty response");
  }

  const retryCleaned = retryText
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  const retryParsed = JSON.parse(retryCleaned);
  const retryResult = newsResponseSchema.parse(retryParsed);
  return retryResult;
}
