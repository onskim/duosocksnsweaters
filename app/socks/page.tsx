import type { Metadata } from "next";
import { sockCategories, standardCustomisation } from "@/content/products";
import { imageFile, pageMetadata } from "@/lib/seo";
import { FamilyOverview } from "@/components/family-overview";

const image = { src: "/images/socks-stack-hero.jpg", alt: "Stack of ribbed socks in red, blue and navy", width: 2400, height: 1500 };

export const metadata: Metadata = pageMetadata({
  title: "Socks Sourcing India | All Sock Categories, Private Label",
  description:
    "Ankle, terry, anti-skid, compression, diabetic, crew, no-show, sports, dress, kids' and wool socks, sourced from 7 vetted factories in Tirupur with independent QC.",
  path: "/socks/",
  keywords: ["private label socks supplier India", "socks wholesale India", "sock sourcing Tirupur"],
  image: imageFile(image.src),
});

export default function SocksPage() {
  return (
    <FamilyOverview
      family="socks"
      eyebrow="Socks"
      title={["Every sock category.", "One partner."]}
      lead="Socks are our primary category. Tell us the construction you need and we match it to a partner factory that runs it every day."
      statement="Terry, compression and fine-gauge dress socks need different machines, yarns and hands. We know which partner factory runs each one best, and we inspect the result before it ships."
      image={image}
      items={sockCategories}
      customisation={standardCustomisation}
    />
  );
}
