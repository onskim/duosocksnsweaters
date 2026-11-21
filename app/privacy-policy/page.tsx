import type { Metadata } from "next";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${site.name} uses the information you send through the quote form and by email or WhatsApp.`,
  path: "/privacy-policy/",
});

const updated = "21 November 2026";

export default function PrivacyPage() {
  return (
    <article className="container-x max-w-4xl pt-32 pb-20 md:pt-40 md:pb-28">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-4 text-h1">Privacy policy</h1>
      <p className="mt-4 text-sm text-muted">Last updated: {updated}</p>

      <div className="mt-10 space-y-10 leading-relaxed [&_h2]:font-display [&_h2]:text-3xl [&_p]:mt-3 [&_p]:text-muted [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_ul]:text-muted">
        <section>
          <h2>Who we are</h2>
          <p>{site.name} is a sourcing and export partner based in {site.location.city}, {site.location.region}, {site.location.country}. You can contact us at <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>.</p>
        </section>
        <section>
          <h2>What we collect</h2>
          <p>When you use the quote form, we collect what you enter:</p>
          <ul>
            <li>Your name, company, buyer type, country, email and phone or WhatsApp number</li>
            <li>Product details: categories, product type, quantity, materials, packaging, timeline, target price and message</li>
            <li>Any files you attach, such as tech packs or reference images</li>
          </ul>
          <p>Our form provider also processes your IP address to filter spam.</p>
        </section>
        <section>
          <h2>How we use it</h2>
          <ul>
            <li>To reply to your inquiry and prepare a quote</li>
            <li>To share the relevant product details with partner factories so they can sample and cost your order. We share your contact details with them only if you agree.</li>
            <li>To send you a confirmation email when you submit the form</li>
          </ul>
          <p>We do not sell your information, and we do not add you to marketing lists without your permission.</p>
        </section>
        <section>
          <h2>Where it goes</h2>
          <p>Form submissions are delivered by email through FormSubmit (formsubmit.co) to our team inbox, and FormSubmit sends you the confirmation email. The website is hosted on GitHub Pages. These providers process data on our behalf.</p>
        </section>
        <section>
          <h2>How long we keep it</h2>
          <p>We keep inquiry emails for as long as needed to handle your inquiry and any order that follows, and to meet legal and accounting duties.</p>
        </section>
        <section>
          <h2>Cookies</h2>
          <p>This website does not use advertising or tracking cookies.</p>
        </section>
        <section>
          <h2>Your rights</h2>
          <p>You can ask us to see, correct or delete the information you sent us. Email <a className="underline" href={`mailto:${site.email}`}>{site.email}</a> and we will respond.</p>
        </section>
      </div>
    </article>
  );
}
