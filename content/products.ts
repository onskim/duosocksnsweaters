/**
 * ALL product and category content lives in this file.
 *
 * - Add a sock category: add an object to `sockCategories`. A page is
 *   generated automatically at /socks/<slug>.
 * - Swap images: drop a file with the same name into /public/images,
 *   or change `src` here. Keep width/height to the file's real ratio.
 * - Guardrails: describe construction and specs only. No medical or
 *   therapeutic claims, no prices, no invented numbers or certifications.
 */

export type ProductImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type SpecTable = {
  title: string;
  intro?: string;
  rows: { label: string; value: string }[];
  note?: string;
};

export type Family = "socks" | "sweaters";

export type Category = {
  family: Family;
  slug: string;
  name: string;
  /** Short label for menus and cards. */
  label: string;
  tagline: string;
  /** Two or three short paragraphs. */
  description: string[];
  /** Three specs revealed on card hover. */
  keySpecs: [string, string, string];
  materials: string[];
  construction: string[];
  customisation: string[];
  useCases: string[];
  featured: boolean;
  hero: ProductImage;
  gallery: ProductImage[];
  extra?: SpecTable[];
  seo: { title: string; description: string; keywords: string[] };
};

const HERO_W = 1800;
const HERO_H = 1200;
const GAL_W = 1200;
const GAL_H = 1500;

const hero = (family: string, slug: string, alt: string): ProductImage => ({
  src: `/images/${family}-${slug}-hero.jpg`,
  alt,
  width: HERO_W,
  height: HERO_H,
});

const gallery = (family: string, slug: string, alts: string[]): ProductImage[] =>
  alts.map((alt, i) => ({
    src: `/images/${family}-${slug}-${String(i + 1).padStart(2, "0")}.jpg`,
    alt,
    width: GAL_W,
    height: GAL_H,
  }));

/** Customisation offered on every category. */
export const standardCustomisation = [
  "Private label: your brand on the sock, label and packaging",
  "Custom designs, jacquard patterns and logos",
  "Custom colours matched to your standard",
  "Custom packaging: header cards, bands, boxes, polybags, hangers",
  "Barcodes and retail-ready packing",
];

