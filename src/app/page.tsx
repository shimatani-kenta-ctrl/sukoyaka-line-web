import Link from "next/link";
import { IsoHero } from "@/components/IsoHero";
import { ButtonLink, Container, JsonLd, SampleBadge, SectionHeading } from "@/components/ui";
import { Marquee } from "@/components/Marquee";
import { OneStop } from "@/components/OneStop";
import { ConsultPanel } from "@/components/ConsultPanel";
import { WorkVisual } from "@/components/WorkVisual";
import { CtaBand } from "@/components/CtaBand";
import { GoogleMap } from "@/components/GoogleMap";
import { InstagramFeed, InstagramFollowButton } from "@/components/InstagramFeed";
import { fullAddress, site, telHref } from "@/config/site";
import { works } from "@/data/works";
import { voices } from "@/data/voices";
import { workFaq } from "@/data/faq";
import { getInstagramPosts } from "@/lib/instagram";

export const metadata = { alternates: { canonical: "/" } };

type Media = { type: "photo" | "video"; src: string; poster?: string; alt: string; caption: string };

const services: { name: string; body: string; media?: Media[]; link?: { href: string; label: string } }[] = [
  {
    name: "各種配管工事",
    body: "工場・プラントの蒸気、冷却水、エア、各種流体の配管を施工します。設備の新設・増設・改修から、休止期間に合わせた短工期の工事まで対応します。",
    media: [
      {
        type: "photo",
        src: "/photos/water-injection-piping.jpg",
        alt: "注水用の水の配管（バルブ・圧力計付き）",
        caption: "注水用の水の配管",
      },
      {
        type: "photo",
        src: "/photos/compressor-air-piping.jpg",
        alt: "コンプレッサー・ドライヤー・エアタンクまわりのエア配管（白管）",
        caption: "コンプレッサー・ドライヤー・エアタンクまわりのエア配管",
      },
    ],
  },
  {
    name: "各種配管製作",
    body: "現場の寸法や取合いに合わせて、配管を加工・製作します。工場の休止期間の前に製作しておけば、休止中は取付けと接続が中心になり、現場での作業時間を短くできます。製作から取付けまで一貫して行うので、現場での手戻りを減らせます。",
    link: { href: "/column/shutdown-piping-work/", label: "コラム：工場の休止期間に配管工事を終わらせるには" },
    media: [
      {
        type: "photo",
        src: "/photos/sus-flange-spools.jpg",
        alt: "ステンレス（SUSF304 10K 25A）のフランジ付き短管",
        caption: "ステンレスのフランジ付き短管（25A）の製作",
      },
    ],
  },
  {
    name: "架台製作及び据付",
    body: "機器や配管を支える架台を製作し、据付まで行います。ポンプやボイラーなど機器の据付と周辺配管も、あわせてお受けします。",
    media: [
      {
        type: "photo",
        src: "/photos/air-filter-angle-frame.jpg",
        alt: "アングルの架台に取り付けたエアフィルターと圧縮エア配管",
        caption: "アングルの架台とエアフィルターまわりの配管",
      },
      {
        type: "photo",
        src: "/photos/angle-base-weld.jpg",
        alt: "アングルと架台のベースの溶接部",
        caption: "アングルと架台のベースの溶接",
      },
    ],
  },
  {
    name: "溶接工事",
    body: "ステンレス・鋼管のTIG溶接、アーク溶接に対応します。熱による歪みを抑えるため、仮付けを細かく増やす、治具で固定する、あらかじめ逆方向へ少し曲げたり傾けたりして固定するといった段取りをしてから溶接します。見えない内面まで品質にこだわり、確かな溶接部をお引き渡しします。",
    link: { href: "/column/tig-arc-welding/", label: "コラム：TIG溶接とアーク溶接の違い" },
    media: [
      {
        type: "video",
        src: "/photos/sus-tank-tig-weld.mp4",
        poster: "/photos/sus-tank-tig-weld.jpg",
        alt: "ステンレス製タンクのTIG溶接部の動画",
        caption: "ステンレス製タンクのTIG溶接部",
      },
      {
        type: "photo",
        src: "/photos/tig-socket-weld.jpg",
        alt: "配管にねじ込みソケットをTIG溶接した溶接部",
        caption: "配管にねじ込みソケットをTIG溶接したところ",
      },
    ],
  },
];


