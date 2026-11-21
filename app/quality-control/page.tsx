import Image from "next/image";
import type { Metadata } from "next";
import { qcChecks } from "@/content/site";
import { breadcrumbJsonLd, imageFile, pageMetadata } from "@/lib/seo";
import { PhotoHero } from "@/components/photo-hero";
import { Reveal, RevealItem } from "@/components/reveal";
import { CtaBand } from "@/components/cta-band";
import { QuoteButton } from "@/components/quote-button";
import { JsonLd } from "@/components/json-ld";

const image = { src: "/images/atmos-qc-01.jpg", alt: "Measuring tape used for garment size checks", width: 1800, height: 1200 };

export const metadata: Metadata = pageMetadata({
  title: "Quality Control | Independent Sock Inspection in India",
  description:
    "Five QC checkpoints on every order: yarn and material check, inline inspection, measurement and size check, final random inspection and packing check.",
  path: "/quality-control/",
  keywords: ["sock quality inspection India", "independent QC textiles Tirupur", "socks pre-shipment inspection"],
  image: imageFile(image.src),
});

export default function QualityControlPage() {
  return (
    <>
      <PhotoHero
        image={image}
        size="medium"
        eyebrow="Quality control"
        lines={["Inspected by us,", <em key="e" className="text-accent-soft">not by the factory.</em>]}
        lead="Our QC team works for you. They check your order at five points, from yarn to sealed carton, and report what they find with photos."
      >
        <QuoteButton />
      </PhotoHero>

      <section className="container-x py-20 md:py-32" aria-labelledby="checks">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow">Five checkpoints</p>
              <h2 id="checks" className="mt-5 text-h1">From yarn to <em>sealed carton.</em></h2>
              <div className="relative mt-10 hidden aspect-[4/5] overflow-hidden rounded-[22px] lg:block">
                <Image src="/images/atmos-yarn-01.jpg" alt="Cones of yarn before knitting" fill sizes="30vw" className="object-cover" />
              </div>
            </div>
          </div>
          <Reveal as="ol" className="lg:col-span-7 lg:col-start-6">
            {qcChecks.map((q, i) => (
              <RevealItem as="li" key={q.id} className="border-t border-line py-10 first:border-ink md:py-12">
                <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                  <h3 className="flex items-baseline gap-5 text-h2">
                    <span className="font-display text-2xl text-accent italic" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="sr-only">Checkpoint {i + 1}: </span>
                      {q.name}
                    </span>
                  </h3>
                  <p className="text-sm font-semibold tracking-[0.12em] text-accent-strong uppercase">{q.when}</p>
                </div>
                <ul className="mt-6 grid gap-3 text-lead text-muted md:grid-cols-2 md:pl-12">
                  {q.what.map((w) => (
                    <li key={w} className="flex gap-3">
                      <span className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
                      {w}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="on-dark bg-ink text-paper" aria-labelledby="reports">
        <div className="container-x grid gap-10 py-24 md:grid-cols-2 md:py-32">
          <div>
            <p className="eyebrow">What you see</p>
            <h2 id="reports" className="mt-5 text-h1">A report at each checkpoint. <em className="text-accent-soft">A clear go or no-go.</em></h2>
          </div>
          <div className="space-y-5 text-lead text-paper/85 md:pt-16">
            <p>Each inspection ends with a written report and photos. If something is off, you hear it from us first, with what we found and what the factory will do about it.</p>
            <p>Goods ship only after the final random inspection and packing check are passed, or after you decide how to proceed.</p>
          </div>
        </div>
      </section>

      <CtaBand />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Quality control", path: "/quality-control/" }])} />
    </>
  );
}
