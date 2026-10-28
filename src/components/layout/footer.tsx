import Link from "next/link";
import {
  Archive,
  Dna,
  FileBadge,
  FileText,
  Mail,
  MapPin,
  Send,
  UserCircle,
  type LucideIcon,
} from "lucide-react";

import { profile } from "@/data/profile";
import { socials } from "@/data/socials";
import type { Availability } from "@/data/schema";
import { iconFor } from "./social-icons";

/**
 * Footer as the site's status bar: identity and location on the left, the
 * section index in the middle, external channels on the right, and a thin
 * telemetry strip along the bottom. Same mono labels, hairlines and bracketed
 * tags as the project cards so it reads as part of the same instrument.
 */

const SECTIONS: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/", label: "Home", icon: UserCircle },
  { href: "/#about", label: "Datastream", icon: FileText },
  { href: "/projects", label: "Projects Vault", icon: Archive },
  { href: "/#skills", label: "Skills DNA", icon: Dna },
  { href: "/#contact", label: "Establish Link", icon: Send },
  { href: "/resume", label: "Resume", icon: FileBadge },
];

const AVAILABILITY: Record<Availability, { label: string; dot: string }> = {
  open: {
    label: "Open for work",
    dot: "bg-emerald-600 dark:bg-emerald-400 dark:shadow-[0_0_6px] dark:shadow-emerald-400/70",
  },
  selective: {
    label: "Selectively available",
    dot: "bg-amber-600 dark:bg-amber-400 dark:shadow-[0_0_6px] dark:shadow-amber-400/70",
  },
  closed: {
    label: "Not available",
    dot: "bg-slate-500 dark:bg-slate-400",
  },
};

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 flex items-center gap-2 font-code text-[10px] uppercase tracking-[0.25em] text-primary/60 dark:text-accent/60">
      <span aria-hidden className="h-px w-4 bg-current" />
      {children}
    </p>
  );
}

export function Footer() {
  const availability = AVAILABILITY[profile.availability];
  const external = socials.filter((social) => social.href.startsWith("http"));
  const direct = socials.filter((social) => !social.href.startsWith("http"));

  return (
    <footer className="relative border-t print:hidden border-primary/20 bg-background/80 backdrop-blur-sm dark:border-accent/15">
      {/* Corner ticks, matching the brand tiles on the cards. */}
      <span aria-hidden className="absolute left-4 top-0 h-2 w-2 border-l border-t border-primary/40 dark:border-accent/40" />
      <span aria-hidden className="absolute right-4 top-0 h-2 w-2 border-r border-t border-primary/40 dark:border-accent/40" />

      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.3fr_1fr_1fr] md:gap-8 md:pl-24 2xl:pl-6">
        {/* Identity */}
        <div>
          <Link
            href="/"
            className="font-headline text-xl uppercase tracking-widest text-primary transition-colors hover:text-accent"
          >
            {profile.name}
          </Link>
          <p className="mt-1 font-code text-xs text-muted-foreground">
            <span className="text-accent/70">&gt; </span>
            {profile.title}
          </p>

          <ul className="mt-5 space-y-2 font-code text-xs text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className={`h-1.5 w-1.5 rounded-full ${availability.dot}`} />
              <span className="uppercase tracking-widest">{availability.label}</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-accent/70" aria-hidden />
              <span>{profile.location}</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 shrink-0 text-accent/70" aria-hidden />
              <a
                href={`mailto:${profile.email}`}
                className="transition-colors hover:text-accent"
              >
                {profile.email}
              </a>
            </li>
            {direct.map((social) => {
              const Icon = iconFor(social.icon);
              return (
                <li key={social.name} className="flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5 shrink-0 text-accent/70" aria-hidden />
                  <a href={social.href} className="transition-colors hover:text-accent">
                    {social.href.replace(/^tel:/, "")}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Section index */}
        <nav aria-label="Footer">
          <Heading>Index</Heading>
          <ul className="space-y-2.5 font-code text-xs">
            {SECTIONS.map((section, index) => (
              <li key={section.href}>
                <Link
                  href={section.href}
                  className="group flex items-center gap-3 text-muted-foreground transition-colors hover:text-accent"
                >
                  <span className="w-5 text-[10px] tabular-nums text-primary/40 dark:text-accent/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <section.icon
                    className="h-3.5 w-3.5 shrink-0 text-accent/60 transition-colors group-hover:text-accent"
                    aria-hidden
                  />
                  <span className="uppercase tracking-widest">{section.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Channels */}
        <div>
          <Heading>Channels</Heading>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-2">
            {external.map((social) => {
              const Icon = iconFor(social.icon);
              return (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2.5 rounded-sm border border-primary/20 bg-card/60 px-3 py-2 font-code text-[11px] uppercase tracking-widest text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-[3px_3px_0_0_hsl(var(--accent)/0.9)] dark:border-accent/15 dark:bg-card/40 dark:hover:shadow-[0_0_16px_-4px_hsl(var(--accent)/0.5)]"
                  >
                    <Icon className="h-4 w-4 shrink-0" aria-hidden />
                    <span>{social.name}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Telemetry strip */}
      <div className="border-t border-primary/15 dark:border-accent/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-2 px-6 py-4 font-code text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70 md:flex-row md:justify-between md:pl-24 2xl:pl-6">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span className="flex items-center gap-3">
            <span>[Next.js]</span>
            <span>[Vercel]</span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 dark:shadow-[0_0_6px] dark:shadow-emerald-400/70" />
              SYS.OK
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