export default async function HomePage() {
  const posts = await getInstagramPosts(6);
  const latestWorks = works.slice(0, 3);
  const voice = voices[0];
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: workFaq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <IsoHero />

      <JsonLd data={faqPage} />

      {/* スクロール位置に合わせて色が変わるページの地（ScrollEffects が担当） */}
      <div aria-hidden="true" data-page-bg className="page-bg pointer-events-none fixed inset-0 z-[-2]" />

      {/* 事業内容 */}
      <section data-bg="porcelain" className="relative isolate py-20 md:py-32">
        {/* 背景：作業風景の写真（スクロールしても画面に残り、薄く透けて見える） */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="sticky top-0 h-screen overflow-hidden">
            <img
              src="/photos/ceiling-air-piping-work.jpg"
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-[50%_45%]"
            />
            <div className="absolute inset-0 bg-porcelain/80" />
          </div>
        </div>
        <Container>
          <SectionHeading
            title="私たちの仕事"
            side="事業内容"
            lead="配管の製作から架台の据付、溶接、施工まで。現場で必要な仕事を、一つの会社で完結します。"
          />
          <ul data-reveal-stagger="120" className="mt-14 border-t border-line">
            {services.map((s, i) => (
              <li
                key={s.name}
                className="service-row group relative grid gap-3 border-b border-line py-8 md:grid-cols-[280px_1fr] md:gap-10 md:py-10"
              >
                <h3 className="flex items-center gap-4 text-xl md:text-2xl">
                  <span
                    aria-hidden="true"
                    className="font-display text-[13px] font-medium tracking-[0.2em] text-sky transition-colors group-hover:text-ai"
                  >
                    0{i + 1}
                  </span>
                  {s.name}
                </h3>
                <div>
                  <p className="text-[15px] text-steel">{s.body}</p>
                  {s.link && (
                    <p className="mt-3 text-[14px]">
                      <Link href={s.link.href} className="text-ai underline underline-offset-4 hover:no-underline">
                        {s.link.label} →
                      </Link>
                    </p>
                  )}
                  {s.media && (
                    <div className={`mt-6 grid gap-4 ${s.media.length > 1 ? "max-w-[520px] grid-cols-2" : "max-w-[320px]"}`}>
                      {s.media.map((m) => (
                        <figure key={m.src} data-reveal="scale">
                          {m.type === "video" ? (
                            <video
                              src={m.src}
                              poster={m.poster}
                              aria-label={m.alt}
                              autoPlay
                              muted
                              loop
                              playsInline
                              preload="metadata"
                              className="aspect-[4/5] w-full bg-mist object-cover"
                            />
                          ) : (
                            <img
                              src={m.src}
                              alt={m.alt}
                              width={900}
                              height={1200}
                              loading="lazy"
                              decoding="async"
                              className="aspect-[4/5] w-full bg-mist object-cover"
                            />
                          )}
                          <figcaption className="mt-2 text-[13px] leading-relaxed text-steel">{m.caption}</figcaption>
                        </figure>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 横に流れる文字 */}
      <div data-bg="porcelain" className="space-y-3 pb-4">
        <Marquee text="各種配管工事 ／ 配管製作 ／ 架台製作・据付 ／ 溶接工事 ／" speed={0.35} />
        <Marquee text="兵庫・大阪の現場へ、すぐに動く。" speed={-0.3} />
      </div>

      {/* 選ばれる理由（一貫対応の図と3つの強み） */}
      <OneStop />

      {/* よくあるご相談と、3つの約束 */}
      <ConsultPanel />

      {/* 施工事例 */}
      <section data-bg="porcelain" className="py-20 md:py-32">
        <Container>
          <SectionHeading title="施工事例" side="これまでの仕事" />
          {latestWorks.length === 0 ? (
            <p data-reveal className="mt-12 text-[15px] text-steel">
              施工事例は、順次掲載していきます。日々の現場の様子はInstagramでもご覧いただけます。
            </p>
          ) : (
            <ul
              data-reveal-stagger="140"
              className={`mt-14 grid gap-10 md:gap-8 ${latestWorks.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}
            >
              {latestWorks.map((w) => (
                <li key={w.slug}>
                  <Link href={`/works/${w.slug}/`} className="group block">
                    <div data-reveal="wipe" data-tilt className="tilt aspect-[16/10] overflow-hidden">
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
        <section data-bg="white" className="py-20 md:py-28">
          <Container className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
            <SectionHeading title="お客様の声" />
            <figure data-reveal="right">
              <blockquote className="font-display text-xl leading-[2] tracking-[0.06em] md:text-2xl md:leading-[2.1]">
                {voice.body}
              </blockquote>
              <figcaption className="mt-6 flex flex-wrap items-center gap-3 text-[13px] text-steel">
                <span>
                  {voice.who}（{voice.work}）
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

      {/* よくある質問（工事のご依頼） */}
      <section data-bg="mist" className="py-20 md:py-28">
        <Container>
          <SectionHeading title="よくあるご質問" side="工事のご依頼" />
          <div data-reveal-stagger="80" className="mt-12 space-y-3">
            {workFaq.map((f, i) => (
              <details key={f.q} className="group bg-white" open={i === 0}>
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
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/contact/">お問い合わせ・お見積り</ButtonLink>
            <ButtonLink href="/contact/?type=partner" variant="outline">
              協力会社のご相談
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* 採用 */}
      <section data-bg="ink" className="relative overflow-hidden text-white">
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
        className="pb-10"
        stroke="rgba(184,236,239,0.9)"
      />

      {/* Instagram */}
      <section data-bg="porcelain" className="py-20 md:py-32">
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
      <section data-bg="mist" className="py-20 md:py-28">
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
