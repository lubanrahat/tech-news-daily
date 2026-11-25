import { Suspense } from "react";
import Header from "@/components/Header";
import DateLine from "@/components/DateLine";
import NewsList from "@/components/NewsList";
import Skeleton from "@/components/Skeleton";
import Footer from "@/components/Footer";
import { getLatestNews } from "@/lib/data";

async function NewsContent() {
  const { items, fetchedOn } = await getLatestNews();

  return (
    <>
      <DateLine storyCount={items.length} fetchedOn={fetchedOn} />
      {items.length > 0 ? (
        <NewsList items={items} />
      ) : (
        <div className="my-12 rounded-3xl border border-neutral-200/70 bg-white/40 p-12 text-center shadow-xs backdrop-blur-xl dark:border-neutral-800/70 dark:bg-neutral-900/30">
          <p className="font-serif text-xl font-medium text-neutral-700 dark:text-neutral-300">
            আজকের খবর সংগ্রহ করা হচ্ছে
          </p>
          <p className="mt-2 text-sm text-neutral-400 dark:text-neutral-500">
            প্রতিদিন ০২:০০ ইউটিসিতে স্বয়ংক্রিয়ভাবে নতুন সংবাদ সংগৃহীত হয়।
          </p>
        </div>
      )}
    </>
  );
}

export default function Home() {
  return (
    <div className="relative flex min-h-full flex-col overflow-x-hidden selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-900">
      {/* Ambient background refraction sources for subtle glassmorphism depth */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[360px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-neutral-200/40 via-neutral-100/20 to-transparent blur-3xl dark:from-neutral-800/20 dark:via-neutral-900/10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-[30%] -right-40 -z-10 h-[280px] w-[400px] rounded-full bg-gradient-to-br from-neutral-200/20 to-transparent blur-3xl dark:from-neutral-800/10"
        aria-hidden="true"
      />

      <Header />
      <main className="mx-auto w-full max-w-[760px] flex-1 px-4 py-8 sm:px-6">
        <Suspense fallback={<Skeleton />}>
          <NewsContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
