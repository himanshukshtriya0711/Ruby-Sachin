import { calendarDurationHours, couple, events, venue, type WeddingEvent } from "./wedding";

const compact = (iso: string) => iso.replaceAll("-", "");

/** Event start/end as UTC "YYYYMMDDTHHMMSSZ" (event times are IST, UTC+5:30). */
function utcRange(e: WeddingEvent) {
  const start = new Date(`${e.date}T${e.start}:00+05:30`);
  const end = new Date(start.getTime() + calendarDurationHours * 3_600_000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  return { start: fmt(start), end: fmt(end) };
}

const names = `${couple.bride} & ${couple.groom}`;
const location = `${venue.name}${venue.address ? `, ${venue.address}` : ""}`;

export function googleCalendarUrl(event: WeddingEvent) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${event.title} · ${names}`,
    dates: `${utcRange(event).start}/${utcRange(event).end}`,
    ctz: "Asia/Kolkata",
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
      `DTSTART:${utcRange(e).start}`,
      `DTEND:${utcRange(e).end}`,
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
