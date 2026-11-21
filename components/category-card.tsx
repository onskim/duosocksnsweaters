import Image from "next/image";
import Link from "next/link";
import type { ProductImage } from "@/content/products";
import { ArrowRight } from "./icons";

/**
 * Photo tile: full-bleed image, name over a soft gradient, specs slide up on hover.
 * `tall` makes a portrait tile for bento layouts.
 */
export function CategoryCard({
  href,
  name,
  tagline,
  specs,
  image,
  index,
  priority = false,
  aspect = "aspect-[4/5]",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: {
  href: string;
  name: string;
  tagline?: string;
  specs: readonly string[];
  image: ProductImage;
  index?: number;
  priority?: boolean;
  aspect?: string;
  sizes?: string;
}) {
  return (
    <Link href={href} className={`group relative block h-full overflow-hidden rounded-[22px] bg-ink text-paper ${aspect}`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-expo)] group-hover:scale-[1.07] motion-reduce:group-hover:scale-100"
      />
      <div className="card-shade absolute inset-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/25" />
      {typeof index === "number" && (
        <span className="absolute top-5 left-5 text-xs font-semibold tracking-[0.2em] text-paper/85">{String(index + 1).padStart(2, "0")}</span>
      )}
      <span className="absolute top-4 right-4 grid h-11 w-11 place-items-center rounded-full border border-paper/40 bg-ink/20 backdrop-blur-sm transition-all duration-500 group-hover:rotate-[-45deg] group-hover:border-accent group-hover:bg-accent-strong" aria-hidden="true">
        <ArrowRight />
      </span>
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
        <h3 className="text-h3">{name}</h3>
        {tagline && <p className="mt-2 max-w-sm text-[0.95rem] text-paper/85">{tagline}</p>}
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[var(--ease-expo)] group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
          <ul className="overflow-hidden">
            <li className="h-4" aria-hidden="true" />
            {specs.map((s) => (
              <li key={s} className="flex items-center gap-2 py-0.5 text-sm text-paper/90">
                <span className="h-px w-4 bg-accent-soft" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  );
}
