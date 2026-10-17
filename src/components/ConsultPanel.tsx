import { ButtonLink } from "./ui";

/**
 * 「どんなご相談も、お待ちしております」：グラデーションの面に、よくあるご相談と3つの約束を載せる。
 * 月桂樹の飾りの中は、サイトに載せている事実だけ（数字や実績の誇張はしない）。
 */
const worries = [
  "設備の休止期間内に、配管工事を終わらせたい",
  "急な設備トラブルで、すぐに動ける業者を探している",
  "配管の製作から取付けまで、まとめて任せたい",
  "機器の更新に合わせて、架台や周辺配管も頼みたい",
  "図面がない段階から、相談に乗ってほしい",
];

const badges = [
  ["関西一円", "対応可能"],
  ["製作から据付まで", "一貫対応"],
  ["お見積り", "無料"],
];

/** 月桂樹の飾り（下から左右に伸びる2本の枝に、葉を並べた冠） */
function Laurel({ lines }: { lines: string[] }) {
  const count = 8;
  const r = 37;
  const branch = (dir: 1 | -1) =>
    Array.from({ length: count }, (_, i) => {
      // 下（90°）から上（左は250°、右は-70°）へ
      const deg = 114 + (i / (count - 1)) * 128;
      const th = ((dir === 1 ? deg : 180 - deg) * Math.PI) / 180;
      const x = 50 + Math.cos(th) * r;
      const y = 50 + Math.sin(th) * r;
      const tangent = (dir === 1 ? deg + 90 : 180 - deg - 90) + (dir === 1 ? -28 : 28);
      const size = 1 - i * 0.045;
      return (
        <g key={`${dir}-${i}`}>
          {/* 外側の葉 */}
          <ellipse cx={x + Math.cos(th) * 3} cy={y + Math.sin(th) * 3} rx={2.3 * size} ry={6.2 * size} transform={`rotate(${tangent} ${x + Math.cos(th) * 3} ${y + Math.sin(th) * 3})`} fill="url(#laurel-gold)" />
          {/* 内側の葉 */}
          <ellipse cx={x - Math.cos(th) * 3} cy={y - Math.sin(th) * 3} rx={2 * size} ry={5.4 * size} transform={`rotate(${tangent + (dir === 1 ? 56 : -56)} ${x - Math.cos(th) * 3} ${y - Math.sin(th) * 3})`} fill="url(#laurel-gold)" opacity="0.9" />
        </g>
      );
    });
  return (
    <div className="laurel relative mx-auto aspect-square w-full max-w-[190px]">
      <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="laurel-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f8e7a8" />
            <stop offset="0.5" stopColor="#d6aa4c" />
            <stop offset="1" stopColor="#a06e26" />
          </linearGradient>
        </defs>
        {/* 枝 */}
        <path d="M42 85 A37 37 0 0 1 24 21" fill="none" stroke="url(#laurel-gold)" strokeWidth="0.9" />
        <path d="M58 85 A37 37 0 0 0 76 21" fill="none" stroke="url(#laurel-gold)" strokeWidth="0.9" />
        {branch(1)}
        {branch(-1)}
        <path d="M40 92 L60 84 M60 92 L40 84" stroke="url(#laurel-gold)" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
      <p className="absolute inset-0 flex flex-col items-center justify-center px-[18%] text-center font-bold leading-[1.5] tracking-[0.1em] text-white [text-shadow:0_1px_8px_rgba(0,52,121,0.35)]">
        <span className="text-[12px] md:text-[13px]">{lines[0]}</span>
        <span className="mt-1 text-[19px] md:text-[21px]">{lines[1]}</span>
      </p>
    </div>
  );
}

export function ConsultPanel() {
  return (
    <section data-bg="porcelain" className="pb-6">
      <div className="consult-panel overflow-hidden rounded-b-[56px] px-4 py-20 text-white md:rounded-b-[96px] md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div data-reveal className="text-center">
            <p className="text-[14px] tracking-[0.15em] text-white/85">図面がない段階でも、ご相談いただけます</p>
            <h2 className="reveal-blur mt-4 text-[28px] leading-[1.6] md:text-[40px]">
              どんなご相談も、
              <br className="md:hidden" />
              お待ちしております
            </h2>
          </div>

          <div data-reveal className="mx-auto mt-12 max-w-2xl rounded-[24px] bg-ink/25 px-6 py-8 backdrop-blur-sm md:px-12 md:py-10">
            <p className="text-[15px] font-bold tracking-[0.1em]">（よくあるご相談）</p>
            <ul className="mt-5 space-y-4">
              {worries.map((w) => (
                <li key={w} className="flex gap-3 text-[15px] leading-[1.9] md:text-base">
                  <span aria-hidden="true" className="mt-[7px] flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-white/25 text-[12px]">
                    ✓
                  </span>
                  <span className="underline decoration-white/60 underline-offset-[6px]">{w}</span>
                </li>
              ))}
            </ul>
          </div>

          <ul data-reveal-stagger="140" className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-3">
            {badges.map((b, i) => (
              <li key={b.join("")} className={i === 2 ? "col-span-2 mx-auto w-1/2 md:col-span-1 md:w-full" : ""}>
                <Laurel lines={b} />
              </li>
            ))}
          </ul>

          <div data-reveal className="mt-12 flex justify-center">
            <ButtonLink href="/contact/" variant="ghost">
              無料で相談してみる
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
