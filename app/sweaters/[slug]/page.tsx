import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategory, sweaterCategories as LIST } from "@/content/products";
import { imageFile, pageMetadata } from "@/lib/seo";
import { CategoryPage } from "@/components/category-page";

export const dynamicParams = false;

export function generateStaticParams() {
  return LIST.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/sweaters/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCategory("sweaters", slug);
  if (!c) return {};
  return pageMetadata({ title: c.seo.title, description: c.seo.description, path: `/sweaters/${c.slug}/`, keywords: c.seo.keywords, image: imageFile(c.hero.src) });
}

export default async function Page({ params }: PageProps<"/sweaters/[slug]">) {
  const { slug } = await params;
  const c = getCategory("sweaters", slug);
  if (!c) notFound();
  return <CategoryPage c={c} />;
}
