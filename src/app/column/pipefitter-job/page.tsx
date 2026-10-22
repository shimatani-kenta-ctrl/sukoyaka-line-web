import type { Metadata } from "next";
import { BarChart, Bullets, ColumnArticle, CtaButtons, H2, P, StatTiles, StepFlow } from "@/components/ColumnParts";
import { growthRoadmap } from "@/data/jobs";
import { pageMeta } from "@/lib/seo";

const path = "/column/pipefitter-job/";
const title = "配管工の仕事内容と年収｜未経験から一人前になるまで";
const description =
  "配管工はどんな仕事か、年収や求人の多さを厚生労働省の職業情報提供サイト（job tag）のデータで紹介。未経験から一人前になるまでの目安と、必要な資格も解説します。";
const JOBTAG = "https://shigoto.mhlw.go.jp/User/Occupation/Detail/47";

export const metadata: Metadata = pageMeta({ title, description, path });

export default function Page() {
  return (
    <ColumnArticle
      title={title}
      heroTitle="配管工の仕事内容と年収"
      lead="配管工はどんな仕事で、どれくらい求められているのか。国のデータと、未経験から一人前になるまでの道のりを紹介します。"
      path={path}
      published="2026-10-22"
      publishedLabel="2026年10月22日"
      description={description}
      sources={[{ label: "厚生労働省 職業情報提供サイト（job tag）「配管工」", url: JOBTAG }]}
      summary={
        <p>
          配管工は、建物や工場で水・空気・ガスなどを通す管をつなぐ仕事です。厚生労働省のデータでは、平均年収は
          <strong className="text-ai">523.1万円</strong>、ハローワークの有効求人倍率は<strong className="text-ai">11.03倍</strong>
          （求職者1人に対して約11件の求人）と、人が強く求められている職業です。未経験からでも、先輩と組んで基本を覚えながら、資格を取って一人前をめざせます。
        </p>
      }
    >
      <H2>配管工は、どんな仕事？</H2>
      <P>
        厚生労働省の職業情報提供サイト（job tag）では、配管工の仕事を「給水管、排水管、ガス管、冷暖房換気設備、消火設備、排水処理施設、空気清浄装置の配管工事をする」と紹介しています。
      </P>
      <P>
        健やかラインが手がけているのは、主に工場・プラントの配管です。蒸気・冷却水・エア・薬液などの配管を、現場の寸法に合わせて製作し、取り付けます。配管を支える架台の製作・据付や、TIG溶接・アーク溶接も行います。
      </P>

      <H2>データで見る、配管工という仕事</H2>
      <StatTiles
        note="出典：厚生労働省 job tag「配管工」（年収・労働時間・年齢：令和7年賃金構造基本統計調査、有効求人倍率：令和7年度ハローワーク求人統計、就業者数：令和2年国勢調査）"
        items={[
          { label: "平均年収", value: "523.1万円" },
          { label: "有効求人倍率", value: "11.03倍" },
          { label: "平均年齢", value: "42.9歳" },
          { label: "就業者数", value: "約22万人", sub: "220,720人" },
        ]}
      />
      <BarChart
        caption="求職者1人あたりの求人の数（有効求人倍率）"
        note="厚生労働省 job tag「配管工」（令和7年度 ハローワーク求人統計）より"
        unit="倍"
        rows={[
          { label: "配管工", value: 11.03, highlight: true },
          { label: "基準（1倍）", value: 1 },
        ]}
        legend="1倍を超えるほど、働き手が足りていない（求人が多い）ことを表します"
      />
      <P>
        有効求人倍率が1倍を超えると、仕事を探している人より求人のほうが多い状態です。配管工は11倍を超えており、技術を身につけた人が長く求められる仕事だといえます。
      </P>

      <H2>未経験から、一人前になるまで（健やかラインの場合）</H2>
      <P>
        健やかラインでは、入社したばかりのうちは先輩と組んで、道具や材料の準備から始めます。次のような流れで、3年を目安に一人前の職人をめざします。
      </P>
      <StepFlow
        steps={growthRoadmap.map((g) => ({ title: g.title, mark: g.period, body: g.items.join("、") }))}
      />
      <P>資格の取得にかかる費用は会社が負担し、作業着・ヘルメット・工具もすべて支給しています。</P>

      <H2>配管工に関係する主な資格</H2>
      <P>job tag では、配管工に関連する資格として次のようなものが挙げられています。</P>
      <Bullets
        items={[
          "配管技能士（1級・2級・3級）",
          "管工事施工管理技士（1級・2級、同補を含む）",
          "給水装置工事主任技術者",
          "ガス溶接技能者",
          "消防設備士（甲種・乙種）",
        ]}
      />
      <P>
        必要な資格は、扱う設備や仕事の内容によって変わります。健やかラインでは、1年目を目安に溶接の資格取得をめざします。
      </P>

      <CtaButtons primary={{ href: "/recruit/", label: "採用情報を見る" }} secondary={{ href: "/contact/?type=recruit", label: "応募・質問する" }} />
    </ColumnArticle>
  );
}
