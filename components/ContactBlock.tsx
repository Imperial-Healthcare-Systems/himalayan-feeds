"use client";

import { useState } from "react";
import { BRAND } from "@/lib/site";
import Reveal from "./Reveal";

/* ---------------- Contact channels + quick message ---------------- */
export default function ContactBlock() {
  const [f, setF] = useState({ name: "", msg: "" });

  // No backend: the message is handed off to WhatsApp as a prefilled chat.
  const send = () => {
    const text = encodeURIComponent(`Hi Himalayan, I'm ${f.name}. ${f.msg}`);
    window.open(`https://wa.me/${BRAND.whatsapp}?text=${text}`, "_blank");
  };

  const cards = [
    { title: "Call us", value: BRAND.phone, href: BRAND.phoneHref, cta: "Tap to call" },
    { title: "WhatsApp", value: "Chat with our team", href: `https://wa.me/${BRAND.whatsapp}`, cta: "Open chat" },
    { title: "Email", value: BRAND.email, href: `mailto:${BRAND.email}`, cta: "Send email" },
  ];

  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Channel cards — call, WhatsApp, email */}
        <div className="grid sm:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <a
                href={c.href}
                className="block h-full rounded-3xl bg-white border border-cream-deep p-7 shadow-soft hover:shadow-lift hover:-translate-y-1 transition-all"
              >
                <h3 className="font-display font-700 text-lg text-ink">{c.title}</h3>
                <p className="mt-2 text-ink-soft text-sm">{c.value}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-orange">{c.cta} →</span>
              </a>
            </Reveal>
          ))}
        </div>

        {/* Quick message form */}
        <Reveal delay={0.15}>
          <div className="mt-10 rounded-3xl bg-white border border-cream-deep shadow-soft p-8 max-w-2xl mx-auto">
            <h3 className="font-display font-700 text-xl text-ink">Send us a quick message</h3>
            <div className="mt-5 space-y-4">
              <input
                value={f.name}
                onChange={(e) => setF({ ...f, name: e.target.value })}
                placeholder="Your name"
                className="w-full rounded-xl border border-cream-deep bg-cream/50 px-4 py-3 outline-none focus:border-orange transition-colors"
              />
              <textarea
                value={f.msg}
                onChange={(e) => setF({ ...f, msg: e.target.value })}
                rows={4}
                placeholder="How can we help?"
                className="w-full rounded-xl border border-cream-deep bg-cream/50 px-4 py-3 outline-none focus:border-orange transition-colors resize-none"
              />
              <button
                onClick={send}
                disabled={!f.name.trim() || !f.msg.trim()}
                className="gradient-orange text-white font-semibold px-6 py-3 rounded-full shadow-soft hover:shadow-lift transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Send via WhatsApp
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
