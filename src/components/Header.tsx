"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

function subscribeTheme(callback: () => void) {
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.attributeName === "class") {
        callback();
      }
    }
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getThemeSnapshot(): "light" | "dark" {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getServerThemeSnapshot(): "light" | "dark" {
  return "light";
}

export default function Header() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  );

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    try {
      localStorage.setItem("theme", next);
    } catch {}
    document.documentElement.classList.toggle("dark", next === "dark");
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200/60 bg-white/70 backdrop-blur-xl transition-colors dark:border-neutral-800/70 dark:bg-neutral-950/70">
      <div className="mx-auto flex h-14 max-w-[760px] items-center justify-between px-4 sm:px-6">
        {/* Wordmark with refined craft indicator */}
        <div className="flex items-center gap-2.5">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-[18px] font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
              Tech News Daily
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500 sm:inline-block">
              দৈনিক প্রযুক্তি সংবাদ
            </span>
          </div>
        </div>

        {/* Theme Toggle with Glass Pill Styling */}
        {mounted && (
          <button
            onClick={toggleTheme}
            className="group flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200/70 bg-white/60 text-neutral-600 shadow-[0_2px_8px_rgba(0,0,0,0.02)] backdrop-blur-md transition-all hover:border-neutral-300 hover:bg-white hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 dark:border-neutral-800/80 dark:bg-neutral-900/60 dark:text-neutral-400 dark:hover:border-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? (
              <svg
                width="15"
                height="15"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:rotate-45"
              >
                <path d="M8 1v1m0 12v1m7-7h-1M2 8H1m12.07-4.07-.71.71M4.64 12.36l-.71.71m9.14 0-.71-.71M4.64 4.64l-.71-.71" />
                <circle cx="8" cy="8" r="3" />
              </svg>
            ) : (
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:-rotate-12"
              >
                <path d="M14 9.68A6.5 6.5 0 0 1 6.32 2 6.5 6.5 0 1 0 14 9.68Z" />
              </svg>
            )}
          </button>
        )}
      </div>
    </header>
  );
}
