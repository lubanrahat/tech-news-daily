interface SummaryPanelProps {
  summary: string;
  keyPoints: string[];
  sourceUrl: string;
  isOpen: boolean;
}

export default function SummaryPanel({
  summary,
  keyPoints,
  sourceUrl,
  isOpen,
}: SummaryPanelProps) {
  return (
    <div
      className="grid transition-all duration-300 ease-out motion-reduce:transition-none"
      style={{
        gridTemplateRows: isOpen ? "1fr" : "0fr",
        opacity: isOpen ? 1 : 0,
      }}
    >
      <div className="overflow-hidden">
        {/* Glassmorphism Card */}
        <div className="my-3 rounded-2xl border border-neutral-200/70 bg-gradient-to-b from-white/80 via-white/50 to-white/30 p-4.5 shadow-[0_8px_24px_rgba(0,0,0,0.03)] backdrop-blur-xl transition-all dark:border-neutral-800/80 dark:bg-gradient-to-b dark:from-neutral-900/80 dark:via-neutral-900/50 dark:to-neutral-950/40 dark:shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
          {/* Header indicator with Bengali label */}
          <div className="mb-2.5 flex items-center justify-between border-b border-neutral-200/50 pb-2 dark:border-neutral-800/60">
            <div className="flex items-center gap-1.5">
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="font-mono text-[11px] font-medium tracking-wide text-neutral-600 dark:text-neutral-400">
                বাংলা সারসংক্ষেপ
              </span>
            </div>
            <span className="font-mono text-[10px] tracking-wider text-neutral-400 dark:text-neutral-500">
              AI SUMMARY
            </span>
          </div>

          {/* Bengali Summary Text */}
          <p className="text-[14px] leading-relaxed text-neutral-700 antialiased dark:text-neutral-300">
            {summary}
          </p>

          {/* Key Points */}
          {keyPoints && keyPoints.length > 0 && (
            <div className="mt-3.5 space-y-2 border-t border-neutral-200/50 pt-3 dark:border-neutral-800/60">
              <div className="text-[11px] font-medium tracking-wide text-neutral-500 dark:text-neutral-400">
                মূল বিষয়বস্তু:
              </div>
              <ul className="space-y-1.5 pl-0.5">
                {keyPoints.map((point, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-[13px] leading-normal text-neutral-600 dark:text-neutral-400"
                  >
                    <span
                      className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400/80 dark:bg-neutral-500"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Read Original Action */}
          <div className="mt-4 flex items-center justify-between border-t border-neutral-200/40 pt-2.5 dark:border-neutral-800/50">
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-200/50 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800/60 dark:hover:text-neutral-100"
            >
              <span>মূল প্রতিবেদন পড়ুন (Original)</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
              >
                <path d="M4.5 1.5h6m0 0v6m0-6L2 10" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
