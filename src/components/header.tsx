"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'border-b border-border/40 bg-background/80 backdrop-blur-lg' : 'bg-transparent'}`}>
      <div className="container flex h-16 max-w-screen-xl items-center justify-between">
        <Link href="#home" className="flex items-center gap-2 font-bold font-headline text-2xl">
          <Code2 className="h-7 w-7 text-accent" />
          <span>Folio<span className="text-accent">Flow</span></span>
        </Link>
        <nav className="hidden md:flex gap-8 text-base font-medium">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-muted-foreground transition-colors hover:text-primary">
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background/95 backdrop-blur-lg">
              <div className="flex flex-col gap-6 p-6">
                <Link href="#home" className="flex items-center gap-2 font-bold font-headline text-2xl" onClick={() => setIsOpen(false)}>
                  <Code2 className="h-7 w-7 text-accent" />
                  <span>Folio<span className="text-accent">Flow</span></span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-xl font-medium transition-colors hover:text-accent"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
