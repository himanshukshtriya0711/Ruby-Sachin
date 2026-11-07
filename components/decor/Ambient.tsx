import type { CSSProperties } from "react";
import { cn, r2, seeded } from "@/lib/utils";

/** Gently falling lavender petals. Pure CSS; hidden for reduced-motion users. */
export function Petals({ count = 12, seed = 7, className }: { count?: number; seed?: number; className?: string }) {
  const rnd = seeded(seed);
  const petals = Array.from({ length: count }, () => ({
    left: r2(rnd() * 100),
    size: r2(8 + rnd() * 10),
    delay: r2(-rnd() * 18),
    duration: r2(13 + rnd() * 12),
    drift: r2((rnd() - 0.3) * 160),
    spin: r2(240 + rnd() * 400),
    hue: rnd() > 0.5,
  }));
  return (
    <div aria-hidden="true" className={cn("petal-field pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size * 0.8,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              "--drift": `${p.drift}px`,
              "--spin": `${p.spin}deg`,
              background: p.hue
                ? "linear-gradient(135deg,#FFFFFF,#D9C2F2)"
                : "linear-gradient(135deg,#F4ECFC,#B88FE0)",
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

/** Twinkling gold dust. */
export function GoldParticles({ count = 18, seed = 3, className }: { count?: number; seed?: number; className?: string }) {
  const rnd = seeded(seed);
  const dots = Array.from({ length: count }, () => ({
    left: r2(rnd() * 100),
    top: r2(rnd() * 100),
    size: r2(2 + rnd() * 3.5),
    delay: r2(rnd() * 6),
    duration: r2(3.5 + rnd() * 4),
  }));
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {dots.map((d, i) => (
        <span
          key={i}
          className="sparkle"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
