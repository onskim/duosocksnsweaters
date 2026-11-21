import Link from "next/link";
import type { Metadata } from "next";
import { site, whatsappHref } from "@/content/site";
import { Check, WhatsApp } from "@/components/icons";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Your quote request has been sent.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/thank-you/" },
};

export default function ThankYouPage() {
  return (
    <section className="container-x flex min-h-[80svh] flex-col items-start justify-center pt-32 pb-20">
      <span className="grid h-16 w-16 place-items-center rounded-full bg-sage-strong text-white">
        <Check width={30} height={30} />
      </span>
      <h1 className="mt-8 text-h1">
        Thank you. <em>Your request is in.</em>
      </h1>
      <p className="mt-6 max-w-xl text-lead text-muted">
        You will receive a confirmation email shortly. We will review your brief and reply with questions or a sampling plan.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-primary">Back to home</Link>
        <a href={whatsappHref("my inquiry")} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
          <WhatsApp /> Follow up on WhatsApp
        </a>
      </div>
      <p className="mt-10 text-sm text-muted">
        Anything to add? Email <a className="link-underline text-ink" href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </section>
  );
}
