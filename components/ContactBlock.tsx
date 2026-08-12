"use client";

import { useState } from "react";
import Link from "next/link";
import { BRAND, CATEGORIES } from "@/lib/site";
import { enquiryHref, GENERAL_TYPES, DEALERSHIP_TYPE } from "@/lib/enquiry";
import { Field, Select, Textarea } from "./FormFields";

/* ---------------- General enquiry ----------------
   Card only — the page owns the surrounding layout.

   Mirrors the dealership form field for field, with one deliberate
   difference: here the enquiry type is a choice. Both send through the same
   builder in lib/enquiry.ts, so a general enquiry and a dealer lead arrive
   with different first lines and can be told apart in the WhatsApp list
   without opening either. */
export default function ContactBlock() {
  const [f, setF] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    subject: GENERAL_TYPES[0],
    interest: CATEGORIES[0].name,
    msg: "",
  });
  const [sent, setSent] = useState(false);

  const set =
    (k: keyof typeof f) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setF({ ...f, [k]: e.target.value });

  const send = () => {
    window.open(
      enquiryHref("general", f.subject, [
        ["Name", f.name],
        ["Phone", f.phone],
        ["Email", f.email],
        ["City / District", f.city],
        ["Range", f.interest],
        ["Message", f.msg],
      ]),
      "_blank"
    );
    setSent(true);
  };

  const valid = f.name.trim() && f.phone.trim() && f.msg.trim();
  const wantsDealership = f.subject === DEALERSHIP_TYPE;

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
            Message on its way, {f.name.split(" ")[0]}.
          </h3>
          <p className="mx-auto mt-2 max-w-sm text-[15px] leading-relaxed text-ink-soft">
            We usually reply within one working day.
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
          Send us a message
        </h3>
        <span className="text-[11.5px] text-ink-soft/60">Replies in a day</span>
      </div>
      <span className="mt-3 block h-px w-9 origin-left bg-orange animate-rule" />

      <div className="mt-6 space-y-4">
        <Select label="Enquiry type" required value={f.subject} onChange={set("subject")}>
          {GENERAL_TYPES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </Select>

        {/* The dealership form captures territory, business type and storage —
            none of which this one asks for. Nudge rather than silently take a
            worse-quality lead. */}
        {wantsDealership && (
          <div className="animate-settle rounded-xl border border-leaf/30 bg-leaf-light/50 px-4 py-3">
            <p className="text-[12.5px] leading-relaxed text-leaf-dark">
              The{" "}
              <Link href="/dealership" className="font-bold underline underline-offset-2">
                dealership form
              </Link>{" "}
              asks a few extra questions about your territory and business, so we
              can come back with a proper answer first time. You can still send
              this one if you prefer.
            </p>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" required value={f.name} onChange={set("name")} placeholder="e.g. Ramesh Das" autoComplete="name" />
          <Field label="Phone number" required value={f.phone} onChange={set("phone")} placeholder="10-digit mobile" type="tel" autoComplete="tel" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Email" value={f.email} onChange={set("email")} placeholder="you@example.com" type="email" autoComplete="email" />
          <Field label="City / District" value={f.city} onChange={set("city")} placeholder="e.g. Budgam, J&K" autoComplete="address-level2" />
        </div>

        <Select label="Which range?" value={f.interest} onChange={set("interest")}>
          {CATEGORIES.map((c) => (
            <option key={c.slug}>
              {c.name}
              {c.status === "coming-soon" ? " (coming soon)" : ""}
            </option>
          ))}
        </Select>

        <Textarea
          label="Your message"
          required
          value={f.msg}
          onChange={set("msg")}
          rows={5}
          placeholder="Herd or flock size, quantity needed, delivery location…"
        />

        <button
          onClick={send}
          disabled={!valid}
          className="w-full rounded-full gradient-orange py-3.5 font-semibold text-white shadow-soft transition-all hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-40"
        >
          Send enquiry
        </button>
        <p className="text-center text-[11.5px] text-ink-soft/70">
          Opens WhatsApp with your details filled in — no account or sign-up needed.
        </p>
      </div>
    </div>
  );
}
