import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Github } from "lucide-react";

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

export function ProjectsSection() {
  return (
    <section id="projects" className="py-16 md:py-24 lg:py-32 bg-primary/5">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">
            My Projects
          </h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
            A selection of my work. See what I can do.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.title} className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardHeader className="p-0">
                <div className="aspect-video relative">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    data-ai-hint={project.imageHint}
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-4 p-6">
                <CardTitle className="font-headline">{project.title}</CardTitle>
                <p className="text-muted-foreground text-sm">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <div className="flex w-full gap-4">
                  <Button asChild className="flex-1">
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
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
