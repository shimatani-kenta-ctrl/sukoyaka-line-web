import type { CSSProperties } from "react";

/**
 * スクロールに合わせて横に流れる大きな文字（飾り）。
 * speed がプラスなら左へ、マイナスなら右へ流れます。動きは ScrollEffects が担当します。
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
  /** 文字の輪郭の色（例: "rgba(255,255,255,0.25)"） */
  stroke?: string;
}) {
  const items = Array.from({ length: 6 }, () => text);
  return (
    <div aria-hidden="true" className={`overflow-hidden ${className}`}>
      <div
        data-marquee={speed}
        className="marquee-text flex w-max gap-10 text-[56px] will-change-transform md:gap-16 md:text-[112px]"
        style={stroke ? ({ ["--marquee-stroke" as string]: stroke } as CSSProperties) : undefined}
      >
        {items.map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
}
