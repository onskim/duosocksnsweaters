import Link from "next/link";
import { PhotoHero } from "@/components/photo-hero";

export default function NotFound() {
  return (
    <PhotoHero
      image={{ src: "/images/atmos-knit-01.jpg", alt: "Close-up of a chunky knit", width: 1800, height: 1200 }}
      size="medium"
      eyebrow="404"
      lines={["This page", <em key="e" className="text-accent-soft">is not here.</em>]}
      lead="The link may be old, or the page has moved."
    >
      <Link href="/" className="btn btn-primary">Back to home</Link>
      <Link href="/socks/" className="btn btn-ghost">Browse socks</Link>
    </PhotoHero>
  );
}
