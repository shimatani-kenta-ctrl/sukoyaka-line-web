import { ButtonLink } from "./ui";

const route =
  "M-20 470 H250 a70 70 0 0 0 70 -70 V270 a70 70 0 0 1 70 -70 H560 a70 70 0 0 0 70 -70 V-20";

/** 配管の図。PCでは右側の背景、スマホでは文章の下に置く */
function PipeArt({ id, viewBox, className, fade }: { id: string; viewBox: string; className: string; fade?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox={viewBox} preserveAspectRatio="xMaxYMid slice" className={className}>
      <defs>
        <pattern id={`${id}-grid`} width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M28 0 H0 V28" fill="none" stroke="#1f5a96" strokeOpacity="0.25" strokeWidth="0.8" />
        </pattern>
        <linearGradient id={`${id}-fade`} x1="0" x2="1">
          <stop offset="0" stopColor="#0e2a47" />
          <stop offset="0.35" stopColor="#0e2a47" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="-200" y="-100" width="1200" height="800" fill={`url(#${id}-grid)`} />

      {/* 管の本体 */}
      <path
        d={route}
        pathLength={1}
        className="pipe-draw"
        style={{ ["--len" as string]: 1 }}
        fill="none"
        stroke="#1f5a96"
        strokeWidth="30"
      />
      {/* 管の光沢 */}
      <path
        d={route}
        pathLength={1}
        className="pipe-draw"
        style={{ ["--len" as string]: 1, animationDelay: "0.35s" }}
        fill="none"
        stroke="#00c2cb"
        strokeWidth="1.5"
        transform="translate(-6 -6)"
      />

      {/* 管の中を流れる水（描き終わってからずっと流れ続ける） */}
      <path
        d={route}
        pathLength={1}
        className="pipe-flow"
        fill="none"
        stroke="#b8ecef"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <g className="pipe-fade" fill="#00c2cb">
        {/* フランジ */}
        <rect x="150" y="448" width="10" height="44" />
        <rect x="298" y="330" width="44" height="10" />
        <rect x="608" y="60" width="44" height="10" />
        {/* 仕切弁 */}
        <path d="M440 176 L480 200 L440 224 Z M520 176 L480 200 L520 224 Z" fill="#0e2a47" stroke="#00c2cb" strokeWidth="2" />
        <rect x="477" y="140" width="6" height="36" />
        <rect x="458" y="134" width="44" height="6" />
        {/* 溶接の継目 */}
        <circle cx="250" cy="470" r="4" fill="#ffffff" />
        <circle cx="390" cy="200" r="4" fill="#ffffff" />
        <circle cx="630" cy="130" r="4" fill="#ffffff" />
      </g>
      {fade && <rect width="800" height="560" fill={`url(#${id}-fade)`} />}
    </svg>
  );
}

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

/** 一本の配管が描かれていくトップの見出し */
export function PipeHero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <div data-parallax="0.12" className="absolute inset-y-0 right-0 -z-10 hidden w-[68%] md:block">
        <PipeArt
          id="hero-pc"
          viewBox="0 0 800 560"
          fade
          className="h-full w-full"
        />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col justify-center px-4 pt-14 md:min-h-[640px] md:px-8 md:py-20">
        <p className="hero-in text-[13px] tracking-[0.25em] text-sky" style={{ ["--d" as string]: "0.1s" }}>
          兵庫・尼崎の配管工事会社
        </p>
        <h1 className="mt-6 text-[40px] leading-[1.35] tracking-[0.1em] md:text-[68px]">
          <span className="sr-only">健やかな線を、未来へ。</span>
          <SplitLine text="健やかな線を、" start={0.3} />
          <br />
          <SplitLine text="未来へ。" start={0.78} />
        </h1>
        <p
          className="hero-in mt-8 max-w-md text-[15px] leading-loose text-white/85 md:text-base"
          style={{ ["--d" as string]: "1.2s" }}
        >
          工場やプラントの配管、設備の配管、機器の据付まで。TIG溶接の確かな仕上がりと、急ぎの案件にも動ける機動力で、現場の「止められない」に応えます。
        </p>
        <div className="hero-in mt-10 flex flex-col gap-3 sm:flex-row" style={{ ["--d" as string]: "1.45s" }}>
          <ButtonLink href="/contact/" variant="light">
            工事を相談する
          </ButtonLink>
          <ButtonLink href="/works/" variant="ghost">
            施工事例を見る
          </ButtonLink>
        </div>
      </div>

      <PipeArt id="hero-sp" viewBox="140 40 660 460" className="mt-6 block h-[230px] w-full md:hidden" />
    </section>
  );
}
