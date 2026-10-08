"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * スクロールの動きをまとめて管理します。
 *
 * - data-reveal          … 画面に入ったときにふわっと現れる（"up"・"left"・"right"・"scale"・"draw"）
 * - data-reveal-stagger  … 子要素を少しずつ時間差で現れさせる
 * - data-parallax="0.15" … スクロールに合わせてゆっくり動く（PCのみ）
 *
 * JavaScriptが無効な環境や「視差効果を減らす」設定の方には、最初からすべて表示します。
 */
export function ScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    (window as Window & { __scrollFx?: boolean }).__scrollFx = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 時間差グループの子要素に、遅延と reveal 属性を付ける
    document.querySelectorAll<HTMLElement>("[data-reveal-stagger]").forEach((group) => {
      const step = Number(group.dataset.revealStagger) || 110;
      Array.from(group.children).forEach((child, i) => {
        const el = child as HTMLElement;
        if (!el.dataset.reveal) el.dataset.reveal = "up";
        el.style.setProperty("--reveal-delay", `${i * step}ms`);
      });
    });

    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)"));

    if (reduce || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    targets.forEach((el) => io.observe(el));

    // 絞り込みなどであとから表示された要素も、同じように監視する
    const mo = new MutationObserver((records) => {
      for (const r of records) {
        r.addedNodes.forEach((n) => {
          if (!(n instanceof HTMLElement)) return;
          const found = [
            ...(n.matches("[data-reveal]") ? [n] : []),
            ...Array.from(n.querySelectorAll<HTMLElement>("[data-reveal]")),
          ];
          found.forEach((el) => !el.classList.contains("is-visible") && io.observe(el));
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // 視差（PCのみ）
    const parallax = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const desktop = window.matchMedia("(min-width: 768px)");
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!desktop.matches) {
        parallax.forEach((el) => (el.style.transform = ""));
        return;
      }
      const y = window.scrollY;
      parallax.forEach((el) => {
        const speed = Number(el.dataset.parallax) || 0.15;
        el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    if (parallax.length) {
      window.addEventListener("scroll", onScroll, { passive: true });
      update();
    }

    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return null;
}
