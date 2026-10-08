import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import { InstagramFeed, InstagramFollowButton } from "@/components/InstagramFeed";
import { site } from "@/config/site";
import { getInstagramPosts } from "@/lib/instagram";

export const metadata: Metadata = {
  title: "Instagram",
  description: `${site.name}の公式Instagram。配管工事の現場の様子や、職人たちの日常を発信しています。`,
  alternates: { canonical: "/instagram/" },
};

const topics = [
  { title: "現場の様子", body: "配管が組み上がっていく過程や、溶接の手元を紹介しています。" },
  { title: "職人の一日", body: "朝礼から片付けまで、現場で働くメンバーの日常をお届けします。" },
  { title: "採用の情報", body: "募集のお知らせも、Instagramでお届けします。" },
];

export default async function InstagramPage() {
  const posts = await getInstagramPosts(12);
  return (
    <>
      <PageHero
        title="Instagram"
        lead="現場の様子や職人たちの日常を、写真と動画で発信しています。"
        path="/instagram/"
      />
      <section className="py-16 md:py-24">
        <Container>
          <div data-reveal-stagger="140" className="grid gap-10 md:grid-cols-3">
            {topics.map((t) => (
              <div key={t.title} className="border-t border-ink/20 pt-5">
                <h2 className="text-lg">{t.title}</h2>
                <p className="mt-2 text-[14px] text-steel">{t.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <InstagramFollowButton />
          </div>
        </Container>
      </section>

      <section className="bg-mist py-16 md:py-24">
        <Container>
          <SectionHeading title="最近の投稿" />
          <div data-reveal className="mt-10">
            <InstagramFeed posts={posts} limit={12} />
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-xl">投稿を見て、働いてみたいと思った方へ。</p>
          <ButtonLink href="/recruit/">採用情報を見る</ButtonLink>
        </Container>
      </section>
    </>
  );
}
