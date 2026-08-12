/* ---------------- Brand identity & contact details ----------------
   Wording follows the client's own company brief. `tagline` and `positioning`
   are the approved brand lines — change them there, not in components. */
export const BRAND = {
  name: "Himalayan",
  full: "Himalayan Feeds",
  legal: "Himalayan Feeds Pvt. Ltd.",
  tagline: "Nutrition for Better Growth & Better Yield",
  /** The lockup that sits under the wordmark. */
  positioning: "Cattle Feed | Poultry Feed | Animal Nutrition",
  /** Dotted descriptor used in the header strip and metadata. */
  descriptor: "Animal Nutrition • Cattle Feed • Poultry Feed",
  contactPerson: "Md. Showkat Ahmad Wani",
  phone: "90860-00555",
  // wa.me and tel: both need the country code, digits only.
  phoneHref: "tel:+919086000555",
  whatsapp: "919086000555",
  email: "info@himalayanfeeds.com",
  address: {
    line1: "63 KVA, Chinar Colony, Darmuna",
    line2: "Budgam 191111",
    region: "Jammu & Kashmir",
  },
};

/* ---------------- Company — vision, mission, commitment ----------------
   Taken verbatim from the client brief. */
export const COMPANY = {
  /* Expanded from the client's brief. Nothing factual has been added — no
     founding year, capacity, headcount or farmer numbers. The claims here are
     the brief's own (animal nutrition company, cattle and poultry feed,
     Himalayan inspiration, named audiences) plus the Budgam address and the
     dealer network already stated elsewhere on the site.

     Client's original wording, kept verbatim for reference:
     1. "Himalayan Feeds Pvt. Ltd. is an animal nutrition company focused on
        providing quality, scientifically formulated cattle feed and poultry
        feed designed to support better animal health, growth, productivity
        and farm profitability."
     2. "Inspired by the strength and purity of the Himalayan region, our
        company aims to build a trusted feed brand for farmers, dairy owners,
        poultry farmers, dealers and distributors." */
  story: [
    "Himalayan Feeds Pvt. Ltd. is an animal nutrition company. We formulate and manufacture cattle feed and poultry feed, and we measure them against one question: is the animal healthier, more productive and more profitable for the farmer who owns it.",
    "It is an unforgiving question. A dairy animal converts feed into milk every day of her life, and a poultry flock's entire margin sits inside its feed conversion ratio. On those farms nutrition is not one input among many — it is the business.",
    "So the work is less about a clever formula than about doing the ordinary things properly, every batch: ingredients checked on arrival, recipes balanced by nutritionists, and a bag that performs next month exactly as it performed last month. Consistency is the product.",
    "Inspired by the strength and purity of the Himalayan region, we are building a feed brand that farmers, dairy owners, poultry farmers, dealers and distributors can rely on — milled in Budgam, Jammu & Kashmir, and supplied through a growing dealer network.",
  ],
  vision:
    "To become a trusted and leading animal-feed company from the Himalayan region, delivering consistent quality nutrition to farmers across India.",
  mission:
    "To provide scientifically balanced, quality-focused and value-for-money feed solutions that help farmers improve animal health, productivity and profitability.",
  commitment: ["Quality", "Nutrition", "Trust", "Farmer Growth"],
  commitmentBody:
    "We believe that better nutrition creates healthier animals, better productivity and a stronger farming community.",
  /** Who the brief names as the audience. Drives the /about audience strip. */
  audiences: [
    "Farmers",
    "Dairy owners",
    "Poultry farmers",
    "Dealers",
    "Distributors",
  ],
};

/* ---------------- Leadership ----------------
   PLACEHOLDER ROSTER. Only the contact named in the brief is real; the
   remaining seats are reserved so the layout is correct once the client
   supplies names, roles and photographs. Entries with `name: null` render a
   monogram-free "seat reserved" card and are excluded from structured data. */
export type Leader = {
  name: string | null;
  role: string;
  /** One bold line above the body copy. Sets the tone before the detail. */
  lede: string | null;
  /** Paragraphs. Written in the leader's own voice. */
  bio: string[] | null;
  photo: string | null;
};

