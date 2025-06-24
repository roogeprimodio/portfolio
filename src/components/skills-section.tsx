"use client";

import React from "react";
import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Languages",
    skills: ["JavaScript", "TypeScript", "Python", "HTML5", "CSS3", "SQL"],
  },
  {
    title: "Frameworks",
    skills: ["React", "Next.js", "Node.js", "Express", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Databases",
    skills: ["MongoDB", "PostgreSQL", "Firebase", "MySQL", "Redis"],
  },
  {
    title: "Tools & Platforms",
    skills: ["Git", "GitHub", "Docker", "Vercel", "Figma", "Genkit"],
  },
];

const allSkills = [...new Set(skillCategories.flatMap(c => c.skills))];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.04,
      type: "spring",
      stiffness: 300,
      damping: 20
    },
  }),
};

export function SkillsSection() {
  return (
    <section id="skills" className="h-screen flex flex-col items-center justify-center p-4 overflow-hidden" style={{ scrollSnapAlign: 'start' }}>
      <div className="text-center space-y-2 mb-12">
        <h2 className="text-4xl md:text-5xl font-bold tracking-widest font-headline text-primary uppercase animate-glitch-subtle">
          Skills DNA
        </h2>
        <p className="text-accent font-code">The building blocks of my craft.</p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {allSkills.map((skill, i) => (
           <motion.div
              key={skill}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover={{ scale: 1.15, zIndex: 10, y: -5, boxShadow: "0px 10px 30px hsla(var(--accent)/0.3)" }}
              viewport={{ once: true, amount: 0.1 }}
              className="group relative aspect-square flex items-center justify-center p-2 rounded-lg border border-accent/20 bg-card/50 backdrop-blur-sm shadow-lg shadow-black/50"
            >
              <div className="absolute inset-0 rounded-lg bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <p className="font-code text-center text-sm md:text-base text-primary group-hover:text-accent transition-colors">{skill}</p>
            </motion.div>
        ))}
      </div>
    </section>
  );
}
