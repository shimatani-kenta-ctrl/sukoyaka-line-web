import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui";
import { EstimateForm } from "@/components/EstimateForm";
import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "簡単見積もり依頼（配管工事・機器据付）",
  description: `${site.name}への配管工事・機器据付工事のお見積り依頼。工事の内容・規模・時期をボタンで選ぶだけで、約1分でご依頼いただけます。お見積りは無料です。`,
  path: "/estimate/",
});

export default function EstimatePage() {
  return (
    <>
      <PageHero
        title="簡単見積もり依頼"
        lead="工事の内容・規模・時期をボタンで選ぶだけ。約1分で、見積もりのご依頼ができます。お見積りは無料です。"
        path="/estimate/"
      />
      <section className="py-16 md:py-24">
        <Container className="grid gap-14 lg:grid-cols-[1fr_300px] lg:gap-16">
          <div>
            <p className="mb-10 text-[15px] text-steel">
              わからない項目は「わからない」を選んでいただいて大丈夫です。内容を確認のうえ、担当者よりご連絡し、工事一式のお見積りをお出しします。
            </p>
            <EstimateForm />
          </div>

          <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            <div className="bg-ink px-6 py-8 text-white">
              <p className="text-[13px] text-sky">メールでのご連絡</p>
              <a href={`mailto:${site.company.email}`} className="mt-2 block break-all text-[16px] tracking-[0.04em] hover:text-sky">
                {site.company.email}
              </a>
              <p className="mt-4 text-[13px] text-white/70">図面や写真を添えてお送りいただくこともできます。</p>
            </div>
            <div className="space-y-3 text-[14px]">
              <p className="font-medium">ご依頼の前に</p>
              <Link href="/request/" className="block text-ai underline underline-offset-4">
                工事のご依頼について
              </Link>
              <Link href="/works/" className="block text-ai underline underline-offset-4">
                施工事例を見る
              </Link>
              <Link href="/contact/" className="block text-ai underline underline-offset-4">
                文章で相談する（お問い合わせフォーム）
              </Link>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
