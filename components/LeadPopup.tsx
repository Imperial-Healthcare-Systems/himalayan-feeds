"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { BRAND, CATEGORIES } from "@/lib/site";
import {
  enquiryHref,
  submitEnquiry,
  DEALERSHIP_TYPE,
  type EnquiryRow,
} from "@/lib/enquiry";

/* ---------------- Timed lead capture ----------------
   A four-step enquiry that opens itself ten seconds in. Two paths — become a
   dealer, or ask for a quote — because those are the only two things the site
   actually wants a stranger to do, and asking which one first means the rest
   of the questions can be the right ones.

   Interrupting someone is a cost, so the rules about when NOT to appear matter
   more than the panel itself:

     - Never on /contact or /dealership. Covering a lead form with a lead form
       is the one place this is pure obstruction — they are already doing the
       thing it is asking for.
     - Never twice. A submit silences it permanently; a dismissal silences it
       for DISMISS_DAYS. Both live in localStorage, so a visitor who said no
       is not asked again on the next page or the next visit.
     - Never before the ten seconds are up on the page they landed on, and the
       timer restarts on navigation rather than firing mid-click.

   It is a modal, so it owes the usual debts: labelled by its heading, focus
   moved in and restored on close, Escape and backdrop both dismiss, tab held
   inside while open, and the page behind it held still. */

const OPEN_AFTER_MS = 10_000;
const DISMISS_DAYS = 7;
const STORAGE_KEY = "hf_lead_popup_v1";

/** Where a lead form already exists, so the panel would be in the way. */
const SUPPRESSED = ["/contact", "/dealership"];

const PATHS = [
  {
    key: "dealership",
    title: "Become a dealer",
    body: "Stock the range in your territory — margins, supply and marketing support.",
    icon: (
      <path
        d="M3.5 9L5 4.5h14L20.5 9M3.5 9h17M4.5 9v9.5a1 1 0 001 1h13a1 1 0 001-1V9M9.5 19.5v-5.5h5v5.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    key: "quote",
    title: "Request a quote",
    body: "Pricing and pack sizes for the feed you need, for a farm or a shop.",
    icon: (
      <path
        d="M12 3v18M8.5 7.5h6.2a2.8 2.8 0 010 5.6H9.3a2.8 2.8 0 000 5.6h6.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
] as const;

type PathKey = (typeof PATHS)[number]["key"];

const QUANTITIES = [
  "Under 10 bags a month",
  "10 – 50 bags a month",
  "50 – 200 bags a month",
  "Over 200 bags a month",
  "Not sure yet",
];

const BUYER_TYPES = [
  "Dairy or poultry farm",
  "Feed / agri retail shop",
  "Distributor",
  "Veterinary or poultry supplies",
  "Something else",
];

const TOTAL_STEPS = 4;

/* ---------------- Dismissal memory ---------------- */
function readSilencedUntil(): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return 0;
    const v = JSON.parse(raw) as { until?: number };
    return typeof v.until === "number" ? v.until : 0;
  } catch {
    /* Private mode, a full quota, or someone else's key in the slot. Treating
       an unreadable record as "never asked" is the safe way round: the panel
       may show once more than it should, rather than a broken record silencing
       it forever. */
    return 0;
  }
}

function silence(days: number | "forever") {
  try {
    const until =
      days === "forever"
        ? Number.MAX_SAFE_INTEGER
        : Date.now() + days * 24 * 60 * 60 * 1000;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ until }));
  } catch {
    /* Nothing to do — worst case it asks again next visit. */
  }
}

