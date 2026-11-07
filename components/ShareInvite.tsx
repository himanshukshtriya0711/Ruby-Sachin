"use client";

import { Share2 } from "lucide-react";
import { couple } from "@/lib/wedding";
import { whatsappShareUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function shareInvitation() {
  const url = `${window.location.origin}${window.location.pathname}`;
  const text = `You're invited to the wedding of ${couple.bride} & ${couple.groom} 💜 07–12 December 2026`;
  if (navigator.share) {
    navigator.share({ title: `${couple.bride} & ${couple.groom}`, text, url }).catch(() => {});
  } else {
    window.open(whatsappShareUrl(`${text}\n${url}`), "_blank", "noopener,noreferrer");
  }
}

/** Native share sheet on phones; WhatsApp share on desktop. */
export function ShareInvite({ className, iconOnly }: { className?: string; iconOnly?: boolean }) {
  return (
    <button
      type="button"
      onClick={shareInvitation}
      aria-label={iconOnly ? "Share this invitation" : undefined}
      className={cn("btn btn-outline", iconOnly && "size-11 min-h-0 p-0", className)}
    >
      <Share2 className="size-4" strokeWidth={1.7} />
      {!iconOnly && "Share Invitation"}
    </button>
  );
}
