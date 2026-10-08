import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui";
import { WorksList } from "@/components/WorksList";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "施工事例",
  description: `${site.name}の施工事例です。プラント配管、設備配管、機器据付・周辺配管、ステンレス配管のTIG溶接など、兵庫・大阪を中心とした工事実績をご紹介します。`,
  alternates: { canonical: "/works/" },
};

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
