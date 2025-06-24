"use client";

import React, { useRef } from "react";
import { Code, Database, Braces, TerminalSquare } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
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
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="skills" ref={ref} className="py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">
            Technologies I Master
          </h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
            The tools and technologies I use to build modern, efficient, and beautiful web applications.
          </p>
        </div>
        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="h-full bg-card/50 backdrop-blur-lg border-border/20 rounded-xl overflow-hidden shadow-lg p-6 text-center sm:text-left">
                <CardHeader className="p-0 flex flex-col items-center sm:items-start space-y-4">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    {React.cloneElement(category.icon, { className: "h-8 w-8 text-accent" })}
                  </div>
                  <CardTitle className="text-xl font-headline font-bold">{category.title}</CardTitle>
                </CardHeader>
                <ul className="mt-4 space-y-2.5 text-muted-foreground">
                  {category.skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-3 justify-center sm:justify-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
