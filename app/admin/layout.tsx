import type { Metadata } from "next";

import { AdminProvider } from "@/components/admin/store-context";

export const metadata: Metadata = {
  title: "Admin",
  description: "Himalayan Feeds catalogue management console.",
  /* The console must never be indexed, and must not inherit the public
     openGraph card from the root layout. */
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminProvider>{children}</AdminProvider>;
}