export const LEADERSHIP: Leader[] = [
  {
    name: BRAND.contactPerson,
    role: "Director",
    lede: "Ready to serve the farming community of Jammu & Kashmir.",
    bio: [
      "Feed is bought on trust and judged on the next batch. That is the standard we hold ourselves to — every bag that leaves Budgam has to perform the way the last one did, because a farmer who changes feed mid-cycle pays for it twice.",
      "Working directly with farmers, dairy owners and our dealer network across Jammu & Kashmir means we hear quickly when something is not right, and we would far rather hear it than not. That feedback is worth more to us than any amount of marketing.",
      "Better nutrition makes healthier animals. Healthier animals make more productive farms. And more productive farms build the stronger farming community we set out to serve.",
    ],
    photo: null,
  },
  { name: null, role: "Director", lede: null, bio: null, photo: null },
  { name: null, role: "Head of Production", lede: null, bio: null, photo: null },
  { name: null, role: "Head of Sales & Distribution", lede: null, bio: null, photo: null },
];

/* ---------------- Certifications & standards ----------------
   ⚠ UNVERIFIED. No certificate, licence number or issuing body has been
   supplied for any entry below. The marks in /public/images/certifications
   are our own typographic badges, NOT official artwork — see that folder's
   note. Confirm each certification in writing, then replace both the logo
   file and this list. */
export type Certification = {
  code: string;
  name: string;
  note: string;
  logo: string;
};

export const CERTIFICATIONS: Certification[] = [
  {
    code: "FSSAI",
    name: "FSSAI Registered",
    note: "Food safety compliance",
    logo: "/images/certifications/fssai.svg",
  },
  {
    code: "ISO",
    name: "ISO 9001:2015",
    note: "Quality management",
    logo: "/images/certifications/iso-9001.svg",
  },
  {
    code: "GMP",
    name: "GMP Compliant",
    note: "Good manufacturing practice",
    logo: "/images/certifications/gmp.svg",
  },
  {
    code: "HACCP",
    name: "HACCP",
    note: "Hazard analysis & control",
    logo: "/images/certifications/haccp.svg",
  },
];

/* ---------------- Social profiles ----------------
   PLACEHOLDER handles — no account has been verified at any of these URLs.
   Swap in the real ones (or delete the entry) before going live. */
export const SOCIALS = [
  { label: "Facebook", handle: "@himalayanfeeds", href: "https://facebook.com/himalayanfeeds" },
  { label: "Instagram", handle: "@himalayanfeeds", href: "https://instagram.com/himalayanfeeds" },
  { label: "X", handle: "@himalayanfeeds", href: "https://x.com/himalayanfeeds" },
  { label: "LinkedIn", handle: "himalayan-feeds", href: "https://linkedin.com/company/himalayan-feeds" },
  { label: "YouTube", handle: "@himalayanfeeds", href: "https://youtube.com/@himalayanfeeds" },
];

/* ---------------- Product catalogue ----------------
   Single source of truth. The /products routes, the header dropdown, the
   homepage grid and the footer are all generated from this array.

   ORDER IS MEANINGFUL. Products run in the animal's own sequence — youngest
   stage first, then through to adult, then whole-herd formats and add-ons.
   The catalogue renders them in array order and numbers them accordingly, so
   reordering this array reorders the page. Keep the sequence intact.

   ---- PACK SHOTS ----
   Seven entries now carry a real cut-out photograph of the client's own bag,
   matched to the product it most closely is. The bag name printed on the
   artwork is NOT always the product name used here, so `imageAlt` states what
   the bag actually says:

     Calf Feed .......................... CALF STARTER      25 kg
     Dairy Cattle Feed .................. TRANSITION        50 kg   ← see note
     High-Yield Milking Cattle Feed ..... 10000+            50 kg
     Chick Starter Feed ................. PRE STARTER       25 kg
     Broiler Starter Feed ............... STARTER           25 kg
     Broiler Finisher Feed .............. FINISHER          25 kg
     Layer Feed ......................... LAYER PHASE-2     50 kg

   Note: TRANSITION is a specific pre/post-calving feed, not an everyday
   milking ration — it is the closest available bag, not an exact match.
   Swap it the moment a general dairy bag is photographed.

   The remaining five (Buffalo Feed, Cattle Feed Pellets & Mash, Mineral &
   Nutritional Supplements, Broiler Grower Feed, Poultry Nutritional Products)
   have NO corresponding bag in the supplied artwork and keep a transparent
   illustrated placeholder. Nothing was forced: a "PREMIUM LAYER FEED" bag on
   a broiler product, or a sheep-and-goat D. MASH bag on a cattle product,
   would be a mistake a dealer spots immediately.

   Unused artwork that has no slot in this catalogue: CALF GROWER,
   HEIFER & DRY, LAYER PHASE-1, and four D. MASH bags (sheep & goats — a
   species the site does not currently sell). */

