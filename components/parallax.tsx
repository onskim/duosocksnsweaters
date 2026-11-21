"use client";

import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";

/** Moves children slower than the page. Disabled with reduced motion. */
export function Parallax({ children, speed = 0.12, className }: { children: ReactNode; speed?: number; className?: string }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (v) => (reduce ? 0 : Math.min(v, 1200) * speed));
  return (
    <m.div className={className} style={{ y }}>
      {children}
    </m.div>
  );
}
