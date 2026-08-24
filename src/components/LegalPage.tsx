import Container from "./Container";
import PageHeader from "./PageHeader";
import { LEGAL_REVIEW_NOTICE } from "@/content/legal";

type Doc = {
  headline: string;
  intro: string;
  updated: string;
  sections: { heading: string; body: string[] }[];
};

export default function LegalPage({ doc }: { doc: Doc }) {
  return (
    <>
      <PageHeader eyebrow={`Last updated ${doc.updated}`} headline={doc.headline} intro={doc.intro} />

      <section className="bg-bone">
        <Container width="prose" className="py-14 sm:py-18">
          {LEGAL_REVIEW_NOTICE ? (
            <p className="mb-10 border-l-2 border-clay bg-clay-wash px-4 py-3 text-[0.88rem] text-body-soft">
              {LEGAL_REVIEW_NOTICE}
            </p>
          ) : null}

          <div className="flex flex-col gap-10">
            {doc.sections.map((section) => (
              <div key={section.heading} className="flex flex-col gap-3">
                <h2 className="text-[1.25rem]">{section.heading}</h2>
                {section.body.map((para) => (
                  <p key={para} className="text-body">
                    {para}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
