/**
 * 施工事例の記事。
 * 島谷さんへのヒアリング（質問への回答）をもとに作成します。
 * 新しい記事は配列の先頭に追加してください（上から順に表示されます）。
 *
 * 写真は public/works/記事のslug/ フォルダに置き、"/works/記事のslug/ファイル名.jpg" と書きます。
 * 1枚目の写真が一覧の表紙になります。写真がない記事は、配管の図柄を表示します。
 *
 * ── 記事の例（コピーして使えます） ──────────────────
 * {
 *   slug: "pump-install-2026-10",             // 英数字とハイフン。記事ごとに別の名前
 *   title: "ポンプ設備の据付と周辺配管",
 *   category: "機器据付",                      // プラント配管 / 設備配管 / 機器据付 / 溶接
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
export type WorkCategory = "プラント配管" | "設備配管" | "機器据付" | "溶接";

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

export const workCategories: WorkCategory[] = ["プラント配管", "設備配管", "機器据付", "溶接"];

export const works: Work[] = [];
