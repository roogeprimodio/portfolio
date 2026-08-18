"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Lenis momentum scrolling, driven by GSAP's ticker.
 *
 * Two scroll systems running independently will fight each other, so Lenis is
 * stepped from GSAP's ticker and ScrollTrigger is told to read scroll position
 * from Lenis rather than from the window. That keeps scroll-driven animations
 * in sync with the smoothed position instead of the raw one.
 *
 * The whole thing is skipped for `prefers-reduced-motion`: hijacking scroll is
 * exactly what that setting exists to prevent.
 */
export function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,
      // Gentle ease-out; anything heavier starts to feel laggy rather than smooth.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Touch devices already have native momentum — smoothing it again fights
      // the platform and feels wrong.
      syncTouch: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    // The side-nav needs to jump to anchors. Native scrollIntoView fights a
    // smooth-scroll library, so publish the instance and let the nav use it.
    window.__lenis = lenis;

    const tick = (time: number) => {
      // GSAP's ticker reports seconds; Lenis expects milliseconds.
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Reveal-on-scroll for the homepage sections. Kept declarative and cheap:
    // one trigger per section, each firing once.
    const context = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      sections.forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            once: true,
          },
        });
      });
    });

    return () => {
      gsap.ticker.remove(tick);
      context.revert();
      lenis.destroy();
      delete window.__lenis;
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
