
'use client';

import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 3.5, // Total duration before exiting
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
        <div className="relative flex items-center justify-center">
            <svg width="200" height="200" viewBox="0 0 100 100" className="drop-shadow-[0_0_15px_hsl(var(--accent)/0.5)] z-10">
                {/* Eye Group */}
                <g>
                    {/* Top Eyelid */}
                    <motion.path
                        fill="none"
                        stroke="hsl(var(--accent))"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        initial={{ d: "M 20 50 Q 50 50 80 50" }}
                        animate={{ d: "M 20 50 Q 50 25 80 50" }}
                        transition={{ duration: 0.8, ease: "easeInOut", delay: 1 }}
                    />
                    {/* Bottom Eyelid */}
                    <motion.path
                        fill="none"
                        stroke="hsl(var(--accent))"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        initial={{ d: "M 20 50 Q 50 50 80 50" }}
                        animate={{ d: "M 20 50 Q 50 75 80 50" }}
                        transition={{ duration: 0.8, ease: "easeInOut", delay: 1 }}
                    />
                    {/* Pupil */}
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="8"
                        stroke="hsl(var(--accent))"
                        strokeWidth="2"
                        strokeDasharray="5 46"
                        initial={{ scale: 0, opacity: 0, strokeDashoffset: 0 }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            cx: [50, 47, 53, 50],
                            cy: [50, 52, 48, 50],
                            strokeDashoffset: -51,
                            fill: ["hsl(var(--primary))", "hsl(var(--primary))", "hsl(0 70% 90%)"],
                        }}
                        transition={{
                            // Looping animations
                            cx: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 2.2 },
                            cy: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 2.2 },
                            strokeDashoffset: { duration: 1.5, repeat: Infinity, ease: "linear", delay: 2.0 },
                            
                            // One-time animations
                            scale: { duration: 0.4, ease: "easeOut", delay: 1.8, repeat: 0 },
                            opacity: { duration: 0.4, ease: "easeOut", delay: 1.8, repeat: 0 },
                            fill: { duration: 0.5, ease: "easeIn", delay: 3.0, repeat: 0 }
                        }}
                    />
                </g>
            </svg>
        </div>


        <motion.div variants={textVariants}>
            <h1 className="mt-4 font-headline text-2xl text-primary tracking-widest">
                JAGDISH ODEDARA
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
