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
      {/* Entrance is a CSS keyframe with inline delays rather than Reveal:
          this block is always above the fold, so a viewport trigger would fire
          instantly anyway and would cost a client component on every page. */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 lg:py-16 text-center">
        <span
          className="inline-block animate-settle rounded-full bg-orange-light text-orange-dark text-xs font-bold tracking-widest uppercase px-4 py-1.5"
          style={{ animationDelay: "40ms" }}
        >
          {eyebrow}
        </span>
        <h1
          className="mt-5 animate-settle font-display font-800 text-4xl sm:text-5xl tracking-tight text-ink text-balance"
          style={{ animationDelay: "120ms" }}
        >
          {title}
        </h1>
        <span className="mx-auto mt-5 block h-1 w-14 rounded-full bg-orange animate-rule" />
        {sub && (
          <p
            className="mt-5 max-w-2xl mx-auto animate-settle text-ink-soft text-lg"
            style={{ animationDelay: "260ms" }}
          >
            {sub}
          </p>
        )}
      </div>
    </section>
  );
}
