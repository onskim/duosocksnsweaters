// Builds content/world-map.json: a dotted world map with dots grouped by
// the regions in content/site.ts. Run once: npm run map
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { feature } from "topojson-client";
import { geoContains, geoBounds } from "d3-geo";

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const topo = require("world-atlas/countries-110m.json");
const countries = feature(topo, topo.objects.countries).features;

const regionOf = {
  europe: ["Portugal","Spain","France","Belgium","Netherlands","Luxembourg","Germany","Switzerland","Austria","Italy","Denmark","Norway","Sweden","Finland","Iceland","Ireland","Poland","Czechia","Slovakia","Hungary","Slovenia","Croatia","Bosnia and Herz.","Serbia","Montenegro","Kosovo","Albania","North Macedonia","Macedonia","Greece","Bulgaria","Romania","Moldova","Estonia","Latvia","Lithuania","Cyprus"],
  uk: ["United Kingdom"],
  usa: ["United States of America"],
  canada: ["Canada"],
  australia: ["Australia"],
  "middle-east": ["Saudi Arabia","United Arab Emirates","Qatar","Kuwait","Oman","Bahrain","Jordan","Israel","Lebanon"],
  india: ["India"],
};
const lookup = new Map();
for (const [id, names] of Object.entries(regionOf)) for (const n of names) lookup.set(n, id);

const W = 1000, LAT_N = 75, LAT_S = -57;
const H = Math.round((W * (LAT_N - LAT_S)) / 360);
const STEP = 7;
const toLonLat = (x, y) => [(x / W) * 360 - 180, LAT_N - (y / H) * (LAT_N - LAT_S)];
const toXY = ([lon, lat]) => [((lon + 180) / 360) * W, ((LAT_N - lat) / (LAT_N - LAT_S)) * H];

const boxes = countries.map((f) => ({ f, b: geoBounds(f), region: lookup.get(f.properties.name) ?? null }));
const paths = { base: [] };
for (const id of Object.keys(regionOf)) paths[id] = [];

for (let y = STEP / 2; y < H; y += STEP) {
  for (let x = STEP / 2; x < W; x += STEP) {
    const p = toLonLat(x, y);
    for (const { f, b, region } of boxes) {
      const [[w, s], [e, n]] = b;
      const inLon = w <= e ? p[0] >= w && p[0] <= e : p[0] >= w || p[0] <= e;
      if (!inLon || p[1] < s || p[1] > n) continue;
      if (geoContains(f, p)) {
        (region ? paths[region] : paths.base).push(`M${x} ${y}h0`);
        break;
      }
    }
  }
}

const used = Object.fromEntries(Object.entries(regionOf).map(([id, names]) => [id, names.filter((n) => countries.some((c) => c.properties.name === n))]));
const [ox, oy] = toXY([77.34, 11.11]); // Tirupur
const out = {
  width: W,
  height: H,
  step: STEP,
  origin: { x: +ox.toFixed(1), y: +oy.toFixed(1) },
  base: paths.base.join(""),
  regions: Object.fromEntries(Object.keys(regionOf).map((id) => [id, paths[id].join("")])),
  centers: Object.fromEntries(Object.keys(regionOf).map((id) => {
    const pts = paths[id].map((d) => d.slice(1, -2).split(" ").map(Number));
    // Use the median, so outliers (Alaska, islands) do not pull the label away.
    const med = (a) => a.sort((x, y) => x - y)[Math.floor(a.length / 2)];
    return [id, { x: med(pts.map((q) => q[0])), y: med(pts.map((q) => q[1])) }];
  })),
  countries: used,
};
fs.writeFileSync(path.join(root, "content/world-map.json"), JSON.stringify(out));
console.log("dots:", Object.fromEntries(Object.entries(paths).map(([k, v]) => [k, v.length])), "size:", JSON.stringify(out).length);
