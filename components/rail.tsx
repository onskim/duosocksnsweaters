"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "./icons";

/** Horizontal, snap-scrolling rail with prev/next buttons. Native scroll, so touch and keyboard work. */
export function Rail({ children, label }: { children: ReactNode; label: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const go = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <div>
      <ul
        ref={ref}
        aria-label={label}
        data-lenis-prevent-wheel
        className="container-x flex snap-x snap-mandatory scroll-px-5 gap-4 md:scroll-px-10 xl:scroll-px-16 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] md:gap-6 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>
      <div className="container-x mt-8 flex items-center justify-end gap-3">
        <button type="button" onClick={() => go(-1)} disabled={edge.start} aria-label="Scroll left" className="grid h-12 w-12 place-items-center rounded-full border border-current/30 transition-opacity disabled:opacity-30">
          <ArrowLeft />
        </button>
        <button type="button" onClick={() => go(1)} disabled={edge.end} aria-label="Scroll right" className="grid h-12 w-12 place-items-center rounded-full border border-current/30 transition-opacity disabled:opacity-30">
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}
