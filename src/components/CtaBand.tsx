import Container from "./Container";
import Button from "./Button";
import { site } from "@/content/site";

type Props = {
  headline?: string;
  body?: string;
};

export default function CtaBand({
  headline = "Come and see the office before you commit to anything.",
  body = "Book a visit, take a day pass, or send us an enquiry and we will tell you plainly whether we can do what you need.",
}: Props) {
  return (
    <section className="border-t border-rule-dark bg-ink text-on-dark">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div className="flex flex-col gap-4">
            <p className="label text-on-dark-soft">Next step</p>
            <h2 className="max-w-[24ch] text-[clamp(1.6rem,3.6vw,2.4rem)]">
              {headline}
            </h2>
            <p className="max-w-[54ch] text-on-dark-soft">{body}</p>
          </div>
          <div className="flex flex-col gap-3">
            <Button href="/contact" variant="solid">
              Send an enquiry
            </Button>
            <Button href={site.contact.viberHref} variant="onDark" external>
              Chat on Viber
            </Button>
            <a
              href={site.contact.landlineHref}
              className="text-center text-[0.88rem] text-on-dark-soft transition-colors hover:text-on-dark"
            >
              or call {site.contact.landline}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
