"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import type { ReactNode } from "react";
import { SmoothScroll } from "./smooth-scroll";
import { QuoteModalProvider } from "./quote-modal";
import type { QuoteOption } from "@/lib/quote-schema";

export function Providers({ children, quoteOptions }: { children: ReactNode; quoteOptions: QuoteOption[] }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
        <QuoteModalProvider options={quoteOptions}>
          <SmoothScroll />
          {children}
        </QuoteModalProvider>
      </MotionConfig>
    </LazyMotion>
  );
}
