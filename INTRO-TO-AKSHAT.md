# Intro to Akshat — Himalayan Feeds, A to Z

A complete tour of this project: what it is, what it's built with, where every
file lives, how the pieces fit together, and how to change things safely.

Read top to bottom once. After that, use it as a lookup table.

---

## 1. What this project is

A **marketing and lead-generation website** for Himalayan Feeds Private Limited,
a Kashmir-based animal feed manufacturer selling poultry, fish, shrimp and
cattle feed.

The site has one job: **get farmers to call, and get shopkeepers to apply for a
dealership.** Everything on it points at a phone number, a WhatsApp chat, or the
dealership form.

It is a **brochure site**. It does not sell online, has no accounts, no cart, no
admin panel, and stores nothing. Understanding that shapes every decision below.

---

## 2. Quick start

Open a terminal in the project root (the folder containing `package.json`):

```bash
npm install     # once, first time only
npm run dev     # then open http://localhost:3000
```

| Command | What it does | When |
|---|---|---|
| `npm run dev` | Dev server with hot reload | Daily work |
| `npm run build` | Production build — type-checks and prerenders every page | Before deploying |
| `npm start` | Serves the production build | Only after `build` |
| `npm run lint` | ESLint over the codebase | Anytime |

Requires **Node 20.9+**. Check with `node -v`.

> **Note:** this folder is **not a git repository**. There is no version history
> and no undo beyond your editor. Running `git init` early is strongly advised.

---

## 3. Tech stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 16.3.0**, App Router | Not the Pages Router. See §5. |
| UI | **React 19.2.8** | Server Components by default. |
| Language | **TypeScript 5**, `strict: true` | Path alias `@/*` → repo root. |
| Styling | **Tailwind CSS v4** | CSS-first config. **No `tailwind.config.js` exists** — the theme lives in `@theme` inside [app/globals.css](app/globals.css). |
| Animation | **framer-motion ^13** | Used only by [Reveal.tsx](components/Reveal.tsx). |
| Linting | ESLint 9 + `eslint-config-next` | Flat config in [eslint.config.mjs](eslint.config.mjs). |
| Build config | [next.config.ts](next.config.ts) | **Empty.** No custom config at all. |

**Four runtime dependencies. That's the whole list.** No UI kit, no icon
library, no form library, no state manager, no CMS, no database client. Every
icon on the site is a hand-written inline `<svg>`. Keep it that way unless
there's a real reason not to — this is a five-page brochure site.

---

## 4. Directory map — where everything is

