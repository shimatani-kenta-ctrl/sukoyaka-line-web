import type { Metadata } from "next";
import Link from "next/link";
import { BarChart, Bullets, ColumnArticle, CtaButtons, H2, P, StatTiles } from "@/components/ColumnParts";
import { pageMeta } from "@/lib/seo";

const path = "/column/tig-arc-welding/";
const title = "TIG溶接とアーク溶接の違い｜配管での使われ方と、溶接工になるには";
const description =
  "TIG溶接と被覆アーク溶接（手棒）の違いを、厚生労働省の職場のあんぜんサイトや公共職業訓練の資料をもとに比較表で解説。配管工事での使われ方、必要な特別教育・資格、溶接工の求人データも紹介します。";

const ANZEN_ARC = "https://anzeninfo.mhlw.go.jp/yougo/yougo81_1.html";
const ANZEN_EDU = "https://anzeninfo.mhlw.go.jp/yougo/yougo50_1.html";
const JEED = "https://www3.jeed.go.jp/kyoto/poly/kyushoku/2021/course_yosetsu_r3.html";
const JOBTAG_WELDER = "https://shigoto.mhlw.go.jp/User/Occupation/Detail/255";
const JOBTAG_PIPE = "https://shigoto.mhlw.go.jp/User/Occupation/Detail/47";

export const metadata: Metadata = pageMeta({ title, description, path });

/** 比較表（内容はすべて、ポリテクセンター京都〔JEED〕の訓練コース案内の記載にもとづく） */
const compare: [string, string, string][] = [
  ["別の呼び方", "アルゴン溶接", "アーク溶接・手棒（てぼう）溶接"],
  ["操作のしかた", "アークの熱で材料を溶かしながら、もう一方の手で溶加棒を足す（両手を同時に使う）", "作業者がすべて手で操作する"],
  ["得意なこと", "使える材料の種類が最も広く、薄板に向く。品質が高い", "使える材料の種類が広く、風の影響を受けにくい。持ち運びやすい"],
  ["主な用途の例", "配管類、機器のカバー、医療機器、真空チャンバーなど", "建築現場、プラント、船舶、車両など（屋内外を問わない）"],
  ["難しさ（訓練校の目安）", "★★★★★", "★★★★"],
  ["関係する資格の例", "JIS TIG溶接技能者（基本級など）", "アーク溶接等の業務に係る特別教育、JIS被覆アーク溶接技能者"],
];

