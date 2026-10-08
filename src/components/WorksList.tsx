"use client";

import Link from "next/link";
import { useState } from "react";
import { workCategories, works, type Work, type WorkCategory } from "@/data/works";
import { site } from "@/config/site";
import { WorkVisual } from "./WorkVisual";

/** 施工事例の一覧 */
export function WorksList() {
  const [filter, setFilter] = useState<WorkCategory | "all">("all");

  if (works.length === 0) return <WorksEmpty />;

  const list = filter === "all" ? works : works.filter((w) => w.category === filter);
  const tabs = (["all", ...workCategories] as const).filter(
    (t) => t === "all" || works.some((w) => w.category === t),
  );

  return (
    <>
      {tabs.length > 2 && (
        <div role="group" aria-label="工事の種類で絞り込む" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">
          {tabs.map((t) => {
            const active = filter === t;
            const count = t === "all" ? works.length : works.filter((w) => w.category === t).length;
            return (
              <button
                key={t}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(t)}
                className={`shrink-0 rounded-sm border px-4 py-2 text-[14px] transition-colors ${
                  active ? "border-ai bg-ai text-white" : "border-line bg-white text-ink hover:border-ai"
                }`}
              >
                {t === "all" ? "すべて" : t}
                <span className={`ml-2 text-[12px] ${active ? "text-white/70" : "text-steel"}`}>{count}</span>
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-10 space-y-14 md:space-y-20">
        {list.map((w) => (
          <WorkCard key={w.slug} work={w} />
        ))}
      </div>
    </>
  );
}

/** 一覧のカード。詳しい内容は事例ごとのページ（/works/記事のslug/）で読めます */
function WorkCard({ work: w }: { work: Work }) {
  return (
    <article id={w.slug} className="scroll-mt-28">
      <Link href={`/works/${w.slug}/`} className="group grid gap-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-10">
        <div data-reveal="wipe" className="aspect-[16/10] overflow-hidden bg-ink">
          <WorkVisual
            category={w.category}
            image={w.photos[0]?.src}
            alt={w.photos[0]?.caption || w.title}
            className="transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <div data-reveal>
          <div className="flex flex-wrap items-center gap-3 text-[13px] text-steel">
            <span className="bg-ai px-2.5 py-0.5 text-white">{w.category}</span>
            {w.date && <span>{w.date}</span>}
          </div>
          <h2 className="mt-4 text-xl leading-relaxed group-hover:text-ai md:text-2xl">{w.title}</h2>
          <p className="mt-2 text-[14px] text-steel">{w.location}</p>
          <p className="mt-4 text-[15px] leading-[1.9]">{w.summary}</p>
          <p className="mt-5 text-[14px] tracking-[0.1em] text-ai">
            詳しく見る<span aria-hidden="true"> →</span>
          </p>
        </div>
      </Link>
    </article>
  );
}

function WorksEmpty() {
  return (
    <div data-reveal className="border border-dashed border-line bg-white px-6 py-16 text-center md:py-20">
      <p className="font-display text-xl font-extrabold md:text-2xl">施工事例は、順次掲載していきます。</p>
      <p className="mx-auto mt-4 max-w-xl text-[15px] text-steel">
        日々の現場の様子はInstagramでご覧いただけます。工事のご相談は、お気軽にお問い合わせください。
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        {site.instagram.profileUrl && (
          <a
            href={site.instagram.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-sm bg-ink px-7 text-[15px] tracking-[0.1em] text-white transition-colors hover:bg-ai"
          >
            Instagramを見る
          </a>
        )}
        <Link
          href="/contact/"
          className="inline-flex min-h-12 items-center justify-center rounded-sm border border-ai px-7 text-[15px] tracking-[0.1em] text-ai transition-colors hover:bg-ai hover:text-white"
        >
          工事を相談する
        </Link>
      </div>
    </div>
  );
}
