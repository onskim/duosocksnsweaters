import Image from "next/image";
import { whatsappHref } from "@/content/site";
import { QuoteButton } from "./quote-button";
import { WhatsApp } from "./icons";

/** Full-bleed photographic call to action. */
export function CtaBand({
  title = "Tell us what you need. We will find the factory.",
  body = "Send your brief, tech pack or a reference sample. We reply with questions, a factory match and a sampling plan.",
  categories,
  image = { src: "/images/atmos-knit-01.jpg", alt: "Close-up of a chunky mustard knit" },
}: {
  title?: string;
  body?: string;
  categories?: string[];
  image?: { src: string; alt: string };
}) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-ink text-paper" aria-labelledby="cta-title">
      <Image src={image.src} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-45" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
      <div className="container-x py-24 md:py-36">
        <p className="eyebrow">Request a quote</p>
        <h2 id="cta-title" className="mt-6 max-w-[18ch] text-display text-balance">
          {title}
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <p className="max-w-lg text-lead text-paper/85">{body}</p>
          <div className="flex flex-wrap gap-3">
            <QuoteButton categories={categories} />
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <WhatsApp /> WhatsApp us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
