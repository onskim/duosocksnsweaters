"use client";

import { useSearchParams } from "next/navigation";
import { QuoteForm } from "@/components/quote-form";

/** Reads ?category=ankle,terry so links can pre-select categories. */
export function QuotePageForm() {
  const params = useSearchParams();
  const categories = (params.get("category") ?? "").split(",").filter(Boolean);
  return <QuoteForm key={categories.join(",")} initialCategories={categories} />;
}
