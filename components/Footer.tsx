import Link from "next/link";
import { NAV, CATEGORIES, BRAND, SOCIALS } from "@/lib/site";
import Logo from "./Logo";
import NewsletterSignup from "./NewsletterSignup";

/* ---------------- Social glyphs, keyed by SOCIALS[].label ----------------
   Instagram, X and YouTube are the official marks from Simple Icons (CC0),
   on the same 24x24 grid. Two are drawn by hand instead:
     - Facebook: Simple Icons ships the circled badge, which would read as a
       circle inside our circular buttons. This is the bare "f" lockup.
     - LinkedIn: not distributed by Simple Icons at all.
   The marks remain trademarks of their owners; they are used here only to
   link to the company's own profiles. */
const SOCIAL_ICONS: Record<string, string> = {
  Facebook:
    "M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.6V4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2V10H7.4v3h2.9v8h3.2z",
  Instagram:
    "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077",
  X: "M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z",
  LinkedIn:
    "M6.9 21H3.3V9h3.6v12zM5.1 7.4a2.1 2.1 0 110-4.2 2.1 2.1 0 010 4.2zM21 21h-3.6v-5.8c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21H9.6V9H13v1.6h.1c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5V21z",
  YouTube:
    "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
};

/* ---------------- Copyright glyph ----------------
   Drawn rather than using the "©" character so it stays identical across
   fonts and platforms, and scales with the surrounding text via `em` units. */
function CopyrightMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      role="img"
      aria-label="Copyright"
      className="h-[1.15em] w-[1.15em] shrink-0"
    >
      <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M15.1 9.5a4 4 0 100 5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ---------------- Site footer ---------------- */
