import Link from "next/link";
import { PipeHero } from "@/components/PipeHero";
import { ButtonLink, Container, SampleBadge, SectionHeading } from "@/components/ui";
import { Marquee } from "@/components/Marquee";
import { WorkVisual } from "@/components/WorkVisual";
import { CtaBand } from "@/components/CtaBand";
import { GoogleMap } from "@/components/GoogleMap";
import { InstagramFeed, InstagramFollowButton } from "@/components/InstagramFeed";
import { fullAddress, site, telHref } from "@/config/site";
import { works } from "@/data/works";
import { voices } from "@/data/voices";
import { getInstagramPosts } from "@/lib/instagram";

export const metadata = { alternates: { canonical: "/" } };

const services = [
  {
    name: "各種配管工事",
    body: "工場・プラントの蒸気、冷却水、エア、各種流体の配管を施工します。設備の新設・増設・改修から、休止期間に合わせた短工期の工事まで対応します。",
  },
  {
    name: "各種配管製作",
    body: "現場の寸法や取合いに合わせて、配管を加工・製作します。製作から取付けまで一貫して行うので、現場での手戻りを減らせます。",
  },
  {
    name: "架台製作及び据付",
    body: "機器や配管を支える架台を製作し、据付まで行います。ポンプやボイラーなど機器の据付と周辺配管も、あわせてお受けします。",
  },
  {
    name: "溶接工事",
    body: "ステンレス・鋼管のTIG溶接、アーク溶接に対応します。見えない内面まで品質にこだわり、確かな溶接部をお引き渡しします。",
  },
];

const strengths = [
  {
    title: "急ぎの案件にも、すぐ動く。",
    body: "設備トラブルや工程の前倒しなど、急なご依頼にも人員と段取りを組んで対応します。まずはお電話でご相談ください。",
  },
  {
    title: "若い職人が、現場を支える。",
    body: "若手を中心とした機動力のあるチームです。先輩から後輩へ技術をつなぎ、長くお付き合いできる施工体制をつくっています。",
  },
  {
    title: "仕上がりで、信頼を残す。",
    body: "溶接部の外観、配管の通り、現場の片付けまで。見えるところも見えないところも、同じ基準で仕上げます。",
  },
];

