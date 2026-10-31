import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink, Container, JsonLd, SectionHeading } from "@/components/ui";
import { Marquee } from "@/components/Marquee";
import { site, telHref } from "@/config/site";
import {
  applySteps,
  ceoMessage,
  daySchedule,
  dayScheduleNote,
  growthRoadmap,
  industryWalls,
  job,
  jobPostedAt,
  jobSalaryMin,
  notForPeople,
  ourActions,
  recruitFaq,
  wantPeople,
} from "@/data/jobs";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "配管工・溶接工の求人（兵庫県尼崎市・正社員）｜採用情報",
  description: `${site.name}の採用情報。尼崎を拠点に、兵庫・大阪の工場やプラントで働く配管工事スタッフ・溶接工を正社員で募集しています。月給30万円〜、未経験歓迎、面接1回のみ。まずは会いにきてください。`,
  path: "/recruit/",
  image: { url: "/og-recruit.jpg", width: 1200, height: 630, alt: "配管工・溶接工 募集（月給30万円〜・未経験歓迎・面接1回のみ）" },
});

const fieldPhotos = [
  { src: "/photos/ceiling-air-piping-work.jpg", alt: "天井パネルの上でエア配管を敷設する作業", caption: "天井パネル上でのエア配管の敷設作業" },
  { src: "/photos/ahu-piping-frame-1.jpg", alt: "空調機まわりの配管と架台（保温は別工事）", caption: "空調機まわりの配管と架台（保温は別工事）" },
  { src: "/photos/ahu-piping-frame-2.jpg", alt: "空調機まわりの配管と架台（保温は別工事）", caption: "空調機まわりの配管と架台（保温は別工事）" },
  { src: "/photos/flange-inner-weld.jpg", alt: "フランジ内側の溶接部", caption: "フランジ内側の溶接" },
  { src: "/photos/sus-flange-spool-end.jpg", alt: "ステンレスフランジ（SUSF304 10K 25A）付き短管の溶接部", caption: "ステンレスのフランジ付き短管" },
  { src: "/photos/tig-socket-weld.jpg", alt: "配管にねじ込みソケットをTIG溶接した溶接部", caption: "ねじ込みソケットのTIG溶接" },
  { src: "/photos/angle-base-weld.jpg", alt: "アングルと架台のベースの溶接部", caption: "アングルと架台のベースの溶接" },
  { src: "/photos/white-pipe-elbow-butt-weld.jpg", alt: "白管のエルボと直管の突合せ溶接部", caption: "白管のエルボと直管の突合せ溶接" },
];

const highlights: { label: string; value: string; count?: { before: string; to: number; after: string } }[] = [
  { label: "給与", value: "月給30万円〜", count: { before: "月給", to: 30, after: "万円〜" } },
  { label: "雇用形態", value: "正社員" },
  { label: "選考", value: "面接1回のみ" },
  { label: "経験", value: "未経験歓迎" },
];

const heroPhoto = {
  src: "/works/nara-chemical-plant-cooling-water-2025-08/1.jpg",
  alt: "健やかラインが施工した、化学工場の冷却水配管と配管支持架台",
};

