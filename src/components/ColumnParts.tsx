import type { ReactNode } from "react";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { ButtonLink, Container, JsonLd } from "@/components/ui";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/config/site";
import { columns } from "@/data/columns";

/**
 * コラム記事の共通部品。
 * 記事の数字は、出典（国の資料など）にあるものだけを使い、最後に出典を載せる。
 */

export function ColumnArticle({
  title,
  heroTitle,
  lead,
  path,
  published,
  publishedLabel,
  description,
  summary,
  sources,
  children,
}: {
  title: string;
  heroTitle: string;
  lead: string;
  path: string;
  published: string;
  publishedLabel: string;
  description: string;
  summary: ReactNode;
  sources: { label: string; url: string }[];
  children: ReactNode;
}) {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: published,
    dateModified: published,
    // 共有画像（OGP）と同じ現場写真。Google は記事の構造化データに画像を入れることを推奨している
    image: [`${site.url}/og.jpg`],
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: `${site.url}/logo.png` } },
    mainEntityOfPage: `${site.url}${path}`,
  };
  return (
    <>
      <PageHero title={heroTitle} lead={lead} path={path} parent={{ title: "コラム", path: "/column/" }} />
      <JsonLd data={article} />
      <article className="py-16 md:py-24">
        <Container className="max-w-3xl">
          <p className="text-[13px] text-steel">
            <time dateTime={published}>{publishedLabel}</time>　｜　{site.name}
          </p>
          <section data-reveal className="mt-8 rounded-[16px] border-l-[4px] border-pipe bg-white px-6 py-7 md:px-8">
            <p className="text-[13px] font-bold tracking-[0.15em] text-ai">この記事のまとめ</p>
            <div className="mt-3 text-[16px] leading-[2] text-ink md:text-[17px]">{summary}</div>
          </section>
          {children}
          <RelatedColumns path={path} />
          <section className="mt-16 border-t border-line pt-8 text-[13px] leading-relaxed text-steel">
            {sources.length > 0 && <h2 className="text-[14px] font-bold text-ink">出典</h2>}
            <ul className="mt-2 space-y-3">
              {sources.map((s) => (
                <li key={s.url}>
                  {s.label}
                  <br />
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="break-all text-ai underline underline-offset-4">
                    {s.url}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6">
              <Link href="/column/" className="text-ai underline underline-offset-4">
                コラム一覧へ戻る
              </Link>
            </p>
          </section>
        </Container>
      </article>
      <CtaBand />
    </>
  );
}

/**
 * 記事下の「関連コラム」。同じ読者向けの記事を先に、もう一方の読者向けの新しい記事を次に、最大2本。
 * 一覧は src/data/columns.ts から自動で選ぶ（記事を足せば自動で載る）
 */
export function RelatedColumns({ path }: { path: string }) {
  const self = columns.find((c) => c.href === path);
  const others = columns.filter((c) => c.href !== path);
  const same = others.filter((c) => c.audience === self?.audience);
  const rest = others.filter((c) => c.audience !== self?.audience);
  const picks = [...same.slice(0, 1), ...rest.slice(0, 1), ...same.slice(1)].slice(0, 2);
  if (picks.length === 0) return null;
  return (
    <section aria-labelledby="related-columns" className="mt-16">
      <h2 id="related-columns" className="text-[18px] text-ink md:text-[20px]">
        あわせて読みたいコラム
      </h2>
      <ul className="mt-5 space-y-3">
        {picks.map((c) => (
          <li key={c.href}>
            <Link href={c.href} className="block rounded-[12px] border-l-[3px] border-ai bg-white px-5 py-4 transition-shadow hover:shadow-lg">
              <span className="block text-[12px] text-steel">{c.audience === "client" ? "工事をご検討の方へ" : "働きたい方へ"}</span>
              <span className="mt-1 block text-[15px] leading-relaxed text-ink md:text-base">{c.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 data-reveal className="reveal-blur mt-16 text-2xl leading-[1.6] text-ink md:text-[30px]">
      {children}
    </h2>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="mt-6 text-[15px] leading-[2.1] text-steel md:text-base">{children}</p>;
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 space-y-2 text-[15px] leading-[1.9] text-steel md:text-base">
      {items.map((t) => (
        <li key={t} className="flex gap-3">
          <span aria-hidden="true" className="mt-[11px] h-[6px] w-[6px] shrink-0 bg-sky" />
          {t}
        </li>
      ))}
    </ul>
  );
}

export function CtaButtons({ primary, secondary }: { primary: { href: string; label: string }; secondary: { href: string; label: string } }) {
  return (
    <div className="mt-10 flex flex-col gap-3 sm:flex-row">
      <ButtonLink href={primary.href}>{primary.label}</ButtonLink>
      <ButtonLink href={secondary.href} variant="outline">
        {secondary.label}
      </ButtonLink>
    </div>
  );
}

/** 横棒グラフ（1系列）。数値は出典のものだけ。下に表も付ける */
export function BarChart({
  caption,
  note,
  unit,
  rows,
  legend,
}: {
  caption: string;
  note: string;
  unit: string;
  rows: { label: string; value: number; highlight?: boolean }[];
  legend?: string;
}) {
  const max = Math.max(...rows.map((r) => r.value)) * 1.08;
  return (
    <figure data-reveal className="mt-8 rounded-[16px] bg-white px-5 py-7 md:px-8">
      <figcaption className="text-[15px] font-bold text-ink md:text-base">{caption}</figcaption>
      <p className="mt-1 text-[13px] text-steel">{note}</p>
      <div className="mt-6 space-y-3" role="img" aria-label={rows.map((r) => `${r.label}${r.value}${unit}`).join("、")}>
        {rows.map((r) => (
          <div key={r.label} className="group grid grid-cols-[72px_1fr] items-center gap-3 md:grid-cols-[96px_1fr]">
            <span className="text-[13px] text-steel md:text-[14px]">{r.label}</span>
            <div className="relative flex items-center gap-2">
              <span
                className={`block h-7 rounded-r-[4px] ${r.highlight ? "bg-ai" : "bg-pipe/55"}`}
                style={{ width: `${(r.value / max) * 100}%` }}
              />
              <span className="shrink-0 text-[14px] font-bold tabular-nums text-ink">
                {r.value.toLocaleString("ja-JP")}
                {unit}
              </span>
              <span role="tooltip" className="pointer-events-none absolute -top-9 left-0 whitespace-nowrap rounded-sm bg-ink px-2.5 py-1 text-[12px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                {r.label}：{r.value.toLocaleString("ja-JP")}
                {unit}
              </span>
            </div>
          </div>
        ))}
      </div>
      {legend && (
        <p className="mt-4 flex items-center gap-2 text-[13px] text-steel">
          <span aria-hidden="true" className="inline-block h-3 w-5 rounded-r-[3px] bg-ai" />
          {legend}
        </p>
      )}
      <details className="mt-4 text-[13px] text-steel">
        <summary className="cursor-pointer text-ai underline underline-offset-4">表で見る</summary>
        <table className="mt-3 w-full max-w-sm border-collapse text-left">
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-b border-line/60">
                <td className="py-1.5">{r.label}</td>
                <td className="py-1.5 text-right tabular-nums">
                  {r.value.toLocaleString("ja-JP")}
                  {unit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}

/** 帯グラフ（100%の内訳）。数値は出典のものだけ */
export function ShareBar({
  caption,
  note,
  parts,
}: {
  caption: string;
  note: string;
  parts: { label: string; value: number; tone: "deep" | "mid" | "light" }[];
}) {
  const tone = { deep: "bg-ai text-white", mid: "bg-pipe/30 text-ink", light: "bg-sky text-ink" };
  return (
    <figure data-reveal className="mt-8 rounded-[16px] bg-white px-5 py-7 md:px-8">
      <figcaption className="text-[15px] font-bold text-ink md:text-base">{caption}</figcaption>
      <p className="mt-1 text-[13px] text-steel">{note}</p>
      <div className="mt-6 flex h-12 w-full gap-[2px] overflow-hidden rounded-[6px]" role="img" aria-label={parts.map((p) => `${p.label}${p.value}%`).join("、")}>
        {parts.map((p) => (
          <div
            key={p.label}
            className={`flex items-center justify-center text-[13px] font-bold tabular-nums ${tone[p.tone]}`}
            style={{ width: `${p.value}%` }}
          >
            {p.value}%
          </div>
        ))}
      </div>
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-steel">
        {parts.map((p) => (
          <li key={p.label} className="flex items-center gap-2">
            <span aria-hidden="true" className={`inline-block h-3 w-3 rounded-[2px] ${tone[p.tone].split(" ")[0]}`} />
            {p.label}：{p.value}%
          </li>
        ))}
      </ul>
    </figure>
  );
}

/** 数字を大きく見せる（出典の数字のみ） */
export function StatTiles({ items, note }: { items: { label: string; value: string; sub?: string }[]; note: string }) {
  return (
    <div data-reveal className="mt-8">
      <dl className="grid grid-cols-2 gap-[2px] overflow-hidden rounded-[16px] bg-line md:grid-cols-4">
        {items.map((s) => (
          <div key={s.label} className="bg-white px-4 py-5">
            <dt className="text-[12px] text-steel">{s.label}</dt>
            <dd className="mt-1 font-display text-[22px] font-extrabold tabular-nums text-ai md:text-[26px]">{s.value}</dd>
            {s.sub && <dd className="mt-0.5 text-[11px] text-steel">{s.sub}</dd>}
          </div>
        ))}
      </dl>
      <p className="mt-2 text-[12px] text-steel">{note}</p>
    </div>
  );
}

/** 手順・流れの図（数字は使わない） */
export function StepFlow({ steps }: { steps: { title: string; body: string; mark?: string }[] }) {
  return (
    <ol data-reveal-stagger="100" className="mt-8 space-y-3">
      {steps.map((s, i) => (
        <li key={s.title} className="relative grid grid-cols-[44px_1fr] gap-4 rounded-[12px] bg-white p-5 md:grid-cols-[56px_1fr] md:p-6">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-pipe to-ai font-display text-[15px] font-bold text-white md:h-12 md:w-12">
            {i + 1}
          </span>
          <div>
            <p className="text-[16px] font-bold text-ink md:text-[17px]">
              {s.title}
              {s.mark && <span className="ml-2 inline-block rounded-sm bg-mist px-2 py-0.5 align-middle text-[12px] font-bold text-ai">{s.mark}</span>}
            </p>
            <p className="mt-2 text-[14px] leading-[1.9] text-steel md:text-[15px]">{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