export const sockCategories: Category[] = [
  {
    family: "socks",
    slug: "ankle",
    name: "Ankle socks",
    label: "Ankle",
    tagline: "Low-cut everyday socks, built for volume programmes.",
    description: [
      "Ankle socks sit just above the shoe line. They are the backbone of most multipack programmes, so consistency between batches matters more than anything.",
      "We place ankle programmes with partner factories that run long, stable production on the same machines, and we check measurements and colour across every batch.",
    ],
    keySpecs: ["Plain or terry sole", "Single or multipacks", "Rib or plain cuff"],
    materials: ["Combed cotton", "Cotton / polyester blends", "Bamboo viscose blends", "Recycled polyester", "Nylon and elastane for stretch"],
    construction: ["Plain knit or half-terry sole", "Rib or plain-knit cuff", "Linked or machine-closed toe", "Heel tab options", "Reinforced heel and toe"],
    customisation: standardCustomisation,
    useCases: ["Retail multipacks", "Private label basics", "Athleisure ranges", "Promotional programmes"],
    featured: true,
    hero: hero("socks", "ankle", "White ankle socks on a teal sofa"),
    gallery: gallery("socks", "ankle", ["Mint ankle socks", "White ankle socks on a linen sheet", "Black ankle socks with jeans"]),
    seo: {
      title: "Ankle Socks Supplier India | Private Label Sourcing",
      description: "Private label ankle socks sourced from vetted factories in Tirupur, India. Custom colours, packaging and independent QC for brands and retailers.",
      keywords: ["ankle socks supplier India", "private label ankle socks", "ankle socks wholesale"],
    },
  },
  {
    family: "socks",
    slug: "terry",
    name: "Terry socks",
    label: "Terry",
    tagline: "Looped-pile cushioning, full or zoned.",
    description: [
      "Terry socks have a looped pile knitted into the inside of the sock. The pile adds cushioning and bulk where it is placed.",
      "Full-terry, half-terry and zoned-terry constructions need different machine set-ups. We match your design to a partner factory that runs that construction every day.",
    ],
    keySpecs: ["Full, half or zoned terry", "Pile height to spec", "Cotton-rich options"],
    materials: ["Combed cotton", "Cotton / polyester blends", "Bamboo viscose blends", "Wool blends for winter terry", "Nylon and elastane"],
    construction: ["Full terry", "Half terry (sole only)", "Zoned terry at heel, toe and sole", "Arch support band", "Hand-linked or machine-closed toe"],
    customisation: standardCustomisation,
    useCases: ["Sports and training", "Work and outdoor", "Winter ranges", "Lounge and home"],
    featured: true,
    hero: hero("socks", "terry", "Grey cushioned hiking socks on a wooden table"),
    gallery: gallery("socks", "terry", ["Cushioned sock with mesh zones", "Stack of ribbed socks in red, blue and navy", "Close-up of a white cushioned sock"]),
    seo: {
      title: "Terry Socks Supplier India | Cushioned Sock Sourcing",
      description: "Full, half and zoned terry socks sourced from specialist factories in Tirupur. Private label, custom colours and independent QC.",
      keywords: ["terry socks supplier", "cushioned socks manufacturer sourcing", "terry socks wholesale India"],
    },
  },
  {
    family: "socks",
    slug: "anti-skid",
    name: "Anti-skid socks",
    label: "Anti-skid",
    tagline: "Grip printed on the sole, placed to your pattern.",
    description: [
      "Anti-skid socks have a grip compound printed or applied to the sole. The pattern, coverage and compound are chosen by the buyer.",
      "We coordinate both the knitting and the grip application, and check grip placement, adhesion and coverage against the approved sample.",
    ],
    keySpecs: ["Silicone or PVC grip", "Full-sole or patterned", "One or both sides"],
    materials: ["Cotton and cotton blends", "Polyester and recycled polyester", "Chenille and soft-touch yarns", "Nylon and elastane"],
    construction: ["Grip dots, waves or custom patterns", "Full-sole or partial grip", "Grip on one or both sides", "Ankle, crew or slipper heights", "Terry or plain sole"],
    customisation: [...standardCustomisation, "Custom grip pattern, including logos in the grip"],
    useCases: ["Yoga and pilates", "Trampoline and play parks", "Home and lounge", "Kids' ranges", "Hospitality"],
    featured: true,
    hero: hero("socks", "anti-skid", "Grip socks on a pilates reformer"),
    gallery: gallery("socks", "anti-skid", ["White socks on a yoga mat", "Putting on socks before a yoga session", "Three knitted socks on white"]),
    seo: {
      title: "Anti-Skid Socks Wholesale | Grip Socks Sourcing India",
      description: "Anti-skid and grip socks sourced in Tirupur, India. Custom grip patterns, private label and independent QC for brands, retailers and wholesalers.",
      keywords: ["anti-skid socks wholesale", "grip socks supplier", "custom grip socks India"],
    },
  },
  {
    family: "socks",
    slug: "compression",
    name: "Compression socks",
    label: "Compression",
    tagline: "Graduated construction, built to your pressure specification.",
    description: [
      "Graduated compression socks are knitted so pressure is highest at the ankle and reduces up the leg. The target pressure range is set by you, in mmHg, in the tech pack.",
      "We source compression programmes from partner factories with the knitting machines and yarn control this construction needs, and we check sizing and construction against the approved sample.",
    ],
    keySpecs: ["Graduated knit", "Pressure range to spec (mmHg)", "Sized by leg measurement"],
    materials: ["Nylon and elastane", "Covered elastane yarns", "Cotton-rich blends", "Merino wool blends", "Moisture-wicking polyester"],
    construction: ["Graduated compression, highest at the ankle", "Knee-high, calf and ankle lengths", "Open or closed toe", "Cushioned or plain sole", "Comfort top band"],
    customisation: standardCustomisation,
    useCases: ["Sports and running", "Travel", "Long shifts on foot", "Everyday wear ranges"],
    featured: true,
    hero: hero("socks", "compression", "Runner in knee-high patterned socks"),
    gallery: gallery("socks", "compression", ["Knee-high white socks", "Knee-high socks raised against the sky", "Runner in striped socks on a trail"]),
    extra: [
      {
        title: "Compression classes",
        intro: "Compression is described by the pressure the sock applies at the ankle, in millimetres of mercury (mmHg). These are the ranges buyers most often specify. You set the range; the sock is built and sampled to it.",
        rows: [
          { label: "8–15 mmHg", value: "Light. Common for everyday and travel ranges." },
          { label: "15–20 mmHg", value: "Moderate. Common for sport, travel and long-shift ranges." },
          { label: "20–30 mmHg", value: "Firm. Usually specified with a size chart based on leg measurements." },
          { label: "30–40 mmHg", value: "Extra firm. Usually sold under medical-device rules in many markets." },
        ],
        note: "Rules for selling compression products differ by market. You are responsible for any registration, testing or labelling your market requires. We build to the specification and labels you provide.",
      },
      {
        title: "Graduated construction and sizing",
        rows: [
          { label: "Graduation", value: "Pressure is highest at the ankle and reduces towards the calf. The gradient is set in the knitting programme." },
          { label: "Sizing", value: "Sized by ankle and calf circumference, often with shoe size as a second guide. The size chart is agreed with you at sampling." },
          { label: "Lengths", value: "Ankle, calf and knee-high." },
          { label: "Fit checks", value: "Measurements are checked against your size chart during production and at final inspection." },
        ],
      },
    ],
    seo: {
      title: "Compression Socks Sourcing | Vetted Manufacturers, India",
      description: "Graduated compression socks sourced from vetted factories in Tirupur, India. Built to your mmHg spec and size chart, with independent QC.",
      keywords: ["compression socks manufacturer sourcing", "compression socks supplier India", "private label compression socks"],
    },
  },
  {
    family: "socks",
    slug: "diabetic",
    name: "Diabetic socks",
    label: "Diabetic",
    tagline: "Non-binding top, seamless toe, soft yarns.",
    description: [
      "Diabetic socks are defined by their construction: a non-binding top that does not grip the leg, a seamless or flat toe, and soft, moisture-managing yarns.",
      "We source them from partner factories that knit non-binding tops and link toes cleanly, and we check those features at every inspection.",
    ],
    keySpecs: ["Non-binding top", "Seamless toe", "Soft, moisture-managing yarns"],
    materials: ["Bamboo viscose blends", "Combed cotton", "Modal blends", "Moisture-wicking polyester", "Soft nylon and low-tension elastane"],
    construction: ["Non-binding, loose-knit top", "Seamless or hand-linked flat toe", "Optional padded sole", "Moisture management through yarn choice", "Light and dark colourways"],
    customisation: standardCustomisation,
    useCases: ["Pharmacy and health retail ranges", "Everyday comfort ranges", "Wholesale and distribution"],
    featured: true,
    hero: hero("socks", "diabetic", "Three plain knitted socks on white"),
    gallery: gallery("socks", "diabetic", ["Grey knitted sock with contrast heel and toe", "Soft white sock, close-up", "Close-up of a soft white cotton sock"]),
    extra: [
      {
        title: "Construction features",
        rows: [
          { label: "Non-binding top", value: "A wide, low-tension top that stays up without gripping the leg." },
          { label: "Seamless toe", value: "Hand-linked or flat-closed toe with no raised ridge." },
          { label: "Moisture management", value: "Yarn blends chosen to move moisture away from the skin." },
          { label: "Soft yarns", value: "Bamboo viscose, combed cotton and modal blends for a soft hand feel." },
        ],
        note: "We describe construction only. Any health or performance claims on your packaging are your responsibility and must meet the rules in your market.",
      },
    ],
    seo: {
      title: "Diabetic Socks Supplier | Non-Binding Socks Sourcing",
      description: "Diabetic socks with non-binding tops and seamless toes, sourced in Tirupur, India. Private label, soft yarns and independent QC.",
      keywords: ["diabetic socks supplier", "non-binding socks manufacturer sourcing", "private label diabetic socks"],
    },
  },
  {
    family: "socks",
    slug: "crew",
    name: "Crew socks",
    label: "Crew",
    tagline: "Mid-calf classics in every weight.",
    description: [
      "Crew socks reach the mid-calf. They cover everything from fine-gauge casual socks to heavy cushioned work socks.",
      "We match the gauge and weight of your design to the right factory, and check colour, measurements and cuff recovery batch to batch.",
    ],
    keySpecs: ["Fine to heavy gauge", "Plain, rib or jacquard", "Terry options"],
    materials: ["Combed cotton", "Cotton / polyester blends", "Bamboo viscose blends", "Wool and merino blends", "Recycled yarns"],
    construction: ["Plain, rib or jacquard knit", "Half or full terry", "Linked or machine-closed toe", "Reinforced heel and toe"],
    customisation: standardCustomisation,
    useCases: ["Casual ranges", "Work and outdoor", "Fashion and novelty", "Retail multipacks"],
    featured: false,
    hero: hero("socks", "crew", "Yellow ribbed crew sock on a yellow background"),
    gallery: gallery("socks", "crew", ["Wall of crew socks in many colours", "Patterned crew socks on display", "Striped socks in soft light"]),
    seo: {
      title: "Crew Socks Supplier India | Private Label Sourcing",
      description: "Private label crew socks sourced from vetted factories in Tirupur, India. Plain, rib and jacquard. Custom colours and independent QC.",
      keywords: ["crew socks supplier India", "private label crew socks", "crew socks wholesale"],
    },
  },
  {
    family: "socks",
    slug: "no-show",
    name: "No-show socks",
    label: "No-show",
    tagline: "Hidden below the shoe line, with a heel grip that holds.",
    description: [
      "No-show socks sit below the shoe line. Fit and heel grip decide whether they work, so both are checked on every sample round.",
      "We source them from factories experienced in low-cut shaping and silicone heel grips.",
    ],
    keySpecs: ["Silicone heel grip", "Low-cut shaping", "Fine-gauge options"],
    materials: ["Cotton blends", "Nylon and elastane", "Bamboo viscose blends", "Modal blends"],
    construction: ["Silicone heel grip", "Low-cut or loafer cut", "Seamless toe options", "Cushioned sole options"],
    customisation: standardCustomisation,
    useCases: ["Sneaker and loafer ranges", "Women's and men's basics", "Retail multipacks"],
    featured: false,
    hero: hero("socks", "no-show", "Light blue no-show socks"),
    gallery: gallery("socks", "no-show", ["Grey low-cut socks", "White ankle socks on a linen sheet", "Mint low-cut socks"]),
    seo: {
      title: "No-Show Socks Supplier | Private Label Sourcing India",
      description: "No-show and invisible socks with silicone heel grips, sourced in Tirupur, India. Private label packaging and independent QC.",
      keywords: ["no-show socks supplier", "invisible socks private label", "no-show socks wholesale"],
    },
  },
  {
    family: "socks",
    slug: "sports",
    name: "Sports socks",
    label: "Sports",
    tagline: "Zoned cushioning, mesh panels, arch support.",
    description: [
      "Sports socks combine several constructions in one sock: cushioning where impact lands, mesh where heat builds, and an arch band for fit.",
      "We place them with factories that run multi-zone knitting programmes, and check zone placement against the approved sample.",
    ],
    keySpecs: ["Zoned cushioning", "Mesh ventilation", "Arch support band"],
    materials: ["Moisture-wicking polyester", "Nylon and elastane", "Cotton-rich blends", "Merino blends for running and hiking"],
    construction: ["Zoned terry", "Mesh ventilation panels", "Arch support band", "Left / right specific options", "Ankle, quarter and crew heights"],
    customisation: standardCustomisation,
    useCases: ["Running", "Team sports and clubs", "Training and gym", "Hiking"],
    featured: false,
    hero: hero("socks", "sports", "Runner at sunset in white sports socks"),
    gallery: gallery("socks", "sports", ["Two runners in sports socks", "Cushioned sports sock with mesh zones", "Runner in striped socks on a trail"]),
    seo: {
      title: "Sports Socks Supplier India | Private Label Sourcing",
      description: "Performance sports socks with zoned cushioning and mesh, sourced in Tirupur, India. Private label, team colours and independent QC.",
      keywords: ["sports socks supplier India", "private label sports socks", "team socks wholesale"],
    },
  },
  {
    family: "socks",
    slug: "dress",
    name: "Dress socks",
    label: "Dress",
    tagline: "Fine-gauge knits with clean, linked toes.",
    description: [
      "Dress socks are knitted on fine-gauge machines for a smooth, thin fabric. Toe finishing and pattern sharpness are what buyers notice first.",
      "We source them from factories with fine-gauge capacity and hand-linking, and check pattern alignment and toe finish at inspection.",
    ],
    keySpecs: ["Fine gauge", "Hand-linked toe", "Argyle and jacquard"],
    materials: ["Mercerised cotton", "Combed cotton", "Merino and wool blends", "Bamboo viscose blends", "Nylon for reinforcement"],
    construction: ["Fine-gauge plain knit", "Rib and jacquard patterns", "Hand-linked toe", "Reinforced heel and toe"],
    customisation: standardCustomisation,
    useCases: ["Menswear and tailoring ranges", "Gift boxes", "Corporate programmes"],
    featured: false,
    hero: hero("socks", "dress", "Dark green ribbed dress socks"),
    gallery: gallery("socks", "dress", ["Stack of ribbed socks in red, blue and navy", "Patterned socks on display", "Socks on a wooden stool"]),
    seo: {
      title: "Dress Socks Supplier India | Fine-Gauge Sock Sourcing",
      description: "Fine-gauge dress socks with linked toes, sourced in Tirupur, India. Private label, gift packaging and independent QC.",
      keywords: ["dress socks supplier India", "private label dress socks", "fine gauge socks sourcing"],
    },
  },
  {
    family: "socks",
    slug: "kids",
    name: "Kids' socks",
    label: "Kids",
    tagline: "Small sizes, soft yarns, playful designs.",
    description: [
      "Kids' socks need accurate small sizing, soft yarns and designs that hold up through repeated washing.",
      "We source them from factories that run small-size programmes, and check size grading and print or jacquard quality at inspection.",
    ],
    keySpecs: ["Baby to teen sizing", "Jacquard and print", "Anti-skid options"],
    materials: ["Combed cotton", "Bamboo viscose blends", "Cotton / polyester blends", "Nylon and elastane"],
    construction: ["Baby, toddler, junior and teen sizes", "Jacquard designs and characters", "Anti-skid sole options", "Soft, low-tension cuffs"],
    customisation: standardCustomisation,
    useCases: ["Kids' retail ranges", "Baby gift sets", "School socks", "Licensed and character ranges"],
    featured: false,
    hero: hero("socks", "kids", "Baby socks on a washing line"),
    gallery: gallery("socks", "kids", ["Baby socks with a shoelace print", "Baby socks with a heart print", "Colourful socks on a washing line"]),
    seo: {
      title: "Kids' Socks Supplier India | Private Label Sourcing",
      description: "Kids' and baby socks sourced in Tirupur, India. Accurate small sizing, soft yarns, private label and independent QC.",
      keywords: ["kids socks supplier India", "baby socks private label", "kids socks wholesale"],
    },
  },
  {
    family: "socks",
    slug: "thermal-wool",
    name: "Thermal and wool socks",
    label: "Thermal / Wool",
    tagline: "Heavier knits and wool blends for cold weather.",
    description: [
      "Thermal and wool socks use heavier yarns, brushed interiors or wool blends for warmth.",
      "We source them from factories that handle wool and heavy-gauge knitting, and check blend, weight and shrinkage behaviour against the approved sample.",
    ],
    keySpecs: ["Wool and merino blends", "Brushed or terry interior", "Heavy gauge"],
    materials: ["Merino wool blends", "Lambswool blends", "Acrylic thermal yarns", "Brushed polyester", "Nylon for reinforcement"],
    construction: ["Heavy-gauge knit", "Full terry or brushed interior", "Boot and crew heights", "Reinforced heel and toe"],
    customisation: standardCustomisation,
    useCases: ["Winter ranges", "Hiking and outdoor", "Work boots", "Lounge and home"],
    featured: false,
    hero: hero("socks", "thermal-wool", "Patterned wool socks"),
    gallery: gallery("socks", "thermal-wool", ["Patterned wool socks on white fabric", "Grey lace-knit wool socks", "Striped wool socks with autumn leaves"]),
    seo: {
      title: "Wool and Thermal Socks Supplier | Sourcing India",
      description: "Merino, wool-blend and thermal socks sourced in Tirupur, India. Private label, custom colours and independent QC.",
      keywords: ["wool socks supplier", "thermal socks wholesale", "merino socks private label"],
    },
  },
];

