import type { CSSProperties } from "react";

/**
 * 横に流れる文字（飾り）。
 * スマホでも1フレーズ全体が読める大きさ・濃さで、一定の速さで流れ続けます。
 * speed がプラスなら左へ、マイナスなら右へ流れます（数字が大きいほど速い）。
 */
export function Marquee({
  text,
  speed = 0.35,
  className = "",
  stroke,
}: {
  text: string;
  speed?: number;
  className?: string;
  /** 文字の色（暗い背景の上で使うとき。例: "rgba(184,236,239,0.9)"） */
  stroke?: string;
}) {
  // 同じ並びを2組つくり、半分の位置まで流してつなぎ目なく繰り返す
  const group = Array.from({ length: 4 }, () => text);
  const seconds = Math.max(18, Math.round(12 / Math.max(Math.abs(speed), 0.05)));
  const style = {
    ["--marquee-duration" as string]: `${seconds}s`,
    ...(stroke ? { ["--marquee-color" as string]: stroke } : {}),
  } as CSSProperties;

  return (
    <div className={`overflow-hidden ${className}`}>
      <p className="sr-only">{text}</p>
      <div
        aria-hidden="true"
        className={`marquee-text marquee-run flex w-max text-[26px] md:text-[64px] ${speed < 0 ? "marquee-reverse" : ""}`}
        style={style}
      >
        {[0, 1].map((g) => (
          <div key={g} className="flex shrink-0 gap-10 pr-10 md:gap-16 md:pr-16">
            {group.map((t, i) => (
              <span key={i}>{t}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
