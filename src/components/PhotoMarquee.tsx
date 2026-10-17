/**
 * 現場写真が横にゆっくり流れ続ける帯（同じ並びを2組つないで、切れ目なくくり返す）。
 * reverse で逆向きに流れます。写真の上に指を置く／マウスを乗せると止まります。
 */
export type MarqueePhoto = { src: string; alt: string };

export const sitePhotos: MarqueePhoto[] = [
  { src: "/photos/hero/1.jpg", alt: "空調機まわりの配管と架台" },
  { src: "/photos/water-injection-piping.jpg", alt: "注水用の水の配管" },
  { src: "/photos/sus-flange-spools.jpg", alt: "ステンレスのフランジ付き短管" },
  { src: "/photos/compressor-air-piping.jpg", alt: "コンプレッサーまわりのエア配管" },
  { src: "/photos/tig-socket-weld.jpg", alt: "ねじ込みソケットのTIG溶接" },
  { src: "/photos/air-filter-angle-frame.jpg", alt: "アングルの架台とエアフィルターまわりの配管" },
  { src: "/photos/hero/3.jpg", alt: "天井パネル上でのエア配管の敷設作業" },
  { src: "/photos/white-pipe-elbow-butt-weld.jpg", alt: "白管のエルボと直管の突合せ溶接" },
  { src: "/works/amagasaki-electrolytic-cell-piping-2026-04/1.jpg", alt: "電解槽まわりの薬剤配管" },
  { src: "/photos/ahu-piping-frame-1.jpg", alt: "空調機まわりの配管と架台" },
  { src: "/photos/flange-inner-weld.jpg", alt: "フランジ内側の溶接" },
  { src: "/works/nara-chemical-plant-cooling-water-2025-08/1.jpg", alt: "屋外の冷却水配管と配管支持架台" },
];

export function PhotoMarquee({
  photos = sitePhotos,
  reverse = false,
  seconds = 60,
  className = "",
}: {
  photos?: MarqueePhoto[];
  reverse?: boolean;
  seconds?: number;
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={`photo-marquee overflow-hidden ${className}`}>
      <div
        className={`photo-marquee-track flex w-max ${reverse ? "photo-marquee-reverse" : ""}`}
        style={{ ["--marquee-duration" as string]: `${seconds}s` }}
      >
        {[0, 1].map((g) => (
          <ul key={g} className="flex shrink-0 gap-3 pr-3 md:gap-5 md:pr-5">
            {photos.map((p) => (
              <li key={`${g}-${p.src}`} className="h-[150px] w-[120px] shrink-0 overflow-hidden md:h-[260px] md:w-[208px]">
                <img src={p.src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
