
'use client';

import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 3.5, // Increased delay for the new animation
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
        duration: 0.8, 
        ease: 'easeOut',
        delay: 2.5, // Delay text to appear after the main animation
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
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background overflow-hidden"
    >
        {/* Flash Effect */}
        <motion.div
            className="absolute w-px h-px rounded-full bg-primary"
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: [0, 600, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1, ease: "easeInOut", delay: 1.6 }}
        />
        
        <div className="relative flex items-center justify-center">
            <svg width="150" height="150" viewBox="0 0 100 100" className="drop-shadow-[0_0_15px_hsl(var(--accent)/0.5)] z-10">
                {/* Eye Group */}
                <g>
                    {/* Top Eyelid */}
                    <motion.path
                        fill="none"
                        stroke="hsl(var(--accent))"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        initial={{ d: "M 30 50 Q 50 50 70 50" }}
                        animate={{ d: "M 30 50 Q 50 30 70 50" }}
                        transition={{ duration: 0.8, ease: "easeInOut", delay: 1 }}
                    />
                    {/* Bottom Eyelid */}
                    <motion.path
                        fill="none"
                        stroke="hsl(var(--accent))"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        initial={{ d: "M 30 50 Q 50 50 70 50" }}
                        animate={{ d: "M 30 50 Q 50 70 70 50" }}
                        transition={{ duration: 0.8, ease: "easeInOut", delay: 1 }}
                    />
                    {/* Pupil */}
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="6"
                        fill="hsl(var(--primary))"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4, ease: "easeOut", delay: 1.8 }}
                    />
                </g>
            </svg>
        </div>


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
