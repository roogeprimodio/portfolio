
"use client";

import { UserCircle, Archive, Dna, Send, FileText, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { ResumeModal } from "./resume-modal";


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
        <li key={section.id} className="relative">
          <a
            href={`#${section.id}`}
            onClick={(e) => handleScrollTo(e, section.id)}
            className={cn(
              "group relative flex cursor-pointer items-center justify-center h-10 w-10 rounded-lg",
              "transition-colors duration-200 hover:bg-accent/50"
            )}
            aria-label={section.label}
          >
            {activeSection === section.id && (
              <motion.span
                layoutId="active-nav-indicator"
                className="absolute inset-0 z-10 rounded-lg bg-accent shadow-[0_0_10px_hsl(var(--accent)/0.5)]"
                initial={false}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <section.icon className={cn(
              "relative z-20 h-5 w-5 transition-colors duration-200",
              activeSection === section.id ? "text-accent-foreground" : "text-accent group-hover:text-primary"
            )} />
            
            <div className="absolute left-full ml-4 px-3 py-1.5 rounded-md bg-card border border-accent/20 text-accent font-code text-sm whitespace-nowrap opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none z-30">
              {section.label}
            </div>
          </a>
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
        <ul className="relative flex flex-col items-center gap-2 p-2 rounded-xl border border-accent/20 bg-card/50 backdrop-blur-md">
          <li>
            <ResumeModal>
               <div className="group relative flex cursor-pointer items-center justify-center h-10 w-10 rounded-lg transition-colors duration-200 hover:bg-accent/50" title="Preview & Download Resume">
                  <LogoIcon className="h-6 w-6 text-primary" />
               </div>
            </ResumeModal>
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
                  <ResumeModal>
                    <div className="group relative flex cursor-pointer items-center justify-center h-10 w-10 rounded-lg transition-colors hover:bg-accent" title="Preview & Download Resume">
                      <LogoIcon className={cn(
                          "h-6 w-6 text-primary transition-colors duration-300 group-hover:text-accent-foreground"
                      )} />
                    </div>
                  </ResumeModal>
                </li>
                <li className="w-full px-2"><div className="h-px w-full bg-accent/20"></div></li>
                {sections.map((section) => (
                    <li key={section.id}>
                    <a
                        href={`#${section.id}`}
                        onClick={(e) => handleScrollTo(e, section.id)}
                        className={cn(
                            "group relative flex cursor-pointer items-center justify-center h-10 w-10 rounded-lg transition-colors hover:bg-accent",
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
