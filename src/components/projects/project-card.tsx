import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, GitFork, Github, Lock, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { repoUrl, type ProjectWithStats } from "@/lib/project-view";
import type { ProjectStatus, Visibility } from "@/data/schema";

/**
 * One card, two designs — chosen by theme rather than recoloured.
 *
 *  dark  — instrument panel: corner cut on a diagonal, a glowing node
 *          travelling a seam, scanline texture, hover lift.
 *  light — flat editorial: solid paper, hairline rules, serif title, an accent
 *          bar that fills on hover. No gradients, glows or blur — on paper
 *          those read as smudge rather than depth.
 *
 * Dark-only ornament is gated behind `dark:` so the light theme never renders
 * decoration it doesn't use.
 */

const VISIBILITY_LABEL: Record<Visibility, string | null> = {
  public: null,
  private: "sealed",
  "other-account": "external",
  client: "classified",
};

// The -300 tints only have contrast against a near-black ground; on paper they
// wash out, so each state carries a darker light-theme variant.
const STATUS_LED: Record<ProjectStatus, { dot: string; text: string }> = {
  live: {
    dot: "bg-emerald-600 dark:bg-emerald-400 dark:shadow-[0_0_6px] dark:shadow-emerald-400/70",
    text: "text-emerald-700 dark:text-emerald-300",
  },
  "in-progress": {
    dot: "bg-amber-600 dark:bg-amber-400 dark:shadow-[0_0_6px] dark:shadow-amber-400/70",
    text: "text-amber-700 dark:text-amber-300",
  },
  archived: {
    dot: "bg-slate-500 dark:bg-slate-400 dark:shadow-[0_0_6px] dark:shadow-slate-400/60",
    text: "text-slate-600 dark:text-slate-300",
  },
  concept: {
    dot: "bg-violet-600 dark:bg-violet-400 dark:shadow-[0_0_6px] dark:shadow-violet-400/70",
    text: "text-violet-700 dark:text-violet-300",
  },
};

/** Stable per-project hue, derived from the slug. */
function hueFor(slug: string): number {
  return Array.from(slug).reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360;
}

