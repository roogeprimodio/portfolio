import "server-only";

import type { Project } from "@/data/schema";
import type { ProjectWithStats, RepoStats } from "./project-view";

export type { ProjectWithStats, RepoStats } from "./project-view";
export { repoUrl } from "./project-view";

/**
 * Optional live enrichment for projects whose source is public.
 *
 * The project list in `src/data/projects.ts` stays the source of truth — GitHub
 * only supplies stats that go stale (stars, last push, primary language). This
 * is deliberate: several projects are private, live under a collaborator's
 * account, or are client work, and those can never be discovered from the API.
 *
 * Every failure path returns `null`. A rate-limited or offline GitHub must
 * never fail a build or blank out a card.
 */

/** Revalidate once a day — stars don't move fast enough to justify more. */
const REVALIDATE_SECONDS = 60 * 60 * 24;

function authHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  // Unauthenticated requests are capped at 60/hour per IP, which a cold build
  // of a dozen projects can exhaust. A read-only token raises it to 5000.
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

export async function fetchRepoStats(
  owner: string,
  name: string,
): Promise<RepoStats | null> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${name}`,
      { headers: authHeaders(), next: { revalidate: REVALIDATE_SECONDS } },
    );

    if (!response.ok) {
      // 404 also covers "repo went private since we last built" — treat the
      // same as any other failure and fall back to the static data.
      console.warn(
        `[github] ${owner}/${name} returned ${response.status}; falling back to static data`,
      );
      return null;
    }

    const repo = (await response.json()) as {
      stargazers_count?: number;
      forks_count?: number;
      language?: string | null;
      pushed_at?: string;
      html_url?: string;
      topics?: string[];
      private?: boolean;
    };

    // Defence in depth: never surface a repo the API reports as private.
    if (repo.private) return null;

    return {
      stars: repo.stargazers_count ?? 0,
      forks: repo.forks_count ?? 0,
      language: repo.language ?? null,
      pushedAt: repo.pushed_at ?? "",
      htmlUrl: repo.html_url ?? `https://github.com/${owner}/${name}`,
      topics: repo.topics ?? [],
    };
  } catch (error) {
    console.warn(`[github] failed to fetch ${owner}/${name}:`, error);
    return null;
  }
}

/** Attach stats to one project. No-op for anything that isn't a public repo. */
export async function withRepoStats(project: Project): Promise<ProjectWithStats> {
  if (project.visibility !== "public" || !project.repo) {
    return { ...project, stats: null };
  }
  const stats = await fetchRepoStats(project.repo.owner, project.repo.name);
  return { ...project, stats };
}

/** Enrich a list in parallel. Individual failures degrade to `stats: null`. */
export async function withRepoStatsAll(
  projects: Project[],
): Promise<ProjectWithStats[]> {
  return Promise.all(projects.map(withRepoStats));
}


/**
 * Fetch a repository's README, decoded to markdown.
 *
 * Only public repos have one we can read, so this mirrors `withRepoStats`:
 * anything private, other-account or client returns null and the page falls
 * back to the hand-written write-up. Failures are non-fatal by design.
 */
export async function fetchReadme(
  owner: string,
  name: string,
): Promise<string | null> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${name}/readme`,
      { headers: authHeaders(), next: { revalidate: REVALIDATE_SECONDS } },
    );
    if (!response.ok) return null;

    const payload = (await response.json()) as {
      content?: string;
      encoding?: string;
    };
    if (!payload.content || payload.encoding !== "base64") return null;

    const markdown = Buffer.from(payload.content, "base64").toString("utf8");

    // Strip the leading H1: the page already shows the project name, and a
    // duplicate top-level heading confuses the document outline for both
    // screen readers and search engines.
    return markdown.replace(/^\s*#\s+.*\n+/, "").trim() || null;
  } catch (error) {
    console.warn(`[github] failed to fetch README for ${owner}/${name}:`, error);
    return null;
  }
}

/** README for a project, or null when the repo isn't public. */
export async function readmeFor(project: Project): Promise<string | null> {
  if (project.visibility !== "public" || !project.repo) return null;
  return fetchReadme(project.repo.owner, project.repo.name);
}
