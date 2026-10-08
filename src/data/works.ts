/**
 * 施工事例の記事。
 * 島谷さんへのヒアリング（質問への回答）をもとに作成します。
 * 上から順に表示されます。工事の時期が新しいものを上にしてください。
 *
 * 写真は public/works/記事のslug/ フォルダに置き、"/works/記事のslug/ファイル名.jpg" と書きます。
 * 1枚目の写真が一覧の表紙になります。写真がない記事は、配管の図柄を表示します。
 *
 * ── 記事の例（コピーして使えます） ──────────────────
 * {
 *   slug: "pump-install-2026-10",             // 英数字とハイフン。記事ごとに別の名前
 *   title: "ポンプ設備の据付と周辺配管",
 *   category: "配管工事",                      // 配管工事 / 配管製作 / 架台製作・据付 / 溶接工事
 *   location: "兵庫県内 工場",
 *   period: "約1週間",
 *   date: "2026年10月",
 *   summary: "一覧に表示する2〜3行の紹介文。",
 *   photos: [
 *     { src: "/works/pump-install-2026-10/1.jpg", caption: "据付完了後の全景" },
 *     { src: "/works/pump-install-2026-10/2.jpg", caption: "吐出側の配管" },
 *   ],
 *   sections: [
 *     { heading: "工事の概要", body: "……" },
 *     { heading: "工夫した点", body: "……" },
 *   ],
 * },
 * ────────────────────────────────────────
 */
export type WorkCategory = "配管工事" | "配管製作" | "架台製作・据付" | "溶接工事";

export type Work = {
  slug: string;
  title: string;
  category: WorkCategory;
  location: string;
  period: string;
  date: string;
  summary: string;
  photos: { src: string; caption: string }[];
  sections: { heading: string; body: string }[];
};

export const workCategories: WorkCategory[] = ["配管工事", "配管製作", "架台製作・据付", "溶接工事"];

export const works: Work[] = [
  {
    slug: "amagasaki-electrolytic-cell-piping-2026-04",
    title: "金属加工工場 電解槽まわりの薬剤配管 更新工事",
    category: "配管工事",
    location: "兵庫県尼崎市内 金属加工工場",
    period: "3日間（2名で施工）",
    date: "2026年4月",
    summary:
      "薬剤と熱で傷んでいた電解槽まわりの配管を、耐熱塩ビ管とHIVP管（50A）で更新しました。「電解槽の蓋を開け閉めするので、配管支持を取らないでほしい」というご要望に、継手とフランジの配置を工夫してお応えしています。",
    photos: [
      { src: "/works/amagasaki-electrolytic-cell-piping-2026-04/1.jpg", caption: "電解槽まわりに新しく施工した配管" },
      { src: "/works/amagasaki-electrolytic-cell-piping-2026-04/2.jpg", caption: "電解槽の側面に沿わせた配管。蓋の開け閉めを妨げないよう、支持を取らずに施工" },
      { src: "/works/amagasaki-electrolytic-cell-piping-2026-04/3.jpg", caption: "継手とフランジの位置を工夫した取り回し" },
      { src: "/works/amagasaki-electrolytic-cell-piping-2026-04/4.jpg", caption: "バルブ・フランジまわり" },
      { src: "/works/amagasaki-electrolytic-cell-piping-2026-04/5.jpg", caption: "ポンプからの立ち上がり配管" },
    ],
    sections: [
      {
        heading: "工事の概要",
        body: "兵庫県尼崎市内の金属加工工場で、電解槽まわりの薬剤配管を更新しました。使用したのは耐熱塩ビ管とHIVP管で、口径は50Aです。2名で3日間の工事でした。",
      },
      {
        heading: "更新が必要になった理由",
        body: "薬剤と熱の影響で古い配管が傷んでいたため、新しい配管に入れ替えることになりました。",
      },
      {
        heading: "お客様のご要望と、施工の工夫",
        body: "電解槽は作業のたびに蓋を開け閉めするため、お客様から「配管支持を取らないでほしい」というご要望をいただきました。\n支持に頼らずに配管を納めるため、継手やフランジの位置を工夫して配管を組み上げています。蓋の開け閉めの邪魔にならないことを第一に、取り回しを決めました。",
      },
      {
        heading: "お客様の声",
        body: "完成後、お客様からは「蓋の開け閉めがしやすい」「仕上がりがきれい」とのお言葉をいただきました。",
      },
      {
        heading: "同じような工事をお考えの方へ",
        body: "薬剤や熱で傷んだ配管の更新や、設備の使い勝手に合わせた配管ルートのご相談もお受けしています。現場を拝見したうえで、ご要望に合った納め方をご提案します。",
      },
    ],
  },
  {
    slug: "nara-chemical-plant-cooling-water-2025-08",
    title: "化学工場 新築に伴う冷却水配管・配管支持架台工事",
    category: "配管工事",
    location: "奈良県内 化学工場",
    period: "",
    date: "2025年8月",
    summary:
      "化学工場の新築に伴い、屋外に設置する冷却水配管（白管）と、配管を支える架台を施工しました。配管の本数が多いため、バルブやフランジの高さ・向きをそろえて見やすく仕上げ、屋外ならではの水はけとさびへの対策にも気を配っています。",
    photos: [
      { src: "/works/nara-chemical-plant-cooling-water-2025-08/1.jpg", caption: "屋外に並ぶ冷却水配管と配管支持架台" },
    ],
    sections: [
      {
        heading: "工事の概要",
        body: "奈良県内の化学工場の新築工事で、冷却水配管と、配管を支える架台の製作・施工を担当しました。配管には白管（亜鉛めっき鋼管）を使用しています。",
      },
      {
        heading: "工夫した点：見やすくそろえる",
        body: "多くの配管とバルブが並ぶ現場のため、バルブやフランジの高さと向きをそろえ、見やすい配管に仕上げました。系統がひと目で追いやすいことは、運転や点検のしやすさにもつながります。",
      },
      {
        heading: "屋外配管ならではの対策",
        body: "屋外に設置される配管のため、水はけとさびに気を配りました。架台の材料や塗装、配管の勾配の付け方まで考えて施工しています。",
      },
      {
        heading: "同じような工事をお考えの方へ",
        body: "工場の新築・増設に伴う配管工事を、配管を支える架台の製作から一貫してお受けしています。屋外配管の納め方も、現場の条件に合わせてご提案します。",
      },
    ],
  },
];