export default function RecruitPage() {
  const jobPosting = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: [
      `<p>${job.lead}</p>`,
      ...job.rows.map((r) => `<p>${r.label}：${r.value}</p>`),
      // 未経験の方が気にする「入社後の育ち方」と「応募のしかた」も、Google の求人表示・AIの要約に届くように入れる
      `<p>育成の目安：${growthRoadmap.map((g) => `${g.period}で${g.items.join("・")}`).join("。")}。</p>`,
      `<p>選考の流れ：${applySteps.map((s) => s.title).join("→")}。${applySteps[0].body}</p>`,
    ].join(""),
    datePosted: jobPostedAt,
    employmentType: "FULL_TIME",
    occupationalCategory: "配管工・溶接工",
    industry: "配管工事業",
    // 自社サイトの応募フォームから、そのまま応募できる
    directApply: true,
    hiringOrganization: { "@type": "Organization", name: site.name, sameAs: site.url, logo: `${site.url}/logo.png` },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        postalCode: site.company.postalCode,
        addressRegion: site.company.prefecture,
        addressLocality: site.company.city,
        streetAddress: site.company.street,
        addressCountry: "JP",
      },
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "JPY",
      value: { "@type": "QuantitativeValue", minValue: jobSalaryMin, unitText: "MONTH" },
    },
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: recruitFaq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "トップ", item: `${site.url}/` },
      { "@type": "ListItem", position: 2, name: "採用情報", item: `${site.url}/recruit/` },
    ],
  };

  return (
    <>
      <JsonLd data={jobPosting} />
      <JsonLd data={faqPage} />
      <JsonLd data={breadcrumb} />

      {/* ファーストビュー */}
      <section className="relative overflow-hidden bg-ink text-white">
        <Container className="pb-16 pt-10 md:pb-24 md:pt-14">
          <nav aria-label="パンくずリスト" className="text-[12px] text-white/60">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-sky">
                  トップ
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white/90">
                採用情報
              </li>
            </ol>
          </nav>
          <div className="mt-10 grid items-center gap-12 md:grid-cols-[1.15fr_1fr] md:gap-14">
            <div data-reveal-stagger="120">
              <p className="font-display text-[13px] tracking-[0.3em] text-sky">RECRUIT ─ 配管工・溶接工 募集</p>
              <h1 className="mt-5 text-[40px] font-extrabold leading-[1.25] md:text-[68px]">
                この業界を、
                <br />
                <span className="text-sky">俺たちの世代で</span>
                <br />
                変える。
              </h1>
              <p className="mt-8 max-w-xl text-[17px] font-bold leading-[1.9] md:text-[19px]">
                職人の高齢化。人手不足。若手が育たない。
                <br />
                「見て覚えろ」で何年も下積みさせる時代は、もう終わりにしたい。
              </p>
              <p className="mt-4 max-w-xl text-[15px] leading-[2] text-white/80 md:text-base">
                健やかラインは、若い力が主役になれる配管会社をつくるために生まれました。経験はいらない。必要なのは、前に進もうとする気持ちだけです。
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact/?type=recruit" variant="light">
                  まずは会いに行く
                </ButtonLink>
                <a
                  href={telHref}
                  className="inline-flex min-h-12 items-center justify-center rounded-sm border border-sky/70 px-7 text-[15px] tracking-[0.1em] transition-colors hover:bg-white hover:text-ink"
                >
                  電話で相談する
                </a>
              </div>
              <p className="mt-4 text-[13px] text-white/60">履歴書不要。話を聞くだけでもOKです。</p>
            </div>
            <figure data-reveal="right">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroPhoto.src}
                alt={heroPhoto.alt}
                width={1200}
                height={900}
                className="aspect-[4/3] w-full rounded-sm object-cover"
              />
              <figcaption className="mt-3 text-[12px] text-white/60">私たちが施工した、化学工場の冷却水配管と配管支持架台</figcaption>
            </figure>
          </div>
        </Container>
      </section>

      {/* 募集の要点（最初に結論を書き、検索やAIの要約に引用されやすくする）。条件は jobs.ts の内容のみ */}
      <section className="pt-16 md:pt-24">
        <Container>
          <p data-reveal className="max-w-3xl text-[16px] leading-[2] md:text-[17px]">
            {site.name}（{site.company.prefecture}
            {site.company.city}）では、工場・プラントの配管工事スタッフと溶接工を正社員で募集しています。月給30万円〜、未経験歓迎で、面接は1回だけです。勤務地は尼崎市で、現場は兵庫県・大阪府が中心。勤務時間は8:00〜17:00、日曜・祝日休み（繁忙期を除く）です。
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[14px]">
            <li>
              <a href="#requirements" className="text-ai underline underline-offset-4">
                募集要項を見る
              </a>
            </li>
            <li>
              <Link href="/works/" className="text-ai underline underline-offset-4">
                実際の現場（施工事例）
              </Link>
            </li>
            <li>
              <Link href="/contact/?type=recruit" className="text-ai underline underline-offset-4">
                応募・質問する
              </Link>
            </li>
          </ul>
          <dl data-reveal-stagger="100" className="mt-12 grid grid-cols-2 border-l border-t border-line bg-white md:grid-cols-4">
            {highlights.map((h) => (
              <div key={h.label} className="border-b border-r border-line px-4 py-5 md:px-6">
                <dt className="text-[12px] text-steel">{h.label}</dt>
                <dd className="mt-1 font-display text-lg font-extrabold text-ai md:text-xl">
                  {h.count ? (
                    <>
                      {h.count.before}
                      <span data-count-to={h.count.to} className="tabular-nums">
                        {h.count.to}
                      </span>
                      {h.count.after}
                    </>
                  ) : (
                    h.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          {/* 直接受注と、社員への還元（比べる数字は使わない。根拠のある事実のみ） */}
          <div data-reveal className="mt-8 rounded-[16px] border-l-[4px] border-pipe bg-white px-6 py-6 md:px-8">
            <p className="text-[13px] font-bold tracking-[0.15em] text-ai">利益を、社員へ</p>
            <p className="mt-2 text-[15px] leading-[2] text-ink md:text-base">
              お客様から直接お受けする仕事を増やしています。間に入る会社がない分、工事の利益を社員の給与や待遇に還元しやすい仕組みです。
            </p>
            <Link href="/column/direct-contract/" className="mt-3 inline-block text-[14px] text-ai underline underline-offset-4">
              直接受注のしくみを詳しく（コラム）
            </Link>
          </div>
        </Container>
      </section>

      {/* 代表メッセージ */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-10 md:grid-cols-[260px_1fr] md:gap-16">
            <div data-reveal="left">
              <p className="font-display text-[13px] tracking-[0.3em] text-ai">MESSAGE</p>
              <p className="mt-3 text-[15px] text-steel">代表メッセージ</p>
            </div>
            <div data-reveal>
              <h2 className="text-[32px] font-extrabold leading-snug md:text-[48px]">{ceoMessage.title}</h2>
              <span aria-hidden="true" className="mt-6 block h-[3px] w-12 bg-sky" />
              <div className="mt-8 space-y-6 text-[15px] leading-[2.1] md:text-[17px]">
                {ceoMessage.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                <p className="text-[17px] font-bold leading-[1.9] text-ai md:text-[19px]">{ceoMessage.closing}</p>
              </div>
              <p className="mt-10 text-right font-display text-xl font-extrabold">
                <span className="mr-3 text-[13px] font-normal text-steel">
                  {site.name}　{site.company.representativeTitle}
                </span>
                {site.company.representative}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 業界の3つの壁と、私たちの取り組み */}
      <section className="bg-mist py-20 md:py-28">
        <Container>
          <SectionHeading
            title="業界の「当たり前」に、正面から挑む。"
            side="OUR VISION"
            lead="見て見ぬふりをされてきた3つの壁。私たちは、ここから逃げません。"
          />
          <ol data-reveal-stagger="120" className="mt-12 grid gap-5 md:grid-cols-3">
            {industryWalls.map((w, i) => (
              <li key={w.title} className="bg-white px-6 py-8 md:px-8">
                <p className="font-display text-[13px] font-bold tracking-[0.2em] text-steel">壁 0{i + 1}</p>
                <h3 className="mt-2 text-xl">{w.title}</h3>
                <p className="mt-3 text-[15px] text-steel">{w.body}</p>
              </li>
            ))}
          </ol>
          <div data-reveal="scale" className="mt-6 grid gap-10 bg-ink px-6 py-10 text-white md:grid-cols-2 md:px-12">
            {ourActions.map((a, i) => (
              <div key={a.title}>
                <p className="font-display text-[13px] tracking-[0.3em] text-sky">OUR ACTION 0{i + 1}</p>
                <h3 className="mt-2 text-xl md:text-2xl">{a.title}</h3>
                <p className="mt-3 text-[15px] leading-[2] text-white/80">{a.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 求める人物像 */}
      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading
            title="経験ゼロでいい。前を向けるなら、それでいい。"
            side="WHO WE WANT"
            lead="技術は、入ってから本気で教えます。だから問うのは一つだけ。「どんな時も、前向きに考えられるか」。"
          />
          <div data-reveal-stagger="140" className="mt-12 grid gap-5 md:grid-cols-2">
            <div className="border-t-[4px] border-ai bg-white px-6 py-8 md:px-8">
              <h3 className="text-xl">こんな人と働きたい</h3>
              <ul className="mt-5 space-y-3 text-[15px]">
                {wantPeople.map((t) => (
                  <li key={t} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[9px] h-2 w-2 shrink-0 rounded-full bg-sky" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t-[4px] border-steel/50 bg-white px-6 py-8 md:px-8">
              <h3 className="text-xl">正直、合わないかもしれない人</h3>
              <ul className="mt-5 space-y-3 text-[15px]">
                {notForPeople.map((t) => (
                  <li key={t} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[9px] h-2 w-2 shrink-0 rounded-full bg-steel/50" />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[13px] text-steel">入社後のミスマッチを防ぐため、あえてお伝えしています。</p>
            </div>
          </div>
        </Container>
      </section>

      {/* 育成ロードマップ */}
      <section className="bg-ink py-20 text-white md:py-28">
        <Container>
          <SectionHeading
            light
            title="3年で、一人前の職人へ。"
            side="GROWTH ROADMAP"
            lead="「見て覚えろ」で何年も待たせることはしません。いつまでに、何ができるようになるか。ゴールを決めて、先輩と一緒に一段ずつ上がっていきます。"
          />
          {/* スクロールに合わせて、配管の線に水色が流れ込み、到達した段階が点灯する */}
          <div data-progress className="roadmap relative mt-12">
            <div aria-hidden="true" data-progress-track className="roadmap-track">
              <span className="roadmap-fill" />
            </div>
            <ol data-reveal-stagger="160" className="roadmap-list grid gap-5 md:grid-cols-3">
              {growthRoadmap.map((g, i) => (
                <li key={g.period} data-progress-step className="roadmap-step relative">
                  <span aria-hidden="true" data-progress-node className="roadmap-node" />
                  <div className="roadmap-card border-t-[4px] border-sky bg-ink-deep px-6 py-8 md:px-8">
                    <p className="font-display text-[13px] tracking-[0.3em] text-sky">STEP 0{i + 1}</p>
                    <p className="mt-3 font-display text-[40px] font-extrabold leading-none md:text-[48px]">
                      {g.period}
                    </p>
                    <h3 className="mt-4 text-lg md:text-xl">{g.title}</h3>
                    <ul className="mt-5 space-y-2 text-[15px] text-white/85">
                      {g.items.map((t) => (
                        <li key={t} className="flex gap-3">
                          <span aria-hidden="true" className="mt-[9px] h-2 w-2 shrink-0 rounded-full bg-sky" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <p className="mt-6 text-[13px] text-white/60">
            成長のスピードには個人差があります。目安として、先輩と相談しながら進めていきます。
          </p>
          <div className="mt-4 flex flex-col gap-2 text-[14px] md:flex-row md:gap-6">
            <Link href="/column/pipefitter-job/" className="text-sky underline underline-offset-4">
              配管工の仕事内容と年収（コラム）
            </Link>
            <Link href="/column/tig-arc-welding/" className="text-sky underline underline-offset-4">
              TIG溶接とアーク溶接の違い・溶接工になるには（コラム）
            </Link>
          </div>
        </Container>
      </section>

      <Marquee text="未経験から、一生モノの技術を。" speed={0.3} className="py-12" />

      {/* 現場の仕事 */}
      <section className="pb-20 md:pb-28">
        <Container>
          <SectionHeading
            title="この手で、つくる仕事。"
            side="現場の仕事"
            lead="実際の現場で、私たちが手がけた配管・溶接の仕事です。未経験の方も、先輩と組んで一つずつ身につけていきます。"
          />
          <ul data-reveal-stagger="100" className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {fieldPhotos.map((p) => (
              <li key={p.src}>
                <figure>
                  <div data-tilt className="tilt overflow-hidden">
                    <img
                      src={p.src}
                      alt={p.alt}
                      width={900}
                      height={1200}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/5] w-full bg-mist object-cover"
                    />
                  </div>
                  <figcaption className="mt-2 text-[13px] leading-relaxed text-steel">{p.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section id="requirements" className="scroll-mt-24 bg-mist py-20 md:py-28">
        <Container>
          <SectionHeading title="募集要項" side="募集中の職種" />
          <article data-reveal className="mt-12 bg-white">
            <header className="border-t-[3px] border-ai px-5 pb-6 pt-8 md:px-8">
              <h3 className="text-2xl">{job.title}</h3>
              <p className="mt-3 text-[15px] text-steel">{job.lead}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="この求人の特徴">
                {job.tags.map((t) => (
                  <li key={t} className="bg-mist px-2.5 py-1 text-[13px] text-ai">
                    {t}
                  </li>
                ))}
              </ul>
            </header>
            <dl className="border-t border-line">
              {job.rows.map((r) => (
                <div
                  key={r.label}
                  className="grid gap-1 border-b border-line px-5 py-4 last:border-b-0 md:grid-cols-[180px_1fr] md:gap-8 md:px-8"
                >
                  <dt className="text-[13px] font-medium text-steel md:text-[14px]">{r.label}</dt>
                  <dd className="text-[15px]">{r.value}</dd>
                </div>
              ))}
            </dl>
          </article>
        </Container>
      </section>

      {/* ある1日の流れ */}
      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading title="ある1日の流れ" side="働き方" lead={dayScheduleNote} />
          <ol data-reveal-stagger="90" className="mt-12 max-w-3xl border-l-[3px] border-sky">
            {daySchedule.map((d, i) => (
              <li key={i} className="relative grid grid-cols-[96px_1fr] gap-4 py-4 pl-6 md:grid-cols-[120px_1fr] md:pl-10">
                <span aria-hidden="true" className="absolute -left-[8px] top-[26px] h-[13px] w-[13px] rounded-full border-[3px] border-sky bg-white" />
                <p className="font-display text-lg font-extrabold tabular-nums text-ai md:text-xl">{d.time}</p>
                <div>
                  <p className="text-[16px] font-bold md:text-lg">{d.title}</p>
                  {d.body && <p className="mt-1 text-[14px] text-steel">{d.body}</p>}
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-12 flex flex-col gap-4 border border-line bg-white px-6 py-6 md:flex-row md:items-center md:justify-between md:px-8">
            <p className="text-[15px] text-steel">現場の様子や社員のリアルな1日は、Instagramでも発信しています。</p>
            <a
              href={site.instagram.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-sm border border-ai px-6 text-[15px] text-ai transition-colors hover:bg-ai hover:text-white"
            >
              Instagramを見る {site.instagram.handle}
            </a>
          </div>
        </Container>
      </section>

      {/* 社員紹介（リファラル） */}
      <section className="bg-mist py-20 md:py-28">
        <Container>
          <div className="grid items-start gap-10 md:grid-cols-[1.2fr_1fr] md:gap-14">
            <div data-reveal>
              <p className="font-display text-[13px] tracking-[0.3em] text-ai">REFERRAL</p>
              <h2 className="mt-3 text-[28px] font-extrabold leading-snug md:text-[38px]">
                一緒に変えたい仲間を、
                <br />
                連れてきてほしい。
              </h2>
              <p className="mt-6 text-[15px] leading-[2] md:text-base">
                「あいつなら、ここで化ける」。そう思える友人・後輩・元同僚がいたら、ぜひ声をかけてください。信頼できる仲間と一緒なら、最初の一歩も怖くない。
              </p>
              <p className="mt-4 text-[14px] text-steel">
                社員のみなさんへ：このページのURLをLINEなどで送るだけで紹介できます。紹介制度の詳細は社内規程をご確認ください。
              </p>
            </div>
            <div data-reveal="right" className="bg-white px-6 py-8 md:px-8">
              <h3 className="text-lg">紹介で応募する方へ</h3>
              <ol className="mt-5 space-y-4 text-[15px]">
                <li className="flex gap-3">
                  <span className="font-display font-extrabold text-sky">1</span>
                  お問い合わせフォームで「採用・応募」を選び、内容欄に紹介してくれた社員の名前を書いてください。
                </li>
                <li className="flex gap-3">
                  <span className="font-display font-extrabold text-sky">2</span>
                  紹介者も一緒に、まずは会って話しましょう。
                </li>
              </ol>
            </div>
          </div>
        </Container>
      </section>

      {/* よくある質問 */}
      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading title="よくある質問" side="FAQ" />
          <div data-reveal-stagger="80" className="mt-12 space-y-3">
            {recruitFaq.map((f, i) => (
              <details key={f.q} className="group border border-line bg-white" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-start gap-4 px-5 py-5 md:px-8 [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-lg font-extrabold text-sky">Q</span>
                  <span className="flex-1 text-[16px] font-bold leading-relaxed">{f.q}</span>
                  <span aria-hidden="true" className="mt-1 text-xl leading-none text-ai transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="flex gap-4 border-t border-line px-5 py-5 md:px-8">
                  <span className="font-display text-lg font-extrabold text-ai">A</span>
                  <p className="flex-1 text-[15px] leading-relaxed text-steel">{f.a}</p>
                </div>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-mist py-20 md:py-28">
        <Container>
          <SectionHeading title="選考の流れ" lead="いきなり面接はしません。まずはお互いを知るところから始めます。" />
          <ol data-reveal-stagger="160" className="mt-12 grid gap-6 md:grid-cols-4 md:gap-0">
            {applySteps.map((s, i) => (
              <li key={s.title} className="relative md:pr-8">
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink font-display font-bold text-white">
                    {i + 1}
                  </span>
                  {i < applySteps.length - 1 && (
                    <span aria-hidden="true" className="hidden h-[3px] flex-1 bg-sky md:block" />
                  )}
                </div>
                <h3 className="mt-4 text-lg">{s.title}</h3>
                <p className="mt-2 text-[14px] text-steel">{s.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* 最後の呼びかけ */}
      <section className="bg-ink py-20 text-white md:py-28">
        <Container>
          <div data-reveal className="text-center">
            <p className="font-display text-[13px] tracking-[0.3em] text-sky">ENTRY</p>
            <h2 className="mt-4 text-[32px] font-extrabold leading-snug md:text-[54px]">
              一緒に、<span className="text-sky">業界を変えにいこう。</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[15px] leading-[2] text-white/80 md:text-[17px]">
              今の仕事にモヤモヤしているなら、まずは会いにきてください。
              <br className="hidden md:inline" />
              話を聞くだけでも大歓迎です。
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href="/contact/?type=recruit" variant="light">
                まずは会いに行く
              </ButtonLink>
              <a
                href={telHref}
                className="inline-flex min-h-12 items-center justify-center rounded-sm border border-sky/70 px-7 text-[15px] tracking-[0.1em] transition-colors hover:bg-white hover:text-ink"
              >
                電話で相談する
              </a>
            </div>
            <p className="mt-6 text-[13px] text-white/60">
              採用担当：{site.company.representative}　TEL {site.company.tel}
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
