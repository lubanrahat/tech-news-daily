import { formatFullDate } from "@/lib/time";

interface DateLineProps {
  storyCount: number;
  fetchedOn: string | null;
}

export default function DateLine({ storyCount, fetchedOn }: DateLineProps) {
  const today = formatFullDate(new Date());

  return (
    <div className="mb-7 flex flex-col justify-between gap-2 border-b border-neutral-200/60 pb-5 sm:flex-row sm:items-baseline dark:border-neutral-800/60">
      <div>
        <h2 className="font-serif text-2xl font-medium tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-[26px]">
          {today}
        </h2>
        <p className="mt-1 font-mono text-xs text-neutral-500 dark:text-neutral-400">
          {fetchedOn
            ? `নিয়মিত হালনাগাদ · মোট ${storyCount}টি নির্বাচিত খবর (${storyCount} ${
                storyCount === 1 ? "story" : "stories"
              })`
            : "Waiting for first fetch"}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200/70 bg-white/50 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-neutral-500 backdrop-blur-md dark:border-neutral-800/80 dark:bg-neutral-900/50 dark:text-neutral-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>লাইভ ফিড</span>
        </span>
      </div>
    </div>
  );
}
