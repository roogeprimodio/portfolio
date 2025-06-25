
"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce website built with Next.js, Stripe for payments, and a PostgreSQL database. Features product listings, search, and a user authentication system.",
    tags: ["Next.js", "React", "Stripe", "Auth"],
    image: "https://placehold.co/600x400.png",
    imageHint: "online shopping",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with drag-and-drop functionality, real-time updates using WebSockets, and a clean, intuitive user interface.",
    tags: ["React", "Node.js", "MongoDB", "WebSockets"],
    image: "https://placehold.co/600x400.png",
    imageHint: "project management",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Data Viz Dashboard",
    description: "A dashboard for visualizing complex datasets using D3.js. Allows users to interact with charts and graphs to explore data insights dynamically.",
    tags: ["D3.js", "JavaScript", "API"],
    image: "https://placehold.co/600x400.png",
    imageHint: "data dashboard",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Cyber-Security Suite",
    description: "An integrated security suite featuring real-time threat detection and network vulnerability scanning, all presented in a holographic interface.",
    tags: ["Python", "AI", "CyberSec"],
    image: "https://placehold.co/600x400.png",
    imageHint: "cyber security",
    liveUrl: "#",
    githubUrl: "#",
  }
];

const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
  return (
    <div className="relative w-full h-full rounded-xl border border-accent/30 bg-card/60 backdrop-blur-md p-6 text-left flex flex-col shadow-lg">
      <div className="relative h-40 w-full mb-4 rounded-lg overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          data-ai-hint={project.imageHint}
        />
      </div>
      <h3 className="font-headline text-xl font-bold text-primary">{project.title}</h3>
      <div className="flex flex-wrap gap-2 mt-2">
        {project.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="font-code text-xs bg-accent/10 text-accent border-accent/20">{tag}</Badge>
        ))}
      </div>
      <p className="mt-3 text-muted-foreground text-sm flex-grow">{project.description}</p>
      
      <div className="flex w-full gap-4 pt-2 mt-auto">
        <Button asChild size="sm" className="flex-1 bg-accent/80 text-accent-foreground hover:bg-accent hover:shadow-md hover:shadow-accent/40 font-code">
          <Link href={project.liveUrl} target="_blank">
            Live Demo <ArrowUpRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
        <Button asChild size="sm" variant="outline" className="flex-1 bg-card/80 border-accent/50 hover:bg-card hover:border-accent font-code">
          <Link href={project.githubUrl} target="_blank">
            <Github className="mr-1 h-4 w-4" /> GitHub
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
    const [activeIndex, setActiveIndex] = useState(0);

    const paginate = (newDirection: number) => {
      setActiveIndex((prevIndex) => (prevIndex + newDirection + projects.length) % projects.length);
    };

    const cardWidth = 320; // w-80
    const mdCardWidth = 384; // w-96
    const cardGap = 16; // gap-4
    const mdCardGap = 32; // md:gap-8

  return (
    <section id="projects" className="flex flex-col items-center justify-center p-4 py-24 overflow-hidden">
      <div className="text-center space-y-2 mb-12 px-4">
        <h2 className="text-4xl md:text-5xl font-bold tracking-widest font-headline text-primary uppercase animate-glitch-subtle [text-shadow:0_0_8px_hsl(var(--primary)/0.5)]">
          Projects Vault
        </h2>
        <p className="text-accent font-code">A collection of memory chips.</p>
      </div>
      
      <div className="relative w-full flex flex-col items-center">
        <div className="relative w-full h-[480px] flex items-center justify-center overflow-x-hidden">
          {/* Carousel Track */}
          <motion.div
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
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                className="flex-shrink-0 w-80 md:w-96 h-[450px]"
                style={{
                  margin: `0 ${cardGap / 2}px`,
                  // @ts-ignore
                  "--card-width": "320px",
                  "--card-gap": `${cardGap}px`
                }}
                animate={{
                    scale: index === activeIndex ? 1 : 0.85,
                    opacity: index === activeIndex ? 1 : 0.6,
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
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-8 mt-8">
            <Button onClick={() => paginate(-1)} size="icon" variant="outline" className="rounded-full h-12 w-12 bg-card/50 border-accent/30 hover:bg-accent hover:text-accent-foreground z-20">
                <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button onClick={() => paginate(1)} size="icon" variant="outline" className="rounded-full h-12 w-12 bg-card/50 border-accent/30 hover:bg-accent hover:text-accent-foreground z-20">
                <ChevronRight className="h-6 w-6" />
            </Button>
        </div>
      </div>
    </section>
  );
}
