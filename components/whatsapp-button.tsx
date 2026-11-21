"use client";

import { AnimatePresence, m } from "framer-motion";
import { useEffect, useState } from "react";
import { whatsappHref } from "@/content/site";
import { WhatsApp } from "./icons";

/** Floating WhatsApp button. Shows a label on first scroll, then minimises. */
export function WhatsAppButton() {
  const [label, setLabel] = useState(false);

  useEffect(() => {
    let shown = false;
    let t = 0;
    const onScroll = () => {
      if (shown || window.scrollY < 200) return;
      shown = true;
      setLabel(true);
      t = window.setTimeout(() => setLabel(false), 4500);
      window.removeEventListener("scroll", onScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(t);
    };
  }, []);

  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp (opens in a new tab)"
      className="group fixed right-4 z-40 flex items-center gap-2 bottom-[max(1rem,env(safe-area-inset-bottom))] md:right-6 md:bottom-6"
      onMouseEnter={() => setLabel(true)}
      onMouseLeave={() => setLabel(false)}
      onFocus={() => setLabel(true)}
      onBlur={() => setLabel(false)}
    >
      <AnimatePresence>
        {label && (
          <m.span
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.2 }}
            className="rounded-full bg-ink px-3.5 py-2 text-sm font-medium text-paper shadow-lg"
            aria-hidden="true"
          >
            Chat on WhatsApp
          </m.span>
        )}
      </AnimatePresence>
      <span className="grid h-14 w-14 place-items-center rounded-full bg-[#1F7A4D] text-white shadow-[0_12px_30px_-10px_rgb(15_27_45/0.55)] transition-transform duration-200 group-hover:scale-105">
        <WhatsApp width={26} height={26} />
      </span>
    </a>
  );
}
