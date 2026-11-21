"use client";

import { m, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { useRef } from "react";

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  // Dim state #666d79 still passes WCAG AA (4.7:1 on paper).
  const color = useTransform(progress, range, ["#666d79", "#0f1b2d"]);
  return (
    <m.span style={{ color }} className="inline">
      {word}{" "}
    </m.span>
  );
}

/** Large editorial paragraph whose words light up as it scrolls through the viewport. */
export function Statement({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  if (reduce) return <p className={className}>{text}</p>;
  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
        ))}
      </span>
    </p>
  );
}
