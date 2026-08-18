import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/projects/project-card";
import { featuredProjects, projects } from "@/data/projects";
import { withRepoStatsAll } from "@/lib/github";

/**
 * Homepage preview: featured projects only. The full, filterable vault lives
 * at /projects so this section doesn't grow unbounded as projects are added.
 */
export async function ProjectsSection() {
  const featured = await withRepoStatsAll(featuredProjects.slice(0, 6));
  const remaining = projects.length - featured.length;

  return (
    <section
      id="projects"
      className="flex flex-col items-center justify-center overflow-hidden p-4 py-20 md:py-24 md:pl-20 2xl:pl-4"
    >
      <div className="mb-12 space-y-2 px-4 text-center">
        <h2 className="animate-glitch-subtle font-headline text-4xl font-bold uppercase tracking-widest text-primary [text-shadow:0_0_8px_hsl(var(--primary)/0.5)] md:text-5xl">
          Hibernation Vault
        </h2>
        <p className="font-code text-accent">
          A collection of cryo-preserved projects.
        </p>
      </div>

      {/* Column count follows the item count. A fixed 3-column grid left a dead
          third column whenever fewer than three projects were featured. */}
      <div
        className={`grid w-full grid-cols-1 gap-6 px-4 ${
          featured.length >= 3
            ? "max-w-7xl sm:grid-cols-2 lg:grid-cols-3"
            : featured.length === 2
              ? "max-w-4xl sm:grid-cols-2"
              : "max-w-sm"
        }`}
      >
        {featured.map((project, index) => (
          <div key={project.slug} data-reveal>
            <ProjectCard project={project} index={index} />
          </div>
        ))}
      </div>

      <Button
        asChild
        size="lg"
        variant="outline"
        className="group mt-12 border-accent/50 bg-card/40 font-headline tracking-widest text-accent hover:border-accent hover:bg-accent/10"
      >
        <Link href="/projects">
          OPEN FULL VAULT
          {remaining > 0 && (
            <span className="ml-2 font-code text-xs text-muted-foreground">
              +{remaining} more
            </span>
          )}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Button>
    </section>
  );
}
