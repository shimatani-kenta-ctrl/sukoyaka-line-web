import Link from "next/link";
import { site } from "@/config/site";
import { JsonLd } from "./ui";

type Props = {
  title: string;
  lead: string;
  path: string;
};

/** 下層ページ共通の見出し帯＋パンくずリスト */
export function PageHero({ title, lead, path }: Props) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <svg
        aria-hidden="true"
        className="absolute -right-10 bottom-0 h-full w-[420px] opacity-60 md:right-10"
        viewBox="0 0 420 260"
        fill="none"
        preserveAspectRatio="xMaxYMax meet"
      >
        <path d="M0 200 H230 a50 50 0 0 0 50 -50 V0" stroke="#1f5a96" strokeWidth="22" />
        <path d="M0 200 H230 a50 50 0 0 0 50 -50 V0" stroke="#00c2cb" strokeWidth="1" />
        <rect x="120" y="184" width="8" height="32" fill="#00c2cb" />
        <rect x="264" y="60" width="32" height="8" fill="#00c2cb" />
      </svg>
      <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-10 md:px-8 md:pb-20 md:pt-14">
        <nav aria-label="パンくずリスト" className="text-[12px] text-white/60">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-sky">
                トップ
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-white/90">
              {title}
            </li>
          </ol>
        </nav>
        <h1 className="mt-8 text-3xl md:text-5xl">{title}</h1>
        <p className="mt-5 max-w-xl text-[15px] text-white/80">{lead}</p>
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "トップ", item: `${site.url}/` },
            { "@type": "ListItem", position: 2, name: title, item: `${site.url}${path}` },
          ],
        }}
      />
    </section>
  );
}
