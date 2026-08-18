import { BRAND } from "./site";

/* ---------------- Enquiry wire format ----------------
   Every form on the site funnels through here, so a lead reads the same way
   whichever form raised it and there is one layout to keep current.

   Two channels carry it. POST /api/enquiry puts a copy in the inbox, which is
   the channel that does not depend on anyone pressing send. WhatsApp remains
   as a prefilled chat, and is still the FALLBACK the forms use when delivery
   is not configured or fails — see lib/mail.ts. The same text is used for
   both, which is why the formatting below is WhatsApp-flavoured.

   The first line matters most. WhatsApp shows it as the chat-list preview, so
   it is the only thing distinguishing a dealership enquiry from a general one
   before the message is opened. It is wrapped in asterisks because WhatsApp
   renders *text* as bold. */

export type EnquiryKind = "dealership" | "general" | "subscribe" | "quote";

/** The runtime list, so the API route can validate `kind` against the same
    source the type comes from rather than a second hand-written copy. */
export const ENQUIRY_KINDS = [
  "dealership",
  "general",
  "subscribe",
  "quote",
] as const satisfies readonly EnquiryKind[];

const HEADING: Record<EnquiryKind, string> = {
  dealership: "DEALERSHIP ENQUIRY",
  general: "GENERAL ENQUIRY",
  subscribe: "MAILING LIST SIGN-UP",
  quote: "QUOTE REQUEST",
};

/* A second, redundant signal at the foot of the message — if the heading is
   ever stripped by a client that does not render markdown, the source still
   says which form it came from. */
const SOURCE: Record<EnquiryKind, string> = {
  dealership: "the dealership form",
  general: "the contact form",
  subscribe: "the footer sign-up",
  quote: "the pop-up enquiry",
};

export type EnquiryRow = [label: string, value: string];

export function enquiryText(
  kind: EnquiryKind,
  subject: string,
  rows: EnquiryRow[]
) {
  const lines = [
    `*${HEADING[kind]}*`,
    `Type: ${subject}`,
    "",
    ...rows
      .filter(([, v]) => v && v.trim())
      .map(([k, v]) => `${k}: ${v.trim()}`),
    "",
    `— Sent from ${SOURCE[kind]} on himalayanfeeds.com`,
  ];
  return lines.join("\n");
}

export function enquiryHref(
  kind: EnquiryKind,
  subject: string,
  rows: EnquiryRow[]
) {
  return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
    enquiryText(kind, subject, rows)
  )}`;
}

/* ---------------- Client-side submit ----------------
   Posts the lead to /api/enquiry, which mails it. Returns whether it actually
   reached the inbox — NOT whether the request completed — so a caller can
   fall back to the WhatsApp handoff instead of showing a success screen for a
   lead that went nowhere. Never throws: a form mid-submit has no useful way to
   handle an exception, and every failure means the same thing to it. */
export async function submitEnquiry(
  kind: EnquiryKind,
  subject: string,
  rows: EnquiryRow[]
): Promise<boolean> {
  try {
    const res = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, subject, rows }),
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { ok?: boolean };
    return data.ok === true;
  } catch {
    return false;
  }
}

/* The one fixed type on the dealership form, and the selectable list on the
   contact form. Kept together so the two can never drift into meaning the
   same thing under different words. */
export const DEALERSHIP_TYPE = "Dealership / distribution";
export const SUBSCRIBE_TYPE = "Add me to the mailing list";

export const GENERAL_TYPES = [
  "Product question",
  "Pricing / request a quote",
  "Existing order",
  "Bulk supply",
  DEALERSHIP_TYPE,
  "Something else",
];
