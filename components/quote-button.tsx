"use client";

import type { ReactNode } from "react";
import { useQuoteModal } from "./quote-modal";
import { Magnetic } from "./magnetic";
import { ArrowRight } from "./icons";

type Props = {
  categories?: string[];
  children?: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  magnetic?: boolean;
};

/** Opens the quote modal, optionally with categories pre-selected. */
export function QuoteButton({ categories, children = "Request a quote", variant = "primary", className = "", magnetic = true }: Props) {
  const { open } = useQuoteModal();
  const btn = (
    <button type="button" onClick={() => open(categories)} className={`btn btn-${variant} ${className}`} aria-haspopup="dialog">
      {children} <ArrowRight />
    </button>
  );
  return magnetic ? <Magnetic>{btn}</Magnetic> : btn;
}
