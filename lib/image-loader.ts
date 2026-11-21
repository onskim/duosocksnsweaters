"use client";

/**
 * next/image loader for static hosting (GitHub Pages).
 * Maps "/images/name.jpg" + requested width to a pre-built WebP from
 * scripts/optimize-images.mjs. Other URLs are returned unchanged.
 */
const WIDTHS = [480, 960, 1440, 1920];

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  const m = src.match(/^\/images\/(.+)\.(jpe?g|png|webp)$/i);
  if (!m) return src;
  const w = WIDTHS.find((x) => x >= width) ?? WIDTHS[WIDTHS.length - 1];
  return `/images/${m[1]}-${w}.webp`;
}
