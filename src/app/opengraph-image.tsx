import { ImageResponse } from "next/og";

import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} — ${profile.title}`;

/** Matches the site palette (globals.css) without importing Tailwind. */
const BACKGROUND = "#05050f";
const FOREGROUND = "#edf5fb";
const MUTED = "#8f9bb3";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: BACKGROUND,
          backgroundImage: `radial-gradient(${FOREGROUND}14 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
          color: FOREGROUND,
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          Portfolio
        </div>

        <div
          style={{
            fontSize: 88,
            fontWeight: 700,
            letterSpacing: 6,
            textTransform: "uppercase",
            marginTop: 16,
          }}
        >
          {profile.name}
        </div>

        <div style={{ fontSize: 36, color: MUTED, marginTop: 8 }}>
          {profile.title}
        </div>

        <div
          style={{
            display: "flex",
            gap: 40,
            marginTop: 56,
            fontSize: 24,
            color: MUTED,
          }}
        >
          <span>{projects.length} projects</span>
          <span>{profile.location.split(",").slice(-2).join(",").trim()}</span>
        </div>

        <div
          style={{
            position: "absolute",
            left: 80,
            bottom: 64,
            width: 160,
            height: 4,
            background: FOREGROUND,
          }}
        />
      </div>
    ),
    size,
  );
}
