"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Github } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce website built with Next.js, Stripe for payments, and a PostgreSQL database. Features product listings, search, and a user authentication system.",
    tags: ["Next.js", "React", "TypeScript", "Stripe", "PostgreSQL"],
    image: "https://placehold.co/600x400.png",
    imageHint: "online shopping",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with drag-and-drop functionality, real-time updates using WebSockets, and a clean, intuitive user interface.",
    tags: ["React", "Node.js", "Express", "MongoDB", "WebSocket"],
    image: "https://placehold.co/600x400.png",
    imageHint: "project management",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Data Visualization Dashboard",
    description: "A dashboard for visualizing complex datasets using D3.js. Allows users to interact with charts and graphs to explore data insights dynamically.",
    tags: ["D3.js", "JavaScript", "HTML", "CSS", "API"],
    image: "https://placehold.co/600x400.png",
    imageHint: "data dashboard",
    liveUrl: "#",
    githubUrl: "#",
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const cardVariants = {
    hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const imageVariants = {
    hidden: { scale: 1.1 },
    visible: { scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="bg-card/30 backdrop-blur-sm border border-border/20 rounded-xl overflow-hidden shadow-lg"
    >
      <div
        className={`flex flex-col md:flex-row items-center gap-8 ${
          index % 2 !== 0 ? "md:flex-row-reverse" : ""
        }`}
      >
        <div className="md:w-1/2 aspect-video relative overflow-hidden">
          <motion.div variants={imageVariants} className="w-full h-full">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              data-ai-hint={project.imageHint}
            />
          </motion.div>
        </div>

        <div className="md:w-1/2 p-8 pt-0 md:pt-8 space-y-4">
          <h3 className="font-headline text-2xl lg:text-3xl font-bold text-primary">{project.title}</h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-accent/10 text-accent border-none">{tag}</Badge>
            ))}
          </div>
          <p className="text-muted-foreground text-base">{project.description}</p>
          <div className="flex w-full gap-4 pt-2">
            <Button asChild className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href={project.liveUrl} target="_blank">
                Live Demo <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href={project.githubUrl} target="_blank">
                <Github className="mr-2 h-4 w-4" /> GitHub
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export function ProjectsSection() {
  return (
    <section id="projects" className="py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">
            Featured Projects
          </h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
            A selection of my work. See what I can do.
          </p>
        </div>
        <div className="grid gap-12 md:gap-16">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
