import Image from "next/image";
import Link from "next/link";
import { allCategories, type Category } from "@/content/products";
import { site, whatsappHref } from "@/content/site";
import { absoluteUrl, breadcrumbJsonLd, imageFile } from "@/lib/seo";
import { PhotoHero } from "./photo-hero";
import { QuoteButton } from "./quote-button";
import { Reveal, RevealItem } from "./reveal";
import { Rail } from "./rail";
import { CategoryCard } from "./category-card";
import { CtaBand } from "./cta-band";
import { JsonLd } from "./json-ld";
import { WhatsApp } from "./icons";

export const quoteValue = (c: Category) => (c.family === "socks" ? c.slug : `sweaters-${c.slug}`);

/** Shared template for every sock and sweater category page. */
export function CategoryPage({ c }: { c: Category }) {
  const familyName = c.family === "socks" ? "Socks" : "Sweaters";
  const base = `/${c.family}/`;
  const related = allCategories.filter((x) => x.family === c.family && x.slug !== c.slug);
  const [lead, ...rest] = c.description;

  return (
    <>
      <PhotoHero
        image={c.hero}
        size="medium"
        eyebrow={`${familyName} · ${c.label}`}
        lines={[c.name]}
        lead={c.tagline}
        breadcrumb={
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="link-underline">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href={base} className="link-underline">{familyName}</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-paper">{c.label}</li>
            </ol>
          </nav>
        }
      >
        <QuoteButton categories={[quoteValue(c)]}>Quote this category</QuoteButton>
        <a href={whatsappHref(c.name.toLowerCase())} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
          <WhatsApp /> WhatsApp
        </a>
      </PhotoHero>

      {/* Overview */}
      <section className="container-x grid gap-12 py-20 md:py-32 lg:grid-cols-12" aria-labelledby="overview">
        <div className="lg:col-span-4">
          <p className="eyebrow">Overview</p>
          <h2 id="overview" className="sr-only">Overview</h2>
          <ol className="mt-8 space-y-0 border-t border-line">
            {c.keySpecs.map((s, i) => (
              <li key={s} className="flex items-baseline gap-5 border-b border-line py-4">
                <span className="text-xs font-semibold tracking-[0.2em] text-accent-strong">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-2xl leading-tight">{s}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <p className="font-display text-statement text-balance">{lead}</p>
          <div className="prose-body mt-8 max-w-2xl text-lead text-muted">
            {rest.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Spec tables (compression, diabetic) */}
      {c.extra?.map((t, ti) => (
        <section key={t.title} className="container-x pb-20 md:pb-28" aria-labelledby={`t-${ti}`}>
          <div className="grid gap-10 border-t border-ink pt-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 id={`t-${ti}`} className="text-h2">{t.title}</h2>
              {t.intro && <p className="mt-5 text-muted">{t.intro}</p>}
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <dl>
                {t.rows.map((r) => (
                  <div key={r.label} className="grid gap-2 border-b border-line py-5 md:grid-cols-[200px_1fr] md:gap-8">
                    <dt className="font-display text-2xl leading-tight">{r.label}</dt>
                    <dd className="text-muted md:pt-1">{r.value}</dd>
                  </div>
                ))}
              </dl>
              {t.note && <p className="mt-6 border-l-2 border-accent pl-4 text-sm text-muted">{t.note}</p>}
            </div>
          </div>
        </section>
      ))}

      {/* Gallery: staggered editorial layout */}
      <section className="pb-20 md:pb-32" aria-label="Gallery">
        <div className="container-x grid grid-cols-2 gap-4 md:grid-cols-12 md:gap-6">
          {c.gallery.map((g, i) => (
            <figure
              key={g.src}
              className={`group relative overflow-hidden rounded-[22px] bg-stone ${
                i === 0 ? "col-span-2 md:col-span-5" : i === 1 ? "md:col-span-4 md:mt-28" : "md:col-span-3 md:mt-56"
              }`}
            >
              <div className="relative aspect-[4/5]">
                <Image src={g.src} alt={g.alt} fill sizes="(min-width: 768px) 40vw, 50vw" className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-expo)] group-hover:scale-[1.05] motion-reduce:group-hover:scale-100" />
              </div>
            </figure>
          ))}
        </div>
      </section>

      {/* Specifications */}
      <section className="bg-paper-2 py-20 md:py-28" aria-labelledby="specs">
        <div className="container-x">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Specification</p>
              <h2 id="specs" className="mt-5 text-h2">Built to your brief.</h2>
            </div>
            <QuoteButton categories={[quoteValue(c)]} variant="ghost" magnetic={false}>
              Send your spec
            </QuoteButton>
          </div>
          <Reveal className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {(
              [
                ["Typical materials", c.materials],
                ["Construction options", c.construction],
                ["Customisation", c.customisation],
                ["Use cases", c.useCases],
              ] as const
            ).map(([title, items]) => (
              <RevealItem key={title} className="border-t border-ink pt-6">
                <h3 className="text-sm font-semibold tracking-[0.16em] uppercase">{title}</h3>
                <ul className="mt-5 space-y-3 text-[0.98rem] text-muted">
                  {items.map((t) => (
                    <li key={t} className="flex gap-3">
                      <span className="mt-[0.6em] h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Related */}
      <section className="py-20 md:py-28" aria-labelledby="related">
        <div className="container-x mb-10 flex items-end justify-between gap-6">
          <h2 id="related" className="text-h2">More {familyName.toLowerCase()}</h2>
          <Link href={base} className="link-underline shrink-0 font-semibold">All {familyName.toLowerCase()}</Link>
        </div>
        <Rail label={`Other ${familyName.toLowerCase()} categories`}>
          {related.map((r) => (
            <li key={r.slug} className="w-[78vw] shrink-0 snap-start sm:w-[42vw] lg:w-[25vw]">
              <CategoryCard href={`/${r.family}/${r.slug}/`} name={r.name} specs={r.keySpecs} image={r.hero} aspect="aspect-[4/5]" sizes="(min-width: 1024px) 25vw, 80vw" />
            </li>
          ))}
        </Rail>
      </section>

      <CtaBand title={`Request a quote for ${c.name.toLowerCase()}.`} categories={[quoteValue(c)]} image={c.gallery[0]} />

      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: familyName, path: base },
            { name: c.name, path: `${base}${c.slug}/` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: c.name,
            description: c.seo.description,
            category: c.family === "socks" ? `Apparel & Accessories > Clothing > Socks > ${c.label}` : `Apparel & Accessories > Clothing > Sweaters > ${c.label}`,
            image: [absoluteUrl(imageFile(c.hero.src)), ...c.gallery.map((g) => absoluteUrl(imageFile(g.src)))],
            url: absoluteUrl(`${base}${c.slug}/`),
            material: c.materials.join(", "),
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: `${c.name} sourcing`,
            provider: { "@id": absoluteUrl("/#organization"), name: site.name },
            areaServed: ["Europe", "United Kingdom", "United States", "Canada", "Australia", "Middle East", "India"],
            url: absoluteUrl(`${base}${c.slug}/`),
          },
        ]}
      />
    </>
  );
}
