import type { MetadataRoute } from "next";

import { projects } from "@/data/projects";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "monthly", priority: 1 },
    {
      url: absoluteUrl("/projects"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...projects.map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
