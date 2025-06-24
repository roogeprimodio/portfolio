"use client";

import React from "react";
import { motion } from "framer-motion";

const skills = [
  "JavaScript", "TypeScript", "Python", "HTML5", "CSS3", "SQL",
  "React", "Next.js", "Node.js", "Express", "Tailwind CSS", "Framer Motion",
  "MongoDB", "PostgreSQL", "Firebase", "MySQL", "Redis",
  "Git", "GitHub", "Docker", "Vercel", "Figma",
];

export function SkillsSection() {
  const numSkills = skills.length;
  // Parameters for the helix
  const radius = 280; // In pixels. Adjust for desired width of the helix
  const verticalSpacing = 70; // Vertical distance between nodes
  const angleStep = (Math.PI * 2) / (numSkills / 2); // ensures each strand makes one full rotation

  return (
    <section id="skills" className="h-screen flex flex-col items-center justify-center p-4 overflow-hidden" style={{ scrollSnapAlign: 'start' }}>
      <div className="text-center space-y-2 mb-16 z-10 relative">
        <h2 className="text-4xl md:text-5xl font-bold tracking-widest font-headline text-primary uppercase animate-glitch-subtle">
          Skills DNA
        </h2>
        <p className="text-accent font-code">The building blocks of my craft.</p>
      </div>

      <div className="w-full h-[60vh] flex items-center justify-center" style={{ perspective: '1200px' }}>
        <motion.div
          className="relative"
          style={{ transformStyle: "preserve-3d", width: '1px', height: '1px' }}
          animate={{ rotateY: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {skills.map((skill, i) => {
            const isSecondStrand = i % 2 !== 0;
            const nodeIndex = Math.floor(i / 2);

            const angle = nodeIndex * angleStep;
            const finalAngle = isSecondStrand ? angle + Math.PI : angle;

            const x = radius * Math.cos(finalAngle);
            const z = radius * Math.sin(finalAngle);
            const y = (nodeIndex - (numSkills / 4)) * verticalSpacing;

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
