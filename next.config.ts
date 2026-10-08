import type { NextConfig } from "next";

/**
 * 静的書き出し（out/ フォルダにHTMLを出力）。
 * Vercel・Netlify・Cloudflare Pages・GitHub Pages など、どの無料ホスティングにも置けます。
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
