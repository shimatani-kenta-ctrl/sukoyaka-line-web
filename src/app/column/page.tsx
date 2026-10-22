import type { Metadata } from "next";
import Link from "next/link";
import { Container, JsonLd } from "@/components/ui";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";

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

/** コラムの一覧（新しいものを上に）。published は「年-月-日」 */
const columns = [
  {
    href: "/column/shutdown-piping-work/",
    published: "2026-10-22",
    date: "2026年10月22日",
    title: "工場の休止期間に配管工事を終わらせるには｜段取りの流れとポイント",
    summary: "定期修理や長期休暇など、限られた休止期間のうちに配管の更新・改修を終わらせるための段取りを解説します。",
  },
  {
    href: "/column/construction-aging/",
    published: "2026-10-22",
    date: "2026年10月22日",
    title: "建設業の高齢化と人手不足｜データで見る現状と、若手が育つ現場づくり",
    summary: "国土交通省のデータで、建設業の働き手の減少と高齢化を整理し、健やかラインの取り組みを紹介します。",
  },
  {
    href: "/column/pipefitter-job/",
    published: "2026-10-22",
    date: "2026年10月22日",
    title: "配管工の仕事内容と年収｜未経験から一人前になるまで",
    summary: "配管工の仕事・年収・求人の多さを厚生労働省のデータで紹介し、未経験から一人前になるまでの目安を解説します。",
  },
  {
    href: "/column/direct-contract/",
    published: "2026-10-22",
    date: "2026年10月22日",
    title: "多重下請と直接依頼の違い｜配管工事を直接頼むメリット",
    summary: "国土交通省のデータをもとに、多重下請構造の仕組みと、施工する会社へ直接ご依頼いただくメリットを解説します。",
  },
];

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
