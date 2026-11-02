import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { site, telHref } from "@/config/site";
import { pageMeta } from "@/lib/seo";

/**
 * Instagramのプロフィールに貼るリンク先（リンクまとめページ）。
 * プロフィールのリンクには、次のURLを貼ってください（Googleアナリティクスで「Instagramから来た人」を数えるため）。
 *   https://sukoyaka-line.com/links/?utm_source=instagram&utm_medium=social&utm_campaign=profile
 * 検索結果には出さない（noindex）。
 */
export const metadata: Metadata = {
  ...pageMeta({
    title: "リンク一覧",
    description: `${site.name}の工事のご依頼・お見積り、施工事例、採用情報へのリンクです。`,
    path: "/links/",
  }),
  robots: { index: false, follow: true },
};

const links = [
  { href: "/estimate/?from=instagram", title: "かんたん見積もり依頼", sub: "工事の内容を選ぶだけ・約1分", primary: true },
  { href: "/request/", title: "工事のご依頼について", sub: "機器据付・周辺配管・工場の配管工事" },
  { href: "/works/", title: "施工事例", sub: "これまでに施工した工事" },
  { href: "/recruit/", title: "採用情報", sub: "一緒に働く仲間を募集しています" },
  { href: "/", title: "ホームページ", sub: "会社のことをもっと知る" },
];

export default function LinksPage() {
  return (
    <section className="min-h-[80vh] bg-mist py-12 md:py-16">
      <div className="mx-auto max-w-md px-4">
        <div className="flex flex-col items-center text-center">
          <Logo size="lg" />
          <p className="mt-4 text-[14px] text-steel">
            兵庫県尼崎市の配管工事会社。
            <br />
            機器の据付と周辺配管、工場の配管工事を工事一式でお受けしています。
          </p>
        </div>
        <ul className="mt-10 space-y-3">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`flex min-h-16 flex-col justify-center rounded-sm px-6 py-4 transition-colors ${
                  l.primary ? "bg-ai text-white hover:bg-ai-bright" : "bg-white text-ink ring-1 ring-line hover:ring-ai"
                }`}
              >
                <span className="text-[16px] font-medium">{l.title}</span>
                <span className={`mt-1 text-[12px] ${l.primary ? "text-white/80" : "text-steel"}`}>{l.sub}</span>
              </Link>
            </li>
          ))}
          <li>
            <a
              href={telHref}
              className="flex min-h-16 flex-col justify-center rounded-sm bg-ink px-6 py-4 text-white transition-colors hover:bg-ink-deep"
            >
              <span className="text-[12px] text-sky">お急ぎの方はお電話で</span>
              <span className="mt-1 font-display text-[20px] tracking-[0.06em]">{site.company.tel}</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
