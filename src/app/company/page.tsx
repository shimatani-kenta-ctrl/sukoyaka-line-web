import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageHero } from "@/components/PageHero";
import { Container, SectionHeading } from "@/components/ui";
import { LogoFull } from "@/components/Logo";
import { GoogleMap, mapLinkUrl } from "@/components/GoogleMap";
import { CtaBand } from "@/components/CtaBand";
import { fullAddress, site, telHref } from "@/config/site";

export const metadata: Metadata = {
  title: "会社概要",
  description: `${site.name}の会社概要、代表挨拶、所在地・アクセスのご案内です。兵庫県尼崎市を拠点に、関西一円で配管工事・設備工事を行っています。`,
  alternates: { canonical: "/company/" },
};

export default function CompanyPage() {
  const c = site.company;
  const rows: { label: string; value: ReactNode }[] = [
    { label: "社名", value: site.name },
    { label: "代表者", value: `${c.representativeTitle}　${c.representative}` },
    {
      label: "所在地",
      value: (
        <>
          〒{c.postalCode}
          <br />
          {fullAddress}
        </>
      ),
    },
    {
      label: "電話番号",
      value: (
        <a href={telHref} className="text-ai underline-offset-4 hover:underline">
          {c.tel}
        </a>
      ),
    },
    {
      label: "メール",
      value: (
        <a href={`mailto:${c.email}`} className="break-all text-ai underline-offset-4 hover:underline">
          {c.email}
        </a>
      ),
    },
    ...(c.founded ? [{ label: "設立", value: c.founded }] : []),
    ...(c.capital ? [{ label: "資本金", value: c.capital }] : []),
    {
      label: "事業内容",
      value: (
        <ul className="space-y-1">
          {c.business.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      ),
    },
    ...(c.license ? [{ label: "許可", value: c.license }] : []),
    { label: "対応エリア", value: c.area },
  ];

  return (
    <>
      <PageHero
        title="会社概要"
        lead="尼崎を拠点に、工場・プラントの配管工事と機器据付を手がけています。"
        path="/company/"
      />

      {/* 代表挨拶 */}
      <section className="py-20 md:py-28">
        <Container className="grid gap-12 md:grid-cols-[1fr_1.6fr] md:gap-20">
          <div>
            <SectionHeading title="代表挨拶" />
            <div data-reveal="scale" className="mt-12 hidden md:block">
              <LogoFull className="h-auto w-44" />
            </div>
          </div>
          <div data-reveal-stagger="140" className="space-y-6 font-display text-[16px] leading-[2.2] tracking-[0.06em] md:text-[17px]">
            <p>
              配管は、工場や設備の中を流れる「血管」のようなものです。一本の配管がきちんと通っていることで、機械が動き、ものが生まれ、そこで働く人の毎日が守られています。
            </p>
            <p>
              健やかラインは、その流れを確かにつなぐことを仕事にしています。急なご依頼にも動ける機動力と、溶接一つひとつに妥協しない仕上がりで、「次もここに頼みたい」と言っていただける会社であり続けたいと考えています。
            </p>
            <p>
              また、若い職人が技術を身につけ、誇りを持って長く働ける場所をつくることも、私たちの大切な役目です。お客様の現場と、社員の成長。どちらにも誠実に向き合ってまいります。
            </p>
            <p className="pt-4 text-right">
              {site.name}
              <br />
              {c.representativeTitle}　<span className="text-xl">{c.representative}</span>
            </p>
          </div>
        </Container>
      </section>

      {/* 会社概要 */}
      <section className="bg-mist py-20 md:py-28">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <SectionHeading title="会社情報" />
            <LogoFull className="h-auto w-20 md:hidden" />
          </div>
          <dl data-reveal-stagger="60" className="mt-12 border-t border-ink/20 bg-white">
            {rows.map((r) => (
              <div
                key={r.label}
                className="grid gap-1 border-b border-line px-5 py-5 md:grid-cols-[200px_1fr] md:gap-8 md:px-8 md:py-6"
              >
                <dt className="text-[13px] font-medium text-steel md:text-[14px]">{r.label}</dt>
                <dd className="text-[15px]">{r.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* アクセス */}
      <section id="access" className="py-20 md:py-28">
        <Container>
          <SectionHeading title="アクセス" lead={`〒${c.postalCode} ${fullAddress}`} />
          <div data-reveal="wipe" className="mt-10">
            <GoogleMap className="aspect-[4/3] w-full md:aspect-[21/9]" />
          </div>
          <a
            href={mapLinkUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-[14px] text-ai underline underline-offset-4"
          >
            Googleマップで開く
          </a>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