/** 「アーク溶接」の仲間（職場のあんぜんサイト「アーク溶接」の分類より） */
function ArcFamily() {
  const kinds = [
    { name: "被覆アーク溶接", note: "一般に「アーク溶接」「手棒」と呼ばれるもの", strong: true },
    { name: "ガスシールドアーク溶接", note: "ティグ（TIG）・ミグ・マグ溶接", strong: true },
    { name: "その他", note: "サブマージアーク溶接、セルフシールドアーク溶接、エレクトロガスアーク溶接など", strong: false },
  ];
  return (
    <figure data-reveal className="mt-8 rounded-[16px] bg-white px-5 py-7 md:px-8">
      <figcaption className="text-[15px] font-bold text-ink md:text-base">「アーク溶接」の主な種類</figcaption>
      <p className="mt-1 text-[13px] text-steel">厚生労働省 職場のあんぜんサイト「アーク溶接」より</p>
      <div className="mt-6 rounded-sm bg-gradient-to-r from-pipe to-ai px-4 py-3 text-center text-[15px] font-bold text-white">
        アーク溶接（アーク放電の熱で金属をつなぐ）
      </div>
      <p aria-hidden="true" className="py-1 text-center text-[12px] text-steel/70">
        ↓
      </p>
      <ul className="grid gap-2 md:grid-cols-3">
        {kinds.map((k) => (
          <li key={k.name} className={`rounded-[10px] px-4 py-3 ${k.strong ? "border-2 border-pipe bg-mist" : "border border-line bg-porcelain"}`}>
            <p className={`text-[15px] font-bold ${k.strong ? "text-ai" : "text-steel"}`}>{k.name}</p>
            <p className="mt-1 text-[13px] leading-relaxed text-steel">{k.note}</p>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[13px] leading-relaxed text-steel">
        よく比べられる「TIG溶接」と「アーク溶接」は、正確には<strong className="text-ink">ガスシールドアーク溶接の一つ（TIG）</strong>と
        <strong className="text-ink">被覆アーク溶接</strong>の比較です。
      </p>
    </figure>
  );
}

function CompareTable() {
  return (
    <>
      {/* スマホ：項目ごとのカード */}
      <ul data-reveal-stagger="90" className="mt-8 space-y-4 md:hidden">
        {compare.map(([k, a, b]) => (
          <li key={k} className="rounded-[12px] bg-white p-5">
            <p className="text-[15px] font-bold text-ink">{k}</p>
            <p className="mt-3 text-[12px] font-bold text-ai">TIG溶接</p>
            <p className="mt-1 rounded-sm bg-mist px-3 py-2 text-[14px] leading-relaxed text-ink">{a}</p>
            <p className="mt-3 text-[12px] font-bold text-steel">被覆アーク溶接</p>
            <p className="mt-1 rounded-sm bg-porcelain px-3 py-2 text-[14px] leading-relaxed text-ink">{b}</p>
          </li>
        ))}
      </ul>
      {/* PC：表 */}
      <div data-reveal className="mt-8 hidden md:block">
        <table className="w-full border-collapse text-left text-[14px] leading-relaxed">
          <thead>
            <tr>
              <th className="w-[20%] border-b-2 border-line py-3 pr-3 font-medium text-steel" />
              <th className="border-b-2 border-pipe bg-mist px-3 py-3 font-bold text-ai">TIG溶接</th>
              <th className="border-b-2 border-line px-3 py-3 font-bold text-steel">被覆アーク溶接</th>
            </tr>
          </thead>
          <tbody>
            {compare.map(([k, a, b]) => (
              <tr key={k}>
                <th className="border-b border-line py-3 pr-3 font-bold text-ink">{k}</th>
                <td className="border-b border-line bg-mist px-3 py-3 text-ink">{a}</td>
                <td className="border-b border-line px-3 py-3 text-ink">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-[13px] leading-relaxed text-steel">
        ※ 出典：ポリテクセンター京都（独立行政法人 高齢・障害・求職者雇用支援機構）の溶接の訓練コース案内。同じ資料では、ワイヤが自動で送られる「炭酸ガス（半自動）溶接」が、アーク溶接の中で最も多く使われているとされています。
      </p>
    </>
  );
}

export default function Page() {
  return (
    <ColumnArticle
      title={title}
      heroTitle="TIG溶接とアーク溶接の違い"
      lead="よく比べられる2つの溶接は、何が違って、配管の現場ではどう使われるのか。公的な資料をもとに整理し、溶接工をめざす方に必要なことも紹介します。"
      path={path}
      published="2026-10-29"
      publishedLabel="2026年10月29日"
      description={description}
      sources={[
        { label: "厚生労働省 職場のあんぜんサイト 安全衛生キーワード「アーク溶接」", url: ANZEN_ARC },
        { label: "厚生労働省 職場のあんぜんサイト 安全衛生キーワード「特別教育」", url: ANZEN_EDU },
        { label: "ポリテクセンター京都（独立行政法人 高齢・障害・求職者雇用支援機構）「溶接施工技術科のご案内」", url: JEED },
        { label: "厚生労働省 職業情報提供サイト（job tag）「溶接工」", url: JOBTAG_WELDER },
        { label: "厚生労働省 職業情報提供サイト（job tag）「配管工」", url: JOBTAG_PIPE },
      ]}
      summary={
        <p>
          TIG溶接も、じつは<strong className="text-ai">アーク溶接の一種</strong>です。ふだん「アーク溶接」と呼ばれるのは、溶接棒を使う被覆アーク溶接（手棒）のこと。TIG溶接は両手を同時に使い、薄板や幅広い材料に向き、品質の高い溶接ができます。被覆アーク溶接は風の影響を受けにくく持ち運びやすいため、プラントや屋外でも広く使われます。どちらも、アーク溶接の業務には法律で定められた特別教育が必要です。
        </p>
      }
    >
      <H2>そもそも、TIG溶接も「アーク溶接」の仲間</H2>
      <P>
        厚生労働省の職場のあんぜんサイトでは、アーク溶接を「空気（気体）中の放電現象（アーク放電）を利用し、同じ金属同士をつなぎ合わせる溶接法」と説明しています。そのうえで、アーク溶接の種類として、被覆アーク溶接や、ティグ・ミグ・マグ溶接などのガスシールドアーク溶接を挙げています。
      </P>
      <ArcFamily />

      <H2>TIG溶接と被覆アーク溶接の違い（比較表）</H2>
      <P>
        公共職業訓練（ポリテクセンター）の溶接コースの案内をもとに、2つの溶接を比べると次のとおりです。いちばんの違いは、TIG溶接が両手を使って細かく仕上げる溶接であるのに対し、被覆アーク溶接は風に強く、持ち運びやすい点です。
      </P>
      <CompareTable />

      <H2>配管の現場では、どう使われる？</H2>
      <P>
        同じ資料では、TIG溶接の用途の例に「配管類」が、被覆アーク溶接の用途の例に「プラント」が挙がっています。どちらを使うかは、材料の種類や板の厚さ、屋内か屋外か（風の影響）、求められる仕上がりなどによって変わります。
      </P>
      <P>
        健やかラインでは、ステンレス・鋼管のTIG溶接と、アーク溶接の両方を行っています。溶接の前には、熱による歪みを抑えるために、仮付けを細かく増やす、治具で固定する、あらかじめ逆方向へ少し曲げたり傾けたりして固定する、といった段取りをしてから溶接します。
      </P>
      <figure data-reveal className="mt-8 overflow-hidden rounded-[16px] bg-white">
        <img
          src="/photos/tig-socket-weld.jpg"
          alt="配管にねじ込みソケットをTIG溶接した溶接部"
          loading="lazy"
          decoding="async"
          className="aspect-[4/3] w-full object-cover"
        />
        <figcaption className="px-5 py-3 text-[13px] text-steel">配管にねじ込みソケットをTIG溶接したところ（健やかラインの現場）</figcaption>
      </figure>

      <H2>溶接の仕事に必要なこと（資格と安全）</H2>
      <P>
        溶接工になるのに、特別な学歴は必要ありません。厚生労働省の job tag でも、工業系の高校を出てから入る人や、公共職業訓練で技能を身につけてから入る人が多いと紹介されています。ただし、次のようなルールや資格があります。
      </P>
      <Bullets
        items={[
          "アーク溶接の業務につくには、労働安全衛生法にもとづく「特別教育」を受ける必要があります（事業者が行う安全・衛生のための教育）",
          "腕前を証明する資格として、JIS の溶接技能者（TIG溶接・被覆アーク溶接・半自動溶接など、方法ごとに分かれる）があります",
          "アーク溶接で出る溶接ヒューム（細かな金属の粉じん）は特定化学物質に指定されており、法令にもとづく対策が求められています",
        ]}
      />

      <H2>データで見る、溶接工という仕事</H2>
      <StatTiles
        note="出典：厚生労働省 job tag「溶接工」（年収・年齢：令和7年賃金構造基本統計調査、有効求人倍率：令和7年度ハローワーク求人統計、就業者数：令和2年国勢調査）"
        items={[
          { label: "平均年収", value: "454.7万円" },
          { label: "有効求人倍率", value: "2.67倍" },
          { label: "平均年齢", value: "41.8歳" },
          { label: "就業者数", value: "約16万人", sub: "163,710人" },
        ]}
      />
      <BarChart
        caption="求職者1人あたりの求人の数（有効求人倍率）"
        note="厚生労働省 job tag「溶接工」「配管工」（令和7年度 ハローワーク求人統計）より"
        unit="倍"
        rows={[
          { label: "配管工", value: 11.03, highlight: true },
          { label: "溶接工", value: 2.67, highlight: true },
          { label: "基準（1倍）", value: 1 },
        ]}
        legend="1倍を超えるほど、働き手が足りていない（求人が多い）ことを表します"
      />
      <P>
        溶接工・配管工のどちらも、仕事を探している人より求人のほうが多い状態です。配管の現場では、配管を組む技術と溶接の技術の両方が使われます。
      </P>

      <H2>健やかラインで、溶接を身につけるには</H2>
      <P>
        健やかラインの仕事は、工場・プラントの配管施工と溶接（TIG溶接・アーク溶接）です。溶接が未経験の方も、入社したばかりのうちは先輩と組んで現場の基本を覚え、1年目を目安に溶接の資格取得をめざします。資格の取得にかかる費用は会社が負担し、作業着・ヘルメット・工具もすべて支給しています。
      </P>
      <p className="mt-4 text-[15px]">
        <Link href="/column/pipefitter-job/" className="text-ai underline underline-offset-4">
          配管工の仕事内容と、一人前になるまでの流れを読む
        </Link>
      </p>

      <CtaButtons primary={{ href: "/recruit/", label: "溶接工・配管工の採用情報" }} secondary={{ href: "/contact/", label: "溶接工事を相談する" }} />
      <p className="mt-4 text-[14px]">
        <Link href="/works/" className="text-ai underline underline-offset-4">
          施工事例を見る
        </Link>
      </p>
    </ColumnArticle>
  );
}
