
"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import type { ProjectType } from "@/lib/portfolio-data";
import { projects } from "@/lib/portfolio-data";
import { useTheme } from "next-themes";

const ProjectCard = ({ project, index }: { project: ProjectType; index: number }) => {
  const avatarUrl = `https://api.dicebear.com/8.x/bottts-neutral/svg?seed=${encodeURIComponent(project.title)}`;
  const { resolvedTheme } = useTheme();
  
  return (
    <div className="group relative w-full h-full rounded-3xl border border-accent/20 bg-card/50 backdrop-blur-sm p-6 flex flex-col shadow-lg">
      <div className="relative h-48 w-full mb-6 rounded-xl overflow-hidden border border-accent/10 bg-black/30">
        <Image
          src={avatarUrl}
          alt={project.title}
          fill
          className="object-contain p-4 opacity-70 group-hover:opacity-90 transition-opacity duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10"></div>
        <div className="absolute top-3 left-3 font-code text-xs text-accent/70 tracking-widest">
          SPECIMEN: #00{index + 1}
        </div>
      </div>

      <h3 
        className={cn(
          "text-2xl font-bold text-primary text-center",
          resolvedTheme === 'dark' ? 'font-headline-dark' : 'font-headline'
        )}
      >
        {project.title}
      </h3>
      
      <div className="flex flex-wrap gap-2 justify-center mt-3">
        {project.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="font-code text-xs bg-accent/10 text-accent border-accent/20">{tag}</Badge>
        ))}
      </div>

      <p className="mt-4 text-muted-foreground text-sm flex-grow text-center px-2">
        {project.description}
      </p>
      
      <div className="flex w-full gap-4 pt-4 mt-auto">
        <Button asChild size="sm" className="flex-1 bg-accent/80 text-accent-foreground hover:bg-accent hover:shadow-md hover:shadow-accent/40 font-code" disabled={project.liveUrl === '#'}>
          <Link href={project.liveUrl} target="_blank">
            VIEW <ArrowUpRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
        <Button asChild size="sm" variant="outline" className="flex-1 bg-card/80 border-accent/50 hover:bg-card hover:border-accent font-code" disabled={project.githubUrl === '#'}>
          <Link href={project.githubUrl} target="_blank">
            <Github className="mr-1 h-4 w-4" /> Schematics
          </Link>
        </Button>
      </div>
    </div>
  );
};


const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export function ProjectsSection() {
    const allTags = useMemo(() => ['All', ...new Set(projects.flatMap(p => p.tags))], []);
    const [activeTag, setActiveTag] = useState('All');
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const [activeIndex, setActiveIndex] = useState(0);
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        if (activeTag === 'All') {
            setFilteredProjects(projects);
        } else {
            setFilteredProjects(projects.filter(p => p.tags.includes(activeTag)));
        }
        setActiveIndex(0);
    }, [activeTag]);

    const paginate = (newDirection: number) => {
      setActiveIndex((prevIndex) => (prevIndex + newDirection + filteredProjects.length) % filteredProjects.length);
    };

    const cardWidth = 288; // w-72
    const mdCardWidth = 320; // w-80
    const cardGap = 16; // gap-4
    const mdCardGap = 32; // md:gap-8

  return (
    <section id="projects" className="flex flex-col items-center justify-center p-4 py-24 overflow-hidden">
      <div className="text-center space-y-2 mb-12 px-4">
        <h2 
          className={cn(
            "text-4xl md:text-5xl font-bold tracking-widest uppercase animate-glitch-subtle",
            resolvedTheme === 'dark' ? 'font-headline-dark text-primary dark:[text-shadow:0_0_8px_hsl(var(--primary)/0.5)]' : 'font-headline text-primary light:animate-electric-glow'
          )}
        >
          Hibernation Vault
        </h2>
        <p className="text-accent font-code">A collection of cryo-preserved projects.</p>
      </div>
      
       {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-12 px-4">
          {allTags.map(tag => (
              <Button
                  key={tag}
                  variant={activeTag === tag ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveTag(tag)}
                  className={cn(
                    "font-code transition-all duration-200",
                    activeTag === tag ? 'bg-accent text-accent-foreground' : 'bg-card/50 border-accent/30 text-accent'
                  )}
              >
                  {tag}
              </Button>
          ))}
      </div>

      <div className="relative w-full flex flex-col items-center">
        <div className="relative w-full h-[680px] flex items-center justify-center">
          {/* Carousel Track */}
          <motion.div
            key={activeTag}
            className="absolute flex items-center"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                }
            }}
            // This custom property is used to dynamically center the active card based on screen size
            animate={{ 
              x: `calc(50% - var(--card-width, ${cardWidth}px) / 2 - ${activeIndex} * (var(--card-width, ${cardWidth}px) + var(--card-gap, ${cardGap}px)))`
            }}
            transition={{ type: "spring", stiffness: 400, damping: 60 }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                className="flex-shrink-0 w-72 md:w-80 h-[640px]"
                style={{
                  margin: `0 ${cardGap / 2}px`,
                  // @ts-ignore
                  "--card-width": "288px",
                  "--card-gap": `${cardGap}px`
                }}
                animate={{
                    scale: index === activeIndex ? 1 : 0.7,
                    opacity: index === activeIndex ? 1 : 0.3,
                    zIndex: projects.length - Math.abs(activeIndex - index),
                }}
                transition={{ type: "spring", stiffness: 400, damping: 50 }}
              >
                <div
                    className="md:hidden"
                    style={{
                      // @ts-ignore
                      "--card-width": `${cardWidth}px`,
                      "--card-gap": `${cardGap}px`,
                    }}
                ></div>
                <div
                    className="hidden md:block"
                    style={{
                      // @ts-ignore
                      "--card-width": `${mdCardWidth}px`,
                      "--card-gap": `${mdCardGap}px`,
                    }}
                ></div>
                <ProjectCard project={project} index={projects.indexOf(project)} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-8 mt-8">
            <Button onClick={() => paginate(-1)} size="icon" variant="outline" className="rounded-full h-12 w-12 bg-card/50 border-accent/30 hover:bg-accent hover:text-accent-foreground z-20" disabled={filteredProjects.length <= 1}>
                <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button onClick={() => paginate(1)} size="icon" variant="outline" className="rounded-full h-12 w-12 bg-card/50 border-accent/30 hover:bg-accent hover:text-accent-foreground z-20" disabled={filteredProjects.length <= 1}>
                <ChevronRight className="h-6 w-6" />
            </Button>
        </div>
      </div>
    </section>
  );
}
