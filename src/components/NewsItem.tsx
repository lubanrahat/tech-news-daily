"use client";

import { useState } from "react";
import type { NewsItem as NewsItemType } from "@/lib/types";
import { formatRelativeTime } from "@/lib/time";
import SummaryPanel from "./SummaryPanel";

interface NewsItemProps {
  item: NewsItemType;
}

function sourceFavicon(url: string): string {
  try {
    const hostname = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=32`;
  } catch {
    return "";
  }
}

export default function NewsItemComponent({ item }: NewsItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className="group py-5 transition-colors first:pt-0 last:pb-0">
      {/* Metadata Bar */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-md border border-neutral-200/60 bg-neutral-100/70 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-neutral-600 backdrop-blur-xs dark:border-neutral-800/80 dark:bg-neutral-900/60 dark:text-neutral-400">
          {item.category}
        </span>
        <span className="text-neutral-300 dark:text-neutral-700" aria-hidden="true">
          ·
        </span>
        <span className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
          {item.source_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={sourceFavicon(item.source_url)}
              alt=""
              width={14}
              height={14}
              className="rounded-xs opacity-75"
              loading="lazy"
            />
          )}
          <span className="font-medium">{item.source_name}</span>
        </span>
        <span className="text-neutral-300 dark:text-neutral-700" aria-hidden="true">
          ·
        </span>
        <time
          dateTime={item.published_at}
          className="font-mono text-[11px] tabular-nums text-neutral-400 dark:text-neutral-500"
        >
          {formatRelativeTime(item.published_at)}
        </time>
      </div>

      {/* Headline */}
      <h3 className="mt-2.5 font-serif text-[17px] font-medium leading-snug text-neutral-900 transition-colors group-hover:text-neutral-700 dark:text-neutral-100 dark:group-hover:text-neutral-200 sm:text-[19px]">
        <a
          href={item.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline hover:decoration-neutral-300 hover:decoration-1 hover:underline-offset-3 dark:hover:decoration-neutral-600"
        >
          {item.title}
        </a>
      </h3>

      {/* Summary Trigger (Frosted Glass Pill) */}
      <div className="mt-3 flex items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-md transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 ${
            isOpen
              ? "border-neutral-400/80 bg-neutral-900 text-white shadow-xs dark:border-neutral-600 dark:bg-neutral-100 dark:text-neutral-900"
              : "border-neutral-200/80 bg-white/70 text-neutral-700 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-neutral-300 hover:bg-white dark:border-neutral-800/80 dark:bg-neutral-900/60 dark:text-neutral-300 dark:hover:border-neutral-700 dark:hover:bg-neutral-800/80"
          }`}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-200 motion-reduce:transition-none ${
              isOpen ? "rotate-90" : ""
            }`}
          >
            <path d="m4.5 2.5 3.5 3.5-3.5 3.5" />
          </svg>
          <span>{isOpen ? "সারসংক্ষেপ বন্ধ করুন" : "বাংলা সারসংক্ষেপ"}</span>
        </button>

        {!isOpen && (
          <span className="text-[11px] text-neutral-400 dark:text-neutral-500">
            Bengali summary available
          </span>
        )}
      </div>

      {/* Expandable Bengali Summary Panel */}
      <SummaryPanel
        summary={item.summary}
        keyPoints={item.key_points}
        sourceUrl={item.source_url}
        isOpen={isOpen}
      />
    </article>
  );
}
