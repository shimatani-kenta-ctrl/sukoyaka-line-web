"use client";

import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "./ui";

/** 見出しを1文字ずつ現れさせる（読み上げは sr-only の文で行う） */
function SplitLine({ text, start }: { text: string; start: number }) {
  return (
    <span aria-hidden="true" className="inline-block">
      {Array.from(text).map((ch, i) => (
        <span key={i} className="hero-char" style={{ ["--d" as string]: `${(start + i * 0.06).toFixed(2)}s` }}>
          {ch}
        </span>
      ))}
    </span>
  );
}

/** 事業内容の切り替え（写真はすべて自社の施工写真） */
const items = [
  {
    name: "各種配管工事",
    body: "工場・プラントの配管の新設・増設・改修。休止期間に合わせた短工期の工事にも対応します。",
    photo: "/photos/water-injection-piping.jpg",
    alt: "注水用の水の配管（バルブ・圧力計付き）",
  },
  {
    name: "架台製作及び据付",
    body: "機器や配管を支える架台を製作し、据付まで行います。",
    photo: "/photos/air-filter-angle-frame.jpg",
    alt: "アングルの架台とエアフィルターまわりの配管",
  },
  {
    name: "各種配管製作",
    body: "現場の寸法や取合いに合わせて、配管を加工・製作します。",
    photo: "/photos/sus-flange-spools.jpg",
    alt: "ステンレスのフランジ付き短管",
  },
  {
    name: "溶接工事",
    body: "ステンレス・鋼管のTIG溶接、アーク溶接に対応します。",
    photo: "/photos/tig-socket-weld.jpg",
    alt: "配管にねじ込みソケットをTIG溶接した部分",
  },
];

/**
 * トップの見出し（アイソメ図のデザイン）。
 * 紺の方眼の上に、ぼかした配管のアイソメ図。スクロールに合わせて図面が流れながら線が描き足され、
 * 下の写真カードが「配管工事 → 架台 → 配管製作 → 溶接」と切り替わる。ボタンでも切り替えられる。
 */
export function IsoHero() {
  const ref = useRef<HTMLElement>(null);
  const [idx, setIdx] = useState(0);
  const picked = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const range = Math.max(1, el.offsetHeight - window.innerHeight);
      const r = Math.min(1, Math.max(0, -rect.top / range));
      el.style.setProperty("--r", r.toFixed(4));
      if (!picked.current) setIdx(Math.min(items.length - 1, Math.floor(r * items.length)));
    };
    const onScroll = () => {
      picked.current = false;
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const cur = items[idx];

  return (
    <section ref={ref} className="iso-hero relative bg-ink text-white" style={{ ["--r" as string]: 0 }}>
      <div className="iso-stage iso-grid sticky overflow-hidden">
        {/* 背景のアイソメ図（ぼかし・スクロールで流れる） */}
        <svg aria-hidden="true" viewBox="0 0 419 651" className="iso-bg pointer-events-none absolute">
          <g fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path pathLength={1} className="iso-l1" d="M60,71.5 L338.9,232.5 L338.9,94.5 L99.8,232.5 L99.8,370.5 L338.9,508.5" stroke="#7fe3e8" strokeWidth={9} />
            <path pathLength={1} className="iso-l2" d="M199.4,152 L358.8,60" stroke="#7fe3e8" strokeWidth={7} />
            <path
              pathLength={1}
              className="iso-l3"
              d="M243.2,517.7 L243.2,437.2 L195.4,464.8 L195.4,545.3 M322.9,563.7 L322.9,483.2 L275.1,510.8 L275.1,591.3 M195.4,464.8 L275.1,510.8"
              stroke="#b8ecef"
              strokeWidth={6}
            />
          </g>
          <g fill="#00c2cb">
            <circle cx="338.9" cy="232.5" r="10" />
            <circle cx="338.9" cy="94.5" r="10" />
            <circle cx="99.8" cy="232.5" r="10" />
            <circle cx="99.8" cy="370.5" r="10" />
          </g>
        </svg>

        <div className="relative z-[1] mx-auto flex h-full max-w-6xl flex-col justify-between gap-6 px-4 pb-6 pt-8 md:px-8 md:pb-10 md:pt-12">
          <div className="my-auto">
            <h1 className="hero-in text-[13px] font-medium tracking-[0.25em] text-sky md:text-[15px]" style={{ ["--d" as string]: "0.1s" }}>
              兵庫県尼崎市の配管工事会社
            </h1>
            <p className="iso-catch mt-4 font-display font-extrabold tracking-[0.06em] md:mt-6">
              <span className="sr-only">確かな技術を、確かな未来へ。</span>
              <SplitLine text="確かな技術を、" start={0.3} />
              <br />
              <SplitLine text="確かな未来へ。" start={0.78} />
            </p>
            <div className="hero-in mt-6 flex flex-col gap-3 sm:flex-row md:mt-8" style={{ ["--d" as string]: "1.5s" }}>
              <ButtonLink href="/contact/" variant="light">
                工事を相談する
              </ButtonLink>
              <ButtonLink href="/works/" variant="ghost">
                施工事例を見る
              </ButtonLink>
            </div>
          </div>

          <div className="hero-in flex flex-wrap items-stretch gap-3 md:gap-6" style={{ ["--d" as string]: "1.7s" }}>
            <div className="iso-card grid min-w-0 items-center gap-4 rounded-sm border border-white/30 bg-ink-deep/70 p-2.5 md:gap-5 md:p-3">
              <img key={cur.photo} src={cur.photo} alt={cur.alt} className="iso-photo aspect-[4/3] w-full object-cover" />
              <div className="min-w-0" aria-live="polite">
                <p className="text-[17px] font-bold md:text-[22px]">{cur.name}</p>
                <p className="mt-1.5 text-[12.5px] leading-[1.8] text-white/75 md:mt-2 md:text-[14px]">{cur.body}</p>
              </div>
            </div>
            <div className="grid w-full grid-cols-2 gap-2 md:w-auto md:content-center md:gap-2.5">
              {items.map((it, i) => (
                <button
                  key={it.name}
                  type="button"
                  aria-pressed={i === idx}
                  onClick={() => {
                    picked.current = true;
                    setIdx(i);
                  }}
                  className={`min-h-11 whitespace-nowrap rounded-full border px-3 text-[12.5px] font-bold transition-colors md:min-h-12 md:px-5 md:text-[14px] ${
                    i === idx ? "border-sky bg-sky text-ink" : "border-white/50 bg-ink/80 text-white hover:border-sky"
                  }`}
                >
                  {it.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
