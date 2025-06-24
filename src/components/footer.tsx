import Link from "next/link";
import { Github, Linkedin, Twitter, Code2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-6 border-t">
      <div className="container px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-primary" />
            <span className="font-bold font-headline text-base">FolioFlow</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} FolioFlow. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link href="#" className="text-muted-foreground hover:text-primary">
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary">
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary">
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
