import { BRAND } from "./site";
import { enquiryText, type EnquiryKind, type EnquiryRow } from "./enquiry";

/* ==========================================================================
   ENQUIRY DELIVERY — server only
   --------------------------------------------------------------------------
   Every form on the site used to hand off to WhatsApp and nothing else, which
   made the prefilled chat the only record and required the visitor to press
   send in a second app. This puts a copy in the inbox automatically instead.

   ⚠ NEEDS A CREDENTIAL TO DO ANYTHING. Sending mail is not something a browser
   can do, and no provider will relay without an account. Until one of the two
   keys below is set, `send` returns { ok: false, reason: "unconfigured" } and
   the forms fall back to the WhatsApp handoff they have always used — so
   deploying this changes nothing until the key exists, rather than silently
   dropping leads.

   Two providers, both plain REST over fetch, so neither adds a dependency:

     RESEND_API_KEY      Resend. Sends FROM our own domain, so replies thread
                         properly and the mail is not from a third party. Needs
                         himalayanfeeds.com verified in Resend by DNS record,
                         and ENQUIRY_FROM set to an address on it. The better
                         answer, and the slower one to set up.

     WEB3FORMS_ACCESS_KEY  Web3Forms. A key is issued against an email address
                         and everything is forwarded there, so the destination
                         is fixed by whoever created the key — TO below is NOT
                         honoured. No DNS, no domain verification, works in
                         minutes. The pragmatic answer.

   Resend wins if both are set. Neither is committed; set them in the Vercel
   project's environment variables, not in the repo.
   ========================================================================== */

/** Where enquiries are meant to land. Honoured by Resend; see the Web3Forms
    note above, where the key itself decides the destination. */
const TO = BRAND.email;

export type MailResult =
  | { ok: true; via: "resend" | "web3forms" }
  | { ok: false; reason: "unconfigured" | "provider"; detail?: string };

const SUBJECT: Record<EnquiryKind, string> = {
  dealership: "Dealership enquiry",
  general: "Website enquiry",
  subscribe: "Mailing list sign-up",
  quote: "Quote request",
};

/* The reply-to is what makes a lead actionable — without it, answering means
   copying an address out of the body by hand. Pulled from whichever row holds
   an email, rather than a fixed index, because the three forms order their
   fields differently. */
function replyTo(rows: EnquiryRow[]): string | undefined {
  const hit = rows.find(
    ([label, value]) => /e-?mail/i.test(label) && value.includes("@"),
  );
  return hit?.[1].trim() || undefined;
}

function senderName(rows: EnquiryRow[]): string {
  const hit = rows.find(([label]) => /^name|full name/i.test(label));
  return hit?.[1].trim() || "Website visitor";
}

async function viaResend(
  subject: string,
  body: string,
  rows: EnquiryRow[],
): Promise<MailResult> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { ok: false, reason: "unconfigured" };

  /* Resend refuses any from-address on an unverified domain. The fallback is
     Resend's own sandbox sender, which works immediately but can only deliver
     to the account holder's own address — fine for a smoke test, not for
     production. Set ENQUIRY_FROM once the domain is verified. */
  const from = process.env.ENQUIRY_FROM ?? "onboarding@resend.dev";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${BRAND.full} website <${from}>`,
        to: [TO],
        subject,
        text: body,
        reply_to: replyTo(rows),
      }),
    });
    if (!res.ok) {
      return { ok: false, reason: "provider", detail: await res.text() };
    }
    return { ok: true, via: "resend" };
  } catch (e) {
    return { ok: false, reason: "provider", detail: String(e) };
  }
}

async function viaWeb3Forms(
  subject: string,
  body: string,
  rows: EnquiryRow[],
): Promise<MailResult> {
  const key = process.env.WEB3FORMS_ACCESS_KEY;
  if (!key) return { ok: false, reason: "unconfigured" };

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: key,
        subject,
        from_name: `${senderName(rows)} — ${BRAND.full} website`,
        email: replyTo(rows),
        message: body,
      }),
    });
    const data = (await res.json().catch(() => null)) as { success?: boolean } | null;
    if (!res.ok || !data?.success) {
      return { ok: false, reason: "provider", detail: JSON.stringify(data) };
    }
    return { ok: true, via: "web3forms" };
  } catch (e) {
    return { ok: false, reason: "provider", detail: String(e) };
  }
}

/* ---------------- The one entry point ----------------
   Body text is built by the same enquiryText() the WhatsApp handoff uses, so
   a lead reads identically whichever channel it arrived through and there is
   only one format to keep current. */
export async function sendEnquiryMail(
  kind: EnquiryKind,
  subject: string,
  rows: EnquiryRow[],
): Promise<MailResult> {
  const line = `${SUBJECT[kind]} — ${subject}`;
  const body = enquiryText(kind, subject, rows);

  if (process.env.RESEND_API_KEY) return viaResend(line, body, rows);
  if (process.env.WEB3FORMS_ACCESS_KEY) return viaWeb3Forms(line, body, rows);
  return { ok: false, reason: "unconfigured" };
}
