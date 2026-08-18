"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import { OpeningAnimation } from "./opening-animation";

/** Duration of the opening sequence, in ms. */
const INTRO_MS = 3000;
const SEEN_KEY = "intro-played";

/**
 * Isolates the intro's client state so the pages themselves stay server
 * components and still render their content into the HTML.
 *
 * The intro plays once per browser session, not on every navigation back to
 * the homepage — a three-second gate on a repeat visit is a bounce, not a
 * flourish. It is skipped entirely for visitors who ask for reduced motion.
 */
export function IntroGate() {
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let alreadyPlayed = false;
    try {
      alreadyPlayed = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      // Storage can throw in private mode or with cookies blocked. Falling
      // through just means the intro plays — never break the page over it.
    }

    if (prefersReducedMotion || alreadyPlayed) {
      setIsPlaying(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsPlaying(false);
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* see above */
      }
    }, INTRO_MS);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>{isPlaying && <OpeningAnimation />}</AnimatePresence>
  );
}
