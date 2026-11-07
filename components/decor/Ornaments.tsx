import { useId } from "react";
import { cn } from "@/lib/utils";

/** Gold line — diamond — lotus — diamond — line */
export function LotusDivider({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 240 24" className={cn("text-gold", className)} style={style} aria-hidden="true" fill="none">
      <path d="M4 12H88M152 12H236" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M92 12l4-3 4 3-4 3zM140 12l4-3 4 3-4 3z" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round">
        <path d="M120 3c-4 4-4 10 0 15 4-5 4-11 0-15z" />
        <path d="M120 18c-3-6-8-9-12-9 0 5 5 9 12 9zM120 18c3-6 8-9 12-9 0 5-5 9-12 9z" />
        <path d="M120 18c-6-2-12-1-15 2M120 18c6-2 12-1 15 2" />
      </g>
      <circle cx="104" cy="12" r="1.3" fill="currentColor" />
      <circle cx="136" cy="12" r="1.3" fill="currentColor" />
    </svg>
  );
}

/** Small filigree flourish used beside headings and the countdown title. */
export function Flourish({ className, flip }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 160 20"
      className={cn("text-gold", className)}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
      fill="none"
    >
      <path d="M2 10H118" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path
        d="M118 10c6-6 14-6 16 0-2 6-10 6-16 0zm16 0c4-4 10-4 12 0-2 4-8 4-12 0zm12 0h10"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle cx="156" cy="10" r="1.6" fill="currentColor" />
      <circle cx="112" cy="10" r="1.4" fill="currentColor" />
    </svg>
  );
}

/** Tiny sprig used next to the R&S monogram. */
export function Sprig({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 24" className={cn("text-gold", className)} aria-hidden="true" fill="none">
      <path d="M2 22C10 18 18 12 30 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      {[
        [9, 17, -30],
        [15, 13, -40],
        [21, 9, -45],
        [26, 5.5, -50],
      ].map(([x, y, a], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${a})`}>
          <path d="M0 0c2-3 5-3 7 0-2 3-5 3-7 0z" fill="currentColor" opacity="0.8" transform="rotate(-50)" />
          <path d="M0 0c2-3 5-3 7 0-2 3-5 3-7 0z" fill="currentColor" opacity="0.55" transform="rotate(40)" />
        </g>
      ))}
    </svg>
  );
}

/** Hanging Mughal lantern with a soft glow. */
export function Lantern({ className }: { className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  return (
    <svg viewBox="0 0 120 300" className={cn("overflow-visible", className)} aria-hidden="true">
      <defs>
        <radialGradient id={`${id}glow`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFE7B0" stopOpacity="0.85" />
          <stop offset="0.45" stopColor="#FFE2B8" stopOpacity="0.3" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}glass`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#FFF8E8" />
          <stop offset="0.6" stopColor="#FCE6B9" />
          <stop offset="1" stopColor="#F0CF95" />
        </linearGradient>
        <radialGradient id={`${id}flame`} cx="0.5" cy="0.6" r="0.6">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.4" stopColor="#FFE08A" />
          <stop offset="1" stopColor="#F5B451" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="168" r="78" fill={`url(#${id}glow)`} className="animate-glow" />
      <g stroke="#B88A50" strokeWidth="1.6" fill="none">
        <path d="M60 0V58" />
        {[10, 22, 34, 46].map((y) => (
          <ellipse key={y} cx="60" cy={y} rx="2.4" ry="4.5" />
        ))}
      </g>
      <circle cx="60" cy="62" r="4" fill="#C49A63" />
      <path d="M36 94Q60 54 84 94Z" fill="#D6B07C" stroke="#A97B42" strokeWidth="1.2" />
      <rect x="32" y="92" width="56" height="9" rx="2" fill="#C49A63" />
      <path d="M36 101H84L92 142 84 220H36L28 142Z" fill={`url(#${id}glass)`} stroke="#B88A50" strokeWidth="1.6" />
      <path d="M28 142H92M36 101 44 142 36 220M84 101 76 142 84 220" stroke="#C49A63" strokeWidth="1" fill="none" opacity="0.7" />
      <path d="M48 210V156Q48 140 60 130Q72 140 72 156V210" fill="none" stroke="#B88A50" strokeWidth="1.2" />
      <ellipse cx="60" cy="182" rx="9" ry="16" fill={`url(#${id}flame)`} className="animate-flicker" />
      <rect x="32" y="220" width="56" height="9" rx="2" fill="#C49A63" />
      <path d="M40 229H80L60 254Z" fill="#D6B07C" stroke="#A97B42" strokeWidth="1.2" />
      <path d="M60 254V272" stroke="#B88A50" strokeWidth="1.4" />
      <circle cx="60" cy="276" r="4.5" fill="#C49A63" />
    </svg>
  );
}

