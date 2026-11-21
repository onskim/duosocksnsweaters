"use client";

import { m } from "framer-motion";
import { useState } from "react";
import map from "@/content/world-map.json";
import { regions } from "@/content/site";

type MapData = {
  width: number;
  height: number;
  step: number;
  origin: { x: number; y: number };
  base: string;
  regions: Record<string, string>;
  centers: Record<string, { x: number; y: number }>;
};
const data = map as MapData;

const arc = (from: { x: number; y: number }, to: { x: number; y: number }) => {
  const mx = (from.x + to.x) / 2;
  const my = Math.min(from.y, to.y) - Math.abs(from.x - to.x) * 0.22 - 10;
  return `M${from.x} ${from.y} Q${mx} ${my} ${to.x} ${to.y}`;
};

/** Dotted world map. Regions we ship to are highlighted; hover or focus for details. */
export function WorldMap() {
  const [active, setActive] = useState<string | null>(null);
  const { width: W, height: H, origin } = data;
  const activeRegion = regions.find((r) => r.id === active);
  const dot = data.step * 0.52;

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_300px] lg:items-center">
      <div className="relative" onMouseLeave={() => setActive(null)}>
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-labelledby="map-title map-desc">
          <title id="map-title">Map of regions we ship to</title>
          <desc id="map-desc">Shipments leave from Tirupur, India, to {regions.map((r) => r.name).join(", ")}.</desc>
          <path d={data.base} stroke="#cfc6b6" strokeWidth={dot} strokeLinecap="round" fill="none" />
          {regions.map((r) => {
            const on = active === r.id;
            return (
              <path
                key={r.id}
                d={data.regions[r.id]}
                stroke={on ? "#9A4519" : "#C4622D"}
                strokeOpacity={active && !on ? 0.45 : 1}
                strokeWidth={on ? dot * 1.25 : dot}
                strokeLinecap="round"
                fill="none"
                className="cursor-pointer transition-[stroke-opacity,stroke-width] duration-200"
                style={{ pointerEvents: "stroke" }}
                onMouseEnter={() => setActive(r.id)}
              />
            );
          })}
          {regions
            .filter((r) => r.id !== "india")
            .map((r, i) => (
              <m.path
                key={`arc-${r.id}`}
                d={arc(origin, data.centers[r.id])}
                fill="none"
                stroke="#0F1B2D"
                strokeOpacity={active === r.id ? 0.7 : 0.22}
                strokeWidth={1.2}
                strokeDasharray="1 0"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.1, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden="true"
              />
            ))}
          <circle cx={origin.x} cy={origin.y} r={4.5} fill="#0F1B2D" stroke="#F7F4EE" strokeWidth={1.5} />
        </svg>

        {/* Origin pulse: an HTML element so the animation is composited, not an SVG repaint */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/30 motion-safe:animate-ping"
          style={{ left: `${(origin.x / W) * 100}%`, top: `${(origin.y / H) * 100}%` }}
        />

        {/* Tooltip */}
        {activeRegion && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+14px)] rounded-xl bg-ink px-3.5 py-2.5 text-paper shadow-xl"
            style={{ left: `${(data.centers[activeRegion.id].x / W) * 100}%`, top: `${(data.centers[activeRegion.id].y / H) * 100}%` }}
            role="status"
          >
            <p className="text-sm font-semibold whitespace-nowrap">{activeRegion.name}</p>
            <p className="text-xs whitespace-nowrap text-paper/80">{activeRegion.note}</p>
          </div>
        )}
        <p className="mt-3 flex items-center gap-2 text-sm text-muted">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-ink ring-2 ring-paper" aria-hidden="true" /> Tirupur, India: where every order is consolidated and shipped
        </p>
      </div>

      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1" aria-label="Regions we ship to">
        {regions.map((r) => (
          <li key={r.id}>
            <button
              type="button"
              onMouseEnter={() => setActive(r.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(r.id)}
              onBlur={() => setActive(null)}
              onClick={() => setActive(r.id)}
              aria-pressed={active === r.id}
              className={`flex min-h-11 w-full items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left transition-colors ${active === r.id ? "border-ink bg-ink text-paper" : "border-line bg-white/60 hover:border-ink"}`}
            >
              <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${active === r.id ? "bg-accent-soft" : "bg-accent"}`} aria-hidden="true" />
              <span>
                <span className="block text-sm font-semibold">{r.name}</span>
                <span className={`hidden text-xs lg:block ${active === r.id ? "text-paper/80" : "text-muted"}`}>{r.note}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
