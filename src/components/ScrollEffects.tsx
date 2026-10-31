"use client";

import { heroShuffleScript } from "@/lib/heroPhotos";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * スクロールの動きをまとめて管理します。
 *
 * - data-reveal          … 画面に入ったときにふわっと現れる（"up"・"left"・"right"・"scale"・"draw"）
 * - data-reveal-stagger  … 子要素を少しずつ時間差で現れさせる
 * - data-parallax="0.15" … スクロールに合わせてゆっくり動く（PCのみ）
 * - data-progress       … スクロールに合わせて線を伸ばし、届いた段階（data-progress-step）を点灯
 * - data-tilt           … マウスの位置に合わせて写真カードが少し傾き、光が当たる（マウス操作のPCのみ）
 *
 * JavaScriptが無効な環境や「視差効果を減らす」設定の方には、最初からすべて表示します。
 */
export function ScrollEffects() {
  const pathname = usePathname();
  const firstPath = useRef(true);

  // ページを移動したとき、新しいページをふわっと表示する（最初に開いたときは表示を遅らせない）
  useEffect(() => {
    if (firstPath.current) {
      firstPath.current = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const main = document.getElementById("main");
    main?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 550, easing: "cubic-bezier(0.2, 0.7, 0.2, 1)" });
  }, [pathname]);

  // 写真カード（data-tilt）：マウスの位置に合わせて少し傾け、光を当てる。マウス操作のPCのみ
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let active: HTMLElement | null = null;
    const reset = (el: HTMLElement) => {
      el.classList.remove("is-tilting");
      el.style.removeProperty("--rx");
      el.style.removeProperty("--ry");
    };
    const onMove = (e: PointerEvent) => {
      if (!fine.matches || reduce.matches || e.pointerType !== "mouse") return;
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-tilt]") ?? null;
      if (active && active !== el) reset(active);
      active = el;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      el.classList.add("is-tilting");
      el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
      el.style.setProperty("--rx", `${((0.5 - y) * 6).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${((x - 0.5) * 8).toFixed(2)}deg`);
    };
    const onLeave = () => {
      if (active) reset(active);
      active = null;
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

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
    // トップの見出し：スクロールに合わせて写真が右上のカードへ縮む（--p を 0→1）
    const heroPin = document.querySelector<HTMLElement>("[data-hero-pin]");
    // 別のページからトップへ移動してきたときも、写真をランダムに選び直す
    if (heroPin && !heroPin.dataset.shuffled) {
      const w = window as unknown as { __heroShuffle?: () => void };
      if (w.__heroShuffle) w.__heroShuffle();
      else new Function(heroShuffleScript)();
    }
    // 育成ロードマップなど：スクロールに合わせて線を伸ばし、線が届いた段階を点灯させる
    const progressBoxes = Array.from(document.querySelectorAll<HTMLElement>("[data-progress]"));
    if (reduce) {
      progressBoxes.forEach((box) => {
        box.style.setProperty("--sp", "1");
        box.querySelectorAll("[data-progress-step]").forEach((s) => s.classList.add("is-reached"));
      });
    }
    const updateProgress = (vh: number) => {
      if (reduce) return;
      progressBoxes.forEach((box) => {
        const rect = box.getBoundingClientRect();
        if (rect.bottom < -vh || rect.top > vh * 2) return;
        // 箱の上端が画面の下から2割の位置に来たら伸び始め、下端が画面の下から3割の位置に来たら伸びきる
        const start = vh * 0.8;
        const end = vh * 0.7;
        const sp = Math.min(1, Math.max(0, (start - rect.top) / Math.max(1, rect.height - end + start)));
        box.style.setProperty("--sp", sp.toFixed(4));
        const track = box.querySelector<HTMLElement>("[data-progress-track]");
        if (!track) return;
        const t = track.getBoundingClientRect();
        const horizontal = t.width > t.height;
        const len = horizontal ? t.width : t.height;
        box.querySelectorAll<HTMLElement>("[data-progress-step]").forEach((step) => {
          const node = step.querySelector<HTMLElement>("[data-progress-node]") ?? step;
          const n = node.getBoundingClientRect();
          const pos = horizontal ? n.left + n.width / 2 - t.left : n.top + n.height / 2 - t.top;
          step.classList.toggle("is-reached", pos <= sp * len + 2);
        });
      });
    };
    // ページの地の色：画面の中ほどにある部分の色へ、ゆっくり切り替える
    const pageBg = document.querySelector<HTMLElement>("[data-page-bg]");
    const bgParts = Array.from(document.querySelectorAll<HTMLElement>("[data-bg]"));
    let currentBg = "";
    const desktop = window.matchMedia("(min-width: 768px)");
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const vh = window.innerHeight;
      updateProgress(vh);
      if (pageBg && bgParts.length) {
        let next = bgParts[0].dataset.bg ?? "";
        for (const el of bgParts) {
          if (el.getBoundingClientRect().top < vh * 0.55) next = el.dataset.bg ?? next;
        }
        if (next !== currentBg) {
          currentBg = next;
          pageBg.dataset.color = next;
        }
      }
      if (heroPin) {
        const raw = Math.min(1, Math.max(0, y / (vh * 0.45)));
        const p = raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2; // なめらかに加速・減速
        heroPin.style.setProperty("--p", p.toFixed(4));
        heroPin.classList.toggle("is-light", p > 0.5);
      }
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
    if (parallax.length || marquees.length || heroPin || pageBg || progressBoxes.length) {
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
