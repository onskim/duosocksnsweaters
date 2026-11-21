import type { MetadataRoute } from "next";

export const dynamic = "force-static";
import { sockCategories, sweaterCategories } from "@/content/products";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: [string, number][] = [
    ["/", 1],
    ["/socks/", 0.9],
    ...sockCategories.map((c) => [`/socks/${c.slug}/`, 0.8] as [string, number]),
    ["/sweaters/", 0.8],
    ...sweaterCategories.map((c) => [`/sweaters/${c.slug}/`, 0.7] as [string, number]),
    ["/how-we-work/", 0.7],
    ["/quality-control/", 0.7],
    ["/about/", 0.6],
    ["/request-a-quote/", 0.8],
    ["/privacy-policy/", 0.2],
  ];
  return pages.map(([path, priority]) => ({ url: absoluteUrl(path), lastModified: now, changeFrequency: "monthly", priority }));
}
