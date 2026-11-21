import Image from "next/image";
import type { ReactNode } from "react";
import type { ProductImage } from "@/content/products";

/**
 * Full-bleed photographic hero with the headline set over a dark gradient.
 * `lines` are animated one by one out of a mask.
 */
export function PhotoHero({
  image,
  eyebrow,
  lines,
  lead,
  children,
  size = "tall",
  breadcrumb,
}: {
  image: ProductImage;
  eyebrow: string;
  lines: ReactNode[];
  lead?: ReactNode;
  children?: ReactNode;
  size?: "tall" | "medium";
  breadcrumb?: ReactNode;
}) {
  return (
    <section className={`on-dark relative isolate flex overflow-hidden bg-ink text-paper ${size === "tall" ? "min-h-[100svh]" : "min-h-[78svh] md:min-h-[84svh]"}`}>
      <div className="absolute inset-0 -z-10">
        <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="slow-zoom object-cover" />
        <div className="hero-shade absolute inset-0" />
      </div>
      <div className="container-x flex w-full flex-col justify-end pt-32 pb-12 md:pb-16">
        {breadcrumb && <div className="fade-up mb-auto pt-4 text-sm text-paper/80">{breadcrumb}</div>}
        <p className="eyebrow fade-up" style={{ animationDelay: "120ms" }}>
          {eyebrow}
        </p>
        <h1 className={`mt-5 max-w-[16ch] text-balance ${size === "tall" ? "text-mega" : "text-h1"}`}>
          {lines.map((l, i) => (
            <span key={i} className="line-mask">
              <span style={{ animationDelay: `${180 + i * 110}ms` }}>{l}</span>
            </span>
          ))}
        </h1>
        {(lead || children) && (
          <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            {lead && (
              <p className="fade-up max-w-xl text-lead text-paper/85" style={{ animationDelay: "520ms" }}>
                {lead}
              </p>
            )}
            {children && (
              <div className="fade-up flex flex-wrap gap-3" style={{ animationDelay: "640ms" }}>
                {children}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
