"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <p className="font-code text-sm uppercase tracking-widest text-accent">
        Containment breach
      </p>
      <h1 className="font-headline text-4xl font-bold uppercase tracking-widest text-primary [text-shadow:0_0_8px_hsl(var(--primary)/0.5)]">
        Something went wrong
      </h1>
      {error.digest && (
        <p className="font-code text-xs text-muted-foreground">
          ref: {error.digest}
        </p>
      )}
      <Button
        onClick={reset}
        className="bg-accent/80 font-code text-accent-foreground hover:bg-accent"
      >
        Retry
      </Button>
    </div>
  );
}
