import type { CSSProperties } from "react";
import { ButtonLink } from "./ui";
import { heroShuffleScript } from "@/lib/heroPhotos";

/** トップの背景に使う現場写真（お客様の了承済み） */
const heroPhotos = ["/photos/hero/1.jpg", "/photos/hero/2.jpg", "/photos/hero/3.jpg", "/photos/hero/4.jpg"];
/** 縮んだあと、手前に重なる2枚目のカード */
const subPhoto = "/photos/tig-socket-weld.jpg";



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

/**
 * トップの見出し。
 * 最初は画面いっぱいの現場写真。スクロールすると見出しはその場に残ったまま、
 * 写真が右上の小さなカードへ縮み、背景は明るく、文字は紺色に変わる（--p を ScrollEffects が 0→1 で更新）。
 */
export function PipeHero() {
  return (
    <section data-hero-pin className="hero-pin relative" style={{ ["--p" as string]: 0 } as CSSProperties}>
      <div className="hero-stage sticky overflow-hidden bg-porcelain">
        {/* 縮んだあとに背景に残る、ぼかした写真 */}
        <img aria-hidden="true" data-hero-ghost suppressHydrationWarning src={heroPhotos[0]} alt="" className="hero-ghost pointer-events-none absolute -bottom-[10%] -right-[10%] h-[70%] w-[80%] object-cover" />

        {/* 2枚目のカード（縮んだあとに現れる） */}
        <div aria-hidden="true" className="hero-sub pointer-events-none absolute z-[1] overflow-hidden shadow-xl">
          <img data-hero-sub suppressHydrationWarning src={subPhoto} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
        </div>

        {/* メインの写真：画面いっぱい → 右上のカードへ縮む */}
        <div aria-hidden="true" className="hero-frame pointer-events-none absolute overflow-hidden bg-ink shadow-xl">
          {heroPhotos.map((src, i) => (
            <img
              key={src}
              data-hero-photo
              suppressHydrationWarning
              src={src}
              alt=""
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              className="hero-slide absolute inset-0 h-full w-full object-cover"
              style={{ ["--i" as string]: i }}
            />
          ))}
          <script dangerouslySetInnerHTML={{ __html: heroShuffleScript }} />
          <div className="hero-shade absolute inset-0 bg-ink/60 md:bg-transparent md:bg-gradient-to-r md:from-ink/95 md:via-ink/75 md:to-ink/30" />
        </div>

        <div className="hero-text relative z-[2] mx-auto flex h-full max-w-6xl flex-col justify-center px-4 md:px-8">
          <h1 className="hero-in hero-label text-[13px] font-medium tracking-[0.25em]" style={{ ["--d" as string]: "0.1s" }}>
            兵庫県尼崎市の配管工事会社
          </h1>
          <p className="mt-6 font-display text-[40px] font-extrabold leading-[1.35] tracking-[0.1em] md:text-[68px]">
            <span className="sr-only">確かな技術を、確かな未来へ。</span>
            <SplitLine text="確かな技術を、" start={0.3} />
            <br />
            <SplitLine text="確かな未来へ。" start={0.78} />
          </p>
          <p
            className="hero-in hero-sub-copy mt-5 text-[13px] font-bold tracking-[0.12em] md:mt-6 md:text-lg md:tracking-[0.18em]"
            style={{ ["--d" as string]: "1.3s" }}
          >
            ― 配管から生まれる、トータルソリューション ―
          </p>
          <p
            className="hero-in hero-body mt-8 max-w-md text-[15px] leading-loose md:text-base"
            style={{ ["--d" as string]: "1.5s" }}
          >
            配管工事・配管製作から、架台の製作・据付、溶接まで一貫して対応。急ぎの案件にも動ける機動力で、現場の「止められない」に応えます。
          </p>
          <div className="hero-in hero-buttons mt-10 flex flex-col gap-3 sm:flex-row" style={{ ["--d" as string]: "1.7s" }}>
            <ButtonLink href="/contact/" variant="light">
              工事を相談する
            </ButtonLink>
            <ButtonLink href="/works/" variant="ghost">
              施工事例を見る
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
