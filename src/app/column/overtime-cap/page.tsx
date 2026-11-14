import type { Metadata } from "next";
import Link from "next/link";
import { BarChart, Bullets, ColumnArticle, CtaButtons, H2, P, StatTiles } from "@/components/ColumnParts";
import { daySchedule, job, recruitFaq } from "@/data/jobs";
import { pageMeta } from "@/lib/seo";

const path = "/column/overtime-cap/";
const title = "建設業の残業上限規制（2024年4月〜）とは｜配管工の残業・休日と、求人で確認したいこと";
const description =
  "2024年4月から建設業にも、残業（時間外労働）の上限規制が適用されました。原則は月45時間・年360時間。厚生労働省・国土交通省の資料で中身と建設業の働き方の現状を整理し、配管工の求人を見るときに確認したいポイントを解説します。";

const MHLW_CAP = "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/gyosyu/topics/01.html";
const MHLW_SUSUME = "https://hatarakikatasusume.mhlw.go.jp/construction_company.html";
const MHLW_PREMIUM = "https://www.mhlw.go.jp/content/000930914.pdf";
const MLIT = "https://www.mlit.go.jp/tochi_fudousan_kensetsugyo/const/content/001994097.pdf";

export const metadata: Metadata = pageMeta({ title, description, path });

/** 上限規制の中身（厚生労働省「建設業・ドライバー・医師等の時間外労働の上限規制」「はたらきかたススメ」より） */
const rules: [string, string][] = [
  ["原則の上限", "月45時間・年360時間まで"],
  ["臨時的な特別の事情がある場合", "年720時間まで。月45時間を超えられるのは年6か月まで"],
  ["休日労働も含めた上限", "1か月100時間未満、2〜6か月の平均80時間以内"],
  ["例外", "災害の復旧・復興の事業では、「1か月100時間未満」「2〜6か月平均80時間以内」は適用されない"],
];

/** 健やかラインの条件（src/data/jobs.ts の掲載内容のみ） */
const ownRows = ["勤務時間", "休日休暇"].map((label) => ({
  label,
  value: job.rows.find((r) => r.label === label)?.value ?? "",
}));
const overtimeFaq = recruitFaq.find((f) => f.q === "残業は多いですか？");

