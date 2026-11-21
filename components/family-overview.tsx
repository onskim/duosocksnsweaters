import Link from "next/link";
import type { Category, ProductImage } from "@/content/products";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/content/site";
import { PhotoHero } from "./photo-hero";
import { QuoteButton } from "./quote-button";
import { CategoryCard } from "./category-card";
import { CtaBand } from "./cta-band";
import { JsonLd } from "./json-ld";
import { Statement } from "./statement";

/** Overview page for a product family (socks or sweaters). */
export function FamilyOverview({
  family,
  title,
  eyebrow,
  lead,
  statement,
  image,
  items,
  customisation,
  quoteCategories,
}: {
  family: "socks" | "sweaters";
  title: [string, string];
  eyebrow: string;
  lead: string;
  statement: string;
  image: ProductImage;
  items: Category[];
  customisation: string[];
  quoteCategories?: string[];
}) {
  const name = family === "socks" ? "Socks" : "Sweaters";
  return (
    <>
      <PhotoHero image={image} size="medium" eyebrow={eyebrow} lines={[title[0], <em key="t" className="text-accent-soft">{title[1]}</em>]} lead={lead}>
        <QuoteButton categories={quoteCategories} />
      </PhotoHero>

      <section className="container-x py-20 md:py-28" aria-label="Introduction">
        <div className="grid gap-10 lg:grid-cols-12">
          <p className="eyebrow lg:col-span-3">{items.length} categories</p>
          <Statement className="font-display text-statement lg:col-span-9" text={statement} />
        </div>
      </section>

      <section className="container-x pb-24 md:pb-32" aria-labelledby="all-cats">
        <h2 id="all-cats" className="sr-only">All {name.toLowerCase()} categories</h2>
        {/* No scroll reveal here: these tiles are near the fold. */}
        <ul className="grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {items.map((c, i) => (
            <li key={c.slug} className={i === 0 ? "sm:col-span-2 lg:col-span-2" : ""}>
              <CategoryCard
                href={`/${family}/${c.slug}/`}
                name={c.name}
                tagline={c.tagline}
                specs={c.keySpecs}
                image={c.hero}
                index={i}
                priority={i < 2}
                aspect={i === 0 ? "aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto lg:h-full" : "aspect-[4/5]"}
                sizes={i === 0 ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
              />
            </li>
          ))}
        </ul>
        <p className="mt-10 text-muted">
          Need something not listed? All {name.toLowerCase()} categories are available.{" "}
          <Link href="/request-a-quote/" className="link-underline font-semibold text-ink">Describe it in your inquiry.</Link>
        </p>
      </section>

      <section className="bg-paper-2 py-20 md:py-28" aria-labelledby="custom-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">On every category</p>
            <h2 id="custom-title" className="mt-5 text-h1 text-balance">
              Your brand. Your colours. <em>Your packaging.</em>
            </h2>
          </div>
          <ul className="lg:col-span-6 lg:col-start-7">
            {customisation.map((c, i) => (
              <li key={c} className="flex items-baseline gap-5 border-t border-line py-5 text-lead first:border-ink">
                <span className="text-xs font-semibold tracking-[0.2em] text-accent-strong">{String(i + 1).padStart(2, "0")}</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand categories={quoteCategories} />
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name, path: `/${family}/` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `${name} categories sourced by ${site.name}`,
            itemListElement: items.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, url: absoluteUrl(`/${family}/${c.slug}/`) })),
          },
        ]}
      />
    </>
  );
}
