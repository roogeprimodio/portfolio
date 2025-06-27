
"use client";

import { UserCircle, Archive, Dna, Send, FileText, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";


const sections = [
  { id: "home", icon: UserCircle, label: "Home" },
  { id: "about", icon: FileText, label: "Datastream" },
  { id: "projects", icon: Archive, label: "Projects Vault" },
  { id: "skills", icon: Dna, label: "Skills DNA" },
  { id: "contact", icon: Send, label: "Establish Link" },
];

const LogoIcon = ({ className }: { className?: string }) => (
    <svg width="24" height="24" viewBox="0 0 100 100" className={className}>
        <path d="M 10 50 Q 50 10 90 50" stroke="currentColor" strokeWidth="10" fill="none" strokeLinecap="round" />
        <path d="M 10 50 Q 50 90 90 50" stroke="currentColor" strokeWidth="10" fill="none" strokeLinecap="round" />
        <circle cx="50" cy="50" r="15" fill="currentColor" />
    </svg>
)

export function SideNav() {
  const [activeSection, setActiveSection] = useState("home");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // This effect handles highlighting the active section in the nav
  useEffect(() => {
    const mainElement = document.querySelector('main');
    if (!mainElement) return;

    const handleScroll = () => {
      const scrollPosition = mainElement.scrollTop;
      const offset = mainElement.clientHeight / 2;
      let currentSectionId = '';

      for (const section of sections) {
          const element = document.getElementById(section.id);
          // element.offsetTop gives the distance of the element's top border
          // relative to the top of the offsetParent node.
          if (element && element.offsetTop <= scrollPosition + offset) {
              currentSectionId = section.id;
          } else {
            // break the loop once we've passed the current section
            break;
          }
      }
      setActiveSection(currentSectionId || 'home');
    };

    mainElement.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Call on mount to set initial state

    return () => {
      mainElement.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // This function handles the smooth scroll to the selected section
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsPopoverOpen(false); // Close mobile popover on click
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
            onClick={(e) => handleScrollTo(e, section.id)}
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
            <Button variant="ghost" size="icon" className="h-8 w-8 md:h-10 md:w-10 flex items-center justify-center cursor-pointer" title="JAGDISH ODEDARA">
                <LogoIcon className="h-6 w-6 text-primary" />
            </Button>
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
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-card/50 backdrop-blur-md border border-accent/20 text-accent">
              <Menu className="h-6 w-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent side="bottom" align="end" className="w-auto p-2 rounded-xl border border-accent/20 bg-card/50 backdrop-blur-md">
             <ul className="flex flex-col items-center gap-2">
                <li>
                  <Button variant="ghost" size="icon" className="group relative flex cursor-pointer items-center justify-center h-10 w-10 rounded-full transition-colors hover:bg-accent" title="JAGDISH ODEDARA">
                    <LogoIcon className={cn(
                        "h-6 w-6 text-primary transition-colors duration-300 group-hover:text-accent-foreground"
                    )} />
                  </Button>
                </li>
                <li className="w-full px-2"><div className="h-px w-full bg-accent/20"></div></li>
                {sections.map((section) => (
                    <li key={section.id}>
                    <a
                        href={`#${section.id}`}
                        onClick={(e) => handleScrollTo(e, section.id)}
                        className={cn(
                            "group relative flex cursor-pointer items-center justify-center h-10 w-10 rounded-full transition-colors hover:bg-accent",
                            activeSection === section.id && "bg-accent"
                        )}
                        aria-label={section.label}
                    >
                        <section.icon className={cn(
                            "h-5 w-5 transition-colors duration-300 group-hover:text-accent-foreground",
                            activeSection === section.id ? "text-accent-foreground" : "text-accent"
                        )} />
                    </a>
                    </li>
                ))}
                <li className="w-full px-2"><div className="h-px w-full bg-accent/20"></div></li>
                <li><ThemeToggle /></li>
            </ul>
          </PopoverContent>
        </Popover>
      </motion.div>
    </>
  );
}
