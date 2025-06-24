"use client";

import React, { useRef } from "react";
import { Code, Database, Braces, TerminalSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";

const skillCategories = [
  {
    title: "Languages",
    icon: <Braces />,
    skills: ["JavaScript", "TypeScript", "Python", "HTML5", "CSS3"],
  },
  {
    title: "Frameworks & Libraries",
    icon: <Code />,
    skills: ["React", "Next.js", "Node.js", "Express", "Tailwind CSS"],
  },
  {
    title: "Databases",
    icon: <Database />,
    skills: ["MongoDB", "PostgreSQL", "Firebase", "MySQL"],
  },
  {
    title: "Tools & Platforms",
    icon: <TerminalSquare />,
    skills: ["Git", "GitHub", "Docker", "Vercel", "Figma"],
  },
];

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
  };

  return (
    <section id="skills" ref={ref} className="py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">
            Technologies I Master
          </h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
            The tools and technologies I use to build modern, efficient, and beautiful web applications.
          </p>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Card className="max-w-5xl mx-auto bg-card/50 backdrop-blur-lg border border-border/20 rounded-xl overflow-hidden p-8 md:p-12">
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
              {skillCategories.map((category) => (
                <motion.div
                  key={category.title}
                  className="flex flex-col items-center text-center sm:items-start sm:text-left"
                  variants={containerVariants}
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-accent/10 p-3 rounded-lg">
                      {React.cloneElement(category.icon, { className: "h-6 w-6 text-accent" })}
                    </div>
                    <h3 className="text-xl font-headline font-bold">{category.title}</h3>
                  </div>
                  <ul className="mt-4 space-y-2 text-muted-foreground">
                    {category.skills.map((skill) => (
                      <li key={skill} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
