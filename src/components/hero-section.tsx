
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  ArrowDown,
  Code,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { portfolioData } from '@/lib/portfolio-data';

const AnimatedText = ({
  text,
  el: Wrapper = 'p',
  className,
}: {
  text: string;
  el?: keyof JSX.IntrinsicElements;
  className?: string;
}) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const words = text.split(' ');

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
    hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', damping: 12, stiffness: 200 },
    },
  };

  if (!mounted) {
    return (
      <Wrapper className={cn(className, 'opacity-0')}>
        {text}
      </Wrapper>
    );
  }

  return (
    <Wrapper
      className={cn(
        className,
        mounted &&
          (resolvedTheme === 'dark' ? 'font-headline-dark' : 'font-headline')
      )}
    >
      <motion.span
        variants={sentence}
        initial="hidden"
        animate="visible"
        aria-label={text}
      >
        {words.map((word, index) => (
          <motion.span
            key={word + '-' + index}
            variants={wordVariant}
            className="inline-block"
            aria-hidden="true"
          >
            {word}
            {index < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        ))}
      </motion.span>
    </Wrapper>
  );
};

export function HeroSection() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="home"
      className="relative h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden"
    >
      <div className="relative flex flex-col items-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="relative w-40 h-52 mb-16 group"
        >
          {/* Layer 1: The Glow for the entire capsule shape */}
          <div className="absolute inset-0 rounded-full drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)] z-0" />

          {/* Layer 2: Top half of the border (BEHIND the image) */}
          <div className="absolute top-0 left-0 w-full h-1/2 border-t-4 border-l-4 border-r-4 border-primary rounded-t-full z-10" />

          {/* Layer 3: The Image */}
          <div className="relative w-full h-full p-1 z-20">
            <Image
              src={portfolioData.personalInfo.profileImage}
              alt={portfolioData.personalInfo.name}
              fill
              className="object-cover object-center rounded-full drop-shadow-xl transition-transform duration-500 group-hover:scale-[1.05] group-hover:-translate-y-px origin-bottom"
              priority
              data-ai-hint="profile picture"
            />
          </div>

          {/* Layer 4: Bottom half of the border (IN FRONT of the image) */}
          <div className="absolute bottom-0 left-0 w-full h-1/2 border-b-4 border-l-4 border-r-4 border-primary rounded-b-full z-30 pointer-events-none" />

          {portfolioData.socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className={`absolute ${social.pos} p-2 rounded-full bg-card/60 text-accent backdrop-blur-sm border border-accent/20 hover:bg-accent hover:text-accent-foreground transition-colors z-40`}
              initial={{ opacity: 0, scale: 0.5, y: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: ["0rem", "-0.5rem", "0rem"],
              }}
              transition={{
                opacity: { duration: 0.5, delay: 1.8 + index * 0.1, ease: "easeOut" },
                scale: { duration: 0.5, delay: 1.8 + index * 0.1, ease: "easeOut" },
                y: {
                  duration: 3 + index * 0.2,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: 1.8 + index * 0.1,
                },
              }}
              whileHover={{ scale: 1.2, y: 0, z: 50 }}
            >
              <social.Icon className="h-4 w-4" />
            </motion.a>
          ))}
        </motion.div>

        <AnimatedText
          text={portfolioData.personalInfo.name}
          el="h1"
          className="text-5xl md:text-7xl font-bold tracking-widest text-primary uppercase"
        />
        <AnimatedText
          text={portfolioData.personalInfo.tagline}
          el="p"
          className={cn(
            'mt-4 font-code text-lg md:text-xl text-accent',
            mounted &&
              (resolvedTheme === 'dark'
                ? 'dark:[text-shadow:0_0_8px_hsl(var(--accent)/0.5)]'
                : 'light:animate-electric-glow-accent')
          )}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.5 }}
        >
          <Button
            asChild
            size="lg"
            className={cn(
              'mt-12 group bg-accent/10 text-accent border border-accent hover:bg-accent hover:text-accent-foreground hover:shadow-lg hover:shadow-accent/40 transition-all duration-300 tracking-widest',
              mounted &&
                (resolvedTheme === 'dark' ? 'font-headline-dark' : 'font-headline')
            )}
          >
            <Link href="#about">
              VIEW DATASTREAM
              <Code className="ml-2 h-5 w-5 group-hover:animate-glitch" />
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
