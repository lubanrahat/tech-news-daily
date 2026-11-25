"use client";

import { useState, useMemo } from "react";
import type { NewsItem } from "@/lib/types";
import type { Category } from "@/lib/types";
import CategoryTabs from "./CategoryTabs";
import NewsItemComponent from "./NewsItem";

interface NewsListProps {
  items: NewsItem[];
}

export default function NewsList({ items }: NewsListProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const item of items) {
      c[item.category] = (c[item.category] || 0) + 1;
    }
    return c;
  }, [items]);

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? items
        : items.filter((item) => item.category === activeCategory),
    [items, activeCategory]
  );

  return (
    <>
      <CategoryTabs
        active={activeCategory}
        onChange={setActiveCategory}
        counts={counts}
      />
      {filtered.length > 0 ? (
        <div className="divide-y divide-neutral-150 dark:divide-neutral-800/60">
          {filtered.map((item) => (
            <NewsItemComponent key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-sm text-neutral-500 dark:text-neutral-500">
            No stories in this category today.
          </p>
        </div>
      )}
    </>
  );
}