export default function LeadPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [path, setPath] = useState<PathKey | null>(null);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const [f, setF] = useState({
    range: CATEGORIES[0].name,
    quantity: QUANTITIES[1],
    buyer: BUYER_TYPES[0],
    city: "",
    name: "",
    phone: "",
    email: "",
  });

  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);

  const set =
    (k: keyof typeof f) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setF((prev) => ({ ...prev, [k]: e.target.value }));

  /* ---- open on a timer ---- */
  useEffect(() => {
    if (SUPPRESSED.includes(pathname)) return;
    if (Date.now() < readSilencedUntil()) return;

    const t = window.setTimeout(() => setOpen(true), OPEN_AFTER_MS);
    return () => window.clearTimeout(t);
  }, [pathname]);

  const close = useCallback(
    (permanent = false) => {
      setOpen(false);
      silence(permanent ? "forever" : DISMISS_DAYS);
      restoreFocus.current?.focus();
    },
    [],
  );

  /* ---- modal behaviour: scroll lock, focus, Escape, tab containment ---- */
  useEffect(() => {
    if (!open) return;

    restoreFocus.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    /* The panel itself takes focus rather than the first control: the first
       control is a path button, and focusing it reads as though a choice has
       already been half-made. */
    panelRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  if (!open) return null;

  const kind = path === "dealership" ? "dealership" : "quote";
  const subject = path === "dealership" ? DEALERSHIP_TYPE : "Pricing / request a quote";

  const rows = (): EnquiryRow[] => [
    ["Name", f.name],
    ["Phone", f.phone],
    ["Email", f.email],
    ["City / District", f.city],
    ["Looking for", path === "dealership" ? "A dealership" : "A quote"],
    ["Range", f.range],
    ["Volume", f.quantity],
    ["Business", f.buyer],
  ];

  const submit = async () => {
    if (sending) return;
    setSending(true);
    const r = rows();
    const mailed = await submitEnquiry(kind, subject, r);
    if (!mailed) window.open(enquiryHref(kind, subject, r), "_blank");
    setSending(false);
    setDone(true);
    silence("forever");
  };

  const canContinue =
    step === 1
      ? path !== null
      : step === 2
        ? true
        : step === 3
          ? f.city.trim().length > 0
          : f.name.trim().length > 0 && f.phone.trim().length > 0;

  const pct = Math.round((step / TOTAL_STEPS) * 100);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-popup-heading"
    >
      {/* Backdrop. A click here is a dismissal like any other. */}
      <button
        type="button"
        aria-label="Close"
        onClick={() => close()}
        className="absolute inset-0 h-full w-full cursor-default bg-ink/55 backdrop-blur-[2px] motion-safe:animate-fade"
      />

      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative grid w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-lift outline-none motion-safe:animate-rise md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]"
      >
        {/* ---- Brand panel. Hidden on phones, where it would push the
               questions below the fold and cost the whole point of the
               panel. ---- */}
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-leaf-dark via-leaf-dark to-ink p-8 md:block">
          <span
            aria-hidden
            className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-2xl motion-safe:animate-bloom"
          />
          <svg
            viewBox="0 0 1440 220"
            preserveAspectRatio="none"
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-32 w-full text-white/[0.08]"
          >
            <path
              fill="currentColor"
              d="M0 220V150l150-78 110 56 160-100 140 88 150-70 160 92 150-72 150 76 270-52v130z"
            />
          </svg>

          <div className="relative flex h-full flex-col">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-white/60">
              {BRAND.full}
            </p>
            <p className="mt-5 font-display font-800 text-[26px] leading-[1.15] text-white">
              Feed that farmers
              <br />
              come back for.
            </p>
            <p className="mt-4 max-w-[24ch] text-[13.5px] leading-relaxed text-white/70">
              Tell us what you need and the right person will come back to you —
              usually within one working day.
            </p>

            <ul className="mt-auto space-y-2.5 pt-8">
              {[
                `${CATEGORIES.reduce((n, c) => n + c.products.length, 0)} products across the range`,
                "Dealer margins and marketing support",
                "FSSAI-registered manufacturing",
              ].map((line) => (
                <li key={line} className="flex items-start gap-2.5 text-[12.5px] text-white/75">
                  <svg viewBox="0 0 24 24" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/50" fill="none">
                    <path
                      d="M5 12.5l4.5 4.5L19 7.5"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---- Questions ---- */}
        <div className="flex max-h-[85vh] flex-col overflow-y-auto p-6 sm:p-8">
          {done ? (
            <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-full gradient-leaf text-white">
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
                  <path
                    d="M5 12.5l4.5 4.5L19 7.5"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h2 id="lead-popup-heading" className="mt-5 font-display font-700 text-xl text-ink">
                Thanks{f.name.trim() ? `, ${f.name.trim().split(" ")[0]}` : ""}.
              </h2>
              <p className="mx-auto mt-2 max-w-sm text-[14.5px] leading-relaxed text-ink-soft">
                Your enquiry is with our team. Someone will be in touch — usually
                within one working day.
              </p>
              <button
                onClick={() => close(true)}
                className="mt-7 rounded-full gradient-orange px-7 py-3 text-sm font-semibold text-white shadow-soft transition-all hover:shadow-lift"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              {/* Progress */}
              <div className="flex items-center justify-between gap-4">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft/60">
                  Step {step} of {TOTAL_STEPS}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-leaf-dark">
                  {pct}% complete
                </span>
              </div>
              <div
                className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-cream-deep"
                role="progressbar"
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Enquiry progress"
              >
                <span
                  className="block h-full rounded-full gradient-leaf transition-[width] duration-500 ease-out motion-reduce:transition-none"
                  style={{ width: `${pct}%` }}
                />
              </div>

              {/* ---- Step 1 — which path ---- */}
              {step === 1 && (
                <div className="mt-6">
                  <h2 id="lead-popup-heading" className="font-display font-700 text-xl leading-snug text-ink">
                    What are you looking for?
                  </h2>
                  <p className="mt-1.5 text-[13.5px] text-ink-soft">
                    Pick one and we will ask the right questions.
                  </p>
                  <div className="mt-5 space-y-3">
                    {PATHS.map((p) => (
                      <button
                        key={p.key}
                        onClick={() => {
                          setPath(p.key);
                          setStep(2);
                        }}
                        className={`flex w-full items-start gap-3.5 rounded-2xl border p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft ${
                          path === p.key
                            ? "border-leaf bg-leaf-light/60"
                            : "border-cream-deep bg-white hover:border-leaf/40"
                        }`}
                      >
                        <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-leaf-light text-leaf-dark">
                          <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none">
                            {p.icon}
                          </svg>
                        </span>
                        <span className="min-w-0">
                          <span className="block font-display font-700 text-[15px] text-ink">
                            {p.title}
                          </span>
                          <span className="mt-0.5 block text-[13px] leading-snug text-ink-soft">
                            {p.body}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ---- Step 2 — range and volume ---- */}
              {step === 2 && (
                <div className="mt-6">
                  <h2 id="lead-popup-heading" className="font-display font-700 text-xl leading-snug text-ink">
                    Which feed, and how much?
                  </h2>
                  <p className="mt-1.5 text-[13.5px] text-ink-soft">
                    A rough idea is enough — it decides who calls you back.
                  </p>
                  <div className="mt-5 space-y-4">
                    <PopSelect label="Range" value={f.range} onChange={set("range")}>
                      {CATEGORIES.map((c) => (
                        <option key={c.slug}>
                          {c.name}
                          {c.status === "coming-soon" ? " (coming soon)" : ""}
                        </option>
                      ))}
                    </PopSelect>
                    <PopSelect label="Volume" value={f.quantity} onChange={set("quantity")}>
                      {QUANTITIES.map((q) => (
                        <option key={q}>{q}</option>
                      ))}
                    </PopSelect>
                  </div>
                </div>
              )}

              {/* ---- Step 3 — who they are ---- */}
              {step === 3 && (
                <div className="mt-6">
                  <h2 id="lead-popup-heading" className="font-display font-700 text-xl leading-snug text-ink">
                    Tell us about your business
                  </h2>
                  <p className="mt-1.5 text-[13.5px] text-ink-soft">
                    So the answer fits how you actually buy.
                  </p>
                  <div className="mt-5 space-y-4">
                    <PopSelect label="Business type" value={f.buyer} onChange={set("buyer")}>
                      {BUYER_TYPES.map((b) => (
                        <option key={b}>{b}</option>
                      ))}
                    </PopSelect>
                    <PopField
                      label="City / District"
                      required
                      value={f.city}
                      onChange={set("city")}
                      placeholder="e.g. Budgam, J&K"
                      autoComplete="address-level2"
                    />
                  </div>
                </div>
              )}

              {/* ---- Step 4 — contact ---- */}
              {step === 4 && (
                <div className="mt-6">
                  <h2 id="lead-popup-heading" className="font-display font-700 text-xl leading-snug text-ink">
                    Who should we contact?
                  </h2>
                  <p className="mt-1.5 text-[13.5px] text-ink-soft">
                    Phone is how we usually reply — it is quicker for both of us.
                  </p>
                  <div className="mt-5 space-y-4">
                    <PopField label="Full name" required value={f.name} onChange={set("name")} placeholder="e.g. Ramesh Das" autoComplete="name" />
                    <PopField label="Phone number" required value={f.phone} onChange={set("phone")} placeholder="10-digit mobile" type="tel" autoComplete="tel" />
                    <PopField label="Email" value={f.email} onChange={set("email")} placeholder="you@example.com" type="email" autoComplete="email" />
                  </div>
                </div>
              )}

              {/* ---- Navigation ---- */}
              <div className="mt-7 flex items-center justify-between gap-4 pt-1">
                {step > 1 ? (
                  <button
                    onClick={() => setStep((s) => s - 1)}
                    className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-soft transition-colors hover:text-ink"
                  >
                    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none">
                      <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Back
                  </button>
                ) : (
                  <span />
                )}

                {step > 1 && (
                  <button
                    onClick={step === TOTAL_STEPS ? submit : () => setStep((s) => s + 1)}
                    disabled={!canContinue || sending}
                    className="rounded-full gradient-leaf px-7 py-3 text-sm font-semibold text-white shadow-soft transition-all hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {step === TOTAL_STEPS ? (sending ? "Sending…" : "Submit") : "Continue"}
                  </button>
                )}
              </div>
            </>
          )}

          <p className="mt-6 flex items-center justify-center gap-2 border-t border-cream-deep pt-4 text-[11.5px] text-ink-soft/70">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
              <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" strokeLinejoin="round" />
            </svg>
            Your details go to our team only. No spam.
          </p>
        </div>

        {/* Close. Last in the DOM but positioned top-right, so the tab order
            reaches the questions before the way out of them. */}
        <button
          onClick={() => close()}
          aria-label="Close enquiry"
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-ink/10 bg-white/90 text-ink-soft shadow-soft transition-colors hover:border-ink/25 hover:text-ink"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ---------------- Local field primitives ----------------
   Not the shared ones from FormFields: those are sized for a full-page form
   card, and at this width their label spacing and 16px inputs push step four
   into a scroll on a phone. Same shapes, tightened. */
function PopField({
  label,
  required,
  ...rest
}: { label: string; required?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-semibold text-ink">
        {label}
        {required && <span className="text-terracotta"> *</span>}
      </span>
      <input
        {...rest}
        className="w-full rounded-xl border border-cream-deep bg-cream/40 px-3.5 py-2.5 text-[14px] text-ink outline-none transition-colors placeholder:text-ink-soft/45 focus:border-leaf focus:bg-white"
      />
    </label>
  );
}

function PopSelect({
  label,
  children,
  ...rest
}: { label: string } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-semibold text-ink">{label}</span>
      <select
        {...rest}
        className="w-full rounded-xl border border-cream-deep bg-cream/40 px-3.5 py-2.5 text-[14px] text-ink outline-none transition-colors focus:border-leaf focus:bg-white"
      >
        {children}
      </select>
    </label>
  );
}
