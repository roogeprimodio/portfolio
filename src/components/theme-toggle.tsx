"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark"

    // @ts-ignore
    if (!document.startViewTransition) {
      setTheme(nextTheme)
      return
    }

    const x = event.clientX
    const y = event.clientY
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    // @ts-ignore
    const transition = document.startViewTransition(() => {
      setTheme(nextTheme)
    })

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0% at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 500,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      )
    })
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-8 w-8 md:h-10 md:w-10 text-accent hover:text-accent-foreground hover:bg-accent/10 relative"
      aria-label="Toggle theme"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
