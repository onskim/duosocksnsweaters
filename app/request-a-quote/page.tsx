import Image from "next/image";
import { Suspense } from "react";
import type { Metadata } from "next";
import { site, whatsappHref } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { Mail, WhatsApp } from "@/components/icons";
import { QuotePageForm } from "./quote-page-form";

export const metadata: Metadata = pageMetadata({
  title: "Request a Quote | Private Label Socks and Sweaters",
  description:
    "Request a quote for private label socks or sweaters. Tell us the category, quantity and spec; we reply with questions, a factory match and a sampling plan.",
  path: "/request-a-quote/",
  keywords: ["socks quote India", "private label socks quote", "bulk socks inquiry"],
});

export default function RequestQuotePage() {
  return (
    <section className="pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow">Request a quote</p>
            <h1 className="mt-5 text-h1">
              Tell us what <em>you need.</em>
            </h1>
            <p className="mt-6 text-lead text-muted">Three short steps. Every quote is prepared for your order, so the more detail you give, the faster we can respond.</p>
            <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-[22px] lg:block">
              <Image src="/images/atmos-yarn-02.jpg" alt="Cones of yarn in earthy colours" fill sizes="30vw" className="object-cover" />
            </div>
            <div className="mt-10 border-t border-line pt-8 text-sm">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase">What happens next</p>
              <ol className="mt-4 space-y-3 text-muted">
                <li>1. You get an email confirming we received your request.</li>
                <li>2. We review your brief and reply with questions or a sampling plan.</li>
                <li>3. After samples are approved, you get a written quote.</li>
              </ol>
              <ul className="mt-8 space-y-3">
                <li>
                  <a href={`mailto:${site.email}`} className="inline-flex items-center gap-3"><Mail /> <span className="link-underline">{site.email}</span></a>
                </li>
                <li>
                  <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3"><WhatsApp width={20} height={20} /> <span className="link-underline">{site.whatsapp.display}</span></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="card p-6 sm:p-10 md:p-14 lg:col-span-7 lg:col-start-6">
          <Suspense fallback={<p className="py-10 text-center text-muted">Loading form…</p>}>
            <QuotePageForm />
          </Suspense>
        </div>
      </div>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Request a quote", path: "/request-a-quote/" }])} />
    </section>
  );
}
