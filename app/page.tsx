import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { featuredCategories, sockCategories, sweaterCategories } from "@/content/products";
import { heroImage, qcChecks, site, stats, whatsappHref, whySourcing } from "@/content/site";
import { imageFile, pageMetadata } from "@/lib/seo";
import { PhotoHero } from "@/components/photo-hero";
import { QuoteButton } from "@/components/quote-button";
import { Magnetic } from "@/components/magnetic";
import { Counter } from "@/components/counter";
import { Marquee } from "@/components/marquee";
import { Statement } from "@/components/statement";
import { Reveal, RevealItem } from "@/components/reveal";
import { ProcessTimeline } from "@/components/process-timeline";
import { CategoryCard } from "@/components/category-card";
import { Rail } from "@/components/rail";
import { WorldMap } from "@/components/world-map";
import { CtaBand } from "@/components/cta-band";
import { Parallax } from "@/components/parallax";
import { ArrowRight, WhatsApp } from "@/components/icons";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Private Label Socks Supplier India | Duo Socks n Sweaters",
    description:
      "Sock and sweater sourcing partner in Tirupur, India. 7 vetted partner factories, independent QC and export handled. Private label for brands, retailers and wholesalers.",
    path: "/",
    keywords: ["private label socks supplier India", "socks sourcing agent Tirupur", "sock supplier for brands", "sweater sourcing India"],
    image: imageFile(heroImage.src),
  }),
  title: { absolute: "Private Label Socks Supplier India | Duo Socks n Sweaters" },
};

const bento = [
  "lg:col-span-6 lg:row-span-2",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-3",
];

