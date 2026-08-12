"use client";

import { useState } from "react";

import { AdminShell } from "@/components/admin/Shell";
import { usePortal } from "@/components/admin/store-context";
import { ConfirmDialog, btnDanger } from "@/components/admin/ui";
import { BRAND } from "@/lib/site";

/* Read-only reflection of lib/site.ts. Editing brand and contact details is
   deliberately NOT wired up: those values are the client's own approved copy
   and are consumed by the header, footer, metadata and structured data at
   build time. A frontend-only form that appeared to change them but silently
   did not would be worse than no form at all. */
function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 border-b border-ink/6 py-3 last:border-0 sm:grid-cols-[190px_1fr] sm:gap-4">
      <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-soft/75 sm:pt-0.5">
        {label}
      </dt>
      <dd className="text-[13.5px] break-words text-ink">{value}</dd>
    </div>
  );
}

export default function AdminSettingsPage() {
  const { session, resetProducts, toast, products, categories } = usePortal();
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);

  async function doReset() {
    setBusy(true);
    await resetProducts();
    setBusy(false);
    toast("Demo catalogue restored");
    setConfirming(false);
  }

  return (
    <AdminShell
      title="Settings"
      subtitle="Console preferences and local demo data."
      crumbs={[{ label: "Admin", href: "/admin" }, { label: "Settings" }]}
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl border border-ink/8 bg-white p-5">
          <h2 className="font-display font-700 text-[15px] text-ink">Signed-in account</h2>
          <p className="mt-1 text-[13px] text-ink-soft">
            Demo authentication only — there is no account system behind this.
          </p>
          <dl className="mt-4">
            <Row label="Email" value={session?.email ?? "—"} />
            <Row label="Role" value="Administrator (demo)" />
            <Row
              label="Session"
              value="Stored in this browser's local storage, expires after 8 hours"
            />
          </dl>
        </section>

        <section className="rounded-xl border border-ink/8 bg-white p-5">
          <h2 className="font-display font-700 text-[15px] text-ink">Local data</h2>
          <p className="mt-1 text-[13px] text-ink-soft">
            The console holds {products.length} products across {categories.length}{" "}
            ranges in this browser.
          </p>
          <dl className="mt-4">
            <Row label="Storage" value="localStorage (hf_admin_*)" />
            <Row label="Backend" value="None — no server is involved" />
            <Row label="Seed source" value="lib/site.ts" />
          </dl>
          <button className={`${btnDanger} mt-4`} onClick={() => setConfirming(true)}>
            Reset demo catalogue
          </button>
        </section>

        <section className="rounded-xl border border-ink/8 bg-white p-5 lg:col-span-2">
          <h2 className="font-display font-700 text-[15px] text-ink">Brand &amp; contact</h2>
          <p className="mt-1 text-[13px] text-ink-soft">
            Read-only. These values live in{" "}
            <code className="font-mono text-[12px]">lib/site.ts</code> and are
            consumed by the header, footer, page metadata and structured data at
            build time — a form here could not change them without a backend, so
            it is not offered.
          </p>
          <dl className="mt-4">
            <Row label="Legal name" value={BRAND.legal} />
            <Row label="Tagline" value={BRAND.tagline} />
            <Row label="Positioning" value={BRAND.positioning} />
            <Row label="Contact" value={BRAND.contactPerson} />
            <Row label="Phone" value={BRAND.phone} />
            <Row label="Email" value={BRAND.email} />
            <Row
              label="Address"
              value={`${BRAND.address.line1}, ${BRAND.address.line2}, ${BRAND.address.region}`}
            />
          </dl>
        </section>
      </div>

      {confirming ? (
        <ConfirmDialog
          title="Reset demo catalogue"
          confirmLabel="Reset"
          busy={busy}
          body={
            <>
              <p>
                Every product edit, addition and deletion made in this browser
                will be discarded.
              </p>
              <p className="text-[13px] text-ink-soft">
                The catalogue is restored from{" "}
                <code className="font-mono text-[12px]">lib/site.ts</code>.
                Categories are left untouched.
              </p>
            </>
          }
          onConfirm={() => void doReset()}
          onCancel={() => setConfirming(false)}
        />
      ) : null}
    </AdminShell>
  );
}
