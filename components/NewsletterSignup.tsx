"use client";

import { useState } from "react";
import { BRAND } from "@/lib/site";

/* ---------------- Footer signup ----------------
   There is no mailing-list backend on this site, so the address is handed to
   WhatsApp as a prefilled message — the same pattern the contact and
   dealership forms use. Swap `submit` for a POST to a real list provider
   (Mailchimp, Brevo, a route handler) when one exists. */
export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const valid = /^\S+@\S+\.\S+$/.test(email.trim());

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    const text = encodeURIComponent(
      `Please add me to Himalayan Feeds updates. Email: ${email.trim()}`
    );
    window.open(`https://wa.me/${BRAND.whatsapp}?text=${text}`, "_blank");
    setSent(true);
  };

  return (
    <div>
      <h4 className="font-display font-700 text-cream text-sm uppercase tracking-widest">
        Stay in the loop
      </h4>
      <p className="mt-3 text-sm text-cream/60 leading-relaxed">
        Feed tips, new product news and dealer offers — straight to your inbox.
      </p>

      {sent ? (
        <p className="mt-4 text-sm font-semibold text-leaf">
          Thanks — we&apos;ll be in touch.
        </p>
      ) : (
        <form onSubmit={submit} className="mt-4 flex flex-col gap-2.5 sm:flex-row">
          <label htmlFor="footer-email" className="sr-only">
            Your email address
          </label>
          <input
            id="footer-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-cream placeholder:text-cream/40 outline-none transition-colors focus:border-orange"
          />
          <button
            type="submit"
            disabled={!valid}
            className="shrink-0 rounded-full gradient-orange px-5 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-40"
          >
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
}
