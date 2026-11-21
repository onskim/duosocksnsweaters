// Turns every JPG in /images-src into responsive WebP files in /public/images:
//   <name>-480.webp, <name>-960.webp, <name>-1440.webp, <name>-1920.webp
// GitHub Pages cannot resize images on request, so we pre-build the sizes.
// lib/image-loader.ts picks the right file for each screen.
// Run after adding or replacing a photo: npm run images
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "images-src");
const out = path.join(root, "public/images");
export const WIDTHS = [480, 960, 1440, 1920];

fs.mkdirSync(out, { recursive: true });
let made = 0;
for (const file of fs.readdirSync(src).filter((f) => /\.(jpe?g|png)$/i.test(f))) {
  const name = file.replace(/\.(jpe?g|png)$/i, "");
  const input = path.join(src, file);
  const mtime = fs.statSync(input).mtimeMs;
  for (const w of WIDTHS) {
    const dest = path.join(out, `${name}-${w}.webp`);
    if (fs.existsSync(dest) && fs.statSync(dest).mtimeMs > mtime) continue;
    await sharp(input).resize({ width: w, withoutEnlargement: true }).webp({ quality: 70, effort: 5 }).toFile(dest);
    made++;
  }
}
console.log(`images: ${made} files written to public/images`);
