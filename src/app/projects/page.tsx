import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ProjectGrid } from "@/components/projects/project-grid";
import { Button } from "@/components/ui/button";
import { allCategories, allTags, sortedProjects } from "@/data/projects";
import { withRepoStatsAll } from "@/lib/github";
import {
  breadcrumbJsonLd,
  jsonLdScript,
  projectListJsonLd,
} from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "The full project vault — client work, private builds, and open source, filterable by stack and category.",
  alternates: { canonical: "/projects" },
};

/** Rebuild daily so GitHub stats stay reasonably fresh. */
export const revalidate = 86400;

export default async function ProjectsPage() {
  const projects = await withRepoStatsAll(sortedProjects);

  return (
    <div className="px-0 py-12 md:py-16 md:pl-20 2xl:pl-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(projectListJsonLd(sortedProjects))}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
          ]),
        )}
      />

      <div className="mx-auto mb-10 w-full max-w-7xl px-4">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="mb-8 gap-2 font-code text-accent hover:text-primary"
        >
          <Link href="/">
            <ArrowLeft className="h-4 w-4" /> back to base
          </Link>
        </Button>

        <h1 className="animate-glitch-subtle font-headline text-4xl font-bold uppercase tracking-widest text-primary [text-shadow:0_0_8px_hsl(var(--primary)/0.5)] md:text-5xl">
          Hibernation Vault
        </h1>
        <p className="mt-2 font-code text-accent">
          Every specimen on record — including sealed and client-held builds.
        </p>
      </div>

      <ProjectGrid
        projects={projects}
        tags={allTags}
        categories={allCategories}
      />
    </div>
  );
}
