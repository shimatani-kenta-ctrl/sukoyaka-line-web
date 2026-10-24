import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { ButtonLink, Container, JsonLd } from "@/components/ui";
import { CtaBand } from "@/components/CtaBand";
import { StructureDiagram, TierChart } from "@/components/TierChart";
import { RelatedColumns } from "@/components/ColumnParts";
import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";

const path = "/column/direct-contract/";
const title = "多重下請と直接依頼の違い｜配管工事を直接頼むメリット";
const description =
  "建設業の多重下請構造とは何か、国土交通省の調査データとあわせて解説。配管工事を施工する会社へ直接ご依頼いただくと、要望が伝わりやすく、責任の所在がはっきりし、費用が工事そのものに使われやすくなります。";
const published = "2026-10-22";

export const metadata: Metadata = pageMeta({ title, description, path });

const SOURCE_URL = "https://www.mlit.go.jp/common/001236203.pdf";

const merits = [
  {
    no: "01",
    title: "要望が、施工する職人にそのまま届く",
    body: "打合せをした会社が、そのまま製作から施工まで担当します。間に会社が入らないので、「ここに支持を取らないでほしい」「この期間内に終わらせたい」といったご要望が、言い換えられずに現場へ届きます。",
  },
  {
    no: "02",
    title: "責任の所在が、はっきりする",
    body: "窓口と施工する会社が同じなので、仕上がりや工程について「誰に聞けばよいか」で迷いません。国土交通省も、重層化すると役割や責任の所在があいまいになりやすいことを課題に挙げています。",
  },
  {
    no: "03",
    title: "費用が、工事そのものに使われやすい",
    body: "間に入る会社が増えるほど、その会社の利益になる分も増えると国土交通省は指摘しています。直接のご依頼なら、お支払いいただく費用が、材料や職人の手間など工事そのものに充てられやすくなります。",
  },
  {
    no: "04",
    title: "急ぎの相談にも、すぐ動ける",
    body: "現場の状況を、施工する会社が直接うかがえるので、段取りまでの時間を短くできます。設備トラブルや工程の前倒しなど、急ぎのご相談にも動きやすくなります。",
  },
];

const compare = [
  ["要望の伝わり方", "会社を経由するうちに、言い換えられたり遅れたりしやすい", "施工する会社に、そのまま届く"],
  ["責任の所在", "どの会社が何に責任を持つか、わかりにくくなりやすい", "窓口と施工が同じ会社で、はっきりしている"],
  ["費用の行き先", "間に入る会社の利益になる分が増えやすい", "工事そのもの（材料・職人の手間）に充てられやすい"],
  ["急ぎの相談", "連絡が何社も経由するため、時間がかかりやすい", "施工する会社が直接うかがい、すぐ段取りできる"],
];

