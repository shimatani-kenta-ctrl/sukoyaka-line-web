"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { site } from "@/config/site";
import {
  FILE_ACCEPT,
  MAX_FILES,
  MAX_FILE_BYTES,
  MAX_TOTAL_BYTES,
  formatSize,
  toAttachment,
  type Attachment,
} from "@/lib/attachments";

/**
 * 簡単見積もり依頼。
 * 工事の内容・規模・時期をボタンで選ぶと、お問い合わせフォームと同じ受信先
 * （スプレッドシート「HPお問い合わせ」＋通知メール＋自動返信）に「簡単見積もり依頼」として届く。
 * 金額はこの画面では出さない（内容を確認してから、工事一式のお見積りをお出しする）。
 *
 * 選択肢を変えたいときは、下の QUESTIONS を書き換えてください。
 */
type Question = {
  id: string;
  label: string;
  note?: string;
  multi?: boolean;
  options: string[];
};

type Step = { title: string; questions: Question[] };

const STEPS: Step[] = [
  {
    title: "ご依頼の内容",
    questions: [
      {
        id: "work",
        label: "どんな工事ですか？",
        note: "いくつでも選べます",
        multi: true,
        options: [
          "配管の新設・増設",
          "配管の更新・改修",
          "機器の据付と周辺配管",
          "架台の製作・据付",
          "溶接工事",
          "その他・まだ決まっていない",
        ],
      },
      {
        id: "fluid",
        label: "どんな設備・配管ですか？",
        note: "いくつでも選べます",
        multi: true,
        options: ["蒸気", "冷却水・工業用水", "エア", "薬剤・薬液", "空調設備", "消火設備", "その他・わからない"],
      },
    ],
  },
  {
    title: "工事の規模",
    questions: [
      {
        id: "size",
        label: "配管の太さ（口径）の目安",
        options: ["25A以下", "32A〜50A", "65A〜100A", "125A以上", "いろいろ混ざっている", "わからない"],
      },
      {
        id: "length",
        label: "配管の長さの目安",
        options: ["10m未満", "10〜50m", "50〜100m", "100m以上", "わからない"],
      },
      {
        id: "material",
        label: "配管の材質",
        note: "いくつでも選べます",
        multi: true,
        options: ["鋼管（白管・黒管など）", "ステンレス", "塩ビ・樹脂", "銅管", "わからない"],
      },
    ],
  },
  {
    title: "時期と条件",
    questions: [
      {
        id: "timing",
        label: "工事のご希望時期",
        options: ["できるだけ早く", "1か月以内", "1〜3か月以内", "3か月以上先", "未定"],
      },
      {
        id: "shutdown",
        label: "工場・設備の休止期間に合わせる必要はありますか？",
        options: ["あり", "なし", "わからない"],
      },
      {
        id: "drawing",
        label: "図面はありますか？",
        options: ["図面あり", "手書きのメモ・写真のみ", "なし"],
      },
    ],
  },
];

const PREFS = ["兵庫県", "大阪府", "京都府", "奈良県", "滋賀県", "和歌山県", "その他"];
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || site.formEndpoint;
const TOTAL = STEPS.length + 1; // 最後は連絡先

type Answers = Record<string, string[]>;
type SendState = "idle" | "sending" | "sent" | "error";

const allQuestions = STEPS.flatMap((s) => s.questions);

