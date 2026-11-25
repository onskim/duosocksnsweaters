import Image from "next/image";
import type { Metadata } from "next";
import { regions, site, stats } from "@/content/site";
import { breadcrumbJsonLd, imageFile, pageMetadata } from "@/lib/seo";
import { PhotoHero } from "@/components/photo-hero";
import { Reveal, RevealItem } from "@/components/reveal";
import { Statement } from "@/components/statement";
import { CtaBand } from "@/components/cta-band";
import { Counter } from "@/components/counter";
import { JsonLd } from "@/components/json-ld";

const image = { src: "/images/atmos-tirupur-01.jpg", alt: "Rows of coloured yarn", width: 1800, height: 1200 };

export const metadata: Metadata = pageMetadata({
  title: "About Us | Sock and Sweater Sourcing Partner, Tirupur",
  description:
    "Duo Socks n Sweaters is a sourcing and export partner in Tirupur, India, with 15+ years in textiles and a network of 7 vetted partner factories.",
  path: "/about/",
  keywords: ["sourcing agent Tirupur", "sock sourcing company India", "textile sourcing partner India"],
  image: imageFile(image.src),
});

const model = [
  { title: "You brief us", body: "One conversation about product, quantity, quality level, packaging and market." },
  { title: "We match the factory", body: "We place the product with the partner factory whose machines, yarns and experience suit it best." },
  { title: "We manage and inspect", body: "We follow sampling and production, and our own QC team inspects at set checkpoints." },
  { title: "We ship", body: "We handle packing checks and export documents, and coordinate with your forwarder." },
];

export default function AboutPage() {
  return (
    <>
      <PhotoHero
        image={image}
        size="medium"
        eyebrow="About"
        lines={["A sourcing partner in", <em key="e" className="text-accent-soft">India&apos;s knitwear hub.</em>]}
        lead={`${site.name} sources socks and sweaters for brands, retailers and wholesalers in India and abroad, from Tirupur.`}
      />

      <section className="container-x py-20 md:py-32" aria-labelledby="model">
        <div className="grid gap-10 lg:grid-cols-12">
          <h2 className="eyebrow self-start font-sans tracking-[0.22em] lg:col-span-3" id="model">The sourcing model</h2>
          <Statement
            className="font-display text-statement lg:col-span-9"
            text="Every factory has a sweet spot. One runs fine-gauge dress socks well. Another is set up for heavy terry. A third handles compression yarns. We place each product where it fits, and we stay independent enough to inspect it honestly."
          />
        </div>
        <Reveal as="ol" className="mt-20 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {model.map((s, i) => (
            <RevealItem as="li" key={s.title} className="border-t border-ink pt-6">
              <span className="font-display text-4xl text-accent italic" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-h3">{s.title}</h3>
              <p className="mt-3 text-muted">{s.body}</p>
            </RevealItem>
          ))}
        </Reveal>
      </section>

      <section className="on-dark bg-ink text-paper" aria-labelledby="network">
        <div className="container-x grid gap-14 py-24 md:py-32 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[22px]">
              <Image src="/images/atmos-machine-01.jpg" alt="Circular knitting machine" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
            <p className="mt-3 text-xs text-paper/60">Representative photo. Not a photo of a specific partner factory.</p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="eyebrow">The factory network</p>
            <h2 id="network" className="mt-5 text-h1">7 vetted <em className="text-accent-soft">partner factories.</em></h2>
            <p className="mt-6 max-w-xl text-lead text-paper/85">
              Every factory in the network is vetted by our team before it receives an order. Together they give buyers capacity of 500,000+ pieces a month, across every sock category and a range of sweater styles.
            </p>
            <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10">
              {stats.map((s) => (
                <li key={s.label} className="border-t border-paper/20 pt-5">
                  <p className="font-display text-5xl leading-none md:text-6xl"><Counter value={s.value} suffix={s.suffix} /></p>
                  <p className="mt-3 text-sm text-paper/75">{s.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-x grid gap-12 py-20 md:py-32 lg:grid-cols-12" aria-labelledby="markets">
        <div className="lg:col-span-5">
          <p className="eyebrow">Markets served</p>
          <h2 id="markets" className="mt-5 text-h1">Domestic and <em>international.</em></h2>
          <p className="mt-6 max-w-md text-lead text-muted">We work with brands on private label, with retailers on own-brand ranges, and with wholesalers on volume programmes.</p>
        </div>
        <ul className="lg:col-span-6 lg:col-start-7">
          {regions.map((r) => (
            <li key={r.id} className="flex items-baseline justify-between gap-6 border-t border-line py-5 first:border-ink">
              <span className="font-display text-3xl">{r.name}</span>
              <span className="text-right text-sm text-muted">{r.note}</span>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about/" }])} />
    </>
  );
}
