"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Brain, Handshake, Languages, BarChart2, HardHat, type LucideIcon } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import { skillGroups } from "@/data/skills";

/** Data files carry icon keys; components can't cross the server boundary. */
const ICONS: Record<string, LucideIcon> = {
  code: Code,
  chart: BarChart2,
  tools: HardHat,
  handshake: Handshake,
  brain: Brain,
  languages: Languages,
};

const skillData = skillGroups.map((group) => ({
  ...group,
  icon: ICONS[group.icon] ?? Code,
}));

const wovenSkills: (typeof skillData[0] & { side: 'left' | 'right' })[] = [];
const midPoint = Math.ceil(skillData.length / 2);
const leftStrand = skillData.slice(0, midPoint);
const rightStrand = skillData.slice(midPoint);

for (let i = 0; i < midPoint; i++) {
  if (leftStrand[i]) wovenSkills.push({ ...leftStrand[i], side: 'left' });
  if (rightStrand[i]) wovenSkills.push({ ...rightStrand[i], side: 'right' });
}

type RungPoint = { y: number; x1: number; x2: number; };

export function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);

  const [dnaPath, setDnaPath] = useState("M 48 0");
  const [dnaPath2, setDnaPath2] = useState("M 48 0");
  const [rungPoints, setRungPoints] = useState<RungPoint[]>([]);

  const calculateLayout = useCallback(() => {
    if (!containerRef.current) return;
    
    const amplitude = 30;
    const frequency = 0.02;

    const containerTop = containerRef.current.getBoundingClientRect().top;
    const svgWidth = 96; // w-24
    const centerX = svgWidth / 2;

    // Calculate DNA paths and rungs
    const containerHeight = containerRef.current.scrollHeight;
    if (containerHeight <= 0) {
      setDnaPath("M 48 0");
      setDnaPath2("M 48 0");
      setRungPoints([]);
      return;
    }

    let path1 = "M 48 0";
    let path2 = "M 48 0";
    const newRungPoints: RungPoint[] = [];
    const rungInterval = 40;

    for (let y = 1; y <= containerHeight; y++) {
      const x1 = centerX + Math.sin(y * frequency) * amplitude;
      const x2 = centerX - Math.sin(y * frequency) * amplitude;
      path1 += ` L ${x1.toFixed(2)} ${y}`;
      path2 += ` L ${x2.toFixed(2)} ${y}`;

      if (y % rungInterval === 0) {
        newRungPoints.push({ y, x1, x2 });
      }
    }

    setDnaPath(path1);
    setDnaPath2(path2);
    setRungPoints(newRungPoints);
    
    // Position cards
    const cardElements = Array.from(containerRef.current.children) as HTMLElement[];
    const rects = cardElements.map(el => el.getBoundingClientRect());

    cardElements.forEach((el, index) => {
      const itemRect = rects[index];
      const itemCenterY = itemRect.top + itemRect.height / 2;
      const yPos = itemCenterY - containerTop;
      const xOffset = Math.sin(yPos * frequency) * amplitude;
      el.style.transform = `translateX(${xOffset}px)`;
    });

  }, []);

  const handleAccordionToggle = useCallback(() => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    
    const startTime = performance.now();
    const duration = 220;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      calculateLayout();
      
      if (elapsed < duration) {
        animationFrameId.current = requestAnimationFrame(animate);
      } else {
        animationFrameId.current = null;
        calculateLayout(); // one final snap
      }
    };

    animationFrameId.current = requestAnimationFrame(animate);
  }, [calculateLayout]);

  useEffect(() => {
    calculateLayout();
    const observer = new ResizeObserver(calculateLayout);
    const currentContainer = containerRef.current;
    if (currentContainer) {
      observer.observe(currentContainer);
    }
    
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, [calculateLayout]);


  return (
    <section id="skills" className="flex flex-col items-center justify-center overflow-hidden p-4 py-20 md:py-24">
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
            className="absolute left-1/2 top-0 hidden h-full w-24 -translate-x-1/2 md:block"
            fill="none"
          >
            {/* Rungs */}
            <g>
              {rungPoints.map(({ y, x1, x2 }) => {
                const frequency = 0.02;
                const isLeftInFront = Math.sin(y * frequency) > 0;
                return (
                  <g key={y} style={{ zIndex: isLeftInFront ? 1 : -1 }}>
                    <line x1={x1} y1={y+1} x2={x2} y2={y+1} stroke="hsl(var(--accent)/0.2)" strokeWidth="1" />
                    <line x1={x1} y1={y} x2={x2} y2={y} stroke="hsl(var(--accent)/0.4)" strokeWidth="1" />
                  </g>
                );
              })}
            </g>
             
            {/* Helix Strands */}
            <path
              d={dnaPath}
              stroke="hsl(var(--accent)/0.3)"
              strokeWidth="2"
            />
            <path
              d={dnaPath2}
              stroke="hsl(var(--accent)/0.3)"
              strokeWidth="2"
            />
          </svg>

          <div ref={containerRef} className="space-y-6 md:space-y-12">
            {wovenSkills.map((category, index) => {
              const isLeft = category.side === 'left';
              return (
                <div
                  key={category.title}
                  className="relative flex items-center"
                  style={{ willChange: 'transform' }}
                >
                  <div className="absolute left-1/2 top-1/2 z-10 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-background bg-accent shadow-[0_0_10px_hsl(var(--accent)/0.45)] md:block"></div>
                  <div className={`w-full md:w-1/2 md:px-4 ${isLeft ? 'md:pr-10 md:text-right' : 'md:ml-auto md:pl-10 md:text-left'}`}>
                    <AccordionItem value={`item-${index}`} className="border-b-0">
                      <Card className="bg-card/60 backdrop-blur-md border border-accent/30 shadow-2xl shadow-black/50 inline-block w-full">
                        <AccordionTrigger onClick={handleAccordionToggle} className="p-0 hover:no-underline [&>svg]:hidden w-full">
                          <CardHeader className="w-full">
                            <CardTitle className={`flex items-center gap-3 text-base font-code text-primary sm:text-lg ${isLeft ? 'justify-start md:justify-end' : 'justify-start'} [text-shadow:0_0_6px_hsl(var(--primary)/0.6)]`}>
                              {isLeft && (
                                <span className="hidden md:inline">
                                  {category.title}
                                </span>
                              )}
                              <category.icon className="h-5 w-5 shrink-0 text-accent drop-shadow-[0_0_4px_hsl(var(--accent)/0.7)] sm:h-6 sm:w-6" />
                              <span className={isLeft ? "md:hidden" : ""}>
                                {category.title}
                              </span>
                            </CardTitle>
                          </CardHeader>
                        </AccordionTrigger>
                        <AccordionContent>
                          <CardContent className="pt-0">
                            <div className={`flex flex-wrap gap-2 pt-2 ${isLeft ? 'justify-start md:justify-end' : 'justify-start'}`}>
                              {category.skills.map((skill, skillIndex) => (
                                <Badge key={skillIndex} variant="secondary" className="h-auto whitespace-normal text-center font-code text-sm bg-accent/10 text-accent border-accent/20 cursor-default">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </AccordionContent>
                      </Card>
                    </AccordionItem>
                  </div>
                </div>
              );
            })}
          </div>
        </Accordion>
      </div>
    </section>
  );
}
