
'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ProjectsSection } from "@/components/projects-section";
import { SkillsSection } from "@/components/skills-section";
import { ContactSection } from "@/components/contact-section";
import { SideNav } from "@/components/side-nav";
import { OpeningAnimation } from '@/components/opening-animation';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Matches the animation duration

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <OpeningAnimation />}
      </AnimatePresence>
      
      <div className="relative">
        <div className="absolute inset-0 -z-20 h-full w-full bg-background bg-[radial-gradient(hsl(var(--accent)/0.05)_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-background"></div>
        
        <SideNav />
        <main className="h-screen w-screen overflow-y-auto overflow-x-hidden" style={{ scrollSnapType: 'y mandatory' }}>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <ContactSection />
        </main>
      </div>
    </>
  );
}
