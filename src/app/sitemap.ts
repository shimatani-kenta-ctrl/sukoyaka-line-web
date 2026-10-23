import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { works } from "@/data/works";
import { columns } from "@/data/columns";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number; freq: "weekly" | "monthly" | "yearly"; lastModified?: string }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/company/", priority: 0.8, freq: "monthly" },
    { path: "/works/", priority: 0.9, freq: "weekly" },
    { path: "/voice/", priority: 0.7, freq: "monthly" },
    // コラム一覧の更新日は、いちばん新しいコラムの公開日
    { path: "/column/", priority: 0.6, freq: "monthly", lastModified: columns.map((c) => c.published).sort().at(-1) },
    // コラムの個別ページ（更新日は公開日。一覧 src/data/columns.ts から自動で載る）
    ...columns.map((c) => ({
      path: c.href,
      priority: 0.7,
      freq: "yearly" as const,
      lastModified: c.published,
    })),
    { path: "/recruit/", priority: 0.8, freq: "monthly" },
    { path: "/instagram/", priority: 0.5, freq: "weekly" },
    { path: "/contact/", priority: 0.7, freq: "yearly" },
    { path: "/privacy/", priority: 0.2, freq: "yearly" },
    // 施工事例の個別ページ
    // 更新日は記事に書いた日付を使う（毎回の公開日だと、Googleが更新日を信用しなくなるため）
    ...works.map((w) => ({
      path: `/works/${w.slug}/`,
      priority: 0.8,
      freq: "monthly" as const,
      lastModified: w.updated || w.published,
    })),
  ];
  const now = new Date();
  return pages.map((p) => ({
    url: `${site.url}${p.path}`,
    lastModified: p.lastModified ? new Date(p.lastModified) : now,
    changeFrequency: p.freq,
    priority: p.priority,
  }));
}
