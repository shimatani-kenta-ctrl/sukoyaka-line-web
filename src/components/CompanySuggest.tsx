"use client";

import { useEffect, useId, useRef, useState } from "react";
import { site } from "@/config/site";

export type Houjin = { name: string; zip: string; prefecture: string; address: string };

/**
 * 会社名の入力欄（候補つき）。
 * 入力した名前で国税庁の法人番号データを検索し（フォームと同じGASを経由）、
 * 候補を選ぶと会社名を入れて onPick で郵便番号・住所を渡す。
 * 検索が使えないとき（IDの未設定・通信エラーなど）は、ふつうの入力欄として動く。
 */
export function CompanySuggest({
  id,
  name,
  className,
  onPick,
}: {
  id: string;
  name: string;
  className: string;
  onPick: (h: Houjin) => void;
}) {
  const [value, setValue] = useState("");
  const [items, setItems] = useState<Houjin[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [tick, setTick] = useState(0);
  const composing = useRef(false);
  const picked = useRef("");
  const seq = useRef(0);
  const listId = useId();

  useEffect(() => {
    const q = value.trim();
    if (q.length < 2 || composing.current || q === picked.current) {
      setItems([]);
      setOpen(false);
      return;
    }
    const n = ++seq.current;
    const t = window.setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`${site.formEndpoint}?action=houjin&q=${encodeURIComponent(q)}`);
        const json = (await res.json()) as { ok: boolean; items?: Houjin[] };
        if (n !== seq.current) return;
        const list = json.ok && json.items ? json.items : [];
        setItems(list);
        setActive(-1);
        setOpen(list.length > 0);
      } catch {
        if (n === seq.current) setOpen(false);
      } finally {
        if (n === seq.current) setLoading(false);
      }
    }, 450);
    return () => window.clearTimeout(t);
  }, [value, tick]);

  function pick(h: Houjin) {
    picked.current = h.name;
    setValue(h.name);
    setOpen(false);
    setItems([]);
    onPick(h);
  }

  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        autoComplete="organization"
        className={className}
        value={value}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={open && active >= 0 ? `${listId}-${active}` : undefined}
        onChange={(e) => setValue(e.target.value)}
        onCompositionStart={() => (composing.current = true)}
        onCompositionEnd={() => {
          // 変換を確定したら検索する
          composing.current = false;
          setTick((t) => t + 1);
        }}
        onBlur={() => window.setTimeout(() => setOpen(false), 150)}
        onFocus={() => items.length > 0 && setOpen(true)}
        onKeyDown={(e) => {
          if (!open) return;
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((a) => Math.min(items.length - 1, a + 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((a) => Math.max(0, a - 1));
          } else if (e.key === "Enter" && active >= 0) {
            e.preventDefault();
            pick(items[active]);
          } else if (e.key === "Escape") {
            setOpen(false);
          }
        }}
      />
      {loading && !open && <p className="mt-1.5 text-[12px] text-steel">候補を探しています…</p>}
      {open && (
        <div className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-sm border border-line bg-white shadow-lg">
          <p className="border-b border-line bg-mist px-3 py-2 text-[12px] text-steel">
            国税庁が公表している法人情報から候補を表示しています。該当するものを選ぶと、住所も入力されます。
          </p>
          <ul id={listId} role="listbox" className="max-h-72 overflow-y-auto">
            {items.map((h, i) => (
              <li
                key={`${h.name}-${h.address}-${i}`}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === active}
                onMouseDown={(e) => {
                  e.preventDefault();
                  pick(h);
                }}
                className={`cursor-pointer border-b border-line px-3 py-2.5 last:border-b-0 ${i === active ? "bg-sky-soft/40" : "hover:bg-mist"}`}
              >
                <span className="block text-[14px] text-ink">{h.name}</span>
                <span className="mt-0.5 block text-[12px] text-steel">
                  {h.prefecture}
                  {h.address}
                </span>
              </li>
            ))}
          </ul>
          <p className="border-t border-line px-3 py-2 text-[10.5px] leading-relaxed text-steel">
            このサービスは、国税庁法人番号システムWeb-API機能を利用して取得した情報をもとに作成しているが、サービスの内容は国税庁によって保証されたものではない
          </p>
        </div>
      )}
    </div>
  );
}
