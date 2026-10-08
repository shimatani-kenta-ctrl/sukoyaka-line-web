import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="py-28 md:py-40">
      <Container className="max-w-2xl">
        <h1 className="text-3xl md:text-4xl">ページが見つかりません</h1>
        <p className="mt-6 text-[15px] text-steel">
          お探しのページは移動したか、削除された可能性があります。トップページからお探しください。
        </p>
        <div className="mt-10">
          <ButtonLink href="/">トップページへ戻る</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
