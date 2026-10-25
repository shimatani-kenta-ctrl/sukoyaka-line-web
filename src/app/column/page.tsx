import type { Metadata } from "next";
import Link from "next/link";
import { Container, JsonLd } from "@/components/ui";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";
import { columns } from "@/data/columns";

export const metadata: Metadata = pageMeta({
  title: "コラム",
  description: `${site.name}のコラム。配管工事のご依頼や、建設業の仕組みについて、現場を知る会社の目線で解説します。`,
  path: "/column/",
});

/** 公開からこの日数のあいだ「NEW」を表示する */
const NEW_DAYS = 14;
const DAY = 24 * 60 * 60 * 1000;
/** NEWを外す日時（公開日の日本時間0時 + 表示日数） */
const newUntil = (published?: string) =>
  published ? new Date(`${published}T00:00:00+09:00`).getTime() + NEW_DAYS * DAY : 0;

export default function ColumnIndex() {
  return (
    <>
      {/* 開いてすぐ記事の一覧が見えるよう、大きな見出し帯は使わない */}
      <section className="pb-16 pt-8 md:pb-24 md:pt-12">
        <Container className="max-w-3xl">
          <nav aria-label="パンくずリスト" className="text-[12px] text-steel">
            <Link href="/" className="hover:text-ai">
              トップ
            </Link>
            <span className="mx-2">/</span>
            <span aria-current="page">コラム</span>
          </nav>
          <h1 className="mt-3 text-[26px] text-ink md:text-[34px]">コラム</h1>
          <p className="mt-2 text-[14px] leading-relaxed text-steel">
            配管工事のご依頼や、建設業の仕組みについて、現場を知る会社の目線で解説します。
          </p>
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "トップ", item: `${site.url}/` },
                { "@type": "ListItem", position: 2, name: "コラム", item: `${site.url}/column/` },
              ],
            }}
          />
          <ul className="mt-6 space-y-4 md:mt-8 md:space-y-6">
            {columns.map((c) => (
              <li key={c.href}>
                <Link href={c.href} className="block rounded-[16px] border-t-[3px] border-ai bg-white px-6 py-7 transition-shadow hover:shadow-lg md:px-8">
                  {c.photos && c.photos.length > 0 && (
                    <div className="mb-5 grid grid-cols-3 gap-2 md:gap-3">
                      {c.photos.slice(0, 3).map((ph) => (
                        <img
                          key={ph.src}
                          src={ph.src}
                          alt={ph.alt}
                          loading="lazy"
                          decoding="async"
                          className="aspect-square w-full rounded-[8px] bg-mist object-cover"
                        />
                      ))}
                    </div>
                  )}
                  <p className="flex items-center gap-3 text-[13px] text-steel">
                    {Date.now() < newUntil(c.published) && (
                      <span
                        data-new-until={newUntil(c.published)}
                        className="rounded-full bg-ai px-2.5 py-0.5 text-[11px] font-bold tracking-wider text-white"
                      >
                        NEW
                      </span>
                    )}
                    {c.date}
                  </p>
                  <h2 className="mt-2 text-[19px] leading-relaxed text-ink md:text-[22px]">{c.title}</h2>
                  <p className="mt-3 text-[15px] leading-[1.9] text-steel">{c.summary}</p>
                  <p className="mt-4 text-[14px] text-ai">続きを読む →</p>
                </Link>
              </li>
            ))}
          </ul>
          {/* 次の更新までに表示期間が過ぎたNEWは、ページを開いたときに外す */}
          <script
            dangerouslySetInnerHTML={{
              __html:
                "document.querySelectorAll('[data-new-until]').forEach(function(e){if(Date.now()>Number(e.getAttribute('data-new-until')))e.remove()})",
            }}
          />
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
