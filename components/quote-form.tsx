"use client";

import { AnimatePresence, m } from "framer-motion";
import { useId, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { site, whatsappHref } from "@/content/site";
import {
  ALLOWED_EXTENSIONS,
  QUOTE_ENDPOINT,
  categoryLabel,
  materialOptions,
  type QuoteOption,
  MAX_FILES,
  MAX_UPLOAD_MB,
  buyerTypes,
  checkFiles,
  stepSchemas,
  timelines,
} from "@/lib/quote-schema";
import { useQuoteOptions } from "./quote-modal";
import { ArrowLeft, ArrowRight, Check, Close, Mail, Upload, WhatsApp } from "./icons";

type Values = {
  categories: string[];
  productType: string;
  quantity: string;
  material: string;
  privateLabel: string;
  packaging: string;
  name: string;
  company: string;
  buyerType: string;
  country: string;
  email: string;
  phone: string;
  timeline: string;
  targetPrice: string;
  message: string;
  website: string;
};

type Errors = Partial<Record<keyof Values | "files" | "form", string>>;

const STEPS = ["Product", "Business", "Details"] as const;

const empty: Values = {
  categories: [],
  productType: "",
  quantity: "",
  material: "",
  privateLabel: "",
  packaging: "",
  name: "",
  company: "",
  buyerType: "",
  country: "",
  email: "",
  phone: "",
  timeline: "",
  targetPrice: "",
  message: "",
  website: "",
};

const formatBytes = (n: number) => (n > 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`);

/**
 * Sends the request with a normal multipart form POST to FormSubmit
 * (https://formsubmit.co), which emails it to QUOTE_ENDPOINT's inbox with
 * attachments and sends the buyer an automatic confirmation. GitHub Pages
 * has no server, so this is how the email is sent. The browser shows
 * FormSubmit's spam check, then returns to /thank-you/.
 */
function submitToFormSubmit(v: Values, files: File[], options: QuoteOption[]) {
  const label = (x: string) => categoryLabel(options, x);
  const form = document.createElement("form");
  form.method = "POST";
  form.action = QUOTE_ENDPOINT;
  form.enctype = "multipart/form-data";
  form.acceptCharset = "UTF-8";
  form.style.display = "none";
  const add = (name: string, value: string) => {
    const i = document.createElement("input");
    i.type = "hidden";
    i.name = name;
    i.value = value;
    form.appendChild(i);
  };
  const first = v.name.trim().split(" ")[0];
  add("_subject", `Quote request: ${v.company} (${v.country}) · ${v.categories.map(label).join(", ")}`);
  add("_template", "table");
  add("_next", `${window.location.origin}/thank-you/`);
  add("_honey", v.website);
  add(
    "_autoresponse",
    `Thank you, ${first}. We have received your quote request for ${v.categories.map(label).join(", ")}. We will review your brief and reply with questions or a sampling plan. You can also reach us on WhatsApp: ${site.whatsapp.display}. ${site.name}`,
  );
  add("Categories", v.categories.map(label).join(", "));
  add("Product type", v.productType);
  add("Quantity (pieces)", v.quantity);
  add("Material preference", v.material);
  add("Private label", v.privateLabel === "yes" ? "Yes" : "No");
  add("Packaging", v.packaging || "-");
  add("Name", v.name);
  add("Company", v.company);
  add("Buyer type", v.buyerType);
  add("Country", v.country);
  add("email", v.email);
  add("Phone / WhatsApp", v.phone);
  add("Target timeline", v.timeline);
  add("Target price", v.targetPrice || "-");
  add("Message", v.message || "-");
  if (files.length) {
    const input = document.createElement("input");
    input.type = "file";
    input.name = "attachment";
    input.multiple = true;
    const dt = new DataTransfer();
    files.forEach((f) => dt.items.add(f));
    input.files = dt.files;
    form.appendChild(input);
  }
  document.body.appendChild(form);
  form.submit();
}

export function QuoteForm({ initialCategories = [], onClose }: { initialCategories?: string[]; onClose?: () => void }) {
  const quoteCategoryOptions = useQuoteOptions();
  const uid = useId().replace(/:/g, "");
  const id = (name: string) => `${uid}-${name}`;
  const valid = useMemo(() => new Set(quoteCategoryOptions.map((o) => o.value)), [quoteCategoryOptions]);
  const [values, setValues] = useState<Values>({ ...empty, categories: initialCategories.filter((c) => valid.has(c)) });
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [announce, setAnnounce] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };
  const onText = (key: keyof Values) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    set(key, e.target.value as never);

  const toggleCategory = (value: string) =>
    set("categories", values.categories.includes(value) ? values.categories.filter((c) => c !== value) : [...values.categories, value]);

  const validateStep = (s: number): boolean => {
    const result = stepSchemas[s].safeParse(values);
    const next: Errors = {};
    if (!result.success) {
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof Values;
        if (key && !next[key]) next[key] = issue.message;
      }
    }
    if (s === 2) {
      const fc = checkFiles(files);
      if (!fc.ok) next.files = fc.error;
    }
    setErrors(next);
    const keys = Object.keys(next);
    if (keys.length) {
      setAnnounce(`${keys.length} ${keys.length === 1 ? "field needs" : "fields need"} attention: ${Object.values(next).join(" ")}`);
      requestAnimationFrame(() => {
        const first = formRef.current?.querySelector<HTMLElement>("[aria-invalid='true'], [data-invalid='true'] input");
        first?.focus();
      });
      return false;
    }
    return true;
  };

  const goTo = (s: number) => {
    setDir(s > step ? 1 : -1);
    setStep(s);
    setAnnounce(`Step ${s + 1} of 3: ${STEPS[s]}`);
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  const next = () => {
    if (validateStep(step)) goTo(step + 1);
  };

  const onFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const list = Array.from(e.target.files ?? []);
    const merged = [...files, ...list].slice(0, MAX_FILES + 1);
    const fc = checkFiles(merged);
    if (!fc.ok) {
      setErrors((er) => ({ ...er, files: fc.error }));
    } else {
      setFiles(merged);
      setErrors((er) => ({ ...er, files: undefined }));
    }
    e.target.value = "";
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (step < 2) return next();
    if (!validateStep(2)) return;
    // Re-check earlier steps in case of edits.
    for (const s of [0, 1]) {
      if (!stepSchemas[s].safeParse(values).success) {
        goTo(s);
        validateStep(s);
        return;
      }
    }
    setStatus("submitting");
    setAnnounce("Sending your request…");
    try {
      submitToFormSubmit(values, files, quoteCategoryOptions);
    } catch {
      setErrors({ form: "We could not send your request." });
      setStatus("error");
      setAnnounce("Your request was not sent.");
    }
  };

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={id(`${k}-error`)} className="error-text">
        {errors[k]}
      </p>
    ) : null;
  const a11y = (k: keyof Values, hint?: boolean) => ({
    id: id(k),
    name: k,
    "aria-invalid": errors[k] ? (true as const) : (false as const),
    "aria-describedby": [errors[k] ? id(`${k}-error`) : "", hint ? id(`${k}-hint`) : ""].filter(Boolean).join(" ") || undefined,
  });

  if (status === "success") {
    return (
      <div className="py-6 text-center" role="status">
        <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-sage-strong text-white">
          <Check width={28} height={28} />
        </div>
        <h2 ref={headingRef} tabIndex={-1} className="text-h3 outline-none">
          Thank you, {values.name.split(" ")[0]}. Your request is in.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-muted">
          We have sent a confirmation to <strong className="text-ink">{values.email}</strong>. We will review your brief and reply
          with questions or a sampling plan.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a className="btn btn-ghost" href={whatsappHref(values.productType || "my inquiry")} target="_blank" rel="noopener noreferrer">
            <WhatsApp /> Follow up on WhatsApp
          </a>
          {onClose && (
            <button type="button" className="btn btn-primary" onClick={onClose}>
              Close
            </button>
          )}
        </div>
      </div>
    );
  }

  const chip = (selected: boolean) =>
    `inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent-strong ${
      selected ? "border-ink bg-ink text-paper" : "border-[#b9ae9c] bg-white hover:border-ink"
    }`;

  return (
    <form ref={formRef} onSubmit={submit} noValidate aria-labelledby={id("title")} className="relative">
      <p className="sr-only" aria-live="polite" role="status">
        {announce}
      </p>

      {/* Progress */}
      <ol className="mb-8 grid grid-cols-3 gap-2" aria-label="Form progress">
        {STEPS.map((label, i) => (
          <li key={label} aria-current={i === step ? "step" : undefined}>
            <div className="h-1 overflow-hidden rounded-full bg-stone">
              <m.div
                className="h-full bg-accent-strong"
                initial={false}
                animate={{ width: i < step ? "100%" : i === step ? "50%" : "0%" }}
                transition={{ duration: 0.35 }}
              />
            </div>
            <p className={`mt-2 text-xs font-semibold tracking-wide uppercase ${i <= step ? "text-ink" : "text-muted"}`}>
              <span className="sr-only">Step </span>
              {i + 1}
              <span className="sr-only"> of 3</span>. {label}
              {i < step && <span className="sr-only"> (complete)</span>}
            </p>
          </li>
        ))}
      </ol>

      <h2 id={id("title")} ref={headingRef} tabIndex={-1} className="mb-6 text-h3 outline-none">
        {step === 0 && "What do you need?"}
        {step === 1 && "Who are we talking to?"}
        {step === 2 && "Timeline and details"}
      </h2>

      {/* Honeypot: hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("website")}>Website</label>
        <input id={id("website")} name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={onText("website")} />
      </div>

      <AnimatePresence mode="wait" initial={false} custom={dir}>
        <m.div
          key={step}
          custom={dir}
          initial={{ opacity: 0, x: dir * 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir * -24 }}
          transition={{ duration: 0.22 }}
          className="space-y-6"
        >
          {step === 0 && (
            <>
              <fieldset data-invalid={errors.categories ? "true" : undefined} aria-describedby={errors.categories ? id("categories-error") : undefined}>
                <legend className="label">
                  Categories <span className="font-normal text-muted">(choose all that apply)</span>
                </legend>
                <div className="flex flex-wrap gap-2">
                  {quoteCategoryOptions.map((o) => {
                    const on = values.categories.includes(o.value);
                    return (
                      <label key={o.value} className={chip(on)}>
                        <input
                          type="checkbox"
                          className="sr-only"
                          name="categories"
                          value={o.value}
                          checked={on}
                          onChange={() => toggleCategory(o.value)}
                          aria-invalid={errors.categories ? true : undefined}
                        />
                        {on && <Check width={15} height={15} />}
                        {o.label}
                      </label>
                    );
                  })}
                </div>
                {err("categories")}
              </fieldset>

              <div>
                <label className="label" htmlFor={id("productType")}>
                  Product type
                </label>
                <input className="field" type="text" {...a11y("productType", true)} value={values.productType} onChange={onText("productType")} />
                <p id={id("productType-hint")} className="hint mt-1">
                  For example: men&apos;s cushioned crew, 3-pack, sizes 6–11.
                </p>
                {err("productType")}
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="label" htmlFor={id("quantity")}>
                    Quantity (pieces)
                  </label>
                  <input className="field" type="number" inputMode="numeric" min={1} step={1} {...a11y("quantity")} value={values.quantity} onChange={onText("quantity")} />
                  {err("quantity")}
                </div>
                <div>
                  <label className="label" htmlFor={id("material")}>
                    Material preference
                  </label>
                  <select className="field" {...a11y("material")} value={values.material} onChange={onText("material")}>
                    <option value="">Choose…</option>
                    {materialOptions.map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                  {err("material")}
                </div>
              </div>

              <fieldset data-invalid={errors.privateLabel ? "true" : undefined} aria-describedby={errors.privateLabel ? id("privateLabel-error") : undefined}>
                <legend className="label">Private label?</legend>
                <div className="flex gap-2">
                  {[
                    ["yes", "Yes, under my brand"],
                    ["no", "No"],
                  ].map(([v, l]) => (
                    <label key={v} className={chip(values.privateLabel === v)}>
                      <input
                        type="radio"
                        className="sr-only"
                        name="privateLabel"
                        value={v}
                        checked={values.privateLabel === v}
                        onChange={() => set("privateLabel", v)}
                      />
                      {l}
                    </label>
                  ))}
                </div>
                {err("privateLabel")}
              </fieldset>

              <div>
                <label className="label" htmlFor={id("packaging")}>
                  Packaging requirements <span className="font-normal text-muted">(optional)</span>
                </label>
                <textarea className="field min-h-24" rows={3} {...a11y("packaging")} value={values.packaging} onChange={onText("packaging")} placeholder="Header cards, polybags, boxes, barcodes…" />
                {err("packaging")}
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="label" htmlFor={id("name")}>
                    Your name
                  </label>
                  <input className="field" type="text" autoComplete="name" {...a11y("name")} value={values.name} onChange={onText("name")} />
                  {err("name")}
                </div>
                <div>
                  <label className="label" htmlFor={id("company")}>
                    Company
                  </label>
                  <input className="field" type="text" autoComplete="organization" {...a11y("company")} value={values.company} onChange={onText("company")} />
                  {err("company")}
                </div>
              </div>
              <fieldset data-invalid={errors.buyerType ? "true" : undefined} aria-describedby={errors.buyerType ? id("buyerType-error") : undefined}>
                <legend className="label">Buyer type</legend>
                <div className="flex flex-wrap gap-2">
                  {buyerTypes.map((b) => (
                    <label key={b} className={chip(values.buyerType === b)}>
                      <input
                        type="radio"
                        className="sr-only"
                        name="buyerType"
                        value={b}
                        checked={values.buyerType === b}
                        onChange={() => set("buyerType", b)}
                      />
                      {b}
                    </label>
                  ))}
                </div>
                {err("buyerType")}
              </fieldset>
              <div>
                <label className="label" htmlFor={id("country")}>
                  Country
                </label>
                <input className="field" type="text" autoComplete="country-name" {...a11y("country")} value={values.country} onChange={onText("country")} />
                {err("country")}
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="label" htmlFor={id("email")}>
                    Work email
                  </label>
                  <input className="field" type="email" autoComplete="email" inputMode="email" {...a11y("email")} value={values.email} onChange={onText("email")} />
                  {err("email")}
                </div>
                <div>
                  <label className="label" htmlFor={id("phone")}>
                    Phone or WhatsApp
                  </label>
                  <input className="field" type="tel" autoComplete="tel" inputMode="tel" {...a11y("phone", true)} value={values.phone} onChange={onText("phone")} />
                  <p id={id("phone-hint")} className="hint mt-1">
                    Include the country code, e.g. +44.
                  </p>
                  {err("phone")}
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="label" htmlFor={id("timeline")}>
                    Target timeline
                  </label>
                  <select className="field" {...a11y("timeline")} value={values.timeline} onChange={onText("timeline")}>
                    <option value="">Choose…</option>
                    {timelines.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                  {err("timeline")}
                </div>
                <div>
                  <label className="label" htmlFor={id("targetPrice")}>
                    Target price <span className="font-normal text-muted">(optional)</span>
                  </label>
                  <input className="field" type="text" {...a11y("targetPrice", true)} value={values.targetPrice} onChange={onText("targetPrice")} />
                  <p id={id("targetPrice-hint")} className="hint mt-1">
                    Per piece or per pair, with currency and terms.
                  </p>
                  {err("targetPrice")}
                </div>
              </div>
              <div>
                <label className="label" htmlFor={id("message")}>
                  Message <span className="font-normal text-muted">(optional)</span>
                </label>
                <textarea className="field min-h-32" rows={5} {...a11y("message")} value={values.message} onChange={onText("message")} placeholder="Anything else: target markets, certifications you need, reference brands, sizes…" />
                {err("message")}
              </div>
              <div>
                <span className="label" id={id("files-label")}>
                  Tech pack or reference images <span className="font-normal text-muted">(optional)</span>
                </span>
                <label
                  htmlFor={id("files")}
                  className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[#b9ae9c] bg-white px-4 py-6 text-center transition-colors hover:border-ink has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent-strong"
                >
                  <Upload />
                  <span className="text-sm font-semibold">Choose files</span>
                  <span className="hint">
                    PDF, JPG or PNG · up to {MAX_FILES} files · {MAX_UPLOAD_MB} MB total
                  </span>
                  <input
                    id={id("files")}
                    type="file"
                    multiple
                    accept={ALLOWED_EXTENSIONS.join(",")}
                    className="sr-only"
                    onChange={onFiles}
                    aria-labelledby={id("files-label")}
                    aria-describedby={errors.files ? id("files-error") : undefined}
                    aria-invalid={errors.files ? true : false}
                  />
                </label>
                {files.length > 0 && (
                  <ul className="mt-3 space-y-2" aria-label="Attached files">
                    {files.map((f, i) => (
                      <li key={`${f.name}-${i}`} className="flex items-center justify-between gap-3 rounded-xl bg-stone/60 px-3 py-2 text-sm">
                        <span className="truncate">
                          {f.name} <span className="text-muted">· {formatBytes(f.size)}</span>
                        </span>
                        <button
                          type="button"
                          className="grid h-9 w-9 shrink-0 place-items-center rounded-full hover:bg-stone"
                          onClick={() => setFiles(files.filter((_, j) => j !== i))}
                          aria-label={`Remove ${f.name}`}
                        >
                          <Close width={16} height={16} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                {err("files")}
              </div>
              <p className="hint">
                By sending this form you agree that we use your details to reply to your inquiry. See our{" "}
                <a href="/privacy-policy/" className="underline underline-offset-2">
                  privacy policy
                </a>
                .
              </p>
            </>
          )}
        </m.div>
      </AnimatePresence>

      {status === "error" && (
        <div role="alert" className="mt-6 rounded-2xl border border-[#e8b4a8] bg-[#fdf1ee] p-4 text-sm">
          <p className="font-semibold">{errors.form ?? "We could not send your request."}</p>
          <p className="mt-1 text-muted">Your details are still here. Try again, or reach us directly:</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <a className="inline-flex items-center gap-2 font-semibold underline underline-offset-2" href={`mailto:${site.email}?subject=${encodeURIComponent("Quote request")}`}>
              <Mail width={18} height={18} /> {site.email}
            </a>
            <a className="inline-flex items-center gap-2 font-semibold underline underline-offset-2" href={whatsappHref(values.productType || undefined)} target="_blank" rel="noopener noreferrer">
              <WhatsApp width={18} height={18} /> WhatsApp {site.whatsapp.display}
            </a>
          </div>
        </div>
      )}

      <div className="mt-8 flex items-center justify-between gap-3">
        {step > 0 ? (
          <button type="button" className="btn btn-ghost" onClick={() => goTo(step - 1)}>
            <ArrowLeft /> Back
          </button>
        ) : (
          <span />
        )}
        {step < 2 ? (
          <button type="button" className="btn btn-primary" onClick={next}>
            Continue <ArrowRight />
          </button>
        ) : (
          <button type="submit" className="btn btn-primary" disabled={status === "submitting"} aria-disabled={status === "submitting"}>
            {status === "submitting" ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" /> Sending…
              </>
            ) : (
              <>
                Send request <ArrowRight />
              </>
            )}
          </button>
        )}
      </div>
    </form>
  );
}
