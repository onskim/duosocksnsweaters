"use client";

import { useEffect, useRef, useState } from "react";

const fmt = (n: number) => n.toLocaleString("en-US");

/**
 * Counts up when scrolled into view. Renders the final value on the server,
 * so the number is correct without JavaScript and for reduced motion.
 */
export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let started = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        io.disconnect();
        const t0 = performance.now();
        const dur = 1400;
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(Math.round(value * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    // Only animate counters that start off-screen, so nothing visible jumps to 0.
    const r = el.getBoundingClientRect();
    if (r.top > window.innerHeight) {
      setDisplay(0);
      io.observe(el);
    }
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      <span aria-hidden="true">
        {fmt(display)}
        {suffix}
      </span>
      <span className="sr-only">
        {fmt(value)}
        {suffix}
      </span>
    </span>
  );
}
