
'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

import { HeroSection } from "@/components/hero-section";
import { SideNav } from "@/components/side-nav";
import { OpeningAnimation } from '@/components/opening-animation';

const AboutSection = dynamic(() => import('@/components/about-section').then(mod => mod.AboutSection), {
  loading: () => <section className="min-h-screen" />,
});
const ProjectsSection = dynamic(() => import('@/components/projects-section').then(mod => mod.ProjectsSection), {
  loading: () => <section className="min-h-screen" />,
});
const SkillsSection = dynamic(() => import('@/components/skills-section').then(mod => mod.SkillsSection), {
  loading: () => <section className="min-h-screen" />,
});
const ContactSection = dynamic(() => import('@/components/contact-section').then(mod => mod.ContactSection), {
  loading: () => <section className="min-h-screen" />,
});


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
        <main className="h-screen w-screen overflow-y-auto overflow-x-hidden">
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
