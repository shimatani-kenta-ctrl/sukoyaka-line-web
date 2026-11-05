import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { ButtonLink, Container, JsonLd, SectionHeading } from "@/components/ui";
import { site } from "@/config/site";
import { works } from "@/data/works";
import { workFaq } from "@/data/faq";
import { pageMeta } from "@/lib/seo";

/**
 * 工事のご依頼（問い合わせ用ランディングページ）。
 * 機器メーカー・代理店の方と、工場・施設をお持ちの方の両方に向けたページ。
 * 仕事の受け方は「工事一式の請負」のみ。人を出す形の言い回し（増員・人工・常用など）は使わない。
 * 書いてあるのはサイトに載せている事実だけ（事業内容・強み・施工事例・よくある質問）。
 */
export const metadata: Metadata = pageMeta({
  title: "工事のご依頼（機器据付・周辺配管・工場の配管工事）",
  description: `${site.name}は、機器の据付と周辺配管、工場・プラントの配管工事を工事一式の請負でお受けしています。製作から据付まで一社で対応し、急ぎの案件にも関西一円で動きます。お見積りは無料です。`,
  path: "/request/",
});

const audiences = [
  {
    label: "機器メーカー・代理店の方へ",
    title: "機器の納入に、据付と周辺配管をまとめて。",
    body: "ポンプやボイラー、空調機などの機器を納める際の、据付・周辺配管・架台製作を工事一式でお受けします。自社で配管施工をされない場合も、納入後の工事をまとめてお任せいただけます。",
    points: ["機器の据付と周辺配管を一式で", "架台の製作から据付まで", "納期・工程に合わせた段取り"],
  },
  {
    label: "工場・施設をお持ちの方へ",
    title: "設備の配管工事を、直接ご依頼いただけます。",
    body: "設備の新設・増設・更新に伴う配管工事を、直接お受けします。間に何社も入らないので、ご要望がそのまま現場に伝わります。工場の休止期間に合わせた短い工期の工事にも対応します。",
    points: ["蒸気・冷却水・エア・薬剤などの配管", "休止期間に合わせた短工期の工事", "図面がない段階からご相談可能"],
  },
];

const services = [
  { name: "各種配管工事", body: "工場・プラントの各種流体の配管を、新設・増設・改修まで施工します。" },
  { name: "各種配管製作", body: "現場の寸法や取合いに合わせて配管を製作し、取付けまで一貫して行います。" },
  { name: "架台製作及び据付", body: "機器や配管を支える架台を製作し、据付まで行います。" },
  { name: "溶接工事", body: "ステンレス・鋼管のTIG溶接、アーク溶接に対応します。" },
];

const reasons = [
  {
    no: "01",
    title: "急ぎの案件にも、すぐ動く",
    body: "設備トラブルや工程の前倒しなど、急なご依頼にも段取りを組んで対応します。お急ぎの場合も、まずはご相談ください。",
  },
  {
    no: "02",
    title: "製作から据付まで、一社で一貫対応",
    body: "配管・架台の製作から溶接、据付、施工まで一社で行うので、業者どうしの調整や現場での手戻りを減らせます。",
  },
  {
    no: "03",
    title: "若い職人のチームと、同じ基準の仕上げ",
    body: "若手を中心とした機動力のあるチームで、溶接部の外観、配管の通り、現場の片付けまで同じ基準で仕上げます。",
  },
];

const flow = [
  { title: "お問い合わせ", body: "フォームか、かんたん見積もり依頼でご連絡ください。" },
  { title: "現場の確認・お打ち合わせ", body: "現場を拝見し、ご要望や工程、取合いを確認します。" },
  { title: "お見積り（無料）", body: "工事一式でのお見積りをお出しします。" },
  { title: "製作・施工", body: "必要な配管・架台を製作し、現場で据付・施工します。" },
  { title: "お引き渡し", body: "仕上がりをご確認いただき、お引き渡しします。" },
];

// よくある質問から、ご依頼前に多い内容を抜き出して載せる
const faqQuestions = [
  "どんな工事を依頼できますか？",
  "急ぎの工事にも対応できますか？",
  "工場の休止期間だけで工事を終えられますか？",
  "図面がなくても相談できますか？見積りは有料ですか？",
  "対応エリアはどこですか？",
];
const faqs = faqQuestions
  .map((q) => workFaq.find((f) => f.q === q))
  .filter((f): f is (typeof workFaq)[number] => Boolean(f));

function CtaButtons({ light = false }: { light?: boolean }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <ButtonLink href="/estimate/" variant={light ? "light" : "primary"}>
        かんたん見積もり依頼（約1分）
      </ButtonLink>
    </div>
  );
}

