
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowDown, Code } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const AnimatedText = ({ text, el: Wrapper = "p", className }: { text: string, el?: keyof JSX.IntrinsicElements, className?: string }) => {
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", damping: 12, stiffness: 200 } },
  };

  return (
    <Wrapper className={className}>
      <motion.span variants={sentence} initial="hidden" animate="visible" aria-label={text}>
        {text.split("").map((char, index) => (
          <motion.span key={char + "-" + index} variants={letter} className="inline-block" aria-hidden="true">
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
    </Wrapper>
  );
};


export function HeroSection() {
  return (
    <section id="home" className="relative h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden">
      
      <div className="relative flex flex-col items-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="relative mb-6"
        >
          <Image
            src="/profile.png"
            alt="JAGDISH ODEDARA"
            width={160}
            height={210}
            className="object-contain drop-shadow-[0_10px_15px_hsl(var(--primary)/0.2)]"
            priority
            data-ai-hint="profile picture"
          />
        </motion.div>
        
        <AnimatedText text="JAGDISH ODEDARA" el="h1" className="font-headline text-5xl md:text-7xl font-bold tracking-widest text-primary uppercase [text-shadow:0_0_8px_hsl(var(--primary)/0.5)]" />
        <AnimatedText text="Digital Craftsman & Code Poet" el="p" className="mt-4 font-code text-lg md:text-xl text-accent [text-shadow:0_0_8px_hsl(var(--accent)/0.5)]" />

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5 }}
        >
          <Button asChild size="lg" className="mt-12 group bg-accent/10 text-accent border border-accent hover:bg-accent hover:text-accent-foreground hover:shadow-lg hover:shadow-accent/40 transition-all duration-300 font-headline tracking-widest">
            <Link href="#about">
              VIEW DATASTREAM
              <Code className="ml-2 h-5 w-5 group-hover:animate-glitch"/>
            </Link>
          </Button>
        </motion.div>
      </div>

       <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <Link href="#about" aria-label="Scroll to about">
           <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 1 }}
              className="animate-bounce"
            >
              <ArrowDown className="h-8 w-8 text-accent/50 hover:text-accent transition-colors" />
            </motion.div>
        </Link>
      </div>
    </section>
  );
}
