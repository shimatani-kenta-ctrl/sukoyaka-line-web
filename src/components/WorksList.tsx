"use client";

import { useState } from "react";
import { workCategories, works, type WorkCategory } from "@/data/works";
import { WorkVisual } from "./WorkVisual";
import { SampleBadge } from "./ui";

export function WorksList() {
  const [filter, setFilter] = useState<WorkCategory | "all">("all");
  const list = filter === "all" ? works : works.filter((w) => w.category === filter);
  const tabs: (WorkCategory | "all")[] = ["all", ...workCategories];

  return (
    <>
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

      <ul className="mt-10 space-y-14 md:space-y-20">
        {list.map((w) => (
          <li key={w.slug} id={w.slug} className="scroll-mt-28">
            <article className="grid gap-6 md:grid-cols-[1.1fr_1fr] md:gap-12">
              <div className="aspect-[16/10] overflow-hidden">
                <WorkVisual category={w.category} image={w.image} alt={w.title} />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 text-[13px] text-steel">
                  <span className="text-ai">{w.category}</span>
                  {w.sample && <SampleBadge />}
                </div>
                <h2 className="mt-3 text-xl leading-relaxed md:text-2xl">{w.title}</h2>
                <p className="mt-4 text-[15px] text-steel">{w.summary}</p>
                <dl className="mt-6 grid grid-cols-[72px_1fr] gap-x-4 gap-y-2 border-t border-line pt-5 text-[14px]">
                  <dt className="text-steel">場所</dt>
                  <dd>{w.location}</dd>
                  <dt className="text-steel">工期</dt>
                  <dd>{w.period}</dd>
                  <dt className="text-steel">内容</dt>
                  <dd className="flex flex-wrap gap-2">
                    {w.scope.map((s) => (
                      <span key={s} className="bg-mist px-2 py-0.5 text-[13px]">
                        {s}
                      </span>
                    ))}
                  </dd>
                </dl>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
