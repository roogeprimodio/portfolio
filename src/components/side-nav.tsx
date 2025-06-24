"use client";

import Link from "next/link";
import { UserCircle, Archive, Dna, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "home", icon: UserCircle, label: "Home" },
  { id: "projects", icon: Archive, label: "Projects Vault" },
  { id: "skills", icon: Dna, label: "Skills DNA" },
  { id: "contact", icon: Send, label: "Establish Link" },
];

export function SideNav() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
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


  return (
    <motion.nav
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 3.5 }}
      className="fixed top-1/2 -translate-y-1/2 left-4 z-50"
    >
      <ul className="flex flex-col gap-4 p-2 rounded-full border border-accent/20 bg-card/50 backdrop-blur-md">
        {sections.map((section) => (
          <li key={section.id}>
            <Link href={`#${section.id}`} scroll={false} className="group relative flex items-center justify-center h-10 w-10">
              <span className={cn(
                  "absolute h-full w-full rounded-full bg-accent transition-all duration-300",
                  activeSection === section.id ? "scale-100 opacity-100" : "scale-0 opacity-0"
              )}></span>
              <section.icon className={cn(
                  "relative z-10 h-5 w-5 transition-colors duration-300 group-hover:text-accent-foreground",
                  activeSection === section.id ? "text-accent-foreground" : "text-accent"
              )} />
              <div className="absolute left-full ml-4 px-3 py-1 rounded-md bg-card border border-accent/20 text-accent font-code text-sm whitespace-nowrap opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none">
                {section.label}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
