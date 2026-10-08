import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ButtonLink, Container, JsonLd, SectionHeading } from "@/components/ui";
import { site, telHref } from "@/config/site";
import { applySteps, job, jobPostedAt, jobSalaryMin } from "@/data/jobs";

export const metadata: Metadata = {
  title: "採用情報",
  description: `${site.name}の採用情報。尼崎を拠点に、配管工事スタッフ・溶接工を正社員で募集しています。月給30万円〜、未経験歓迎、面接1回のみ。`,
  alternates: { canonical: "/recruit/" },
};

const values = [
  {
    title: "仕事は、人がつくる。",
    body: "技術だけでなく、挨拶や礼儀、責任感、仲間を思いやる気持ちを大切にしています。",
  },
  {
    title: "未経験から、一人前へ。",
    body: "基礎から段階的に、先輩が現場で丁寧に教えます。分からないことは何でも聞いてください。",
  },
  {
    title: "頑張りが、きちんと報われる。",
    body: "まだ成長中の会社だからこそ、一人ひとりの努力をしっかり評価します。",
  },
];

const highlights = [
  { label: "給与", value: "月給30万円〜" },
  { label: "雇用形態", value: "正社員" },
  { label: "選考", value: "面接1回のみ" },
  { label: "経験", value: "未経験歓迎" },
];

export default function RecruitPage() {
  const jobPosting = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: `<p>${job.lead}</p>${job.rows.map((r) => `<p>${r.label}：${r.value}</p>`).join("")}`,
    datePosted: jobPostedAt,
    employmentType: "FULL_TIME",
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

  return (
    <>
      <PageHero title="採用情報" lead={`${job.catchCopy}${job.title}を募集しています。`} path="/recruit/" />
      <JsonLd data={jobPosting} />

      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading
            title="手に職をつけて、家族を守れる収入を。"
            lead="配管工事は、工場やプラントを動かし続けるために欠かせない、社会のインフラを支える仕事です。「手に職をつけたい」「家族を守れる収入を得たい」という想いを持つ方を待っています。"
          />
          <dl data-reveal-stagger="100" className="mt-12 grid grid-cols-2 border-l border-t border-line bg-white md:grid-cols-4">
            {highlights.map((h) => (
              <div key={h.label} className="border-b border-r border-line px-4 py-5 md:px-6">
                <dt className="text-[12px] text-steel">{h.label}</dt>
                <dd className="mt-1 font-display text-lg font-extrabold text-ai md:text-xl">{h.value}</dd>
              </div>
            ))}
          </dl>
          <div data-reveal-stagger="160" className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
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

      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading title="応募の流れ" />
          <ol data-reveal-stagger="200" className="mt-12 grid gap-6 md:grid-cols-3 md:gap-0">
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

          <div data-reveal="scale" className="mt-16 flex flex-col gap-6 bg-ink px-6 py-10 text-white md:flex-row md:items-center md:justify-between md:px-12">
            <div>
              <p className="font-display text-xl font-extrabold md:text-2xl">まずは気軽に、話を聞きに来てください。</p>
              <p className="mt-2 text-[14px] text-white/75">
                採用担当：{site.company.representative}　TEL {site.company.tel}
              </p>
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
