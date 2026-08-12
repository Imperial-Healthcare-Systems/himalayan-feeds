"use client";

import { useState } from "react";
import Link from "next/link";
import { BRAND, CATEGORIES } from "@/lib/site";
import { enquiryHref, DEALERSHIP_TYPE } from "@/lib/enquiry";
import { Field, Select, Textarea, LockedField } from "./FormFields";

const BUSINESS_TYPES = [
  "Feed / agri retail shop",
  "Distributor",
  "Veterinary or poultry supplies",
  "Dairy or poultry farm",
  "Starting a new business",
];

/* ---------------- Dealership enquiry ----------------
   Card only — the page owns the surrounding layout.

   The enquiry type is fixed to "Dealership / distribution" and cannot be
   changed. That is the point: with no backend, the WhatsApp message is the
   only record, so this form must always be identifiable as a dealer lead.
   Anyone who lands here by mistake is pointed at the contact page rather than
   allowed to send a general question down the dealer pipeline. */
export default function DealershipForm() {
  const [f, setF] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    business: BUSINESS_TYPES[0],
    interest: CATEGORIES[0].name,
    note: "",
  });
  const [sent, setSent] = useState(false);

  const set =
    (k: keyof typeof f) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setF({ ...f, [k]: e.target.value });

  const submit = () => {
    window.open(
      enquiryHref("dealership", DEALERSHIP_TYPE, [
        ["Name", f.name],
        ["Phone", f.phone],
        ["Email", f.email],
        ["City / District", f.city],
        ["Business", f.business],
        ["Feed of interest", f.interest],
        ["Note", f.note],
      ]),
      "_blank"
    );
    setSent(true);
  };

  const valid = f.name.trim() && f.phone.trim() && f.city.trim();

  if (sent) {
    return (
      <div className="rounded-3xl border border-cream-deep bg-white p-7 shadow-soft sm:p-9">
        <div className="py-10 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full gradient-leaf text-white">
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
              <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="mt-5 font-display font-700 text-xl text-ink">
            Thanks, {f.name.split(" ")[0]}.
          </h3>
          <p className="mx-auto mt-2 max-w-sm text-[15px] leading-relaxed text-ink-soft">
            Your dealership enquiry is on its way. {BRAND.contactPerson} or a
            member of the team will be in touch — usually within one working day.
          </p>
          <a
            href={BRAND.phoneHref}
            className="mt-6 inline-flex items-center gap-2 rounded-lg border border-ink/12 px-5 py-2.5 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
          >
            Or call {BRAND.phone}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-cream-deep bg-white p-7 shadow-soft sm:p-9">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-display font-700 text-xl text-ink">
          Dealership enquiry
        </h3>
        <span className="text-[11.5px] text-ink-soft/60">Takes a minute</span>
      </div>
      <span className="mt-3 block h-px w-9 origin-left bg-orange animate-rule" />

      <div className="mt-6 space-y-4">
        <LockedField
          label="Enquiry type"
          value={DEALERSHIP_TYPE}
          note={
            <>
              Fixed so dealer enquiries stay separate from general ones. For
              anything else,{" "}
              <Link href="/contact" className="font-semibold text-terracotta-dark underline underline-offset-2">
                use the contact form
              </Link>
              .
            </>
          }
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" required value={f.name} onChange={set("name")} placeholder="e.g. Ramesh Das" autoComplete="name" />
          <Field label="Phone number" required value={f.phone} onChange={set("phone")} placeholder="10-digit mobile" type="tel" autoComplete="tel" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Email" value={f.email} onChange={set("email")} placeholder="you@example.com" type="email" autoComplete="email" />
          <Field label="City / District" required value={f.city} onChange={set("city")} placeholder="e.g. Budgam, J&K" autoComplete="address-level2" />
        </div>

        <Select label="Your business" value={f.business} onChange={set("business")}>
          {BUSINESS_TYPES.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </Select>

        {/* Options come straight from the shared catalogue */}
        <Select label="Feed of interest" value={f.interest} onChange={set("interest")}>
          {CATEGORIES.map((c) => (
            <option key={c.slug}>
              {c.name}
              {c.status === "coming-soon" ? " (coming soon)" : ""}
            </option>
          ))}
        </Select>

        <Textarea
          label="Anything else"
          optional
          value={f.note}
          onChange={set("note")}
          rows={3}
          placeholder="Territory you cover, storage available, current brands stocked…"
        />

        <button
          onClick={submit}
          disabled={!valid}
          className="w-full rounded-full gradient-orange py-3.5 font-semibold text-white shadow-soft transition-all hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-40"
        >
          Send dealership enquiry
        </button>
        <p className="text-center text-[11.5px] text-ink-soft/70">
          Opens WhatsApp with your details filled in — no account or sign-up needed.
        </p>
      </div>
    </div>
  );
}
