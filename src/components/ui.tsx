import Link from "next/link";
import type { ReactNode } from "react";

/** 構造化データ（検索エンジン向け） */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** 見出し。PCでは右側に縦書きの添え字が付く */
export function SectionHeading({
  title,
  side,
  lead,
  light = false,
}: {
  title: string;
  side?: string;
  lead?: ReactNode;
  light?: boolean;
}) {
  return (
    <div className="flex items-start gap-6">
      <div className="max-w-2xl">
        <h2 className={`text-2xl md:text-[34px] ${light ? "text-white" : "text-ink"}`}>{title}</h2>
        <span aria-hidden="true" className={`mt-5 block h-[3px] w-12 ${light ? "bg-sky" : "bg-ai"}`} />
        {lead && (
          <p className={`mt-6 text-[15px] ${light ? "text-white/80" : "text-steel"}`}>{lead}</p>
        )}
      </div>
      {side && (
        <span
          aria-hidden="true"
          className={`tategaki ml-auto hidden font-serif text-xs md:block ${light ? "text-sky" : "text-steel/70"}`}
        >
          {side}
        </span>
      )}
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "light" | "ghost";
}) {
  const styles = {
    primary: "bg-ai text-white hover:bg-ai-bright",
    outline: "border border-ai text-ai hover:bg-ai hover:text-white",
    light: "bg-white text-ink hover:bg-sky-soft",
    ghost: "border border-sky/70 text-white hover:bg-white hover:text-ink",
  }[variant];
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center rounded-sm px-7 text-[15px] tracking-[0.1em] transition-colors ${styles}`}
    >
      {children}
    </Link>
  );
}

/** 差し替え前のサンプル表示 */
export function SampleBadge() {
  return (
    <span className="inline-block rounded-sm border border-dashed border-steel/60 px-2 py-0.5 text-[11px] leading-none tracking-[0.1em] text-steel">
      掲載例
    </span>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-6xl px-4 md:px-8 ${className}`}>{children}</div>;
}