function initialsFor(title: string): string {
  return title
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export function ProjectCard({
  project,
  index,
  className,
}: {
  project: ProjectWithStats;
  index: number;
  className?: string;
}) {
  const github = repoUrl(project);
  const visibilityLabel = VISIBILITY_LABEL[project.visibility];
  const led = STATUS_LED[project.status];
  const hue = hueFor(project.slug);
  const specimenId = `SPEC-${String(index + 1).padStart(3, "0")}`;
  // Stagger the travelling nodes so a grid of cards doesn't pulse in unison.
  const seamDelay = `${(index % 5) * 0.9}s`;

  return (
    <article
      className={cn(
        "group relative flex h-full w-full flex-col overflow-hidden p-5 transition-all duration-300",
        // Light: flat editorial panel.
        "rounded-sm border border-border bg-card hover:border-accent/50",
        // Dark: instrument panel with a cut corner.
        "dark:rounded-xl dark:border-accent/15 dark:bg-card/40 dark:backdrop-blur-sm dark:hover:-translate-y-1 dark:hover:border-accent/40 dark:hover:shadow-[0_0_30px_-8px_hsl(var(--accent)/0.3)]",
        "dark:[clip-path:polygon(0_0,calc(100%-20px)_0,100%_20px,100%_100%,0_100%)]",
        className,
      )}
    >
      {/* --- light only: accent bar that fills on hover --- */}
      <span
        aria-hidden
        className="absolute left-0 top-0 h-full w-[3px] bg-accent/20 transition-colors duration-300 group-hover:bg-accent dark:hidden"
      />

      {/* --- dark only --- */}
      {/* Hairline tracing the cut corner. */}
      <span
        aria-hidden
        className="absolute right-[-6px] top-[6px] hidden h-px w-[34px] rotate-45 bg-accent/40 transition-colors duration-300 group-hover:bg-accent dark:block"
      />

      {/* The fissure: a vertical seam with a node travelling down it. */}
      <span
        aria-hidden
        className="absolute left-[14px] top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-accent/20 to-transparent dark:block"
      >
        <span
          className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_10px_3px_hsl(var(--accent)/0.55)] motion-reduce:top-1/2 motion-safe:animate-traverse"
          style={{ animationDelay: seamDelay }}
        />
      </span>

      {/* Triangular field marker. */}
      <span
        aria-hidden
        className="absolute bottom-4 left-3 hidden h-0 w-0 border-b-[10px] border-l-[6px] border-r-[6px] border-b-accent/25 border-l-transparent border-r-transparent transition-colors duration-300 group-hover:border-b-accent/60 dark:block"
      />

      {/* Depth cues that belong on black: colour wash, scanlines, watermark. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden opacity-40 transition-opacity duration-500 group-hover:opacity-70 dark:block"
        style={{
          background: `radial-gradient(120% 80% at 100% 0%, hsl(${hue} 60% 32% / 0.3), transparent 60%)`,
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-safe:group-hover:animate-scan dark:block"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, hsl(var(--accent)/0.06) 0px, hsl(var(--accent)/0.06) 1px, transparent 1px, transparent 4px)",
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-3 bottom-2 hidden select-none font-headline text-[5.5rem] leading-none tracking-tighter text-primary/[0.06] dark:block"
      >
        {initialsFor(project.title)}
      </span>

      {/* Content sits clear of the light accent bar and the dark seam. */}
      <div className="relative flex h-full flex-col pl-2 dark:pl-4">
        <div className="flex items-center justify-between font-code text-[10px] uppercase tracking-[0.2em]">
          <span className="flex items-center gap-2">
            <span className={cn("h-1.5 w-1.5 rounded-full", led.dot)} />
            <span className={led.text}>{project.status}</span>
          </span>
          <span className="text-muted-foreground dark:text-accent/50">
            {specimenId}
          </span>
        </div>

        {project.cover && (
          <Link
            href={`/projects/${project.slug}`}
            className="relative mt-4 block aspect-video w-full overflow-hidden rounded-sm border border-border dark:rounded-md dark:border-accent/10"
            aria-label={`Open ${project.title}`}
          >
            <Image
              src={project.cover}
              alt={project.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-all duration-500 group-hover:scale-105 dark:opacity-80 dark:group-hover:opacity-100"
            />
          </Link>
        )}

        <h3 className="mt-4 font-headline text-xl font-bold leading-tight text-primary dark:uppercase dark:tracking-wide">
          <Link
            href={`/projects/${project.slug}`}
            className="transition-colors hover:text-accent"
          >
            {project.title}
            {/* Whole-card hit area, so the link target is the card itself. */}
            <span className="absolute inset-0" aria-hidden />
          </Link>
        </h3>

        <span
          aria-hidden
          className="mt-3 h-px w-8 bg-border transition-all duration-500 group-hover:w-full group-hover:bg-accent/50 dark:bg-accent/50 dark:group-hover:bg-accent/70"
        />

        <p className="mt-3 flex-grow text-sm leading-relaxed text-muted-foreground dark:font-code dark:text-xs">
          <span className="hidden text-accent/60 dark:inline">&gt; </span>
          {project.tagline}
        </p>

        <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-code text-[10px] uppercase tracking-widest text-muted-foreground dark:text-accent/70">
          {project.tags.map((tag) => (
            <span key={tag}>
              <span className="hidden dark:inline">[</span>
              {tag}
              <span className="hidden dark:inline">]</span>
            </span>
          ))}
        </div>

        <dl className="mt-4 flex items-center gap-4 border-t border-border pt-3 font-code text-[10px] uppercase tracking-widest text-muted-foreground dark:border-accent/10 dark:text-muted-foreground/70">
          {project.stats ? (
            <>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3" aria-hidden />
                <dt className="sr-only">Stars</dt>
                <dd>{project.stats.stars}</dd>
              </div>
              <div className="flex items-center gap-1">
                <GitFork className="h-3 w-3" aria-hidden />
                <dt className="sr-only">Forks</dt>
                <dd>{project.stats.forks}</dd>
              </div>
              {project.stats.language && (
                <div>
                  <dt className="sr-only">Primary language</dt>
                  <dd>{project.stats.language}</dd>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center gap-1">
              <Lock className="h-3 w-3" aria-hidden />
              <dt className="sr-only">Source</dt>
              <dd>{visibilityLabel ?? "no telemetry"}</dd>
            </div>
          )}
          <span className="ml-auto normal-case tracking-normal">
            {project.period}
          </span>
        </dl>

        <div className="relative z-10 mt-4 flex items-center gap-4 font-code text-xs uppercase tracking-widest">
          <Link
            href={`/projects/${project.slug}`}
            className="flex items-center gap-1 text-accent transition-colors hover:text-primary"
          >
            Open <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-accent"
            >
              Live <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}

          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} source on GitHub`}
              className="ml-auto text-muted-foreground transition-colors hover:text-accent"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
