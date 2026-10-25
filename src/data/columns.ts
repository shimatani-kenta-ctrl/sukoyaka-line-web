import type { ColumnVisualKey } from "@/components/ColumnVisuals";

/**
 * コラムの一覧。一覧ページとサイトマップの両方で使う。
 * 新しいコラムを追加したら、ここに1件足すだけでサイトマップにも載る。
 * 新しいものを上に。published は「年-月-日」
 * audience は読む人：client（工事を依頼する方）／jobseeker（働きたい方）。記事下の「関連コラム」で使う
 * visuals は一覧のカードに並べる小さなグラフ・イラスト（components/ColumnVisuals.tsx の名前を3つ。なくても表示できる）
 */
export const columns: {
  href: string;
  published: string;
  date: string;
  title: string;
  summary: string;
  audience: "client" | "jobseeker";
  visuals?: ColumnVisualKey[];
}[] = [
  {
    href: "/column/shutdown-piping-work/",
    published: "2026-10-22",
    date: "2026年10月22日",
    title: "工場の休止期間に配管工事を終わらせるには｜段取りの流れとポイント",
    summary: "定期修理や長期休暇など、限られた休止期間のうちに配管の更新・改修を終わらせるための段取りを解説します。",
    audience: "client",
    visuals: ["flow", "spool", "calendar"],
  },
  {
    href: "/column/construction-aging/",
    published: "2026-10-22",
    date: "2026年10月22日",
    title: "建設業の高齢化と人手不足｜データで見る現状と、若手が育つ現場づくり",
    summary: "国土交通省のデータで、建設業の働き手の減少と高齢化を整理し、健やかラインの取り組みを紹介します。",
    audience: "jobseeker",
    visuals: ["workers", "age", "handover"],
  },
  {
    href: "/column/pipefitter-job/",
    published: "2026-10-22",
    date: "2026年10月22日",
    title: "配管工の仕事内容と年収｜未経験から一人前になるまで",
    summary: "配管工の仕事・年収・求人の多さを厚生労働省のデータで紹介し、未経験から一人前になるまでの目安を解説します。",
    audience: "jobseeker",
    visuals: ["income", "jobratio", "steps"],
  },
  {
    href: "/column/direct-contract/",
    published: "2026-10-22",
    date: "2026年10月22日",
    title: "多重下請と直接依頼の違い｜配管工事を直接頼むメリット",
    summary: "国土交通省のデータをもとに、多重下請構造の仕組みと、施工する会社へ直接ご依頼いただくメリットを解説します。",
    audience: "client",
    visuals: ["tiers", "deep", "direct"],
  },
];
