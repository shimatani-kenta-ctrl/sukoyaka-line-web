import type { Metadata } from "next";
import Link from "next/link";
import { Bullets, ColumnArticle, CtaButtons, H2, P, StepFlow } from "@/components/ColumnParts";
import { pageMeta } from "@/lib/seo";

const path = "/column/pipe-support-frame/";
const title = "配管架台とは｜役割と、製作から据付まで一社で頼むメリット";
const description =
  "配管や機器を支える「架台」の役割と、架台づくりで考えること、ご相談から据付までの流れを、尼崎の配管工事会社が施工事例をもとに解説。屋外配管の水はけ・さび対策も紹介します。";

export const metadata: Metadata = pageMeta({ title, description, path });

/** 内容は、サイト掲載済みの施工事例・事業内容・コラム（休止期間）の事実だけで作成 */
const points = [
  [
    "使う人の目線で、位置と高さを決める",
    "架台の位置と高さで、配管のルートやバルブの高さが決まります。点検や操作のしやすさまで考えて決めておくと、使い始めてからのやり直しを防げます。尼崎市内の金属加工工場では「電解槽の蓋を開け閉めするので、配管支持を取らないでほしい」というご要望に、継手とフランジの配置を工夫してお応えしました。",
  ],
  [
    "屋外では、水はけとさびに気を配る",
    "屋外に置く架台と配管は、雨にさらされます。奈良県内の化学工場では、架台の材料や塗装、配管の勾配の付け方まで考えて施工しました。",
  ],
  [
    "現場の寸法に合わせて、先に作っておく",
    "現場の寸法や取合いを確認してから、架台や配管を事前に製作しておけば、現場では取付けと接続が中心になり、作業時間を短くできます。工場の休止期間に工事を終わらせたいときにも有効です。",
  ],
];

const photos = [
  { src: "/photos/air-filter-angle-frame.jpg", caption: "アングルの架台とエアフィルターまわりの配管" },
  { src: "/photos/angle-base-weld.jpg", caption: "アングルと架台のベースの溶接" },
];

export default function Page() {
  return (
    <ColumnArticle
      title={title}
      heroTitle="配管架台とは"
      lead="工場やプラントで、配管や機器を支えている「架台」。その役割と、架台づくりで考えること、製作から据付までの流れを解説します。"
      path={path}
      published="2026-11-05"
      publishedLabel="2026年11月5日"
      description={description}
      sources={[]}
      summary={
        <p>
          配管架台は、<strong className="text-ai">配管や機器を支え、決まった位置と高さに保つための台</strong>
          です。架台の位置と高さで配管のルートが決まるため、架台の製作と配管工事を一社でまとめて頼むと、寸法の行き違いや連絡の待ち時間が生まれにくくなります。
        </p>
      }
    >
      <H2>配管架台の役割</H2>
      <P>
        工場やプラントの配管や機器は、アングルなどの鋼材で組んだ架台で支えて施工することがよくあります。架台には、主に次のような役割があります。
      </P>
      <Bullets
        items={[
          "配管や機器の重さを受け止めて支える",
          "配管を決まったルート・高さに保ち、バルブやフランジの位置をそろえる",
          "ポンプやボイラーなど、機器を据え付ける土台になる",
        ]}
      />

      <H2>架台づくりで考える3つのこと</H2>
      <ol className="mt-8 space-y-8">
        {points.map(([t, b], i) => (
          <li key={t} data-reveal className="grid gap-2 md:grid-cols-[72px_1fr] md:gap-6">
            <p className="font-display text-[36px] font-light leading-none text-pipe">0{i + 1}</p>
            <div>
              <h3 className="text-[18px] leading-relaxed text-ink md:text-[20px]">{t}</h3>
              <p className="mt-2 text-[15px] leading-[2.1] text-steel md:text-base">{b}</p>
            </div>
          </li>
        ))}
      </ol>

      <H2>現場の架台（健やかラインの施工）</H2>
      <div data-reveal className="mt-8 grid gap-4 sm:grid-cols-2">
        {photos.map((p) => (
          <figure key={p.src} className="m-0">
            <img src={p.src} alt={p.caption} loading="lazy" decoding="async" className="aspect-[3/4] w-full rounded-[12px] object-cover" />
            <figcaption className="mt-2 text-[13px] text-steel">{p.caption}</figcaption>
          </figure>
        ))}
      </div>

      <H2>ご相談から据付までの流れ</H2>
      <StepFlow
        steps={[
          { title: "ご相談・現地調査", body: "設置する機器や配管、場所をうかがい、現場を拝見します。図面がまだない段階のご相談もお受けしています。" },
          { title: "お見積り・納め方のご提案", body: "架台の位置・高さと配管のルートをあわせてご提案します。お見積りは無料です。" },
          { title: "架台・配管の製作", body: "現場の寸法や取合いに合わせて、架台と配管を製作します。" },
          { title: "据付・配管の施工", body: "架台を据え付け、配管の取付けや溶接、接続を行います。" },
          { title: "完了・お引き渡し", body: "仕上がりをご確認いただき、お引き渡しします。" },
        ]}
      />

      <H2>事例：化学工場の冷却水配管と配管支持架台</H2>
      <P>
        奈良県内の化学工場の新築工事で、屋外に設置する冷却水配管（白管）と、配管を支える架台の製作・施工を担当しました。配管とバルブが多く並ぶ現場のため、バルブやフランジの高さと向きをそろえ、系統をひと目で追いやすく仕上げています。
      </P>
      <p className="mt-4 text-[15px]">
        <Link href="/works/nara-chemical-plant-cooling-water-2025-08/" className="text-ai underline underline-offset-4">
          この施工事例を詳しく見る
        </Link>
      </p>

      <H2>製作から据付まで、一社で頼むメリット</H2>
      <P>
        架台の製作と配管工事を別々の会社に頼むと、寸法の行き違いや連絡の待ち時間が生まれやすくなります。健やかラインは、架台の製作から据付、配管の製作・施工、溶接まで一社で行います。兵庫県尼崎市を拠点に、関西一円でお受けしています。
      </P>

      <CtaButtons primary={{ href: "/request/", label: "架台・配管の工事を相談する" }} secondary={{ href: "/works/", label: "施工事例を見る" }} />
    </ColumnArticle>
  );
}
