"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowDown, Mail, GraduationCap, Building, User } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { motion } from "framer-motion";

const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.2,
      staggerChildren: 0.04,
    },
  },
};

const letter = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const headingText = "Crafting Digital Experiences that Inspire";

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center text-center overflow-hidden">
      <div className="container px-4 md:px-6 z-10">
        <div className="flex flex-col items-center space-y-8">

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.1,
              ease: [0, 0.71, 0.2, 1.01]
            }}
          >
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
              <PopoverContent className="w-80 md:w-96" align="center">
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
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline text-primary leading-tight"
              variants={sentence}
              initial="hidden"
              animate="visible"
            >
              {headingText.split("").map((char, index) => {
                if (char === " ") {
                  return <span key={index}> </span>;
                }
                return (
                  <motion.span key={index} variants={letter} className="inline-block">
                    {char}
                  </motion.span>
                );
              })}
            </motion.h1>
            <motion.p 
              className="max-w-[700px] mx-auto text-muted-foreground md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.8 }}
            >
              I specialize in building intuitive, high-performance web applications. Explore my work and let's create something amazing together.
            </motion.p>
          </div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3, duration: 0.8 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="#projects">
                  Explore My Work
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="lg" variant="outline">
                <Link href="#contact">
                  Get in Touch <Mail className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <Link href="#projects" aria-label="Scroll to projects">
           <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              <ArrowDown className="h-8 w-8 text-muted-foreground" />
            </motion.div>
        </Link>
      </div>
    </section>
  );
}
