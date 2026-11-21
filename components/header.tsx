"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { NavItem, ProductImage } from "@/content/products";
import { site, whatsappHref } from "@/content/site";
import { getLenis } from "@/lib/lenis";
import { QuoteButton } from "./quote-button";
import { ArrowRight, ChevronDown, Close, Menu, WhatsApp } from "./icons";

const links = [
  { href: "/how-we-work/", label: "How we work" },
  { href: "/quality-control/", label: "Quality" },
  { href: "/about/", label: "About" },
];

/** Pages that start on a light background (no dark photo hero). */
const SOLID_PATHS = ["/request-a-quote", "/privacy-policy", "/thank-you"];

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-2.5 ${className}`}>
      <span className="font-display text-[1.9rem] leading-none tracking-tight">Duo</span>
      <span className="hidden text-[0.62rem] font-semibold tracking-[0.28em] uppercase opacity-80 sm:inline">Socks n Sweaters</span>
    </span>
  );
}

export function Header({ nav }: { nav: { socks: NavItem[]; sweaters: NavItem[] } }) {
  const sockCategories = nav.socks;
  const sweaterCategories = nav.sweaters;
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [mobileProducts, setMobileProducts] = useState(false);
  const [preview, setPreview] = useState<ProductImage>(sockCategories[0].hero);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMega(false);
    setMobile(false);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMega(false);
        setMobile(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (mobile) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
  }, [mobile]);

  const openMega = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setMega(true);
  };
  const scheduleClose = () => {
    closeTimer.current = window.setTimeout(() => setMega(false), 160);
  };

  const clean = pathname.replace(/\/$/, "") || "/";
  const isActive = (href: string) => {
    const h = href.replace(/\/$/, "");
    return clean === h || clean.startsWith(`${h}/`);
  };
  const productsActive = isActive("/socks") || isActive("/sweaters");
  const solidPage = SOLID_PATHS.some((p) => clean.startsWith(p));
  const overlay = !solidPage && !scrolled && !mega && !mobile;
  const activeText = overlay ? "text-accent-soft" : "text-accent-strong";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,box-shadow] duration-500 ${
        overlay ? "on-dark bg-transparent text-paper" : "bg-paper/90 text-ink shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl"
      }`}
    >
      <a href="#main" className="sr-only z-[80] rounded-full bg-ink px-4 py-2 text-paper focus:not-sr-only focus:absolute focus:top-3 focus:left-3">
        Skip to content
      </a>
      <div className={`container-x flex items-center justify-between gap-6 transition-[height] duration-500 ${scrolled || mobile ? "h-16" : "h-20 md:h-24"}`}>
        <Link href="/" className="shrink-0" aria-label={`${site.name}, home`}>
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            <li onMouseEnter={openMega} onMouseLeave={scheduleClose}>
              <button
                type="button"
                className={`flex min-h-11 items-center gap-1.5 px-4 text-[0.92rem] font-medium ${productsActive ? activeText : ""}`}
                aria-expanded={mega}
                aria-controls="mega-menu"
                // Mouse users open it by hovering; a click must not toggle it shut again. Keyboard (detail 0) toggles.
                onClick={(e) => (e.detail === 0 ? setMega((v) => !v) : openMega())}
              >
                <span className="link-underline">Products</span>
                <ChevronDown width={15} height={15} className={`transition-transform duration-300 ${mega ? "rotate-180" : ""}`} />
              </button>
            </li>
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`flex min-h-11 items-center px-4 text-[0.92rem] font-medium ${isActive(l.href) ? activeText : ""}`}
                  aria-current={isActive(l.href) ? "page" : undefined}
                >
                  <span className="link-underline">{l.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 text-[0.92rem] font-medium xl:inline-flex"
            aria-label={`WhatsApp ${site.whatsapp.display} (opens in a new tab)`}
          >
            <WhatsApp width={18} height={18} /> <span className="link-underline">{site.whatsapp.display}</span>
          </a>
          <div className="hidden sm:block">
            <QuoteButton className={scrolled ? "!min-h-11 !py-2.5" : ""} />
          </div>
          <button
            type="button"
            className={`grid h-11 w-11 place-items-center rounded-full border lg:hidden ${overlay ? "border-paper/40" : "border-line"}`}
            aria-expanded={mobile}
            aria-controls="mobile-menu"
            aria-label={mobile ? "Close menu" : "Open menu"}
            onClick={() => setMobile((v) => !v)}
          >
            {mobile ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mega menu */}
      <AnimatePresence>
        {mega && (
          <m.div
            id="mega-menu"
            onMouseEnter={openMega}
            onMouseLeave={scheduleClose}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-full hidden border-t border-line bg-paper text-ink shadow-[0_40px_80px_-50px_rgb(15_27_45/0.5)] lg:block"
          >
            <div className="container-x grid grid-cols-12 gap-10 py-10">
              <div className="col-span-5">
                <div className="mb-5 flex items-baseline justify-between">
                  <p className="eyebrow">Socks · {sockCategories.length} categories</p>
                  <Link href="/socks/" className="link-underline text-sm font-semibold" onClick={() => setMega(false)}>
                    View all
                  </Link>
                </div>
                <ul className="grid grid-cols-2 gap-x-6">
                  {sockCategories.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/socks/${c.slug}/`}
                        onMouseEnter={() => setPreview(c.hero)}
                        onFocus={() => setPreview(c.hero)}
                        onClick={() => setMega(false)}
                        className="group flex items-center justify-between border-b border-line py-2.5 font-display text-[1.35rem] leading-tight hover:text-accent-strong"
                      >
                        {c.label}
                        <ArrowRight width={16} height={16} className="-translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-4">
                <div className="mb-5 flex items-baseline justify-between">
                  <p className="eyebrow">Sweaters · {sweaterCategories.length} styles</p>
                  <Link href="/sweaters/" className="link-underline text-sm font-semibold" onClick={() => setMega(false)}>
                    View all
                  </Link>
                </div>
                <ul className="grid grid-cols-2 gap-x-6">
                  {sweaterCategories.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/sweaters/${c.slug}/`}
                        onMouseEnter={() => setPreview(c.hero)}
                        onFocus={() => setPreview(c.hero)}
                        onClick={() => setMega(false)}
                        className="block border-b border-line py-2.5 text-[0.95rem] hover:text-accent-strong"
                      >
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-3">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-stone">
                  <AnimatePresence initial={false}>
                    <m.div key={preview.src} className="absolute inset-0" initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }}>
                      <Image src={preview.src} alt="" fill sizes="25vw" className="object-cover" />
                    </m.div>
                  </AnimatePresence>
                  <div className="card-shade absolute inset-0" />
                  <Link href="/request-a-quote/" onClick={() => setMega(false)} className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3 text-paper">
                    <span className="font-display text-2xl leading-tight">Not sure where it fits? Send the brief.</span>
                    <ArrowRight className="shrink-0" />
                  </Link>
                </div>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobile && (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-x-0 top-full h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-paper text-ink lg:hidden"
            data-lenis-prevent
          >
            <nav aria-label="Mobile" className="container-x flex min-h-full flex-col py-6">
              <ul className="divide-y divide-line border-b border-line">
                <li>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between py-4 text-left font-display text-[2rem] leading-none"
                    aria-expanded={mobileProducts}
                    aria-controls="mobile-products"
                    onClick={() => setMobileProducts((v) => !v)}
                  >
                    Products <ChevronDown className={`transition-transform ${mobileProducts ? "rotate-180" : ""}`} />
                  </button>
                  {mobileProducts && (
                    <div id="mobile-products" className="pb-5">
                      <p className="eyebrow mt-1 mb-2">Socks</p>
                      <ul className="grid grid-cols-2 gap-x-4">
                        <li className="col-span-2">
                          <Link href="/socks/" className="block py-2 font-semibold">All socks</Link>
                        </li>
                        {sockCategories.map((c) => (
                          <li key={c.slug}>
                            <Link href={`/socks/${c.slug}/`} className="block py-2">{c.label}</Link>
                          </li>
                        ))}
                      </ul>
                      <p className="eyebrow mt-5 mb-2">Sweaters</p>
                      <ul className="grid grid-cols-2 gap-x-4">
                        <li className="col-span-2">
                          <Link href="/sweaters/" className="block py-2 font-semibold">All sweaters</Link>
                        </li>
                        {sweaterCategories.map((c) => (
                          <li key={c.slug}>
                            <Link href={`/sweaters/${c.slug}/`} className="block py-2">{c.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="block py-4 font-display text-[2rem] leading-none" aria-current={isActive(l.href) ? "page" : undefined}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-3 pt-8">
                <QuoteButton magnetic={false} className="w-full" />
                <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost w-full">
                  <WhatsApp /> Chat on WhatsApp
                </a>
              </div>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
