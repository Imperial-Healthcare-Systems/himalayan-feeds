import type { ReactNode } from "react";
import Header from "./Header";
import AnnouncementBar from "./AnnouncementBar";
import Footer from "./Footer";
import WhatsAppFloat from "./WhatsAppFloat";

/* ---------------- Shared chrome for every inner page ---------------- */
export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

/* ---------------- Inner-page title block ---------------- */
export function PageHeader({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <section className="bg-cream-deep/60 border-b border-cream-deep">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 lg:py-20 text-center">
        <span className="inline-block rounded-full bg-orange-light text-orange-dark text-xs font-bold tracking-widest uppercase px-4 py-1.5">
          {eyebrow}
        </span>
        <h1 className="mt-5 font-display font-800 text-4xl sm:text-5xl tracking-tight text-ink text-balance">
          {title}
        </h1>
        {sub && (
          <p className="mt-4 max-w-2xl mx-auto text-ink-soft text-lg">{sub}</p>
        )}
      </div>
    </section>
  );
}
