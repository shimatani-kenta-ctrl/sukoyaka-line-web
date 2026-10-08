import Link from "next/link";
import { site, telHref } from "@/config/site";

/** ページ下部の問い合わせ導線 */
export function CtaBand() {
  return (
    <section className="bg-ai text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[1fr_auto] md:items-center md:px-8 md:py-20">
        <div>
          <h2 className="text-2xl md:text-3xl">配管工事のご相談は、お気軽に。</h2>
          <p className="mt-4 text-[15px] text-white/85">
            図面がまだない段階のご相談や、急ぎの案件もお受けしています。お見積りは無料です。
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
          <a
            href={telHref}
            className="flex min-h-14 flex-col items-center justify-center rounded-sm bg-white px-8 text-ink transition-colors hover:bg-sky-soft"
          >
            <span className="text-[11px] tracking-[0.2em] text-steel">お電話</span>
            <span className="font-serif text-xl tracking-[0.08em]">{site.company.tel}</span>
          </a>
          <Link
            href="/contact/"
            className="flex min-h-14 items-center justify-center rounded-sm border border-white/70 px-8 tracking-[0.1em] transition-colors hover:bg-white hover:text-ink"
          >
            フォームで問い合わせる
          </Link>
        </div>
      </div>
    </section>
  );
}
