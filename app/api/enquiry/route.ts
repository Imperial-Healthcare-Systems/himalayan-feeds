import { sendEnquiryMail } from "@/lib/mail";
import { ENQUIRY_KINDS, type EnquiryKind, type EnquiryRow } from "@/lib/enquiry";

/* ---------------- POST /api/enquiry ----------------
   Takes a submission from any of the three forms and puts it in the inbox.

   Route Handlers are not cached for POST, so process.env is read per request
   and the keys can be rotated in Vercel without a redeploy.

   The response deliberately reports whether the mail actually went out. The
   forms use that to decide whether to fall back to the WhatsApp handoff, so
   answering "ok" on a failure would lose the lead silently — the one outcome
   worth engineering against here. */

/** Nothing on these forms is long. Caps are here so a bot cannot post a
    megabyte of text into somebody's mailbox, not to police real input. */
const MAX_ROWS = 24;
const MAX_LABEL = 64;
const MAX_VALUE = 2000;
const MAX_SUBJECT = 160;

function clean(v: unknown, max: number): string {
  return typeof v === "string" ? v.slice(0, max).trim() : "";
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    kind?: unknown;
    subject?: unknown;
    rows?: unknown;
    /** Honeypot. A real visitor never sees the field, so anything in it is a
        bot; answer 200 so the bot believes it succeeded and does not retry. */
    company_website?: unknown;
  } | null;

  if (!body) {
    return Response.json({ ok: false, error: "bad-request" }, { status: 400 });
  }

  if (clean(body.company_website, 200)) {
    return Response.json({ ok: true, skipped: true });
  }

  const kind = body.kind as EnquiryKind;
  if (!ENQUIRY_KINDS.includes(kind)) {
    return Response.json({ ok: false, error: "bad-kind" }, { status: 400 });
  }

  const subject = clean(body.subject, MAX_SUBJECT);
  if (!subject) {
    return Response.json({ ok: false, error: "bad-subject" }, { status: 400 });
  }

  if (!Array.isArray(body.rows)) {
    return Response.json({ ok: false, error: "bad-rows" }, { status: 400 });
  }

  const rows: EnquiryRow[] = body.rows
    .slice(0, MAX_ROWS)
    .filter((r): r is [unknown, unknown] => Array.isArray(r) && r.length === 2)
    .map(([label, value]): EnquiryRow => [clean(label, MAX_LABEL), clean(value, MAX_VALUE)])
    .filter(([label, value]) => label && value);

  if (!rows.length) {
    return Response.json({ ok: false, error: "empty" }, { status: 400 });
  }

  const result = await sendEnquiryMail(kind, subject, rows);

  if (!result.ok) {
    /* Logged rather than returned: `detail` can carry a provider message, and
       provider messages have a habit of quoting the credential back. The
       client only needs to know it failed and why in the broadest terms. */
    console.error("[enquiry] delivery failed:", result.reason, result.detail ?? "");
    return Response.json({ ok: false, reason: result.reason }, { status: 502 });
  }

  return Response.json({ ok: true, via: result.via });
}
