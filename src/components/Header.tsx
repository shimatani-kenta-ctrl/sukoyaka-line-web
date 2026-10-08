"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site, telHref } from "@/config/site";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href.replace(/\/$/, ""));

  const navItems = site.nav.filter((n) => n.href !== "/" && n.href !== "/contact/");

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-porcelain">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-20 md:px-8">
        <Link href="/" aria-label={`${site.name} トップページ`}>
          <Logo />
        </Link>

        <nav aria-label="メインメニュー" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-[14px]">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`relative py-2 transition-colors hover:text-ai ${
                    isActive(item.href)
                      ? "text-ai after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-ai"
                      : "text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact/"
                className="inline-flex items-center rounded-sm bg-ai px-5 py-2.5 text-white transition-colors hover:bg-ai-bright"
              >
                お問い合わせ
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={telHref}
            className="flex h-10 items-center rounded-sm border border-ai px-3 text-[13px] text-ai"
            aria-label={`電話をかける ${site.company.tel}`}
          >
            電話
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] rounded-sm bg-ink"
          >
            <span className="sr-only">{open ? "メニューを閉じる" : "メニューを開く"}</span>
            <span
              className={`block h-px w-5 bg-white transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-5 bg-white transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-ink text-white lg:hidden"
      >
        <nav aria-label="モバイルメニュー" className="px-6 py-8">
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="flex items-center justify-between py-4 font-serif text-lg tracking-[0.12em]"
                >
                  {item.label}
                  <span aria-hidden="true" className="h-px w-6 bg-sky" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 space-y-3 text-sm">
            <a href={telHref} className="block rounded-sm bg-white py-3.5 text-center text-ink">
              電話する {site.company.tel}
            </a>
            <Link href="/contact/" className="block rounded-sm border border-sky py-3.5 text-center text-sky">
              フォームで問い合わせる
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
