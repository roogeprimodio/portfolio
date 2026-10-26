"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Brain, Handshake, Languages, BarChart2, HardHat, type LucideIcon } from "lucide-react";
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

const wovenSkills: (typeof skillData[0] & { side: "left" | "right" })[] = [];
const midPoint = Math.ceil(skillData.length / 2);
const leftStrand = skillData.slice(0, midPoint);
const rightStrand = skillData.slice(midPoint);

for (let i = 0; i < midPoint; i++) {
  if (leftStrand[i]) wovenSkills.push({ ...leftStrand[i], side: "left" });
  if (rightStrand[i]) wovenSkills.push({ ...rightStrand[i], side: "right" });
}

/*
 * Helix geometry. The two strands are x = cx ± sin(y·f + φ)·A. φ is the twist
 * phase: it advances with scroll and drifts slowly on its own, so the helix
 * rotates about its axis as you move past it. Depth for any point on a strand
 * is cos(y·f + φ): +1 is nearest the viewer (bright, thick), −1 is behind
 * (dim, thin). Rungs fade where the strands cross, as a real helix would.
 */
const SVG_WIDTH = 96; // w-24
const CENTER_X = SVG_WIDTH / 2;
const AMPLITUDE = 30;
const FREQUENCY = 0.02;
const SEGMENT = 16; // px per strand segment
const RUNG_INTERVAL = 40;
const SCROLL_TWIST = 0.0045; // radians per scrolled px
const IDLE_TWIST = 0.35; // radians per second with no scroll
const PULSES_PER_STRAND = 3;
const PULSE_SPEED = 0.07; // strand lengths per second

type Rung = { y: number };

function strandX(y: number, phase: number, side: 1 | -1): number {
  return CENTER_X + side * Math.sin(y * FREQUENCY + phase) * AMPLITUDE;
}

