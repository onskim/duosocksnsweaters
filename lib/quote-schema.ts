import { z } from "zod";

/**
 * Where the quote form posts. FormSubmit emails the inbox in the URL.
 * After you confirm the activation email, FormSubmit gives you a random
 * alias; put it in NEXT_PUBLIC_QUOTE_ENDPOINT to hide the address.
 */
export const QUOTE_ENDPOINT = process.env.NEXT_PUBLIC_QUOTE_ENDPOINT ?? "https://formsubmit.co/suba@duosocksnsweaters.com";

/** Upload limit (FormSubmit accepts up to 10 MB in total). */
export const MAX_UPLOAD_MB = 10;
export const MAX_UPLOAD_BYTES = MAX_UPLOAD_MB * 1024 * 1024;
export const MAX_FILES = 5;
export const ALLOWED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png"] as const;
export const ALLOWED_EXTENSIONS = [".pdf", ".jpg", ".jpeg", ".png"];

export const materialOptions = [
  "Cotton / combed cotton",
  "Cotton blends",
  "Bamboo viscose",
  "Polyester / recycled polyester",
  "Nylon / elastane",
  "Wool / merino",
  "Acrylic",
  "Not sure yet",
] as const;

/** A category the buyer can pick. Built on the server from content/products.ts. */
export type QuoteOption = { value: string; label: string };

export const buyerTypes = ["Brand", "Retailer", "Wholesaler", "Other"] as const;
export const timelines = ["As soon as possible", "Within 1–3 months", "Within 3–6 months", "Flexible / planning ahead"] as const;

const trimmed = (max: number) => z.string().trim().max(max, `Keep this under ${max} characters.`);
const required = (msg: string, max = 200) => z.string().trim().min(1, msg).max(max, `Keep this under ${max} characters.`);

export const stepProductSchema = z.object({
  categories: z.array(z.string().trim().min(1).max(60)).min(1, "Choose at least one category.").max(30),
  productType: required("Describe the product, for example “men's cushioned crew, 3-pack”.", 300),
  quantity: z.coerce
    .number({ error: "Enter a quantity in pieces." })
    .int("Use a whole number.")
    .min(1, "Enter a quantity in pieces.")
    .max(100_000_000, "That looks too large. Check the number."),
  material: z.enum(materialOptions, { error: "Choose a material, or “Not sure yet”." }),
  privateLabel: z.enum(["yes", "no"], { error: "Choose yes or no." }),
  packaging: trimmed(500).optional().default(""),
});

export const stepBusinessSchema = z.object({
  name: required("Enter your name.", 120),
  company: required("Enter your company name.", 160),
  buyerType: z.enum(buyerTypes, { error: "Choose a buyer type." }),
  country: required("Enter your country.", 80),
  email: z.string().trim().email("Enter a valid email address.").max(200),
  phone: z
    .string()
    .trim()
    .min(6, "Enter a phone or WhatsApp number with country code.")
    .max(30, "That number looks too long.")
    .regex(/^[+()\d\s.-]+$/, "Use digits, spaces and + only."),
});

export const stepDetailsSchema = z.object({
  timeline: z.enum(timelines, { error: "Choose a target timeline." }),
  targetPrice: trimmed(120).optional().default(""),
  message: trimmed(3000).optional().default(""),
});

export const quoteSchema = z.object({
  ...stepProductSchema.shape,
  ...stepBusinessSchema.shape,
  ...stepDetailsSchema.shape,
  /** Honeypot. Real users never see or fill this. */
  website: z.string().max(0).optional().default(""),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

export const stepSchemas = [stepProductSchema, stepBusinessSchema, stepDetailsSchema] as const;

export type FileCheck = { ok: true } | { ok: false; error: string };

export function checkFiles(files: { name: string; size: number; type: string }[]): FileCheck {
  if (files.length > MAX_FILES) return { ok: false, error: `Attach up to ${MAX_FILES} files.` };
  let total = 0;
  for (const f of files) {
    const ext = f.name.toLowerCase().slice(f.name.lastIndexOf("."));
    if (!ALLOWED_FILE_TYPES.includes(f.type as (typeof ALLOWED_FILE_TYPES)[number]) || !ALLOWED_EXTENSIONS.includes(ext)) {
      return { ok: false, error: `“${f.name}” is not a PDF, JPG or PNG.` };
    }
    total += f.size;
  }
  if (total > MAX_UPLOAD_BYTES) return { ok: false, error: `Files total more than ${MAX_UPLOAD_MB} MB. Send larger files by email instead.` };
  return { ok: true };
}

export const categoryLabel = (options: QuoteOption[], value: string) => options.find((o) => o.value === value)?.label ?? value;
