/**
 * 「健やかラインだから、できることがある」：一貫対応の図と、3つの強み（01〜03）。
 * 書いてあるのはサイトに載せている事実だけ（事業内容・強み・よくある質問）。
 */
const steps = ["現地調査", "お見積り", "配管製作", "架台製作", "溶接", "据付", "配管工事", "改修・移設"];

const features = [
  {
    no: "01",
    note: "製作から据付まで、一社で一貫対応",
    before: "手戻りを減らし",
    mark: "短工期",
    after: "を実現",
    body: "配管・架台の製作から溶接、据付、施工まで一社で行うので、業者どうしの調整や現場での手戻りを減らせます。工場の休止期間に合わせた、短い工期の工事にも対応します。",
  },
  {
    no: "02",
    note: "急ぎの案件にも、すぐ動く",
    before: "止められない現場に",
    mark: "機動力",
    after: "で応える",
    body: "設備トラブルや工程の前倒しなど、急なご依頼にも人員と段取りを組んで対応します。お急ぎの場合は、まずはお電話でご相談ください。",
  },
  {
    no: "03",
    note: "若い職人のチームと、同じ基準の仕上げ",
    before: "仕上がりで",
    mark: "信頼",
    after: "を残す",
    body: "若手を中心とした機動力のあるチームで、先輩から後輩へ技術をつないでいます。溶接部の外観、配管の通り、現場の片付けまで、見えるところも見えないところも同じ基準で仕上げます。",
  },
];

function Diagram() {
  const n = steps.length;
  return (
    <div className="onestop relative mx-auto mt-14 aspect-square w-full max-w-[420px] md:max-w-[480px]">
      {/* 周りの淡い光と、つなぐ線 */}
      <div aria-hidden="true" className="onestop-glow absolute inset-[16%] rounded-full" />
      <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        {steps.map((_, i) => {
          const a = (i / n) * Math.PI * 2 - Math.PI / 2;
          return (
            <line
              key={i}
              x1={50 + Math.cos(a) * 19}
              y1={50 + Math.sin(a) * 19}
              x2={50 + Math.cos(a) * 30}
              y2={50 + Math.sin(a) * 30}
              stroke="#1f5a96"
              strokeOpacity="0.45"
              strokeWidth="0.3"
            />
          );
        })}
      </svg>
      <div
        data-reveal="scale"
        className="absolute left-1/2 top-1/2 flex h-[38%] w-[38%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-pipe to-ai text-center text-white shadow-[0_10px_40px_-10px_rgba(0,52,121,0.6)]"
      >
        <p className="text-[13px] font-bold leading-[1.9] tracking-[0.18em] md:text-[15px]">
          健やかラインの
          <br />
          一貫対応
        </p>
      </div>
      <ul data-reveal-stagger="90">
        {steps.map((s, i) => {
          const a = (i / n) * Math.PI * 2 - Math.PI / 2;
          return (
            <li
              key={s}
              className="absolute flex h-[22%] w-[22%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-pipe/60 bg-white/90 text-center text-[11px] font-medium leading-snug tracking-[0.1em] text-ai shadow-[0_0_24px_rgba(0,194,203,0.18)] md:text-[13px]"
              style={{ left: `${50 + Math.cos(a) * 38}%`, top: `${50 + Math.sin(a) * 38}%` }}
            >
              {s}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function OneStop() {
  return (
    <section data-bg="sky" className="py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div data-reveal className="max-w-2xl">
          <p className="text-[13px] tracking-[0.25em] text-ai">選ばれる理由</p>
          <h2 className="reveal-blur mt-4 text-[28px] leading-[1.6] text-ink md:text-[40px]">
            健やかラインだから、
            <br />
            できることがある
          </h2>
        </div>

        <Diagram />

        <ol className="mt-16 space-y-20 md:mt-24 md:space-y-28">
          {features.map((f) => (
            <li key={f.no} data-reveal className="grid gap-6 md:grid-cols-[1fr_1.2fr] md:gap-16">
              <div>
                <p className="text-right font-display text-[44px] font-light leading-none text-pipe underline decoration-1 underline-offset-[10px] md:text-left md:text-[64px]">
                  {f.no}
                </p>
                <p className="mt-8 text-[15px] font-bold text-steel md:text-base">（{f.note}）</p>
                <h3 className="mt-4 text-[26px] leading-[1.7] text-ink md:text-[32px]">
                  {f.before}
                  <br />
                  <span className="mr-2 inline-block border-2 border-pipe px-3 leading-[1.4] text-pipe">{f.mark}</span>
                  {f.after}
                </h3>
              </div>
              <p className="self-end text-[15px] leading-[2.1] text-steel md:text-base">{f.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
