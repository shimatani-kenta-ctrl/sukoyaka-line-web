import { ButtonLink } from "./ui";

/** トップの背景に使う現場写真（お客様の了承済み） */
const heroPhotos = ["/photos/hero/1.jpg", "/photos/hero/2.jpg", "/photos/hero/3.jpg", "/photos/hero/4.jpg"];

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

/** 現場写真を背景にしたトップの見出し */
export function PipeHero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      {/* 背景：実際の現場写真をゆっくり切り替える */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {heroPhotos.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            className="hero-slide absolute inset-0 h-full w-full object-cover"
            style={{ ["--i" as string]: i }}
          />
        ))}
        <div className="absolute inset-0 bg-ink/60 md:bg-transparent md:bg-gradient-to-r md:from-ink/95 md:via-ink/75 md:to-ink/30" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink/80 to-transparent" />
      </div>

      <div className="mx-auto flex min-h-[640px] max-w-6xl flex-col justify-center px-4 pb-16 pt-14 md:min-h-[680px] md:px-8 md:py-20">
        <h1 className="hero-in text-[13px] font-medium tracking-[0.25em] text-sky" style={{ ["--d" as string]: "0.1s" }}>
          兵庫県尼崎市の配管工事会社
        </h1>
        <p className="mt-6 font-display text-[40px] font-extrabold leading-[1.35] tracking-[0.1em] md:text-[68px]">
          <span className="sr-only">確かな技術を、確かな未来へ。</span>
          <SplitLine text="確かな技術を、" start={0.3} />
          <br />
          <SplitLine text="確かな未来へ。" start={0.78} />
        </p>
        <p
          className="hero-in mt-5 text-[13px] font-bold tracking-[0.12em] text-sky-soft md:mt-6 md:text-lg md:tracking-[0.18em]"
          style={{ ["--d" as string]: "1.3s" }}
        >
          ― 配管から生まれる、トータルソリューション ―
        </p>
        <p
          className="hero-in mt-8 max-w-md text-[15px] leading-loose text-white/85 md:text-base"
          style={{ ["--d" as string]: "1.5s" }}
        >
          配管工事・配管製作から、架台の製作・据付、溶接まで一貫して対応。急ぎの案件にも動ける機動力で、現場の「止められない」に応えます。
        </p>
        <div className="hero-in mt-10 flex flex-col gap-3 sm:flex-row" style={{ ["--d" as string]: "1.7s" }}>
          <ButtonLink href="/contact/" variant="light">
            工事を相談する
          </ButtonLink>
          <ButtonLink href="/works/" variant="ghost">
            施工事例を見る
          </ButtonLink>
        </div>
      </div>

    </section>
  );
}
