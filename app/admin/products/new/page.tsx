"use client";

import { useRouter } from "next/navigation";

import { ProductForm, type ProductDraft } from "@/components/admin/ProductForm";
import { AdminShell } from "@/components/admin/Shell";
import { usePortal } from "@/components/admin/store-context";
import { emptyProduct } from "@/lib/admin/types";

export default function NewProductPage() {
  const router = useRouter();
  const { createProduct, toast } = usePortal();

  async function save(draft: ProductDraft) {
    await createProduct(draft);
    toast(`${draft.name} created`);
    router.push("/admin/products");
  }

  return (
    <AdminShell
      title="New product"
      subtitle="Add a product to the local catalogue."
      crumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Products", href: "/admin/products" },
        { label: "New" },
      ]}
    >
      <div className="mb-4 rounded-xl border border-ink/10 bg-white px-4 py-3 text-[13px] leading-relaxed text-ink-soft">
        Fields left blank stay blank. The public catalogue renders an unconfirmed
        specification as <strong className="text-ink">On request</strong> and
        routes the visitor to an enquiry — which is the honest result, not a
        gap to be filled with a plausible number.
      </div>
      <ProductForm initial={emptyProduct()} submitLabel="Create product" onSubmit={save} />
    </AdminShell>
  );
}
