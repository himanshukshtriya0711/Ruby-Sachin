/**
 * All wedding content lives here. Update this file to change text, dates,
 * venue details or the story — the components read everything from it.
 */

export type WeddingEventId = "lagan" | "baraat" | "vidaai";

export type WeddingEvent = {
  id: WeddingEventId;
  title: string;
  /** ISO date (YYYY-MM-DD) in India Standard Time. */
  date: string;
  /** Start time, 24-hour "HH:MM" in IST. Shown as e.g. "12:00 PM" and used for calendar invites. */
  start: string;
  description: string;
};

/** How long calendar invites block out for each event (no end times were given). */
export const calendarDurationHours = 3;

export const couple = {
  bride: "Ruby",
  groom: "Sachin",
  monogram: { first: "R", second: "S" },
};

export const events: WeddingEvent[] = [
  {
    id: "lagan",
    title: "Lagan & Sagai",
    date: "2026-12-07",
    start: "12:00", // 12 PM, afternoon
    description: "Rings, blessings and the first promise as two families become one.",
  },
  {
    id: "baraat",
    title: "Baraat",
    date: "2026-12-11",
    start: "20:00", // 8 PM, night
    description: "Music, dhol and dancing as the groom arrives to wed his bride.",
  },
  {
    id: "vidaai",
    title: "Vidaai",
    date: "2026-12-12",
    start: "10:00", // 10 AM, morning
    description: "A tender farewell, wrapped in blessings, as a new journey begins.",
  },
];

/** "20:00" → "8:00 PM" */
export function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
}

/** The countdown runs to the start of the Baraat (IST). */
const baraat = events.find((e) => e.id === "baraat")!;
export const countdownTarget = `${baraat.date}T${baraat.start}:00+05:30`;

/**
 * Venue — PLACEHOLDER. Replace every field with the real details.
 * `mapQuery` is what Google Maps searches for when guests tap "View on Map";
 * set `mapUrl` instead if you'd rather paste a specific Google Maps share link.
 */
export const venue = {
  name: "Samadhiya Farm House",
  address: "Near Sikandra Sabzi Mandi, Sikandra, Agra, Uttar Pradesh",
  note: "We look forward to welcoming you. Tap below for directions straight to the venue.",
  mapQuery: "Samadhiya Farm House, near Sikandra Sabzi Mandi, Sikandra, Agra, Uttar Pradesh",
  /** Optional: paste the venue's Google Maps share link here for a pin-exact location. */
  mapUrl: "" as string,
};

export function venueMapHref() {
  return (
    venue.mapUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.mapQuery)}`
  );
}

export function venueDirectionsHref() {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(venue.mapQuery)}`;
}

export function venueEmbedSrc() {
  return `https://maps.google.com/maps?q=${encodeURIComponent(venue.mapQuery)}&z=15&output=embed`;
}

/**
 * RSVPs are sent to this WhatsApp number after the form is confirmed.
 * Country code + number, digits only (India = 91).
 */
export const whatsappNumber = "919536734736";

/**
 * Optional background music. Drop an mp3 into /public (e.g. /public/music.mp3)
 * and set `src: "/music.mp3"`. It starts when the guest opens the invitation
 * and can be paused from the floating button. Leave empty to hide the player.
 */
export const music = {
  // Original instrumental composed for this site (Raag Yaman: santoor, bansuri, tanpura, tabla).
  // To use a different song, put its mp3 in /public/music and change this path.
  src: "/music/humsafar-yaman.mp3" as string,
  title: "background music",
};

/** Our Story — placeholder copy, written to be replaced. */
export const story = {
  intro:
    "From a chance meeting to a forever promise, our journey has been filled with laughter, friendship and a love that only grew stronger with time.",
  chapters: [
    {
      title: "How It Began",
      body: "A first hello that felt strangely familiar. Share the story of where and how you first met here.",
    },
    {
      title: "Falling in Love",
      body: "Long conversations, shared adventures and the quiet certainty that this was it. Add your favourite memories here.",
    },
    {
      title: "The Promise",
      body: "One question, one answer, and a lifetime ahead. Describe the proposal and the moment your families came together.",
    },
  ],
};

export const closingMessage = "Two hearts, one beautiful journey. Forever begins here.";

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "story", label: "Our Story" },
  { id: "events", label: "Events" },
  { id: "venue", label: "Venue" },
  { id: "gallery", label: "Gallery" },
  { id: "rsvp", label: "RSVP" },
] as const;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

/* ---------- date helpers (timezone-safe: dates are treated as calendar days) ---------- */

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function parts(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m, d };
}

/** "07 December 2026" */
export function formatLong(iso: string) {
  const { y, m, d } = parts(iso);
  return `${String(d).padStart(2, "0")} ${MONTHS[m - 1]} ${y}`;
}

/** "07 Dec 2026" */
export function formatShort(iso: string) {
  const { y, m, d } = parts(iso);
  return `${String(d).padStart(2, "0")} ${MONTHS[m - 1].slice(0, 3)} ${y}`;
}
