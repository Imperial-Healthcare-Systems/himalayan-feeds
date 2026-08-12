import Link from "next/link";
import PageShell, { PageHeader } from "@/components/PageShell";
import ContactBlock from "@/components/ContactBlock";
import Reveal from "@/components/Reveal";
import { BRAND, SOCIALS } from "@/lib/site";

export const metadata = {
  title: "Contact — Himalayan Feeds Pvt. Ltd.",
  description:
    "Talk to Himalayan Feeds about cattle feed, poultry feed, pricing or dealership. Call, WhatsApp or email — based in Budgam, Jammu & Kashmir.",
};

/* Three ways in, ordered by how quickly they get an answer. */
const CHANNELS = [
  {
    title: "Call us",
    value: BRAND.phone,
    note: "Fastest for pricing and stock",
    href: BRAND.phoneHref,
    cta: "Tap to call",
    accent: "bg-orange-light text-terracotta-dark",
    text: "text-terracotta-dark",
    icon: <path d="M2 4a2 2 0 012-2h1.6a1 1 0 01.95.68l1 3a1 1 0 01-.5 1.2l-1.1.55a11 11 0 005 5l.55-1.1a1 1 0 011.2-.5l3 1a1 1 0 01.68.95V16a2 2 0 01-2 2A14 14 0 012 4z" fill="currentColor" />,
  },
  {
    title: "WhatsApp",
    value: "Chat with the team",
    note: "Send photos, bags or bills",
    href: `https://wa.me/${BRAND.whatsapp}`,
    cta: "Open chat",
    accent: "bg-leaf-light text-leaf-dark",
    text: "text-leaf-dark",
    icon: <path d="M12 2a10 10 0 00-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1112 20zm4.5-6c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.7.9-.3.2-.5.1a6.5 6.5 0 01-1.9-1.2 7.2 7.2 0 01-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4a.5.5 0 000-.4c0-.1-.5-1.3-.7-1.8s-.4-.4-.5-.4h-.5a.9.9 0 00-.7.3 2.8 2.8 0 00-.9 2.1 4.9 4.9 0 001 2.6 11 11 0 004.3 3.8c1.5.6 1.8.5 2.2.5a2.5 2.5 0 001.6-1.2 2 2 0 00.2-1.2c-.1-.1-.3-.2-.5-.3z" fill="currentColor" />,
  },
  {
    title: "Email",
    value: BRAND.email,
    note: "Best for documents and formal enquiries",
    href: `mailto:${BRAND.email}`,
    cta: "Send email",
    accent: "bg-cream-deep text-ink",
    text: "text-ink",
    icon: <><rect x="2.75" y="5" width="18.5" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.8" fill="none" /><path d="M3.6 7.6l8.4 5.6 8.4-5.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" /></>,
  },
];

