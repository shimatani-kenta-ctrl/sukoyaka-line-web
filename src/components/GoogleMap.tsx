import { site } from "@/config/site";

/** Googleマップの埋め込み（APIキー不要） */
export function GoogleMap({ className = "" }: { className?: string }) {
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(site.company.mapQuery)}&z=16&hl=ja&output=embed`;
  return (
    <div className={`relative overflow-hidden bg-mist ${className}`}>
      <iframe
        title={`${site.name}の所在地（Googleマップ）`}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full border-0 grayscale-[30%]"
        allowFullScreen
      />
    </div>
  );
}

export function mapLinkUrl() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.company.mapQuery)}`;
}
