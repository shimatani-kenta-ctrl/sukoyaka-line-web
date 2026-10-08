# 株式会社健やかライン 企業ホームページ

Next.js 15 / TypeScript / Tailwind CSS v4（静的書き出し）

公開のしかた・差し替える箇所は **[公開手順.md](./公開手順.md)** を見てください。

```
src/
  config/site.ts      会社情報・メニュー・Instagram設定（まずここを編集）
  data/works.ts       施工事例
  data/voices.ts      お客様の声
  data/jobs.ts        募集要項
  app/                各ページ（トップ・会社概要・施工事例・お客様の声・採用情報・お問い合わせ・Instagram）
  components/         部品（ヘッダー、フォーム、地図など）
gas/Code.gs           お問い合わせフォームの受信スクリプト（Google Apps Script）
```

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # out/ に静的HTMLを出力
```
