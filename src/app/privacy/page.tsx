import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui";
import { fullAddress, site } from "@/config/site";

export const metadata: Metadata = {
  title: "個人情報の取り扱い",
  description: `${site.name}における個人情報の取り扱いについて。`,
  alternates: { canonical: "/privacy/" },
};

const sections = [
  {
    title: "個人情報の利用目的",
    body: "お問い合わせフォーム等でお預かりした個人情報は、お問い合わせへの回答、お見積り・工事に関するご連絡、採用選考に関するご連絡のために利用します。",
  },
  {
    title: "第三者への提供",
    body: "法令に基づく場合を除き、ご本人の同意なく第三者に個人情報を提供することはありません。",
  },
  {
    title: "安全管理",
    body: "お預かりした個人情報は、漏えい・紛失・改ざん等を防ぐため、適切に管理します。",
  },
  {
    title: "開示・訂正・削除",
    body: "ご本人から個人情報の開示・訂正・削除のご依頼があった場合は、ご本人であることを確認のうえ、速やかに対応します。",
  },
  {
    title: "外部サービスの利用",
    body: "当サイトでは、地図表示のためにGoogleマップを、投稿の表示のためにInstagramの埋め込み機能を利用しています。これらのサービスにより、Cookie等の情報が各社に送信される場合があります。",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="個人情報の取り扱い" lead="お預かりする個人情報の取り扱いについてご説明します。" path="/privacy/" />
      <section className="py-16 md:py-24">
        <Container className="max-w-3xl">
          <p className="text-[15px]">
            {site.name}（以下「当社」）は、お客様の個人情報を適切に取り扱うことを社会的責務と考え、以下のとおり取り扱います。
          </p>
          <div className="mt-10 space-y-10">
            {sections.map((s) => (
              <section key={s.title}>
                <h2 className="text-lg">{s.title}</h2>
                <p className="mt-3 text-[15px] text-steel">{s.body}</p>
              </section>
            ))}
            <section>
              <h2 className="text-lg">お問い合わせ窓口</h2>
              <p className="mt-3 text-[15px] text-steel">
                {site.name}
                <br />〒{site.company.postalCode} {fullAddress}
                <br />
                TEL {site.company.tel}
                <br />
                Mail {site.company.email}
              </p>
            </section>
          </div>
        </Container>
      </section>
    </>
  );
}
