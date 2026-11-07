import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Flourish } from "@/components/decor/Ornaments";
import { Reveal } from "./Reveal";

/** Centered serif heading framed by gold flourishes, as in "~ Rituals & Celebrations ~". */
export function SectionHeading({
  id,
  children,
  eyebrow,
  subtitle,
  className,
}: {
  id: string;
  children: ReactNode;
  eyebrow?: string;
  subtitle?: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={cn("text-center", className)}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <div className="flex items-center justify-center gap-3 sm:gap-5">
        <Flourish flip className="hidden w-20 shrink-0 sm:block md:w-36" />
        <h2 id={id} className="heading-serif text-[2.1rem] leading-tight sm:text-5xl">
          {children}
        </h2>
        <Flourish className="hidden w-20 shrink-0 sm:block md:w-36" />
      </div>
      {subtitle && <p className="mx-auto mt-4 max-w-xl text-lg text-ink-soft">{subtitle}</p>}
    </Reveal>
  );
}
