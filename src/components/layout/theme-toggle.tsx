"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";

/** `document.startViewTransition` is not in the DOM lib yet. */
type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => { finished: Promise<void> };
};

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // The server has no idea which theme will resolve, so the icon can only be
  // decided after mount. Rendering a placeholder avoids a hydration mismatch
  // and a flash of the wrong icon.
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  const toggle = () => {
    const next = isDark ? "light" : "dark";
    const doc = document as ViewTransitionDocument;

    // Anchor the splash at the button so the ink appears to spread from the
    // thing that was pressed, not from an arbitrary point.
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      const x = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
      const y = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
      document.documentElement.style.setProperty("--ink-x", `${x}%`);
      document.documentElement.style.setProperty("--ink-y", `${y}%`);
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!doc.startViewTransition || prefersReducedMotion) {
      setTheme(next);
      return;
    }

    doc.startViewTransition(() => setTheme(next));
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggle}
      aria-label={
        mounted
          ? `Switch to ${isDark ? "light" : "dark"} theme`
          : "Switch theme"
      }
      className={cn(
        "group relative flex h-8 w-8 items-center justify-center rounded-full text-accent transition-colors hover:bg-accent hover:text-accent-foreground md:h-10 md:w-10",
        className,
      )}
    >
      {mounted ? (
        isDark ? (
          <Sun className="h-4 w-4 md:h-5 md:w-5" />
        ) : (
          <Moon className="h-4 w-4 md:h-5 md:w-5" />
        )
      ) : (
        <span className="h-4 w-4 md:h-5 md:w-5" />
      )}
    </button>
  );
}
