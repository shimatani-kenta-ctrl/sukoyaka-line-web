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

    // 数字のカウントアップ（例: 月給「30」万円）
    const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-count-to]"));
    const countIo = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          countIo.unobserve(e.target);
          const el = e.target as HTMLElement;
          const to = Number(el.dataset.countTo) || 0;
          const dur = 1400;
          const t0 = performance.now();
          const tick = (now: number) => {
            const k = Math.min(1, (now - t0) / dur);
            const eased = 1 - Math.pow(1 - k, 3);
            el.textContent = String(Math.round(to * eased));
            if (k < 1) requestAnimationFrame(tick);
          };
          el.textContent = "0";
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.6 },
    );
    counters.forEach((el) => countIo.observe(el));

    // 視差（PCのみ）と、横に流れる文字
    const parallax = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const marquees = Array.from(document.querySelectorAll<HTMLElement>("[data-marquee]"));
    const desktop = window.matchMedia("(min-width: 768px)");
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const vh = window.innerHeight;
      parallax.forEach((el) => {
        if (!desktop.matches) {
          el.style.transform = "";
          return;
        }
        const speed = Number(el.dataset.parallax) || 0.15;
        el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
      });
      marquees.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) return;
        const speed = Number(el.dataset.marquee) || 0.35;
        const base = -el.scrollWidth * 0.25;
        el.style.transform = `translate3d(${base - (vh - rect.top) * speed}px, 0, 0)`;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    if (parallax.length || marquees.length) {
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      update();
    }

    return () => {
      io.disconnect();
      mo.disconnect();
      countIo.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return null;
}
