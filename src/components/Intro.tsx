"use client";

import { useEffect } from "react";

/**
 * トップページを開いたときのオープニング（ロゴと会社名）。
 * 表示するかどうかは layout.tsx の <head> 内のスクリプトが決めます
 * （トップページ・ブラウザを開いてから初めての表示・「視差効果を減らす」設定でない場合だけ）。
 */

const HOLD_MS = 2100;
const EXIT_MS = 850;

export function Intro() {
  useEffect(() => {
    const d = document.documentElement;
    if (!d.classList.contains("intro")) return;
    try {
      sessionStorage.setItem("introSeen", "1");
    } catch {
      /* 保存できなくても表示には影響しない */
    }
    const t1 = window.setTimeout(() => {
      d.classList.remove("intro-hold");
      d.classList.add("intro-out");
    }, HOLD_MS);
    const t2 = window.setTimeout(() => {
      d.classList.remove("intro", "intro-out");
    }, HOLD_MS + EXIT_MS);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  return (
    <div id="intro" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-mark-light.svg" alt="" width={148} height={154} className="intro-mark" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-text-light.svg" alt="" width={169} height={15} className="intro-text" />
      <span className="intro-name">株式会社健やかライン</span>
      <span className="intro-line" />
    </div>
  );
}
