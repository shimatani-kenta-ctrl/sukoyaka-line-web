import type { Metadata } from "next";
import { BarChart, Bullets, ColumnArticle, CtaButtons, H2, P, ShareBar } from "@/components/ColumnParts";
import { ceoMessage } from "@/data/jobs";
import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";

const path = "/column/construction-aging/";
const title = "建設業の高齢化と人手不足｜データで見る現状と、若手が育つ現場づくり";
const description =
  "建設業の就業者はピーク時の685万人から483万人に減り、55歳以上が36.6％、29歳以下は11.6％。国土交通省のデータで現状を整理し、技術をつなぐために健やかラインが取り組んでいることを紹介します。";
const MLIT = "https://www.mlit.go.jp/totikensangyo/const/content/001855436.pdf";

export const metadata: Metadata = pageMeta({ title, description, path });

export default function Page() {
  return (
    <ColumnArticle
      title={title}
      heroTitle="建設業の高齢化と人手不足"
      lead="建設業の働き手は、どれくらい減り、どれくらい高齢化しているのか。国土交通省のデータで見ていきます。"
      path={path}
      published="2026-10-22"
      publishedLabel="2026年10月22日"
      description={description}
      sources={[{ label: "国土交通省 不動産・建設経済局建設業課「改正建設業法について」（令和6年12月、総務省「労働力調査」をもとに国土交通省が作成）", url: MLIT }]}
      summary={
        <p>
          建設業で働く人は、ピークだった平成9年の685万人から、令和5年には<strong className="text-ai">483万人</strong>
          に減りました。年齢で見ると<strong className="text-ai">55歳以上が36.6％</strong>、29歳以下は11.6％で、国土交通省は「次世代への技術承継が大きな課題」としています。若い職人が育つ会社かどうかは、これから工事を頼む会社を選ぶうえでも大切な見方になります。
        </p>
      }
    >
      <H2>働く人は、ピークから約200万人減った</H2>
      <P>国土交通省の資料によると、建設業の就業者数は次のように推移しています。</P>
      <BarChart
        caption="建設業の就業者数"
        note="国土交通省「改正建設業法について」（令和6年12月、総務省「労働力調査」より）"
        unit="万人"
        rows={[
          { label: "平成9年", value: 685 },
          { label: "平成22年", value: 504 },
          { label: "令和5年", value: 483, highlight: true },
        ]}
        legend="令和5年は483万人。ピークの平成9年から202万人減りました"
      />
      <P>このうち、現場で実際に施工する技能者は、平成9年の455万人から令和5年には304万人に減っています。</P>

      <H2>3人に1人以上が55歳以上</H2>
      <ShareBar
        caption="建設業の就業者の年齢構成（令和5年）"
        note="国土交通省「改正建設業法について」より。30〜54歳は、100％から55歳以上と29歳以下を引いた値"
        parts={[
          { label: "29歳以下", value: 11.6, tone: "light" },
          { label: "30〜54歳", value: 51.8, tone: "mid" },
          { label: "55歳以上", value: 36.6, tone: "deep" },
        ]}
      />
      <P>
        55歳以上が36.6％を占める一方で、29歳以下は11.6％にとどまります。ベテランの職人が引退していくなかで、若い世代に技術をどうつないでいくかが、業界全体の課題になっています。
      </P>

      <H2>工事を頼む側にとっての意味</H2>
      <P>働き手が減り、高齢化が進むと、次のようなことが起こりやすくなります。</P>
      <Bullets
        items={[
          "急ぎの工事や、休止期間に合わせた短い工期の工事で、人手が確保しにくくなる",
          "長く付き合っていた業者が、職人の引退で工事を受けられなくなる",
          "設備の更新や改修を、同じ考え方で続けて任せられる相手が見つかりにくくなる",
        ]}
      />
      <P>これからの協力会社選びでは、技術があることに加えて、若い職人が育っているかどうかも、長くお付き合いするうえでの大切な見方になります。</P>

      <H2>健やかラインの取り組み</H2>
      <blockquote data-reveal className="mt-8 border-l-[3px] border-sky pl-6 text-[16px] leading-[2.1] text-ink md:text-[17px]">
        {ceoMessage.paragraphs[1]}
        {ceoMessage.paragraphs[2]}
        <footer className="mt-4 text-[14px] text-steel">
          {site.company.representativeTitle}　{site.company.representative}
        </footer>
      </blockquote>
      <Bullets
        items={[
          "若手を中心としたチームで、先輩から後輩へ技術をつないでいます",
          "入社したばかりのうちは先輩と組み、3年を目安に一人前の職人をめざします",
          "資格の取得にかかる費用は会社が負担します",
          "急ぎの案件にも、人員と段取りを組んで対応します",
        ]}
      />

      <CtaButtons primary={{ href: "/contact/", label: "工事を相談する" }} secondary={{ href: "/recruit/", label: "採用情報を見る" }} />
    </ColumnArticle>
  );
}
