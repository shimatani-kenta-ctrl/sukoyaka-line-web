import type { WorkCategory } from "@/data/works";

/**
 * 施工写真がまだない事例に表示する図柄。
 * 事例ごとに配管の形を変えて、一覧が単調にならないようにしています。
 */
const paths: Record<WorkCategory, string> = {
  配管工事: "M-10 120 H90 a30 30 0 0 0 30 -30 V40 a20 20 0 0 1 20 -20 H330",
  配管製作: "M-10 60 H120 V150 H210 V70 H330",
  "架台製作・据付": "M-10 140 H110 M190 140 H330 M110 100 h80 v80 h-80 Z",
  溶接工事: "M-10 95 H330",
};

const ids: Record<WorkCategory, string> = {
  配管工事: "piping",
  配管製作: "fabrication",
  "架台製作・据付": "frame",
  溶接工事: "weld",
};

export function WorkVisual({
  category,
  image,
  alt,
  className = "",
}: {
  category: WorkCategory;
  image?: string;
  alt: string;
  className?: string;
}) {
  if (image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={image} alt={alt} loading="lazy" className={`h-full w-full object-cover ${className}`} />;
  }
  return (
    <div className={`relative h-full w-full bg-ink ${className}`} role="img" aria-label={alt}>
      <svg viewBox="0 0 320 190" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id={`grid-${ids[category]}`} width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M16 0 H0 V16" fill="none" stroke="#1f5a96" strokeOpacity="0.35" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="320" height="190" fill={`url(#grid-${ids[category]})`} />
        <path d={paths[category]} fill="none" stroke="#1f5a96" strokeWidth="16" strokeLinejoin="round" />
        <path d={paths[category]} fill="none" stroke="#00c2cb" strokeWidth="1.2" strokeLinejoin="round" />
        {category === "溶接工事" &&
          [100, 160, 220].map((x) => (
            <g key={x}>
              <rect x={x - 3} y="83" width="6" height="24" fill="#00c2cb" />
              <circle cx={x} cy="95" r="18" fill="none" stroke="#00c2cb" strokeOpacity="0.4" />
            </g>
          ))}
      </svg>
      <span className="absolute bottom-3 left-3 text-[11px] tracking-[0.2em] text-sky-soft/80">{category}</span>
    </div>
  );
}
