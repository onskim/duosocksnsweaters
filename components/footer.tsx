import Link from "next/link";
import { sockCategories, sweaterCategories } from "@/content/products";
import { regions, site, whatsappHref } from "@/content/site";
import { ArrowRight, Mail, Pin, WhatsApp } from "./icons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark relative overflow-hidden bg-ink pb-28 text-paper md:pb-10">
      <div className="container-x pt-20 md:pt-28">
        <div className="grid gap-12 border-b border-paper/15 pb-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Start a conversation</p>
            <p className="mt-6 max-w-md font-display text-[clamp(2rem,1.5rem+2vw,3.2rem)] leading-[1.05]">
              One partner. 50+ factories. <em className="text-accent-soft">Every order inspected.</em>
            </p>
            <Link href="/request-a-quote/" className="group mt-8 inline-flex items-center gap-3 text-lg font-semibold">
              <span className="link-underline">Request a quote</span>
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <nav aria-label="Sock categories" className="lg:col-span-2">
            <p className="mb-5 text-xs font-semibold tracking-[0.2em] text-paper/60 uppercase">Socks</p>
            <ul className="space-y-2 text-sm text-paper/80">
              {sockCategories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/socks/${c.slug}/`} className="link-underline hover:text-paper">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Sweater styles" className="lg:col-span-2">
            <p className="mb-5 text-xs font-semibold tracking-[0.2em] text-paper/60 uppercase">Sweaters</p>
            <ul className="space-y-2 text-sm text-paper/80">
              {sweaterCategories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/sweaters/${c.slug}/`} className="link-underline hover:text-paper">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-10 lg:col-span-3">
            <nav aria-label="Company">
              <p className="mb-5 text-xs font-semibold tracking-[0.2em] text-paper/60 uppercase">Company</p>
              <ul className="space-y-2 text-sm text-paper/80">
                <li><Link href="/how-we-work/" className="link-underline hover:text-paper">How we work</Link></li>
                <li><Link href="/quality-control/" className="link-underline hover:text-paper">Quality control</Link></li>
                <li><Link href="/about/" className="link-underline hover:text-paper">About</Link></li>
                <li><Link href="/privacy-policy/" className="link-underline hover:text-paper">Privacy policy</Link></li>
              </ul>
            </nav>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-3 text-paper/85 hover:text-paper">
                  <Mail width={18} height={18} /> <span className="link-underline">{site.email}</span>
                </a>
              </li>
              <li>
                <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-paper/85 hover:text-paper">
                  <WhatsApp width={18} height={18} /> <span className="link-underline">{site.whatsapp.display}</span>
                </a>
              </li>
              <li className="inline-flex items-center gap-3 text-paper/85">
                <Pin width={18} height={18} /> {site.location.city}, {site.location.region}, {site.location.country}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 py-6 text-xs tracking-[0.14em] text-paper/60 uppercase">
          <span>Shipping to</span>
          {regions.map((r) => (
            <span key={r.id} className="text-paper/85">{r.name}</span>
          ))}
        </div>

        {/* Decorative wordmark, drawn with CSS content so it is not read or contrast-checked as text. */}
        <div aria-hidden="true" data-word="Duo." className="pointer-events-none -mb-[0.18em] font-display text-[clamp(6rem,2rem+24vw,26rem)] leading-[0.8] tracking-[-0.04em] text-paper/[0.07] italic select-none before:content-[attr(data-word)]" />

        <div className="flex flex-col gap-2 border-t border-paper/15 pt-6 text-xs text-paper/65 md:flex-row md:justify-between">
          <p>© {year} {site.name}. A sourcing and export partner. We do not own a factory.</p>
          <p>
            Photography: <a href="https://unsplash.com" className="underline underline-offset-2" target="_blank" rel="noopener noreferrer">Unsplash</a>. Prices quoted per inquiry.
          </p>
        </div>
      </div>
    </footer>
  );
}
