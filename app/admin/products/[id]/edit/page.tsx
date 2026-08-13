"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { ProductForm, type ProductDraft } from "@/components/admin/ProductForm";
import { AdminShell } from "@/components/admin/Shell";
import { usePortal } from "@/components/admin/store-context";
import { EmptyState, LoadingState, btnPrimary } from "@/components/admin/ui";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const { products, loading, updateProduct, toast } = usePortal();

  const product = products.find((p) => p.id === id);

  async function save(draft: ProductDraft) {
    if (!product) return;
    await updateProduct(product.id, draft);
    toast(`${draft.name} saved`);
    router.push("/admin/products");
  }

  return (
    <AdminShell
      title={product ? "Edit product" : "Product"}
      subtitle={product?.name}
      crumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Products", href: "/admin/products" },
        { label: product?.name ?? "Edit" },
      ]}
    >
      {loading ? (
        <LoadingState rows={5} label="Loading product…" />
      ) : !product ? (
        <EmptyState
          title="Product not found"
          body="This product may have been deleted, or the link points at a record that no longer exists in this browser."
          action={
            <Link href="/admin/products" className={btnPrimary}>
              Back to products
            </Link>
          }
        />
      ) : (
        <ProductForm
          currentId={product.id}
          initial={{
            name: product.name,
            category: product.category,
            group: product.group,
            slug: product.slug,
            stage: product.stage,
            shortDescription: product.shortDescription,
            description: product.description,
            benefits: product.benefits,
            targetAnimal: product.targetAnimal,
            feedType: product.feedType,
            packSize: product.packSize,
            usage: product.usage,
            specifications: product.specifications,
            image: product.image,
            imageAlt: product.imageAlt,
            additionalImages: product.additionalImages,
            status: product.status,
            featured: product.featured,
          }}
          submitLabel="Save changes"
          onSubmit={save}
        />
      )}
    </AdminShell>
  );
}
