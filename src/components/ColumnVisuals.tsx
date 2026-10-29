/**
 * コラム一覧のカードに並べる、小さなグラフ・イラスト。
 * 数字はすべて各記事で出典を示しているもの（国土交通省・厚生労働省のデータ）。
 */

export type ColumnVisualKey =
  | "flow"
  | "spool"
  | "calendar"
  | "workers"
  | "age"
  | "handover"
  | "income"
  | "jobratio"
  | "steps"
  | "tiers"
  | "deep"
  | "direct"
  | "arcfamily"
  | "twohands"
  | "weldratio";

const AI = "#003479";
const SKY = "#00c2cb";
const SOFT = "#b8ecef";
const INK = "#0e2a47";
const STEEL = "#5b6b7a";

/** 割合をドーナツで描く */
function Donut({ pct, label }: { pct: number; label: string }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <>
      <circle cx="50" cy="38" r={r} fill="none" stroke={SOFT} strokeWidth="11" />
      <circle
        cx="50"
        cy="38"
        r={r}
        fill="none"
        stroke={AI}
        strokeWidth="11"
        strokeDasharray={`${(c * pct) / 100} ${c}`}
        transform="rotate(-90 50 38)"
      />
      <text x="50" y="42" textAnchor="middle" fontSize="11" fontWeight="800" fill={INK}>
        {label}
      </text>
    </>
  );
}

