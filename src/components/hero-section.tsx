
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  ArrowDown,
  Code,
  Github,
  Instagram,
  Linkedin,
  Phone,
  Send,
  Twitter,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

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

const RedditIcon = (props: React.ComponentProps<'svg'>) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    {...props}
  >
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87s-7.004-2.176-7.004-4.87c0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.34.34 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12.469c.53 0 .96.43.96.96s-.43.96-.96.96-.96-.43-.96-.96.43-.96.96-.96zm5.5 0c.53 0 .96.43.96.96s-.43.96-.96.96-.96-.43-.96-.96.43-.96.96-.96zM12 15.968c-1.664 0-3.023-.956-3.023-2.131 0-.225.053-.438.147-.636C10.278 13.511 11.166 13.74 12 13.74c.834 0 1.722-.229 2.876-.636.094.198.147.41.147.636 0 1.175-1.359 2.131-3.023 2.131z" />
  </svg>
);

const socialIcons = [
  {
    Icon: Instagram,
    href: 'https://www.instagram.com/jagadish_.odedra/',
    name: 'Instagram',
    pos: 'top-[-2.5rem] left-1/2 -translate-x-1/2',
  },
  {
    Icon: Twitter,
    href: 'https://twitter.com/jagdishodedara0',
    name: 'Twitter',
    pos: 'top-4 left-[-4.5rem]',
  },
  {
    Icon: Linkedin,
    href: 'https://www.linkedin.com/in/jagdish-odedara-4703532a8/',
    name: 'LinkedIn',
    pos: 'top-4 right-[-4.5rem]',
  },
  {
    Icon: Github,
    href: 'https://github.com/roogeprimodio',
    name: 'GitHub',
    pos: 'top-1/2 -translate-y-1/2 left-[-5.5rem]',
  },
  {
    Icon: Phone,
    href: 'tel:9773075648',
    name: 'Call',
    pos: 'top-1/2 -translate-y-1/2 right-[-5.5rem]',
  },
  {
    Icon: Send,
    href: 'https://t.me/R00ge',
    name: 'Telegram',
    pos: 'bottom-4 left-[-4.5rem]',
  },
  {
    Icon: RedditIcon,
    href: 'https://www.reddit.com/',
    name: 'Reddit',
    pos: 'bottom-4 right-[-4.5rem]',
  },
];

export function HeroSection() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    mounted;
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
          {/* Top part of the frame (sits behind) */}
          <div className="absolute top-0 left-0 w-full h-[30%] bg-primary rounded-t-full z-0" />

          {/* Bottom part of the frame (sits behind) */}
          <div className="absolute bottom-0 left-0 w-full h-[70%] bg-accent rounded-b-full z-0" />

          {/* 
            Image container that clips the image at the bottom.
            It's positioned at the bottom and covers 70% of the height.
            'overflow-hidden' ensures the image doesn't spill out from the bottom.
          */}
          <div className="absolute bottom-0 left-0 w-full h-[70%] rounded-b-full overflow-hidden z-10">
            {/* 
              This inner container is made taller than its parent to allow the image 
              to be full-sized while being aligned to the bottom.
              Height is 100% / 0.7 = ~143% to counteract the parent's 70% height.
            */}
            <div className="relative w-full h-[143%]">
              <Image
                src="/jagdish.png"
                alt="JAGDISH ODEDARA"
                fill
                className="object-contain object-bottom drop-shadow-xl transition-transform duration-500 group-hover:scale-[1.05]"
                priority
                data-ai-hint="profile picture"
              />
            </div>
          </div>

          {/* Floating Icons */}
          {socialIcons.map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className={`absolute ${social.pos} p-2 rounded-full bg-card/60 text-accent backdrop-blur-sm border border-accent/20 hover:bg-accent hover:text-accent-foreground transition-colors z-20`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 1.8 + index * 0.1,
                ease: 'easeOut',
              }}
              whileHover={{ scale: 1.2, z: 30 }}
            >
              <social.Icon className="h-4 w-4" />
            </motion.a>
          ))}
        </motion.div>

        <AnimatedText
          text="JAGDISH ODEDARA"
          el="h1"
          className="text-5xl md:text-7xl font-bold tracking-widest text-primary uppercase"
        />
        <AnimatedText
          text="Digital Craftsman & Code Poet"
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
