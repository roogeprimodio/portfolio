import { ImageResponse } from "next/og";

import { getProjectBySlug, projects } from "@/data/projects";
import { profile } from "@/data/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Project";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

const BACKGROUND = "#05050f";
const FOREGROUND = "#edf5fb";
const MUTED = "#8f9bb3";

export default async function ProjectOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: BACKGROUND,
          backgroundImage: `radial-gradient(${FOREGROUND}14 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
          color: FOREGROUND,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          {project ? `${project.category} // ${project.status}` : "Project"}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.1 }}>
            {project?.title ?? "Project not found"}
          </div>
          <div
            style={{
              fontSize: 30,
              color: MUTED,
              marginTop: 20,
              lineHeight: 1.35,
            }}
          >
            {project?.tagline ?? ""}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            color: MUTED,
          }}
        >
          <div style={{ display: "flex", gap: 16 }}>
            {(project?.tags ?? []).slice(0, 4).map((tag) => (
              <span
                key={tag}
                style={{
                  border: `1px solid ${MUTED}66`,
                  borderRadius: 999,
                  padding: "6px 18px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <span style={{ letterSpacing: 4, textTransform: "uppercase" }}>
            {profile.name}
          </span>
        </div>
      </div>
    ),
    size,
  );
}
