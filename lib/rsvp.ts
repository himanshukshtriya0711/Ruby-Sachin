import type { WeddingEventId } from "./wedding";

export type Attendance = "accept" | "decline";

export type RsvpData = {
  name: string;
  guests: number;
  attendance: Attendance | "";
  events: WeddingEventId[];
  message: string;
};

export type RsvpErrors = Partial<Record<keyof RsvpData, string>>;

export const RSVP_LIMITS = { maxGuests: 10, maxMessage: 500, maxName: 80 } as const;

const EVENT_IDS: WeddingEventId[] = ["lagan", "baraat", "vidaai"];

/** Shared by the form (client) and the API route (server). */
export function validateRsvp(data: Partial<RsvpData>): RsvpErrors {
  const errors: RsvpErrors = {};
  const name = (data.name ?? "").trim();

  if (name.length < 2) errors.name = "Please tell us your name.";
  else if (name.length > RSVP_LIMITS.maxName) errors.name = "That name is a little too long.";

  if (data.attendance !== "accept" && data.attendance !== "decline") {
    errors.attendance = "Please let us know if you can join us.";
  }

  if (data.attendance === "accept") {
    const g = Number(data.guests);
    if (!Number.isInteger(g) || g < 1 || g > RSVP_LIMITS.maxGuests) {
      errors.guests = `Please choose between 1 and ${RSVP_LIMITS.maxGuests} guests.`;
    }
    const evs = Array.isArray(data.events) ? data.events : [];
    if (evs.length === 0) errors.events = "Please pick at least one celebration.";
    else if (evs.some((e) => !EVENT_IDS.includes(e))) errors.events = "Unknown celebration selected.";
  }

  if ((data.message ?? "").length > RSVP_LIMITS.maxMessage) {
    errors.message = `Please keep your message under ${RSVP_LIMITS.maxMessage} characters.`;
  }

  return errors;
}

export type RsvpResult = { ok: true } | { ok: false; error: string; errors?: RsvpErrors };

/**
 * Sends the RSVP to the app's API route. To use an external service instead
 * (Google Sheets, Formspree, Supabase…), set NEXT_PUBLIC_RSVP_ENDPOINT or
 * edit app/api/rsvp/route.ts.
 */
export async function submitRsvp(data: RsvpData): Promise<RsvpResult> {
  const endpoint = process.env.NEXT_PUBLIC_RSVP_ENDPOINT || "/api/rsvp";
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    });
    const body = (await res.json().catch(() => ({}))) as Partial<RsvpResult> & {
      error?: string;
      errors?: RsvpErrors;
    };
    if (!res.ok) {
      return { ok: false, error: body.error ?? "Something went wrong.", errors: body.errors };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "We couldn't reach the server. Please check your connection and try again." };
  }
}
