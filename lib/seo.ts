import type { Metadata } from "next";
import { site } from "@/content/site";

const DEFAULT_OG = "/images/socks-home-hero-1440.webp";

export const absoluteUrl = (path = "/") => new URL(path, site.url).toString();

/** Builds page metadata with canonical URL and Open Graph defaults. */
export function pageMetadata({ title, description, path, keywords, image }: { title: string; description: string; path: string; keywords?: string[]; image?: string }): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path.endsWith("/") ? path : `${path}/` },
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description,
      url: path.endsWith("/") ? path : `${path}/`,
      locale: "en_GB",
      images: [{ url: image ?? DEFAULT_OG, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image ?? DEFAULT_OG] },
  };
}

export const organizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": absoluteUrl("/#organization"),
  name: site.name,
  url: site.url,
  email: site.email,
  description: site.description,
  logo: absoluteUrl("/icon.svg"),
  image: absoluteUrl(DEFAULT_OG),
  address: {
    "@type": "PostalAddress",
    addressLocality: site.location.city,
    addressRegion: site.location.region,
    addressCountry: site.location.countryCode,
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.email,
      telephone: `+${site.whatsapp.number}`,
      availableLanguage: ["English"],
    },
  ],
  areaServed: ["Europe", "United Kingdom", "United States", "Canada", "Australia", "Middle East", "India"],
  knowsAbout: ["Sock sourcing", "Sweater sourcing", "Private label socks", "Textile quality control", "Export shipping"],
});

export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absoluteUrl(it.path) })),
});

/** Public URL of a pre-built WebP variant for an image in /images (see scripts/optimize-images.mjs). */
export const imageFile = (src: string, w: 480 | 960 | 1440 | 1920 = 1440) => src.replace(/\.(jpe?g|png)$/i, `-${w}.webp`);
