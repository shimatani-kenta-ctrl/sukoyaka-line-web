type Props = {
  /** 紺色の背景の上に置くとき（ロゴの紺を白にした版を使う） */
  light?: boolean;
  /** ロゴマークの大きさ */
  size?: "md" | "lg";
};

/** ロゴマーク＋社名 */
export function Logo({ light = false, size = "md" }: Props) {
  const mark = size === "lg" ? "h-14 w-14" : "h-10 w-10 md:h-12 md:w-12";
  return (
    <span className="flex items-center gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={light ? "/logo-mark-light.svg" : "/logo-mark.svg"}
        alt=""
        width={148}
        height={154}
        className={`${mark} shrink-0 object-contain`}
      />
      <span className="flex flex-col leading-none">
        <span className={`text-[10px] tracking-[0.3em] ${light ? "text-sky-soft" : "text-steel"}`}>株式会社</span>
        <span
          className={`mt-1 font-display font-extrabold tracking-[0.12em] ${size === "lg" ? "text-2xl" : "text-xl"} ${
            light ? "text-white" : "text-ink"
          }`}
        >
          健やかライン
        </span>
      </span>
    </span>
  );
}

/** ロゴ全体（SUKOYAKA LINE の文字入り） */
export function LogoFull({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={light ? "/logo-light.svg" : "/logo.svg"}
      alt="株式会社健やかライン ロゴ"
      width={171}
      height={183}
      className={`object-contain ${className}`}
    />
  );
}
