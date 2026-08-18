import type { Project } from "@/data/schema";

/**
 * Client-safe half of the project model. Kept out of `lib/github.ts` because
 * that module is `server-only` — importing it from a client component (the
 * filterable grid) would pull the GitHub token path into the browser bundle.
 */

export interface RepoStats {
  stars: number;
  forks: number;
  language: string | null;
  pushedAt: string;
  htmlUrl: string;
  topics: string[];
}

export type ProjectWithStats = Project & { stats: RepoStats | null };

/** Public GitHub URL for a project, or null when the repo isn't listable. */
export function repoUrl(project: Project): string | null {
  if (project.visibility !== "public" || !project.repo) return null;
  return `https://github.com/${project.repo.owner}/${project.repo.name}`;
}
