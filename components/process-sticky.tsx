"use client";

import { m } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { processSteps } from "@/content/site";
import { Check } from "./icons";

/**
 * How We Work: a sticky step indicator on the left tracks which step is
 * being read on the right.
 */
export function ProcessSticky() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const step = processSteps[active];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
      <aside className="hidden lg:block" aria-hidden="true">
        <div className="sticky top-32">
          <div className="card overflow-hidden p-10">
            <div className="flex items-baseline gap-3">
              <m.span
                key={active}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.35 }}
                className="font-display text-[7rem] leading-none text-accent"
              >
                {String(active + 1).padStart(2, "0")}
              </m.span>
              <span className="text-muted">/ 07</span>
            </div>
            <m.p key={step.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }} className="mt-6 font-display text-3xl">
              {step.name}
            </m.p>
            <ol className="mt-8 space-y-2">
              {processSteps.map((s, i) => (
                <li key={s.id} className="flex items-center gap-3 text-sm">
                  <span
                    className={`grid h-6 w-6 place-items-center rounded-full border text-[0.7rem] transition-colors duration-300 ${
                      i < active ? "border-sage-strong bg-sage-strong text-white" : i === active ? "border-accent-strong bg-accent-strong text-white" : "border-line text-muted"
                    }`}
                  >
                    {i < active ? <Check width={12} height={12} /> : i + 1}
                  </span>
                  <span className={i === active ? "font-semibold" : "text-muted"}>{s.name}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </aside>

      <ol className="space-y-6 lg:space-y-[28vh] lg:pb-[20vh]">
        {processSteps.map((s, i) => (
          <li
            key={s.id}
            id={s.id}
            data-index={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={`card scroll-mt-28 p-6 transition-[border-color,box-shadow] duration-300 md:p-10 ${i === active ? "lg:border-ink/40 lg:shadow-[0_24px_50px_-30px_rgb(15_27_45/0.35)]" : ""}`}
          >
            <p className="eyebrow">Step {i + 1} of 7</p>
            <h2 className="mt-3 text-h2">{s.name}</h2>
            <p className="mt-4 text-lead text-muted">{s.summary}</p>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold tracking-[0.12em] uppercase">What we do</h3>
                <ul className="mt-4 space-y-3">
                  {s.weDo.map((t) => (
                    <li key={t} className="flex gap-3">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-stone/60 p-5">
                <h3 className="text-sm font-semibold tracking-[0.12em] uppercase">What you receive</h3>
                <ul className="mt-4 space-y-3">
                  {s.youReceive.map((t) => (
                    <li key={t} className="flex gap-3">
                      <Check className="mt-0.5 shrink-0 text-sage-strong" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
