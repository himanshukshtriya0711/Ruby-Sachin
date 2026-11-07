import type { RsvpData } from "./rsvp";
import { couple, events, formatShort, whatsappNumber } from "./wedding";

/** wa.me deep link — opens the WhatsApp app on phones and WhatsApp Web on desktop. */
export function whatsappUrl(text: string, number: string = whatsappNumber) {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

/** Share link without a recipient — the guest picks the chat. */
export function whatsappShareUrl(text: string) {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export function rsvpMessage(data: RsvpData) {
  const names = `${couple.bride} & ${couple.groom}`;
  const accepting = data.attendance === "accept";
  const lines = [
    `🌸 *RSVP · ${names}'s Wedding* 🌸`,
    "",
    `*Name:* ${data.name.trim()}`,
    `*Attending:* ${accepting ? "Joyfully accepts ✅" : "Regretfully declines 🙏"}`,
  ];
  if (accepting) {
    const chosen = events
      .filter((e) => data.events.includes(e.id))
      .map((e) => `${e.title} (${formatShort(e.date).slice(0, 6)})`);
    lines.push(`*Guests:* ${data.guests}`, `*Celebrations:* ${chosen.join(", ")}`);
  }
  const msg = data.message.trim();
  if (msg) lines.push("", `*Message:* ${msg}`);
  return lines.join("\n");
}