function RulesTable() {
  return (
    <div data-reveal className="mt-8 overflow-hidden rounded-[16px] bg-white">
      <dl>
        {rules.map(([k, v], i) => (
          <div key={k} className={`grid gap-1 px-5 py-4 md:grid-cols-[220px_1fr] md:gap-4 md:px-8 ${i > 0 ? "border-t border-line" : ""}`}>
            <dt className="text-[13px] font-bold text-ai md:text-[14px]">{k}</dt>
            <dd className="text-[15px] leading-relaxed text-ink">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function Page() {
  return (
    <ColumnArticle
      title={title}
      heroTitle="建設業の残業上限規制とは"
      lead="2024年4月から、建設業でも残業の上限が決まりました。中身と、求人を見るときのポイントを整理します。"
      path={path}
      published="2026-11-15"
      publishedLabel="2026年11月15日"
      description={description}
      sources={[
        { label: "厚生労働省「建設業・ドライバー・医師等の時間外労働の上限規制」", url: MHLW_CAP },
        { label: "厚生労働省「はたらきかたススメ（建設業・ドライバー・医師の働き方改革総合サイト）」建設業", url: MHLW_SUSUME },
        { label: "厚生労働省「月60時間を超える時間外労働の割増賃金率が引き上げられます」", url: MHLW_PREMIUM },
        { label: "国土交通省「参考資料集」（令和8年4月3日）p.5「建設産業における働き方の現状」（厚生労働省「毎月勤労統計調査」をもとに作成）", url: MLIT },
      ]}
      summary={
        <p>
          2024年4月から、建設業にも残業（時間外労働）の上限規制が適用されています。上限は原則
          <strong className="text-ai">月45時間・年360時間</strong>
          で、特別な事情がある場合でも年720時間までです。ただし国土交通省の資料では、建設業はいまも全産業と比べて
          <strong className="text-ai">年間の出勤日数が10日多く、総実労働時間が48時間長い</strong>
          とされています。配管工の求人を見るときは、給与だけでなく、集合時間・移動・休日・繁忙期の扱いまで確認するのがおすすめです。
        </p>
      }
    >
      <H2>2024年4月から、建設業にも残業の上限ができた</H2>
      <P>
        働き方改革で決まった残業の上限規制は、建設業では適用が猶予されていましたが、厚生労働省によると、2024（令和6）年4月から建設業にも適用されています。中身は次のとおりです。
      </P>
      <RulesTable />
      <BarChart
        caption="1年間の残業の上限"
        note="厚生労働省「建設業・ドライバー・医師等の時間外労働の上限規制」より"
        unit="時間"
        rows={[
          { label: "原則", value: 360, highlight: true },
          { label: "特別な事情", value: 720 },
        ]}
        legend="原則は年360時間（月45時間）まで"
      />
      <P>
        あわせて、2023年4月からは中小企業でも、月60時間を超える残業の割増賃金率が25％から50％に引き上げられています（厚生労働省）。長い残業は、会社にとってもコストが大きくなる仕組みです。
      </P>

      <H2>それでも、建設業は全産業より長く働いている</H2>
      <P>国土交通省の最新の資料（令和8年4月）でも、建設業と全産業の間には、次のような差があるとされています。</P>
      <StatTiles
        items={[
          { label: "年間の出勤日数", value: "+10日", sub: "全産業と比べて" },
          { label: "年間の総実労働時間", value: "+48時間", sub: "全産業と比べて" },
        ]}
        note="国土交通省「参考資料集」（令和8年4月3日）より（厚生労働省「毎月勤労統計調査」をもとに作成）"
      />
      <P>
        厚生労働省の「はたらきかたススメ」でも、建設業は働き方改革で労働時間が大きく減ったものの、他の産業と比べると労働時間も出勤日数もまだ多く、その背景に週休2日が十分に確保できていない工事があることが挙げられています。
      </P>

      <H2>配管工の求人で確認したい5つのこと</H2>
      <P>同じ「月給」「週休2日」と書かれていても、実際の働き方は会社によって違います。応募の前や面接で、次の点を確かめておくと安心です。</P>
      <Bullets
        items={[
          "勤務時間：始業・終業の時刻と、休憩の取り方",
          "集合時間と移動：朝は会社に集合するのか、現場へ直行直帰できるのか。現場までの移動にどれくらいかかるのか",
          "休日：週休2日の中身（何曜日が休みか）と、繁忙期の扱い",
          "残業：どれくらいあるのか。多くなる時期はいつか",
          "現場の場所：どの地域の現場が多いのか",
        ]}
      />
      <P>わからないことは、遠慮せずに聞いてかまいません。質問にきちんと答えてくれるかどうかも、会社を選ぶときの大切な見方です。</P>

      <H2>健やかラインの場合</H2>
      <P>健やかラインの募集要項と、ある1日の流れは次のとおりです。</P>
      <div data-reveal className="mt-8 overflow-hidden rounded-[16px] bg-white">
        <dl>
          {ownRows.map((r, i) => (
            <div key={r.label} className={`grid gap-1 px-5 py-4 md:grid-cols-[160px_1fr] md:gap-4 md:px-8 ${i > 0 ? "border-t border-line" : ""}`}>
              <dt className="text-[13px] font-bold text-ai md:text-[14px]">{r.label}</dt>
              <dd className="text-[15px] leading-relaxed text-ink">{r.value}</dd>
            </div>
          ))}
          {overtimeFaq && (
            <div className="grid gap-1 border-t border-line px-5 py-4 md:grid-cols-[160px_1fr] md:gap-4 md:px-8">
              <dt className="text-[13px] font-bold text-ai md:text-[14px]">残業</dt>
              <dd className="text-[15px] leading-relaxed text-ink">{overtimeFaq.a}</dd>
            </div>
          )}
        </dl>
      </div>
      <ol data-reveal className="mt-6 rounded-[16px] bg-white px-5 py-6 md:px-8">
        {daySchedule.map((d, i) => (
          <li key={i} className="grid grid-cols-[84px_1fr] gap-3 border-b border-line/60 py-2.5 last:border-b-0 md:grid-cols-[110px_1fr]">
            <span className="font-display text-[15px] font-extrabold tabular-nums text-ai">{d.time}</span>
            <span className="text-[14px] leading-relaxed text-ink md:text-[15px]">
              {d.title}
              {d.body && <span className="mt-0.5 block text-[13px] text-steel">{d.body}</span>}
            </span>
          </li>
        ))}
      </ol>
      <P>
        仕事内容や働き方について気になることは、面接（1回のみ）の前でも、フォームから気軽に聞いてください。どんな現場で働くのかは、
        <Link href="/works/" className="text-ai underline underline-offset-4">
          施工事例
        </Link>
        でもご覧いただけます。
      </P>

      <CtaButtons primary={{ href: "/recruit/", label: "採用情報を見る" }} secondary={{ href: "/contact/?type=recruit", label: "応募・質問する" }} />
    </ColumnArticle>
  );
}
