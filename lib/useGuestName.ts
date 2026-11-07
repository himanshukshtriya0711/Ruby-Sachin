"use client";

import { useEffect, useState } from "react";

/**
 * Reads a guest name from personalised links, e.g.
 *   https://your-site.com/?to=Sharma%20Family
 * (`guest` and `name` also work). Read on the client so the page stays static.
 */
export function useGuestName() {
  const [name, setName] = useState("");
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const raw = p.get("to") ?? p.get("guest") ?? p.get("name") ?? "";
    const clean = raw.replace(/[<>{}]/g, "").replace(/\s+/g, " ").trim().slice(0, 60);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- URL is only readable after mount
    setName(clean);
  }, []);
  return name;
}
