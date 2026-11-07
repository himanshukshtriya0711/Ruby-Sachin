import { couple, events, venue, type WeddingEvent } from "./wedding";

const compact = (iso: string) => iso.replaceAll("-", "");

function nextDay(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + 1));
  return dt.toISOString().slice(0, 10);
}

const names = `${couple.bride} & ${couple.groom}`;
const location = `${venue.name}${venue.address ? `, ${venue.address}` : ""}`;

export function googleCalendarUrl(event: WeddingEvent) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${event.title} · ${names}`,
    dates: `${compact(event.date)}/${compact(nextDay(event.date))}`,
    details: `${event.description}\n\nWe can't wait to celebrate with you. — ${names}`,
    location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function escapeIcs(text: string) {
  return text.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/([,;])/g, "\\$1");
}

/** Builds an .ics file with every wedding event as an all-day entry. */
export function buildIcs() {
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Ruby & Sachin//Wedding//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    ...events.flatMap((e) => [
      "BEGIN:VEVENT",
      `UID:${e.id}-${compact(e.date)}@ruby-sachin-wedding`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${compact(e.date)}`,
      `DTEND;VALUE=DATE:${compact(nextDay(e.date))}`,
      `SUMMARY:${escapeIcs(`${e.title} · ${names}`)}`,
      `DESCRIPTION:${escapeIcs(e.description)}`,
      `LOCATION:${escapeIcs(location)}`,
      "END:VEVENT",
    ]),
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

export function downloadIcs() {
  const blob = new Blob([buildIcs()], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "ruby-sachin-wedding.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
