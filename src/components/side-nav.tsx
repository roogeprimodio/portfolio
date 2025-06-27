"use client";

import { UserCircle, Archive, Dna, Send, FileText, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { Button } from "./ui/button";

const sections = [
  { id: "home", icon: UserCircle, label: "Home" },
  { id: "about", icon: FileText, label: "Datastream" },
  { id: "projects", icon: Archive, label: "Projects Vault" },
  { id: "skills", icon: Dna, label: "Skills DNA" },
  { id: "contact", icon: Send, label: "Establish Link" },
];

const LogoIcon = () => (
    <svg width="24" height="24" viewBox="0 0 100 100" className="text-primary">
        <path d="M 10 50 Q 50 10 90 50" stroke="currentColor" strokeWidth="10" fill="none" strokeLinecap="round" />
        <path d="M 10 50 Q 50 90 90 50" stroke="currentColor" strokeWidth="10" fill="none" strokeLinecap="round" />
        <circle cx="50" cy="50" r="15" fill="currentColor" />
    </svg>
)

export function SideNav() {
  const [activeSection, setActiveSection] = useState("home");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // This effect handles highlighting the active section in the nav
  useEffect(() => {
    const mainElement = document.querySelector('main');
    if (!mainElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        
        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      { 
        root: mainElement,
        threshold: 0.4, // A section is considered "visible" if 40% of it is in the viewport.
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
    setIsSheetOpen(false); // Close mobile sheet on click
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      history.pushState(null, '', `#${id}`);
    }
  };

  const navContent = (
    <>
      {sections.map((section) => (
        <li key={section.id}>
          <motion.a 
            href={`#${section.id}`} 
            onClick={(e) => handleScroll(e, section.id)}
            animate={{ x: activeSection === section.id ? 4 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group relative flex cursor-pointer items-center justify-center h-8 w-8 md:h-10 md:w-10"
            aria-label={`Scroll to ${section.label}`}
          >
            <span className={cn(
                "absolute h-full w-full rounded-full bg-accent transition-all duration-300",
                activeSection === section.id ? "scale-100 opacity-100" : "scale-0 opacity-0"
            )}></span>
            
            <motion.div
              animate={{ scale: activeSection === section.id ? 1.25 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative z-10"
            >
              <section.icon className={cn(
                  "relative z-10 h-4 w-4 md:h-5 md:w-5 transition-colors duration-300 group-hover:text-accent-foreground",
                  activeSection === section.id ? "text-accent-foreground" : "text-accent"
              )} />
            </motion.div>

            <div className="absolute left-full ml-4 px-3 py-1 rounded-md bg-card border border-accent/20 text-accent font-code text-sm whitespace-nowrap opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none">
              {section.label}
            </div>
          </motion.a>
        </li>
      ))}
    </>
  );


  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 3.5 }}
        className="hidden md:flex fixed top-1/2 -translate-y-1/2 left-2 md:left-4 z-50"
      >
        <ul className="flex flex-col items-center gap-2 p-1.5 rounded-full border border-accent/20 bg-card/50 backdrop-blur-md">
          <li>
            <div className="h-8 w-8 md:h-10 md:w-10 flex items-center justify-center cursor-default" title="JAGDISH ODEDARA">
                <LogoIcon />
            </div>
          </li>
          <li className="w-full px-2"><div className="h-px w-full bg-accent/20"></div></li>
          {navContent}
          <li className="w-full px-2"><div className="h-px w-full bg-accent/20"></div></li>
          <li><ThemeToggle /></li>
        </ul>
      </motion.nav>

      {/* Mobile Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 3.5 }}
        className="md:hidden fixed top-4 right-4 z-50"
      >
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-card/50 backdrop-blur-md border border-accent/20 text-accent">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] bg-card/80 backdrop-blur-lg">
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation Menu</SheetTitle>
              <SheetDescription>
                A list of links to navigate to different sections of the portfolio.
              </SheetDescription>
            </SheetHeader>
             <ul className="flex flex-col items-center gap-4 pt-16">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} onClick={(e) => handleScroll(e, section.id)}
                      className={cn(
                        "flex items-center gap-4 text-lg font-code transition-colors",
                        activeSection === section.id ? "text-primary" : "text-muted-foreground hover:text-primary"
                      )}
                    >
                      <section.icon className="h-5 w-5" />
                      {section.label}
                    </a>
                  </li>
                ))}
                <li className="absolute bottom-8"><ThemeToggle /></li>
              </ul>
          </SheetContent>
        </Sheet>
      </motion.div>
    </>
  );
}
