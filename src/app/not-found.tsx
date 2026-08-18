import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <p className="font-code text-sm uppercase tracking-widest text-accent">
        Signal lost // 404
      </p>
      <h1 className="font-headline text-4xl font-bold uppercase tracking-widest text-primary [text-shadow:0_0_8px_hsl(var(--primary)/0.5)] md:text-5xl">
        Specimen not found
      </h1>
      <p className="max-w-md font-code text-muted-foreground">
        That record isn&apos;t in the vault. It may have been sealed, renamed, or
        never existed.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button asChild className="bg-accent/80 font-code text-accent-foreground hover:bg-accent">
          <Link href="/">Return to base</Link>
        </Button>
        <Button asChild variant="outline" className="border-accent/50 bg-card/60 font-code">
          <Link href="/projects">Browse the vault</Link>
        </Button>
      </div>
    </div>
  );
}
