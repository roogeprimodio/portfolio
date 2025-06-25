
"use client";

import React from "react";

const skills = [
  "JavaScript", "TypeScript", "Python", "HTML5", "CSS3", "SQL",
  "React", "Next.js", "Node.js", "Express", "Tailwind CSS", "Framer Motion",
  "MongoDB", "PostgreSQL", "Firebase", "MySQL", "Redis",
  "Git", "GitHub", "Docker", "Vercel", "Figma",
];

export function SkillsSection() {
  return (
    <section id="skills" className="flex flex-col items-center justify-center p-4 md:py-24 overflow-hidden" style={{ scrollSnapAlign: 'start' }}>
      <div className="text-center space-y-2 mb-12 z-10 relative">
        <h2 className="text-4xl md:text-5xl font-bold tracking-widest font-headline text-primary uppercase animate-glitch-subtle">
          Skills DNA
        </h2>
        <p className="text-accent font-code">The building blocks of my craft.</p>
      </div>
      <div className="w-full max-w-md">
        <div className="relative flex justify-between gap-4 px-4">
          <div className="w-1/2 flex flex-col items-center gap-16 pt-8">
            {skills.filter((_, i) => i % 2 === 0).map((skill) => (
              <div key={skill} className="relative w-full z-10">
                 <div className="relative flex items-center justify-center p-2 rounded-lg border border-accent/20 bg-card/70 backdrop-blur-md shadow-lg shadow-black/50 w-full h-16">
                    <p className="font-code text-center text-sm text-primary transition-colors">{skill}</p>
                  </div>
              </div>
            ))}
          </div>
          <div className="w-1/2 flex flex-col items-center gap-16 pb-8">
            {skills.filter((_, i) => i % 2 !== 0).map((skill) => (
               <div key={skill} className="relative w-full z-10">
                 <div className="relative flex items-center justify-center p-2 rounded-lg border border-accent/20 bg-card/70 backdrop-blur-md shadow-lg shadow-black/50 w-full h-16">
                    <p className="font-code text-center text-sm text-primary transition-colors">{skill}</p>
                  </div>
              </div>
            ))}
          </div>
          <div className="absolute inset-y-0 inset-x-10">
            {skills.filter((_, i) => i % 2 === 0).map((_, index) => (
              <div key={`strand-${index}`} className="absolute w-full" style={{ top: `${index * 8 + 4}rem`, height: '8rem' }}>
                  <div className="relative h-full w-full">
                      <div className="absolute top-0 left-0 w-1/2 h-1/2 border-b-2 border-r-2 border-accent/30 rounded-br-full"></div>
                      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 border-t-2 border-l-2 border-accent/30 rounded-tl-full"></div>
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
