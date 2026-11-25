export default function Skeleton() {
  return (
    <div className="animate-pulse space-y-6" aria-label="Loading news…">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="border-b border-neutral-150 pb-5 dark:border-neutral-800/60"
        >
          <div className="flex items-center gap-3">
            <div className="h-3 w-16 rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-3 w-20 rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-3 w-10 rounded bg-neutral-200 dark:bg-neutral-800" />
          </div>
          <div className="mt-3 h-5 w-4/5 rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="mt-2 h-4 w-3/5 rounded bg-neutral-100 dark:bg-neutral-800/60" />
          <div className="mt-3 h-3 w-16 rounded bg-neutral-100 dark:bg-neutral-800/60" />
        </div>
      ))}
    </div>
  );
}
