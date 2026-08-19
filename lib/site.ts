/* ---------------- Brand identity & contact details ----------------
   Wording follows the client's own company brief. `tagline` and `positioning`
   are the approved brand lines — change them there, not in components. */
export const BRAND = {
  name: "Himalayan",
  full: "Himalayan Feeds",
  legal: "Himalayan Feeds Pvt. Ltd.",
  tagline: "Nutrition for Better Growth & Better Yield",
  /** The lockup that sits under the wordmark.
      ⚠ Shown in FOUR places, not just the header: the footer, the BrandLockup
      on /about and the homepage, and the sign-off on /dealership. Re-wording
      it moves all of them, which is the point — it is one brand line — but it
      is worth knowing before changing it for the sake of one of them. */
  positioning: "Animal Feeds | Animal Nutrition",
  /** The promise under the positioning line in the header lockup. Sentence
      case on purpose: it is a sentence, and setting it in the same uppercase
      tracked style as the descriptor above would bury it in that texture
      instead of letting it carry. */
  assurance: "No compromise in quality",
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
  /** Direct address, rendered as a mailto: link beside the phone.
      Two of the three are ROLE addresses (purchase@, admin@) rather than
      personal ones, which is the safer thing to publish: a role address
      survives the person leaving, can be redirected without anyone changing
      their own inbox, and does not put an individual's mail in front of
      scrapers the way a personal one does. Prefer that pattern for any seat
      added later. */
  email: string | null;
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
    email: "raina@himalayanfeeds.com",
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
    /* ⚠ Supplied as "purchase@himalayanfeed.com" — no trailing s. Corrected to
       himalayanfeeds.com, which is the domain every other address on this site
       uses (BRAND.email, SITE_URL, robots, sitemap). If himalayanfeed.com is
       genuinely a second domain the company owns, change it back; as typed it
       would have bounced. */
    email: "purchase@himalayanfeeds.com",
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
    /* ⚠ Same address as lib/admin/auth.ts DEMO_EMAIL, so the admin portal's
       demo username is now printed on a public marketing page. The password
       beside it is already compiled into the client bundle and that file says
       so itself, so this leaks nothing that was secret — but it removes the
       last scrap of obscurity, and is one more reason the demo auth needs
       replacing before launch. */
    email: "admin@himalayanfeeds.com",
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
   Facebook and Instagram are the client's real accounts, supplied directly.
   The Facebook page has no vanity URL yet, so it is linked by numeric profile
   id and `handle` carries the page name instead of an @ — the footer shows
   `handle` as the link title, and "@himalayanfeeds" there would be a handle
   that does not resolve.

   ⚠ X, LinkedIn and YouTube are still PLACEHOLDER URLs — no account has been
   verified at any of the three, so each is a live link to somebody else's
   page or a 404. Supply the real ones or delete the entries before launch. */
export const SOCIALS = [
  { label: "Facebook", handle: "Himalayan Feeds", href: "https://www.facebook.com/profile.php?id=61572044818368" },
  { label: "Instagram", handle: "@himalayan_feeds", href: "https://www.instagram.com/himalayan_feeds/" },
  { label: "X", handle: "@himalayanfeeds", href: "https://x.com/himalayanfeeds" },
  { label: "LinkedIn", handle: "himalayan-feeds", href: "https://linkedin.com/company/himalayan-feeds" },
  { label: "YouTube", handle: "@himalayanfeeds", href: "https://youtube.com/@himalayanfeeds" },
];

/* ---------------- Product catalogue ----------------
   Single source of truth. The /products routes, the header dropdown, the
   homepage grid and the footer are all generated from this array.

   ORDER IS MEANINGFUL. Products run in the animal's own sequence — youngest
   stage first, then through to adult, then whole-herd formats and add-ons.
   Keep the sequence intact: it is the source of truth for ALL_PRODUCTS, the
   counts and the admin store.

   ⚠ On a GROUPED range that is no longer the order the page shows. Bands come
   from `groups` and render in ITS order, and groupedProducts numbers straight
   through the bands as laid out — so on cattle, where Milking Feed has been
   promoted to lead, the rail follows the band order rather than this array.
   An ungrouped range still renders exactly in array order. Change display
   order in `groups`; change meaning here.

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
  /** One short line under the summary — a line and a half at most on the
      catalogue row. Long enough to say what the product is and who it is for,
      short enough that a farmer scanning the range reads all of them. */
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
      /* ⚠ THIS ARRAY IS ORDERED COMMERCIALLY, NOT BIOLOGICALLY. Milking Feed
         leads at the client's instruction: it is the volume line and what most
         visitors arrive looking for, so it should not sit third behind two
         bands about animals that are not yet earning. Young Stock takes the
         place it vacated.

         That is a deliberate departure from the life-stage sequence the flat
         `products` array still follows — see the note above CATEGORIES. Bands
         render in THIS order and groupedProducts numbers straight through
         them, so the rail counts 01, 02, 03… down the page as displayed. */
      {
        slug: "milking",
        name: "Milking Feed",
        note: "Feed for Performance. Three grades on one ladder — step up as you ask more of the animal.",
      },
      {
        slug: "transition",
        name: "Transition",
        note: "The few weeks either side of calving, where a lactation is won or lost.",
      },
      {
        slug: "young-stock",
        name: "Young Stock",
        note: "The animals earning nothing today. What they are fed now decides what they milk later.",
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
    /* Carries two of the SEARCH_TERMS phrases in plain sentences rather than
       as a keyword list — this string is the range's visible sub-line AND its
       meta description, so it has to read as English to a farmer and still
       answer the query. Descriptive throughout: who the feed is for, not what
       it will yield. */
    blurb:
      "Cattle feed for high milk production, for HF, Jersey and crossbred cows and for buffalo — plus a sheep and goat mash. Feed for every stage of the dairy animal.",
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
          "Easy to digest and palatable, so calves start eating early and hold intake steady right through weaning.",
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
          "Feeds steady frame and bone development through the growing months, so she reaches heifer stage the right size for her age.",
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
          "Holds condition and supports frame and fertility, so she gets in calf on time and calves down fit rather than fat.",
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
          "Keeps intake up through the weeks either side of calving, so she walks into milk in condition rather than on her own reserves.",
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
          "The everyday milking ration, fed at 400 g per litre for a cow and 500 g for a buffalo — the base the rest of the range is measured from.",
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
          "The Gold grade at the same rate as 8000 — 400 g per litre for a cow, 500 g for a buffalo. What differs is the formulation, not the feeding.",
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
          "The step up for cows and buffalo producing beyond what the base grade is built to carry.",
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
          "The densest ration in the range, for high-yielding animals that cannot eat enough volume to cover their own output.",
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
          "The same nutrition in two forms: pellets stop sorting at the manger, mash blends into a home ration. A handling choice, not a nutritional one.",
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
          "Fills the mineral gap a home-mixed ration usually leaves, fed alongside whatever you already feed rather than replacing any of it.",
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
          "An energy-rich mash for sheep and goats in steady production, fed alongside grazing and whatever fodder the season provides.",
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
          "The middle grade, for ewes and does producing past what grazing and the base mash together will cover.",
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
          "The densest mash in the range, for high-yielding ewes and does whose demand outruns their appetite.",
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
          "The first feed for broiler and layer chicks alike — fine-textured and palatable, so they are eating within hours of placement.",
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
          "Lays down frame, feather and immunity together, keeping the flock even so it reaches the grower phase as one batch.",
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
          "Carries broilers to weight evenly and holds meat quality through to lifting, in the phase where feed conversion pays hardest.",
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
          "For the run-up to lay and the opening weeks of production, when body development and early egg output are asked for at once.",
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
          "For the later laying phase — keeps rate, egg weight and shell strength holding together instead of trading one off against another.",
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
          "Support for placement, transfer, heat and the tail end of a long lay. Used alongside the main feed, never in place of it.",
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

/* ---------------- Search terms ----------------
   The phrases farmers and dealers actually type, surfaced as real navigation
   on the homepage rather than buried in a meta tag. Each one lands on the part
   of the catalogue it describes.

   ⚠ READ THIS BEFORE REWORDING ANY OF THEM. They describe WHO THE FEED IS FOR,
   never what it will produce. "Cattle Feed for 10 Litre Milk Cow" names the
   animal being fed — a cow already milking ten litres, who eats about 4 kg a
   day at the rate the bag itself prints, 400 g per litre. It is NOT a claim
   that the feed delivers ten litres, and it must not drift into one. No
   guaranteed yield, no "increases milk by", no "up to" figures: the site makes
   no promise about output anywhere, and these are the lines most likely to
   erode that by accident.

   ⚠ "Best Cattle Feed in India" is a superlative, and nothing on this site
   substantiates it — no test, no award, no comparison. It is the client's own
   wording, published at their instruction. ASCI's code treats unsupported
   superlatives as misleading, so it is worth having something behind it, or
   softening it, before the site is promoted. */
export const SEARCH_TERMS = [
  {
    term: "Best Cattle Feed in India",
    note: "Balanced cattle feed, batch-tested and antibiotic-free.",
    href: "/products/cattle-feed",
  },
  {
    term: "Best Cattle Feed for HF Cow",
    note: "For HF, Jersey and crossbred cows — and dosed for buffalo too.",
    href: "/products/cattle-feed",
  },
  {
    term: "Cattle Feed for High Milk Production",
    note: "The milking grades, from 8000 through to 10000.",
    href: "/products/cattle-feed#milking",
  },
  {
    term: "Cattle Feed for 10 Litre Milk Cow",
    note: "About 4 kg a day at the bag's printed 400 g per litre.",
    href: "/products/cattle-feed#milking",
  },
  {
    term: "Cattle Feed for 15 Litre Milk Cow",
    note: "About 6 kg a day at the same printed rate.",
    href: "/products/cattle-feed#milking",
  },
];

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
