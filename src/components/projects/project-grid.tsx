"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { ProjectWithStats } from "@/lib/project-view";
import { ProjectCard } from "./project-card";

const ALL = "all";

export function ProjectGrid({
  projects,
  tags,
  categories,
}: {
  projects: ProjectWithStats[];
  tags: string[];
  categories: string[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>(ALL);
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return projects.filter((project) => {
      if (category !== ALL && project.category !== category) return false;

      // Tags are ANDed: picking "Flutter" + "Firebase" narrows, not widens.
      if (activeTags.length > 0) {
        const owned = new Set(project.tags);
        if (!activeTags.every((tag) => owned.has(tag))) return false;
      }

      if (!needle) return true;

      return [
        project.title,
        project.tagline,
        project.role,
        ...project.tags,
        ...project.stack,
      ]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [projects, query, category, activeTags]);

  const toggleTag = (tag: string) =>
    setActiveTags((current) =>
      current.includes(tag)
        ? current.filter((t) => t !== tag)
        : [...current, tag],
    );

  const hasFilters = query !== "" || category !== ALL || activeTags.length > 0;

  const clearAll = () => {
    setQuery("");
    setCategory(ALL);
    setActiveTags([]);
  };

  return (
    <div className="w-full">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-accent/60"
            aria-hidden
          />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="> search projects, stacks, roles..."
            aria-label="Search projects"
            className="border-accent/40 bg-card/50 pl-10 font-code focus:border-accent"
          />
        </div>

        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Filter by category"
        >
          {[ALL, ...categories].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setCategory(option)}
              aria-pressed={category === option}
              className={cn(
                "rounded-full border px-3 py-1 font-code text-xs uppercase tracking-widest transition-colors",
                category === option
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-accent/30 bg-card/40 text-accent hover:border-accent/70",
              )}
            >
              {option}
            </button>
          ))}
        </div>

        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Filter by tag"
        >
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              aria-pressed={activeTags.includes(tag)}
              className={cn(
                "rounded-full border px-3 py-1 font-code text-xs transition-colors",
                activeTags.includes(tag)
                  ? "border-primary bg-primary/20 text-primary"
                  : "border-accent/20 bg-card/30 text-muted-foreground hover:border-accent/50 hover:text-accent",
              )}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between font-code text-xs text-muted-foreground">
          <p aria-live="polite">
            {filtered.length} / {projects.length} projects
          </p>
          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="h-auto gap-1 px-2 py-1 font-code text-xs text-accent hover:text-primary"
            >
              <X className="h-3 w-3" /> clear filters
            </Button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center font-code text-muted-foreground">
          No specimens match that query.
        </p>
      ) : (
        <motion.div
          layout
          className="mx-auto mt-10 grid w-full max-w-7xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: Math.min(index, 6) * 0.04 }}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
