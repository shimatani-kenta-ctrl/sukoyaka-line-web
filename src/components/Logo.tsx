type Props = {
  /** 紺色の背景の上に置くとき（ロゴの紺を白にした版を使う） */
  light?: boolean;
  /** 大きさ（フッターは lg） */
  size?: "md" | "lg";
};

/**
 * ヘッダー・フッターの社名ロゴ。
 * ロゴマーク＋ロゴと同じ英字「SUKOYAKA LINE」＋日本語の社名（Noto Sans JP 太字）
 */
export function Logo({ light = false, size = "md" }: Props) {
  const lg = size === "lg";
  return (
    <span className="flex items-center gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={light ? "/logo-mark-light.svg" : "/logo-mark.svg"}
        alt=""
        width={148}
        height={154}
        className={`shrink-0 object-contain ${lg ? "h-14 w-14" : "h-11 w-11 md:h-[52px] md:w-[52px]"}`}
      />
      <span className="flex flex-col items-start gap-1.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={light ? "/logo-text-light.svg" : "/logo-text.svg"}
          alt="SUKOYAKA LINE"
          width={169}
          height={15}
          className={`w-auto ${lg ? "h-[18px]" : "h-[14px] md:h-[17px]"}`}
        />
        <span
          className={`font-display font-extrabold leading-none tracking-[0.22em] ${
            lg ? "text-[13px]" : "text-[11px] md:text-[12.5px]"
          } ${light ? "text-white/85" : "text-ink"}`}
        >
          株式会社健やかライン
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
