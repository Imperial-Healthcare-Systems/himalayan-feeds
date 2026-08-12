import { BRAND } from "./site";

/* ---------------- Enquiry wire format ----------------
   There is no backend: every form hands off to WhatsApp as a prefilled chat.
   That makes the message text the entire record, so both forms build it here
   rather than each inventing its own layout.

   The first line matters most. WhatsApp shows it as the chat-list preview, so
   it is the only thing distinguishing a dealership enquiry from a general one
   before the message is opened. It is wrapped in asterisks because WhatsApp
   renders *text* as bold. */

export type EnquiryKind = "dealership" | "general" | "subscribe";

const HEADING: Record<EnquiryKind, string> = {
  dealership: "DEALERSHIP ENQUIRY",
  general: "GENERAL ENQUIRY",
  subscribe: "MAILING LIST SIGN-UP",
};

/* A second, redundant signal at the foot of the message — if the heading is
   ever stripped by a client that does not render markdown, the source still
   says which form it came from. */
const SOURCE: Record<EnquiryKind, string> = {
  dealership: "the dealership form",
  general: "the contact form",
  subscribe: "the footer sign-up",
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
