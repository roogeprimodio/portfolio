"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";

/**
 * Dark is the default: the site was designed dark-first and that is its
 * identity. `enableSystem` still lets a visitor whose OS asks for light get
 * light on first paint, and an explicit choice is remembered after that.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      // The ink-splash animation is driven by the View Transitions API in
      // ThemeToggle; next-themes' own transition suppression would fight it.
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemeProvider>
  );
}
