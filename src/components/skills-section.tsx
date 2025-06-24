
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const skills = [
  "JavaScript", "TypeScript", "Python", "HTML5", "CSS3", "SQL",
  "React", "Next.js", "Node.js", "Express", "Tailwind CSS", "Framer Motion",
  "MongoDB", "PostgreSQL", "Firebase", "MySQL", "Redis",
  "Git", "GitHub", "Docker", "Vercel", "Figma",
];

export function SkillsSection() {
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const numSkills = skills.length;
  const radius = 280;
  const verticalSpacing = 70;
  const angleStep = (Math.PI * 2) / (numSkills / 2);

  if (!isMounted) {
    return (
       <section id="skills" className="h-screen flex flex-col items-center justify-center p-4 overflow-hidden" style={{ scrollSnapAlign: 'start' }}>
         <div className="text-center space-y-2 mb-12 z-10 relative">
            <h2 className="text-4xl md:text-5xl font-bold tracking-widest font-headline text-primary uppercase animate-glitch-subtle">
              Skills DNA
            </h2>
            <p className="text-accent font-code">The building blocks of my craft.</p>
          </div>
       </section>
    );
  }

  // Mobile view: Static 2D DNA pattern
  if (isMobile) {
    return (
      <section id="skills" className="h-screen flex flex-col items-center justify-center p-4 overflow-hidden" style={{ scrollSnapAlign: 'start' }}>
        <div className="text-center space-y-2 mb-12 z-10 relative">
          <h2 className="text-4xl md:text-5xl font-bold tracking-widest font-headline text-primary uppercase animate-glitch-subtle">
            Skills DNA
          </h2>
          <p className="text-accent font-code">The building blocks of my craft.</p>
        </div>
        <div className="w-full max-w-md h-[60vh] overflow-y-auto scrollbar-hide">
          <div className="relative flex justify-between gap-4 px-4">
            {/* Column 1 */}
            <div className="w-1/2 flex flex-col items-center gap-16 pt-8">
              {skills.filter((_, i) => i % 2 === 0).map((skill) => (
                <div key={skill} className="relative w-full z-10">
                   <div className="relative flex items-center justify-center p-2 rounded-lg border border-accent/20 bg-card/70 backdrop-blur-md shadow-lg shadow-black/50 w-full h-16">
                      <p className="font-code text-center text-sm text-primary transition-colors">{skill}</p>
                    </div>
                </div>
              ))}
            </div>
            {/* Column 2 */}
            <div className="w-1/2 flex flex-col items-center gap-16 pb-8">
              {skills.filter((_, i) => i % 2 !== 0).map((skill) => (
                 <div key={skill} className="relative w-full z-10">
                   <div className="relative flex items-center justify-center p-2 rounded-lg border border-accent/20 bg-card/70 backdrop-blur-md shadow-lg shadow-black/50 w-full h-16">
                      <p className="font-code text-center text-sm text-primary transition-colors">{skill}</p>
                    </div>
                </div>
              ))}
            </div>

            {/* DNA Strands */}
            <div className="absolute inset-y-0 inset-x-10">
              {skills.filter((_, i) => i % 2 === 0).map((_, index) => (
                <div key={`strand-${index}`} className="absolute w-full" style={{ top: `${index * 8 + 4}rem`, height: '8rem' }}>
                    <div className="relative h-full w-full">
                        {/* Strand 1 (curving down from left to right) */}
                        <div className="absolute top-0 left-0 w-1/2 h-1/2 border-b-2 border-r-2 border-accent/30 rounded-br-full"></div>
                        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 border-t-2 border-l-2 border-accent/30 rounded-tl-full"></div>
                        
                        {/* Strand 2 (curving up from left to right) */}
                        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 border-t-2 border-r-2 border-accent/30 rounded-tr-full"></div>
                        <div className="absolute top-0 right-0 w-1/2 h-1/2 border-b-2 border-l-2 border-accent/30 rounded-bl-full"></div>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Desktop view: 3D animated DNA
  return (
    <section id="skills" className="h-screen flex flex-col items-center justify-center p-4 overflow-hidden" style={{ scrollSnapAlign: 'start' }}>
      <div className="text-center space-y-2 mb-12 z-10 relative">
        <h2 className="text-4xl md:text-5xl font-bold tracking-widest font-headline text-primary uppercase animate-glitch-subtle">
          Skills DNA
        </h2>
        <p className="text-accent font-code">The building blocks of my craft.</p>
      </div>

      <div className="w-full flex-grow flex items-center justify-center overflow-hidden" style={{ perspective: '1200px' }}>
        <motion.div
          className="relative"
          style={{ transformStyle: "preserve-3d", width: '1px', height: '1px' }}
          animate={{ rotateY: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {/* DNA Rungs */}
          {Array.from({ length: Math.floor(numSkills / 2) }).map((_, i) => {
            const angle = i * angleStep;
            const y = (i - numSkills / 4) * verticalSpacing;
            return (
              <motion.div
                key={`line-${i}`}
                className="absolute top-0 left-0 h-px bg-accent/30 origin-center"
                style={{
                  width: `${radius * 2}px`,
                  transformStyle: "preserve-3d",
                  transform: `translateY(${y}px) translateX(-${radius}px) rotateY(${angle}rad)`,
                }}
              />
            );
          })}

          {/* DNA Nodes (Skills) */}
          {skills.map((skill, i) => {
            const isSecondStrand = i % 2 !== 0;
            const nodeIndex = Math.floor(i / 2);
            const angle = nodeIndex * angleStep;
            const finalAngle = isSecondStrand ? angle + Math.PI : angle;
            const x = radius * Math.cos(finalAngle);
            const z = radius * Math.sin(finalAngle);
            const y = (nodeIndex - numSkills / 4) * verticalSpacing;

            return (
              <motion.div
                key={skill}
                className="absolute top-0 left-0 group"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `translateY(${y}px) translateX(${x}px) translateZ(${z}px) rotateY(${-finalAngle}rad)`,
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.2, boxShadow: "0px 10px 30px hsla(var(--accent)/0.3)" }}
                  className="relative flex items-center justify-center p-2 rounded-lg border border-accent/20 bg-card/70 backdrop-blur-md shadow-lg shadow-black/50 w-36 h-16"
                >
                  <div className="absolute inset-0 rounded-lg bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <p className="font-code text-center text-sm text-primary transition-colors">{skill}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
