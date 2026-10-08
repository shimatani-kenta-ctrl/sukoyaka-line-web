/**
 * サイト全体の基本情報。
 * 会社情報が変わったら、このファイルだけ書き換えれば全ページに反映されます。
 * 空欄（""）の項目はサイト上に表示されません。
 */
export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.sukoyaka-line.com",
  name: "株式会社健やかライン",
  shortName: "健やかライン",
  description:
    "兵庫県尼崎市の配管工事会社、株式会社健やかラインです。プラント配管・設備配管・機器据付とその周辺配管を、TIG溶接の確かな品質で施工します。急ぎの案件にも関西一円で迅速に対応します。",
  keywords: [
    "配管工事",
    "プラント配管",
    "設備工事",
    "管工事",
    "TIG溶接",
    "機器据付",
    "尼崎",
    "兵庫",
    "関西",
  ],

  company: {
    representative: "島谷 健太",
    representativeTitle: "代表取締役",
    postalCode: "660-0882",
    prefecture: "兵庫県",
    city: "尼崎市",
    street: "昭和南通7-180-1-602",
    /** 地図表示用（部屋番号を除いた住所） */
    mapQuery: "兵庫県尼崎市昭和南通7-180-1",
    tel: "080-9123-7037",
    email: "shimatani-kenta@sukoyaka-line.com",
    /** 例: "2020年4月"。空欄なら非表示 */
    founded: "",
    /** 例: "300万円"。空欄なら非表示 */
    capital: "",
    /** 例: "建設業許可 兵庫県知事許可（般-〇）第〇〇〇〇号"。取得後に記入 */
    license: "",
    business: [
      "プラント配管工事",
      "設備配管工事（管工事）",
      "機器据付・周辺配管工事",
      "ステンレス・鋼管のTIG溶接",
    ],
    area: "兵庫県・大阪府を中心に関西一円",
  },

  instagram: {
    /** アカウントのURL（例: https://www.instagram.com/xxxx/）。空欄ならフォローボタン非表示 */
    profileUrl: "",
    /** 表示名（例: @xxxx） */
    handle: "",
    /**
     * 手動で載せたい投稿のURL（トークン不要のいちばん簡単な方法）。
     * 投稿を開いて「…」→「リンクをコピー」で取れるURLを貼り付けてください。
     * 例: "https://www.instagram.com/p/XXXXXXXXXXX/"
     */
    postUrls: [] as string[],
  },

  nav: [
    { href: "/", label: "トップ" },
    { href: "/company/", label: "会社概要" },
    { href: "/works/", label: "施工事例" },
    { href: "/voice/", label: "お客様の声" },
    { href: "/recruit/", label: "採用情報" },
    { href: "/instagram/", label: "Instagram" },
    { href: "/contact/", label: "お問い合わせ" },
  ],
} as const;

export const fullAddress = `${site.company.prefecture}${site.company.city}${site.company.street}`;
export const telHref = `tel:${site.company.tel.replace(/-/g, "")}`;
