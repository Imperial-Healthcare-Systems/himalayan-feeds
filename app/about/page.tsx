import PageShell, { PageHeader } from "@/components/PageShell";
import { TrustStrip, WhyUs } from "@/components/Sections";
import Reveal from "@/components/Reveal";

export const metadata = { title: "About Us — Himalayan Feeds" };

/* ---------------- /about ---------------- */
export default function AboutPage() {
  return (
    <PageShell>
      {/* Title block */}
      <PageHeader
        eyebrow="About Us"
        title="Feed built on trust and science"
        sub="Himalayan Feeds helps farmers raise healthier livestock and run more profitable farms."
      />
      {/* Brand story */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 space-y-6 text-ink-soft leading-relaxed">
          <Reveal>
            <p>
              Himalayan Feeds began with a simple idea — that every farmer deserves
              feed that performs the same, bag after bag. Today we formulate and
              manufacture nutrition for poultry, fish, shrimp and dairy cattle,
              supplying a growing network of dealers across India.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              Our recipes are balanced by nutritionists and batch-tested at every
              stage of production. The result is antibiotic-free feed that improves
              feed conversion, supports animal health, and puts more value into
              every farm it reaches.
            </p>
          </Reveal>
        </div>
      </section>
      {/* Credibility */}
      <TrustStrip />
      {/* "settling" because here WhyUs follows TrustStrip, not ProductGrid. */}
      <WhyUs tone="settling" />
    </PageShell>
  );
}
