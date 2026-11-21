import type { Metadata } from "next";
import { processSteps } from "@/content/site";
import { breadcrumbJsonLd, imageFile, pageMetadata } from "@/lib/seo";
import { PhotoHero } from "@/components/photo-hero";
import { ProcessSticky } from "@/components/process-sticky";
import { CtaBand } from "@/components/cta-band";
import { QuoteButton } from "@/components/quote-button";
import { JsonLd } from "@/components/json-ld";

const image = { src: "/images/atmos-machine-02.jpg", alt: "Close-up of a knitting machine head with yarn feeds", width: 1800, height: 1200 };

export const metadata: Metadata = pageMetadata({
  title: "How We Work | Sock Sourcing Process, Sample to Shipment",
  description:
    "Our 7-step sourcing process for socks and sweaters: inquiry, sampling, costing, production, quality control, packaging and export shipping from Tirupur, India.",
  path: "/how-we-work/",
  keywords: ["sock sourcing process", "private label socks sampling", "sourcing agent India process"],
  image: imageFile(image.src),
});

export default function HowWeWorkPage() {
  return (
    <>
      <PhotoHero
        image={image}
        size="medium"
        eyebrow="How we work"
        lines={["From first email", <em key="e" className="text-accent-soft">to export shipment.</em>]}
        lead="Seven steps. For each one, what we do and what you get from us. Lead times depend on product, quantity and season, so we set them per order."
      >
        <QuoteButton />
      </PhotoHero>
      <nav aria-label="Process steps" className="container-x pt-12 lg:hidden">
        <ol className="flex flex-wrap gap-2 text-sm">
          {processSteps.map((s, i) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="inline-flex min-h-11 items-center rounded-full border border-line px-4 py-2 hover:border-ink">
                {i + 1}. {s.name}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <section className="container-x py-16 md:py-28" aria-label="The seven steps">
        <ProcessSticky />
      </section>
      <CtaBand title="Start with step one." body="Send your brief. We reply with questions and a sampling plan." />
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "How we work", path: "/how-we-work/" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How Duo Socks n Sweaters sources an order",
            step: processSteps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.name, text: s.summary })),
          },
        ]}
      />
    </>
  );
}
