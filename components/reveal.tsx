"use client";

import { m, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/** Fade + slight rise when scrolled into view. Children with <RevealItem> stagger. */
export function Reveal({ children, className, as = "div", stagger = 0.08, delay = 0 }: { children: ReactNode; className?: string; as?: "div" | "ul" | "ol" | "section"; stagger?: number; delay?: number }) {
  const Comp = m[as];
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </Comp>
  );
}

export function RevealItem({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "li" | "article" }) {
  const Comp = m[as];
  return (
    <Comp className={className} variants={item}>
      {children}
    </Comp>
  );
}
