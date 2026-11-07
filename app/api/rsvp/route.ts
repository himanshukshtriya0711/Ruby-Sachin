import { NextResponse } from "next/server";
import { validateRsvp, type RsvpData } from "@/lib/rsvp";

export async function POST(request: Request) {
  let data: Partial<RsvpData>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const errors = validateRsvp(data);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", errors },
      { status: 422 },
    );
  }

  const entry = {
    name: data.name!.trim(),
    attendance: data.attendance,
    guests: data.attendance === "accept" ? Number(data.guests) : 0,
    events: data.attendance === "accept" ? data.events : [],
    message: (data.message ?? "").trim(),
    receivedAt: new Date().toISOString(),
  };

  // TODO: persist the RSVP — e.g. append to a Google Sheet, insert into
  // Supabase/Postgres, or send an email notification. Until then the entry
  // is only logged on the server (visible in `npm run dev` / Vercel logs).
  console.log("[rsvp]", JSON.stringify(entry));

  return NextResponse.json({ ok: true });
}
