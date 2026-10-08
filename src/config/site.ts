/**
 * サイト全体の基本情報。
 * 会社情報が変わったら、このファイルだけ書き換えれば全ページに反映されます。
 * 空欄（""）の項目はサイト上に表示されません。
 */
export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://sukoyaka-line.com",
  name: "株式会社健やかライン",
  shortName: "健やかライン",
  description:
    "兵庫県尼崎市の配管工事会社、株式会社健やかラインです。工場・プラントの各種配管工事、配管製作、架台製作及び据付、溶接工事（TIG・アーク）を行っています。急ぎの案件にも関西一円で迅速に対応します。",
  keywords: [
    "配管工事",
    "プラント配管",
    "設備工事",
    "管工事",
    "配管製作",
    "架台製作",
    "溶接工事",
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
    founded: "2025年3月3日",
    /** 例: "300万円"。空欄なら非表示 */
    capital: "1,000,000円",
    /** 例: "建設業許可 兵庫県知事許可（般-〇）第〇〇〇〇号"。取得後に記入 */
    license: "",
    business: ["各種配管工事", "各種配管製作", "架台製作及び据付", "溶接工事"],
    area: "兵庫県・大阪府を中心に関西一円",
  },

  instagram: {
    /** アカウントのURL（例: https://www.instagram.com/xxxx/）。空欄ならフォローボタン非表示 */
    profileUrl: "https://www.instagram.com/sukoyaka0303/",
    /** 表示名（例: @xxxx） */
    handle: "@sukoyaka0303",
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