```
himalayanfeeds--main/
│
├── app/                      ← ROUTES. Folder name = URL path.
│   ├── layout.tsx            root <html>/<body>, site metadata, font <link>s
│   ├── page.tsx              /            (homepage)
│   ├── globals.css           ★ the entire design system
│   ├── favicon.ico           still the default Next.js icon
│   ├── about/page.tsx        /about
│   ├── products/page.tsx     /products
│   ├── dealership/page.tsx   /dealership
│   └── contact/page.tsx      /contact
│
├── components/               ← All UI. Flat folder, no nesting.
│   ├── AnnouncementBar.tsx   orange scrolling marquee at the very top
│   ├── Header.tsx            sticky nav  [client]
│   ├── Logo.tsx              brand emblem, links home
│   ├── Hero.tsx              homepage hero section
│   ├── HeroVideo.tsx         hero background video/poster  [client]
│   ├── ProductGrid.tsx       the four feed category cards
│   ├── Sections.tsx          ★ FOUR components in one file (see §7)
│   ├── CountUp.tsx           animated 0→N number  [client]
│   ├── Reveal.tsx            scroll-into-view fade+rise wrapper  [client]
│   ├── PageShell.tsx         shared chrome for inner pages + PageHeader
│   ├── ContactBlock.tsx      contact cards + quick message form  [client]
│   ├── DealershipForm.tsx    dealer enquiry form  [client]
│   ├── NewsletterSignup.tsx  footer email capture  [client]
│   └── Footer.tsx            footer + WhatsAppFloat
│
├── lib/
│   └── site.ts               ★ ALL CONTENT AND CONTACT DETAILS
│
├── public/                   ← served at the URL root ("/")
│   ├── images/
│   │   ├── hf-logo-color.svg     header logo
│   │   ├── hf-logo-white.svg     footer logo
│   │   ├── hf-logo-black.svg     unused alternate
│   │   ├── poultry/fish/shrimp/cattle.png   product photos (⚠ see §11)
│   │   └── himalayan-hero-poster.webp       video fallback frame
│   └── videos/himalayan-hero.mp4
│
├── brand/                    ← ORIGINAL logo files. NOT served publicly.
├── package.json              dependencies + scripts
├── tsconfig.json             TypeScript config, `@/*` alias
├── AGENTS.md / CLAUDE.md     instructions for AI coding tools
└── INTRO-TO-AKSHAT.md        this file
```

**The three files that matter most:** [lib/site.ts](lib/site.ts) (all content),
[app/globals.css](app/globals.css) (all design tokens), and
[components/Sections.tsx](components/Sections.tsx) (four homepage sections).

---

## 5. Routing — how URLs work

This is the **App Router**. There is no `pages/` folder and no router config.
**A folder inside `app/` containing a `page.tsx` becomes a URL.**

| Folder | URL |
|---|---|
| `app/page.tsx` | `/` |
| `app/about/page.tsx` | `/about` |
| `app/products/page.tsx` | `/products` |
| `app/dealership/page.tsx` | `/dealership` |
| `app/contact/page.tsx` | `/contact` |

To add a page: create `app/careers/page.tsx` exporting a default React
component. It is live at `/careers`. No registration step.

[app/layout.tsx](app/layout.tsx) wraps **every** page — it owns `<html>`,
`<body>`, the site `<title>`/`description`, and the Google Fonts `<link>`s.

Each page also exports its own `metadata` object to set its browser-tab title,
e.g. [app/contact/page.tsx](app/contact/page.tsx).

Every page is **fully static** — prerendered to HTML at build time. There is no
server work at request time.

---

## 6. ★ The single most important concept: Server vs Client Components

In the App Router, **every component is a Server Component by default.** It runs
only at build time, ships **zero JavaScript** to the browser, and cannot use
`useState`, `useEffect`, `onClick`, or any browser API.

To opt a file into the browser, put `"use client"` as its **first line**.

**Exactly 7 of the 14 components are client components:**

| Client component | Why it needs the browser |
|---|---|
| [Header.tsx](components/Header.tsx) | scroll listener, mobile menu toggle |
| [Reveal.tsx](components/Reveal.tsx) | framer-motion scroll animation |
| [CountUp.tsx](components/CountUp.tsx) | IntersectionObserver + animation frames |
| [HeroVideo.tsx](components/HeroVideo.tsx) | checks `prefers-reduced-motion` |
| [ContactBlock.tsx](components/ContactBlock.tsx) | form state |
| [DealershipForm.tsx](components/DealershipForm.tsx) | form state |
| [NewsletterSignup.tsx](components/NewsletterSignup.tsx) | form state |

Everything else — `Footer`, `Sections`, `ProductGrid`, `Hero`, `Logo`,
`PageShell`, `AnnouncementBar` — is a Server Component and ships no JS.

### The rule that governs the architecture

> **A Server Component can render a Client Component. A Client Component cannot
> render a Server Component.**

`"use client"` is contagious downward: everything a client component imports
becomes client code too.

This is why the code is factored the way it is. [Sections.tsx](components/Sections.tsx)
is a big server file, but its stats need an animated counter — so instead of
marking the whole file `"use client"`, the animation was extracted into the tiny
[CountUp.tsx](components/CountUp.tsx). Same reason [NewsletterSignup.tsx](components/NewsletterSignup.tsx)
is separate from [Footer.tsx](components/Footer.tsx) — one small form input
would otherwise have pushed the entire footer into the browser bundle.

**When you add interactivity, extract the smallest possible client component
rather than marking a whole file.**

---

## 7. Component architecture

### Page composition

```
Homepage  (app/page.tsx)          Inner pages (about/products/dealership/contact)
─────────────────────────         ────────────────────────────────────────
  AnnouncementBar                   PageShell
  Header                            ├── AnnouncementBar
  main                              ├── Header
  ├── Hero → HeroVideo              ├── main → {page content}
  ├── TrustStrip → CountUp          ├── Footer
  ├── ProductGrid                   └── WhatsAppFloat
  ├── WhyUs
  ├── DealershipBand
  └── Testimonials
  Footer → NewsletterSignup
  WhatsAppFloat
```

⚠ **Note the duplication:** the homepage assembles its own chrome inline while
the other four use [PageShell.tsx](components/PageShell.tsx). Same result, two
code paths. If you change the header or footer arrangement, check both.

### Sections.tsx — four components in one file

This trips people up. There is no `TrustStrip.tsx`. [Sections.tsx](components/Sections.tsx)
exports four **named** components:

| Export | What it is | Used on |
|---|---|---|
| `TrustStrip` | The four credential cards (12+, 500+, 4, FSSAI) | home, about, dealership |
| `WhyUs` | Four feature cards on a tinted band | home, about |
| `DealershipBand` | Orange gradient "Become a dealer" CTA | home, products |
| `Testimonials` | Three farmer review cards | home |

Imported with braces because they're named exports:

```tsx
import { TrustStrip, WhyUs, DealershipBand, Testimonials } from "@/components/Sections";
import Hero from "@/components/Hero";   // no braces — default export
```

Two other files also export more than one thing:

- [Footer.tsx](components/Footer.tsx) → `Footer` (default) + `WhatsAppFloat` (named)
- [PageShell.tsx](components/PageShell.tsx) → `PageShell` (default) + `PageHeader` (named)

### Reusable building blocks

**[Reveal.tsx](components/Reveal.tsx)** — wraps anything to fade + rise it into
view on scroll. Used ~20 times across the site. `delay` staggers siblings:

```tsx
{items.map((item, i) => (
  <Reveal key={item.id} delay={i * 0.08}>…</Reveal>
))}
```

Fires once (`viewport={{ once: true }}`), so it never replays on scroll-back.

⚠ **Debugging gotcha:** `Reveal` starts at `opacity: 0`. If a section renders
blank in a screenshot tool or headless browser, that's usually this — the
scroll-trigger never fired, not a broken component.

**[CountUp.tsx](components/CountUp.tsx)** — animates `0 → to` when scrolled
into view, once. Built on `IntersectionObserver` + `requestAnimationFrame`
(no library). Disconnects the observer *before* animating, which is what makes
it fire only once. Honours `prefers-reduced-motion` by jumping to the final
value. Starts at `0` on both server and client so hydration matches.

**[Logo.tsx](components/Logo.tsx)** — takes `variant` (`"dark"` default, or
`"light"` for the dark footer) and a `className` for size. The emblem is
square, so **always keep height and width equal**:

```tsx
<Logo className="h-20 w-20" />                    // header
<Logo variant="light" className="h-30 w-30" />    // footer
```

It uses a plain `<img>`, not `next/image` — SVG needs no optimisation, and
routing SVG through Next's image optimiser requires `dangerouslyAllowSVG`.

**[HeroVideo.tsx](components/HeroVideo.tsx)** — the most carefully written file
here. It renders the poster image on the server and the first client render,
then upgrades to `<video>` only after hydration, and only if the user hasn't
asked for reduced motion. This ordering avoids a hydration mismatch. The
reasoning is in the file's comments — read them before editing it.

---

## 8. Data layer — [lib/site.ts](lib/site.ts)

**Every piece of business content lives here.** No phone number, email or
product name is hardcoded in any component.

| Export | Contains |
|---|---|
| `BRAND` | name, legal name, tagline, contact person, phone, `phoneHref`, whatsapp, email, address |
| `CATEGORIES` | the four feed products (slug, name, brand, protein, blurb, image) |
| `NAV` | header/footer navigation — Products children are **derived from `CATEGORIES`** |
| `SOCIALS` | five social profile links ⚠ **placeholder URLs** |
| `Category` | the TypeScript type for a product |

**Change the phone number in one place and it updates in 13 places** — header
call button, announcement marquee, dealership CTA, contact cards, footer, the
floating WhatsApp button, and every form's message hand-off.

Note the three phone formats — they are not interchangeable:

```ts
phone:     "90860-00555"        // what users read on screen
phoneHref: "tel:+919086000555"  // what the dial link uses
whatsapp:  "919086000555"       // what wa.me needs — country code, digits only
```

---

## 9. Design system — [app/globals.css](app/globals.css)

Tailwind v4 has **no JavaScript config file**. The theme is declared in CSS
inside an `@theme` block, and Tailwind generates utility classes from it.

Declaring `--color-leaf: #6FA33F;` automatically creates `bg-leaf`,
`text-leaf`, `border-leaf`, `fill-leaf`, and so on.

### Palette

| Token | Hex | Role |
|---|---|---|
| `cream` | `#FBF6EE` | page background |
| `cream-deep` | `#F3E9D9` | tinted bands, card borders |
| `ink` | `#2A2724` | body text, footer background |
| `ink-soft` | `#55504A` | secondary text |
| `orange` / `-dark` / `-light` | `#E8722A` | primary accent, CTAs, stat numbers |
| `leaf` / `-dark` / `-light` | `#6FA33F` | secondary accent, icon chips |
| `gold` | `#C79A3B` | premium hairlines, star ratings |
| `terracotta` / `-dark` | `#B14D17` | header call button |

### Typography

**Poppins** (`font-display`) for headings, **Inter** (`font-body`) for body.
Weight helpers `.font-700` / `.font-800` pair with `font-display`.

### Shadows

`shadow-soft` (resting cards) → `shadow-lift` (hover) → `shadow-bag` (heaviest).

### Also in globals.css

- A global `prefers-reduced-motion` block that neutralises animation site-wide
- `:focus-visible` outline for keyboard users
- `@keyframes marquee` (announcement bar) and `kenburns`
- `.gradient-orange`, `.gradient-leaf`, `.text-balance`

**Add new colours to `@theme`, not as arbitrary hex values in components.**

---

## 10. ★ There is no backend

No API routes. No database. No server actions. No environment variables. No
authentication. No external service calls. Nothing is stored anywhere.

**All three forms work the same way:** they collect input in React state,
URL-encode it into a message, and open a `wa.me` link.

| Form | File | Result |
|---|---|---|
| Dealership enquiry | [DealershipForm.tsx](components/DealershipForm.tsx) | prefilled WhatsApp chat |
| Quick message | [ContactBlock.tsx](components/ContactBlock.tsx) | prefilled WhatsApp chat |
| Newsletter signup | [NewsletterSignup.tsx](components/NewsletterSignup.tsx) | prefilled WhatsApp chat |

**The consequence, stated plainly:** if WhatsApp fails to open, is blocked by a
popup blocker, or the user abandons the chat, **the lead is gone**. Nothing is
logged. The dealership form even shows "Thanks!" when the tab *opens*, not when
the message is actually sent.

The newsletter is the sharpest version of this — it looks like a mailing-list
signup, but no list is being built.

Adding a real backend means one Next.js route handler
(`app/api/enquiry/route.ts`) writing to a Google Sheet, an email, or a database,
called alongside the WhatsApp hand-off. It's a small change and the highest-value
one available.

---

## 11. Assets

| Asset | Size | Status |
|---|---|---|
| `hf-logo-color.svg` | 304 KB | header |
| `hf-logo-white.svg` | 188 KB | footer |
| `hf-logo-black.svg` | 196 KB | unused alternate |
| `himalayan-hero.mp4` | 1.9 MB | hero background |
| `himalayan-hero-poster.webp` | 52 KB | video fallback |
| **`cattle.png`** | **8.0 MB** | ⚠ product card |
| **`fish.png`** | **7.5 MB** | ⚠ product card |
| **`poultry.png`** | **7.4 MB** | ⚠ product card |
| **`shrimp.png`** | **7.1 MB** | ⚠ product card |

⚠ **The four product PNGs total ~30 MB** to render as small `aspect-video`
cards. `next/image` optimises them on delivery, but they bloat the repo, slow
builds, and cost money on serverless image optimisation. Converting them to
WebP at ~1600px wide would put each under 200 KB. **This is the single biggest
technical debt in the project.**

The logos are genuine vector (auto-traced from the original artwork), with their
full-canvas backdrops removed so they sit transparently on any background. The
untouched originals are in [brand/](brand/) — **outside `public/`**, because
anything in `public/` is publicly downloadable.

`public/file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` are
leftover `create-next-app` boilerplate. Unused — safe to delete.

---

## 12. How to do common things

**Change a phone number or email** → [lib/site.ts](lib/site.ts), the `BRAND`
object. Remember all three phone formats (§8).

**Add a product** → add an entry to `CATEGORIES` in [lib/site.ts](lib/site.ts)
and drop an image in `public/images/`. The grid, the footer product list and the
header dropdown all update automatically — they're derived from that array.

**Change a colour** → the `@theme` block in [app/globals.css](app/globals.css).
It propagates to every utility class.

**Resize the logo** → pass a `className` to `<Logo />`. Tailwind spacing units
are 4px each, so `h-20` = 80px. Keep width and height equal.

**Add a page** → create `app/<name>/page.tsx`, wrap the content in `<PageShell>`,
export a `metadata` object, and add an entry to `NAV` in
[lib/site.ts](lib/site.ts).

**Add a scroll animation** → wrap the element in `<Reveal>`.

**Add something interactive** → build it as a small separate file with
`"use client"` at the top. Don't mark an existing server file.

---

## 13. Known issues — read before launch

Ordered roughly by importance.

1. **~30 MB of product PNGs** (§11). Convert to WebP.
2. **No lead capture.** Every enquiry depends on WhatsApp completing (§10).
3. **Social links are placeholders.** `facebook.com/himalayanfeeds` etc. in
   `SOCIALS` are unverified and may belong to someone else. Replace or delete.
4. **Privacy / Terms / Disclaimer 404.** The footer links to `/privacy`,
   `/terms` and `/disclaimer`; none of those routes exist.
5. **The EN/हि language toggle does nothing.** [Header.tsx](components/Header.tsx)
   holds a `lang` state that no other code reads. There is no i18n library, no
   locale routing, and no Hindi copy anywhere. It looks functional to visitors —
   a Hindi-speaking farmer taps it, sees English, and concludes the site is
   broken. Either remove it or build real i18n (which needs translated copy
   first — that's a copywriting job before it's a coding one).
6. **Unverified factual claims.** "12+ years", "500+ dealers", "FSSAI certified",
   and all three testimonials are template placeholders. Confirm before publishing.
7. **SEO gaps.** No `sitemap.ts`, no `robots.ts`, no OpenGraph/Twitter metadata,
   no `metadataBase`, no JSON-LD. Highest-ROI fix after the images.
8. **Not a git repository.** Run `git init`.
9. **Default favicon.** [app/favicon.ico](app/favicon.ico) is still the Next.js icon.
10. **Fonts via `<link>` instead of `next/font`.** Costs two external round-trips
    and produces the standing lint warning.
11. **The floating WhatsApp button overlaps the footer legal bar** at the bottom
    right.
12. **Mobile menu** doesn't show the Products sub-items, trap focus, or close on
    Escape.

### Current lint state

`npx tsc --noEmit` passes clean. `npx eslint .` reports **0 errors, 4 warnings**:

```
app/layout.tsx:19       no-page-custom-font        (the Google Fonts <link>)
components/Header.tsx:8   'STATES' unused          ← leftovers from removing
components/Header.tsx:15  'state' unused              the state-selector UI
components/Header.tsx:15  'setState' unused
```

The three Header warnings are dead code — safe to delete those lines.

---

## 14. A note on AGENTS.md

[AGENTS.md](AGENTS.md) is written and re-added automatically by `next dev`. It
tells AI coding tools that this Next.js version has breaking changes versus
their training data, and to consult `node_modules/next/dist/docs/` before
writing code. Deleting it from a diff just recreates it — commit it along with
your work to keep the tree clean.