const visuals: Record<ColumnVisualKey, { label: string; svg: React.ReactNode }> = {
  /* 工場の休止期間 */
  flow: {
    label: "休止前に準備",
    svg: (
      <>
        <line x1="14" y1="38" x2="86" y2="38" stroke={SOFT} strokeWidth="4" />
        <circle cx="16" cy="38" r="8" fill={SKY} />
        <circle cx="50" cy="38" r="8" fill={AI} />
        <circle cx="84" cy="38" r="8" fill={SKY} />
        <text x="15" y="62" textAnchor="middle" fontSize="7.5" fill={STEEL}>休止前</text>
        <text x="50" y="62" textAnchor="middle" fontSize="7.5" fill={INK} fontWeight="700">休止中</text>
        <text x="84" y="62" textAnchor="middle" fontSize="7.5" fill={STEEL}>休止明け</text>
      </>
    ),
  },
  spool: {
    label: "配管を事前製作",
    svg: (
      <>
        <rect x="24" y="31" width="52" height="14" rx="2" fill={SOFT} stroke={AI} strokeWidth="2" />
        <rect x="14" y="20" width="10" height="36" rx="2" fill="#fff" stroke={AI} strokeWidth="2.5" />
        <rect x="76" y="20" width="10" height="36" rx="2" fill="#fff" stroke={AI} strokeWidth="2.5" />
        <circle cx="19" cy="26" r="1.8" fill={AI} />
        <circle cx="19" cy="50" r="1.8" fill={AI} />
        <circle cx="81" cy="26" r="1.8" fill={AI} />
        <circle cx="81" cy="50" r="1.8" fill={AI} />
        <line x1="34" y1="31" x2="34" y2="45" stroke={SKY} strokeWidth="2" />
        <line x1="66" y1="31" x2="66" y2="45" stroke={SKY} strokeWidth="2" />
      </>
    ),
  },
  calendar: {
    label: "休止期間に施工",
    svg: (
      <>
        <rect x="18" y="12" width="64" height="54" rx="5" fill="#fff" stroke={AI} strokeWidth="2.5" />
        <rect x="18" y="12" width="64" height="12" rx="5" fill={AI} />
        <line x1="32" y1="7" x2="32" y2="17" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        <line x1="68" y1="7" x2="68" y2="17" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        {[0, 1, 2, 3, 4].map((col) =>
          [0, 1, 2].map((row) => (
            <rect
              key={`${col}-${row}`}
              x={24 + col * 11}
              y={30 + row * 11}
              width="8"
              height="8"
              rx="1.5"
              fill={row === 1 && col >= 1 && col <= 3 ? SKY : SOFT}
            />
          )),
        )}
      </>
    ),
  },

  /* 建設業の高齢化と人手不足 */
  workers: {
    label: "就業者数（万人）",
    svg: (
      <>
        {[
          { x: 14, v: 685, t: "H9" },
          { x: 42, v: 504, t: "H22" },
          { x: 70, v: 483, t: "R5" },
        ].map((b, i) => {
          const h = (b.v / 685) * 46;
          return (
            <g key={b.t}>
              <rect x={b.x} y={56 - h} width="18" height={h} rx="2" fill={i === 2 ? AI : SOFT} />
              <text x={b.x + 9} y={52 - h} textAnchor="middle" fontSize="8.5" fontWeight="700" fill={INK}>
                {b.v}
              </text>
              <text x={b.x + 9} y="67" textAnchor="middle" fontSize="8" fill={STEEL}>
                {b.t}
              </text>
            </g>
          );
        })}
      </>
    ),
  },
  age: {
    label: "55歳以上の割合",
    svg: <Donut pct={36.6} label="36.6%" />,
  },
  handover: {
    label: "技術をつなぐ",
    svg: (
      <>
        {/* ベテランと若手のヘルメット */}
        <path d="M14 46 a16 16 0 0 1 32 0 z" fill={AI} />
        <rect x="11" y="45" width="38" height="5" rx="2" fill={AI} />
        <path d="M58 50 a13 13 0 0 1 26 0 z" fill={SKY} />
        <rect x="55" y="49" width="32" height="4.5" rx="2" fill={SKY} />
        <path d="M40 24 q12 -10 24 2" fill="none" stroke={STEEL} strokeWidth="2" strokeDasharray="3 3" />
        <path d="M62 22 l3 5 l-6 0 z" fill={STEEL} />
        <text x="30" y="64" textAnchor="middle" fontSize="8.5" fill={STEEL}>先輩</text>
        <text x="71" y="64" textAnchor="middle" fontSize="8.5" fill={STEEL}>若手</text>
      </>
    ),
  },

  /* 配管工の仕事内容と年収 */
  income: {
    label: "配管工の平均年収",
    svg: (
      <>
        <text x="50" y="40" textAnchor="middle" fontSize="20" fontWeight="800" fill={AI}>523.1</text>
        <text x="50" y="56" textAnchor="middle" fontSize="10" fontWeight="700" fill={INK}>万円</text>
      </>
    ),
  },
  jobratio: {
    label: "有効求人倍率",
    svg: (
      <>
        <rect x="12" y="20" width="72" height="13" rx="2" fill={AI} />
        <text x="16" y="30" fontSize="9" fontWeight="800" fill="#fff">11.03倍</text>
        <rect x="12" y="44" width="7" height="13" rx="2" fill={SOFT} />
        <text x="24" y="54" fontSize="8.5" fill={STEEL}>基準 1倍</text>
      </>
    ),
  },
  steps: {
    label: "一人前への道",
    svg: (
      <>
        <path d="M12 62 H34 V48 H56 V34 H78 V20 H90" fill="none" stroke={AI} strokeWidth="3" strokeLinejoin="round" />
        <circle cx="23" cy="56" r="4" fill={SOFT} />
        <circle cx="45" cy="42" r="4" fill={SKY} />
        <circle cx="67" cy="28" r="4" fill={SKY} />
        <path d="M84 6 l2.5 5 5.5 0.8 -4 3.9 1 5.5 -5 -2.6 -5 2.6 1 -5.5 -4 -3.9 5.5 -0.8 z" fill={SKY} />
      </>
    ),
  },

  /* 多重下請と直接依頼 */
  tiers: {
    label: "多重下請の構造",
    svg: (
      <>
        {["元請", "1次", "2次", "3次"].map((t, i) => (
          <g key={t}>
            <rect x={26 + i * 3} y={6 + i * 15} width={48 - i * 6} height="11" rx="2" fill={i === 0 ? AI : i === 3 ? SKY : SOFT} />
            <text x="50" y={14.5 + i * 15} textAnchor="middle" fontSize="8" fontWeight="700" fill={i === 0 ? "#fff" : INK}>
              {t}
            </text>
          </g>
        ))}
      </>
    ),
  },
  deep: {
    label: "3次以上の下請",
    svg: <Donut pct={52.3} label="52.3%" />,
  },
  direct: {
    label: "施工会社へ直接",
    svg: (
      <>
        <rect x="2" y="24" width="36" height="26" rx="4" fill={SOFT} />
        <text x="20" y="40" textAnchor="middle" fontSize="8" fontWeight="700" fill={INK}>お客様</text>
        <rect x="62" y="24" width="36" height="26" rx="4" fill={AI} />
        <text x="80" y="40" textAnchor="middle" fontSize="8" fontWeight="700" fill="#fff">施工会社</text>
        <line x1="40" y1="32" x2="56" y2="32" stroke={SKY} strokeWidth="2.5" />
        <path d="M60 32 l-5 -3.5 v7 z" fill={SKY} />
        <line x1="44" y1="42" x2="60" y2="42" stroke={SKY} strokeWidth="2.5" />
        <path d="M40 42 l5 -3.5 v7 z" fill={SKY} />
      </>
    ),
  },
  /* TIG溶接とアーク溶接の違い */
  arcfamily: {
    label: "TIGもアーク溶接",
    svg: (
      <>
        <rect x="22" y="6" width="56" height="16" rx="3" fill={AI} />
        <text x="50" y="17" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#fff">アーク溶接</text>
        <path d="M50 22 V30 M28 30 H72 M28 30 V38 M72 30 V38" fill="none" stroke={STEEL} strokeWidth="1.5" />
        <rect x="6" y="38" width="44" height="16" rx="3" fill={SOFT} />
        <text x="28" y="49" textAnchor="middle" fontSize="7.5" fontWeight="700" fill={INK}>被覆アーク</text>
        <rect x="54" y="38" width="40" height="16" rx="3" fill={SKY} />
        <text x="74" y="49" textAnchor="middle" fontSize="8" fontWeight="800" fill={INK}>TIG</text>
      </>
    ),
  },
  twohands: {
    label: "違いを比較表で",
    svg: (
      <>
        <rect x="10" y="10" width="80" height="52" rx="4" fill="#fff" stroke={AI} strokeWidth="2" />
        <rect x="10" y="10" width="80" height="13" rx="4" fill={AI} />
        <text x="35" y="19.5" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#fff">TIG</text>
        <text x="70" y="19.5" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#fff">被覆アーク</text>
        <line x1="52" y1="23" x2="52" y2="62" stroke={SOFT} strokeWidth="1.5" />
        {[0, 1, 2].map((r) => (
          <g key={r}>
            <rect x="18" y={29 + r * 11} width="28" height="5" rx="2" fill={SKY} />
            <rect x="58" y={29 + r * 11} width="26" height="5" rx="2" fill={SOFT} />
          </g>
        ))}
      </>
    ),
  },
  weldratio: {
    label: "溶接工の求人倍率",
    svg: (
      <>
        <rect x="12" y="20" width="40" height="13" rx="2" fill={AI} />
        <text x="56" y="30" fontSize="9" fontWeight="800" fill={INK}>2.67倍</text>
        <rect x="12" y="44" width="15" height="13" rx="2" fill={SOFT} />
        <text x="31" y="54" fontSize="8.5" fill={STEEL}>基準 1倍</text>
      </>
    ),
  },
};

export function ColumnVisuals({ keys }: { keys: ColumnVisualKey[] }) {
  return (
    <div className="mb-5 grid grid-cols-3 gap-2 md:gap-3">
      {keys.slice(0, 3).map((k) => {
        const v = visuals[k];
        return (
          <figure key={k} className="m-0 flex aspect-square flex-col items-center justify-center rounded-[10px] bg-mist px-1 pb-2 pt-1">
            <svg viewBox="0 0 100 72" aria-hidden="true" className="w-full flex-1">
              {v.svg}
            </svg>
            <figcaption className="text-center text-[10.5px] font-medium leading-tight text-ink md:text-[12px]">{v.label}</figcaption>
          </figure>
        );
      })}
    </div>
  );
}
