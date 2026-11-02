import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";
import { GoogleMap } from "@/components/GoogleMap";
import { fullAddress, site, telHref } from "@/config/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "お問い合わせ・お見積り（配管工事・協力会社・採用）",
  description: `${site.name}へのお問い合わせ・お見積りのご依頼はこちら。配管工事、機器据付、協力会社のご相談、採用へのご応募も受け付けています。`,
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="お問い合わせ"
        lead="工事のご依頼・お見積り、協力会社のご相談、採用へのご応募はこちらから。"
        path="/contact/"
      />
      <section className="py-16 md:py-24">
        <Container className="grid gap-14 lg:grid-cols-[1fr_320px] lg:gap-16">
          <div>
            <p className="mb-10 text-[15px] text-steel">
              内容を確認のうえ、担当者よりご連絡いたします。図面や写真がある場合は、返信メールにてお送りください。
            </p>
            <ContactForm />
          </div>

          <aside data-reveal="right" className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            <div className="bg-ink px-6 py-8 text-white">
              <p className="text-[13px] text-sky">お急ぎの方はお電話で</p>
              <a href={telHref} className="mt-2 block font-display text-[26px] tracking-[0.06em] hover:text-sky">
                {site.company.tel}
              </a>
              <p className="mt-4 text-[13px] text-white/70">
                現場に出ていて出られない場合は、折り返しご連絡します。
              </p>
            </div>
            <Link href="/estimate/" className="block border border-ai px-6 py-5 text-ai transition-colors hover:bg-ai hover:text-white">
              <span className="block text-[12px]">工事内容を選ぶだけ・約1分</span>
              <span className="mt-1 block text-[16px] font-medium">かんたん見積もり依頼はこちら</span>
            </Link>
            <div className="text-[14px]">
              <p className="font-medium">メール</p>
              <a href={`mailto:${site.company.email}`} className="mt-1 block break-all text-ai underline underline-offset-4">
                {site.company.email}
              </a>
            </div>
            <div className="text-[14px]">
              <p className="font-medium">所在地</p>
              <p className="mt-1 text-steel">
                〒{site.company.postalCode}
                <br />
                {fullAddress}
              </p>
              <GoogleMap className="mt-4 aspect-square w-full" />
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