export default function DirectContractColumn() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: published,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: `${site.url}/logo.png` } },
    mainEntityOfPage: `${site.url}${path}`,
  };

  return (
    <>
      <PageHero
        title="多重下請と直接依頼の違い"
        lead="配管工事を、施工する会社へ直接頼むと何が変わるのか。国土交通省のデータとあわせて解説します。"
        path={path}
        parent={{ title: "コラム", path: "/column/" }}
      />
      <JsonLd data={article} />

      <article className="py-16 md:py-24">
        <Container className="max-w-3xl">
          <p className="text-[13px] text-steel">
            <time dateTime={published}>2026年10月22日</time>　｜　{site.name}
          </p>

          {/* 結論を先に */}
          <section data-reveal className="mt-8 rounded-[16px] border-l-[4px] border-pipe bg-white px-6 py-7 md:px-8">
            <p className="text-[13px] font-bold tracking-[0.15em] text-ai">この記事のまとめ</p>
            <p className="mt-3 text-[16px] leading-[2] text-ink md:text-[17px]">
              建設業では、元請から1次・2次・3次…と下請が何段にも重なる「多重下請構造」が一般的です。国土交通省の調査では、3次以上の下請が入る現場が約半数（52.3%）ありました。施工する会社へ直接ご依頼いただくと、
              <strong className="text-ai">要望が伝わりやすく、責任の所在がはっきりし、費用が工事そのものに使われやすく</strong>
              なります。
            </p>
          </section>

          <section className="mt-16">
            <h2 className="reveal-blur text-2xl text-ink md:text-[30px]" data-reveal>
              多重下請構造とは
            </h2>
            <p className="mt-6 text-[15px] leading-[2.1] text-steel md:text-base">
              工事を発注者から請け負った元請会社が、工事の一部を1次下請に任せ、1次下請がさらに2次下請へ…と、何段にも下請が重なる仕組みのことです。実際に現場で施工するのは、いちばん下の段の会社というケースも少なくありません。
            </p>
            <div className="mt-8">
              <StructureDiagram />
            </div>
          </section>

          <section className="mt-16">
            <h2 className="reveal-blur text-2xl text-ink md:text-[30px]" data-reveal>
              データで見る：約半数の現場で、3次以上の下請が入っている
            </h2>
            <p className="mt-6 text-[15px] leading-[2.1] text-steel md:text-base">
              国土交通省が平成28年度に行った調査では、調べた108現場のうち、いちばん深い下請が3次以上だった現場が合計52.3%ありました。5次まで重なっていた現場もあります。
            </p>
            <div className="mt-8 rounded-[16px] bg-white px-5 py-7 md:px-8">
              <TierChart />
            </div>
            <p className="mt-6 text-[15px] leading-[2.1] text-steel md:text-base">
              同じ資料で国土交通省は、重層化による課題として、次のような点を挙げています。
            </p>
            <ul className="mt-4 space-y-2 text-[15px] leading-[1.9] text-steel md:text-base">
              {[
                "役割や責任の所在が不明確になりやすい",
                "連絡調整や情報共有に支障が生じやすく、下位の下請から意見や提案が届きにくい",
                "間に入る企業が増えるほど、その企業の利益分が増え、下位の下請の施工対価や労務費にしわ寄せが及ぶおそれがある",
                "直近の現場で技能者の賃金を引き上げた企業は、元請〜2次下請で約4〜5割、3次以下の下請では約3〜4割にとどまる",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[11px] h-[6px] w-[6px] shrink-0 bg-sky" />
                  {t}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-16">
            <h2 className="reveal-blur text-2xl text-ink md:text-[30px]" data-reveal>
              直接ご依頼いただく、4つのメリット
            </h2>
            <ol className="mt-8 space-y-10">
              {merits.map((m) => (
                <li key={m.no} data-reveal className="grid gap-3 md:grid-cols-[80px_1fr] md:gap-6">
                  <p className="font-display text-[40px] font-light leading-none text-pipe">{m.no}</p>
                  <div>
                    <h3 className="text-[19px] leading-relaxed text-ink md:text-[21px]">{m.title}</h3>
                    <p className="mt-3 text-[15px] leading-[2.1] text-steel md:text-base">{m.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-16">
            <h2 className="reveal-blur text-2xl text-ink md:text-[30px]" data-reveal>
              比べてみると
            </h2>
            {/* スマホ：項目ごとのカード */}
            <ul data-reveal-stagger="90" className="mt-8 space-y-4 md:hidden">
              {compare.map(([k, a, b]) => (
                <li key={k} className="rounded-[12px] bg-white p-5">
                  <p className="text-[15px] font-bold text-ink">{k}</p>
                  <p className="mt-3 text-[12px] font-bold text-steel">多重下請の場合</p>
                  <p className="mt-1 text-[14px] leading-relaxed text-steel">{a}</p>
                  <p className="mt-3 text-[12px] font-bold text-ai">直接ご依頼の場合</p>
                  <p className="mt-1 rounded-sm bg-mist px-3 py-2 text-[14px] font-medium leading-relaxed text-ink">{b}</p>
                </li>
              ))}
            </ul>
            {/* PC：表 */}
            <div data-reveal className="mt-8 hidden md:block">
              <table className="w-full border-collapse text-left text-[14px] leading-relaxed">
                <thead>
                  <tr>
                    <th className="w-[22%] border-b-2 border-line py-3 pr-3 font-medium text-steel" />
                    <th className="border-b-2 border-line px-3 py-3 font-bold text-steel">多重下請の場合</th>
                    <th className="border-b-2 border-pipe bg-mist px-3 py-3 font-bold text-ai">直接ご依頼の場合</th>
                  </tr>
                </thead>
                <tbody>
                  {compare.map(([k, a, b]) => (
                    <tr key={k}>
                      <th className="border-b border-line py-3 pr-3 font-bold text-ink">{k}</th>
                      <td className="border-b border-line px-3 py-3 text-steel">{a}</td>
                      <td className="border-b border-line bg-mist px-3 py-3 font-medium text-ink">{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-[13px] leading-relaxed text-steel">
              ※ 下請が入ること自体が悪いわけではありません。工事の規模や工種によっては、元請会社がまとめて管理するほうが適している場合もあります。
            </p>
          </section>

          <section className="mt-16">
            <h2 className="reveal-blur text-2xl text-ink md:text-[30px]" data-reveal>
              健やかラインの考え方
            </h2>
            <blockquote data-reveal className="mt-8 border-l-[3px] border-sky pl-6 text-[16px] leading-[2.1] text-ink md:text-[17px]">
              建設業特有の多重下請構造は、お客様にとっても、現場で働く人にとっても、デメリットの多い仕組みだと感じています。だからこそ私たちは、お客様から直接お受けする仕事を増やし、若手でもすぐに挑戦できる環境づくりに取り組んでいます。
              <footer className="mt-4 text-[14px] text-steel">
                {site.company.representativeTitle}　{site.company.representative}
              </footer>
            </blockquote>
            <p className="mt-8 text-[15px] leading-[2.1] text-steel md:text-base">
              健やかラインは、配管工事・配管製作から、架台の製作及び据付、溶接工事まで、一社で一貫して対応しています。打合せから施工まで同じ会社が担当するので、ご要望をそのまま形にできます。もちろん、機器メーカー様や工事会社様の協力会社としてのお仕事も、同じ基準で責任をもってお受けしています。
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact/">工事を直接相談する</ButtonLink>
              <ButtonLink href="/works/" variant="outline">
                施工事例を見る
              </ButtonLink>
            </div>
          </section>

          <RelatedColumns path={path} />

          <section className="mt-16 border-t border-line pt-8 text-[13px] leading-relaxed text-steel">
            <h2 className="text-[14px] font-bold text-ink">出典</h2>
            <p className="mt-2">
              国土交通省「重層下請構造の改善に向けた取組について」（中央建設業審議会・社会資本整備審議会産業分科会建設部会 基本問題小委員会「中間とりまとめ」〔平成28年6月〕抄、重層下請構造発生要因分析調査〔平成28年度〕ほか）
              <br />
              <a href={SOURCE_URL} target="_blank" rel="noopener noreferrer" className="break-all text-ai underline underline-offset-4">
                {SOURCE_URL}
              </a>
            </p>
            <p className="mt-4">
              <Link href="/column/" className="text-ai underline underline-offset-4">
                コラム一覧へ戻る
              </Link>
            </p>
          </section>
        </Container>
      </article>
      <CtaBand />
    </>
  );
}
