"use client";

import { ExternalLink, Printer } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ResumeDocument } from "./resume-document";

/**
 * Preview behind the eye icon. "Download PDF" opens the print route in a new
 * tab, which triggers the browser's print dialog: the user picks "Save as
 * PDF" and gets real, selectable, ATS-readable text rather than a rasterised
 * screenshot of the page.
 */
export function ResumeModal({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex h-[92vh] w-[96vw] max-w-5xl flex-col gap-0 p-0">
        <DialogHeader className="border-b border-accent/15 px-5 py-3 text-left">
          <DialogTitle className="font-headline uppercase tracking-widest text-primary">
            Resume
          </DialogTitle>
          <DialogDescription className="font-code text-xs">
            Generated from the portfolio data. Always current.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-auto bg-neutral-200 p-3 sm:p-6 dark:bg-neutral-900">
          {/* Scale the A4 sheet down on narrow screens instead of reflowing it. */}
          <div className="origin-top scale-[0.42] sm:scale-[0.7] md:scale-[0.85] lg:scale-100">
            <div className="shadow-xl">
              <ResumeDocument />
            </div>
          </div>
        </div>

        <DialogFooter className="flex-row justify-end gap-2 border-t border-accent/15 px-5 py-3">
          <Button asChild variant="outline" className="font-code text-xs uppercase tracking-widest">
            <a href="/resume" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" /> Open page
            </a>
          </Button>
          <Button asChild className="bg-accent/80 font-code text-xs uppercase tracking-widest text-accent-foreground hover:bg-accent">
            <a href="/resume?print=1" target="_blank" rel="noopener noreferrer">
              <Printer className="mr-2 h-4 w-4" /> Download PDF
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
