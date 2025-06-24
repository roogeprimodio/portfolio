import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowDown, Mail, GraduationCap, Building, User } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center text-center">
      <div className="container px-4 md:px-6 z-10">
        <div className="flex flex-col items-center space-y-8">

          <Popover>
            <PopoverTrigger asChild>
              <div className="relative cursor-pointer group">
                 <div className="absolute -inset-1.5 bg-gradient-to-r from-accent to-purple-600 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                 <Image
                    src="https://placehold.co/600x600.png"
                    alt="Developer Portrait"
                    width={150}
                    height={150}
                    className="rounded-full object-cover shadow-lg relative ring-4 ring-background"
                    data-ai-hint="developer portrait"
                  />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="center">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Jane Doe</h4>
                  <p className="text-sm text-muted-foreground">
                    Full-Stack Developer & UI/UX Enthusiast
                  </p>
                </div>
                <div className="grid gap-2 text-left">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm">
                      B.Sc. Computer Science, Tech University
                    </span>
                  </div>
                   <div className="flex items-center gap-3">
                    <Building className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm">
                      Previously at Acme Inc.
                    </span>
                  </div>
                   <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm">
                      5+ Years of Experience
                    </span>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline text-primary leading-tight">
              Crafting Digital Experiences that Inspire
            </h1>
            <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
              I build modern, responsive, and user-centric web applications. Click my picture for details, and let's turn your ideas into reality.
            </p>
          </div>

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
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <Link href="#projects" aria-label="Scroll to projects">
          <ArrowDown className="h-8 w-8 text-muted-foreground animate-bounce" />
        </Link>
      </div>
    </section>
  );
}
