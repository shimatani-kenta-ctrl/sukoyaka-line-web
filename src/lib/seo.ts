import type { Metadata } from "next";
import { site } from "@/config/site";

type OgImage = { url: string; width?: number; height?: number; alt: string };

const defaultImage: OgImage = { url: "/og.png", width: 1200, height: 630, alt: site.name };

/**
 * 各ページのタイトル・説明文・SNSで共有したときの表示（OGP）をまとめて作る。
 * Next.js は layout の openGraph を下のページへそのまま引き継ぐため、
 * ページごとに書かないと LINE や Instagram で共有したときにトップページの題名・URLが出てしまう。
 */
export function pageMeta({
  title,
  description,
  path,
  image = defaultImage,
}: {
  title: string;
  description: string;
  path: string;
  image?: OgImage;
}): Metadata {
  const fullTitle = `${title}｜${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "ja_JP",
      url: path,
      siteName: site.name,
      title: fullTitle,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.url],
    },
  };
}
