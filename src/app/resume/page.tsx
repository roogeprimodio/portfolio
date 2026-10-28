import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ResumeDocument } from "@/components/resume/resume-document";
import { PrintOnLoad } from "@/components/resume/print-on-load";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `Resume — ${profile.name}`,
  description: `Resume of ${profile.name}, ${profile.title}.`,
  // A resume page is for people who already have the link, not for search.
  robots: { index: false, follow: false },
};

/**
 * Standalone, printable resume. `?print=1` opens the browser print dialog on
 * load so the "Download PDF" button in the modal is a one-click save.
 */
export default async function ResumePage({
  searchParams,
}: {
  searchParams: Promise<{ print?: string }>;
}) {
  const { print } = await searchParams;

  return (
    <main className="min-h-screen bg-neutral-200 py-6 print:bg-white print:py-0 dark:bg-neutral-900">
      {print === "1" && <PrintOnLoad />}

      <div className="mx-auto mb-4 flex w-[210mm] max-w-full items-center justify-between px-4 print:hidden">
        <Button asChild variant="ghost" size="sm" className="font-code text-xs uppercase tracking-widest">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to base
          </Link>
        </Button>
        <Button asChild size="sm" className="bg-accent/80 font-code text-xs uppercase tracking-widest text-accent-foreground hover:bg-accent">
          <Link href="/resume?print=1">
            <Printer className="mr-2 h-4 w-4" /> Print / Save PDF
          </Link>
        </Button>
      </div>

      <div className="mx-auto max-w-full overflow-x-auto px-4 print:overflow-visible print:px-0">
        <div className="shadow-xl print:shadow-none">
          <ResumeDocument />
        </div>
      </div>
    </main>
  );
}
