/**
 * 株式会社健やかライン お問い合わせフォーム受信スクリプト
 *
 * ホームページのフォームから送られた内容を
 *   1. このスプレッドシートの「お問い合わせ」シートに1行ずつ記録し
 *   2. 通知メールを NOTIFY_TO に送り
 *   3. お客様に自動返信メールを送ります
 *
 * 設置方法は「公開手順.md」の手順3を参照してください。
 * ※このスクリプトを書き換えたら、「デプロイ」→「デプロイを管理」→ 編集 →「新バージョン」で更新してください。
 */

// ▼ 通知を受け取るメールアドレス（カンマ区切りで複数可）
const NOTIFY_TO = "shimatani-kenta@sukoyaka-line.com";

// ▼ 自動返信を送るかどうか
const SEND_AUTO_REPLY = true;

const COMPANY = "株式会社健やかライン";
const SIGNATURE = [
  "──────────────────",
  "株式会社健やかライン",
  "代表取締役　島谷 健太",
  "所在地：兵庫県尼崎市昭和南通7-180-1-602",
  "TEL：080-9123-7037",
  "Mail：shimatani-kenta@sukoyaka-line.com",
  "──────────────────",
].join("\n");

const SHEET_NAME = "お問い合わせ";
const HEADERS = [
  "受信日時", "種類", "会社名", "お名前", "メール", "電話番号",
  "郵便番号", "都道府県", "住所", "内容", "送信ページ",
];

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents || "{}");

    // スパム対策：見えない欄に入力があれば無視
    if (d.website) return json({ ok: true });
    if (!d.name || !d.email || !d.message) return json({ ok: false, error: "missing" });

    const now = new Date();
    const row = [
      Utilities.formatDate(now, "Asia/Tokyo", "yyyy/MM/dd HH:mm"),
      s(d.type), s(d.company), s(d.name), s(d.email), s(d.tel),
      s(d.zip), s(d.prefecture), s(d.address), s(d.message), s(d.page),
    ];

    const sheet = getSheet();
    sheet.appendRow(row);

    // 社内通知
    const body = HEADERS.map(function (h, i) { return "■" + h + "\n" + (row[i] || "（未入力）"); }).join("\n\n");
    MailApp.sendEmail({
      to: NOTIFY_TO,
      replyTo: s(d.email),
      subject: "【HP問い合わせ】" + s(d.type) + "／" + s(d.company) + " " + s(d.name) + "様",
      body: "ホームページからお問い合わせがありました。\nこのメールに返信すると、お客様宛てに送れます。\n\n" + body
        + "\n\n記録先：" + SpreadsheetApp.getActiveSpreadsheet().getUrl(),
    });

    // 自動返信
    if (SEND_AUTO_REPLY) {
      MailApp.sendEmail({
        to: s(d.email),
        replyTo: NOTIFY_TO.split(",")[0],
        name: COMPANY,
        subject: "【" + COMPANY + "】お問い合わせを受け付けました",
        body: s(d.name) + " 様\n\n"
          + "このたびは" + COMPANY + "にお問い合わせいただき、ありがとうございます。\n"
          + "以下の内容で受け付けました。内容を確認のうえ、担当者よりご連絡いたします。\n"
          + "お急ぎの場合は、お電話（080-9123-7037）でもお受けしています。\n\n"
          + "■お問い合わせの種類\n" + s(d.type) + "\n\n"
          + "■お問い合わせ内容\n" + s(d.message) + "\n\n"
          + "※このメールは自動でお送りしています。このメールにご返信いただくと、担当者に届きます。\n"
          + "お心当たりのない場合は、お手数ですが削除してください。\n\n"
          + SIGNATURE,
      });
    }

    return json({ ok: true });
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: String(err) });
  }
}

/** 動作確認用：ウェブアプリのURLをブラウザで開くと「OK」と表示されます */
function doGet() {
  return ContentService.createTextOutput("OK");
}

/** 初回に一度だけ実行：メール送信とシートの権限を許可するため */
function setup() {
  getSheet();
  MailApp.getRemainingDailyQuota();
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold").setBackground("#EAF4FA");
    sheet.setColumnWidth(10, 400);
  }
  return sheet;
}

function s(v) {
  return v == null ? "" : String(v).slice(0, 5000);
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
