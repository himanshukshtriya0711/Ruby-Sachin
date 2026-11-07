"use client";

import { useGuestName } from "@/lib/useGuestName";

/** "Dear Sharma Family," — shown only on personalised links (?to=…). */
export function GuestGreeting() {
  const guest = useGuestName();
  if (!guest) return null;
  return (
    <p className="rise mb-2 text-[1.3rem] text-plum-soft italic sm:text-[1.45rem]" style={{ "--d": "0s" } as React.CSSProperties}>
      Dear {guest},
    </p>
  );
}