export default async function HomePage() {
  const posts = await getInstagramPosts(6);
  const latestWorks = works.slice(0, 3);
  const voice = voices[0];

  return (
    <>
      <PipeHero />

      {/* 事業内容 */}
      <section className="py-20 md:py-32">
        <Container>
          <SectionHeading
            title="私たちの仕事"
            side="事業内容"
            lead="配管の製作から架台の据付、溶接、施工まで。現場で必要な仕事を、一つの会社で完結します。"
          />
          <ul data-reveal-stagger="120" className="mt-14 border-t border-line">
            {services.map((s) => (
              <li
                key={s.name}
                className="grid gap-3 border-b border-line py-8 md:grid-cols-[280px_1fr] md:gap-10 md:py-10"
              >
                <h3 className="flex items-center gap-4 text-xl md:text-2xl">
                  <span aria-hidden="true" className="h-[10px] w-[10px] shrink-0 bg-sky" />
                  {s.name}
                </h3>
                <p className="text-[15px] text-steel">{s.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 横に流れる文字 */}
      <div className="space-y-3 pb-4">
        <Marquee text="プラント配管 ／ 設備配管 ／ 機器据付 ／ TIG溶接 ／" speed={0.35} />
        <Marquee text="兵庫・大阪の現場へ、すぐに動く。" speed={-0.3} />
      </div>

      {/* 強み */}
      <section className="bg-mist py-20 md:py-32">
        <Container>
          <SectionHeading title="選ばれる理由" side="私たちの強み" />
          <div data-reveal-stagger="160" className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
            {strengths.map((s) => (
              <div key={s.title} className="reveal-rail pl-6">
                <h3 className="text-xl leading-relaxed md:text-[22px]">{s.title}</h3>
                <p className="mt-4 text-[15px] text-steel">{s.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 施工事例 */}
      <section className="py-20 md:py-32">
        <Container>
          <SectionHeading title="施工事例" side="これまでの仕事" />
          {latestWorks.length === 0 ? (
            <p data-reveal className="mt-12 text-[15px] text-steel">
              施工事例は、順次掲載していきます。日々の現場の様子はInstagramでもご覧いただけます。
            </p>
          ) : (
            <ul data-reveal-stagger="140" className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
              {latestWorks.map((w) => (
                <li key={w.slug}>
                  <Link href={`/works/#${w.slug}`} className="group block">
                    <div data-reveal="wipe" className="aspect-[16/10] overflow-hidden">
                      <WorkVisual
                        category={w.category}
                        image={w.photos[0]?.src}
                        alt={w.title}
                        className="transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="mt-4 flex items-center gap-3 text-[12px] text-steel">
                      <span>{w.category}</span>
                      <span aria-hidden="true" className="h-3 w-px bg-line" />
                      <span>{w.location}</span>
                    </div>
                    <h3 className="mt-2 text-lg leading-relaxed group-hover:text-ai">{w.title}</h3>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-12">
            <ButtonLink href="/works/" variant="outline">
              施工事例をすべて見る
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* お客様の声 */}
      {voice && (
        <section className="border-y border-line bg-white py-20 md:py-28">
          <Container className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
            <SectionHeading title="お客様の声" />
            <figure data-reveal="right">
              <blockquote className="font-display text-xl leading-[2] tracking-[0.06em] md:text-2xl md:leading-[2.1]">
                {voice.body}
              </blockquote>
              <figcaption className="mt-6 flex flex-wrap items-center gap-3 text-[13px] text-steel">
                <span>
                  {voice.who} {voice.role}（{voice.work}）
                </span>
                {voice.sample && <SampleBadge />}
              </figcaption>
              <div className="mt-10">
                <ButtonLink href="/voice/" variant="outline">
                  お客様の声をもっと読む
                </ButtonLink>
              </div>
            </figure>
          </Container>
        </section>
      )}

      {/* 採用 */}
      <section className="relative overflow-hidden bg-ink text-white">
        <svg data-reveal="draw" aria-hidden="true" viewBox="0 0 600 400" className="absolute -right-24 top-0 h-full opacity-50 md:right-0" fill="none">
          <path className="draw-line" pathLength={1} d="M600 60 H300 a60 60 0 0 0 -60 60 V420" stroke="#1f5a96" strokeWidth="26" />
          <path className="draw-line" pathLength={1} d="M600 60 H300 a60 60 0 0 0 -60 60 V420" stroke="#00c2cb" strokeWidth="1" />
          <rect className="draw-fade" x="420" y="40" width="8" height="40" fill="#00c2cb" />
          <rect className="draw-fade" x="220" y="260" width="40" height="8" fill="#00c2cb" />
        </svg>
        <Container className="relative py-20 md:py-32">
          <div className="max-w-xl">
            <SectionHeading
              light
              title="一緒に、現場をつくる仲間を。"
              lead="配管工事スタッフ・溶接工を正社員で募集中。月給30万円〜、未経験歓迎、面接は1回のみです。基礎から先輩が丁寧に教えるので、一生モノの技術が身につきます。"
            />
            <div data-reveal className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/recruit/" variant="light">
                採用情報を見る
              </ButtonLink>
              <ButtonLink href="/contact/?type=recruit" variant="ghost">
                応募・相談する
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <Marquee
        text="未経験から、一生モノの技術を。"
        speed={0.3}
        className="bg-ink pb-10"
        stroke="rgba(184,236,239,0.28)"
      />

      {/* Instagram */}
      <section className="py-20 md:py-32">
        <Container>
          <SectionHeading title="現場の様子" side="インスタグラム" lead="施工中の現場や、職人たちの日常をInstagramで発信しています。" />
          <div data-reveal className="mt-12">
            <InstagramFeed posts={posts} limit={6} />
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <InstagramFollowButton />
            <ButtonLink href="/instagram/" variant="outline">
              Instagramのページへ
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* 会社情報・アクセス */}
      <section className="bg-mist py-20 md:py-28">
        <Container className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <SectionHeading title="会社情報" side="アクセス" />
            <dl data-reveal-stagger="90" className="mt-10 space-y-4 text-[15px]">
              <div className="grid grid-cols-[88px_1fr] gap-4">
                <dt className="text-steel">社名</dt>
                <dd>{site.name}</dd>
              </div>
              <div className="grid grid-cols-[88px_1fr] gap-4">
                <dt className="text-steel">所在地</dt>
                <dd>
                  〒{site.company.postalCode}
                  <br />
                  {fullAddress}
                </dd>
              </div>
              <div className="grid grid-cols-[88px_1fr] gap-4">
                <dt className="text-steel">電話</dt>
                <dd>
                  <a href={telHref} className="text-ai underline-offset-4 hover:underline">
                    {site.company.tel}
                  </a>
                </dd>
              </div>
              <div className="grid grid-cols-[88px_1fr] gap-4">
                <dt className="text-steel">対応エリア</dt>
                <dd>{site.company.area}</dd>
              </div>
            </dl>
            <div className="mt-10">
              <ButtonLink href="/company/" variant="outline">
                会社概要を見る
              </ButtonLink>
            </div>
          </div>
          <div data-reveal="wipe">
            <GoogleMap className="aspect-[4/3] w-full" />
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
