import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/ui";
import { fullAddress, site } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}｜尼崎の配管工事・プラント配管・設備工事`,
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
    title: `${site.name}｜尼崎の配管工事・プラント配管・設備工事`,
    description: site.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0e2a47",
  width: "device-width",
  initialScale: 1,
};

const organization = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "@id": `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  logo: `${site.url}/logo.png`,
  image: `${site.url}/og.png`,
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
  founder: { "@type": "Person", name: site.company.representative },
  knowsAbout: [...site.company.business],
  ...(site.instagram.profileUrl ? { sameAs: [site.instagram.profileUrl] } : {}),
  hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Shippori+Mincho+B1:wght@500;600;700&display=swap"
        />
        <JsonLd data={organization} />
      </head>
      <body className="min-h-screen antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2"
        >
          本文へ移動
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
