import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Great_Vibes, Lato } from "next/font/google";
import { Providers } from "@/components/Providers";
import { couple, siteUrl } from "@/lib/wedding";
import "./globals.css";

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
});

const names = `${couple.bride} & ${couple.groom}`;
const description = `Together with their families, ${names} invite you to celebrate their wedding — Lagan & Sagai on 07 December, Baraat on 11 December and Vidaai on 12 December 2026.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${names} · Wedding Invitation`,
  description,
  applicationName: `${names} Wedding`,
  keywords: ["Ruby and Sachin", "wedding invitation", "Indian wedding", "Baraat", "Lagan", "Sagai", "Vidaai", "RSVP"],
  openGraph: {
    type: "website",
    url: "/",
    siteName: `${names} Wedding`,
    title: `${names} · You're invited`,
    description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${names} · You're invited`,
    description,
  },
  alternates: { canonical: "/" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#E9DDF5",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${greatVibes.variable} ${cormorant.variable} ${lato.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Skip the envelope intro (before first paint) if it was already opened this session. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("rs-intro-opened"))document.documentElement.classList.add("intro-done")}catch(e){}`,
          }}
        />
        <noscript>
          <style>{`#intro{display:none!important}.rise,.hero-photo,.hero-fade,.write{animation-play-state:running!important}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="fixed top-2 left-2 z-[100] -translate-y-20 rounded-full bg-plum px-4 py-2 font-sans text-sm text-white transition focus:translate-y-0"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
