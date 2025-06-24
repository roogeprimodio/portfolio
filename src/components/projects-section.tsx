"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Github } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

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


export function ProjectsSection() {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [carouselWidth, setCarouselWidth] = useState(0);

    useEffect(() => {
        const calculateWidth = () => {
            if (carouselRef.current) {
                const scrollWidth = carouselRef.current.scrollWidth;
                const offsetWidth = carouselRef.current.offsetWidth;
                setCarouselWidth(scrollWidth - offsetWidth);
            }
        }
        
        calculateWidth();
        window.addEventListener('resize', calculateWidth);
        
        return () => window.removeEventListener('resize', calculateWidth);
    }, []);

  return (
    <section id="projects" className="h-screen flex flex-col items-center justify-center overflow-x-hidden [perspective:1000px]" style={{ scrollSnapAlign: 'start' }}>
      <div className="text-center space-y-2 mb-12 px-4">
        <h2 className="text-4xl md:text-5xl font-bold tracking-widest font-headline text-primary uppercase animate-glitch-subtle">
          Projects Vault
        </h2>
        <p className="text-accent font-code">A collection of memory chips.</p>
      </div>

      <motion.div 
        ref={carouselRef} 
        className="cursor-grab w-full"
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div 
          drag="x" 
          dragConstraints={{ right: 0, left: -carouselWidth }}
          className="flex space-x-8 px-8 md:px-16"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              whileHover={{ rotateY: 10, rotateX: -5, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="group relative flex-shrink-0 w-[320px] md:w-[380px] h-96 [transform-style:preserve-3d]"
            >
              <div className="absolute inset-0 bg-accent/10 rounded-xl blur-lg transition-all duration-500 group-hover:blur-2xl group-hover:bg-accent/20"></div>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
