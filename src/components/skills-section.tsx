
"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Brain, Handshake, Languages, BarChart2, HardHat, Beaker, Building2 } from 'lucide-react';
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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

const wovenSkills = [];
const leftStrand = skillData.slice(0, 4);
const rightStrand = skillData.slice(4, 8);

for (let i = 0; i < 4; i++) {
  if (leftStrand[i]) wovenSkills.push({ ...leftStrand[i], side: 'left' });
  if (rightStrand[i]) wovenSkills.push({ ...rightStrand[i], side: 'right' });
}

export function SkillsSection() {
  const amplitude = 30;
  const frequency = 0.02;
  const containerRef = useRef<HTMLDivElement>(null);
  const [xOffsets, setXOffsets] = useState<number[]>([]);
  const [dnaPath, setDnaPath] = useState("M 48 0");
  const [dnaPath2, setDnaPath2] = useState("M 48 0");
  const [isAnimating, setIsAnimating] = useState(false);

  const generateDnaPath = (height: number) => {
    if (height <= 0) return "M 48 0";
    let path = "M 48 0";
    const svgWidth = 96; // corresponding to w-24
    const centerX = svgWidth / 2;
    for (let y = 1; y <= height; y++) {
      const x = centerX + Math.sin(y * frequency) * amplitude;
      path += ` L ${x.toFixed(2)} ${y}`;
    }
    return path;
  };

  const generateDnaPath2 = (height: number) => {
    if (height <= 0) return "M 48 0";
    let path = "M 48 0";
    const svgWidth = 96; // corresponding to w-24
    const centerX = svgWidth / 2;
    for (let y = 1; y <= height; y++) {
      const x = centerX - Math.sin(y * frequency) * amplitude;
      path += ` L ${x.toFixed(2)} ${y}`;
    }
    return path;
  };

  const calculateOffsetsAndPath = useCallback(() => {
    if (!containerRef.current) return;

    const containerTop = containerRef.current.getBoundingClientRect().top;
    const newOffsets: number[] = [];
    
    Array.from(containerRef.current.children).forEach((child) => {
      const itemEl = child as HTMLElement;
      const itemRect = itemEl.getBoundingClientRect();
      const itemCenterY = itemRect.top + itemRect.height / 2;
      const yPos = itemCenterY - containerTop;
      const xOffset = Math.sin(yPos * frequency) * amplitude;
      newOffsets.push(xOffset);
    });
    
    setXOffsets(newOffsets);
    
    const containerHeight = containerRef.current.scrollHeight;
    setDnaPath(generateDnaPath(containerHeight));
    setDnaPath2(generateDnaPath2(containerHeight));
  }, []);

  // Effect for handling resize and initial calculation
  useEffect(() => {
    const observer = new ResizeObserver(calculateOffsetsAndPath);
    const currentContainer = containerRef.current;
    if (currentContainer) {
      observer.observe(currentContainer);
    }
    
    const timer = setTimeout(calculateOffsetsAndPath, 100);

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
      clearTimeout(timer);
    };
  }, [calculateOffsetsAndPath]);

  // Effect for running the animation loop
  useEffect(() => {
    let animationFrameId: number | null = null;

    const animate = () => {
      calculateOffsetsAndPath();
      animationFrameId = requestAnimationFrame(animate);
    };

    if (isAnimating) {
      animate();
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isAnimating, calculateOffsetsAndPath]);

  const handleAccordionToggle = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      calculateOffsetsAndPath(); // Final calculation for perfect alignment
    }, 220); // A little more than the 200ms accordion animation to be safe
  };


  return (
    <section id="skills" className="flex flex-col items-center justify-center p-4 py-24 min-h-screen overflow-hidden">
      <div className="text-center space-y-2 mb-12 z-10 relative">
        <h2 className="text-4xl md:text-5xl font-bold tracking-widest font-headline text-primary uppercase animate-glitch-subtle [text-shadow:0_0_8px_hsl(var(--primary)/0.5)]">
          Skills DNA
        </h2>
        <p className="text-accent font-code">The building blocks of my craft.</p>
      </div>
      
      <div className="w-full max-w-4xl">
        <Accordion type="multiple" className="relative">
          <svg
            aria-hidden="true"
            className="absolute left-1/2 top-0 h-full w-24 -translate-x-1/2"
            fill="none"
          >
            <defs>
              <linearGradient id="dna-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: "hsl(var(--background))", stopOpacity: 0 }} />
                <stop offset="10%" style={{ stopColor: "hsl(var(--accent))", stopOpacity: 0.3 }} />
                <stop offset="90%" style={{ stopColor: "hsl(var(--accent))", stopOpacity: 0.3 }} />
                <stop offset="100%" style={{ stopColor: "hsl(var(--background))", stopOpacity: 0 }} />
              </linearGradient>
            </defs>
            <motion.path
              d={dnaPath}
              stroke="url(#dna-gradient)"
              strokeWidth="2"
              transition={{ duration: 0, ease: "linear" }}
            />
            <motion.path
              d={dnaPath2}
              stroke="url(#dna-gradient)"
              strokeWidth="2"
              transition={{ duration: 0, ease: "linear" }}
            />
          </svg>

          <div ref={containerRef} className="space-y-12">
            {wovenSkills.map((category, index) => {
              const isLeft = category.side === 'left';
              const xOffset = xOffsets[index] || 0;

              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  animate={{ x: xOffset }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    opacity: { duration: 0.8, ease: "easeOut", delay: index * 0.15 },
                    x: { duration: 0, ease: 'linear' }
                  }}
                  className="relative flex items-center"
                >
                  <div className="absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-accent border-4 border-background shadow-[0_0_10px_hsl(var(--accent)/0.45)] left-1/2 -translate-x-1/2"></div>
                  <div className={`w-1/2 px-4 ${isLeft ? 'pr-10 text-right' : 'pl-10 text-left ml-auto'}`}>
                    <AccordionItem value={`item-${index}`} className="border-b-0">
                      <Card className="bg-card/60 backdrop-blur-md border border-accent/30 shadow-2xl shadow-black/50 inline-block w-full">
                        <AccordionTrigger onClick={handleAccordionToggle} className="p-0 hover:no-underline [&>svg]:hidden w-full">
                          <CardHeader className="w-full">
                            <CardTitle className={`flex items-center gap-3 text-lg font-code text-primary ${isLeft ? 'justify-end' : 'justify-start'} [text-shadow:0_0_6px_hsl(var(--primary)/0.6)]`}>
                              {isLeft && <span>{category.title}</span>}
                              <category.icon className="h-6 w-6 text-accent drop-shadow-[0_0_4px_hsl(var(--accent)/0.7)]" />
                              {!isLeft && <span>{category.title}</span>}
                            </CardTitle>
                          </CardHeader>
                        </AccordionTrigger>
                        <AccordionContent>
                          <CardContent className="pt-0">
                            <div className={`flex flex-wrap gap-2 pt-2 ${isLeft ? 'justify-end' : 'justify-start'}`}>
                              {category.skills.map((skill, skillIndex) => (
                                <Badge key={skillIndex} variant="secondary" className="font-code text-sm bg-accent/10 text-accent border-accent/20 cursor-default">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </AccordionContent>
                      </Card>
                    </AccordionItem>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Accordion>
      </div>
    </section>
  );
}