export function EstimateForm() {
  const topRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [missing, setMissing] = useState<string[]>([]);
  const [send, setSend] = useState<SendState>("idle");
  const [from, setFrom] = useState("");
  const [files, setFiles] = useState<Attachment[]>([]);
  const [fileMsg, setFileMsg] = useState("");
  const [fileBusy, setFileBusy] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ?from=instagram などで、どこから来たかを記録する
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setFrom(p.get("from") || p.get("utm_source") || "");
  }, []);

  function toggle(q: Question, option: string) {
    setMissing((m) => m.filter((id) => id !== q.id));
    setAnswers((prev) => {
      const cur = prev[q.id] ?? [];
      if (!q.multi) return { ...prev, [q.id]: [option] };
      return { ...prev, [q.id]: cur.includes(option) ? cur.filter((o) => o !== option) : [...cur, option] };
    });
  }

  function scrollTop() {
    requestAnimationFrame(() => {
      const top = (topRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    });
  }

  function next() {
    const lack = STEPS[step].questions.filter((q) => !(answers[q.id]?.length)).map((q) => q.id);
    if (lack.length) {
      setMissing(lack);
      document.getElementById(`q-${lack[0]}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setMissing([]);
    setStep((s) => s + 1);
    scrollTop();
  }

  function back() {
    setMissing([]);
    setStep((s) => Math.max(0, s - 1));
    scrollTop();
  }

  async function onAddFiles(list: FileList | null) {
    if (!list || list.length === 0) return;
    setFileMsg("");
    const room = MAX_FILES - files.length;
    const picked = Array.from(list).slice(0, room);
    if (list.length > room) setFileMsg(`添付できるのは${MAX_FILES}点までです。`);
    setFileBusy(true);
    const added: Attachment[] = [];
    for (const f of picked) {
      const a = await toAttachment(f);
      if (a.size > MAX_FILE_BYTES) {
        setFileMsg(`「${f.name}」は大きすぎるため添付できません（1点${formatSize(MAX_FILE_BYTES)}まで）。`);
        continue;
      }
      added.push(a);
    }
    const nextFiles = [...files, ...added];
    if (nextFiles.reduce((t, a) => t + a.size, 0) > MAX_TOTAL_BYTES) {
      setFileMsg(`添付ファイルの合計は${formatSize(MAX_TOTAL_BYTES)}までです。`);
    } else {
      setFiles(nextFiles);
    }
    setFileBusy(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (data.website) return; // スパム対策（人には見えない欄）
    if (fileBusy) return;
    if (!ENDPOINT) {
      setSend("error");
      return;
    }

    const lines = [
      "【簡単見積もり依頼の内容】",
      ...allQuestions.map((q) => `${q.label}：${(answers[q.id] ?? []).join("、") || "（未選択）"}`),
      `工事場所：${data.prefecture}${data.city ? " " + data.city : ""}`,
      "",
      "補足・ご要望：",
      data.message || "（未入力）",
      ...(from ? ["", `（このページに来たきっかけ：${from}）`] : []),
    ];

    setSend("sending");
    try {
      await fetch(ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          type: "簡単見積もり依頼",
          company: data.company ?? "",
          name: data.name,
          email: data.email,
          tel: data.tel ?? "",
          zip: "",
          prefecture: data.prefecture,
          address: data.city ?? "",
          message: lines.join("\n"),
          page: window.location.href,
          ...(files.length ? { files: files.map(({ name, type, data }) => ({ name, type, data })) } : {}),
        }),
      });
      setSend("sent");
      // アクセス解析：見積もり依頼の送信を記録（個人情報は送らない）
      const w = window as unknown as { gtag?: (...args: unknown[]) => void };
      w.gtag?.("event", "generate_lead", { form_type: "estimate", source: from || "direct" });
      scrollTop();
    } catch {
      setSend("error");
    }
  }

  if (send === "sent") {
    return (
      <div ref={topRef} role="status" className="border-t-[3px] border-ai bg-white px-6 py-12 md:px-12">
        <h2 className="text-2xl">見積もりのご依頼を受け付けました</h2>
        <p className="mt-4 text-[15px] text-steel">
          ありがとうございます。内容を確認のうえ、担当者よりご連絡いたします。
          受付のメールをお送りしていますので、追加の図面や写真がある場合は、そのメールにご返信のうえ添付してください。
        </p>
        <Link href="/works/" className="mt-8 inline-block text-[14px] text-ai underline underline-offset-4">
          施工事例を見る
        </Link>
      </div>
    );
  }

  const isContact = step === STEPS.length;
  const input =
    "mt-2 block w-full rounded-sm border border-line bg-white px-4 py-3 text-base outline-none transition-colors placeholder:text-steel/50 focus:border-ai focus:ring-2 focus:ring-sky-soft";
  const label = "block text-[14px] font-medium";
  const req = <span className="ml-2 text-[11px] font-normal text-ai">必須</span>;

  return (
    <div ref={topRef}>
      {/* 進み具合 */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-[13px]">
          <span className="font-medium text-ai">
            {step + 1} / {TOTAL}　{isContact ? "ご連絡先" : STEPS[step].title}
          </span>
          <span className="text-steel">約1分で完了</span>
        </div>
        <div className="mt-3 h-[6px] w-full overflow-hidden rounded-full bg-mist" aria-hidden="true">
          <div className="h-full bg-sky transition-[width] duration-500" style={{ width: `${((step + 1) / TOTAL) * 100}%` }} />
        </div>
      </div>

      {!isContact && (
        <div className="space-y-10">
          {STEPS[step].questions.map((q) => {
            const selected = answers[q.id] ?? [];
            const isMissing = missing.includes(q.id);
            return (
              <fieldset key={q.id} id={`q-${q.id}`}>
                <legend className="text-[16px] font-medium">
                  {q.label}
                  {q.note && <span className="ml-2 text-[12px] font-normal text-steel">{q.note}</span>}
                </legend>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {q.options.map((o) => {
                    const on = selected.includes(o);
                    return (
                      <button
                        key={o}
                        type="button"
                        role={q.multi ? "checkbox" : "radio"}
                        aria-checked={on}
                        onClick={() => toggle(q, o)}
                        className={`flex min-h-12 items-center gap-3 rounded-sm border px-4 py-3 text-left text-[15px] transition-colors ${
                          on ? "border-ai bg-mist text-ink" : "border-line bg-white hover:border-sky"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`flex h-5 w-5 shrink-0 items-center justify-center border ${
                            q.multi ? "rounded-[3px]" : "rounded-full"
                          } ${on ? "border-ai bg-ai text-white" : "border-steel/50 bg-white"}`}
                        >
                          {on && (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M2 6.5 L5 9 L10 3" stroke="currentColor" strokeWidth="1.8" />
                            </svg>
                          )}
                        </span>
                        {o}
                      </button>
                    );
                  })}
                </div>
                {isMissing && (
                  <p role="alert" className="mt-2 text-[13px] text-ai">
                    ひとつ以上選んでください。
                  </p>
                )}
              </fieldset>
            );
          })}

          <div className="flex items-center justify-between gap-4 border-t border-line pt-8">
            {step > 0 ? (
              <button type="button" onClick={back} className="min-h-12 px-2 text-[15px] text-steel underline underline-offset-4">
                戻る
              </button>
            ) : (
              <span />
            )}
            <button
              type="button"
              onClick={next}
              className="inline-flex min-h-12 items-center rounded-sm bg-ai px-8 text-[15px] tracking-[0.1em] text-white transition-colors hover:bg-ai-bright"
            >
              次へ進む
            </button>
          </div>
        </div>
      )}

      {isContact && (
        <form onSubmit={onSubmit} className="space-y-8">
          {/* 選んだ内容の確認 */}
          <div className="bg-mist px-5 py-6 md:px-8">
            <p className="text-[14px] font-medium">選んだ内容</p>
            <dl className="mt-4 space-y-2 text-[14px]">
              {allQuestions.map((q) => (
                <div key={q.id} className="grid gap-1 sm:grid-cols-[220px_1fr]">
                  <dt className="text-steel">{q.label}</dt>
                  <dd>{(answers[q.id] ?? []).join("、")}</dd>
                </div>
              ))}
            </dl>
            <button
              type="button"
              onClick={() => {
                setStep(0);
                scrollTop();
              }}
              className="mt-4 text-[13px] text-ai underline underline-offset-4"
            >
              内容を直す
            </button>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <label htmlFor="est-prefecture" className={label}>
                工事場所（都道府県）{req}
              </label>
              <select id="est-prefecture" name="prefecture" required defaultValue="" className={input}>
                <option value="" disabled>
                  選んでください
                </option>
                {PREFS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="est-city" className={label}>
                工事場所（市区町村）
              </label>
              <input id="est-city" name="city" className={input} placeholder="尼崎市" />
            </div>
            <div>
              <label htmlFor="est-company" className={label}>
                会社名・団体名
              </label>
              <input id="est-company" name="company" autoComplete="organization" className={input} />
            </div>
            <div>
              <label htmlFor="est-name" className={label}>
                お名前{req}
              </label>
              <input id="est-name" name="name" autoComplete="name" required className={input} placeholder="山田 太郎" />
            </div>
            <div>
              <label htmlFor="est-email" className={label}>
                メールアドレス{req}
              </label>
              <input
                id="est-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                className={input}
                placeholder="example@company.co.jp"
              />
            </div>
            <div>
              <label htmlFor="est-tel" className={label}>
                電話番号
              </label>
              <input id="est-tel" name="tel" type="tel" inputMode="tel" autoComplete="tel" className={input} placeholder="06-1234-5678" />
            </div>
          </div>

          <div>
            <label htmlFor="est-message" className={label}>
              補足・ご要望
            </label>
            <textarea
              id="est-message"
              name="message"
              rows={5}
              className={input}
              placeholder="例：〇月の連休中に、ポンプ更新に合わせて周辺配管も入れ替えたい"
            />
          </div>

          {/* 添付ファイル */}
          <div>
            <p className={label}>
              図面・写真などの添付
              <span className="ml-2 text-[12px] font-normal text-steel">{MAX_FILES}点まで</span>
            </p>
            <p className="mt-1 text-[13px] text-steel">
              図面、現場や機器の写真、仕様書などがあれば添付してください（写真・PDF・Word・Excel、1点{formatSize(MAX_FILE_BYTES)}まで）。写真は自動で小さくして送ります。
            </p>
            {files.length > 0 && (
              <ul className="mt-4 space-y-2">
                {files.map((f, i) => (
                  <li key={`${f.name}-${i}`} className="flex items-center justify-between gap-3 rounded-sm border border-line bg-white px-4 py-3 text-[14px]">
                    <span className="min-w-0 truncate">
                      {f.name}
                      <span className="ml-2 text-[12px] text-steel">{formatSize(f.size)}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setFiles((cur) => cur.filter((_, j) => j !== i))}
                      className="shrink-0 text-[13px] text-ai underline underline-offset-4"
                    >
                      取り消す
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {files.length < MAX_FILES && (
              <label className="mt-4 flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-sm border border-dashed border-ai bg-white px-4 py-3 text-[15px] text-ai transition-colors hover:bg-mist">
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 3 V15 M3 9 H15" stroke="currentColor" strokeWidth="1.6" />
                </svg>
                {fileBusy ? "読み込んでいます…" : `ファイルを選ぶ（あと${MAX_FILES - files.length}点）`}
                <input
                  ref={fileInputRef}
                  type="file"
                  name="attachments"
                  accept={FILE_ACCEPT}
                  multiple
                  disabled={fileBusy}
                  onChange={(e) => void onAddFiles(e.target.files)}
                  className="sr-only"
                />
              </label>
            )}
            {fileMsg && (
              <p role="alert" className="mt-2 text-[13px] text-ai">
                {fileMsg}
              </p>
            )}
          </div>

          {/* スパム対策（人には見えない欄） */}
          <div aria-hidden="true" className="hidden">
            <label>
              ウェブサイト
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <p className="text-[13px] text-steel">
            送信いただいた内容は、
            <Link href="/privacy/" className="text-ai underline underline-offset-4">
              個人情報の取り扱い
            </Link>
            に沿って取り扱います。
          </p>

          {send === "error" && (
            <p role="alert" className="text-[14px] text-ai">
              送信できませんでした。お手数ですが、メール（{site.company.email}）でご連絡ください。
            </p>
          )}

          <div className="flex items-center justify-between gap-4 border-t border-line pt-8">
            <button type="button" onClick={back} className="min-h-12 px-2 text-[15px] text-steel underline underline-offset-4">
              戻る
            </button>
            <button
              type="submit"
              disabled={send === "sending" || fileBusy}
              className="inline-flex min-h-12 items-center rounded-sm bg-ai px-8 text-[15px] tracking-[0.1em] text-white transition-colors hover:bg-ai-bright disabled:opacity-60"
            >
              {send === "sending" ? "送信しています…" : "見積もりを依頼する"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
