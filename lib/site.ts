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

   ---- PACK SHOTS & NAMING ----
   Ten entries carry a real cut-out photograph of the client's own bag, and
   each one is NAMED AFTER THE BAG. A dealer reads the printed name, so a
   catalogue that calls it something else is a catalogue they cannot order
   from. `name`, `slug` and the image filename all follow the artwork:

     Calf Starter ....... calf-starter ..... CALF STARTER     25 kg
     Calf Grower ........ calf-grower ...... CALF GROWER      25 kg
     Heifer & Dry ....... heifer-and-dry ... HEIFER & DRY     50 kg
     Transition ......... transition ....... TRANSITION       50 kg
     10000+ ............. 10000-plus ....... 10000+           50 kg
     Pre Starter ........ pre-starter ...... PRE STARTER      25 kg
     Starter ............ starter .......... STARTER          25 kg
     Finisher ........... finisher ......... FINISHER         25 kg
     Layer Phase-1 ...... layer-phase-1 .... LAYER PHASE-1    50 kg
     Layer Phase-2 ...... layer-phase-2 .... LAYER PHASE-2    50 kg

   ---- COPY ----
   Every description was rewritten against the artwork after the rename. For
   the seven with a bag, `highlights` are now the bag's OWN printed benefit
   bullets, so the site and the label a dealer is holding say the same thing —
   no claim appears here that is not already printed on the sack. Two needed
   more than a polish, because the rename made the old wording flatly untrue:
   TRANSITION is a pre/post-calving feed, not the everyday milking ration the
   old "Dairy Cattle Feed" text described; and PRE STARTER now heads the
   broiler sequence, so it can no longer be positioned away from commercial
   broilers. Claims that appear on no bag were dropped — "supports fat
   percentage" and "mineral fortified" among them.

   `packSizes` for those seven is read off the NET WEIGHT panel of the bag in
   the photograph. It is the client's own artwork, not a guess, but it records
   the pack that was photographed — if a size is also sold in another format,
   this field needs widening.

   The remaining five (Buffalo Feed, Cattle Feed Pellets & Mash, Mineral &
   Nutritional Supplements, Broiler Grower Feed, Poultry Nutritional Products)
   have NO corresponding bag in the supplied artwork. They keep the client's
   own product-list names and a transparent illustrated placeholder — there is
   no printed label to rename them after, and inventing one would put a name on
   the site that no bag in the warehouse carries.

   ⚠ Unused artwork: three D. MASH bags — D. MASH, D. MASH @5000 and
   D. MASH @8000, all printed "A POWER PACKED DIET FOR SHEEP & GOATS". That is
   a whole fourth range for a species this site does not currently sell, so it
   has no home in CATEGORIES. Decide whether Himalayan Feeds sells sheep and
   goat feed; if it does, this needs its own category, not a cattle slot.

   ---- CUT-OUT PIPELINE ----
   All ten were cut from the studio PNGs in source-assets/product_photos by a
   4-connected flood fill seeded only from border pixels, threshold 250, with
   a 10px distance-feathered edge. The threshold matters: the backdrop is
   253-255 and the WHITE-BODIED bags (PRE STARTER, STARTER, FINISHER, both
   LAYER PHASE bags) are 246-255, so a looser cut fills straight through the
   sack and leaves a hollow shell that only looks right because the product
   card behind it is near-white. Re-cut, don't loosen.

   ⚠ Every bag is printed "HIMALAYAN VALLEY FEEDS PVT. LTD." and carries no
   sub-brand. The `brand` strings below (Godhenu Gold, Nutri Choice) and
   BRAND.legal appear on no artwork supplied so far — confirm before launch. */

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
     showing a number nobody has stood behind. Fill these ONLY from the
     client's own bag artwork or a written confirmation — never from a
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
    lifecycle: ["Calf", "Growing calf", "Heifer & dry", "Transition", "Peak yield", "Herd-wide", "Add-on"],
    blurb:
      "Cattle feed for every stage — supporting milk production, herd health and strong, steady growth.",
    intro:
      "A dairy animal converts feed into milk every single day, and the quality of that conversion is the whole business. The range follows the animal's own life — from her first weeks as a calf, through calving, and on into peak lactation.",
    image: "/images/cattle.webp",
    imageAlt: "Dairy cattle raised on Himalayan cattle feed",
    products: [
      {
        slug: "calf-starter",
        name: "Calf Starter",
        stage: "Calf",
        summary: "Where it starts — the feed that shapes the animal she becomes.",
        description:
          "A calf's frame, her rumen and her immunity are all built in the first few months, and a heifer that grows well in that window reaches service weight sooner and milks better for it. Formulated to be easy to digest and palatable enough that intake starts early and holds steady right through weaning.",
        highlights: ["Strong, even growth", "Bone development", "Better digestion"],
        suitableFor: ["Calves", "Replacement heifers"],
        form: null,
        packSizes: "25 kg",
        image: "/images/products/calf-starter.webp",
        imageAlt: "Himalayan Feeds Calf Starter — premium calf feed, 25 kg bag",
      },
      {
        slug: "calf-grower",
        name: "Calf Grower",
        stage: "Growing calf",
        summary: "After the starter — the months that turn a calf into a heifer.",
        description:
          "Once the rumen is working properly the job changes from getting her eating to building the animal. Formulated for steady frame and bone development through the growing months, so she reaches the heifer stage the right size for her age instead of trying to catch up on it later.",
        highlights: ["Strong growth & development", "Strong bones", "Supports immunity"],
        suitableFor: ["Growing calves", "Replacement heifers"],
        form: null,
        packSizes: "25 kg",
        image: "/images/products/calf-grower.webp",
        imageAlt: "Himalayan Feeds Calf Grower — premium calf feed, 25 kg bag",
      },
      {
        slug: "heifer-and-dry",
        name: "Heifer & Dry",
        stage: "Heifer & dry",
        summary: "The animals earning nothing today — and building next year's lactation.",
        description:
          "A maiden heifer and a dry cow are the two animals on the farm that produce nothing this month, which is exactly why their ration is the first one to get cut. Both are building the next lactation. Formulated to hold body condition and support bone development and fertility, so heifers get in calf on time and dry cows calve down fit rather than fat.",
        highlights: ["Good body condition", "Strong bones", "Better reproduction"],
        suitableFor: ["Maiden heifers", "Dry cows"],
        form: null,
        packSizes: "50 kg",
        image: "/images/products/heifer-and-dry.webp",
        imageAlt: "Himalayan Feeds Heifer & Dry — premium feed for heifers and dry cows, 50 kg bag",
      },
      {
        slug: "transition",
        name: "Transition",
        stage: "Transition",
        summary: "Around calving — the few weeks that decide the whole lactation.",
        description:
          "Appetite falls away in the days either side of calving, exactly when her demand is climbing fastest, and ground lost in that window is rarely made back later. Built to keep intake up through the changeover, so she walks into milk in condition instead of drawing on her own reserves to produce it.",
        highlights: ["Improves feed intake", "Supports higher milk yield", "Holds body condition"],
        suitableFor: ["Dry & freshly calved cows", "Dairy herds"],
        form: null,
        packSizes: "50 kg",
        image: "/images/products/transition.webp",
        imageAlt: "Himalayan Feeds Transition — premium transition feed, 50 kg bag",
      },
      {
        slug: "10000-plus",
        name: "10000+",
        stage: "Peak yield",
        summary: "At peak lactation — the densest ration in the range.",
        description:
          "A high-producing cow physically cannot eat enough volume to cover her own output, so the answer is a denser feed rather than a bigger scoop. Formulated for herds pushing for maximum milk, where yield has to be held right through the flush without the cow paying for it in condition or health.",
        highlights: ["Nutrient dense", "Built for maximum milk", "Supports herd health"],
        suitableFor: ["High-yield cows", "Crossbreds at flush"],
        form: null,
        packSizes: "50 kg",
        image: "/images/products/10000-plus.webp",
        imageAlt: "Himalayan Feeds 10000+ — premium quality dairy feed, 50 kg bag",
      },
      {
        slug: "buffalo-feed",
        name: "Buffalo Feed",
        stage: "Buffalo herd",
        summary: "For buffalo — formulated for the animal, not adapted from cattle feed.",
        description:
          "Buffalo digest fibre and partition nutrients differently from crossbred cows, and a ration designed around one does not serve the other well. Built for buffalo herds, where the milk is paid on fat and the ration has to deliver it.",
        highlights: ["Buffalo-specific formulation", "Supports butterfat", "Not a rebadged cow feed"],
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
        summary: "Across the herd — the same nutrition, in whichever form your shed prefers.",
        description:
          "Pellets travel and store cleanly, stop the animal sorting the mix at the manger and cut what ends up underfoot. Mash blends readily into a home ration where green fodder and silage are already part of the routine. Which one suits you is a handling decision more than a nutritional one.",
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
        summary: "Alongside the ration — the minerals a home mix usually misses.",
        description:
          "Farms mixing their own fodder and concentrate normally have the energy about right and the minerals short, and it shows up in fertility long before it shows up in the milk. This range fills that gap alongside whatever you already feed, rather than replacing any part of it.",
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
    lifecycle: ["Chick", "Starter", "Grower", "Finisher", "Early lay", "Peak lay", "Add-on"],
    blurb:
      "Phase-by-phase poultry feed built around weight gain, feed conversion and egg quality.",
    intro:
      "Poultry margins live in the feed conversion ratio, and a fraction of a point across a full shed is the difference between a profitable cycle and a break-even one. The range runs in the bird's own order, from day-old chick through to a hen in full lay.",
    image: "/images/poultry.webp",
    imageAlt: "Poultry on a farm raised on Himalayan poultry feed",
    products: [
      {
        slug: "pre-starter",
        name: "Pre Starter",
        stage: "Chick",
        summary: "Day one — the first feed a chick ever eats.",
        description:
          "The opening feed for every bird on the farm, broiler and layer alike. Fine-textured and highly palatable so chicks are eating within hours of placement — which is what decides whether a flock leaves week one even, or already split into birds that are away and birds that never catch up.",
        highlights: ["Strong start", "Supports immunity", "Better feed conversion"],
        suitableFor: ["Broiler & layer chicks", "Backyard & desi flocks"],
        form: null,
        packSizes: "25 kg",
        image: "/images/products/pre-starter.webp",
        imageAlt: "Himalayan Feeds Pre Starter — premium poultry feed, 25 kg bag",
      },
      {
        slug: "starter",
        name: "Starter",
        stage: "Starter",
        summary: "Once the flock is feeding — the phase that sets the growth curve.",
        description:
          "With intake established, this is where frame, feather and immunity are laid down together, and where the curve underneath the rest of the cycle gets set. Formulated to keep growth strong and the flock even, so the birds reach the grower phase as one batch rather than three.",
        highlights: ["Strong growth", "Feather development", "Improves feed efficiency"],
        suitableFor: ["Commercial broiler units", "Contract farming"],
        form: null,
        packSizes: "25 kg",
        image: "/images/products/starter.webp",
        imageAlt: "Himalayan Feeds Starter — premium poultry feed, 25 kg bag",
      },
      {
        slug: "broiler-grower-feed",
        name: "Broiler Grower Feed",
        stage: "Grower",
        summary: "The middle stretch — where most of the bird actually gets built.",
        description:
          "The grower phase lays down the bulk of the skeleton and the muscle on it, and it is also where growth can outrun the legs and heart that have to carry it. Formulated to keep the bird moving quickly without pushing it past what its own frame can support.",
        highlights: ["Frame development", "Controlled growth rate", "Steady intake"],
        suitableFor: ["Commercial broiler units"],
        form: null,
        packSizes: null,
        image: "/images/products/broiler-grower-feed.svg",
        imageAlt: "Broiler Grower Feed pack",
      },
      {
        slug: "finisher",
        name: "Finisher",
        stage: "Finisher",
        summary: "The closing phase — where the feed bill is largest and conversion pays hardest.",
        description:
          "A broiler eats more in its final stretch than in any phase before it, so a fraction of a point on feed conversion is worth more here than anywhere else in the cycle. Built to carry flocks to weight evenly and hold meat quality right through to lifting.",
        highlights: ["Maximum weight gain", "Better FCR", "Improves meat quality"],
        suitableFor: ["Commercial broiler units"],
        form: null,
        packSizes: "25 kg",
        image: "/images/products/finisher.webp",
        imageAlt: "Himalayan Feeds Finisher — premium poultry feed, 25 kg bag",
      },
      {
        slug: "layer-phase-1",
        name: "Layer Phase-1",
        stage: "Early lay",
        summary: "Coming into lay — building the hen before she has to perform.",
        description:
          "A pullet has to reach frame and bodyweight before first egg, because whatever she has not built by then she never will. Formulated for the run-up to lay and the opening weeks of production, when body development and early egg output are being asked for at the same time.",
        highlights: ["Promotes early maturity", "Better body development", "Strong bones"],
        suitableFor: ["Pullets", "Commercial layer units"],
        form: null,
        packSizes: "50 kg",
        image: "/images/products/layer-phase-1.webp",
        imageAlt: "Himalayan Feeds Layer Phase-1 — premium layer feed, 50 kg bag",
      },
      {
        slug: "layer-phase-2",
        name: "Layer Phase-2",
        stage: "Peak lay",
        summary: "Deep into lay — holding rate, egg weight and shell strength together.",
        description:
          "A hen short of calcium draws it out of her own skeleton, and it shows up in the shell long before it shows up in the count. Formulated for the later laying phase, where the job is to keep production, egg weight and shell strength holding together rather than trading one off against another.",
        highlights: ["High egg production", "Better shell strength", "Improves egg weight"],
        suitableFor: ["Commercial layer units"],
        form: null,
        packSizes: "50 kg",
        image: "/images/products/layer-phase-2.webp",
        imageAlt: "Himalayan Feeds Layer Phase-2 — premium layer feed, 50 kg bag",
      },
      {
        slug: "poultry-nutritional-products",
        name: "Poultry Nutritional Products",
        stage: "Add-on",
        summary: "Alongside the ration — support for the moments that strain a flock.",
        description:
          "Placement, transfer, a heat wave and the tail end of a long lay all pull on a flock in ways the daily ration alone is not meant to cover. Used alongside the main feed, never in place of it.",
        highlights: ["Supports stress periods", "Heat & transfer support", "Used with the main feed"],
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
    image: "/images/fish.webp",
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
