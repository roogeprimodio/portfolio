
'use client';

import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 2.5,
      when: 'afterChildren',
    },
  },
  exit: {
    y: '-100vh',
    transition: {
      ease: 'easeInOut',
      duration: 0.8,
    },
  },
};

const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        ease: 'easeOut',
        delay: 1,
      } 
    },
};

export function OpeningAnimation() {
  return (
    <motion.div
      key="opening-animation"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
    >
        <svg width="150" height="150" viewBox="0 0 100 100" className="drop-shadow-[0_0_15px_hsl(var(--accent)/0.5)]">
            <motion.path
                d="M50 10 L90 50 L50 90 L10 50 Z"
                fill="none"
                stroke="hsl(var(--accent))"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            />
             <motion.path
                d="M50 10 L90 50 L50 90 L10 50 Z"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0, scale: 0.8, rotate: 45, x: '50%', y: '50%' }}
                animate={{ pathLength: 1, opacity: 0.5, scale: 1, rotate: 0 }}
                transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
                style={{ transformOrigin: 'center center' }}
            />
        </svg>
        <motion.div variants={textVariants}>
            <h1 className="mt-4 font-headline text-2xl text-primary tracking-widest">
                Wh1te Dem0n
            </h1>
        </motion.div>
        <motion.div variants={textVariants}>
             <p className="mt-2 font-code text-sm text-accent">
                LOADING DATASTREAM...
            </p>
        </motion.div>
    </motion.div>
  );
}
