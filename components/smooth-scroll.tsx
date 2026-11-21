"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getLenis, setLenis } from "@/lib/lenis";

/** Lenis smooth scrolling. Never starts when prefers-reduced-motion is set. */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let cancelled = false;
    let destroy: (() => void) | null = null;

    const start = async () => {
      if (mq.matches || getLenis()) return;
      const { default: Lenis } = await import("lenis");
      if (cancelled || mq.matches) return;
      const lenis = new Lenis({ duration: 1.05, smoothWheel: true, anchors: { offset: -90 } });
      setLenis(lenis);
      const loop = (t: number) => {
        lenis.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      destroy = () => {
        cancelAnimationFrame(raf);
        lenis.destroy();
        setLenis(null);
      };
    };
    const onChange = () => {
      if (mq.matches) {
        destroy?.();
        destroy = null;
      } else start();
    };

    start();
    mq.addEventListener("change", onChange);
    return () => {
      cancelled = true;
      mq.removeEventListener("change", onChange);
      destroy?.();
    };
  }, []);

  // Reset scroll position on route change.
  useEffect(() => {
    getLenis()?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
