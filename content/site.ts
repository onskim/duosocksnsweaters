/**
 * Company-wide facts and copy. Edit here, not in components.
 * Every number on the site comes from this file. Do not add figures,
 * certifications or client names that the business has not confirmed.
 */

export const site = {
  name: "Duo Socks n Sweaters",
  shortName: "Duo",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://duosocksnsweaters.com",
  tagline: "One partner. 7 factories. Every order inspected before it ships.",
  description:
    "Sourcing and export partner for socks and sweaters, based in Tirupur, India. We match your order to the right factory in a network of 7, run independent QC and handle export.",
  email: "suba@duosocksnsweaters.com",
  whatsapp: {
    /** International format, digits only, for wa.me links. */
    number: "918667077664",
    display: "+91 86670 77664",
  },
  location: {
    city: "Tirupur",
    region: "Tamil Nadu",
    country: "India",
    countryCode: "IN",
  },
} as const;

export type Stat = { value: number; suffix: string; label: string; format?: "compact" };

export const stats: Stat[] = [
  { value: 7, suffix: "", label: "Vetted partner factories" },
  { value: 500000, suffix: "+", label: "Pieces per month across the network" },
  { value: 15, suffix: "+", label: "Years in textile sourcing" },
  { value: 7, suffix: "+", label: "Regions shipped to" },
];

export type Region = {
  id: string;
  name: string;
  note: string;
};

/** Regions we ship to. Keep in sync with scripts/build-world-map.mjs. */
export const regions: Region[] = [
  { id: "europe", name: "Europe", note: "Most of the EU and wider Europe" },
  { id: "uk", name: "United Kingdom", note: "England, Scotland, Wales, Northern Ireland" },
  { id: "usa", name: "United States", note: "All states" },
  { id: "canada", name: "Canada", note: "All provinces" },
  { id: "australia", name: "Australia", note: "All states and territories" },
  { id: "middle-east", name: "Middle East", note: "Gulf and wider region" },
  { id: "india", name: "India", note: "Domestic brands, retailers and wholesalers" },
];

export type ProcessStep = {
  id: string;
  name: string;
  summary: string;
  weDo: string[];
  youReceive: string[];
};

/** The 7-step process. No lead times are published; they are set per order. */
export const processSteps: ProcessStep[] = [
  {
    id: "inquiry",
    name: "Inquiry",
    summary: "You tell us what you need. We ask the questions that shape the order.",
    weDo: [
      "Review your brief, tech pack or reference samples.",
      "Clarify yarn, construction, sizing, packaging and target markets.",
      "Shortlist partner factories suited to the product.",
    ],
    youReceive: ["A written summary of your requirements", "A sampling plan"],
  },
  {
    id: "sampling",
    name: "Sampling",
    summary: "The matched factory makes samples. You check fit, hand feel and colour.",
    weDo: [
      "Brief the factory and follow sample development.",
      "Check samples against your spec before they leave Tirupur.",
      "Collect your comments and manage revisions.",
    ],
    youReceive: ["Physical samples", "A sample comments sheet for each round"],
  },
  {
    id: "costing",
    name: "Costing",
    summary: "Once the sample is right, we cost it. One quote, built on the approved spec.",
    weDo: [
      "Cost yarn, knitting, finishing, packaging and freight terms.",
      "Agree minimum quantities and payment terms with the factory.",
    ],
    youReceive: ["A written quote tied to the approved spec", "Clear commercial terms"],
  },
  {
    id: "production",
    name: "Production",
    summary: "We place the order and stay on the floor until it is done.",
    weDo: [
      "Confirm yarn booking and the production schedule.",
      "Visit the factory during production and flag issues early.",
    ],
    youReceive: ["A production schedule", "Regular status updates with photos"],
  },
  {
    id: "quality-control",
    name: "Quality Control",
    summary: "Our team inspects independently of the factory, at set checkpoints.",
    weDo: [
      "Check yarn and materials before knitting starts.",
      "Inspect inline, measure, and run a final random inspection.",
    ],
    youReceive: ["Inspection reports with photos", "A go / no-go decision before shipment"],
  },
  {
    id: "packaging",
    name: "Packaging",
    summary: "Your label, your packaging, your carton marks. Checked before sealing.",
    weDo: [
      "Coordinate labels, inserts, hangers, polybags and barcodes.",
      "Check packing and carton marks against your instructions.",
    ],
    youReceive: ["Packaging approval photos", "A packing list"],
  },
  {
    id: "shipping",
    name: "Shipping",
    summary: "We prepare export documents and hand over to your forwarder or ours.",
    weDo: [
      "Prepare export documentation and book cargo.",
      "Coordinate with your freight forwarder, or arrange one for you.",
    ],
    youReceive: ["Shipping documents", "Shipment tracking details"],
  },
];

export type QcCheck = { id: string; name: string; when: string; what: string[] };

/** QC checkpoints. Only list checks the team actually performs. */
export const qcChecks: QcCheck[] = [
  {
    id: "material",
    name: "Yarn and material check",
    when: "Before knitting starts",
    what: [
      "Yarn type and blend match the approved spec",
      "Colour matched against the approved standard",
      "Trims, elastics and labels match what was approved",
    ],
  },
  {
    id: "inline",
    name: "Inline production inspection",
    when: "During production",
    what: [
      "Knitting, linking and finishing checked on the line",
      "Defects found early, while they can still be corrected",
      "Construction compared with the approved sample",
    ],
  },
  {
    id: "measurement",
    name: "Measurement and size check",
    when: "During and after production",
    what: [
      "Key measurements checked against your size chart",
      "Size labelling and size mix checked",
      "Stretch and recovery compared with the approved sample",
    ],
  },
  {
    id: "final",
    name: "Final random inspection",
    when: "When the order is packed",
    what: [
      "Random sample pulled from finished, packed goods",
      "Sample size and acceptance level agreed with you before production",
      "Workmanship, appearance and labelling checked",
    ],
  },
  {
    id: "packing",
    name: "Packing check",
    when: "Before cartons are sealed",
    what: [
      "Packaging, inserts and barcodes match your instructions",
      "Carton quantities, marks and packing list reconciled",
    ],
  },
];

export const whySourcing = [
  {
    title: "One point of contact",
    body: "One team handles your order from first email to shipment. You do not chase five factories.",
  },
  {
    title: "The right factory for each product",
    body: "Terry, compression and fine-gauge dress socks need different machines. We place each product where it is made best.",
  },
  {
    title: "Independent quality control",
    body: "Our inspectors do not work for the factory. They check your order at set points and report to you.",
  },
  {
    title: "Export handled end to end",
    body: "Documents, cartons, cargo booking and forwarder coordination. Your goods leave India ready to clear.",
  },
];

export const whatsappMessage = (product = "___") =>
  `Hi ${site.name}, I'd like a quote for ${product}.`;

export const whatsappHref = (product?: string) =>
  `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(whatsappMessage(product))}`;

/** Home hero photo: representative stock photo, not our facility or a client's product. */
export const heroImage = {
  src: "/images/socks-home-hero.jpg",
  alt: "Shelves of folded socks in white, grey, brown, yellow and red",
  width: 2400,
  height: 1500,
};
