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
  /** The registered office. NOT where the feed is made — see `manufacturing`. */
  address: {
    line1: "63 KVA, Chinar Colony, Darmuna",
    line2: "Budgam 191111",
    region: "Jammu & Kashmir",
  },
  /* ⚠ THE MILL IS IN PUNJAB, AND MOST OF THIS SITE SAYS IT IS IN BUDGAM.
     Roughly 400 km and a state line separate the two addresses, so the
     "milled locally / short supply lines" story told elsewhere is currently
     contradicted by this block. Every place that needs deciding:

       lib/site.ts COMPANY.story[3] ..... "milled in Budgam, Jammu & Kashmir"
       lib/site.ts LEADERSHIP ........... "every bag that leaves Budgam"
       app/dealership/page.tsx:24 ....... stat "J&K — Milled locally"
       app/dealership/page.tsx:37 ....... "refills travel a short distance"
       app/about/page.tsx:144 ........... figure "Milled in — Budgam, J&K"
       components/catalogue/RangeBlocks.tsx:21 ... same figure on the ranges

     Left as they are on purpose: whether Budgam mills as well, whether
     Ludhiana is a contract manufacturer, or whether the J&K-miller
     positioning is simply wrong, is a question about the business, not the
     code. Resolve it with the client before this site is promoted — a dealer
     choosing on "short supply lines" is choosing on this. */
  manufacturing: {
    /* ⚠ Spelling is the client's. If the village is the "Sidhwan" near
       Jagraon, this needs an h — it is the addressable part of the line. */
    line1: "Village Sidwan Kalan, GT Road",
    line2: "Jagraon, Ludhiana 142026",
    region: "Punjab",
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
   ORDER IS THE PAGE ORDER, left to right. The reserved seat is deliberately
   FIRST, at the client's instruction — the position is being held, and the
   page says so rather than quietly closing the gap. An entry with
   `name: null` renders as an open seat.

   ⚠ INVENTED COPY — READ BEFORE PUBLISHING. The client has supplied two
   photographs and two names, and nothing else. Everything written in Shayesta
   Hamid's entry below was composed by us at the client's request, to stand in
   until real copy arrives. It is attributed on a live website to a REAL, NAMED
   PERSON, which is why it is written the way it is:

     - No claim anyone could check. No years of experience, no qualification,
       no previous employer, no award, no responsibility that could be
       contradicted by someone who knows the company.
     - Approach and principle only, in the same register as the Director's
       entry — which is itself an expansion of the client's own brief.
     - `role` is the one factual assertion made, and "Director" was chosen
       because an Indian private limited company must have at least two
       directors, so it is the safest available placeholder. It is still
       UNCONFIRMED. If Shayesta Hamid's actual title is different, this is
       wrong on a live page about a real person — confirm it first.

   Get both the role and the bio approved in writing, then delete this notice.
   Do not extend this pattern to a third person. */
export type Leader = {
  /** null holds a seat open. No entry does today — the first seat, which was
      reserved, is now the CEO — but the Seat component still renders the
      dashed "reserved" panel for it, so a future appointment can be announced
      before it is filled. */
  name: string | null;
  /** null on a reserved seat whose title is not settled either. Inventing a
      title to fill the line would assert an org structure nobody has
      confirmed, which is a claim about seniority, not just a label. */
  role: string | null;
  /** Post-nominals, shown as their own line under the role. Separate from
      `role` on purpose: "CEO B Sc Agri MBA" as one string is not a job title,
      and a screen reader would read it as one. */
  credentials: string | null;
  /** Direct line, rendered as a tel: link.
      ⚠ A personal mobile, not a switchboard — publishing it puts it in front
      of scrapers as well as farmers. Set it only where the person has agreed
      to that, and drop it to null the day they would rather it came down. */
  phone: string | null;
  /** One bold line above the body copy. Sets the tone before the detail. */
  lede: string | null;
  /** Paragraphs. Written in the leader's own voice. */
  bio: string[] | null;
  photo: string | null;
};

export const LEADERSHIP: Leader[] = [
  /* The seat that was held open, now filled. Name, role, qualifications and
     number are the client's; `lede` and `bio` are NOT — they are written copy
     put in a real, named person's voice, and he has not seen them. Get them
     approved before this page is promoted anywhere.

     Portrait supplied by the client as raina_sir.png (1086x1448, 3:4). Cropped
     to the 4:5 the portrait boxes expect — the 91px came off the bottom, not
     the centre, so the headroom is untouched — then sized to the 630x788 WebP
     the other two seats use. The source PNG is still in the folder. */
  {
    name: "Sanjeev Raina",
    role: "CEO",
    credentials: "B.Sc. Agriculture · MBA",
    phone: "+91 99882 88678",
    /* ⚠ Everything from here to `photo` is invented copy. */
    lede: "Feed is the one input a farmer buys every week of the year. It should be the one he never has to think twice about.",
    bio: [
      "I trained in agriculture before I trained in business, and the order matters. You can model a market on a spreadsheet; you cannot model a cow. What she gives back depends on what she was given three weeks ago, and she keeps no accounts and accepts no excuses.",
      "Kashmir's dairy farms are small, and that is their strength — the animals are known individually, watched daily, and kept by the family that depends on them. What those farms have gone without is a feed steady enough that nobody feels the need to test each sack before trusting it. Building that is the whole of the work.",
      "We would rather grow slowly and be trusted than grow quickly and be questioned. If our name on a bag lets a farmer stop thinking about feed and get on with the rest of the farm, the job is done.",
    ],
    photo: "/images/team/sanjeev-raina.482d3562.webp",
  },
  {
    name: BRAND.contactPerson,
    role: "Director",
    credentials: null,
    /* The same number as BRAND.phone / BRAND.phoneHref, written in the
       leadership format (+91, spaced) so the three cards agree rather than
       showing one number as "90860-00555" beside another as "+91 …". Two
       renderings of one number: change the digits here and in BRAND together. */
    phone: "+91 90860 00555",
    lede: "Ready to serve the farming community of Jammu & Kashmir.",
    bio: [
      "Feed is bought on trust and judged on the next batch. That is the standard we hold ourselves to — every bag that leaves Budgam has to perform the way the last one did, because a farmer who changes feed mid-cycle pays for it twice.",
      "Working directly with farmers, dairy owners and our dealer network across Jammu & Kashmir means we hear quickly when something is not right, and we would far rather hear it than not. That feedback is worth more to us than any amount of marketing.",
      "Better nutrition makes healthier animals. Healthier animals make more productive farms. And more productive farms build the stronger farming community we set out to serve.",
    ],
    photo: "/images/team/showkat-wani.cc160c75.webp",
  },
  {
    name: "Shayesta Hamid",
    /* ⚠ Placeholder title — see the notice above. */
    role: "Director",
    credentials: null,
    phone: null,
    /* ⚠ Everything from here to `photo` is invented copy. */
    lede: "Quality is decided long before the bag is stitched shut.",
    bio: [
      "By the time feed reaches a farm it is far too late to fix it. What protects the farmer is the boring, repetitive part of this business — checking what arrives at the gate, holding a recipe to the gram, and refusing a batch that is nearly right.",
      "That standard only means something if it survives a busy week. So it is written down, it is followed when nobody is watching, and it does not bend because an order is waiting.",
    ],
    photo: "/images/team/shayesta-hamid.7c3a9ed6.webp",
  },
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

   ---- SUB-CATEGORIES ----
   `groups` splits a range into ordered sub-categories and `Product.group`
   points at one. A range with a single group renders without headings, so
   poultry and fish are unaffected. Grouping is presentational only — the flat
   `products` array is still the source of truth for counts, ALL_PRODUCTS and
   the admin store, and it stays in life-stage order so a range reads the same
   whether or not its headings are drawn.

   Cattle is grouped by what the feed DOES, not by species. The client asked
   for a cow/buffalo split; the artwork does not support one. Every bag in the
   range is printed "BALANCED CATTLE FEED" and dosed "400G (COW) & 500G
   (BUFFALO)" — so a buffalo sub-category would hold every bag and a cow
   sub-category would hold none. Buffalo suitability is carried on each product
   instead, which is what the sack says.

   ⚠ The latest artwork (hF_products) drops the buffalo from the photograph —
   the earlier renders pictured a buffalo beside a cow, these show cows only.
   The printed dosage line still covers both, so the reasoning above holds, but
   a farmer buying for buffalo now sees no buffalo on the bag. Worth raising.

   The one exception is the fifth band, Sheep & Goat Feed. It is not a cattle
   feed and does not pretend to be — it holds the three D. Mash bags, which are
   printed for sheep and goats. It was briefly a top-level range of its own and
   was folded in here at the client's explicit instruction. See the note on the
   band itself for what that costs.

   ---- TWO GENERATIONS OF ARTWORK ----
   The bags supplied fall into two distinct brand systems, and the catalogue
   currently shows both:

     CURRENT  "HIMALAYAN FEEDS PVT. LTD." over a mountain mark, sub-headed
              "BALANCED CATTLE FEED" and badged "FEED FOR PERFORMANCE".
              Matches BRAND.legal and BRAND.phone. All seven cattle shots.
     PREVIOUS "HIMALAYAN VALLEY FEEDS PVT. LTD." over an eagle roundel.
              A different legal name. All poultry shots and all three D. Mash.

   Cattle was moved to the current artwork; poultry and D. Mash have no
   current-brand bag yet, so they still show the previous one. ⚠ Commission
   poultry and D. Mash in the new system, or the catalogue will keep showing a
   dealer two different companies. The superseded cattle shots are parked in
   source-assets/superseded/ rather than deleted.

   ---- D. MASH ARTWORK: THREE THINGS TO FIX ----
   The copy for these three follows the SPECIES, not the strapline.

   1. @5000 and @8000 were re-supplied in the current wordmark with the "FEED
      FOR PERFORMANCE" badge, but the template was lifted from the cattle bags
      and still reads "BALANCED CATTLE FEED" under the wordmark — directly above
      a photograph of a sheep, a goat icon, and "A POWER PACKED DIET FOR SHEEP &
      GOATS". Three species signals against one strapline, so the strapline is
      the error. Get it corrected at the printer.
   2. Those same two keep the OLD eagle roundel, which reads "HIMALAYAN VALLEY
      FEEDS PVT. LTD." inside a bag whose wordmark says "HIMALAYAN FEEDS PVT.
      LTD." — two legal names on one sack.
   3. The base grade has not been re-supplied at all, so D. Mash still shows the
      fully old artwork while the two grades above it show the new. The band
      will not look like one family until all three match.

   ---- PACK SHOTS & NAMING ----
   Thirteen entries carry a real cut-out photograph of the client's own bag,
   and each one is NAMED AFTER THE BAG. A dealer reads the printed name, so a
   catalogue that calls it something else is a catalogue they cannot order
   from. `name`, `slug` and the image filename all follow the artwork.

   ⚠ `name` is the PRINTED name and is not what the site displays. Products are
   shown brand-first — "Himalayan Gold 8000" — via `productName()` further down
   this file. The table below is the sack, not the screen; keep it that way so
   there is always one record of what a dealer is actually holding.

     Calf Starter ....... calf-starter ..... CALF STARTER      50 kg
     Calf Grower ........ calf-grower ...... CALF GROWER       50 kg
     Heifer ............. heifer ........... HEIFER            50 kg
     Transition Mix ..... transition-mix ... TRANSITION DRY /
                                            TRANS - 20 Mix    50 kg  ⚠ renamed
     8000 ............... 8000 ............. 8000              50 kg
     Gold 8000 .......... gold-8000 ........ GOLD 8000         50 kg
     8000+ .............. 8000-plus ........ 8000+             50 kg
     10000 .............. 10000 ............ 10000             50 kg
     Pre Starter ........ pre-starter ...... PRE STARTER       25 kg
     Starter ............ starter .......... STARTER           25 kg
     Finisher ........... finisher ......... FINISHER          25 kg
     Layer Phase-1 ...... layer-phase-1 .... LAYER PHASE-1     50 kg
     Layer Phase-2 ...... layer-phase-2 .... LAYER PHASE-2     50 kg
     D. Mash ............ d-mash ........... D. MASH           25 kg
     D. Mash @5000 ...... d-mash-5000 ...... D. MASH @5000     25 kg
     D. Mash @8000 ...... d-mash-8000 ...... D. MASH @8000     25 kg

   `packSizes` is read off the NET WEIGHT panel of the bag in the photograph.
   It is the client's own artwork, not a guess, but it records the pack that
   was photographed — if a size is also sold in another format, this field
   needs widening.

   ---- THE hF_products DROP ----
   A later set of eight photographs replaced most of the cattle shots. Five
   were straight swaps (Calf Starter, Heifer, Transition Mix, Gold 8000, 10000)
   and HEIFER finally arrived uncropped, which is where its 50 kg came from.

   Two were NOT in the catalogue at all and were added on the client's
   instruction: 8000, which is a distinct bag from GOLD 8000 — same design,
   different grade badge — and 8000+, which replaced the orange GOLD 8000+.
   Note that rename: the live bag is green and prints "8000+" with no "GOLD",
   so the product was renamed to match the sack rather than the other way
   round. The orange bag is in source-assets/superseded/.

   The eighth, D. MASH @8000, was left unused: it is the OLDER template — big
   product name, no wordmark, no "Feed for Performance" badge — so swapping it
   in would have walked the range backwards. It is in source-assets/hf_products
   with the rest of the drop.

   ⚠ 8000+ is the only pack shot cut from a photograph of a physical bag on a
   concrete floor rather than a studio render. A border-seeded flood fill
   cannot separate it — the floor runs as a tonal gradient and the bag's
   shadowed green edges sit closer to the floor than the floor's own range — so
   it was cut by modelling the floor colour per row and then requiring
   connectivity to the border. If it is ever re-cut, do not reach for the
   flood fill; it will eat the bag.

   ⚠ The new bags changed two pack sizes: CALF STARTER and CALF GROWER are
   printed 50 kg, where the previous generation was 25 kg. Confirm which is
   being filled today.

   ---- WHAT THE NUMBERS MEAN ----
   Nothing here claims 8000 / 10000 / @5000 / @8000 are litres, kilograms or
   anything else. The bags print the figure inside a "FEED FOR PERFORMANCE"
   badge and define it nowhere, so the copy treats them as grades on the
   range's own ladder — which the naming already establishes — and stops there.
   §2.6 of docs/product-catalogue-spec.md forbids the rest until confirmed.

   ---- COPY ----
   For every product with a bag, `highlights` are the bag's OWN printed benefit
   bullets, so the site and the label a dealer is holding say the same thing.
   All seven new cattle bags carry an identical five-bullet strip (HIGH QUALITY
   INGREDIENTS · IMPROVES HEALTH & GROWTH · STRONG IMMUNITY, BETTER MILK YIELD ·
   BETTER DIGESTION, MAXIMUM NUTRITION · MORE MILK, MORE PROFIT), so each
   product takes the three that fit its job rather than repeating all five nine
   times. Every phrase is printed on that specific sack.

   The remaining three (Cattle Feed Pellets & Mash, Mineral & Nutritional
   Supplements, Poultry Nutritional Products) have NO corresponding bag. They
   keep the client's own product-list names and a transparent illustrated
   placeholder — there is no printed label to rename them after, and inventing
   one would put a name on the site that no bag in the warehouse carries.

   ---- REMOVED, AND WHY ----
   Buffalo Feed .......... claimed a buffalo-specific formulation "not adapted
                           from cattle feed". The current artwork contradicts
                           it: one range, dosed for both animals.
   Broiler Grower Feed ... removed at the client's instruction. Note this leaves
                           the poultry sequence Pre Starter → Starter →
                           Finisher, with the grower phase unrepresented; the
                           `lifecycle` rail was shortened to match rather than
                           advertise a stage with nothing behind it.

   ---- CUT-OUT PIPELINE ----
   Every shot was cut from the studio PNG by a 4-connected flood fill seeded
   ONLY from border pixels, with the image padded by a white ring first so a
   single corner seed reaches the whole backdrop. Tolerance 8 against pure
   white, then a 1px erode and a 0.8px blur for an antialiased edge. The
   tolerance matters: the backdrop is 253-255 and the WHITE-BODIED bags (PRE
   STARTER, STARTER, FINISHER, both LAYER PHASE bags, and the white top strip
   on all seven new cattle bags) are 246-255, so a looser cut fills straight
   through the sack and leaves a hollow shell that only looks right because the
   product card behind it is near-white. Re-cut, don't loosen. Output is 900x1200
   transparent WebP, ≤120 KB.

   ⚠ The new bags print "AN ISO 9001: 2026 CERTIFIED CO." — CERTIFICATIONS above
   says ISO 9001:2015, and 2015 is the current revision of that standard. They
   also print a second number, toll-free 7006111138, which appears nowhere on
   the site. Both need resolving before launch.

   ---- NO SUB-BRANDS ----
   No bag carries a sub-brand, so the site no longer claims one. Godhenu Gold,
   Nutri Choice and Matsya Bandhu appeared on no artwork ever supplied, and
   were removed at the client's instruction along with the `brand` field that
   held them. D. Mash went with them — it IS printed on the sack, but as the
   product name, which is where it now appears; using it as a range brand made
   the sheep and goat banner announce a product instead of a species.

   Each range's eyebrow is now `animal` — who the feed is for. See the note on
   that field. Do not reintroduce a brand line without a photograph of the bag
   it is printed on. */

/* ---------------- Sub-category ----------------
   One band of a range. Ordered; `Category.groups` drives the sequence the
   headings appear in, and products are listed under theirs in array order. */
export type ProductGroup = {
  slug: string;
  name: string;
  /** One line under the heading. Says what the band is for, not what it sells. */
  note: string;
};

export type Product = {
  slug: string;
  name: string;
  /** The `ProductGroup.slug` this product sits under. Required only on a range
      that declares `groups`; there, it MUST match one of them or the product
      drops out of the listing — `groupedProducts` iterates the groups, not the
      products. Omitted on ungrouped ranges. */
  group?: string;
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
  /** True where `image` is the illustrated placeholder rather than a
      photograph of the actual sack. The row badges the frame so a visitor
      reads "we haven't shot this yet" instead of "this is what it looks
      like".

      ⚠ This is a statement about the PHOTOGRAPH, not about availability —
      hence the badge wording "Photo coming soon". Do not reuse this flag to
      mean the product is unreleased; that is `Category.status` at range
      level, and at product level it would need its own field, because these
      three may well be selling today. See docs/product-catalogue-spec.md
      §2.6 — an unconfirmed fact is left visibly open, never guessed at.

      Set it explicitly rather than sniffing for `.svg`: the flag has to
      survive a placeholder being redrawn as a PNG, and it is the thing the
      client is actually being asked to resolve. */
  photoPending?: boolean;
};

export type Category = {
  slug: string;
  name: string;
  /** Who the range is for, in the farmer's words — "Cattle, Buffalo, Sheep &
      Goats", not "Bovine & Ovine". This is the eyebrow above the range title, on the
      catalogue banner, the homepage tile, the header menu and the footer.

      It replaced a `brand` field holding invented sub-brands (Godhenu Gold,
      Nutri Choice, Matsya Bandhu, D. Mash). Three of the four appear on no
      bag the client has supplied, so the site was announcing product lines
      that do not exist on any sack a dealer can point at. Naming the animal
      is both true and more useful — a farmer scans for their species, not for
      a sub-brand they have never heard. If a REAL printed sub-brand ever
      arrives, add it as a new field; do not overload this one. */
  animal: string;
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
  /** The animal's stages in order. Drives the sequence rail. Empty hides it —
      a range graded by performance rather than age has no sequence to show. */
  lifecycle: string[];
  /** Ordered sub-categories. EMPTY means the range is not sub-divided and its
      products render as one flat sequence — which is what poultry and fish do.
      Only add groups where a range is genuinely two or more
      different jobs; grouping a six-product range into sixes of one is worse
      than not grouping it. */
  groups: ProductGroup[];
  /** 16:9 range photograph. null renders the accent panel instead, for a range
      that is live but has no photography yet. No range uses null today — the
      branch is kept because the next one probably will, and because the
      alternative is substituting another species' photo to fill the frame,
      which is never the right answer.

      A sheep photograph was supplied for the short-lived Sheep & Goat range and
      is parked in source-assets/sheep.webp. Sheep and goats are a band inside
      Cattle Feed now and bands are text headings, so it has no slot. */
  image: string | null;
  imageAlt: string;
  products: Product[];
};

export const CATEGORIES: Category[] = [
  /* -------- Cattle: calf → in milk → peak yield → herd-wide → add-on -------- */
  {
    slug: "cattle-feed",
    name: "Cattle Feed",
    /* Names all four species, because the range now carries a sheep and goat
       band. The eyebrow is the only place a visitor learns that before they
       have scrolled to it. */
    animal: "Cattle, Buffalo, Sheep & Goats",
    accent: "terracotta",
    status: "available",
    launchNote: null,
    lifecycle: ["Calf", "Growing calf", "Heifer", "Transition", "In milk", "Higher yield", "Peak yield"],
    groups: [
      {
        slug: "young-stock",
        name: "Young Stock",
        note: "The animals earning nothing today. What they are fed now decides what they milk later.",
      },
      {
        slug: "transition",
        name: "Transition",
        note: "The few weeks either side of calving, where a lactation is won or lost.",
      },
      {
        slug: "milking",
        name: "Milking Feed",
        note: "Feed for Performance. Three grades on one ladder — step up as you ask more of the animal.",
      },
      {
        slug: "supplements",
        name: "Herd Supplements",
        note: "Fed alongside the ration rather than in place of any part of it.",
      },
      /* Sheep and goats live inside the cattle range at the client's explicit
         instruction, rather than as a range of their own. The band heading and
         every product line say sheep and goats plainly, so a visitor is never
         misled about the species — but note that a farmer filtering the site
         for "sheep feed" has to open a page called Cattle Feed to find it. If
         that ever costs an enquiry, the fix is to promote this band back to a
         top-level range; the data moves, nothing else changes. */
      {
        slug: "sheep-goat",
        name: "Sheep & Goat Feed",
        note: "D. Mash — an energy-rich dairy mash for milking ewes and does, in three grades.",
      },
    ],
    blurb:
      "Feed for every stage of the dairy animal — plus a sheep and goat mash. Built for milk production, herd health and steady growth.",
    intro:
      "A dairy animal converts feed into milk every single day, and the quality of that conversion is the whole business. The range follows the animal's own life — from her first weeks as a calf, through calving, and on into peak lactation. Every cattle bag is formulated for cows and buffalo alike, and dosed for both. The sheep and goat mash sits at the foot of the range.",
    image: "/images/cattle.webp",
    imageAlt: "Dairy cattle raised on Himalayan cattle feed",
    products: [
      {
        slug: "calf-starter",
        name: "Calf Starter",
        group: "young-stock",
        stage: "Calf",
        summary: "Where it starts — the feed that shapes the animal she becomes.",
        description:
          "A calf's frame, her rumen and her immunity are all built in the first few months, and a heifer that grows well in that window reaches service weight sooner and milks better for it. Formulated to be easy to digest and palatable enough that intake starts early and holds steady right through weaning.",
        highlights: ["Improves health & growth", "Better digestion", "Strong immunity"],
        suitableFor: ["Calves", "Replacement heifers", "Cow & buffalo herds"],
        form: null,
        packSizes: "50 kg",
        image: "/images/products/calf-starter.webp",
        imageAlt: "Himalayan Feeds Calf Starter — balanced cattle feed, 50 kg bag",
      },
      {
        slug: "calf-grower",
        name: "Calf Grower",
        group: "young-stock",
        stage: "Growing calf",
        summary: "After the starter — the months that turn a calf into a heifer.",
        description:
          "Once the rumen is working properly the job changes from getting her eating to building the animal. Formulated for steady frame and bone development through the growing months, so she reaches the heifer stage the right size for her age instead of trying to catch up on it later.",
        highlights: ["Improves health & growth", "High quality ingredients", "Strong immunity"],
        suitableFor: ["Growing calves", "Replacement heifers", "Cow & buffalo herds"],
        form: null,
        packSizes: "50 kg",
        image: "/images/products/calf-grower.webp",
        imageAlt: "Himalayan Feeds Calf Grower — balanced cattle feed, 50 kg bag",
      },
      {
        slug: "heifer",
        name: "Heifer",
        group: "young-stock",
        stage: "Heifer",
        summary: "The last stretch before she calves — and the one most often cut.",
        description:
          "A maiden heifer produces nothing this month, which is exactly why her ration is the first one trimmed. She is building the animal that has to milk for the next several years. Formulated to hold condition and support frame and fertility, so she gets in calf on time and calves down fit rather than fat.",
        highlights: ["Improves health & growth", "High quality ingredients", "Better digestion"],
        suitableFor: ["Maiden heifers", "Replacement stock", "Cow & buffalo herds"],
        form: null,
        /* Was null while the only render was cropped above the net-weight
           panel. The hF_products artwork shows the full bag: 50 kg. */
        packSizes: "50 kg",
        image: "/images/products/heifer.webp",
        imageAlt: "Himalayan Feeds Heifer — balanced cattle feed bag",
      },
      {
        /* ⚠ The one product NOT named after its bag. The sack prints
           "TRANSITION DRY" as a headline with "TRANS - 20 Mix" in the badge
           below it; the client asked for "Transition Mix", which is neither
           string exactly. Their call — they know what a dealer orders it by —
           but if a dealer ever searches the site for "Trans-20" and finds
           nothing, this is why. */
        slug: "transition-mix",
        name: "Transition Mix",
        group: "transition",
        stage: "Transition",
        summary: "Around calving — the few weeks that decide the whole lactation.",
        description:
          "Appetite falls away in the days either side of calving, exactly when her demand is climbing fastest, and ground lost in that window is rarely made back later. Built to keep intake up through the changeover, so she walks into milk in condition instead of drawing on her own reserves to produce it.",
        highlights: ["Better digestion", "Strong immunity, better milk yield", "Improves health & growth"],
        suitableFor: ["Dry & freshly calved cows", "Buffalo at calving", "Dairy herds"],
        form: "Mix",
        packSizes: "50 kg",
        image: "/images/products/transition-mix.webp",
        imageAlt: "Himalayan Feeds Transition Dry, Trans-20 Mix — balanced cattle feed, 50 kg bag",
      },
      {
        /* ⚠ LADDER ORDER IS AN ASSUMPTION. The four milking bags are printed
           8000, GOLD 8000, 8000+ and 10000, and none of them says where it sits
           relative to the others. They are listed cheapest-sounding first, with
           GOLD read as a premium of the 8000 grade. Confirm the real order — a
           dealer selling "the next one up" off this page needs it right. */
        slug: "8000",
        name: "8000",
        group: "milking",
        stage: "In milk",
        summary: "The everyday milking ration — where the ladder starts.",
        description:
          "The working feed for a herd in steady production, fed against the milk actually in the churn: the bag sets the rate at 400 g per litre for a cow and 500 g for a buffalo. It is the grade most herds sit on for most of the lactation, and the base the rest of the range is measured from.",
        highlights: ["High quality ingredients", "Better digestion", "More milk, more profit"],
        suitableFor: ["Dairy cows in milk", "Buffalo in milk", "Mixed herds"],
        form: null,
        packSizes: "50 kg",
        image: "/images/products/8000.webp",
        imageAlt: "Himalayan Feeds 8000 — balanced cattle feed, 50 kg bag",
      },
      {
        slug: "gold-8000",
        name: "Gold 8000",
        group: "milking",
        stage: "In milk",
        summary: "The Gold grade, at the same feeding rate.",
        description:
          "Fed on the same measure as 8000 — 400 g per litre for a cow, 500 g for a buffalo — for the same stage of the lactation. What separates the two is the formulation rather than the feeding, so ask us which suits your herd before you switch between them.",
        highlights: ["High quality ingredients", "More milk, more profit", "Better digestion"],
        suitableFor: ["Dairy cows in milk", "Buffalo in milk", "Mixed herds"],
        form: null,
        packSizes: "50 kg",
        image: "/images/products/gold-8000.webp",
        imageAlt: "Himalayan Feeds Gold 8000 — balanced cattle feed, 50 kg bag",
      },
      {
        slug: "8000-plus",
        name: "8000+",
        group: "milking",
        stage: "Higher yield",
        summary: "One step up — for the animals pulling ahead of the herd.",
        description:
          "Most herds have a group doing noticeably more than the rest, and feeding them the same grade as everyone else quietly costs you the difference. The step up for cows and buffalo whose output has moved beyond what the base grade is built to carry.",
        highlights: ["Strong immunity, better milk yield", "More milk, more profit", "High quality ingredients"],
        suitableFor: ["Higher-yielding cows", "Higher-yielding buffalo"],
        form: null,
        packSizes: "50 kg",
        image: "/images/products/8000-plus.webp",
        imageAlt: "Himalayan Feeds 8000+ — balanced cattle feed, 50 kg bag",
      },
      {
        slug: "10000",
        name: "10000",
        group: "milking",
        stage: "Peak yield",
        summary: "The top of the ladder — the densest ration in the range.",
        description:
          "A high-producing animal physically cannot eat enough volume to cover her own output, so the answer is a denser feed rather than a bigger scoop. The grade for herds pushing for maximum milk, where yield has to hold right through the flush without the animal paying for it in condition or health.",
        highlights: ["More milk, more profit", "Maximum nutrition", "Strong immunity, better milk yield"],
        suitableFor: ["High-yield cows", "High-yield buffalo", "Crossbreds at flush"],
        form: null,
        packSizes: "50 kg",
        image: "/images/products/10000.webp",
        imageAlt: "Himalayan Feeds 10000 — balanced cattle feed, 50 kg bag",
      },
      {
        slug: "cattle-pellets-and-mash",
        name: "Cattle Feed Pellets & Mash",
        group: "supplements",
        stage: "Herd-wide",
        summary: "Across the herd — the same nutrition, in whichever form your shed prefers.",
        description:
          "Pellets travel and store cleanly, stop the animal sorting the mix at the manger and cut what ends up underfoot. Mash blends readily into a home ration where green fodder and silage are already part of the routine. Which one suits you is a handling decision more than a nutritional one.",
        highlights: ["Two handling formats", "Cuts sorting at the manger", "Reduces wastage"],
        suitableFor: ["Manger-fed sheds", "Home-mixed rations"],
        form: "Pellet or mash",
        packSizes: null,
        image: "/images/products/cattle-pellets-and-mash.svg",
        imageAlt:
          "Illustrated placeholder — no pack photograph for Cattle Feed Pellets and Mash yet",
        photoPending: true,
      },
      {
        slug: "cattle-mineral-supplements",
        name: "Mineral & Nutritional Supplements",
        group: "supplements",
        stage: "Add-on",
        summary: "Alongside the ration — the minerals a home mix usually misses.",
        description:
          "Farms mixing their own fodder and concentrate normally have the energy about right and the minerals short, and it shows up in fertility long before it shows up in the milk. This range fills that gap alongside whatever you already feed, rather than replacing any part of it.",
        highlights: ["Fills mineral gaps", "Supports fertility", "Used with the main ration"],
        suitableFor: ["Home-mixed rations", "Grazing herds"],
        form: null,
        packSizes: null,
        image: "/images/products/cattle-mineral-supplements.svg",
        imageAlt:
          "Illustrated placeholder — no pack photograph for Mineral and Nutritional Supplements yet",
        photoPending: true,
      },
      {
        slug: "d-mash",
        name: "D. Mash",
        group: "sheep-goat",
        stage: "Base grade",
        summary: "The base grade — the working ration for a milking flock.",
        description:
          "An energy-rich mash for sheep and goats in steady production, fed alongside grazing and whatever fodder the season provides. It is the grade most flocks sit on, and the one the two above it step up from.",
        highlights: ["High energy", "High milk production", "Better digestion"],
        suitableFor: ["Milking ewes & does", "Mixed sheep & goat flocks"],
        form: "Mash",
        packSizes: "25 kg",
        image: "/images/products/d-mash.webp",
        imageAlt: "Himalayan Feeds D. Mash — premium dairy mash for sheep and goats, 25 kg bag",
      },
      {
        slug: "d-mash-5000",
        name: "D. Mash @5000",
        group: "sheep-goat",
        stage: "Higher grade",
        summary: "One step up — for the animals doing more than the flock average.",
        description:
          "Grazing and the base grade together will carry an average animal, but not the ones pulling ahead of it. The middle grade of the range, for ewes and does whose output has moved past what the everyday mash is built to cover.",
        highlights: ["High energy", "High milk production", "Improves health"],
        suitableFor: ["Higher-yielding ewes & does", "Dairy goat units"],
        form: "Mash",
        packSizes: "25 kg",
        image: "/images/products/d-mash-5000.webp",
        imageAlt: "Himalayan Feeds D. Mash @5000 — premium dairy mash for sheep and goats, 25 kg bag",
      },
      {
        slug: "d-mash-8000",
        name: "D. Mash @8000",
        group: "sheep-goat",
        stage: "Top grade",
        summary: "The top grade — the densest mash in the range.",
        description:
          "A high-producing ewe or doe runs out of appetite long before she runs out of demand, so the ration has to carry more in the same volume. The grade for flocks pushing for maximum milk, where yield has to hold without the animal drawing on her own condition to keep it there.",
        highlights: ["High energy", "High milk production", "Improves health"],
        suitableFor: ["High-yield ewes & does", "Commercial dairy goat units"],
        form: "Mash",
        packSizes: "25 kg",
        image: "/images/products/d-mash-8000.webp",
        imageAlt: "Himalayan Feeds D. Mash @8000 — premium dairy mash for sheep and goats, 25 kg bag",
      },
    ],
  },

  /* -------- Poultry: chick → starter → grower → finisher → lay → add-on -------- */
  {
    slug: "poultry-feed",
    name: "Poultry Feed",
    animal: "Broilers & Layers",
    accent: "orange",
    status: "available",
    launchNote: null,
    /* No "Grower" — Broiler Grower Feed was removed and the rail must not
       advertise a stage the range no longer covers. */
    lifecycle: ["Chick", "Starter", "Finisher", "Early lay", "Peak lay", "Add-on"],
    /* Ungrouped on purpose. A broiler/layer split is the obvious cut and the
       structure now supports it, but Pre Starter is printed for broiler AND
       layer chicks, so it would either be duplicated across both groups or
       stranded in a third. Leave it flat until the client says which. */
    groups: [],
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
        imageAlt:
          "Illustrated placeholder — no pack photograph for Poultry Nutritional Products yet",
        photoPending: true,
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
    animal: "Floating Fish Feed",
    accent: "leaf",
    status: "coming-soon",
    launchNote:
      "The fish feed range is in development and is not yet available to order. Register your interest and we will contact you the moment it launches.",
    lifecycle: ["Fry", "Fingerling", "Grow-out"],
    groups: [],
    blurb:
      "Floating pellets with high digestibility that keep water clean and support steady, healthy fish growth.",
    intro:
      "A floating pellet lets you see what the pond is actually eating, so feeding can be matched to appetite instead of guessed at. The range is being developed for clean water and steady, predictable growth.",
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

/* ---------------- Catalogue page header ----------------
   /products and /products/[category] show the same title block, so it lives
   here once rather than as the same string typed into two files. The range
   count is DERIVED: it said "Two ranges available now" for a while after the
   third went live, which is exactly the kind of line nobody thinks to update.
   Add a range and this sentence corrects itself. */
const RANGE_WORD = ["No", "One", "Two", "Three", "Four", "Five", "Six"];
const LIVE_RANGES =
  RANGE_WORD[AVAILABLE_CATEGORIES.length] ?? String(AVAILABLE_CATEGORIES.length);

export const CATALOGUE_HEADER = {
  eyebrow: "Our Products",
  /* Names the species sold, not the ranges listed — sheep and goat feed is a
     band inside Cattle Feed, and a farmer searching for it should still find
     this page. */
  title: "Cattle, Poultry & Sheep Feed",
  sub: `${LIVE_RANGES} ranges available now, listed in the animal's own order — from its first weeks through to full production. Fish feed is in development.`,
};

export const getCategory = (slug: string) =>
  CATEGORIES.find((c) => c.slug === slug);

/* ---------------- Display name ----------------
   Every product is shown brand-first — "Himalayan D. Mash", not "D. Mash".

   The prefix is applied HERE rather than baked into `Product.name`, and that
   distinction is deliberate. `name` records what is printed on the sack, which
   is the rule the whole catalogue is built on and what the naming table at the
   top of this file documents; a dealer reads the bag, and the bag says
   "GOLD 8000". Editing the stored names to "Himalayan Gold 8000" would quietly
   make that table false and leave nothing recording the printed name.

   So the sack keeps its name, the site adds the brand, and dropping or changing
   the prefix later is one line here instead of eighteen edits.

   `BRAND.name` is the short form ("Himalayan"); BRAND.full would read
   "Himalayan Feeds D. Mash", which doubles the word on a bag already headed
   HIMALAYAN FEEDS PVT. LTD. */
export const productName = (p: Product) => `${BRAND.name} ${p.name}`;

/* ---------------- Products, in their sub-category bands ----------------
   The one place grouping is resolved. Everything that lists a range's products
   with headings goes through here, so the nav and the listing can never drift
   into different orders.

   An ungrouped range (`groups: []`) comes back as a single band with a null
   group — callers render the products and skip the heading. A band that ends
   up empty is dropped rather than rendered as a heading over nothing, which is
   what happens if a group is declared before its products are written.

   A product whose `group` matches no declared group is NOT dropped. It is
   collected into a trailing unheaded band, so a typo costs you a heading and
   not a product — the failure shows up as a row in the wrong place, which
   someone notices, instead of a row that is simply absent, which nobody does.

   Products keep their array order within a band, so life-stage order survives
   grouping. `index` is the product's position in the whole range — the listing
   numbers rows from it, so the count runs 01..09 across the range rather than
   restarting at each heading and implying four separate sequences. */
export function groupedProducts(category: Category) {
  const bands: { group: ProductGroup | null; products: Product[] }[] =
    category.groups.map((group) => ({
      group,
      products: category.products.filter((p) => p.group === group.slug),
    }));

  const placed = new Set(bands.flatMap((b) => b.products));
  const rest = category.products.filter((p) => !placed.has(p));
  if (rest.length > 0) bands.push({ group: null, products: rest });

  let index = 0;
  return bands
    .filter((b) => b.products.length > 0)
    .map((b) => ({
      ...b,
      products: b.products.map((product) => ({ product, index: index++ })),
    }));
}

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
