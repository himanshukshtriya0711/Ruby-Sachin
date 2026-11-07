import type { SVGProps } from "react";
import type { WeddingEventId } from "@/lib/wedding";

type P = SVGProps<SVGSVGElement>;

const base = (p: P): P => ({
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  ...p,
});

export function RingsIcon(p: P) {
  return (
    <svg {...base(p)}>
      <circle cx="19" cy="29" r="10" />
      <circle cx="30" cy="29" r="10" />
      <path d="M15.5 16.5 19 12l3.5 4.5L19 20z" />
      <path d="M17 16.5h4" />
    </svg>
  );
}

/** Decorated baraat horse with a plume. */
export function HorseIcon(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M13 43C12 32 13.5 22 19 15L20 8.5 24 12.5C29 12.5 34 16 37 21 39 24 41 27 40.5 30 39.5 32.5 36.5 32.5 34 31.2 31.5 30 29.5 30.2 27.5 31.5 25.5 34 27 38.5 30 43Z" />
      <path d="M17.5 18.5C14.5 21 13.2 24.5 13.4 28M15.6 27C13.8 30 13.6 33.5 14.4 37" />
      <path d="M21.5 15.5C25 17.5 27.5 21 28.5 25.5M32.5 26.5C35 25.2 37.6 25.4 40 26.8" />
      <path d="M21 9C19 5 21 2 25.5 1 24.5 3.8 24.8 6.5 23 9.5" />
      <circle cx="29.5" cy="19.5" r="1" fill="currentColor" />
      <circle cx="37.8" cy="27.4" r=".7" fill="currentColor" />
    </svg>
  );
}

/** Two birds in flight — the farewell of Vidaai. */
export function BirdsIcon(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M5 30c4-6 9-7 13-2 2-6 8-9 14-7-5 1-8 4-9 9-1.5 4-6 6-10 4" />
      <path d="M13 34c2 2 6 2.5 9 .5" />
      <path d="M26 16c2.5-3.5 6-4 8.5-1.2 1.5-3.5 5-5.4 8.5-4.3-3 .6-5 2.6-5.8 5.6-1 2.4-3.8 3.6-6.2 2.4" />
      <path d="M17 41c1.5-.5 3-.5 4 .5M30 40c1.2-.4 2.4-.4 3.4.4" opacity=".6" />
    </svg>
  );
}

/** Diya — the lamp of blessings. */
export function DiyaIcon(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M24 6c4.5 5 4.8 10.5 0 15-4.8-4.5-4.5-10 0-15z" />
      <path d="M24 12.5c1.6 2 1.7 4.2 0 6-1.7-1.8-1.6-4 0-6z" fill="currentColor" stroke="none" opacity=".55" />
      <path d="M6 26h33c-1.5 7.5-8 12-16.5 12S7.5 33.5 6 26z" />
      <path d="M39 26c2.5-.5 4.5-2 5.5-4.5-3 .4-5.4 1.4-6.8 3" />
      <path d="M17 41.5h11M19.5 38l-1 3.5M25.5 38l1 3.5" />
      <path d="M12 30.5c3 1.6 6.5 2.4 10.5 2.4" opacity=".6" />
      <path d="M13 13.5l-2.2-1.6M35 13.5l2.2-1.6M24 2v1.2" opacity=".7" />
    </svg>
  );
}

export function EnvelopeIcon(p: P) {
  return (
    <svg {...base(p)}>
      <rect x="6" y="12" width="36" height="26" rx="2.5" />
      <path d="M7 14l17 13 17-13" />
      <path d="M7 37l12-11M41 37 29 26" />
      <path d="M24 31.5c-1.4-1.6-4-1.4-4 .8 0 1.8 2.3 3.2 4 4.4 1.7-1.2 4-2.6 4-4.4 0-2.2-2.6-2.4-4 -.8z" fill="currentColor" stroke="none" opacity=".75" />
    </svg>
  );
}

export function PhotosIcon(p: P) {
  return (
    <svg {...base(p)}>
      <rect x="6" y="14" width="26" height="22" rx="1.5" transform="rotate(-10 19 25)" />
      <rect x="16" y="12" width="26" height="24" rx="1.5" transform="rotate(8 29 24)" />
      <path d="M19 31l6-6 5 4 3-3 7 6" transform="rotate(8 29 24)" />
      <circle cx="35" cy="19" r="2" transform="rotate(8 29 24)" />
    </svg>
  );
}

export const eventIcons: Record<WeddingEventId, (p: P) => React.JSX.Element> = {
  lagan: RingsIcon,
  baraat: HorseIcon,
  vidaai: BirdsIcon,
};

/* ---------- small scene illustrations for the celebration cards ---------- */

export function ThaliIllustration(p: P) {
  return (
    <svg viewBox="0 0 120 70" fill="none" aria-hidden="true" {...p}>
      <ellipse cx="60" cy="52" rx="52" ry="12" fill="#E8D3B0" stroke="#C49A63" strokeWidth="1.5" />
      <ellipse cx="60" cy="50" rx="42" ry="8" fill="#F4E6CC" stroke="#C49A63" strokeWidth="1" />
      <path d="M44 48c0-6 6-10 16-10s16 4 16 10" fill="#F6D58C" stroke="#C49A63" />
      {[48, 56, 64, 72].map((x, i) => (
        <circle key={x} cx={x} cy={44 - (i % 2) * 2} r="3" fill={i % 2 ? "#D4B6EE" : "#FFFFFF"} stroke="#C49A63" strokeWidth=".6" />
      ))}
      <path d="M30 46c2-4 8-4 10 0z" fill="#C49A63" />
      <path d="M35 42c-2-3 0-7 0-9 2 3 3 6 0 9z" fill="#FFC861" />
      <path d="M80 46c2-4 8-4 10 0z" fill="#C49A63" />
      <path d="M85 42c-2-3 0-7 0-9 2 3 3 6 0 9z" fill="#FFC861" />
    </svg>
  );
}

export function ParasolIllustration(p: P) {
  return (
    <svg viewBox="0 0 100 110" fill="none" aria-hidden="true" {...p}>
      <path d="M50 18 8 48c8-3 13 3 14 3s6-6 14-3c8-3 13 3 14 3s6-6 14-3c8-3 13 3 14 3s6-6 14-3z" fill="#F7E7C6" stroke="#C49A63" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M50 18 22 51M50 18 36 48M50 18v33M50 18l14 30M50 18l28 33" stroke="#C49A63" strokeWidth=".8" opacity=".7" />
      <path d="M50 10v8M50 51v52" stroke="#B88A50" strokeWidth="2" strokeLinecap="round" />
      <circle cx="50" cy="9" r="3" fill="#C49A63" />
      {[8, 22, 36, 50, 64, 78, 92].map((x) => (
        <g key={x}>
          <path d={`M${x} 49v9`} stroke="#C49A63" strokeWidth=".8" />
          <circle cx={x} cy="60" r="2" fill="#D6B07C" />
        </g>
      ))}
    </svg>
  );
}
