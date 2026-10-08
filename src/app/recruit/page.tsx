import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import { site, telHref } from "@/config/site";
import { applySteps, jobs } from "@/data/jobs";

export const metadata: Metadata = {
  title: "採用情報",
  description: `${site.name}の採用情報です。尼崎を拠点に、配管工（経験者）と配管工見習い（未経験歓迎）を募集しています。若手中心のチームで、手に職をつけませんか。`,
  alternates: { canonical: "/recruit/" },
};

const values = [
  {
    title: "未経験から、一人前へ。",
    body: "道具の名前、図面の読み方、溶接の基本。最初は先輩の隣で、一つずつ覚えていけば大丈夫です。",
  },
  {
    title: "若い仲間と、同じ現場で。",
    body: "年の近いメンバーが多く、分からないことを気軽に聞ける雰囲気です。",
  },
  {
    title: "腕が、評価につながる。",
    body: "経験者の方は、これまでの技術を存分に活かしてください。現場の中心として、後輩の育成も担っていただきます。",
  },
];

export default function RecruitPage() {
  return (
    <>
      <PageHero
        title="採用情報"
        lead="経験者も、未経験の方も。一緒に現場をつくる仲間を募集しています。"
        path="/recruit/"
      />

      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading
            title="手に職をつけて、長く働ける場所を。"
            lead="配管工事は、工場やプラントが動き続けるために欠かせない仕事です。経験を積むほどにできることが増え、一生ものの技術になります。"
          />
          <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
            {values.map((v) => (
              <div key={v.title} className="border-l-[3px] border-sky pl-6">
                <h3 className="text-xl leading-relaxed">{v.title}</h3>
                <p className="mt-4 text-[15px] text-steel">{v.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-mist py-20 md:py-28">
        <Container>
          <SectionHeading title="募集要項" side="募集中の職種" />
          <div className="mt-12 space-y-12">
            {jobs.map((job) => (
              <article key={job.title} className="bg-white">
                <header className="border-t-[3px] border-ai px-5 pb-6 pt-8 md:px-8">
                  <h3 className="text-2xl">{job.title}</h3>
                  <p className="mt-3 text-[15px] text-steel">{job.lead}</p>
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
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading title="応募の流れ" />
          <ol className="mt-12 grid gap-6 md:grid-cols-4 md:gap-0">
            {applySteps.map((s, i) => (
              <li key={s.title} className="relative md:pr-8">
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink font-serif text-white">
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

          <div className="mt-16 flex flex-col gap-6 bg-ink px-6 py-10 text-white md:flex-row md:items-center md:justify-between md:px-12">
            <div>
              <p className="font-serif text-xl md:text-2xl">まずは気軽に、話を聞きに来てください。</p>
              <p className="mt-2 text-[14px] text-white/75">履歴書は面談のときで構いません。</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact/?type=recruit" variant="light">
                フォームで応募する
              </ButtonLink>
              <a
                href={telHref}
                className="inline-flex min-h-12 items-center justify-center rounded-sm border border-sky/70 px-7 text-[15px] tracking-[0.1em] transition-colors hover:bg-white hover:text-ink"
              >
                電話で問い合わせる
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
