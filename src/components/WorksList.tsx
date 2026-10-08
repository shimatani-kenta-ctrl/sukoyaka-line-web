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

      <div className="mt-10 space-y-20 md:space-y-28">
        {list.map((w) => (
          <WorkArticle key={w.slug} work={w} />
        ))}
      </div>
    </>
  );
}

function WorkArticle({ work: w }: { work: Work }) {
  const [main, ...rest] = w.photos;
  return (
    <article id={w.slug} className="scroll-mt-28">
      <header data-reveal>
        <div className="flex flex-wrap items-center gap-3 text-[13px] text-steel">
          <span className="bg-ai px-2.5 py-0.5 text-white">{w.category}</span>
          {w.date && <span>{w.date}</span>}
        </div>
        <h2 className="mt-4 text-2xl md:text-[32px]">{w.title}</h2>
        <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-[14px]">
          <div className="flex gap-2">
            <dt className="text-steel">場所</dt>
            <dd>{w.location}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-steel">工期</dt>
            <dd>{w.period}</dd>
          </div>
        </dl>
        <p className="mt-5 max-w-3xl text-[15px] text-steel">{w.summary}</p>
      </header>

      {/* 写真 */}
      <figure data-reveal="wipe" className="mt-8 aspect-[16/10] overflow-hidden bg-ink md:aspect-[21/10]">
        {main ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={main.src} alt={main.caption || w.title} loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <WorkVisual category={w.category} alt={w.title} />
        )}
      </figure>
      {main?.caption && <p className="mt-2 text-[13px] text-steel">{main.caption}</p>}
      {rest.length > 0 && (
        <ul data-reveal-stagger="100" className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          {rest.map((p) => (
            <li key={p.src}>
              <figure>
                <div className="aspect-[4/3] overflow-hidden bg-mist">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.src} alt={p.caption || w.title} loading="lazy" className="h-full w-full object-cover" />
                </div>
                {p.caption && <figcaption className="mt-1.5 text-[12px] text-steel">{p.caption}</figcaption>}
              </figure>
            </li>
          ))}
        </ul>
      )}

      {/* 本文 */}
      <div data-reveal-stagger="120" className="mt-12 max-w-3xl space-y-10">
        {w.sections.map((sec, i) => (
          <section key={i}>
            <h3 className="flex items-center gap-3 text-lg md:text-xl">
              <span aria-hidden="true" className="h-5 w-[3px] bg-sky" />
              {sec.heading}
            </h3>
            <p className="mt-3 whitespace-pre-line text-[15px] leading-[2]">{sec.body}</p>
          </section>
        ))}
      </div>
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
