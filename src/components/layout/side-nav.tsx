"use client";

import { UserCircle, Archive, Dna, Send, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";
import { ThemeToggle } from "./theme-toggle";
import { ResumeModal } from "@/components/resume/resume-modal";

const sections = [
  { id: "home", icon: UserCircle, label: "Home" },
  { id: "about", icon: FileText, label: "Datastream" },
  { id: "projects", icon: Archive, label: "Projects Vault" },
  { id: "skills", icon: Dna, label: "Skills DNA" },
  { id: "contact", icon: Send, label: "Establish Link" },
];

const LogoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 100 100" className="text-primary">
    <path
      d="M 10 50 Q 50 10 90 50"
      stroke="currentColor"
      strokeWidth="10"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M 10 50 Q 50 90 90 50"
      stroke="currentColor"
      strokeWidth="10"
      fill="none"
      strokeLinecap="round"
    />
    <circle cx="50" cy="50" r="15" fill="currentColor" />
  </svg>
);

export function SideNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [activeSection, setActiveSection] = useState("home");

  // Scrollspy only makes sense on the one-pager. On /projects and detail pages
  // the nav degrades to plain links back to the homepage anchors.
  useEffect(() => {
    if (!isHome) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) setActiveSection(visible[0].target.id);
      },
      // root: null — the document scrolls now, not a nested overflow container.
      { threshold: 0.4 },
    );

    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [isHome]);

  const handleScroll = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    if (!isHome) return; // let Next handle cross-route navigation
    event.preventDefault();

    const target = document.getElementById(id);
    if (!target) return;

    // Lenis owns the scroll position when it is running; calling
    // scrollIntoView as well would make the two fight.
    if (window.__lenis) {
      window.__lenis.scrollTo(target, { offset: 0 });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    history.pushState(null, "", `#${id}`);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="fixed left-2 top-1/2 z-50 hidden -translate-y-1/2 print:hidden md:left-4 md:flex"
    >
      <ul className="flex flex-col items-center gap-2 rounded-full border border-accent/20 bg-card/50 p-1.5 backdrop-blur-md">
        <li>
          <ResumeModal>
            <button
              type="button"
              className="group relative flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-accent/15 md:h-10 md:w-10"
              title="Preview and download resume"
              aria-label={`${profile.name} — resume`}
            >
              <LogoIcon />
              <span className="pointer-events-none absolute left-full ml-4 -translate-x-4 whitespace-nowrap rounded-md border border-accent/20 bg-card px-3 py-1 font-code text-sm text-accent opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
                Resume
              </span>
            </button>
          </ResumeModal>
        </li>

        <li className="w-full px-2">
          <div className="h-px w-full bg-accent/20" />
        </li>

        {sections.map((section) => {
          const href = isHome ? `#${section.id}` : `/#${section.id}`;
          const isActive = isHome && activeSection === section.id;

          return (
            <li key={section.id}>
              <motion.div
                animate={{ x: isActive ? 4 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Link
                  href={href}
                  onClick={(event) => handleScroll(event, section.id)}
                  aria-current={isActive ? "true" : undefined}
                  className="group relative flex h-8 w-8 cursor-pointer items-center justify-center md:h-10 md:w-10"
                  aria-label={`Go to ${section.label}`}
                >
                  <span
                    className={cn(
                      "absolute h-full w-full rounded-full bg-accent transition-all duration-300",
                      isActive ? "scale-100 opacity-100" : "scale-0 opacity-0",
                    )}
                  />

                  <motion.div
                    animate={{ scale: isActive ? 1.25 : 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative z-10"
                  >
                    <section.icon
                      className={cn(
                        "relative z-10 h-4 w-4 transition-colors duration-300 group-hover:text-accent-foreground md:h-5 md:w-5",
                        isActive ? "text-accent-foreground" : "text-accent",
                      )}
                    />
                  </motion.div>

                  <span className="pointer-events-none absolute left-full ml-4 -translate-x-4 whitespace-nowrap rounded-md border border-accent/20 bg-card px-3 py-1 font-code text-sm text-accent opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
                    {section.label}
                  </span>
                </Link>
              </motion.div>
            </li>
          );
        })}

        <li className="w-full px-2">
          <div className="h-px w-full bg-accent/20" />
        </li>
        <li>
          <ThemeToggle />
        </li>
      </ul>
    </motion.nav>
  );
}