export type Product = {
  slug: string;
  name: string;
  /** Where the product sits in the animal's cycle. Positional, not a spec. */
  stage: string;
  /** One line, shown under the name. */
  summary: string;
  /** Two or three sentences of range copy. */
  description: string;
  /** Three short benefit phrases, rendered as pills. */
  highlights: string[];
  /** Who it is for. Positioning, not a regulated claim. */
  suitableFor: string[];
  /* ---- Regulated specification ----
     null means "not confirmed by the client in writing". The spec strip
     renders "On request" and routes the visitor to the RFQ instead of
     showing a number nobody has stood behind. Never fill these from a
     competitor's label — see docs/product-catalogue-spec.md §2.6. */
  form: string | null;
  packSizes: string | null;
  image: string;
  imageAlt: string;
};

export type Category = {
  slug: string;
  name: string;
  animal: string;
  brand: string;
  blurb: string;
  /** Range story on the catalogue page — two sentences under the H1. */
  intro: string;
  /** Palette token. Kept as a plain name, never interpolated into a class —
      Tailwind v4 only generates classes it can see written out in full. */
  accent: "terracotta" | "orange" | "leaf";
  /** "coming-soon" ranges are shown everywhere a live range is shown, but
      badged and visibly held back, so a visitor is never left guessing
      whether they can buy it today. They carry no products by definition. */
  status: "available" | "coming-soon";
  /** Shown on coming-soon ranges in place of the product list. */
  launchNote: string | null;
  /** The animal's stages in order. Drives the sequence rail. */
  lifecycle: string[];
  image: string;
  imageAlt: string;
  products: Product[];
};

