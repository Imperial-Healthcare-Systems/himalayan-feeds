import PageShell, { PageHeader } from "@/components/PageShell";
import DealershipForm from "@/components/DealershipForm";
import { TrustStrip } from "@/components/Sections";

export const metadata = { title: "Dealership — Himalayan Feeds" };

/* ---------------- /dealership ---------------- */
export default function DealershipPage() {
  return (
    <PageShell>
      {/* Title block */}
      <PageHeader
        eyebrow="Dealership"
        title="Partner with Himalayan Feeds"
        sub="Attractive margins, dependable supply and full marketing support. Tell us about yourself and our team will reach out."
      />
      {/* Enquiry form */}
      <DealershipForm />

      {/* Credibility */}
      <TrustStrip />
    </PageShell>
  );
}
