"use client";

import { m, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { ReactNode, PointerEvent } from "react";

/** Subtle magnetic pull toward the pointer. Off for touch and reduced motion. */
export function Magnetic({ children, strength = 0.25, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e: PointerEvent<HTMLSpanElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.span className={`inline-flex ${className}`} style={{ x: sx, y: sy }} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </m.span>
  );
}