export default function RequestPage() {
  const latest = works.slice(0, 3);
  return (
    <>
      <PageHero
        title="工事のご依頼"
        lead="機器の据付と周辺配管、工場設備の配管工事を、工事一式の請負でお受けします。製作から据付まで一社で対応し、急ぎの案件にも関西一円で動きます。"
        path="/request/"
      />

      {/* 最初の問い合わせ導線 */}
      <section className="border-b border-line bg-mist py-10 md:py-12">
        <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[15px] md:text-base">
            工事の内容と時期を選ぶだけで、見積もりのご依頼ができます。<span className="font-medium">お見積りは無料です。</span>
          </p>
          <CtaButtons />
        </Container>
      </section>

      {/* 2つの相手 */}
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading title="こんな方からのご依頼をお受けしています" side="FOR YOU" />
          <div data-reveal-stagger="140" className="mt-12 grid gap-6 md:grid-cols-2">
            {audiences.map((a) => (
              <article key={a.label} className="border-t-[3px] border-ai bg-white px-6 py-8 md:px-10 md:py-10">
                <p className="text-[13px] tracking-[0.1em] text-ai">{a.label}</p>
                <h3 className="mt-3 text-xl leading-relaxed md:text-2xl">{a.title}</h3>
                <p className="mt-4 text-[15px] text-steel">{a.body}</p>
                <ul className="mt-6 space-y-2 text-[14px]">
                  {a.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[9px] h-[2px] w-3 shrink-0 bg-sky" />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* 対応できる工事 */}
      <section className="bg-porcelain py-16 md:py-24">
        <Container>
          <SectionHeading title="対応できる工事" side="SERVICE" lead="すべて工事一式の請負でお受けします。" />
          <div data-reveal-stagger="120" className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <div key={s.name} className="bg-white px-6 py-8">
                <h3 className="text-lg">{s.name}</h3>
                <p className="mt-3 text-[14px] text-steel">{s.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 選ばれる理由 */}
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading title="健やかラインにご依頼いただく理由" side="REASON" />
          <ol data-reveal-stagger="140" className="mt-12 grid gap-10 md:grid-cols-3">
            {reasons.map((r) => (
              <li key={r.no} className="border-t border-ink/20 pt-6">
                <p className="font-display text-3xl text-sky">{r.no}</p>
                <h3 className="mt-3 text-lg">{r.title}</h3>
                <p className="mt-3 text-[14px] text-steel">{r.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* 施工事例 */}
      {latest.length > 0 && (
        <section className="bg-mist py-16 md:py-24">
          <Container>
            <SectionHeading title="施工事例" side="WORKS" />
            <ul data-reveal-stagger="120" className="mt-12 grid gap-6 md:grid-cols-3">
              {latest.map((w) => (
                <li key={w.slug}>
                  <Link href={`/works/${w.slug}/`} className="group block h-full bg-white px-6 py-7 transition-colors hover:bg-porcelain">
                    <p className="text-[12px] text-steel">
                      {w.date}｜{w.location}
                    </p>
                    <h3 className="mt-2 text-[16px] leading-relaxed group-hover:text-ai">{w.title}</h3>
                    <p className="mt-3 line-clamp-3 text-[13px] text-steel">{w.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <ButtonLink href="/works/" variant="outline">
                施工事例をすべて見る
              </ButtonLink>
            </div>
          </Container>
        </section>
      )}

      {/* ご依頼の流れ */}
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading title="ご依頼の流れ" side="FLOW" />
          <ol data-reveal-stagger="120" className="mt-12 grid gap-4 md:grid-cols-5">
            {flow.map((f, i) => (
              <li key={f.title} className="relative bg-white px-5 py-6 ring-1 ring-line">
                <p className="font-display text-sm text-ai">STEP {i + 1}</p>
                <h3 className="mt-2 text-[16px]">{f.title}</h3>
                <p className="mt-2 text-[13px] text-steel">{f.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* よくある質問 */}
      {faqs.length > 0 && (
        <section className="bg-porcelain py-16 md:py-24">
          <Container>
            <SectionHeading title="よくある質問" side="FAQ" />
            <dl data-reveal className="mt-12 divide-y divide-line border-y border-line">
              {faqs.map((f) => (
                <div key={f.q} className="py-6">
                  <dt className="flex gap-3 text-[16px] font-medium">
                    <span aria-hidden="true" className="font-display text-ai">Q</span>
                    {f.q}
                  </dt>
                  <dd className="mt-3 flex gap-3 text-[14px] text-steel">
                    <span aria-hidden="true" className="font-display text-sky">A</span>
                    <span>{f.a}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>
      )}

      {/* 最後の問い合わせ導線 */}
      <section className="bg-ai text-white">
        <Container className="py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl">まずは、工事の内容をお聞かせください。</h2>
          <p className="mt-4 max-w-2xl text-[15px] text-white/85">
            図面がまだない段階のご相談や、急ぎの案件もお受けしています。お見積りは無料です。
          </p>
          <div className="mt-8">
            <CtaButtons light />
          </div>
          <p className="mt-6 text-[13px] text-white/70">
            文章で詳しくご相談されたい方は
            <Link href="/contact/" className="mx-1 underline underline-offset-4 hover:text-sky">
              お問い合わせフォーム
            </Link>
            からどうぞ。
          </p>
        </Container>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "配管工事・機器据付工事の請負",
          provider: { "@type": "Organization", name: site.name, url: site.url },
          areaServed: site.company.area,
          serviceType: services.map((s) => s.name),
          url: `${site.url}/request/`,
        }}
      />
    </>
  );
}
