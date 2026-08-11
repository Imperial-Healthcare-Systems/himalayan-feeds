import PageShell, { PageHeader } from "@/components/PageShell";
import ContactBlock from "@/components/ContactBlock";

export const metadata = { title: "Contact — Himalayan Feeds" };

/* ---------------- /contact ---------------- */
export default function ContactPage() {
  return (
    <PageShell>
      {/* Title block */}
      <PageHeader
        eyebrow="Contact"
        title="We're here to help"
        sub="Questions about a product, an order, or becoming a dealer? Reach out any way you like."
      />
      {/* Channels + quick message form */}
      <ContactBlock />
    </PageShell>
  );
}
