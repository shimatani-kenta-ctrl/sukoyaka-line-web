"use client";

import Script from "next/script";
import { useEffect } from "react";
import type { InstaPost } from "@/lib/instagram";
import { site } from "@/config/site";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

type Props = {
  /** ビルド時にAPIで取得した投稿（トークン設定時） */
  posts: InstaPost[];
  /** 表示する最大件数 */
  limit?: number;
};

/**
 * Instagram の投稿一覧。表示の優先順位：
 *  1. APIで取得した投稿（自動更新）
 *  2. site.ts に貼り付けた投稿URL（公式の埋め込み表示）
 *  3. どちらもなければ、アカウントへの案内
 */
export function InstagramFeed({ posts, limit = 9 }: Props) {
  const manual = site.instagram.postUrls.slice(0, limit);

  useEffect(() => {
    if (manual.length > 0) window.instgrm?.Embeds.process();
  }, [manual.length]);

  if (posts.length > 0) {
    return (
      <ul className="grid grid-cols-3 gap-1 sm:gap-2">
        {posts.slice(0, limit).map((p) => (
          <li key={p.id}>
            <a
              href={p.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square overflow-hidden bg-mist"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.image}
                alt={p.caption ? p.caption.slice(0, 60) : "Instagramの投稿"}
                loading="lazy"
                className="h-full w-full object-cover transition-opacity group-hover:opacity-80"
              />
            </a>
          </li>
        ))}
      </ul>
    );
  }

  if (manual.length > 0) {
    return (
      <>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {manual.map((url) => (
            <blockquote
              key={url}
              className="instagram-media !m-0 !min-w-0 !max-w-full"
              data-instgrm-permalink={url}
              data-instgrm-version="14"
            >
              <a href={url} target="_blank" rel="noopener noreferrer">
                Instagramで見る
              </a>
            </blockquote>
          ))}
        </div>
        <Script
          src="https://www.instagram.com/embed.js"
          strategy="lazyOnload"
          onLoad={() => window.instgrm?.Embeds.process()}
        />
      </>
    );
  }

  // プロフィールの埋め込み（Instagram公式の埋め込み表示。最新の投稿も自動で並ぶ）
  if (site.instagram.profileUrl) {
    const embedUrl = `${site.instagram.profileUrl.replace(/\/?$/, "/")}embed/`;
    return (
      <div className="mx-auto w-full max-w-[540px] overflow-hidden rounded-sm border border-line bg-white">
        <iframe
          src={embedUrl}
          title={`Instagram ${site.instagram.handle || ""} のプロフィール`}
          loading="lazy"
          className="block h-[560px] w-full border-0 md:h-[680px]"
          scrolling="no"
        />
      </div>
    );
  }

  return (
    <div className="border border-dashed border-line bg-white px-6 py-12 text-center">
      <p className="font-display text-lg">現場の様子をInstagramで発信しています</p>
      <p className="mt-3 text-sm text-steel">
        施工中の様子や、職人たちの日常を投稿しています。
      </p>
    </div>
  );
}

export function InstagramFollowButton() {
  if (!site.instagram.profileUrl) return null;
  return (
    <a
      href={site.instagram.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-12 items-center justify-center gap-3 rounded-sm bg-ink px-7 text-[15px] tracking-[0.1em] text-white transition-colors hover:bg-ai"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
      {site.instagram.handle ? `${site.instagram.handle} をフォロー` : "Instagramをフォロー"}
    </a>
  );
}
