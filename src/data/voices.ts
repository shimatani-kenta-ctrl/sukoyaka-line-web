/**
 * お客様の声。
 * 実際にいただいた声だけを、お客様の了承を得てから載せてください（作った文章は載せない）。
 * workSlug に施工事例の slug を入れると、その記事へのリンクが付きます。
 */
export type Voice = {
  who: string;
  role?: string;
  work: string;
  body: string;
  workSlug?: string;
  sample?: boolean;
};

export const voices: Voice[] = [
  {
    who: "兵庫県尼崎市内 金属加工工場様",
    work: "電解槽まわりの薬剤配管 更新工事（2026年4月）",
    body: "「蓋の開け閉めがしやすい」「仕上がりがきれい」",
    workSlug: "amagasaki-electrolytic-cell-piping-2026-04",
  },
];
