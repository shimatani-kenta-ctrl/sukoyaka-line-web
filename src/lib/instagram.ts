/**
 * Instagram の投稿をビルド時に取得します（任意機能）。
 * 環境変数 INSTAGRAM_ACCESS_TOKEN が設定されているときだけ動き、
 * 未設定・取得失敗のときは空配列を返します（サイトは壊れません）。
 *
 * 使用API: Instagram API with Instagram Login（ビジネス／クリエイターアカウントが必要）
 */
export type InstaPost = {
  id: string;
  permalink: string;
  image: string;
  caption: string;
  timestamp: string;
};

type ApiItem = {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
};

export async function getInstagramPosts(limit = 9): Promise<InstaPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return [];

  const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
  const url = `https://graph.instagram.com/me/media?fields=${fields}&limit=${limit}&access_token=${encodeURIComponent(token)}`;

  try {
    const res = await fetch(url, { cache: "force-cache" });
    if (!res.ok) {
      console.warn(`[instagram] 取得に失敗しました: ${res.status}`);
      return [];
    }
    const json = (await res.json()) as { data?: ApiItem[] };
    return (json.data ?? [])
      .map((item) => ({
        id: item.id,
        permalink: item.permalink,
        image: (item.media_type === "VIDEO" ? item.thumbnail_url : item.media_url) ?? "",
        caption: item.caption ?? "",
        timestamp: item.timestamp,
      }))
      .filter((p) => p.image);
  } catch (e) {
    console.warn("[instagram] 取得エラー", e);
    return [];
  }
}