export const sweaterCustomisation = [
  "Private label: woven labels, hang tags and care labels",
  "Custom designs, patterns, jacquards and logos",
  "Custom colours matched to your standard",
  "Custom trims: buttons, zips, elbow patches",
  "Custom packaging: polybags, boxes, hangers, barcodes",
];

const sweater = (
  slug: string,
  name: string,
  label: string,
  tagline: string,
  description: string[],
  keySpecs: [string, string, string],
  materials: string[],
  construction: string[],
  useCases: string[],
  heroAlt: string,
  galleryAlts: string[],
  seo: Category["seo"],
  featured = false,
): Category => ({
  family: "sweaters",
  slug,
  name,
  label,
  tagline,
  description,
  keySpecs,
  materials,
  construction,
  customisation: sweaterCustomisation,
  useCases,
  featured,
  hero: hero("sweaters", slug, heroAlt),
  gallery: gallery("sweaters", slug, galleryAlts),
  seo,
});

export const sweaterCategories: Category[] = [
  sweater(
    "pullovers", "Crew-neck pullovers", "Pullovers",
    "The everyday crew neck, in every gauge from fine to chunky.",
    [
      "The crew-neck pullover is the core of most knitwear ranges. Gauge, yarn and finishing decide whether it reads as basic or premium.",
      "We match your pullover to a partner factory set up for that gauge, and check measurements, rib recovery and colour across the run.",
    ],
    ["3 to 14 gauge", "Raglan or set-in sleeve", "Rib or tubular trims"],
    ["Cotton and combed cotton", "Merino and lambswool blends", "Acrylic and acrylic blends", "Viscose blends", "Recycled yarns"],
    ["Fully-fashioned or cut-and-sew", "Raglan, set-in or saddle shoulder", "1x1, 2x2 or tubular rib trims", "Linked necklines"],
    ["Menswear and womenswear basics", "Seasonal colour programmes", "Retail and e-commerce ranges"],
    "Brown crew-neck sweater laid flat", ["Navy crew-neck pullover on a hanger", "Man in a green crew-neck sweater", "White knit pullover on a wooden surface"],
    { title: "Crew-Neck Pullover Sourcing India | Private Label Knitwear", description: "Private label crew-neck pullovers sourced from vetted knitwear factories in India. All gauges, custom colours and independent QC.", keywords: ["private label pullover sweater India", "crew neck sweater supplier", "knitwear sourcing India"] },
    true,
  ),
  sweater(
    "v-neck", "V-neck sweaters", "V-neck",
    "Clean V-necks for smart-casual and layering ranges.",
    [
      "V-neck sweaters sit between casual and tailored. Neckline shape and trim finishing are what buyers notice first.",
      "We source them from factories with fine-gauge capacity and clean linking, and check neck depth and symmetry at inspection.",
    ],
    ["Fine gauge", "Linked V-neck trim", "Layering weights"],
    ["Merino and extra-fine wool blends", "Cotton and cotton-cashmere-feel blends", "Viscose blends", "Acrylic blends"],
    ["Fully-fashioned V-neck", "Mitred or crossover V trim", "Set-in sleeves", "Rib hem and cuffs"],
    ["Smart-casual menswear", "Corporate and uniform programmes", "Layering pieces"],
    "Man in a fine-gauge V-neck sweater", ["Rack of V-neck sweaters in assorted colours", "Blue V-neck school sweater", "Man in a green knit sweater"],
    { title: "V-Neck Sweater Sourcing India | Private Label Knitwear", description: "Fine-gauge V-neck sweaters sourced in India for brands and retailers. Clean linking, custom colours and independent QC.", keywords: ["v-neck sweater supplier India", "private label v neck sweater", "fine gauge knitwear sourcing"] },
  ),
  sweater(
    "cardigans", "Cardigans", "Cardigans",
    "Button and zip cardigans, from fine knit to chunky.",
    [
      "Cardigans add trims to the brief: buttons, button bands, pockets and sometimes zips. Each one needs checking.",
      "We coordinate trims with the knitting, and check placket alignment, buttonhole quality and button security at inspection.",
    ],
    ["Button or zip front", "Pockets and shawl collars", "Custom buttons"],
    ["Wool and merino blends", "Cotton and cotton blends", "Acrylic and acrylic blends", "Mohair-look and brushed yarns"],
    ["Button or zip fastening", "Shawl, crew or V neck", "Patch or set-in pockets", "Chunky or fine gauge"],
    ["Womenswear and menswear ranges", "Layering and transitional seasons", "Uniform programmes"],
    "Brown cardigan with a white patterned yoke", ["Grey ribbed cardigan with wooden buttons", "Mustard chunky-knit cardigan", "Oversized taupe cable cardigan"],
    { title: "Cardigan Sourcing India | Private Label Knit Cardigans", description: "Button and zip cardigans sourced from vetted knitwear factories in India. Custom trims, colours and independent QC.", keywords: ["cardigan supplier India", "private label cardigans", "knit cardigan manufacturer sourcing"] },
    true,
  ),
  sweater(
    "turtlenecks", "Turtlenecks and mock necks", "Turtlenecks",
    "Roll, turtle and mock necks in fine and heavy knits.",
    [
      "Turtlenecks rely on a collar that holds its shape and recovers after wear. Rib structure and yarn choice matter.",
      "We source them from factories experienced in collar knitting, and check collar height, recovery and seam finish.",
    ],
    ["Roll, turtle or mock neck", "Fine to heavy gauge", "Rib collars"],
    ["Merino and wool blends", "Cotton and cotton blends", "Viscose blends", "Acrylic blends"],
    ["Double-layer roll collar", "Mock neck", "Slim or relaxed fit", "Ribbed or plain body"],
    ["Winter ranges", "Layering basics", "Womenswear and menswear"],
    "Cream ribbed turtleneck on a hanger", ["Woman in a white turtleneck, black and white", "Person holding up a cream ribbed sweater", "Woman in a red knitted hood and collar"],
    { title: "Turtleneck Sweater Sourcing India | Private Label", description: "Turtleneck and mock-neck sweaters sourced in India. Collar construction checked, custom colours and independent QC.", keywords: ["turtleneck sweater supplier", "mock neck sweater private label", "knitwear sourcing India"] },
  ),
  sweater(
    "cable-knits", "Cable knits", "Cable knits",
    "Textured cables, plaits and aran-style patterns.",
    [
      "Cable knits use crossed stitches to build texture. Pattern placement and tension consistency take experienced programming.",
      "We place cable programmes with factories that run textured knitting, and check pattern alignment and panel matching.",
    ],
    ["Cables and aran patterns", "Mid to chunky gauge", "Panel-matched"],
    ["Wool and merino blends", "Cotton blends", "Acrylic and acrylic blends", "Recycled yarns"],
    ["Single and multi-cable panels", "Aran and honeycomb stitches", "Crew, roll or V neck", "Pullover or cardigan"],
    ["Winter and heritage ranges", "Gift and holiday programmes", "Menswear and womenswear"],
    "Green cable-knit sweater laid flat", ["Close-up of a maroon cable-knit sleeve", "Stack of cable-knit sweaters", "Stack of knit sweaters with a cable cardigan on top"],
    { title: "Cable Knit Sweater Sourcing India | Private Label", description: "Cable and aran-style sweaters sourced from textured-knitting factories in India. Pattern checks and independent QC.", keywords: ["cable knit sweater supplier", "aran sweater private label", "textured knitwear sourcing"] },
  ),
  sweater(
    "half-zip", "Half-zip, quarter-zip and polo knits", "Half-zip & polo",
    "Zip-neck and collared knits for smart-casual ranges.",
    [
      "Zip-neck and polo-collar knits add hardware and collar work to a sweater. Zip quality and placket finishing must be right.",
      "We source zips and trims to your spec and check zip function, tape alignment and collar shape at inspection.",
    ],
    ["Quarter or half zip", "Polo collars", "Metal or moulded zips"],
    ["Cotton and cotton blends", "Merino blends", "Acrylic blends", "Brushed and fleece-back knits"],
    ["Quarter-zip and half-zip necks", "Knitted polo collars", "Funnel necks", "Contrast tipping"],
    ["Smart-casual menswear", "Golf and club ranges", "Corporate programmes"],
    "Close-up of a knitted quarter-zip collar", ["Man in a cream half-zip pullover", "Woman in a grey half-zip pullover", "Man in a white quarter-zip on a bench"],
    { title: "Half-Zip and Polo Knit Sourcing India | Private Label", description: "Quarter-zip, half-zip and polo-collar knits sourced in India. Zips and trims to your spec, independent QC.", keywords: ["quarter zip sweater supplier", "half zip knit private label", "polo sweater sourcing India"] },
  ),
  sweater(
    "vests", "Sweater vests", "Vests",
    "Sleeveless knits for layering, fashion and uniform.",
    [
      "Sweater vests are quick to make but easy to get wrong at the armhole and neck. Trims must lie flat.",
      "We check armhole and neck trims, length and pattern placement, including argyle and cable designs.",
    ],
    ["V or crew neck", "Argyle and cable options", "Flat-lying trims"],
    ["Cotton and cotton blends", "Wool and merino blends", "Acrylic blends"],
    ["V-neck or crew neck", "Plain, cable or argyle", "Rib armhole and neck trims", "Cropped or regular length"],
    ["Fashion layering", "School and uniform programmes", "Preppy and heritage ranges"],
    "Woman in a white knit vest with black trim", ["Young man in an argyle sweater vest", "Woman in a rust cable-knit vest", "Knit sweaters hanging on a rope"],
    { title: "Sweater Vest Sourcing India | Private Label Knit Vests", description: "Knit sweater vests sourced in India: plain, cable and argyle. Custom colours, uniform programmes and independent QC.", keywords: ["sweater vest supplier", "knit vest private label", "uniform sweater vest India"] },
  ),
  sweater(
    "knit-hoodies", "Knit hoodies", "Knit hoodies",
    "Hooded sweaters in knitted fabrics, not sweatshirt jersey.",
    [
      "Knit hoodies combine sweater yarns with a hood and often a kangaroo pocket or drawcord.",
      "We check hood shape, drawcord channels and pocket placement against the approved sample.",
    ],
    ["Knitted hood", "Drawcord options", "Kangaroo pocket"],
    ["Cotton and cotton blends", "Acrylic blends", "Wool blends", "Recycled yarns"],
    ["Pullover or zip-through", "Lined or unlined hood", "Jacquard or plain body", "Drawcords and eyelets"],
    ["Casual and lounge ranges", "Outdoor-inspired ranges", "Menswear and youth"],
    "Man in a dark knitted hoodie", ["Man in a patterned knit hoodie", "Woman pulling on an oatmeal knit sweater", "Close-up of a soft brushed knit"],
    { title: "Knit Hoodie Sourcing India | Private Label Knitwear", description: "Knitted hoodies sourced from vetted knitwear factories in India. Jacquard and plain, custom colours, independent QC.", keywords: ["knit hoodie supplier", "knitted hoodie private label", "knitwear sourcing India"] },
  ),
  sweater(
    "kids-knitwear", "Kids' knitwear", "Kids' knitwear",
    "Soft sweaters and cardigans in baby to teen sizing.",
    [
      "Kids' knitwear needs accurate size grading, soft yarns and secure trims.",
      "We check size grading, button and trim security, and hand feel at every inspection.",
    ],
    ["Baby to teen sizing", "Soft yarns", "Secure trims"],
    ["Cotton and combed cotton", "Soft acrylic blends", "Merino blends"],
    ["Pullovers and cardigans", "Jacquard and intarsia designs", "Envelope necks for babies", "Easy-care finishes"],
    ["Kids' retail ranges", "Baby gift sets", "Seasonal programmes"],
    "Girl in a cream knit sweater", ["Smiling child in a knit cardigan", "Boy in a red knit jacket", "Knit sweaters hanging on a rope"],
    { title: "Kids' Knitwear Sourcing India | Private Label Sweaters", description: "Kids' and baby sweaters and cardigans sourced in India. Accurate sizing, soft yarns, secure trims and independent QC.", keywords: ["kids knitwear supplier India", "baby sweater private label", "kids sweater sourcing"] },
    true,
  ),
  sweater(
    "school-uniform", "School and uniform knitwear", "School & uniform",
    "Hard-wearing pullovers, cardigans and vests in uniform colours.",
    [
      "Uniform knitwear must match a colour standard and stay consistent from one season's reorder to the next.",
      "We check colour against your standard on every lot, and confirm size mix and labelling before packing.",
    ],
    ["Colour-matched", "Contrast tipping", "Repeat-order consistency"],
    ["Acrylic and acrylic blends", "Cotton blends", "Wool blends"],
    ["V-neck pullovers and cardigans", "Sleeveless vests", "Contrast stripe tipping", "Embroidered crests"],
    ["Schools and uniform suppliers", "Corporate and hospitality uniform", "Clubs and institutions"],
    "Boy in a blue V-neck school sweater", ["Young man in an argyle vest and tie", "Woman in a white knit vest", "Navy pullover on a hanger"],
    { title: "School Uniform Sweater Sourcing India | Knitwear", description: "School and uniform sweaters, cardigans and vests sourced in India. Colour-matched to your standard with independent QC.", keywords: ["school uniform sweater supplier", "uniform knitwear India", "school cardigan wholesale"] },
  ),
  sweater(
    "fashion-knits", "Fashion knits and ponchos", "Fashion knits",
    "Ponchos, open knits, oversized and seasonal statement pieces.",
    [
      "Fashion knits change quickly. Open stitches, fringes and oversized shapes need careful sampling.",
      "We source them from factories with flexible sampling, and check shape, fringe finishing and measurements against the approved sample.",
    ],
    ["Ponchos and capes", "Open and pointelle stitches", "Oversized shapes"],
    ["Cotton and cotton blends", "Viscose blends", "Mohair-look and brushed yarns", "Acrylic blends"],
    ["Ponchos and shrugs", "Open, pointelle and mesh stitches", "Fringe and tassel trims", "Drop-shoulder oversized fits"],
    ["Womenswear fashion ranges", "Resort and summer knits", "Seasonal drops"],
    "Woman wearing a fringed knit poncho", ["Cream open-knit poncho on a hanger", "Woman in a patterned knit poncho", "Woman in an oversized beige knit"],
    { title: "Fashion Knitwear and Poncho Sourcing India", description: "Ponchos, open knits and oversized fashion knitwear sourced in India. Flexible sampling, custom colours, independent QC.", keywords: ["poncho supplier India", "fashion knitwear sourcing", "womens knitwear private label"] },
  ),
  sweater(
    "chunky-lounge", "Chunky and lounge knits", "Chunky & lounge",
    "Heavy, soft knits for comfort-led ranges.",
    [
      "Chunky and lounge knits use thick yarns and low gauges. Weight, softness and pilling behaviour matter most.",
      "We check garment weight, hand feel and measurements against the approved sample.",
    ],
    ["1.5 to 5 gauge", "Soft, heavy yarns", "Relaxed fits"],
    ["Wool and merino blends", "Chenille and brushed yarns", "Acrylic blends", "Cotton blends"],
    ["Low-gauge chunky knits", "Brushed and chenille finishes", "Relaxed and oversized fits", "Co-ord lounge sets"],
    ["Lounge and home ranges", "Winter ranges", "Gift programmes"],
    "Mustard, cream and camel chunky sweaters", ["Hands holding a stack of soft knits", "Close-up of stacked knit sweaters", "Close-up of chunky knit cardigans"],
    { title: "Chunky and Lounge Knit Sourcing India | Private Label", description: "Chunky and lounge knitwear sourced in India. Soft heavy yarns, relaxed fits, custom colours and independent QC.", keywords: ["chunky knit sweater supplier", "lounge knitwear private label", "knitwear sourcing India"] },
  ),
  sweater(
    "jacquard", "Jacquard and Fair Isle", "Jacquard",
    "Patterned knits: Fair Isle yokes, Nordic and novelty designs.",
    [
      "Jacquard knits build multicolour patterns into the fabric. Colour count, float length and pattern registration need control.",
      "We source them from factories running electronic jacquard machines, and check pattern registration and colour accuracy.",
    ],
    ["Multicolour jacquard", "Fair Isle yokes", "Novelty and holiday designs"],
    ["Wool and lambswool blends", "Acrylic blends", "Cotton blends"],
    ["Electronic jacquard", "Fair Isle and Nordic yokes", "Intarsia motifs", "Pullover or cardigan"],
    ["Holiday and gift ranges", "Heritage collections", "Kids' and family ranges"],
    "Pile of patterned jacquard sweaters", ["Shelf of folded knitwear with a Nordic sweater", "Brown cardigan with a Fair Isle yoke", "Teal knit sweater with a lace panel"],
    { title: "Jacquard and Fair Isle Sweater Sourcing India", description: "Jacquard, Fair Isle and novelty sweaters sourced from electronic-jacquard factories in India. Independent QC.", keywords: ["jacquard sweater supplier", "fair isle sweater private label", "christmas sweater sourcing India"] },
  ),
];

