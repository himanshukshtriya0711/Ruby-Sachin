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
  /** Shown on the event cards. Replace with real timings once confirmed. */
  time: string;
  description: string;
};

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
    time: "Timings to be announced",
    description: "Rings, blessings and the first promise as two families become one.",
  },
  {
    id: "baraat",
    title: "Baraat",
    date: "2026-12-11",
    time: "Timings to be announced",
    description: "Music, dhol and dancing as the groom arrives to wed his bride.",
  },
  {
    id: "vidaai",
    title: "Vidaai",
    date: "2026-12-12",
    time: "Timings to be announced",
    description: "A tender farewell, wrapped in blessings, as a new journey begins.",
  },
];

/** The countdown targets the start of the Baraat day (IST). */
export const countdownTarget = "2026-12-11T00:00:00+05:30";

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
export const music = { src: "" as string, title: "Wedding music" };

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
