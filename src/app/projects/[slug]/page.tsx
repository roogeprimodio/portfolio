import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Github,
  Lock,
  Play,
  Smartphone,
  Star,
  UserRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/projects/project-card";
import { getProjectBySlug, projects, sortedProjects } from "@/data/projects";
import type { Visibility } from "@/data/schema";
import type { ProjectWithStats } from "@/lib/project-view";
import { readmeFor, repoUrl, withRepoStats, withRepoStatsAll } from "@/lib/github";
import { ReadmeView } from "@/components/projects/readme-view";
import { breadcrumbJsonLd, jsonLdScript, projectJsonLd } from "@/lib/json-ld";

export const revalidate = 86400;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

/** Next 15 passes route params as a promise. */
type RouteParams = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.tagline,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.tagline,
      url: `/projects/${project.slug}`,
      images: project.cover ? [{ url: project.cover }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.tagline,
    },
  };
}

const VISIBILITY_COPY: Record<Visibility, string> = {
  public: "Source is public.",
  private: "Source is private.",
  "other-account": "Source lives on a collaborator's account.",
  client: "Client engagement — source is not public.",
};

/** Links block, shared by both layouts. */
function ProjectLinks({
  project,
  github,
  stacked,
}: {
  project: ProjectWithStats;
  github: string | null;
  stacked: boolean;
}) {
  return (
    <div className={stacked ? "flex flex-col gap-3" : "flex flex-wrap gap-3"}>
      {project.liveUrl && (
        <Button
          asChild
          className={`bg-accent/80 font-code text-accent-foreground hover:bg-accent ${stacked ? "w-full" : ""}`}
        >
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            Live deployment <ArrowUpRight className="ml-1 h-4 w-4" />
          </a>
        </Button>
      )}
      {project.playStoreUrl && (
        <Button
          asChild
          variant="outline"
          className={`border-accent/50 bg-card/60 font-code hover:border-accent ${stacked ? "w-full" : ""}`}
        >
          <a href={project.playStoreUrl} target="_blank" rel="noopener noreferrer">
            <Play className="mr-1 h-4 w-4" /> Google Play
          </a>
        </Button>
      )}
      {project.appStoreUrl && (
        <Button
          asChild
          variant="outline"
          className={`border-accent/50 bg-card/60 font-code hover:border-accent ${stacked ? "w-full" : ""}`}
        >
          <a href={project.appStoreUrl} target="_blank" rel="noopener noreferrer">
            <Smartphone className="mr-1 h-4 w-4" /> App Store
          </a>
        </Button>
      )}
      {github ? (
        <Button
          asChild
          variant="outline"
          className={`border-accent/50 bg-card/60 font-code hover:border-accent ${stacked ? "w-full" : ""}`}
        >
          <a href={github} target="_blank" rel="noopener noreferrer">
            <Github className="mr-1 h-4 w-4" /> Source
          </a>
        </Button>
      ) : (
        <p className="flex items-start gap-2 rounded-md border border-dashed border-accent/25 px-3 py-2 font-code text-xs leading-relaxed text-muted-foreground">
          <Lock className="mt-0.5 h-3 w-3 shrink-0" />
          <span>
            {project.privateNote ?? VISIBILITY_COPY[project.visibility]}
          </span>
        </p>
      )}
    </div>
  );
}

/** Role / period / stats, laid out inline or stacked. */
function ProjectFacts({
  project,
  stacked,
}: {
  project: ProjectWithStats;
  stacked: boolean;
}) {
  const facts = [
    { icon: UserRound, label: "Role", value: project.role },
    { icon: CalendarDays, label: "Period", value: project.period },
    ...(project.stats
      ? [
          {
            icon: Star,
            label: "GitHub",
            value: `${project.stats.stars} stars · ${project.stats.forks} forks`,
          },
        ]
      : []),
  ];

  return (
    <dl
      className={
        stacked
          ? "space-y-4 font-code text-sm"
          : "flex flex-wrap gap-x-8 gap-y-3 font-code text-sm"
      }
    >
      {facts.map((fact) => (
        <div key={fact.label} className="flex items-start gap-2">
          <fact.icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
          <div className="min-w-0">
            <dt className="text-xs uppercase tracking-widest text-muted-foreground/70">
              {fact.label}
            </dt>
            <dd className="text-muted-foreground">{fact.value}</dd>
          </div>
        </div>
      ))}
    </dl>
  );
}

