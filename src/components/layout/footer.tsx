import Link from "next/link";

import { profile } from "@/data/profile";
import { socials } from "@/data/socials";

const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/#about", label: "Datastream" },
  { href: "/#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-accent/15 bg-background/60 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 py-10 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <p className="font-headline text-lg uppercase tracking-widest text-primary">
            {profile.name}
          </p>
          <p className="font-code text-xs text-muted-foreground">
            {profile.title}
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-code text-xs">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-muted-foreground transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex items-center gap-4 font-code text-xs">
          {socials
            .filter((social) => social.href.startsWith("http"))
            .map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-accent"
                >
                  {social.name}
                </a>
              </li>
            ))}
        </ul>
      </div>

      <p className="pb-6 text-center font-code text-[11px] text-muted-foreground/60">
        © {new Date().getFullYear()} {profile.name}. Built with Next.js.
      </p>
    </footer>
  );
}
