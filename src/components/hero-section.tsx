import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

export function HeroSection() {
  return (
    <section id="home" className="py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline text-primary">
              Jane Doe, Web Developer
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              I'm a passionate full-stack developer specializing in building
              modern, responsive, and user-friendly web applications. Explore my
              work and get in touch!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href="#projects">
                  View My Work <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#contact">
                  Contact Me <Mail className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-square">
            <Image
              src="https://placehold.co/600x600.png"
              alt="Developer Portrait"
              fill
              className="rounded-full object-cover shadow-lg"
              data-ai-hint="developer portrait"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
