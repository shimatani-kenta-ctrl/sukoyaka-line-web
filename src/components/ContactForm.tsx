"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { site, telHref } from "@/config/site";

const PREFECTURES = [
  "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県", "茨城県", "栃木県", "群馬県",
  "埼玉県", "千葉県", "東京都", "神奈川県", "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県",
  "岐阜県", "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県",
  "鳥取県", "島根県", "岡山県", "広島県", "山口県", "徳島県", "香川県", "愛媛県", "高知県", "福岡県",
  "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県",
];

export const INQUIRY_TYPES = [
  { value: "construction", label: "工事のご依頼・お見積り" },
  { value: "partner", label: "協力会社・お取引のご相談" },
  { value: "recruit", label: "採用・応募" },
  { value: "other", label: "その他" },
] as const;

type ZipState = { kind: "idle" | "loading" | "found" | "notfound" | "error"; message?: string };
type SendState = "idle" | "sending" | "sent" | "error";

const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || site.formEndpoint;

/** 添付ファイル：3点まで。写真は送る前に縮小、それ以外は1点8MBまで */
const MAX_FILES = 3;
const MAX_FILE_BYTES = 8 * 1024 * 1024;
const MAX_TOTAL_BYTES = 20 * 1024 * 1024;
const FILE_ACCEPT = "image/*,.pdf,.doc,.docx,.xls,.xlsx";
type Attachment = { name: string; type: string; size: number; data: string };

function readAsBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(",")[1] ?? "");
    r.onerror = () => reject(r.error);
    r.readAsDataURL(blob);
  });
}

/** 写真は長い辺2000pxのJPEGに縮小して送る（スマホの写真でも重くならないように） */
async function shrinkImage(file: File): Promise<Blob> {
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, 2000 / Math.max(bmp.width, bmp.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    canvas.getContext("2d")?.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, "image/jpeg", 0.85));
    return blob && blob.size < file.size ? blob : file;
  } catch {
    return file;
  }
}

async function toAttachment(file: File): Promise<Attachment> {
  const isImage = file.type.startsWith("image/") && !file.type.includes("svg");
  const blob = isImage ? await shrinkImage(file) : file;
  const name = isImage && blob !== file ? file.name.replace(/\.[^.]+$/, "") + ".jpg" : file.name;
  return { name, type: blob.type || file.type || "application/octet-stream", size: blob.size, data: await readAsBase64(blob) };
}