function ProjectStack({ project }: { project: ProjectWithStats }) {
  if (project.stack.length === 0) return null;

  return (
    <div className="space-y-2">
      <p className="font-code text-xs uppercase tracking-widest text-muted-foreground/70">
        Stack
      </p>
      <div className="flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <Badge
            key={item}
            variant="secondary"
            className="border-accent/20 bg-accent/10 font-code text-xs text-accent"
          >
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export default async function ProjectDetailPage({ params }: RouteParams) {
  const { slug } = await params;
  const base = getProjectBySlug(slug);
  if (!base) notFound();

  const project = await withRepoStats(base);
  const github = repoUrl(base);
  // Public repos only — everything else returns null and falls back to the
  // hand-written write-up.
  const readme = await readmeFor(base);

  // Nearest neighbours by shared tags, so "related" means something.
  const related = await withRepoStatsAll(
    sortedProjects
      .filter((candidate) => candidate.slug !== base.slug)
      .map((candidate) => ({
        candidate,
        overlap: candidate.tags.filter((tag) => base.tags.includes(tag)).length,
      }))
      .sort(
        (a, b) => b.overlap - a.overlap || b.candidate.weight - a.candidate.weight,
      )
      .slice(0, 3)
      .map((entry) => entry.candidate),
  );

  /**
   * The side rail only earns its place when there is enough prose to sit
   * beside it. With two short paragraphs it is taller than the article and
   * leaves a dead column, so those projects get a full-width layout with the
   * metadata as a horizontal strip instead.
   */
  const proseLength =
    project.description.join(" ").length +
    (project.caseStudy
      ? [
          ...project.caseStudy.problem,
          ...project.caseStudy.approach,
          ...project.caseStudy.outcome,
        ].join(" ").length
      : 0);
  const useRail = Boolean(project.cover) || Boolean(readme) || proseLength > 900;

  const overview = project.description.length > 0 && (
    <section className="space-y-3">
      <h2 className="font-headline text-xl uppercase tracking-widest text-accent sm:text-2xl">
        Overview
      </h2>
      {project.description.map((paragraph, index) => (
        <p key={index} className="leading-relaxed text-muted-foreground">
          {paragraph}
        </p>
      ))}
    </section>
  );

  const caseStudy = project.caseStudy && (
    <>
      {project.caseStudy.metrics.length > 0 && (
        <dl className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {project.caseStudy.metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-xl border border-accent/20 bg-card/40 p-4 text-center"
            >
              <dd className="font-headline text-2xl text-primary">
                {metric.value}
              </dd>
              <dt className="mt-1 font-code text-xs uppercase tracking-widest text-muted-foreground">
                {metric.label}
              </dt>
            </div>
          ))}
        </dl>
      )}

      {(
        [
          ["The problem", project.caseStudy.problem],
          ["The approach", project.caseStudy.approach],
          ["The outcome", project.caseStudy.outcome],
        ] as const
      ).map(([heading, paragraphs]) => (
        <section key={heading} className="mt-10 space-y-3">
          <h2 className="font-headline text-xl uppercase tracking-widest text-accent sm:text-2xl">
            {heading}
          </h2>
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </section>
      ))}

      {project.caseStudy.challenges.length > 0 && (
        <section className="mt-10 space-y-3">
          <h2 className="font-headline text-xl uppercase tracking-widest text-accent sm:text-2xl">
            What was hard
          </h2>
          <ul className="space-y-2">
            {project.caseStudy.challenges.map((challenge) => (
              <li
                key={challenge}
                className="flex gap-3 font-code text-sm text-muted-foreground"
              >
                <span aria-hidden className="text-accent">
                  ▸
                </span>
                {challenge}
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );

  const highlights = project.highlights.length > 0 && (
    <section className="mt-10 space-y-3">
      <h2 className="font-headline text-xl uppercase tracking-widest text-accent sm:text-2xl">
        Highlights
      </h2>
      <ul className="space-y-2">
        {project.highlights.map((highlight) => (
          <li
            key={highlight}
            className="flex gap-3 font-code text-sm text-muted-foreground"
          >
            <span aria-hidden className="text-accent">
              ▸
            </span>
            {highlight}
          </li>
        ))}
      </ul>
    </section>
  );

  const readmeSection = readme && (
    <section className="mt-10 space-y-3">
      <h2 className="font-headline text-xl uppercase tracking-widest text-accent sm:text-2xl">
        From the repository
      </h2>
      <p className="font-code text-xs text-muted-foreground/70">
        README, pulled from GitHub.
      </p>
      <ReadmeView markdown={readme} />
    </section>
  );

  const cover = project.cover && (
    <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-2xl border border-accent/20">
      <Image
        src={project.cover}
        alt={`${project.title} screenshot`}
        fill
        sizes="(max-width: 1024px) 100vw, 700px"
        className="object-cover"
        priority
      />
    </div>
  );

  return (
    /* Outer wrapper reserves room for the fixed side-nav rail; the inner one
       owns the max-width. Keeping those on separate elements is what stops
       padding + max-width from overflowing the viewport. */
    <div className="md:pl-20 2xl:pl-0">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(projectJsonLd(base))}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Projects", path: "/projects" },
              { name: base.title, path: `/projects/${base.slug}` },
            ]),
          )}
        />

        <Button
          asChild
          variant="ghost"
          size="sm"
          className="mb-6 gap-2 font-code text-accent hover:text-primary"
        >
          <Link href="/projects">
            <ArrowLeft className="h-4 w-4" /> back to vault
          </Link>
        </Button>

        <header className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 font-code text-xs uppercase tracking-widest text-accent/70">
            <span className="rounded-full border border-accent/30 px-2 py-0.5">
              {project.category}
            </span>
            <span className="rounded-full border border-accent/30 px-2 py-0.5">
              {project.status}
            </span>
          </div>

          <h1 className="font-headline text-3xl font-bold uppercase leading-tight tracking-wide text-primary [text-shadow:0_0_8px_hsl(var(--primary)/0.5)] sm:text-4xl md:tracking-widest lg:text-5xl">
            {project.title}
          </h1>
          <p className="max-w-2xl font-code text-base text-accent sm:text-lg">
            {project.tagline}
          </p>
        </header>

        {useRail ? (
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-10 lg:items-start">
            <div className="min-w-0">
              {cover}
              {overview}
              {caseStudy}
              {highlights}
              {readmeSection}
            </div>

            <aside className="space-y-6 rounded-2xl border border-accent/20 bg-card/40 p-5 backdrop-blur-sm">
              <ProjectLinks project={project} github={github} stacked />
              <div className="border-t border-accent/15 pt-5">
                <ProjectFacts project={project} stacked />
              </div>
              {project.stack.length > 0 && (
                <div className="border-t border-accent/15 pt-5">
                  <ProjectStack project={project} />
                </div>
              )}
            </aside>
          </div>
        ) : (
          /* Short write-up: one full-width column, metadata as a horizontal
             strip. No narrow column, no dead space beside it. */
          <>
            <div className="mt-8 space-y-6 rounded-2xl border border-accent/20 bg-card/40 p-5 backdrop-blur-sm">
              <ProjectLinks project={project} github={github} stacked={false} />
              <div className="grid gap-6 border-t border-accent/15 pt-5 sm:grid-cols-2">
                <ProjectFacts project={project} stacked={false} />
                <ProjectStack project={project} />
              </div>
            </div>

            <div className="mt-10 max-w-3xl">
              {overview}
              {caseStudy}
              {highlights}
              {readmeSection}
            </div>
          </>
        )}

        {related.length > 0 && (
          <section className="mt-12 border-t border-accent/15 pt-10">
            <h2 className="mb-6 font-headline text-xl uppercase tracking-widest text-accent sm:text-2xl">
              Related specimens
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => (
                <ProjectCard key={item.slug} project={item} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
