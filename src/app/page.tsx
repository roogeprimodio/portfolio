
'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

import { HeroSection } from "@/components/hero-section";
import { SideNav } from "@/components/side-nav";

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
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div 
      className={cn(
        "relative",
        mounted && (resolvedTheme === 'dark' ? 'font-body-dark' : 'font-body')
      )}
    >
      <div className="absolute inset-0 -z-20 h-full w-full bg-background bg-[radial-gradient(hsl(var(--accent)/0.05)_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-background"></div>
      
      <SideNav />
      <main className="h-screen w-screen overflow-y-auto overflow-x-hidden scrollbar-hide">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
    </div>
  );
}
