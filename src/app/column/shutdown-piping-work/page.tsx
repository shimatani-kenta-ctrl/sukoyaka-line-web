import type { Metadata } from "next";
import Link from "next/link";
import { ColumnArticle, CtaButtons, H2, P, StepFlow } from "@/components/ColumnParts";
import { pageMeta } from "@/lib/seo";

const path = "/column/shutdown-piping-work/";
const title = "工場の休止期間に配管工事を終わらせるには｜段取りの流れとポイント";
const description =
  "工場の休止期間（定期修理・長期休暇など）のうちに配管の更新・改修を終わらせるための段取りを、配管工事会社の目線で解説。事前の現地調査と、配管・架台の事前製作がポイントです。";

export const metadata: Metadata = pageMeta({ title, description, path });

const points = [
  ["現場の寸法を、事前に測っておく", "図面がない・図面と現場が違う、ということはよくあります。休止期間の前に現場を拝見し、寸法や取合いを確認しておくことで、当日の手戻りを防ぎます。"],
  ["配管・架台は、できるところまで先に作る", "現場の寸法に合わせて、配管や架台を事前に製作しておけば、休止期間中は取付けと接続が中心になり、現場での作業時間を短くできます。"],
  ["製作から施工まで、一社にまとめる", "製作と施工を別々の会社に頼むと、寸法の行き違いや連絡の待ち時間が生まれやすくなります。一社で一貫して行えば、調整の手間を減らせます。"],
  ["使い方まで聞いて、納め方を決める", "点検口の開け閉めや、バルブの操作のしやすさなど、休止明けに使う人の目線で配管のルートや支持を決めておくと、やり直しを防げます。"],
];

export default function Page() {
  return (
    <ColumnArticle
      title={title}
      heroTitle="休止期間に配管工事を終わらせるには"
      lead="定期修理や長期休暇など、工場が止まっている限られた期間に、配管の更新・改修を終わらせるための段取りを解説します。"
      path={path}
      published="2026-10-22"
      publishedLabel="2026年10月22日"
      description={description}
      sources={[]}
      summary={
        <p>
          工場の休止期間内に配管工事を終わらせるカギは、<strong className="text-ai">休止前の準備</strong>
          です。事前に現場を測り、配管や架台をできるところまで先に作っておけば、休止期間中は取付けと接続が中心になります。製作から施工まで一社にまとめると、調整の手間も減らせます。
        </p>
      }
    >
      <H2>休止期間の工事は「準備」で決まる</H2>
      <P>
        生産を止められるのは、定期修理や長期休暇などの限られた期間だけ、という工場は少なくありません。この期間に工事が終わらなければ、生産の再開に影響します。だからこそ、休止に入る前にどれだけ準備できるかが大切です。
      </P>

      <H2>ご相談から完了までの流れ</H2>
      <StepFlow
        steps={[
          { title: "ご相談・現地調査", mark: "休止前", body: "工事の内容とご希望の時期をうかがい、現場を拝見します。図面がまだない段階のご相談もお受けしています。" },
          { title: "お見積り・工程のご提案", mark: "休止前", body: "休止期間に合わせた工程と、納め方をご提案します。お見積りは無料です。" },
          { title: "配管・架台の事前製作", mark: "休止前", body: "現場の寸法や取合いに合わせて、配管や架台を製作しておきます。" },
          { title: "取付け・施工", mark: "休止期間中", body: "既存配管の撤去や、製作した配管・架台の取付け、溶接、接続を行います。" },
          { title: "完了・お引き渡し", mark: "休止明け前", body: "仕上がりをご確認いただき、お引き渡しします。" },
        ]}
      />

      <H2>段取りの4つのポイント</H2>
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

      <H2>事例：2名・3日間で電解槽まわりの配管を更新</H2>
      <P>
        兵庫県尼崎市内の金属加工工場では、薬剤と熱で傷んだ電解槽まわりの配管を、耐熱塩ビ管とHIVP管（50A）で更新しました。工事は2名で3日間です。「電解槽の蓋を開け閉めするので、配管支持を取らないでほしい」というご要望に、継手とフランジの配置を工夫してお応えしました。
      </P>
      <p className="mt-4 text-[15px]">
        <Link href="/works/amagasaki-electrolytic-cell-piping-2026-04/" className="text-ai underline underline-offset-4">
          この施工事例を詳しく見る
        </Link>
      </p>

      <CtaButtons primary={{ href: "/contact/", label: "休止期間の工事を相談する" }} secondary={{ href: "/works/", label: "施工事例を見る" }} />
    </ColumnArticle>
  );
}
