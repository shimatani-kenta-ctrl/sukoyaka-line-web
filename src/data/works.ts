/**
 * 施工事例。
 * 新しい事例は配列の先頭に追加してください（上から順に表示されます）。
 *
 * - image: public/works/ に写真を置き、"/works/ファイル名.jpg" と書く。空欄なら図柄を表示
 * - sample: true のものは「掲載例」と表示されます。実際の事例に差し替えたら削除してください
 */
export type WorkCategory = "プラント配管" | "設備配管" | "機器据付" | "溶接";

export type Work = {
  slug: string;
  title: string;
  category: WorkCategory;
  location: string;
  period: string;
  scope: string[];
  summary: string;
  image?: string;
  sample?: boolean;
};

export const workCategories: WorkCategory[] = ["プラント配管", "設備配管", "機器据付", "溶接"];

export const works: Work[] = [
  {
    slug: "boiler-replacement",
    title: "ボイラー更新に伴う蒸気配管の盛替え",
    category: "プラント配管",
    location: "兵庫県内 食品工場",
    period: "約2週間",
    scope: ["蒸気配管", "ドレン配管", "SGP / STPG"],
    summary:
      "既設ボイラーの入替えにあわせて、蒸気・ドレン配管を新設機器の取合いに合わせて盛り替えました。工場の休止期間内に収めるため、事前に配管をプレハブ加工して現場作業を短縮しています。",
    sample: true,
  },
  {
    slug: "sus-tig",
    title: "ステンレス配管のTIG溶接施工",
    category: "溶接",
    location: "大阪府内 製造工場",
    period: "約10日",
    scope: ["SUS304", "TIG溶接", "バックシールド"],
    summary:
      "製造ラインのステンレス配管をTIG溶接で施工しました。内面の酸化を抑えるためバックシールドを徹底し、溶接部はすべて外観検査を行ってお引き渡ししています。",
    sample: true,
  },
  {
    slug: "pump-install",
    title: "ポンプ設備の据付と周辺配管",
    category: "機器据付",
    location: "兵庫県内 工場",
    period: "約1週間",
    scope: ["機器据付", "芯出し", "吸込・吐出配管"],
    summary:
      "メーカー様より納入されたポンプの据付から、吸込・吐出側の周辺配管までを一貫して施工しました。芯出しと試運転立会いまで対応しています。",
    sample: true,
  },
  {
    slug: "cooling-water",
    title: "冷却水配管の増設工事",
    category: "設備配管",
    location: "大阪府内 工場",
    period: "約5日",
    scope: ["冷却水配管", "バルブ類取付", "保温下地"],
    summary:
      "生産設備の増設にあわせて冷却水配管を分岐・増設しました。稼働中の設備を止めずに済むよう、施工手順と切替のタイミングを事前に打ち合わせて進めました。",
    sample: true,
  },
  {
    slug: "urgent-repair",
    title: "急ぎの配管改修（ご依頼翌日に着工）",
    category: "設備配管",
    location: "兵庫県内 工場",
    period: "2日",
    scope: ["配管改修", "部分取替え"],
    summary:
      "設備トラブルで急ぎ配管の改修が必要になったとのご相談を受け、翌日に現場調査と着工、2日で復旧しました。",
    sample: true,
  },
  {
    slug: "air-piping",
    title: "工場内エア配管の新設",
    category: "設備配管",
    location: "兵庫県内 工場",
    period: "約1週間",
    scope: ["圧縮空気配管", "ドロップ配管"],
    summary:
      "レイアウト変更に伴い、コンプレッサーから各設備までのエア配管を新設しました。将来の増設を見込んだ分岐位置をご提案しています。",
    sample: true,
  },
];