export default function HomePage() {
  const moreSocks = sockCategories.filter((c) => !c.featured);

  return (
    <>
      <PhotoHero
        image={heroImage}
        eyebrow={`Sourcing and export partner · ${site.location.city}, India`}
        lines={["One partner.", <em key="f" className="text-accent-soft">7 factories.</em>, "Every order inspected."]}
        lead="We source socks and sweaters from vetted factories in Tirupur and manage your order from first sample to export shipment."
      >
        <QuoteButton />
        <Magnetic>
          <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            <WhatsApp /> Chat on WhatsApp
          </a>
        </Magnetic>
      </PhotoHero>

      <Marquee items={[...sockCategories.map((c) => `${c.label} socks`), ...sweaterCategories.slice(0, 6).map((c) => c.label)]} className="border-b border-line" />

      {/* INTRO + STATS */}
      <section className="container-x py-24 md:py-36" aria-labelledby="intro-title">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="eyebrow" id="intro-title">Who we are</p>
          </div>
          <div className="lg:col-span-9">
            <Statement
              className="font-display text-statement"
              text="We are a sourcing and export partner, not a factory. We manage a network of 7 vetted partner factories, place each product with the one that makes it best, and inspect every order ourselves before it ships."
            />
            <Link href="/about/" className="group mt-10 inline-flex items-center gap-3 font-semibold">
              <span className="link-underline">How our model works</span>
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
        <Reveal as="ul" className="mt-20 grid grid-cols-2 gap-x-6 gap-y-10 md:mt-28 lg:grid-cols-4">
          {stats.map((s) => (
            <RevealItem as="li" key={s.label} className="border-t border-ink pt-6">
              <p className="font-display text-[clamp(3rem,2rem+3.5vw,5.5rem)] leading-none tracking-tight">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-4 max-w-[18ch] text-sm text-muted">{s.label}</p>
            </RevealItem>
          ))}
        </Reveal>
      </section>

      {/* SOCKS BENTO */}
      <section className="container-x pb-24 md:pb-36" aria-labelledby="socks-title">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Socks · our primary category</p>
            <h2 id="socks-title" className="mt-5 max-w-[14ch] text-h1 text-balance">
              Every sock, placed with the <em>right</em> factory.
            </h2>
          </div>
          <Link href="/socks/" className="group inline-flex shrink-0 items-center gap-3 font-semibold">
            <span className="link-underline">All {sockCategories.length} sock categories</span>
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <Reveal as="ul" className="mt-14 grid gap-4 sm:grid-cols-2 md:gap-5 lg:auto-rows-[290px] lg:grid-cols-12">
          {featuredCategories.slice(0, 5).map((c, i) => (
            <RevealItem as="li" key={c.slug} className={`${bento[i]} ${i === 0 ? "sm:col-span-2" : ""}`}>
              <CategoryCard
                href={`/socks/${c.slug}/`}
                name={c.name}
                tagline={i === 0 ? c.tagline : undefined}
                specs={c.keySpecs}
                image={c.hero}
                index={i}
                aspect={`${i === 0 ? "aspect-[4/5] sm:aspect-[16/10]" : "aspect-[4/5]"} lg:aspect-auto`}
                sizes={i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
              />
            </RevealItem>
          ))}
        </Reveal>
        <ul className="mt-8 flex flex-wrap gap-2">
          {moreSocks.map((c) => (
            <li key={c.slug}>
              <Link href={`/socks/${c.slug}/`} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-5 text-sm font-medium transition-colors hover:border-ink hover:bg-ink hover:text-paper">
                {c.name} <ArrowRight width={14} height={14} />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* SWEATERS RAIL */}
      <section className="on-dark bg-ink py-24 text-paper md:py-32" aria-labelledby="sweaters-title">
        <div className="container-x mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Sweaters · {sweaterCategories.length} styles</p>
            <h2 id="sweaters-title" className="mt-5 max-w-[16ch] text-h1 text-balance">
              Knitwear, sourced with the <em className="text-accent-soft">same discipline.</em>
            </h2>
          </div>
          <Link href="/sweaters/" className="group inline-flex shrink-0 items-center gap-3 font-semibold">
            <span className="link-underline">All sweater styles</span>
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <Rail label="Sweater styles">
          {sweaterCategories.map((c, i) => (
            <li key={c.slug} className="w-[78vw] shrink-0 snap-start sm:w-[44vw] lg:w-[27vw] xl:w-[23vw]">
              <CategoryCard href={`/sweaters/${c.slug}/`} name={c.name} specs={c.keySpecs} image={c.hero} index={i} aspect="aspect-[3/4]" sizes="(min-width: 1024px) 27vw, 80vw" />
            </li>
          ))}
        </Rail>
      </section>

      {/* PROCESS */}
      <ProcessTimeline />

      {/* WHY A SOURCING PARTNER */}
      <section className="container-x grid gap-14 py-24 md:py-36 lg:grid-cols-12" aria-labelledby="why-title">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow">Why a sourcing partner</p>
            <h2 id="why-title" className="mt-5 text-h1 text-balance">
              We are not a factory. <em>That is the point.</em>
            </h2>
            <Parallax speed={0.04} className="mt-10 hidden lg:block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-stone">
                <Image src="/images/atmos-machine-01.jpg" alt="Circular knitting machine with yarn feeds" fill sizes="40vw" className="object-cover" />
              </div>
            </Parallax>
          </div>
        </div>
        <Reveal as="ol" className="lg:col-span-6 lg:col-start-7">
          {whySourcing.map((w, i) => (
            <RevealItem as="li" key={w.title} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-line py-10 first:border-t-ink md:grid-cols-[5rem_1fr] md:py-14">
              <span className="font-display text-3xl text-accent italic md:text-4xl" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-h2">{w.title}</h3>
                <p className="mt-4 max-w-lg text-lead text-muted">{w.body}</p>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </section>

      {/* QC TEASER */}
      <section className="on-dark relative isolate overflow-hidden bg-ink-2 text-paper" aria-labelledby="qc-title">
        <div className="container-x grid gap-14 py-24 md:py-32 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <p className="eyebrow">Quality control</p>
            <h2 id="qc-title" className="mt-5 text-h1 text-balance">
              Inspected by us, <em className="text-accent-soft">not by the factory</em> that made it.
            </h2>
            <ol className="mt-12">
              {qcChecks.map((q, i) => (
                <li key={q.id} className="flex items-baseline justify-between gap-6 border-t border-paper/15 py-5">
                  <span className="flex items-baseline gap-5">
                    <span className="text-xs font-semibold tracking-[0.2em] text-accent-soft">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-display text-2xl leading-tight">{q.name}</span>
                  </span>
                  <span className="hidden text-sm text-paper/70 sm:block">{q.when}</span>
                </li>
              ))}
            </ol>
            <Link href="/quality-control/" className="group mt-10 inline-flex items-center gap-3 font-semibold">
              <span className="link-underline">See every checkpoint</span>
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[22px]">
              <Image src="/images/atmos-qc-01.jpg" alt="Measuring tape used for size checks" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="container-x py-24 md:py-36" aria-labelledby="map-heading">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">Markets</p>
            <h2 id="map-heading" className="mt-5 text-h1 text-balance">
              Consolidated in Tirupur. <em>Shipped to seven regions.</em>
            </h2>
          </div>
          <p className="text-lead text-muted lg:col-span-4 lg:col-start-9">
            Domestic and international buyers: brands, retailers and wholesalers. We prepare the export documents and work with your forwarder or ours.
          </p>
        </div>
        <div className="mt-16">
          <WorldMap />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