export const sweatersOverview = {
  name: "Sweaters",
  tagline: "Knitwear, sourced with the same discipline as our socks.",
  description: [
    "Alongside socks, we source sweaters across every major style through partner knitwear factories in our network.",
    "The process does not change: one contact, a factory matched to the product, and independent QC before shipment.",
  ],
  hero: hero("sweaters", "range", "Stack of folded knit sweaters in neutral tones"),
  seo: {
    title: "Sweater Sourcing India | Private Label Knitwear",
    description: "Private label sweaters sourced in India: pullovers, cardigans, turtlenecks, cable knits, vests, kids' and uniform knitwear, with independent QC.",
    keywords: ["private label sweaters India", "knitwear sourcing India", "sweater supplier"],
  },
};

export const allCategories = [...sockCategories, ...sweaterCategories];

export const getCategory = (family: Family, slug: string) => allCategories.find((c) => c.family === family && c.slug === slug);


export const featuredCategories = sockCategories.filter((c) => c.featured);
export const featuredSweaters = sweaterCategories.filter((c) => c.featured);

/** Options for the quote form category multi-select. */
export const quoteCategoryOptions = [
  ...sockCategories.map((c) => ({ value: c.slug, label: c.name })),
  { value: "sock-other", label: "Other socks" },
  ...sweaterCategories.map((s) => ({ value: `sweaters-${s.slug}`, label: `Sweaters: ${s.label}` })),
  { value: "sweaters-other", label: "Other sweaters" },
];

/** Small, client-safe index for the header menu (no long copy). */
export type NavItem = { slug: string; label: string; hero: ProductImage };
export const navIndex = () => ({
  socks: sockCategories.map(({ slug, label, hero }) => ({ slug, label, hero })),
  sweaters: sweaterCategories.map(({ slug, label, hero }) => ({ slug, label, hero })),
});
