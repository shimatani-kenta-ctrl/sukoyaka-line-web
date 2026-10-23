import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/ui";
import { ScrollEffects } from "@/components/ScrollEffects";
import { BackToTop } from "@/components/BackToTop";
import { Intro } from "@/components/Intro";
import { INTRO_HEAD_SCRIPT } from "@/lib/intro";
import { fullAddress, site } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `尼崎市の配管工事・配管製作・溶接｜${site.name}`,
    template: `%s｜${site.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: site.url,
    siteName: site.name,
    title: `尼崎市の配管工事・配管製作・溶接｜${site.name}`,
    description: site.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: `${site.name}｜兵庫県尼崎市の配管工事会社（フランジ内側の溶接の現場写真）` }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0e2a47",
  width: "device-width",
  initialScale: 1,
};

const sameAs = [site.instagram.profileUrl, site.googleBusiness.profileUrl].filter(Boolean);

const organization = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "@id": `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  logo: `${site.url}/logo.png`,
  image: `${site.url}/og.jpg`,
  description: site.description,
  telephone: `+81-${site.company.tel.replace(/^0/, "")}`,
  email: site.company.email,
  address: {
    "@type": "PostalAddress",
    postalCode: site.company.postalCode,
    addressRegion: site.company.prefecture,
    addressLocality: site.company.city,
    streetAddress: site.company.street,
    addressCountry: "JP",
  },
  areaServed: ["兵庫県", "大阪府", "京都府", "奈良県", "滋賀県", "和歌山県"],
  legalName: site.name,
  alternateName: site.shortName,
  ...(site.company.foundedIso ? { foundingDate: site.company.foundedIso } : {}),
  founder: { "@type": "Person", name: site.company.representative, jobTitle: site.company.representativeTitle },
  knowsAbout: [...site.company.business],
  // 同じ会社の公式ページ（Instagram・Googleビジネスプロフィール）。Google・AI検索に同一の会社だと伝える
  ...(sameAs.length ? { sameAs } : {}),
  hasMap:
    site.googleBusiness.profileUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        {/* JavaScriptが動く環境だけスクロール演出を有効にする（無効な環境では最初から全部表示） */}
        {/* トップページを開いたときだけ、オープニングを表示する */}
        <script dangerouslySetInnerHTML={{ __html: INTRO_HEAD_SCRIPT }} />
        {/* 4秒たっても演出の準備ができなければ、隠したままにならないよう元に戻す */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');setTimeout(function(){if(!window.__scrollFx)document.documentElement.classList.remove('js')},4000)",
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;800&display=swap"
        />
        <JsonLd data={organization} />
        {/* アクセス数の計測（Googleアナリティクス） */}
        {site.gaId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${site.gaId}');`,
              }}
            />
          </>
        )}
      </head>
      <body className="min-h-screen antialiased">
        <Intro />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2"
        >
          本文へ移動
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ScrollEffects />
        <BackToTop />
      </body>
    </html>
  );
}
