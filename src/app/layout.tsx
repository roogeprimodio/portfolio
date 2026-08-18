import type { Metadata, Viewport } from "next";
import {
  Cinzel,
  PT_Sans,
  Playfair_Display,
  Raleway,
  Source_Code_Pro,
} from "next/font/google";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SideNav } from "@/components/layout/side-nav";
import { Footer } from "@/components/layout/footer";
import { Analytics } from "@/components/layout/analytics";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { profile } from "@/data/profile";
import { siteConfig } from "@/lib/site";

// Self-hosted at build time: no render-blocking request to Google, no layout
// shift, and the CSS variables feed straight into tailwind.config.ts.
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body-dark",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-headline-dark",
  display: "swap",
});

// The light theme gets its own voice — Playfair Display and PT Sans, the
// pairing from the original brief in docs/blueprint.md. Cinzel's engraved
// capitals belong to the dark theme; on paper they read as heavy.
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-headline-light",
  display: "swap",
});

const ptSans = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body-light",
  display: "swap",
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-code",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s // ${profile.name.toUpperCase()}`,
  },
  description: profile.seoDescription,
  keywords: [
    profile.name,
    ...profile.alternateNames,
    `${profile.name} portfolio`,
    `${profile.name} developer`,
    "portfolio",
    "full stack developer",
    "Flutter developer",
    "Next.js",
    "React",
  ],
  authors: [{ name: profile.name, url: siteConfig.url }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: profile.seoDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: profile.seoDescription,
    creator: "@jagdishodedara0",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
  // Set GOOGLE_SITE_VERIFICATION once Search Console gives you the token.
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f1e8" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b12" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // next-themes writes the class on the client before paint; React would
      // otherwise flag the server/client mismatch on <html>.
      suppressHydrationWarning
      className={`${raleway.variable} ${cinzel.variable} ${sourceCodePro.variable} ${playfair.variable} ${ptSans.variable}`}
    >
      <body className="font-body antialiased">
        <ThemeProvider>
        {/* Ambient background, fixed so it survives normal document scroll. */}
        <div
          aria-hidden
          className="fixed inset-0 -z-20 h-full w-full bg-background bg-[radial-gradient(hsl(var(--grid-dot)/var(--grid-dot-alpha))_1px,transparent_1px)] [background-size:16px_16px]"
        />
        <div
          aria-hidden
          className="fixed inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-background"
        />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:border focus:border-accent focus:bg-card focus:px-4 focus:py-2 focus:font-code focus:text-accent"
        >
          Skip to content
        </a>

        <SmoothScroll />
        <SideNav />

        {/* The nav rail is desktop-only, so mobile needs its own toggle. */}
        <div className="fixed right-3 top-3 z-50 rounded-full border border-accent/20 bg-card/60 backdrop-blur-md md:hidden">
          <ThemeToggle />
        </div>
        <main id="main">{children}</main>
        <Footer />
        <Toaster />
        <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
