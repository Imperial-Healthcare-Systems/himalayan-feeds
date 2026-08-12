import { BRAND } from "@/lib/site";

const MESSAGES = [
  "Now onboarding new dealers across India — attractive margins & full support",
  "FSSAI-registered manufacturing · Antibiotic-free formulations",
  BRAND.descriptor,
  `Call us on ${BRAND.phone} for bulk & dealership enquiries`,
];

/* ---------------- Scrolling announcement marquee ---------------- */
export default function AnnouncementBar() {
  const line = MESSAGES.join("   •   ");
  return (
    <div className="gradient-orange text-white text-[13px] font-medium overflow-hidden">
      <div className="flex whitespace-nowrap py-2">
        {/* The line is rendered twice so the -50% marquee keyframe loops seamlessly */}
        <div className="animate-marquee flex shrink-0">
          <span className="px-4">{line}</span>
          <span className="px-4" aria-hidden>
            {line}
          </span>
        </div>
      </div>
    </div>
  );
}
