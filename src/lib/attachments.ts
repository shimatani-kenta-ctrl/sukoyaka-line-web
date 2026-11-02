/**
 * フォームの添付ファイル（見積もり依頼で使用）。
 * お問い合わせフォームと同じ決まり：3点まで、写真は送る前に縮小、それ以外は1点8MBまで、合計20MBまで。
 * 受信側（gas/Code.gs）は files: [{ name, type, data(base64) }] を受け取り、ドライブ保存と通知メールへの添付を行う。
 */
export const MAX_FILES = 3;
export const MAX_FILE_BYTES = 8 * 1024 * 1024;
export const MAX_TOTAL_BYTES = 20 * 1024 * 1024;
export const FILE_ACCEPT = "image/*,.pdf,.doc,.docx,.xls,.xlsx";

export type Attachment = { name: string; type: string; size: number; data: string };

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

export async function toAttachment(file: File): Promise<Attachment> {
  const isImage = file.type.startsWith("image/") && !file.type.includes("svg");
  const blob = isImage ? await shrinkImage(file) : file;
  const name = isImage && blob !== file ? file.name.replace(/\.[^.]+$/, "") + ".jpg" : file.name;
  return { name, type: blob.type || file.type || "application/octet-stream", size: blob.size, data: await readAsBase64(blob) };
}

export const formatSize = (n: number) =>
  n >= 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)}MB` : `${Math.max(1, Math.round(n / 1024))}KB`;
