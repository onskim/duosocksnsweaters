"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, m } from "framer-motion";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { getLenis } from "@/lib/lenis";
import type { QuoteOption } from "@/lib/quote-schema";
import { Close } from "./icons";

const QuoteForm = dynamic(() => import("./quote-form").then((mod) => mod.QuoteForm), {
  ssr: false,
  loading: () => <p className="py-10 text-center text-muted">Loading form…</p>,
});

type Ctx = { open: (categories?: string[]) => void; close: () => void };
const QuoteModalContext = createContext<Ctx | null>(null);

const QuoteOptionsContext = createContext<QuoteOption[]>([]);
/** Category options for the quote form, supplied by the root layout. */
export const useQuoteOptions = () => useContext(QuoteOptionsContext);

export const useQuoteModal = () => {
  const ctx = useContext(QuoteModalContext);
  if (!ctx) throw new Error("useQuoteModal must be used inside QuoteModalProvider");
  return ctx;
};

export function QuoteModalProvider({ children, options }: { children: ReactNode; options: QuoteOption[] }) {
  const [state, setState] = useState<{ open: boolean; categories: string[]; key: number }>({ open: false, categories: [], key: 0 });
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const open = useCallback((categories: string[] = []) => {
    lastFocus.current = document.activeElement as HTMLElement | null;
    setState((s) => ({ open: true, categories, key: s.key + 1 }));
  }, []);
  const close = useCallback(() => setState((s) => ({ ...s, open: false })), []);

  useEffect(() => {
    if (!state.open) return;
    const lenis = getLenis();
    lenis?.stop();
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const t = window.setTimeout(() => dialogRef.current?.focus(), 30);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([tabindex="-1"]):not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        const list = Array.from(f).filter((el) => el.offsetParent !== null || el.classList.contains("sr-only"));
        if (!list.length) return;
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prevOverflow;
      lenis?.start();
      lastFocus.current?.focus?.();
    };
  }, [state.open, close]);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <QuoteOptionsContext.Provider value={options}>
    <QuoteModalContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {state.open && (
          <m.div
            className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-ink/55 backdrop-blur-[2px]" onClick={close} aria-hidden="true" />
            <m.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label="Request a quote"
              tabIndex={-1}
              data-lenis-prevent
              className="relative max-h-[92dvh] w-full overflow-y-auto overscroll-contain rounded-t-[24px] bg-paper px-5 pt-5 pb-8 shadow-2xl outline-none sm:max-w-2xl sm:rounded-[24px] sm:px-10 sm:pt-8 sm:pb-10"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow">Request a quote</p>
                  <p className="mt-1 text-sm text-muted">Three short steps. We reply to every inquiry.</p>
                </div>
                <button type="button" onClick={close} className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line hover:bg-stone" aria-label="Close quote form">
                  <Close />
                </button>
              </div>
              <QuoteForm key={state.key} initialCategories={state.categories} onClose={close} />
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </QuoteModalContext.Provider>
    </QuoteOptionsContext.Provider>
  );
}
