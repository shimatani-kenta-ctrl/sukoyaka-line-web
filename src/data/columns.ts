/**
 * コラムの一覧。一覧ページとサイトマップの両方で使う。
 * 新しいコラムを追加したら、ここに1件足すだけでサイトマップにも載る。
 * 新しいものを上に。published は「年-月-日」
 * audience は読む人：client（工事を依頼する方）／jobseeker（働きたい方）。記事下の「関連コラム」で使う
 * photos は一覧のカードに並べるイメージ写真（自社の現場写真を3枚。なくても表示できる）
 */
export const columns: {
  href: string;
  published: string;
  date: string;
  title: string;
  summary: string;
  audience: "client" | "jobseeker";
  photos?: { src: string; alt: string }[];
}[] = [
  {
    href: "/column/shutdown-piping-work/",
    published: "2026-10-22",
    date: "2026年10月22日",
    title: "工場の休止期間に配管工事を終わらせるには｜段取りの流れとポイント",
    summary: "定期修理や長期休暇など、限られた休止期間のうちに配管の更新・改修を終わらせるための段取りを解説します。",
    audience: "client",
    photos: [
      { src: "/works/amagasaki-electrolytic-cell-piping-2026-04/2.jpg", alt: "金属加工工場の電解槽まわりの配管" },
      { src: "/works/amagasaki-electrolytic-cell-piping-2026-04/4.jpg", alt: "工場内の配管の更新工事" },
      { src: "/photos/ahu-piping-frame-1.jpg", alt: "保温された配管と架台" },
    ],
  },
  {
    href: "/column/construction-aging/",
    published: "2026-10-22",
    date: "2026年10月22日",
    title: "建設業の高齢化と人手不足｜データで見る現状と、若手が育つ現場づくり",
    summary: "国土交通省のデータで、建設業の働き手の減少と高齢化を整理し、健やかラインの取り組みを紹介します。",
    audience: "jobseeker",
    photos: [
      { src: "/photos/ceiling-air-piping-work.jpg", alt: "天井パネル上でエア配管を敷設する作業員" },
      { src: "/photos/tig-socket-weld.jpg", alt: "配管にねじ込みソケットをTIG溶接した部分" },
      { src: "/photos/angle-base-weld.jpg", alt: "アングルと架台のベースの溶接部" },
    ],
  },
  {
    href: "/column/pipefitter-job/",
    published: "2026-10-22",
    date: "2026年10月22日",
    title: "配管工の仕事内容と年収｜未経験から一人前になるまで",
    summary: "配管工の仕事・年収・求人の多さを厚生労働省のデータで紹介し、未経験から一人前になるまでの目安を解説します。",
    audience: "jobseeker",
    photos: [
      { src: "/photos/water-injection-piping.jpg", alt: "注水用の水の配管" },
      { src: "/photos/sus-flange-spools.jpg", alt: "ステンレスのフランジ付き短管" },
      { src: "/photos/white-pipe-elbow-butt-weld.jpg", alt: "白管のエルボの突合せ溶接" },
    ],
  },
  {
    href: "/column/direct-contract/",
    published: "2026-10-22",
    date: "2026年10月22日",
    title: "多重下請と直接依頼の違い｜配管工事を直接頼むメリット",
    summary: "国土交通省のデータをもとに、多重下請構造の仕組みと、施工する会社へ直接ご依頼いただくメリットを解説します。",
    audience: "client",
    photos: [
      { src: "/works/nara-chemical-plant-cooling-water-2025-08/1.jpg", alt: "化学工場の冷却水配管" },
      { src: "/works/amagasaki-electrolytic-cell-piping-2026-04/3.jpg", alt: "金属加工工場の配管" },
      { src: "/photos/compressor-air-piping.jpg", alt: "コンプレッサーまわりのエア配管" },
    ],
  },
];
