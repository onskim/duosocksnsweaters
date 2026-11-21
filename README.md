# Duo Socks n Sweaters: marketing site

Marketing website for **Duo Socks n Sweaters**, a sourcing and export partner for socks and sweaters in Tirupur, India.
Live at **https://duosocksnsweaters.com** (GitHub Pages).

- Next.js 16 (App Router, static export), TypeScript, Tailwind CSS 4
- Framer Motion for animation, Lenis for smooth scrolling (both respect `prefers-reduced-motion`)
- Quote form: 3-step form with Zod validation, delivered by email through [FormSubmit](https://formsubmit.co)
- Every page is static HTML. No server, database, CMS or login.

## 1. Run it locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev          # http://localhost:3000
```

Production build (writes the static site to `out/`):

```bash
npm run build
```

Other scripts: `npm run lint`, `npm run typecheck`, `npm run images` (rebuild image sizes), `npm run map` (rebuild the world map).

## 2. Deploying (GitHub Pages)

Every push to `main` builds and deploys automatically through `.github/workflows/deploy.yml`.

- **Settings → Pages → Source** must be **GitHub Actions**.
- **Custom domain:** `duosocksnsweaters.com` (also in `public/CNAME`). Tick **Enforce HTTPS** once the certificate is issued.
- **DNS (at GoDaddy):** the domain keeps GoDaddy nameservers so email keeps working. Records used:

| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | `onskim.github.io` |

Do not change MX or email TXT records.

## 3. The quote form

The site is static, so form emails are sent by **FormSubmit** (free, no account):

1. The form posts to `https://formsubmit.co/suba@duosocksnsweaters.com` with all fields and attachments.
2. **First time only:** FormSubmit emails an activation link to that inbox. Click **Activate Form**. Until then, inquiries are held.
3. After activation, FormSubmit emails each inquiry (table layout, buyer as reply-to, attachments included) and sends the buyer an automatic confirmation.
4. The buyer passes FormSubmit's spam check, then lands on `/thank-you/`.

Optional: FormSubmit's activation email gives you a random alias. Put it in `NEXT_PUBLIC_QUOTE_ENDPOINT` (repository **Settings → Secrets and variables → Actions → Variables**, then reference it in the workflow) to hide the email address from the page source.

Spam protection: a hidden honeypot field (`_honey`) and FormSubmit's reCAPTCHA. Attachments: PDF, JPG or PNG, up to 5 files, 10 MB total.

## 4. Editing content

| What | Where |
|---|---|
| All 11 sock and 13 sweater categories: copy, materials, construction, SEO titles, photos | `content/products.ts` |
| Company facts: email, WhatsApp, stats, regions, 7-step process, QC checkpoints | `content/site.ts` |
| Page layouts | `app/**/page.tsx`, shared templates in `components/` |

**Add a category:** copy an entry in `sockCategories` or `sweaterCategories`, change the `slug` and text, and add its photos (see below). The page, menu, footer, sitemap and quote form pick it up automatically.

### Content rules
- We are a sourcing and export partner. Never call the company a manufacturer or factory.
- No medical or therapeutic claims for compression or diabetic socks. Describe construction only.
- No invented numbers, certifications, client names, logos or testimonials. No prices.

## 5. Photos

Original photos live in `images-src/`. `npm run images` turns each into WebP files at 480, 960, 1440 and 1920 px in `public/images/`, and `lib/image-loader.ts` serves the right size to each screen (GitHub Pages cannot resize images on the fly).

To replace a photo, save the new one in `images-src/` **with the same file name**, run `npm run images`, update its `alt` text in `content/products.ts`, and commit.

| Image | Ratio | Size | File name |
|---|---|---|---|
| Category hero | 3:2 | 1800 × 1200 | `socks-<slug>-hero.jpg`, `sweaters-<slug>-hero.jpg` |
| Category gallery | 4:5 | 1200 × 1500 | `…-01.jpg` to `…-03.jpg` |
| Home hero | 8:5 | 2400 × 1500 | `socks-home-hero.jpg` |

Current photos are free stock images from Unsplash (see `CREDITS.md`). They are representative, not photos of our partner factories, team or a buyer's products. Replace them with your own product photography when you have it.

## 6. Structure

```
app/                 routes (all static): home, socks, sweaters, process, QC, about, quote, privacy
components/          header + mega menu, footer, photo hero, category template, quote form + modal…
content/products.ts  all product and category content
content/site.ts      company facts, stats, regions, process, QC
images-src/          original photos
public/images/       generated WebP sizes (npm run images)
lib/                 Zod schema, image loader, SEO helpers
```
