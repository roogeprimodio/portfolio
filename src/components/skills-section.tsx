
"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Brain, Handshake, Languages, BarChart2, HardHat, Beaker, Building2 } from 'lucide-react';
import { motion } from "framer-motion";

const skillData = [
  // Strand 1: Technical & Analytical
  {
    title: "Technical Skills",
    icon: Code,
    skills: ["JavaScript", "TypeScript", "Python", "HTML5", "CSS3", "SQL", "React", "Next.js", "Node.js", "Express", "Tailwind CSS", "Framer Motion", "PostgreSQL", "MongoDB", "Firebase"],
  },
  {
    title: "Analytical & Data Skills",
    icon: BarChart2,
    skills: ["Data Analysis", "Machine Learning", "Data Visualization", "SQL", "Pandas", "NumPy", "D3.js"],
  },
  {
    title: "Tools & Platforms",
    icon: HardHat,
    skills: ["Git", "GitHub", "Docker", "Vercel", "Figma", "JIRA", "Stripe", "Postman", "Webpack"],
  },
  {
    title: "Industry-Specific Skills",
    icon: Building2,
    skills: ["Cyber-Security", "E-commerce Optimization", "FinTech Solutions", "API Design", "Network Security"],
  },
  // Strand 2: Professional & Soft
  {
    title: "Professional Skills",
    icon: Handshake,
    skills: ["Agile Methodologies", "Project Management", "Team Leadership", "Client Communication", "Technical Writing", "Code Review"],
  },
  {
    title: "Soft Skills",
    icon: Brain,
    skills: ["Problem-Solving", "Adaptability", "Collaboration", "Creativity", "Time Management", "Critical Thinking"],
  },
  {
    title: "Research & Academic Skills",
    icon: Beaker,
    skills: ["Algorithm Design", "Quantum Computing Theory", "Academic Writing", "Statistical Analysis", "System Architecture"],
  },
  {
    title: "Language Skills",
    icon: Languages,
    skills: ["English: Native", "Japanese: Business", "Binary: Heavily Accented"],
  }
];

// Weave the two strands together for an alternating display
const wovenSkills = [];
const leftStrand = skillData.slice(0, 4);
const rightStrand = skillData.slice(4, 8);

for (let i = 0; i < 4; i++) {
  if (leftStrand[i]) wovenSkills.push({ ...leftStrand[i], side: 'left' });
  if (rightStrand[i]) wovenSkills.push({ ...rightStrand[i], side: 'right' });
}

const cardVariants = (side: 'left' | 'right') => ({
  hidden: { opacity: 0, x: side === 'left' ? -50 : 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    },
  },
});

export function SkillsSection() {
  return (
    <section id="skills" className="flex flex-col items-center justify-center p-4 py-24 min-h-screen overflow-hidden">
      <div className="text-center space-y-2 mb-24 z-10 relative">
        <h2 className="text-4xl md:text-5xl font-bold tracking-widest font-headline text-primary uppercase animate-glitch-subtle">
          Skills DNA
        </h2>
        <p className="text-accent font-code">The building blocks of my craft.</p>
      </div>

      <div className="w-full max-w-4xl relative">
        {/* DNA Backbone */}
        <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-transparent via-accent/30 to-transparent"></div>

        <div className="space-y-12">
          {wovenSkills.map((category, index) => {
            const isLeft = category.side === 'left';
            return (
              <motion.div
                key={index}
                className="relative flex items-center"
                variants={cardVariants(category.side)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
              >
                {/* Node on Backbone */}
                <div className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-accent border-4 border-background shadow-md left-1/2 -translate-x-1/2`}></div>
                
                <div className={`w-1/2 px-4 ${isLeft ? 'pr-10 text-right' : 'pl-10 text-left ml-auto'}`}>
                  <Card className="bg-card/60 backdrop-blur-md border border-accent/30 shadow-2xl shadow-black/50 inline-block w-full max-w-sm">
                    <CardHeader>
                      <CardTitle className={`flex items-center gap-3 text-lg font-code text-primary ${isLeft ? 'justify-end' : ''}`}>
                        {isLeft && <span>{category.title}</span>}
                        <category.icon className="h-6 w-6 text-accent" />
                        {!isLeft && <span>{category.title}</span>}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className={`flex flex-wrap gap-2 ${isLeft ? 'justify-end' : 'justify-start'}`}>
                        {category.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="secondary" className="font-code text-base bg-accent/10 text-accent border-accent/20 cursor-default">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