export default function Footer() {
  return (
    /* INVARIANT: the last section of every page must end on plain `cream`.

       The wave below is an ink-filled path on a transparent canvas, and the
       footer is a sibling of <main> — so the area above the curve shows the
       *body* background, not the section above it. If a page ends on a tinted
       cream-deep, that tint meets plain cream at the footer boundary and reads
       as a hard horizontal band. Ending every page at `to-cream` makes the
       seam invisible. */
    <footer className="bg-cream text-cream/80">
      {/* Curved top edge */}
      <svg
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        aria-hidden
        className="block h-8 w-full fill-ink sm:h-12 lg:h-16"
      >
        <path d="M0 64V26c240-30 480-34 720-14s480 16 720-12v64z" />
      </svg>

      {/* -mt-px closes the sub-pixel gap that fractional SVG heights can leave
          between the wave and the panel at some zoom levels. */}
      <div className="-mt-px bg-ink">
        {/* Main grid — brand, link columns, contact, signup */}
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-12">
          {/* Registered office */}
          <div className="sm:col-span-2 lg:col-span-3">
            <Logo variant="light" className="h-30 w-30" />
            <p className="mt-4 font-display font-700 text-sm uppercase tracking-wider text-cream">
              {BRAND.legal}
            </p>
            <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-orange/80">
              {BRAND.positioning}
            </p>
            <p className="mt-3 text-sm italic leading-relaxed text-cream/70">
              &ldquo;{BRAND.tagline}&rdquo;
            </p>
            <address className="mt-3 text-sm not-italic leading-relaxed text-cream/60">
              {BRAND.address.line1}
              <br />
              {BRAND.address.line2}
              ,&nbsp;
              {BRAND.address.region}
            </address>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-700 text-sm uppercase tracking-widest text-cream">
              Explore
            </h4>
            <ul className="mt-4 space-y-0.5 text-sm">
              {NAV.map((n) => (
                <li key={n.label}>
                  <Link href={n.href} className="-mx-1 inline-block px-1 py-1.5 transition-colors hover:text-orange">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products — each range carries its sub-brand and product count, so
              the footer gives the same information scent as the header panel
              rather than three bare words. */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-700 text-sm uppercase tracking-widest text-cream">
              Products
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/products/${c.slug}`}
                    className="group -mx-1 block px-1 py-1 transition-colors hover:text-orange"
                  >
                    <span className="flex items-center gap-2">
                      <span className="font-medium">{c.name}</span>
                      {c.status === "coming-soon" ? (
                        <span className="rounded-full border border-white/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-cream/45">
                          Soon
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold tabular-nums text-cream/40">
                          {c.products.length}
                        </span>
                      )}
                    </span>
                    <span className="mt-0.5 block text-[11.5px] leading-snug text-cream/45">
                      {c.brand}
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/products"
                  className="-mx-1 inline-block px-1 py-1.5 text-[13px] font-semibold text-orange/90 transition-colors hover:text-orange"
                >
                  View all products
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact — 3 columns, not 2. At the lg breakpoint the 12-column
              grid plus gaps left this column ~98px wide, which is narrower
              than the email domain and forced it to break mid-word. */}
          <div className="lg:col-span-3">
            <h4 className="font-display font-700 text-sm uppercase tracking-widest text-cream">
              Get in touch
            </h4>
            <p className="mt-4 text-sm font-semibold text-cream">{BRAND.contactPerson}</p>

            <ul className="mt-3 space-y-2.5 text-sm">
              <li>
                <a
                  href={BRAND.phoneHref}
                  className="group flex items-center gap-2.5 transition-colors hover:text-orange"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-cream/70 transition-colors group-hover:border-orange/50 group-hover:text-orange">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
                      <path
                        d="M6.6 3.5h-2A1.6 1.6 0 003 5.3 16.4 16.4 0 0018.7 21a1.6 1.6 0 001.8-1.6v-2a1 1 0 00-.85-1l-2.9-.5a1 1 0 00-1 .43l-.7 1a12.6 12.6 0 01-5.3-5.3l1-.7a1 1 0 00.43-1l-.5-2.9a1 1 0 00-1-.85z"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {BRAND.phone}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${BRAND.whatsapp}`}
                  className="group flex items-center gap-2.5 transition-colors hover:text-orange"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-cream/70 transition-colors group-hover:border-orange/50 group-hover:text-orange">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                      <path d="M12 2a10 10 0 00-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1112 20zm4.5-6c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.7.9-.3.2-.5.1a6.5 6.5 0 01-1.9-1.2 7.2 7.2 0 01-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4a.5.5 0 000-.4c0-.1-.5-1.3-.7-1.8s-.4-.4-.5-.4h-.5a.9.9 0 00-.7.3 2.8 2.8 0 00-.9 2.1 4.9 4.9 0 001 2.6 11 11 0 004.3 3.8c1.5.6 1.8.5 2.2.5a2.5 2.5 0 001.6-1.2 2 2 0 00.2-1.2c-.1-.1-.3-.2-.5-.3z" />
                    </svg>
                  </span>
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="group flex items-start gap-2.5 transition-colors hover:text-orange"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-cream/70 transition-colors group-hover:border-orange/50 group-hover:text-orange">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
                      <rect
                        x="2.75"
                        y="5"
                        width="18.5"
                        height="14"
                        rx="2.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                      <path
                        d="M3.6 7.6l8.4 5.6 8.4-5.6"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {/* Wraps rather than being shrunk to fit. The previous 11px
                      was tuned to a measured column width, which broke the
                      moment the address or the grid changed — and left this
                      one line noticeably smaller than everything around it.
                      <wbr> after the @ puts the break at the only place an
                      email reads well split; break-words is the fallback if
                      the domain alone ever outgrows the column. */}
                  <span className="min-w-0 break-words">
                    {BRAND.email.split("@")[0]}@<wbr />
                    {BRAND.email.split("@").slice(1).join("@")}
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Signup + social — gives the column back to Contact above */}
          <div className="sm:col-span-2 lg:col-span-2">
            <NewsletterSignup />

            <ul className="mt-6 flex flex-wrap items-center gap-2.5">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${BRAND.full} on ${s.label}`}
                    title={s.handle}
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-cream/70 transition-all hover:-translate-y-0.5 hover:border-orange hover:text-orange"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                      <path d={SOCIAL_ICONS[s.label]} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal bar */}
        <div className="border-t border-white/10">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-3 px-4 py-6 text-xs text-cream/50 sm:grid-cols-3 sm:px-6">

            {/* Left: Copyright + Legal links */}
            <div className="flex flex-col gap-2 text-center sm:text-left">
              <p className="flex items-center justify-center gap-1.5 sm:justify-start">
                <CopyrightMark />
                <span>
                  {new Date().getFullYear()} {BRAND.legal}. All rights reserved.
                </span>
              </p>

              <div className="-mx-1.5 flex justify-center gap-2 sm:justify-start">
                <Link
                  href="/privacy"
                  className="inline-block px-1.5 py-1.5 transition-colors hover:text-orange"
                >
                  Privacy
                </Link>

                <Link
                  href="/terms"
                  className="inline-block px-1.5 py-1.5 transition-colors hover:text-orange"
                >
                  Terms
                </Link>

                <Link
                  href="/disclaimer"
                  className="inline-block px-1.5 py-1.5 transition-colors hover:text-orange"
                >
                  Disclaimer
                </Link>
              </div>
            </div>

            {/* Center */}
            <p className="text-center">
              Made for farmers, built to last.
            </p>

            {/* Right */}
            <p className="text-center sm:text-right">
              Built by{" "}
              <a
                href="https://www.imperialtechinnovations.com/"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-block py-1.5 text-cream/70 transition-colors hover:text-orange"
              >
                Imperial
              </a>
            </p>

          </div>
        </div>
      </div>
    </footer>
  );
}