/* ---------------- /contact ---------------- */
export default function ContactPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Contact"
        title="Talk to us directly"
        sub="A question about a product, a price, an order or a dealership — whichever way you get in touch, it reaches the same team."
      />

      {/* ---------------- Channels ---------------- */}
      <section className="bg-gradient-to-b from-cream-deep/45 to-cream-deep/20 py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-5 sm:grid-cols-3">
            {CHANNELS.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <a
                  href={c.href}
                  {...(c.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex h-full flex-col rounded-3xl border border-cream-deep bg-white p-7 shadow-soft transition-all duration-700 ease-out hover:-translate-y-1.5 hover:shadow-lift"
                >
                  <div className={`grid h-11 w-11 place-items-center rounded-2xl transition-transform duration-700 ease-out group-hover:scale-110 ${c.accent}`}>
                    <svg viewBox="0 0 24 24" className="h-5 w-5">
                      {c.icon}
                    </svg>
                  </div>
                  <h2 className="mt-5 font-display font-700 text-[17px] text-ink">
                    {c.title}
                  </h2>
                  <p className="mt-1.5 break-words text-[14.5px] font-medium text-ink">
                    {c.value}
                  </p>
                  <p className="mt-1.5 flex-1 text-[12.5px] leading-relaxed text-ink-soft/75">
                    {c.note}
                  </p>
                  <span className={`mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold ${c.text}`}>
                    <span className="link-rule">{c.cta}</span>
                    <svg viewBox="0 0 16 16" className="h-3 w-3 transition-transform duration-300 ease-out group-hover:translate-x-1" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Message + office ---------------- */}
      <section
        aria-labelledby="reach-heading"
        className="bg-gradient-to-b from-cream-deep/20 to-cream-deep/10 py-16 lg:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-14">
            {/* Office details */}
            <div>
              <Reveal>
                <h2
                  id="reach-heading"
                  className="text-balance font-display text-3xl tracking-tight text-ink sm:text-4xl"
                >
                  <span className="font-800">Where to</span>{" "}
                  <span className="font-400 text-ink/55">find us</span>
                </h2>
                <span className="mt-5 block h-1 w-16 origin-left rounded-full bg-terracotta animate-rule" />
              </Reveal>

              {/* Hairline rows — the same register as the About figures.
                  Phone and email are deliberately absent: the channel cards
                  above already carry them, and repeating them here meant the
                  same address appeared twice on one screen. */}
              <Reveal delay={0.1}>
                <dl className="mt-8 space-y-0">
                  {[
                    {
                      k: "Registered office",
                      v: (
                        <>
                          {BRAND.legal}
                          <br />
                          {BRAND.address.line1}
                          <br />
                          {BRAND.address.line2}, {BRAND.address.region}
                        </>
                      ),
                    },
                    { k: "Speak to", v: `${BRAND.contactPerson} — Director` },
                    {
                      k: "Hours",
                      v: "Monday to Saturday, working hours. Messages sent outside those hours are answered the next working day.",
                    },
                    {
                      k: "Response time",
                      v: "Calls answered during working hours; WhatsApp and email usually within one working day.",
                    },
                  ].map((row, i) => (
                    <div
                      key={row.k}
                      className="animate-settle border-b border-ink/[0.08] py-5 first:border-t first:border-ink/[0.08] sm:grid sm:grid-cols-[150px_1fr] sm:gap-6"
                      style={{ animationDelay: `${i * 80}ms` }}
                    >
                      <dt className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-ink-soft/55">
                        {row.k}
                      </dt>
                      <dd className="mt-1.5 text-[14.5px] leading-relaxed text-ink sm:mt-0">
                        {row.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              {/* Socials — placeholder handles, flagged in lib/site.ts */}
              <Reveal delay={0.3}>
                <div className="mt-8">
                  <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-ink-soft/55">
                    Follow along
                  </p>
                  <ul className="mt-3.5 flex flex-wrap gap-2">
                    {SOCIALS.map((s, i) => (
                      <li
                        key={s.label}
                        className="animate-settle"
                        style={{ animationDelay: `${i * 60}ms` }}
                      >
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block rounded-full border border-ink/10 px-3.5 py-1.5 text-[12.5px] font-semibold text-ink-soft transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-terracotta/30 hover:text-ink"
                        >
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            {/* Message form */}
            <Reveal delay={0.12}>
              <div className="lg:sticky lg:top-28">
                <ContactBlock />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- Close ----------------
          Ends on plain cream so the footer wave has matching ground.
          See the invariant in Footer.tsx. */}
      <section className="bg-gradient-to-b from-cream-deep/10 via-cream to-cream py-14 lg:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-ink-soft/55">
              Looking to sell our feed?
            </p>
            <h2 className="mt-4 text-balance font-display text-2xl tracking-tight text-ink sm:text-3xl">
              <span className="font-800">Become a dealer</span>{" "}
              <span className="font-400 text-ink/55">instead</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-ink-soft">
              Attractive margins, dependable supply and full marketing support
              for retailers and distributors.
            </p>
            <Link
              href="/dealership"
              className="group mt-6 inline-flex items-center gap-2 rounded-lg bg-terracotta px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-terracotta-dark hover:shadow-lift"
            >
              See the dealership offer
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
