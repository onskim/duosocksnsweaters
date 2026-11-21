import type { NextConfig } from "next";
import path from "node:path";

/**
 * Static export for GitHub Pages. `npm run build` writes the site to /out.
 * Images are pre-sized by scripts/optimize-images.mjs and served by lib/image-loader.ts.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  turbopack: { root: path.resolve(__dirname) },
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    deviceSizes: [480, 768, 1080, 1440, 1920],
    imageSizes: [240, 360],
  },
  poweredByHeader: false,
};

export default nextConfig;