function depth(y: number, phase: number, side: 1 | -1): number {
  return side * Math.cos(y * FREQUENCY + phase);
}

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const layoutFrame = useRef<number | null>(null);
  const flashTimers = useRef<Map<number, number>>(new Map());

  const [height, setHeight] = useState(0);
  const [rungs, setRungs] = useState<Rung[]>([]);

  // Everything that moves per frame is written straight to the SVG so the
  // accordion tree never re-renders on scroll.
  const phaseRef = useRef(0);
  const scrollRef = useRef(0);
  const visibleRef = useRef(false);
  const reducedMotionRef = useRef(false);

  const calculateLayout = useCallback(() => {
    if (!containerRef.current) return;
    const containerHeight = containerRef.current.scrollHeight;
    setHeight(containerHeight);

    const next: Rung[] = [];
    for (let y = RUNG_INTERVAL; y <= containerHeight; y += RUNG_INTERVAL) next.push({ y });
    setRungs(next);

    // Cards keep a gentle static offset along the phase-0 curve; the node,
    // not the card, is what tracks the live strand.
    const containerTop = containerRef.current.getBoundingClientRect().top;
    const cards = Array.from(containerRef.current.children) as HTMLElement[];
    cards.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const y = rect.top + rect.height / 2 - containerTop;
      el.style.transform = `translateX(${(Math.sin(y * FREQUENCY) * AMPLITUDE * 0.5).toFixed(2)}px)`;
    });
  }, []);

  /** Paint one frame of the helix at the current phase. */
  const paint = useCallback((phase: number, now: number) => {
    const svg = svgRef.current;
    if (!svg || height <= 0) return;

    const bright = svg.dataset.dark === "1";

    for (const side of [1, -1] as const) {
      const lines = svg.querySelectorAll<SVGLineElement>(`[data-strand="${side}"]`);
      lines.forEach((line, i) => {
        const y1 = i * SEGMENT;
        const y2 = Math.min(y1 + SEGMENT, height);
        const d = depth((y1 + y2) / 2, phase, side); // −1..1
        const t = (d + 1) / 2; // 0..1
        line.setAttribute("x1", strandX(y1, phase, side).toFixed(2));
        line.setAttribute("x2", strandX(y2, phase, side).toFixed(2));
        line.setAttribute("stroke-opacity", (0.18 + t * 0.72).toFixed(3));
        line.setAttribute("stroke-width", (1.2 + t * 1.6).toFixed(2));
      });

      const pulses = svg.querySelectorAll<SVGCircleElement>(`[data-pulse="${side}"]`);
      pulses.forEach((dot, i) => {
        const progress = ((now / 1000) * PULSE_SPEED + i / PULSES_PER_STRAND) % 1;
        const y = progress * height;
        const d = depth(y, phase, side);
        const t = (d + 1) / 2;
        dot.setAttribute("cx", strandX(y, phase, side).toFixed(2));
        dot.setAttribute("cy", y.toFixed(2));
        dot.setAttribute("r", (1.6 + t * 1.6).toFixed(2));
        dot.setAttribute("opacity", (0.25 + t * 0.75).toFixed(3));
      });
    }

    // Nodes ride the strand on their card's side, so they never float off
    // the helix as it twists. Depth dims and shrinks them when that strand
    // passes behind.
    const container = containerRef.current;
    if (container) {
      const top = container.getBoundingClientRect().top;
      for (const child of Array.from(container.children) as HTMLElement[]) {
        const node = child.querySelector<HTMLElement>("[data-node]");
        if (!node) continue;
        const side: 1 | -1 = child.dataset.side === "left" ? -1 : 1;
        const rect = child.getBoundingClientRect();
        const y = rect.top + rect.height / 2 - top;
        const d = depth(y, phase, side);
        const t = (d + 1) / 2;
        const x = strandX(y, phase, side) - CENTER_X;
        node.style.transform = `translate(calc(-50% + ${x.toFixed(2)}px), -50%) scale(${(0.8 + t * 0.35).toFixed(3)})`;
        node.style.opacity = (0.55 + t * 0.45).toFixed(3);
      }
    }

    const rungLines = svg.querySelectorAll<SVGLineElement>("[data-rung]");
    rungLines.forEach((line) => {
      const y = Number(line.dataset.rung);
      const x1 = strandX(y, phase, 1);
      const x2 = strandX(y, phase, -1);
      // |sin| is 0 at a crossing: the rung has no length there, so it fades.
      const spread = Math.abs(Math.sin(y * FREQUENCY + phase));
      line.setAttribute("x1", x1.toFixed(2));
      line.setAttribute("x2", x2.toFixed(2));
      line.setAttribute("stroke-opacity", (0.1 + spread * (bright ? 0.45 : 0.35)).toFixed(3));
    });
  }, [height]);

  // Track scroll and visibility without touching React state.
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = media.matches;
    const onMedia = () => { reducedMotionRef.current = media.matches; };
    media.addEventListener("change", onMedia);

    const onScroll = () => { scrollRef.current = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const section = sectionRef.current;
    const io = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { rootMargin: "200px 0px" },
    );
    if (section) io.observe(section);

    return () => {
      media.removeEventListener("change", onMedia);
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  // The frame loop. Only paints while the section is near the viewport.
  useEffect(() => {
    let frame = 0;
    let last = performance.now();
    let scrollAtLast = scrollRef.current;

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      if (!visibleRef.current) return;

      if (reducedMotionRef.current) {
        paint(0, 0);
        return;
      }

      const scrolled = scrollRef.current - scrollAtLast;
      scrollAtLast = scrollRef.current;
      phaseRef.current += scrolled * SCROLL_TWIST + dt * IDLE_TWIST;
      paint(phaseRef.current, now);

      // Light the node and card nearest the viewport centre.
      const container = containerRef.current;
      if (container) {
        const mid = window.innerHeight / 2;
        let best: HTMLElement | null = null;
        let bestDist = Infinity;
        for (const child of Array.from(container.children) as HTMLElement[]) {
          const r = child.getBoundingClientRect();
          const dist = Math.abs(r.top + r.height / 2 - mid);
          if (dist < bestDist) { bestDist = dist; best = child; }
        }
        for (const child of Array.from(container.children) as HTMLElement[]) {
          child.dataset.active = child === best && bestDist < 220 ? "1" : "0";
        }
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [paint]);

  // Mirror the theme onto the SVG so paint() can pick glow levels without
  // reading computed styles every frame.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const sync = () => { svg.dataset.dark = document.documentElement.classList.contains("dark") ? "1" : "0"; };
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  /** Opening a group sends a pulse along the rung nearest that card. */
  const handleAccordionToggle = useCallback((index: number) => {
    if (layoutFrame.current) cancelAnimationFrame(layoutFrame.current);
    const startTime = performance.now();
    const duration = 220;
    const animate = (now: number) => {
      calculateLayout();
      if (now - startTime < duration) {
        layoutFrame.current = requestAnimationFrame(animate);
      } else {
        layoutFrame.current = null;
        calculateLayout();
      }
    };
    layoutFrame.current = requestAnimationFrame(animate);

    const container = containerRef.current;
    const svg = svgRef.current;
    const card = container?.children[index] as HTMLElement | undefined;
    if (!container || !svg || !card || reducedMotionRef.current) return;
    const y = card.getBoundingClientRect().top + card.offsetHeight / 2 - container.getBoundingClientRect().top;
    const nearest = Math.round(y / RUNG_INTERVAL) * RUNG_INTERVAL;
    const rung = svg.querySelector<SVGLineElement>(`[data-rung="${nearest}"]`);
    if (!rung) return;
    rung.classList.add("rung-flash");
    const prior = flashTimers.current.get(nearest);
    if (prior) window.clearTimeout(prior);
    flashTimers.current.set(nearest, window.setTimeout(() => rung.classList.remove("rung-flash"), 700));
  }, [calculateLayout]);

  useEffect(() => {
    calculateLayout();
    const observer = new ResizeObserver(calculateLayout);
    const current = containerRef.current;
    if (current) observer.observe(current);
    const timers = flashTimers.current;
    return () => {
      if (layoutFrame.current) cancelAnimationFrame(layoutFrame.current);
      if (current) observer.unobserve(current);
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [calculateLayout]);

  const segmentCount = Math.ceil(height / SEGMENT);

  return (
    <section ref={sectionRef} id="skills" className="flex flex-col items-center justify-center overflow-hidden p-4 py-20 md:py-24">
      <div className="text-center space-y-2 mb-12 z-10 relative">
        <h2 className="text-4xl md:text-5xl font-bold tracking-widest font-headline text-primary uppercase animate-glitch-subtle [text-shadow:0_0_8px_hsl(var(--primary)/0.5)]">
          Skills DNA
        </h2>
        <p className="text-accent font-code">The building blocks of my craft.</p>
      </div>

      <div className="w-full max-w-4xl">
        <Accordion type="multiple" className="relative">
          <svg
            ref={svgRef}
            aria-hidden="true"
            className="absolute left-1/2 top-0 hidden h-full w-24 -translate-x-1/2 md:block"
            fill="none"
            style={{ height: height || undefined }}
          >
            {/* Rungs */}
            <g stroke="hsl(var(--accent))" strokeWidth="1">
              {rungs.map(({ y }) => (
                <line
                  key={y}
                  data-rung={y}
                  x1={strandX(y, 0, 1)}
                  x2={strandX(y, 0, -1)}
                  y1={y}
                  y2={y}
                  strokeOpacity={0.3}
                />
              ))}
            </g>

            {/* Strands, as short segments so depth can vary along the length. */}
            {([1, -1] as const).map((side) => (
              <g key={side} stroke="hsl(var(--accent))" strokeLinecap="round">
                {Array.from({ length: segmentCount }, (_, i) => {
                  const y1 = i * SEGMENT;
                  const y2 = Math.min(y1 + SEGMENT, height);
                  return (
                    <line
                      key={i}
                      data-strand={side}
                      x1={strandX(y1, 0, side)}
                      y1={y1}
                      x2={strandX(y2, 0, side)}
                      y2={y2}
                      strokeWidth={2}
                      strokeOpacity={0.4}
                    />
                  );
                })}
              </g>
            ))}

            {/* Pulses travelling down each strand. */}
            {([1, -1] as const).map((side) => (
              <g key={`p${side}`} className="motion-reduce:hidden" fill="hsl(var(--accent))">
                {Array.from({ length: PULSES_PER_STRAND }, (_, i) => (
                  <circle
                    key={i}
                    data-pulse={side}
                    cx={CENTER_X}
                    cy={-10}
                    r={2}
                    className="dark:[filter:drop-shadow(0_0_4px_hsl(var(--accent)))]"
                  />
                ))}
              </g>
            ))}
          </svg>

          <div ref={containerRef} className="space-y-6 md:space-y-12">
            {wovenSkills.map((category, index) => {
              const isLeft = category.side === "left";
              return (
                <div
                  key={category.title}
                  data-side={category.side}
                  className="group/node relative flex items-center"
                  style={{ willChange: "transform" }}
                >
                  {/* Node riding the strand: breathing ring, lit when nearest the viewport centre. */}
                  <span
                    data-node
                    className="absolute left-1/2 top-1/2 z-10 hidden h-4 w-4 md:block"
                    style={{ transform: "translate(-50%, -50%)" }}
                  >
                    <span className="absolute inset-0 rounded-full bg-accent/40 opacity-0 transition-opacity duration-500 group-data-[active=1]/node:opacity-100 motion-safe:animate-ping" />
                    <span className="absolute inset-0 rounded-full border-4 border-background bg-accent shadow-[0_0_10px_hsl(var(--accent)/0.45)] transition-transform duration-500 group-data-[active=1]/node:scale-125 group-data-[active=1]/node:shadow-[0_0_18px_hsl(var(--accent)/0.8)]" />
                  </span>
                  <div className={`w-full md:w-1/2 md:px-4 ${isLeft ? "md:pr-10 md:text-right" : "md:ml-auto md:pl-10 md:text-left"}`}>
                    <AccordionItem value={`item-${index}`} className="border-b-0">
                      <Card className="inline-block w-full border border-accent/30 bg-card/60 shadow-2xl shadow-black/50 backdrop-blur-md transition-all duration-500 group-data-[active=1]/node:border-accent/70 group-data-[active=1]/node:shadow-[0_0_30px_-8px_hsl(var(--accent)/0.5)]">
                        <AccordionTrigger onClick={() => handleAccordionToggle(index)} className="p-0 hover:no-underline [&>svg]:hidden w-full">
                          <CardHeader className="w-full">
                            <CardTitle className={`flex items-center gap-3 text-base font-code text-primary sm:text-lg ${isLeft ? "justify-start md:justify-end" : "justify-start"} [text-shadow:0_0_6px_hsl(var(--primary)/0.6)]`}>
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
                            <div className={`flex flex-wrap gap-2 pt-2 ${isLeft ? "justify-start md:justify-end" : "justify-start"}`}>
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