const formatSize = (n: number) => (n >= 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)}MB` : `${Math.max(1, Math.round(n / 1024))}KB`);

const toHalfWidth = (v: string) =>
  v.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0)).replace(/[ー－‐−]/g, "-");

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<string>("construction");
  const [zip, setZip] = useState("");
  const [prefecture, setPrefecture] = useState("");
  const [address, setAddress] = useState("");
  const [zipState, setZipState] = useState<ZipState>({ kind: "idle" });
  const [send, setSend] = useState<SendState>("idle");
  const [experience, setExperience] = useState("");
  const [files, setFiles] = useState<Attachment[]>([]);
  const [fileMsg, setFileMsg] = useState("");
  const [fileBusy, setFileBusy] = useState(false);
  const isRecruit = type === "recruit";
  const lastLookup = useRef("");

  // ?type=recruit などで種別を初期選択
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("type");
    if (t && INQUIRY_TYPES.some((i) => i.value === t)) setType(t);
  }, []);

  async function lookup(raw: string) {
    const digits = toHalfWidth(raw).replace(/\D/g, "");
    if (digits.length !== 7) {
      setZipState({ kind: "notfound", message: "郵便番号は7桁で入力してください。" });
      return;
    }
    if (lastLookup.current === digits) return;
    lastLookup.current = digits;
    setZipState({ kind: "loading", message: "住所を検索しています…" });
    try {
      const res = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${digits}`);
      const json = (await res.json()) as {
        results: { address1: string; address2: string; address3: string }[] | null;
      };
      const hit = json.results?.[0];
      if (!hit) {
        lastLookup.current = "";
        setZipState({ kind: "notfound", message: "該当する住所が見つかりません。番号をご確認いただくか、直接入力してください。" });
        return;
      }
      setPrefecture(hit.address1);
      setAddress(`${hit.address2}${hit.address3}`);
      setZipState({ kind: "found", message: "住所を入力しました。続けて番地・建物名を入力してください。" });
      requestAnimationFrame(() => {
        const el = addressRef.current;
        if (el) {
          el.focus();
          el.setSelectionRange(el.value.length, el.value.length);
        }
      });
    } catch {
      lastLookup.current = "";
      setZipState({ kind: "error", message: "住所の自動入力ができませんでした。お手数ですが直接入力してください。" });
    }
  }

  function onZipChange(v: string) {
    setZip(v);
    const digits = toHalfWidth(v).replace(/\D/g, "");
    if (digits.length === 7) void lookup(digits);
    else if (zipState.kind !== "idle") setZipState({ kind: "idle" });
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
    const next = [...files, ...added];
    if (next.reduce((t, a) => t + a.size, 0) > MAX_TOTAL_BYTES) {
      setFileMsg(`添付ファイルの合計は${formatSize(MAX_TOTAL_BYTES)}までです。`);
    } else {
      setFiles(next);
    }
    setFileBusy(false);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (data.website) return; // スパム対策（人には見えない欄）

    if (!ENDPOINT) {
      setSend("error");
      return;
    }

    setSend("sending");
    try {
      const typeLabel = INQUIRY_TYPES.find((i) => i.value === data.type)?.label ?? data.type;
      delete data.attachments;
      let payload: Record<string, unknown> = { ...data, type: typeLabel, page: window.location.href };
      if (data.type === "recruit") {
        // 応募の項目は「内容」にまとめて送る（受信側のスプレッドシート・メールはそのまま使える）
        const exp = data.experience === "経験あり" ? `経験あり（${data.experienceYears}）` : data.experience;
        const lines = [
          `ふりがな：${data.kana}`,
          `年齢：${data.age}歳`,
          `経験：${exp}`,
          `普通自動車免許：${data.license}`,
          `お持ちの資格：${data.qualifications || "（未入力）"}`,
          `お住まいの市区町村：${data.city || "（未入力）"}`,
          `面談の希望日時：${data.interviewDate || "（未入力）"}`,
          "",
          "ご質問・自己PR：",
          data.message || "（未入力）",
        ];
        payload = { ...payload, address: data.city ?? "", message: lines.join("\n") };
      }
      if (files.length) payload.files = files.map(({ name, type, data }) => ({ name, type, data }));
      await fetch(ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      setSend("sent");
      // アクセス解析：お問い合わせの送信を記録（個人情報は送らない）
      const w = window as unknown as { gtag?: (...args: unknown[]) => void };
      w.gtag?.("event", "generate_lead", { form_type: data.type });
      form.reset();
      setZip("");
      setPrefecture("");
      setAddress("");
      setExperience("");
      setFiles([]);
      setFileMsg("");
      setZipState({ kind: "idle" });
      window.scrollTo({ top: (formRef.current?.offsetTop ?? 0) - 100, behavior: "smooth" });
    } catch {
      setSend("error");
    }
  }

  if (send === "sent") {
    return (
      <div role="status" className="border-t-[3px] border-ai bg-white px-6 py-12 md:px-12">
        <h2 className="text-2xl">送信しました</h2>
        <p className="mt-4 text-[15px] text-steel">
          お問い合わせありがとうございます。内容を確認のうえ、担当者よりご連絡いたします。
          お急ぎの場合はお電話（
          <a href={telHref} className="text-ai underline underline-offset-4">
            {site.company.tel}
          </a>
          ）でもお受けしています。
        </p>
        <button
          type="button"
          onClick={() => setSend("idle")}
          className="mt-8 inline-flex min-h-12 items-center rounded-sm border border-ai px-7 text-ai hover:bg-ai hover:text-white"
        >
          別の内容を送る
        </button>
      </div>
    );
  }

  const label = "block text-[14px] font-medium";
  const input =
    "mt-2 block w-full rounded-sm border border-line bg-white px-4 py-3 text-base outline-none transition-colors placeholder:text-steel/50 focus:border-ai focus:ring-2 focus:ring-sky-soft";
  const req = <span className="ml-2 text-[11px] font-normal text-ai">必須</span>;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate={false} className="space-y-8">
      <fieldset>
        <legend className={label}>お問い合わせの種類{req}</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {INQUIRY_TYPES.map((t) => (
            <label
              key={t.value}
              className={`flex cursor-pointer items-center gap-3 rounded-sm border px-4 py-3 text-[15px] transition-colors ${
                type === t.value ? "border-ai bg-mist" : "border-line bg-white hover:border-sky"
              }`}
            >
              <input
                type="radio"
                name="type"
                value={t.value}
                checked={type === t.value}
                onChange={() => setType(t.value)}
                className="h-4 w-4 accent-[#003479]"
                required
              />
              {t.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-8 md:grid-cols-2">
        {!isRecruit && (
          <div>
            <label htmlFor="company" className={label}>
              会社名・団体名
            </label>
            <input id="company" name="company" autoComplete="organization" className={input} />
          </div>
        )}
        <div>
          <label htmlFor="name" className={label}>
            お名前{req}
          </label>
          <input id="name" name="name" autoComplete="name" required className={input} placeholder="山田 太郎" />
        </div>
        {isRecruit && (
          <>
            <div>
              <label htmlFor="kana" className={label}>
                ふりがな{req}
              </label>
              <input id="kana" name="kana" required className={input} placeholder="やまだ たろう" />
            </div>
            <div>
              <label htmlFor="age" className={label}>
                年齢{req}
              </label>
              <div className="mt-2 flex items-center gap-2">
                <input
                  id="age"
                  name="age"
                  type="number"
                  inputMode="numeric"
                  min={15}
                  max={99}
                  required
                  className={`${input} mt-0 max-w-[120px]`}
                  placeholder="25"
                />
                <span className="text-[15px]">歳</span>
              </div>
            </div>
          </>
        )}
        <div>
          <label htmlFor="email" className={label}>
            メールアドレス{req}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            className={input}
            placeholder={isRecruit ? "example@gmail.com" : "example@company.co.jp"}
          />
        </div>
        <div>
          <label htmlFor="tel" className={label}>
            電話番号{isRecruit && req}
          </label>
          <input
            id="tel"
            name="tel"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required={isRecruit}
            className={input}
            placeholder={isRecruit ? "090-1234-5678" : "06-1234-5678"}
          />
        </div>
      </div>

      {!isRecruit && (
      <div className="border-t border-line pt-8">
        <p className="text-[14px] font-medium">ご住所・工事場所</p>
        <p className="mt-1 text-[13px] text-steel">郵便番号を入れると、住所が自動で入力されます。</p>
        <div className="mt-4 grid gap-6 md:grid-cols-[220px_1fr]">
          <div>
            <label htmlFor="zip" className={label}>
              郵便番号
            </label>
            <div className="mt-2 flex gap-2">
              <input
                id="zip"
                name="zip"
                inputMode="numeric"
                autoComplete="postal-code"
                maxLength={8}
                value={zip}
                onChange={(e) => onZipChange(e.target.value)}
                className={`${input} mt-0`}
                placeholder="660-0882"
                aria-describedby="zip-status"
              />
              <button
                type="button"
                onClick={() => {
                  lastLookup.current = "";
                  void lookup(zip);
                }}
                className="shrink-0 rounded-sm border border-ai px-3 text-[13px] text-ai hover:bg-ai hover:text-white"
              >
                検索
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="prefecture" className={label}>
              都道府県
            </label>
            <select
              id="prefecture"
              name="prefecture"
              autoComplete="address-level1"
              value={prefecture}
              onChange={(e) => setPrefecture(e.target.value)}
              className={input}
            >
              <option value="">選択してください</option>
              {PREFECTURES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p
          id="zip-status"
          aria-live="polite"
          className={`mt-2 min-h-[1.5em] text-[13px] ${
            zipState.kind === "found" ? "text-ai" : zipState.kind === "loading" ? "text-steel" : "text-[#b4232a]"
          }`}
        >
          {zipState.message ?? ""}
        </p>
        <div className="mt-2">
          <label htmlFor="address" className={label}>
            市区町村・番地・建物名
          </label>
          <input
            ref={addressRef}
            id="address"
            name="address"
            autoComplete="street-address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={input}
            placeholder="尼崎市昭和南通7-180-1"
          />
        </div>
      </div>
      )}

      {isRecruit && (
        <div className="space-y-8 border-t border-line pt-8">
          <fieldset>
            <legend className={label}>経験の有無{req}</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {["未経験", "経験あり"].map((v) => (
                <label
                  key={v}
                  className={`flex cursor-pointer items-center gap-3 rounded-sm border px-4 py-3 text-[15px] transition-colors ${
                    experience === v ? "border-ai bg-mist" : "border-line bg-white hover:border-sky"
                  }`}
                >
                  <input
                    type="radio"
                    name="experience"
                    value={v}
                    checked={experience === v}
                    onChange={() => setExperience(v)}
                    required
                    className="h-4 w-4 accent-[#003479]"
                  />
                  {v}
                </label>
              ))}
            </div>
            {experience === "経験あり" && (
              <div className="mt-4">
                <label htmlFor="experienceYears" className={label}>
                  経験年数・内容{req}
                </label>
                <input
                  id="experienceYears"
                  name="experienceYears"
                  required
                  className={input}
                  placeholder="例：配管工として3年、TIG溶接の経験あり"
                />
              </div>
            )}
          </fieldset>

          <fieldset>
            <legend className={label}>普通自動車免許{req}</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {["あり", "なし", "取得予定"].map((v) => (
                <label
                  key={v}
                  className="flex cursor-pointer items-center gap-3 rounded-sm border border-line bg-white px-4 py-3 text-[15px] transition-colors hover:border-sky has-[:checked]:border-ai has-[:checked]:bg-mist"
                >
                  <input type="radio" name="license" value={v} required className="h-4 w-4 accent-[#003479]" />
                  {v}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <label htmlFor="qualifications" className={label}>
                お持ちの資格
              </label>
              <input id="qualifications" name="qualifications" className={input} placeholder="例：玉掛け、ガス溶接" />
            </div>
            <div>
              <label htmlFor="city" className={label}>
                お住まいの市区町村
              </label>
              <input id="city" name="city" autoComplete="address-level2" className={input} placeholder="例：尼崎市" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="interviewDate" className={label}>
                面談の希望日時
              </label>
              <input
                id="interviewDate"
                name="interviewDate"
                className={input}
                placeholder="例：平日の夕方、10月20日以降の土曜 など"
              />
            </div>
          </div>
        </div>
      )}

      <div className="border-t border-line pt-8">
        <label htmlFor="message" className={label}>
          {isRecruit ? "ご質問・自己PR" : <>お問い合わせ内容{req}</>}
        </label>
        <textarea
          id="message"
          name="message"
          required={!isRecruit}
          rows={isRecruit ? 5 : 7}
          className={input}
          placeholder={
            isRecruit
              ? "気になること、仕事への思いなど、自由にご記入ください"
              : "工事の内容、場所、ご希望の時期、図面の有無など、分かる範囲でご記入ください"
          }
        />
      </div>

      {/* 添付ファイル（任意・3点まで） */}
      <div className="border-t border-line pt-8">
        <p className={label}>
          添付ファイル<span className="ml-2 text-[11px] font-normal text-steel">任意・{MAX_FILES}点まで</span>
        </p>
        <p className="mt-1 text-[13px] text-steel">
          {isRecruit
            ? "履歴書・資格証の写真などがあれば添付してください。"
            : "図面・現場の写真・仕様書などがあれば添付してください。"}
          写真・PDF・Word・Excelに対応しています。
        </p>
        {files.length > 0 && (
          <ul className="mt-4 space-y-2">
            {files.map((f, i) => (
              <li key={`${f.name}-${i}`} className="flex items-center gap-3 rounded-sm border border-line bg-white px-4 py-3 text-[14px]">
                <span className="min-w-0 flex-1 truncate">{f.name}</span>
                <span className="shrink-0 text-[12px] text-steel">{formatSize(f.size)}</span>
                <button
                  type="button"
                  onClick={() => setFiles(files.filter((_, j) => j !== i))}
                  className="shrink-0 text-[13px] text-ai underline underline-offset-4"
                  aria-label={`${f.name}を取り消す`}
                >
                  取消
                </button>
              </li>
            ))}
          </ul>
        )}
        {files.length < MAX_FILES && (
          <label className="mt-4 inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-sm border border-ai px-5 text-[14px] text-ai hover:bg-ai hover:text-white">
            <span aria-hidden="true">＋</span>
            {fileBusy ? "読み込み中…" : "ファイルを選ぶ"}
            <input
              type="file"
              name="attachments"
              multiple
              accept={FILE_ACCEPT}
              className="sr-only"
              disabled={fileBusy}
              onChange={(e) => {
                void onAddFiles(e.target.files);
                e.target.value = "";
              }}
            />
          </label>
        )}
        {fileMsg && (
          <p role="alert" className="mt-2 text-[13px] text-[#b4232a]">
            {fileMsg}
          </p>
        )}
      </div>

      {/* スパム対策：人には見えない欄 */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">ウェブサイト</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex items-start gap-3 text-[14px]">
        <input type="checkbox" name="agree" value="同意する" required className="mt-1.5 h-4 w-4 accent-[#003479]" />
        <span>
          <Link href="/privacy/" className="text-ai underline underline-offset-4" target="_blank">
            個人情報の取り扱い
          </Link>
          に同意する{req}
        </span>
      </label>

      {send === "error" && (
        <p role="alert" className="border-l-[3px] border-[#b4232a] bg-white px-4 py-3 text-[14px] text-[#b4232a]">
          {ENDPOINT
            ? "送信できませんでした。通信環境をご確認のうえ、もう一度お試しください。"
            : "現在フォームから送信できません。"}
          お手数ですが、お電話（{site.company.tel}）またはメール（{site.company.email}）でご連絡ください。
        </p>
      )}

      <button
        type="submit"
        disabled={send === "sending" || fileBusy}
        className="flex min-h-14 w-full items-center justify-center rounded-sm bg-ai text-[16px] tracking-[0.15em] text-white transition-colors hover:bg-ai-bright disabled:opacity-60 md:w-80"
      >
        {send === "sending" ? "送信しています…" : "内容を送信する"}
      </button>
    </form>
  );
}
