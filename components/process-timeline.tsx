"use client";

import { m, useScroll, useTransform, useReducedMotion, useSpring } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { processSteps } from "@/content/site";
import { ArrowRight } from "./icons";

/**
 * Home "How it works" preview. On tablet/desktop the section pins and the
 * steps scroll horizontally with page scroll. On phones, and with reduced
 * motion, it is a plain list.
 */
export function ProcessTimeline() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const [distance, setDistance] = useState(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const measure = () => {
      const on = mq.matches && !reduce;
      setEnabled(on);
      if (on && track.current) setDistance(Math.max(0, track.current.scrollWidth - track.current.clientWidth + 48));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    mq.addEventListener("change", measure);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", measure);
    };
  }, [reduce]);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const x = useTransform(smooth, (v) => (enabled ? -v * distance : 0));
  const bar = useTransform(smooth, (v) => (enabled ? v : 1));

  return (
    <section
      ref={section}
      aria-labelledby="process-title"
      className="relative bg-stone/50 md:h-[300vh] md:motion-reduce:h-auto"
      style={enabled && distance ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div className="py-20 md:sticky md:top-0 md:flex md:h-screen md:flex-col md:justify-center md:overflow-hidden md:py-0 md:motion-reduce:static md:motion-reduce:h-auto md:motion-reduce:py-24">
        <div className="container-x">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">How it works</p>
              <h2 id="process-title" className="mt-5 max-w-[16ch] text-h1 text-balance">Seven steps. <em>One team</em> accountable for all of them.</h2>
            </div>
            <Link href="/how-we-work/" className="inline-flex items-center gap-2 font-semibold underline-offset-4 hover:underline">
              The full process <ArrowRight />
            </Link>
          </div>
          <div className="mt-10 hidden h-px bg-line md:block" aria-hidden="true">
            <m.div className="h-px origin-left bg-accent-strong" style={{ scaleX: bar }} />
          </div>
        </div>
        <m.ol
          ref={track}
          style={{ x }}
          className="container-x mt-10 flex flex-col gap-4 md:mt-12 md:flex-row md:gap-6 md:overflow-visible md:motion-reduce:overflow-x-auto md:motion-reduce:pb-4"
        >
          {processSteps.map((s, i) => (
            <li key={s.id} className="card flex shrink-0 flex-col p-6 md:w-[360px] md:p-8 lg:w-[400px]">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-6xl text-accent italic md:text-7xl" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">Step {i + 1} of 7</span>
              </div>
              <h3 className="mt-6 text-h3">{s.name}</h3>
              <p className="mt-3 text-muted">{s.summary}</p>
              <p className="mt-auto pt-6 text-sm">
                <span className="font-semibold">You receive: </span>
                {s.youReceive.join("; ").toLowerCase().replace(/^./, (c) => c.toUpperCase())}.
              </p>
            </li>
          ))}
        </m.ol>
      </div>
    </section>
  );
}
