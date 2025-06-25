
"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

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
    <div className="relative w-full h-full rounded-xl border border-accent/30 bg-card/60 backdrop-blur-md p-6 text-left [transform-style:preserve-3d] transition-shadow duration-300 group-hover:shadow-2xl group-hover:shadow-accent/20 flex flex-col">
      <div className="absolute -top-4 -left-4 -right-4 h-24 bg-gradient-to-b from-accent/10 to-transparent [transform:translateZ(20px)] rounded-t-xl"></div>
      <h3 className="font-headline text-2xl font-bold text-primary [transform:translateZ(40px)]">{project.title}</h3>
      <div className="flex flex-wrap gap-2 mt-2 [transform:translateZ(30px)]">
        {project.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="font-code bg-accent/10 text-accent border-accent/20">{tag}</Badge>
        ))}
      </div>
      <p className="mt-4 text-muted-foreground text-sm flex-grow [transform:translateZ(20px)]">{project.description}</p>
      
      <div className="flex w-full gap-4 pt-2 [transform:translateZ(50px)]">
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

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export function ProjectsSection() {
    const [[page, direction], setPage] = useState([0, 0]);

    const paginate = (newDirection: number) => {
      setPage([page + newDirection, newDirection]);
    };

    // This makes the carousel wrap around
    const projectIndex = ((page % projects.length) + projects.length) % projects.length;

  return (
    <section id="projects" className="flex flex-col items-center justify-center overflow-hidden [perspective:1000px] p-4">
      <div className="text-center space-y-2 mb-12 px-4">
        <h2 className="text-4xl md:text-5xl font-bold tracking-widest font-headline text-primary uppercase animate-glitch-subtle [text-shadow:0_0_8px_hsl(var(--primary)/0.5)]">
          Projects Vault
        </h2>
        <p className="text-accent font-code">A collection of memory chips.</p>
      </div>
      
      <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg h-[420px] flex items-center justify-center">
        <motion.div
            className="absolute z-20 left-0 md:-left-16 top-1/2 -translate-y-1/2"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
          <Button onClick={() => paginate(-1)} size="icon" variant="outline" className="rounded-full h-12 w-12 bg-card/50 border-accent/30 hover:bg-accent hover:text-accent-foreground">
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </motion.div>

        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
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
            className="group absolute w-[320px] md:w-[380px] h-96 [transform-style:preserve-3d]"
          >
            <div className="absolute inset-0 bg-accent/10 rounded-xl blur-lg transition-all duration-500 group-hover:blur-2xl group-hover:bg-accent/20"></div>
            <ProjectCard project={projects[projectIndex]} />
          </motion.div>
        </AnimatePresence>
        
        <motion.div
            className="absolute z-20 right-0 md:-right-16 top-1/2 -translate-y-1/2"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
          <Button onClick={() => paginate(1)} size="icon" variant="outline" className="rounded-full h-12 w-12 bg-card/50 border-accent/30 hover:bg-accent hover:text-accent-foreground">
            <ChevronRight className="h-6 w-6" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
