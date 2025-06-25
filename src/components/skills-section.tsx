
"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Code, Brain, Handshake, Languages, BarChart2, HardHat, Beaker, Building2 } from 'lucide-react';
import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Technical Skills",
    icon: <Code className="h-6 w-6 text-accent" />,
    skills: ["JavaScript", "TypeScript", "Python", "HTML5", "CSS3", "SQL", "React", "Next.js", "Node.js", "Express", "Tailwind CSS", "Framer Motion", "PostgreSQL", "MongoDB", "Firebase"],
  },
  {
    title: "Professional Skills",
    icon: <Handshake className="h-6 w-6 text-accent" />,
    skills: ["Agile Methodologies", "Project Management", "Team Leadership", "Client Communication", "Technical Writing", "Code Review"],
  },
  {
    title: "Soft Skills",
    icon: <Brain className="h-6 w-6 text-accent" />,
    skills: ["Problem-Solving", "Adaptability", "Collaboration", "Creativity", "Time Management", "Critical Thinking"],
  },
  {
    title: "Analytical & Data Skills",
    icon: <BarChart2 className="h-6 w-6 text-accent" />,
    skills: ["Data Analysis", "Machine Learning", "Data Visualization", "SQL", "Pandas", "NumPy", "D3.js"],
  },
  {
    title: "Tools & Platforms",
    icon: <HardHat className="h-6 w-6 text-accent" />,
    skills: ["Git", "GitHub", "Docker", "Vercel", "Figma", "JIRA", "Stripe", "Postman", "Webpack"],
  },
  {
    title: "Research & Academic Skills",
    icon: <Beaker className="h-6 w-6 text-accent" />,
    skills: ["Algorithm Design", "Quantum Computing Theory", "Academic Writing", "Statistical Analysis", "System Architecture"],
  },
  {
    title: "Industry-Specific Skills",
    icon: <Building2 className="h-6 w-6 text-accent" />,
    skills: ["Cyber-Security", "E-commerce Optimization", "FinTech Solutions", "API Design", "Network Security"],
  },
  {
    title: "Language Skills",
    icon: <Languages className="h-6 w-6 text-accent" />,
    skills: ["English: Native", "Japanese: Business", "Binary: Heavily Accented"],
  }
];

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export function SkillsSection() {
  return (
    <section id="skills" className="flex flex-col items-center justify-center p-4 py-24 min-h-screen">
      <div className="text-center space-y-2 mb-12 z-10 relative">
        <h2 className="text-4xl md:text-5xl font-bold tracking-widest font-headline text-primary uppercase animate-glitch-subtle">
          Skills DNA
        </h2>
        <p className="text-accent font-code">The building blocks of my craft.</p>
      </div>
      <motion.div 
        className="w-full max-w-2xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <Accordion type="single" collapsible className="w-full space-y-4">
          {skillCategories.map((category, index) => (
            <motion.div key={index} variants={itemVariants}>
              <AccordionItem value={`item-${index}`} className="bg-card/60 backdrop-blur-md border border-accent/30 rounded-lg shadow-2xl shadow-black/50 overflow-hidden">
                <AccordionTrigger className="text-lg font-code text-primary hover:text-accent hover:no-underline p-4 data-[state=open]:border-b data-[state=open]:border-accent/30">
                  <div className="flex items-center gap-4">
                    {category.icon}
                    <span>{category.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-wrap gap-2 p-4">
                    {category.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="font-code text-base bg-accent/10 text-accent border-accent/20 cursor-default">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
}
