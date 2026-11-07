import Image from "next/image";
import { ArrowRight, MapPin, Navigation } from "lucide-react";
import { images } from "@/lib/assets";
import { venue, venueDirectionsHref, venueEmbedSrc, venueMapHref } from "@/lib/wedding";
import { FloralCluster } from "./decor/FloralCluster";
import { LotusDivider } from "./decor/Ornaments";
import { Reveal } from "./ui/Reveal";

export function Venue() {
  const img = images.venue;
  return (
    <section
      id="venue"
      aria-labelledby="venue-title"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#FBF8FF_0%,#F3ECFA_50%,#FBF8FF_100%)] py-20 sm:py-28"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-10">
        {/* arched photograph */}
        <Reveal from="left" className="relative mx-auto w-full max-w-[460px]">
          <div className="absolute -inset-3 rounded-t-[999px] rounded-b-[28px] border border-gold/50" aria-hidden="true" />
          <div className="group relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[24px] bg-lavender-soft shadow-[0_30px_60px_-30px_rgb(75_23_101/0.55)]">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 460px, 90vw"
              className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-luxe)] group-hover:scale-105"
              style={{ objectPosition: img.focus }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-plum/35 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-lavender opacity-25 mix-blend-soft-light" />
          </div>
          <FloralCluster variant="corner" seed={73} className="absolute -bottom-10 -left-12 w-44 sm:w-52" />
          <FloralCluster variant="sprig" seed={79} className="absolute -top-4 -right-8 w-32" />
        </Reveal>

        {/* details */}
        <Reveal delay={0.15} className="text-center lg:text-left">
          <h2 id="venue-title" className="heading-serif text-[2.6rem] leading-tight sm:text-5xl">
            <span className="script mr-2 text-[0.9em] font-normal not-italic text-plum-soft">The</span>Venue
          </h2>
          <LotusDivider className="mx-auto mt-3 w-52 lg:mx-0" />

          <div className="mt-6 space-y-2">
            <p className="text-[1.6rem] font-semibold text-plum">{venue.name}</p>
            <p className="flex items-start justify-center gap-2 text-[1.12rem] text-ink lg:justify-start">
              <MapPin className="mt-1 size-5 shrink-0 text-gold" strokeWidth={1.6} />
              <span>{venue.address}</span>
            </p>
          </div>
          <p className="mx-auto mt-4 max-w-md text-ink-soft lg:mx-0">{venue.note}</p>

          <div className="relative mx-auto mt-7 max-w-md overflow-hidden rounded-2xl bg-lavender-soft shadow-[0_18px_40px_-24px_rgb(75_23_101/0.5)] ring-1 ring-white lg:mx-0">
            <iframe
              title={`Map showing ${venue.name}`}
              src={venueEmbedSrc()}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-56 w-full border-0 saturate-[0.85] sm:h-64"
            />
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
            <a href={venueDirectionsHref()} target="_blank" rel="noopener noreferrer" className="btn btn-solid group">
              <Navigation className="size-4" strokeWidth={1.8} />
              Get Directions
              <span className="sr-only">(opens Google Maps in a new tab)</span>
            </a>
            <a href={venueMapHref()} target="_blank" rel="noopener noreferrer" className="btn btn-outline group">
              View on Map
              <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.6} />
              <span className="sr-only">(opens Google Maps in a new tab)</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
