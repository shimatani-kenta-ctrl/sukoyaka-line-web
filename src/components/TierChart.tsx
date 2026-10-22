/**
 * 下請次数の分布（国土交通省「重層下請構造発生要因分析調査」平成28年度）。
 * 1系列の横棒グラフ。数値は出典の割合そのまま。下に同じ内容の表も置く。
 */
const data = [
  { label: "1次まで", value: 16.8, sites: 18 },
  { label: "2次まで", value: 30.8, sites: 33 },
  { label: "3次まで", value: 38.3, sites: 41 },
  { label: "4次まで", value: 12.1, sites: 13 },
  { label: "5次まで", value: 1.9, sites: 2 },
];

export function TierChart() {
  const max = 40;
  return (
    <figure className="tier-chart">
      <figcaption className="text-[15px] font-bold text-ink md:text-base">
        現場ごとの「いちばん深い下請の段数」の割合
      </figcaption>
      <p className="mt-1 text-[13px] text-steel">国土交通省の調査（平成28年度・対象108現場）より</p>

      <div className="mt-6 space-y-3" role="img" aria-label="1次まで16.8%、2次まで30.8%、3次まで38.3%、4次まで12.1%、5次まで1.9%">
        {data.map((d) => {
          const deep = d.label.startsWith("3") || d.label.startsWith("4") || d.label.startsWith("5");
          return (
            <div key={d.label} className="tier-row group grid grid-cols-[64px_1fr] items-center gap-3 md:grid-cols-[80px_1fr]">
              <span className="text-[13px] text-steel md:text-[14px]">{d.label}</span>
              <div className="relative flex items-center gap-2">
                <span
                  data-reveal="wipe"
                  className={`tier-bar block h-7 rounded-r-[4px] ${deep ? "bg-ai" : "bg-pipe/55"}`}
                  style={{ width: `${(d.value / max) * 100}%` }}
                />
                <span className="shrink-0 text-[14px] font-bold tabular-nums text-ink">{d.value}%</span>
                <span role="tooltip" className="tier-tip pointer-events-none absolute -top-9 left-0 whitespace-nowrap rounded-sm bg-ink px-2.5 py-1 text-[12px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {d.label}：{d.sites}現場（{d.value}%）
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-4 flex items-center gap-2 text-[13px] text-steel">
        <span aria-hidden="true" className="inline-block h-3 w-5 rounded-r-[3px] bg-ai" />
        3次以上の下請が入る現場：合計52.3%（約半数）
      </p>

      <details className="mt-4 text-[13px] text-steel">
        <summary className="cursor-pointer text-ai underline underline-offset-4">表で見る</summary>
        <table className="mt-3 w-full max-w-sm border-collapse text-left">
          <thead>
            <tr className="border-b border-line">
              <th className="py-1.5 font-medium">いちばん深い段数</th>
              <th className="py-1.5 text-right font-medium">現場数</th>
              <th className="py-1.5 text-right font-medium">割合</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.label} className="border-b border-line/60">
                <td className="py-1.5">{d.label}</td>
                <td className="py-1.5 text-right tabular-nums">{d.sites}</td>
                <td className="py-1.5 text-right tabular-nums">{d.value}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}

/** 多重下請と直接依頼の流れの比較（図。数字は使わない） */
export function StructureDiagram() {
  const multi = ["お客様（発注者）", "元請会社", "1次下請", "2次下請", "3次下請（実際に施工）"];
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <figure className="rounded-[16px] border border-line bg-white p-5 md:p-7">
        <figcaption className="text-[15px] font-bold text-steel">多重下請の場合（例）</figcaption>
        <ol data-reveal-stagger="90" className="mt-5 space-y-2">
          {multi.map((m, i) => (
            <li key={m}>
              <div
                className={`rounded-sm px-4 py-2.5 text-center text-[14px] ${
                  i === 0 ? "bg-ink text-white" : i === multi.length - 1 ? "bg-mist font-bold text-ink" : "bg-porcelain text-steel"
                }`}
              >
                {m}
              </div>
              {i < multi.length - 1 && (
                <p aria-hidden="true" className="py-0.5 text-center text-[12px] text-steel/70">
                  ↓ 要望・費用が会社を経由
                </p>
              )}
            </li>
          ))}
        </ol>
        <p className="mt-4 text-[13px] leading-relaxed text-steel">
          間に入る会社が多いほど、要望が職人に届くまでに時間がかかり、責任の所在もわかりにくくなります。
        </p>
      </figure>
      <figure className="rounded-[16px] border-2 border-pipe bg-white p-5 md:p-7">
        <figcaption className="text-[15px] font-bold text-ai">直接ご依頼いただく場合</figcaption>
        <ol data-reveal-stagger="90" className="mt-5 space-y-2">
          <li>
            <div className="rounded-sm bg-ink px-4 py-2.5 text-center text-[14px] text-white">お客様（発注者）</div>
            <p aria-hidden="true" className="py-0.5 text-center text-[12px] text-ai">↓ 要望をそのまま、施工する会社へ</p>
          </li>
          <li>
            <div className="rounded-sm bg-gradient-to-r from-pipe to-ai px-4 py-2.5 text-center text-[14px] font-bold text-white">
              健やかライン（製作・据付・施工まで）
            </div>
          </li>
        </ol>
        <p className="mt-4 text-[13px] leading-relaxed text-steel">
          打合せをした会社が、そのまま製作から施工まで担当します。窓口と責任が一つにまとまります。
        </p>
      </figure>
    </div>
  );
}
