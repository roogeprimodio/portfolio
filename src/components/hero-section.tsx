import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowDown, Mail } from "lucide-react";

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-[calc(100vh-4rem)] flex items-center">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-16 items-center">
          <div className="space-y-6 lg:col-span-3">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
              Full-Stack Developer & UI/UX Enthusiast
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline text-primary leading-tight">
              Crafting Digital Experiences that Inspire
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              I'm Jane Doe, a developer passionate about building modern, responsive, and user-centric web applications. Let's turn ideas into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="#projects">
                  Explore My Work
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#contact">
                  Get in Touch <Mail className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="lg:col-span-2 flex justify-center items-center">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent to-purple-600 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <Image
                src="https://placehold.co/600x600.png"
                alt="Developer Portrait"
                width={400}
                height={400}
                className="rounded-full object-cover shadow-lg relative"
                data-ai-hint="developer portrait"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <Link href="#projects" aria-label="Scroll to projects">
          <ArrowDown className="h-8 w-8 text-muted-foreground animate-bounce" />
        </Link>
      </div>
    </section>
  );
}
