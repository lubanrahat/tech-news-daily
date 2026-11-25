"use client";

import { CATEGORIES, type Category } from "@/lib/types";

interface CategoryTabsProps {
  active: Category;
  onChange: (category: Category) => void;
  counts: Record<string, number>;
}

export default function CategoryTabs({
  active,
  onChange,
  counts,
}: CategoryTabsProps) {
  return (
    <div className="mb-8">
      {/* Frosted Glass Segmented Container */}
      <nav
        className="inline-flex max-w-full flex-wrap items-center gap-1 rounded-2xl border border-neutral-200/70 bg-white/60 p-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] backdrop-blur-xl dark:border-neutral-800/80 dark:bg-neutral-900/60 dark:shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
        role="tablist"
        aria-label="Filter by category"
      >
        {CATEGORIES.map((cat) => {
          const count = cat === "All" ? undefined : counts[cat] ?? 0;
          const isActive = active === cat;

          return (
            <button
              key={cat}
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(cat)}
              className={`group relative rounded-xl px-3 py-1.5 font-sans text-xs font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 ${
                isActive
                  ? "bg-neutral-900 text-white shadow-xs dark:bg-neutral-100 dark:text-neutral-900"
                  : "text-neutral-600 hover:bg-neutral-200/50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800/50 dark:hover:text-neutral-100"
              }`}
            >
              <span>{cat}</span>
              {count !== undefined && count > 0 && (
                <span
                  className={`ml-1.5 font-mono text-[11px] tabular-nums ${
                    isActive
                      ? "text-neutral-300 dark:text-neutral-600"
                      : "text-neutral-400 opacity-70 group-hover:opacity-100 dark:text-neutral-500"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
