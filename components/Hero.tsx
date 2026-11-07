import Image from "next/image";
import { ChevronDown } from "lucide-react";
import type { CSSProperties } from "react";
import { images } from "@/lib/assets";
import { couple } from "@/lib/wedding";
import { ArchBackdrop, Curtain, Lantern, LotusDivider } from "./decor/Ornaments";
import { FloralCluster } from "./decor/FloralCluster";
import { GoldParticles, Petals } from "./decor/Ambient";
import { ParallaxScope } from "./ui/ParallaxScope";
import { GuestGreeting } from "./GuestGreeting";

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

export function Hero() {
  const { hero } = images;
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-[radial-gradient(120%_80%_at_70%_20%,#FFFFFF_0%,#F4EEFB_45%,#E9DDF5_100%)]"
    >
      <ParallaxScope className="relative min-h-[100svh] lg:min-h-[max(100svh,780px)]">
        {/* soft palace arcade */}
        <div data-speed="0.08" className="absolute inset-0 -z-10">
          <ArchBackdrop className="absolute inset-x-0 bottom-0 h-[92%] w-full opacity-70 blur-[1.5px]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0)_30%,rgba(233,221,245,0.4)_100%)]" />
        </div>

        {/* couple photograph */}
        <div data-speed="0.16" className="absolute top-14 right-0 h-[60svh] w-full sm:h-[66svh] lg:top-0 lg:right-[4%] lg:h-full lg:w-[55%]">
          <div className="hero-photo h-full w-full">
            <div className="relative h-full w-full [mask-image:linear-gradient(to_bottom,#000_58%,transparent_98%)] lg:[mask-image:linear-gradient(to_right,transparent_0%,#000_16%,#000_88%,transparent_100%)]">
              <div className="relative h-full w-full lg:[mask-image:linear-gradient(to_bottom,#000_72%,transparent_100%)]">
                <Image
                  src={hero.src}
                  alt={hero.alt}
                  fill
                  preload
                  placeholder="blur"
                  sizes="(min-width: 1024px) 56vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: hero.focus }}
                />
                {/* blend the photo's backdrop into the lavender palette */}
                <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_48%_36%,transparent_40%,rgba(236,226,248,0.82)_100%)]" />
                <div className="absolute inset-0 bg-lavender opacity-35 mix-blend-soft-light" />
              </div>
            </div>
          </div>
        </div>

        {/* drapes, lantern and florals */}
        <div data-speed="-0.04" className="pointer-events-none absolute top-0 left-0 h-[62%] w-[20%] opacity-90 sm:w-[20%] lg:h-[94%] lg:w-[19%] lg:opacity-100">
          <Curtain className="animate-curtain h-full w-full origin-top" />
        </div>
        <div data-speed="-0.02" className="pointer-events-none absolute top-0 right-0 h-[46%] w-[15%] opacity-75 sm:w-[14%] lg:h-[84%] lg:w-[11%] lg:opacity-90">
          <Curtain side="right" className="animate-curtain h-full w-full origin-top [animation-delay:-4s]" />
        </div>
        <div className="pointer-events-none absolute top-[40px] left-[19%] w-10 sm:left-[14%] sm:w-14 lg:top-[48px] lg:left-[17%] lg:w-[74px]">
          <div className="animate-sway origin-top">
            <Lantern className="hero-fade h-auto w-full" />
          </div>
        </div>
        <FloralCluster
          variant="cascade"
          seed={11}
          className="hero-fade absolute -top-3 -left-4 w-[48%] max-w-[230px] sm:max-w-[300px] lg:w-[27%] lg:max-w-[420px]"
        />
        <FloralCluster
          variant="corner"
          seed={23}
          flipX
          className="hero-fade absolute right-[-18px] top-[30svh] w-[36%] max-w-[220px] sm:top-[44svh] lg:top-auto lg:bottom-[4%] lg:w-[24%] lg:max-w-[360px]"
        />
        <FloralCluster
          variant="corner"
          seed={5}
          className="hero-fade absolute bottom-0 -left-6 hidden w-[20%] max-w-[260px] lg:block"
        />

        <Petals count={10} seed={4} />
        <GoldParticles count={16} seed={9} className="lg:left-[45%]" />

        {/* invitation copy */}
        <div className="relative z-10 grid min-h-[100svh] lg:min-h-[max(100svh,780px)] lg:grid-cols-2">
          <div
            data-fade
            className="flex flex-col items-center justify-end px-6 pt-[50svh] pb-40 text-center sm:pb-44 lg:justify-center lg:pt-20 lg:pb-32 lg:pl-[14%] lg:pr-0"
          >
            <GuestGreeting />
            <p className="rise eyebrow text-[0.72rem] sm:text-[0.8rem]" style={d(0.15)}>
              Together with their families
            </p>
            <h1
              id="hero-title"
              className="script mt-2 text-[clamp(3.2rem,15vw,4.6rem)] leading-[1.1] whitespace-nowrap text-plum drop-shadow-[0_2px_12px_rgba(255,255,255,0.9)] sm:text-[6rem] lg:mt-4 lg:text-[6.4rem] xl:text-[7.4rem]"
            >
              <span className="write inline-block" style={d(0.3)}>
                {couple.bride}
              </span>
              <span className="rise mx-2 inline-block align-[0.08em] text-[0.55em] text-plum-soft" style={d(1.2)}>
                &amp;
              </span>
              <span className="write inline-block" style={d(1.35)}>
                {couple.groom}
              </span>
            </h1>
            <LotusDivider className="rise mt-2 w-56 sm:w-64" style={d(2.4)} />
            <p
              className="rise eyebrow mt-4 max-w-[19rem] text-[0.82rem] leading-[1.9] sm:max-w-[22rem] sm:text-[0.9rem]"
              style={d(2.55)}
            >
              Invite you to celebrate
              <br />
              their wedding
            </p>
            <a href="#events" className="rise btn btn-outline group mt-7 px-8" style={d(2.75)}>
              Explore Our Celebration
              <ChevronDown className="size-4 transition-transform duration-500 group-hover:translate-y-0.5" strokeWidth={1.6} />
            </a>
          </div>
        </div>
      </ParallaxScope>
    </section>
  );
}
