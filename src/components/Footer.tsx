import Link from "next/link";
import { fullAddress, site, telHref } from "@/config/site";
import { Logo } from "./Logo";

export function Footer() {
  const c = site.company;
  return (
    <footer className="bg-ink-deep text-white/80">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-[1.2fr_1fr] md:px-8">
        <div>
          <Logo light size="lg" />
          <address className="mt-6 space-y-1 text-[13px] not-italic leading-relaxed">
            <p>
              〒{c.postalCode} {fullAddress}
            </p>
            <p>
              TEL{" "}
              <a href={telHref} className="hover:text-sky">
                {c.tel}
              </a>
            </p>
            <p>
              Mail{" "}
              <a href={`mailto:${c.email}`} className="break-all hover:text-sky">
                {c.email}
              </a>
            </p>
          </address>
        </div>
        <nav aria-label="フッターメニュー">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-[13px]">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-sky">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy/" className="hover:text-sky">
                個人情報の取り扱い
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-5 text-[11px] text-white/50 md:px-8">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
