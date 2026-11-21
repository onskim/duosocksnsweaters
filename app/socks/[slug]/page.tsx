import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategory, sockCategories as LIST } from "@/content/products";
import { imageFile, pageMetadata } from "@/lib/seo";
import { CategoryPage } from "@/components/category-page";

export const dynamicParams = false;

export function generateStaticParams() {
  return LIST.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/socks/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCategory("socks", slug);
  if (!c) return {};
  return pageMetadata({ title: c.seo.title, description: c.seo.description, path: `/socks/${c.slug}/`, keywords: c.seo.keywords, image: imageFile(c.hero.src) });
}

export default async function Page({ params }: PageProps<"/socks/[slug]">) {
  const { slug } = await params;
  const c = getCategory("socks", slug);
  if (!c) notFound();
  return <CategoryPage c={c} />;
}
