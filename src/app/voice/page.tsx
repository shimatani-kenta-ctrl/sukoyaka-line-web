import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Container, SampleBadge } from "@/components/ui";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/config/site";
import { voices } from "@/data/voices";

export const metadata: Metadata = {
  title: "お客様の声",
  description: `${site.name}に配管工事・機器据付をご依頼いただいたお客様からの声をご紹介します。`,
  alternates: { canonical: "/voice/" },
};

export default function VoicePage() {
  return (
    <>
      <PageHero
        title="お客様の声"
        lead="工事をご依頼いただいたお客様から、いただいた言葉をご紹介します。順次追加していきます。"
        path="/voice/"
      />
      <section className="py-16 md:py-24">
        <Container>
          <ul className="space-y-6 md:space-y-8">
            {voices.map((v, i) => (
              <li key={i} data-reveal={i % 2 === 1 ? "right" : "left"}>
                <figure
                  className={`grid gap-6 bg-white px-6 py-10 md:grid-cols-[220px_1fr] md:gap-12 md:px-12 md:py-14 ${
                    i % 2 === 1 ? "md:ml-16" : "md:mr-16"
                  } border-t-[3px] border-ai`}
                >
                  <figcaption className="text-[14px]">
                    <p className="font-display text-lg">{v.who}</p>
                    {v.role && <p className="mt-1 text-steel">{v.role}</p>}
                    <p className="mt-4 inline-block bg-mist px-2 py-0.5 text-[13px]">{v.work}</p>
                    {v.sample && (
                      <p className="mt-3">
                        <SampleBadge />
                      </p>
                    )}
                  </figcaption>
                  <div>
                    <blockquote className="font-display text-[17px] leading-[2.2] tracking-[0.05em] md:text-lg">
                      {v.body}
                    </blockquote>
                    {v.workSlug && (
                      <Link
                        href={`/works/#${v.workSlug}`}
                        className="mt-5 inline-block text-[14px] text-ai underline underline-offset-4"
                      >
                        この工事の施工事例を見る
                      </Link>
                    )}
                  </div>
                </figure>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
