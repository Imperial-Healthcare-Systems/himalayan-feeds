"use client";

import { useState } from "react";
import { BRAND, CATEGORIES } from "@/lib/site";

/* ---------------- Dealership enquiry form ---------------- */
export default function DealershipForm() {
  const [f, setF] = useState({ name: "", phone: "", city: "", interest: CATEGORIES[0].name, note: "" });
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setF({ ...f, [k]: e.target.value });

  // No backend: the enquiry is handed off to WhatsApp as a prefilled chat.
  const submit = () => {
    const text = encodeURIComponent(
      `Dealership enquiry\nName: ${f.name}\nPhone: ${f.phone}\nCity: ${f.city}\nInterest: ${f.interest}\nNote: ${f.note}`
    );
    window.open(`https://wa.me/${BRAND.whatsapp}?text=${text}`, "_blank");
    setSent(true);
  };

  const valid = f.name.trim() && f.phone.trim() && f.city.trim();

  return (
    <section className="py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="rounded-3xl bg-white border border-cream-deep shadow-soft p-8 sm:p-10">
          {sent ? (
            /* Confirmation state */
            <div className="text-center py-8">
              <div className="mx-auto grid place-items-center h-14 w-14 rounded-full gradient-leaf text-white text-2xl">✓</div>
              <h3 className="mt-4 font-display font-700 text-xl text-ink">Thanks, {f.name.split(" ")[0]}!</h3>
              <p className="mt-2 text-ink-soft">Your enquiry is on its way. Our team will be in touch shortly.</p>
            </div>
          ) : (
            /* Enquiry fields */
            <div className="space-y-5">
              <Field label="Full name" value={f.name} onChange={set("name")} placeholder="e.g. Ramesh Das" />
              <Field label="Phone number" value={f.phone} onChange={set("phone")} placeholder="10-digit mobile" type="tel" />
              <Field label="City / District" value={f.city} onChange={set("city")} placeholder="e.g. Nadia, WB" />

              {/* Feed category — options come straight from the shared catalogue */}
              <div>
                <label className="block text-sm font-semibold text-ink mb-1.5">Feed of interest</label>
                <select
                  value={f.interest}
                  onChange={set("interest")}
                  className="w-full rounded-xl border border-cream-deep bg-cream/50 px-4 py-3 text-ink outline-none focus:border-orange transition-colors"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink mb-1.5">Message (optional)</label>
                <textarea
                  value={f.note}
                  onChange={set("note")}
                  rows={3}
                  placeholder="Tell us about your business"
                  className="w-full rounded-xl border border-cream-deep bg-cream/50 px-4 py-3 text-ink outline-none focus:border-orange transition-colors resize-none"
                />
              </div>

              {/* Submit — disabled until name, phone and city are filled */}
              <button
                onClick={submit}
                disabled={!valid}
                className="w-full gradient-orange text-white font-semibold py-3.5 rounded-full shadow-soft hover:shadow-lift transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Send enquiry
              </button>
              <p className="text-center text-xs text-ink-soft">
                Sends your details to us over WhatsApp — no account needed.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Labelled text input ---------------- */
function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-sm font-semibold text-ink mb-1.5">{label}</label>
      <input
        {...props}
        className="w-full rounded-xl border border-cream-deep bg-cream/50 px-4 py-3 text-ink outline-none focus:border-orange transition-colors"
      />
    </div>
  );
}
