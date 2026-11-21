import type { Metadata } from "next";
import { sweaterCategories, sweaterCustomisation, sweatersOverview } from "@/content/products";
import { imageFile, pageMetadata } from "@/lib/seo";
import { FamilyOverview } from "@/components/family-overview";

export const metadata: Metadata = pageMetadata({
  title: sweatersOverview.seo.title,
  description: sweatersOverview.seo.description,
  path: "/sweaters/",
  keywords: sweatersOverview.seo.keywords,
  image: imageFile(sweatersOverview.hero.src),
});

export default function SweatersPage() {
  return (
    <FamilyOverview
      family="sweaters"
      eyebrow="Sweaters"
      title={["Knitwear in every style.", "Sourced with care."]}
      lead={sweatersOverview.description.join(" ")}
      statement="Fine-gauge V-necks, chunky cables, Fair Isle yokes and school uniform: each style goes to a knitwear factory set up for it, and our QC team checks it before it ships."
      image={sweatersOverview.hero}
      items={sweaterCategories}
      customisation={sweaterCustomisation}
    />
  );
}
