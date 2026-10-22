import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "コラム",
  description: `${site.name}のコラム。配管工事のご依頼や、建設業の仕組みについて、現場を知る会社の目線で解説します。`,
  path: "/column/",
});

/** コラムの一覧（新しいものを上に） */
const columns = [
  {
    href: "/column/shutdown-piping-work/",
    date: "2026年10月22日",
    title: "工場の休止期間に配管工事を終わらせるには｜段取りの流れとポイント",
    summary: "定期修理や長期休暇など、限られた休止期間のうちに配管の更新・改修を終わらせるための段取りを解説します。",
  },
  {
    href: "/column/construction-aging/",
    date: "2026年10月22日",
    title: "建設業の高齢化と人手不足｜データで見る現状と、若手が育つ現場づくり",
    summary: "国土交通省のデータで、建設業の働き手の減少と高齢化を整理し、健やかラインの取り組みを紹介します。",
  },
  {
    href: "/column/pipefitter-job/",
    date: "2026年10月22日",
    title: "配管工の仕事内容と年収｜未経験から一人前になるまで",
    summary: "配管工の仕事・年収・求人の多さを厚生労働省のデータで紹介し、未経験から一人前になるまでの目安を解説します。",
  },
  {
    href: "/column/direct-contract/",
    date: "2026年10月22日",
    title: "多重下請と直接依頼の違い｜配管工事を直接頼むメリット",
    summary: "国土交通省のデータをもとに、多重下請構造の仕組みと、施工する会社へ直接ご依頼いただくメリットを解説します。",
  },
];

export default function ColumnIndex() {
  return (
    <>
      <PageHero title="コラム" lead="配管工事のご依頼や、建設業の仕組みについて、現場を知る会社の目線で解説します。" path="/column/" />
      <section className="py-16 md:py-24">
        <Container className="max-w-3xl">
          <ul className="space-y-6">
            {columns.map((c) => (
              <li key={c.href} data-reveal>
                <Link href={c.href} className="block rounded-[16px] border-t-[3px] border-ai bg-white px-6 py-7 transition-shadow hover:shadow-lg md:px-8">
                  <p className="text-[13px] text-steel">{c.date}</p>
                  <h2 className="mt-2 text-[19px] leading-relaxed text-ink md:text-[22px]">{c.title}</h2>
                  <p className="mt-3 text-[15px] leading-[1.9] text-steel">{c.summary}</p>
                  <p className="mt-4 text-[14px] text-ai">続きを読む →</p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
