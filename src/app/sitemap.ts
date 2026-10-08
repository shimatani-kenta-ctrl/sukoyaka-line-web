import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number; freq: "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/company/", priority: 0.8, freq: "monthly" },
    { path: "/works/", priority: 0.9, freq: "weekly" },
    { path: "/voice/", priority: 0.7, freq: "monthly" },
    { path: "/recruit/", priority: 0.8, freq: "monthly" },
    { path: "/instagram/", priority: 0.5, freq: "weekly" },
    { path: "/contact/", priority: 0.7, freq: "yearly" },
    { path: "/privacy/", priority: 0.2, freq: "yearly" },
  ];
  const now = new Date();
  return pages.map((p) => ({
    url: `${site.url}${p.path}`,
    lastModified: now,
    changeFrequency: p.freq,
    priority: p.priority,
  }));
}
