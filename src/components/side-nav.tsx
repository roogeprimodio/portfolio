
"use client";

import { UserCircle, Archive, Dna, Send, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "home", icon: UserCircle, label: "Home" },
  { id: "about", icon: FileText, label: "Datastream" },
  { id: "projects", icon: Archive, label: "Projects Vault" },
  { id: "skills", icon: Dna, label: "Skills DNA" },
  { id: "contact", icon: Send, label: "Establish Link" },
];

export function SideNav() {
  const [activeSection, setActiveSection] = useState("home");

  // This effect handles highlighting the active section in the nav
  useEffect(() => {
    // The main element is the scrolling container, not the window
    const mainElement = document.querySelector('main');
    if (!mainElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        root: mainElement, // Important for scrollable containers
        threshold: 0.5 
      }
    );

    const sectionElements = sections.map(s => document.getElementById(s.id)).filter(Boolean);

    sectionElements.forEach((el) => {
      if(el) observer.observe(el);
    });

    return () => {
      sectionElements.forEach((el) => {
        if(el) observer.unobserve(el);
      });
    };
  }, []);

  // This function handles the smooth scroll to the selected section
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Manually update the URL hash for better browser history
      history.pushState(null, '', `#${id}`);
    }
  };


  return (
    <motion.nav
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 3.5 }}
      // Responsive positioning for smaller screens
      className="fixed top-1/2 -translate-y-1/2 left-2 md:left-4 z-50"
    >
      {/* Responsive sizing for the container */}
      <ul className="flex flex-col gap-2 md:gap-4 p-1 md:p-2 rounded-full border border-accent/20 bg-card/50 backdrop-blur-md">
        {sections.map((section) => (
          <li key={section.id}>
            {/* Using <a> with onClick for reliable smooth scroll */}
            <a 
              href={`#${section.id}`} 
              onClick={(e) => handleScroll(e, section.id)}
              // Responsive sizing for the link area
              className="group relative flex cursor-pointer items-center justify-center h-8 w-8 md:h-10 md:w-10"
              aria-label={`Scroll to ${section.label}`}
            >
              <span className={cn(
                  "absolute h-full w-full rounded-full bg-accent transition-all duration-300",
                  activeSection === section.id ? "scale-100 opacity-100" : "scale-0 opacity-0"
              )}></span>
              <section.icon className={cn(
                  // Responsive sizing for the icon
                  "relative z-10 h-4 w-4 md:h-5 md:w-5 transition-colors duration-300 group-hover:text-accent-foreground",
                  activeSection === section.id ? "text-accent-foreground" : "text-accent"
              )} />
              <div className="absolute left-full ml-4 px-3 py-1 rounded-md bg-card border border-accent/20 text-accent font-code text-sm whitespace-nowrap opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none">
                {section.label}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
