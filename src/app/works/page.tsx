import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui";
import { WorksList } from "@/components/WorksList";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/config/site";
import { works } from "@/data/works";
import { pageMeta } from "@/lib/seo";

/**
 * 題名と説明文は、掲載中の施工事例（works.ts）から作る。
 * 載っていない工事・地域を書かないため（事例を追加・公開すると自動で反映される）。
 */
const unique = (xs: string[]) => Array.from(new Set(xs));
const prefectures = unique(works.map((w) => w.location.match(/^.{2,3}?[都道府県]/)?.[0] ?? "").filter(Boolean));
const categories = unique(works.map((w) => w.category));

export const metadata: Metadata = pageMeta({
  title: `施工事例（${prefectures.join("・")}の${categories.join("・")}）`,
  description: `兵庫県尼崎市の配管工事会社、${site.name}の施工事例です。${works
    .map((w) => `「${w.title}」`)
    .join("")}など、実際の工事を写真と工夫した点でご紹介します。`,
  path: "/works/",
});

export default function WorksPage() {
  return (
    <>
      <PageHero
        title="施工事例"
        lead="工場・プラントを中心に、これまで手がけた工事の一部をご紹介します。"
        path="/works/"
      />
      <section className="py-16 md:py-24">
        <Container>
          <WorksList />
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
