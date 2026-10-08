import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { ButtonLink, Container, JsonLd } from "@/components/ui";
import { WorkVisual } from "@/components/WorkVisual";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/config/site";
import { works } from "@/data/works";

/**
 * 施工事例の個別ページ（/works/記事のslug/）。
 * src/data/works.ts に記事を追加すると、ページが自動で1つ増えます。
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const w = works.find((x) => x.slug === slug);
  if (!w) return {};
  const path = `/works/${w.slug}/`;
  const image = w.photos[0]?.src;
  return {
    title: `${w.title}｜施工事例`,
    description: w.summary,
    alternates: { canonical: path },
    openGraph: {
      title: w.title,
      description: w.summary,
      url: path,
      type: "article",
      locale: "ja_JP",
      siteName: site.name,
      images: [image ? { url: image, alt: w.photos[0]?.caption || w.title } : { url: "/og.png", width: 1200, height: 630, alt: site.name }],
    },
  };
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const index = works.findIndex((x) => x.slug === slug);
  if (index < 0) notFound();
  const w = works[index];
  const [main, ...rest] = w.photos;
  const others = works.filter((x) => x.slug !== w.slug).slice(0, 3);

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: w.title,
    description: w.summary,
    articleSection: w.category,
    mainEntityOfPage: `${site.url}/works/${w.slug}/`,
    ...(w.photos.length > 0 ? { image: w.photos.map((p) => `${site.url}${p.src}`) } : {}),
    author: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      logo: { "@type": "ImageObject", url: `${site.url}/logo.png` },
    },
  };

  return (
    <>
      <PageHero title={w.title} lead={w.summary} path={`/works/${w.slug}/`} parent={{ title: "施工事例", path: "/works/" }} />
      <JsonLd data={article} />

      <section className="py-14 md:py-20">
        <Container>
          {/* 工事の基本情報 */}
          <dl data-reveal className="flex flex-wrap gap-x-8 gap-y-2 border-y border-line py-4 text-[14px]">
            <div className="flex gap-2">
              <dt className="text-steel">工事の種類</dt>
              <dd>{w.category}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-steel">場所</dt>
              <dd>{w.location}</dd>
            </div>
            {w.date && (
              <div className="flex gap-2">
                <dt className="text-steel">時期</dt>
                <dd>{w.date}</dd>
              </div>
            )}
            {w.period && (
              <div className="flex gap-2">
                <dt className="text-steel">工期</dt>
                <dd>{w.period}</dd>
              </div>
            )}
          </dl>

          {/* 写真 */}
          <figure data-reveal="wipe" className="mt-10 aspect-[16/10] overflow-hidden bg-ink md:aspect-[21/10]">
            {main ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={main.src} alt={main.caption || w.title} className="h-full w-full object-cover" />
            ) : (
              <WorkVisual category={w.category} alt={w.title} />
            )}
          </figure>
          {main?.caption && <p className="mt-2 text-[13px] text-steel">{main.caption}</p>}
          {rest.length > 0 && (
            <ul data-reveal-stagger="100" className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
              {rest.map((p) => (
                <li key={p.src}>
                  <figure>
                    <div className="aspect-[4/3] overflow-hidden bg-mist">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.src} alt={p.caption || w.title} loading="lazy" className="h-full w-full object-cover" />
                    </div>
                    {p.caption && <figcaption className="mt-1.5 text-[12px] text-steel">{p.caption}</figcaption>}
                  </figure>
                </li>
              ))}
            </ul>
          )}

          {/* 本文 */}
          <div data-reveal-stagger="120" className="mt-12 max-w-3xl space-y-10">
            {w.sections.map((sec, i) => (
              <section key={i}>
                <h2 className="flex items-center gap-3 text-lg md:text-xl">
                  <span aria-hidden="true" className="h-5 w-[3px] bg-sky" />
                  {sec.heading}
                </h2>
                <p className="mt-3 whitespace-pre-line text-[15px] leading-[2]">{sec.body}</p>
              </section>
            ))}
          </div>

          {/* ほかの施工事例 */}
          {others.length > 0 && (
            <div className="mt-20 border-t border-line pt-12">
              <h2 className="text-xl md:text-2xl">ほかの施工事例</h2>
              <ul className="mt-8 grid gap-8 md:grid-cols-3">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link href={`/works/${o.slug}/`} className="group block">
                      <div className="aspect-[16/10] overflow-hidden">
                        <WorkVisual
                          category={o.category}
                          image={o.photos[0]?.src}
                          alt={o.title}
                          className="transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                      <p className="mt-3 text-[12px] text-steel">
                        {o.category}　{o.location}
                      </p>
                      <p className="mt-1 leading-relaxed group-hover:text-ai">{o.title}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/works/" variant="outline">
              施工事例の一覧へ
            </ButtonLink>
            <ButtonLink href="/contact/">工事を相談する</ButtonLink>
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
