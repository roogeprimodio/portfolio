"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Code, FileDown } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";
import type { Availability } from "@/data/schema";
import { iconFor } from "@/components/layout/social-icons";

/** Copy and dot colour per availability state, driven by profile.ts. */
const AVAILABILITY: Record<
  Availability,
  { label: string; dot: string } | null
> = {
  open: { label: "Available for work", dot: "bg-emerald-400" },
  selective: { label: "Selectively available", dot: "bg-amber-400" },
  // Nothing to advertise when closed — the pill is hidden entirely.
  closed: null,
};

const AnimatedText = ({
  text,
  el: Wrapper = "p",
  className,
}: {
  text: string;
  el?: keyof JSX.IntrinsicElements;
  className?: string;
}) => {
  const words = text.split(" ");

  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger by word
        delayChildren: 0.2,
      },
    },
  };

  const wordVariant = {
    hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", damping: 12, stiffness: 200 },
    },
  };

  return (
    <Wrapper className={className}>
      <motion.span
        variants={sentence}
        initial="hidden"
        animate="visible"
        aria-label={text}
      >
        {words.map((word, index) => (
          <motion.span
            key={word + "-" + index}
            variants={wordVariant}
            className="inline-block"
            aria-hidden="true"
          >
            {word}
            {index < words.length - 1 ? " " : ""}
          </motion.span>
        ))}
      </motion.span>
    </Wrapper>
  );
};

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-4 text-center"
    >
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          /* The orbit box is sized in vmin so the icons scale with the screen
             instead of being pushed off it by fixed negative offsets. */
          className="group relative mb-14 flex aspect-square w-[min(78vw,26rem)] items-center justify-center sm:mb-16"
          style={{ ["--orbit" as string]: "min(34vw, 11rem)" }}
        >
          <div className="relative h-[min(46vw,16rem)] w-[min(32vw,11rem)] overflow-hidden rounded-full border-4 border-primary bg-primary/10 shadow-[0_0_20px_hsl(var(--primary)/0.6)]">
            <Image
              src={profile.avatar}
              alt={profile.name}
              fill
              sizes="(max-width: 640px) 32vw, 176px"
              className="scale-105 object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-110"
              priority
            />
          </div>

          {socials.map((social, index) => {
            const Icon = iconFor(social.icon);
            if (!Icon) return null;

            const isExternal = social.href.startsWith("http");

            return (
              <motion.a
                key={social.name}
                href={social.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                aria-label={social.name}
                className="group/social absolute left-1/2 top-1/2 z-10 rounded-full border border-accent/20 bg-card/60 p-2 text-accent backdrop-blur-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                /* Place on a circle: rotate out to the orbit radius, then
                   counter-rotate so the icon itself stays upright. */
                style={{
                  transform: `translate(-50%, -50%) rotate(${social.angle}deg) translateY(calc(-1 * var(--orbit))) rotate(${-social.angle}deg)`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 + index * 0.15, duration: 0.4 }}
              >
                <Icon className="h-4 w-4 transition-transform group-hover/social:scale-110" />
              </motion.a>
            );
          })}
        </motion.div>

        {AVAILABILITY[profile.availability] && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.3 }}
            className="mb-6 flex items-center gap-2 rounded-full border border-accent/30 bg-card/60 px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span
                className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${AVAILABILITY[profile.availability]!.dot}`}
              />
              <span
                className={`relative inline-flex h-2 w-2 rounded-full ${AVAILABILITY[profile.availability]!.dot}`}
              />
            </span>
            <span className="font-code text-xs uppercase tracking-widest text-accent">
              {profile.availabilityNote ??
                AVAILABILITY[profile.availability]!.label}
            </span>
          </motion.div>
        )}

        <AnimatedText
          text={profile.name.toUpperCase()}
          el="h1"
          className="font-headline text-5xl font-bold uppercase tracking-widest text-primary [text-shadow:0_0_8px_hsl(var(--primary)/0.5)] md:text-7xl"
        />
        <AnimatedText
          text={profile.title}
          el="p"
          className="mt-4 font-code text-lg text-accent [text-shadow:0_0_8px_hsl(var(--accent)/0.5)] md:text-xl"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            asChild
            size="lg"
            className="group border border-accent bg-accent/10 font-headline tracking-widest text-accent transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:shadow-lg hover:shadow-accent/40"
          >
            <Link href="#about">
              VIEW DATASTREAM
              <Code className="ml-2 h-5 w-5 group-hover:animate-glitch" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary/50 bg-card/40 font-headline tracking-widest text-primary transition-all duration-300 hover:border-primary hover:bg-primary/10"
          >
            <Link href="/projects">BROWSE VAULT</Link>
          </Button>
          {profile.resumeUrl && (
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="font-headline tracking-widest text-muted-foreground transition-colors hover:text-accent"
            >
              <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
                RESUME <FileDown className="ml-2 h-5 w-5" />
              </a>
            </Button>
          )}
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
            <ArrowDown className="h-8 w-8 text-accent/50 transition-colors hover:text-accent" />
          </motion.div>
        </Link>
      </div>
    </section>
  );
}