export const CATEGORIES: Category[] = [
  /* -------- Cattle: calf → in milk → peak yield → herd-wide → add-on -------- */
  {
    slug: "cattle-feed",
    name: "Cattle Feed",
    animal: "For dairy cattle & buffalo",
    brand: "Godhenu Gold",
    accent: "terracotta",
    status: "available",
    launchNote: null,
    lifecycle: ["Calf", "In milk", "Peak yield", "Herd-wide", "Add-on"],
    blurb:
      "Mineral-fortified cattle feed that improves milk yield, fat content and overall herd health.",
    intro:
      "A dairy animal converts feed into milk every single day, and the quality of that conversion is the whole business. The range follows the animal's own life — from her first weeks as a calf, through to peak lactation and beyond.",
    image: "/images/cattle.png",
    imageAlt: "Dairy cattle raised on Himalayan cattle feed",
    products: [
      {
        slug: "calf-feed",
        name: "Calf Feed",
        stage: "Calf",
        summary: "Where it starts — early nutrition that shapes the animal she becomes.",
        description:
          "A calf's frame and rumen are built in her first months, and a heifer that grows well reaches service weight sooner. Palatable and easy to digest, so intake starts early and stays consistent through weaning.",
        highlights: ["Easy to digest", "Supports rumen development", "Palatable through weaning"],
        suitableFor: ["Calves", "Replacement heifers"],
        form: null,
        packSizes: null,
        image: "/images/products/calf-feed.webp",
        imageAlt: "Himalayan Feeds Calf Starter — 25 kg bag",
      },
      {
        slug: "dairy-cattle-feed",
        name: "Dairy Cattle Feed",
        stage: "In milk",
        summary: "Once she is in milk — the everyday ration for a working herd.",
        description:
          "A balanced daily feed for cows in regular milk, built around steady energy and protein rather than short-term spikes. Fortified with minerals to support udder health, fertility and body condition across a full lactation cycle.",
        highlights: ["Steady daily energy", "Mineral fortified", "Holds body condition"],
        suitableFor: ["Dairy herds", "Crossbred cows"],
        form: null,
        packSizes: null,
        image: "/images/products/dairy-cattle-feed.webp",
        imageAlt: "Himalayan Feeds Transition dairy feed — 50 kg bag",
      },
      {
        slug: "high-yield-milking-feed",
        name: "High-Yield Milking Cattle Feed",
        stage: "Peak yield",
        summary: "At peak lactation — a denser ration for the hardest-working animals.",
        description:
          "High-producing animals cannot eat enough volume to meet their own demand, so the answer is a denser feed rather than a bigger scoop. Formulated for peak-yield cows and crossbreds where milk output and fat percentage both need holding through the flush.",
        highlights: ["Nutrient dense", "Supports fat percentage", "Built for peak yield"],
        suitableFor: ["High-yield cows", "Crossbreds at flush"],
        form: null,
        packSizes: null,
        image: "/images/products/high-yield-milking-feed.webp",
        imageAlt: "Himalayan Feeds 10000+ premium dairy feed — 50 kg bag",
      },
      {
        slug: "buffalo-feed",
        name: "Buffalo Feed",
        stage: "Buffalo herd",
        summary: "For buffalo — formulated for the animal, not adapted from cattle feed.",
        description:
          "Buffalo digest and partition nutrients differently from cows, and a feed designed around one does not serve the other. Built for buffalo herds where butterfat is what the milk is paid on.",
        highlights: ["Buffalo-specific", "Supports butterfat", "Not a rebadged cow feed"],
        suitableFor: ["Buffalo herds", "Fat-based milk pricing"],
        form: null,
        packSizes: null,
        image: "/images/products/buffalo-feed.svg",
        imageAlt: "Buffalo Feed pack",
      },
      {
        slug: "cattle-pellets-and-mash",
        name: "Cattle Feed Pellets & Mash",
        stage: "Herd-wide",
        summary: "Across the herd — the same nutrition in whichever form your shed prefers.",
        description:
          "Pellets travel and store cleanly, cut sorting at the manger and reduce wastage. Mash mixes readily into a home ration where green fodder and silage are already part of the routine. The choice is a handling decision, not a nutritional one.",
        highlights: ["Two handling formats", "Cuts sorting at the manger", "Reduces wastage"],
        suitableFor: ["Manger-fed sheds", "Home-mixed rations"],
        form: "Pellet or mash",
        packSizes: null,
        image: "/images/products/cattle-pellets-and-mash.svg",
        imageAlt: "Cattle Feed Pellets and Mash pack",
      },
      {
        slug: "cattle-mineral-supplements",
        name: "Mineral & Nutritional Supplements",
        stage: "Add-on",
        summary: "Alongside the ration — top-up minerals for herds on a home mix.",
        description:
          "Farms running their own fodder and concentrate mix usually have the energy right and the minerals short. This range fills that gap, supporting fertility, bone development and general herd condition alongside whatever you already feed.",
        highlights: ["Fills mineral gaps", "Supports fertility", "Used with the main ration"],
        suitableFor: ["Home-mixed rations", "Grazing herds"],
        form: null,
        packSizes: null,
        image: "/images/products/cattle-mineral-supplements.svg",
        imageAlt: "Cattle mineral and nutritional supplements pack",
      },
    ],
  },

  /* -------- Poultry: chick → starter → grower → finisher → lay → add-on -------- */
  {
    slug: "poultry-feed",
    name: "Poultry Feed",
    animal: "For broilers & layers",
    brand: "Nutri Choice",
    accent: "orange",
    status: "available",
    launchNote: null,
    lifecycle: ["Chick", "Starter", "Grower", "Finisher", "In lay", "Add-on"],
    blurb:
      "Balanced energy-to-protein ratios that drive faster weight gain and better feed conversion in broilers and layers.",
    intro:
      "Poultry margins live in the feed conversion ratio, and a fraction of a point across a full shed is the difference between a profitable cycle and a break-even one. The range runs in the bird's own order, from day-old chick through to a hen in full lay.",
    image: "/images/poultry.png",
    imageAlt: "Poultry on a farm raised on Himalayan poultry feed",
    products: [
      {
        slug: "chick-starter-feed",
        name: "Chick Starter Feed",
        stage: "Chick",
        summary: "Day one — a gentle first feed for replacement and backyard chicks.",
        description:
          "Suited to layer replacements, desi and backyard flocks rather than commercial broilers. Fine-textured and palatable so young birds feed readily from day one and the flock grows uniformly.",
        highlights: ["Fine textured", "Palatable from day one", "Uniform early growth"],
        suitableFor: ["Layer replacements", "Backyard & desi flocks"],
        form: null,
        packSizes: null,
        image: "/images/products/chick-starter-feed.webp",
        imageAlt: "Himalayan Feeds Pre Starter poultry feed — 25 kg bag",
      },
      {
        slug: "broiler-starter-feed",
        name: "Broiler Starter Feed",
        stage: "Starter",
        summary: "The opening phase, where the whole cycle is decided.",
        description:
          "A bird that eats well and grows evenly in its opening days carries that advantage all the way to market weight, and one that does not never fully catches up. Sized and formulated so intake begins within hours of placement.",
        highlights: ["Early intake", "Flock uniformity", "Low wastage"],
        suitableFor: ["Commercial broiler units", "Contract farming"],
        form: null,
        packSizes: null,
        image: "/images/products/broiler-starter-feed.webp",
        imageAlt: "Himalayan Feeds Starter poultry feed — 25 kg bag",
      },
      {
        slug: "broiler-grower-feed",
        name: "Broiler Grower Feed",
        stage: "Grower",
        summary: "As the bird grows — carries the frame through the fastest phase.",
        description:
          "The middle phase is where a broiler lays down most of its skeletal frame and muscle. Formulated to keep growth rapid without running ahead of what the bird's legs and heart can carry.",
        highlights: ["Frame development", "Controlled growth rate", "Steady intake"],
        suitableFor: ["Commercial broiler units"],
        form: null,
        packSizes: null,
        image: "/images/products/broiler-grower-feed.svg",
        imageAlt: "Broiler Grower Feed pack",
      },
      {
        slug: "broiler-finisher-feed",
        name: "Broiler Finisher Feed",
        stage: "Finisher",
        summary: "The closing phase — efficient conversion through to market weight.",
        description:
          "In the closing phase the bird eats the most feed of any stage, so this is where conversion efficiency pays hardest. Built to finish flocks evenly and hold carcass quality right up to lifting.",
        highlights: ["Conversion efficiency", "Even finishing", "Carcass quality"],
        suitableFor: ["Commercial broiler units"],
        form: null,
        packSizes: null,
        image: "/images/products/broiler-finisher-feed.webp",
        imageAlt: "Himalayan Feeds Finisher poultry feed — 25 kg bag",
      },
      {
        slug: "layer-feed",
        name: "Layer Feed",
        stage: "In lay",
        summary: "Once she is laying — sustained lay, sound shells, steady birds.",
        description:
          "A laying hen draws on her own skeleton when the ration falls short, and it shows up first in shell quality and then in persistency. Formulated to support consistent egg size and shell strength across a long laying period.",
        highlights: ["Shell strength", "Consistent egg size", "Long-lay persistency"],
        suitableFor: ["Commercial layer units"],
        form: null,
        packSizes: null,
        image: "/images/products/layer-feed.webp",
        imageAlt: "Himalayan Feeds Layer Phase-2 feed — 50 kg bag",
      },
      {
        slug: "poultry-nutritional-products",
        name: "Poultry Nutritional Products",
        stage: "Add-on",
        summary: "Alongside the ration — support for the moments that strain a flock.",
        description:
          "Nutritional support for placement, transfer, heat and the tail of a long lay. Used with the main feed rather than in place of it.",
        highlights: ["Supports stress periods", "Heat and transfer support", "Used with the main feed"],
        suitableFor: ["Flocks under strain", "Placement & transfer"],
        form: null,
        packSizes: null,
        image: "/images/products/poultry-nutritional-products.svg",
        imageAlt: "Poultry nutritional products pack",
      },
    ],
  },
  /* -------- Fish: not yet in production --------
     Kept in the catalogue on purpose. Hiding a range a visitor may have heard
     about invites the question "do they still do fish?"; showing it badged
     answers it. `products` stays empty until the lineup is confirmed — the UI
     branches on `status`, so nothing here needs inventing in the meantime. */
  {
    slug: "fish-feed",
    name: "Fish Feed",
    animal: "Floating fish feed",
    brand: "Matsya Bandhu",
    accent: "leaf",
    status: "coming-soon",
    launchNote:
      "The fish feed range is in development and is not yet available to order. Register your interest and we will contact you the moment it launches.",
    lifecycle: ["Fry", "Fingerling", "Grow-out"],
    blurb:
      "Floating pellets with high digestibility that keep water clean and support steady, healthy fish growth.",
    intro:
      "A floating pellet lets you see what the pond is actually eating, so feeding can be matched to appetite instead of guessed at. The Matsya Bandhu range is being developed for clean water and steady, predictable growth.",
    image: "/images/fish.png",
    imageAlt: "Fish in a pond raised on Himalayan fish feed",
    products: [],
  },
];

/* Flat list — drives the "all products" view and the static route params. */
export const ALL_PRODUCTS = CATEGORIES.flatMap((c) =>
  c.products.map((p) => ({ ...p, category: c }))
);

/* Ranges you can actually order today. Use this for anything that counts or
   defaults; use CATEGORIES for anything that lists. */
export const AVAILABLE_CATEGORIES = CATEGORIES.filter(
  (c) => c.status === "available"
);

export const getCategory = (slug: string) =>
  CATEGORIES.find((c) => c.slug === slug);

/* ---------------- Navigation — drives the header and footer ---------------- */
export const NAV = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    href: "/products",
    children: CATEGORIES.map((c) => ({ label: c.name, href: `/products/${c.slug}` })),
  },
  { label: "About Us", href: "/about" },
  { label: "Dealership", href: "/dealership" },
  { label: "Contact", href: "/contact" },
];