/** Sheer lavender drape tied back at the side. Mirror it with the `side` prop. */
export function Curtain({ className, side = "left" }: { className?: string; side?: "left" | "right" }) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const tie: [number, number] = [70, 380];
  const tops = [0, 28, 56, 86, 116, 146, 176, 206];
  const bottoms = [0, 22, 44, 70, 96, 124, 150, 178];
  return (
    <svg
      viewBox="0 0 220 820"
      preserveAspectRatio="none"
      className={cn("pointer-events-none", className)}
      style={side === "right" ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}fill`} x1="0" x2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="0.5" stopColor="#EADCF7" stopOpacity="0.8" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id={`${id}fade`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0.7" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id={`${id}m`}>
          <rect width="220" height="820" fill={`url(#${id}fade)`} />
        </mask>
      </defs>
      <g mask={`url(#${id}m)`}>
        <path d="M0 0H220C170 130 110 270 70 380C98 500 128 660 150 820H0Z" fill={`url(#${id}fill)`} />
        <g fill="none" strokeLinecap="round">
          {tops.map((x, i) => (
            <path
              key={i}
              d={`M${x} 0C${x * 0.75} 160 ${tie[0] - 6 + i} 300 ${tie[0] - 10 + i * 2} ${tie[1]}C${tie[0] - 4 + i * 3} 520 ${bottoms[i] * 0.9} 680 ${bottoms[i] * 0.85} 820`}
              stroke={i % 2 ? "#C8A9E8" : "#FFFFFF"}
              strokeOpacity={i % 2 ? 0.45 : 0.9}
              strokeWidth={i % 2 ? 7 : 10}
            />
          ))}
        </g>
      </g>
      <ellipse cx={tie[0]} cy={tie[1]} rx="24" ry="7" fill="#C49A63" opacity="0.9" />
      <path d={`M${tie[0]} ${tie[1] + 6}v34`} stroke="#C49A63" strokeWidth="2" />
      <path d={`M${tie[0] - 6} ${tie[1] + 40}h12l-3 22h-6z`} fill="#D6B07C" />
    </svg>
  );
}

/** Soft, slightly blurred Mughal arcade used behind the hero. */
export function ArchBackdrop({ className }: { className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const arch = (a: number, b: number, s: number, p: number) => {
    const mid = (a + b) / 2;
    const k = p + (s - p) * 0.3;
    return `M${a} 600V${s}Q${a} ${k} ${mid} ${p}Q${b} ${k} ${b} ${s}V600Z`;
  };
  return (
    <svg viewBox="0 0 900 600" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}wall`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="1" stopColor="#F1E8FA" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id={`${id}deep`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#E6D6F5" />
          <stop offset="1" stopColor="#F7F1FD" />
        </linearGradient>
      </defs>
      <rect x="0" y="60" width="900" height="540" fill={`url(#${id}wall)`} />
      {[
        [40, 230],
        [300, 600],
        [670, 860],
      ].map(([a, b], i) => (
        <g key={i}>
          <path d={arch(a, b, i === 1 ? 260 : 300, i === 1 ? 110 : 170)} fill={`url(#${id}deep)`} />
          <path
            d={arch(a - 12, b + 12, i === 1 ? 255 : 295, i === 1 ? 92 : 152)}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="6"
            strokeOpacity="0.9"
          />
          <path
            d={arch(a + 18, b - 18, i === 1 ? 270 : 310, i === 1 ? 140 : 196)}
            fill="none"
            stroke="#D8C3EE"
            strokeWidth="2"
            strokeOpacity="0.8"
          />
        </g>
      ))}
      {[255, 645].map((x) => (
        <g key={x}>
          <rect x={x - 14} y="180" width="28" height="420" fill="#FFFFFF" fillOpacity="0.95" />
          <rect x={x - 20} y="170" width="40" height="14" fill="#F3EBFB" />
          <rect x={x - 20} y="580" width="40" height="20" fill="#F3EBFB" />
        </g>
      ))}
      <path d="M0 64H900" stroke="#E2D2F2" strokeWidth="3" />
      <path d="M0 80H900" stroke="#FFFFFF" strokeWidth="6" />
    </svg>
  );
}
