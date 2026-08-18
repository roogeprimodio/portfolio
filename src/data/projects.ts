import { parseData, projectsSchema, type Project } from "./schema";

/**
 * Single source of truth for the project vault.
 *
 * To add a project: append an object below and commit. Nothing else to touch —
 * the homepage grid, /projects, /projects/[slug], the sitemap and the tag
 * filters all derive from this list.
 *
 * `visibility` decides how the repo is presented:
 *   public        -> repo link shown, GitHub stats fetched at build/ISR time
 *   private       -> no repo link, `privateNote` shown instead, live URL still linked
 *   other-account -> built under someone else's org/account, repo not listable
 *   client        -> client or NDA work, often no public artefact at all
 *
 * `repo` is only permitted on `public` projects — the schema enforces it, so a
 * private repo can never leak into the rendered markup by accident.
 */
export const projects: Project[] = parseData(
  projectsSchema,
  [
    {
      // Copy taken from the live site at podpot.app. Nothing about the
      // deployment (hosts, addresses, costs) belongs on a public portfolio.
      slug: "podpot",
      title: "PodPot",
      tagline:
        "PG and hostel platform — discovery, booking and listings across rentals, food and jobs.",
      description: [
        "PodPot is a platform for paying-guest accommodation and hostels, covering both sides of the market: owners list and manage properties, and residents browse, filter and book them.",
        "Listings are organised into rentals, food and jobs, with location-based browsing and map search. A Flutter client sits on a Go API with PostgreSQL behind it, deployed on AWS.",
      ],
      role: "Developer — Preppers Info Tech",
      period: "2024 – present",
      category: "mobile",
      status: "in-progress",
      featured: true,
      weight: 100,
      tags: ["Flutter", "Go", "PostgreSQL", "Android", "iOS"],
      stack: ["Flutter", "Dart", "Go", "PostgreSQL", "AWS"],
      highlights: [
        "Shipped on Google Play and the App Store alongside the web app",
        "Rentals, food and jobs in one listings surface",
        "Location-based browsing with map search",
        "Flutter client against a Go API on PostgreSQL",
      ],
      cover: "/projects/podpot.webp",
      liveUrl: "https://podpot.app",
      playStoreUrl: "https://play.google.com/store/apps/details?id=in.podpot.app",
      appStoreUrl: "https://apps.apple.com/in/app/podpot/id6761259419",
      visibility: "client",
      privateNote: "Company product — source is private.",
    },
    {
      // Copy taken from the live site at bentry.app.
      slug: "bentry",
      title: "Bentry",
      tagline: "Attendance that recognises your team — face and QR check-in on any Android tablet.",
      description: [
        "Bentry replaces cards, PINs and paper registers with face recognition and QR check-in running on a wall-mounted Android tablet, so there is no dedicated hardware to buy.",
        "Liveness detection runs on-device, reading texture and depth cues rather than trusting a flat image. Check-ins queue locally when the network drops and sync when it returns, and the attendance log is append-only so records are tamper-evident.",
        "Built to be DPDP-compliant: templates are encrypted, consent is captured before enrolment, and data can be erased on request.",
      ],
      role: "Developer — Preppers Info Tech",
      period: "2024 – present",
      category: "mobile",
      status: "live",
      featured: true,
      weight: 95,
      tags: ["Flutter", "Face Recognition", "Offline-first"],
      stack: ["Flutter", "Dart", "On-device ML", "REST API"],
      highlights: [
        "On-device liveness detection to defeat photo spoofing",
        "Offline queue with automatic sync on reconnect",
        "Append-only, tamper-evident attendance records",
        "DPDP-compliant consent and encrypted templates",
      ],
      cover: "/projects/bentry.webp",
      liveUrl: "https://bentry.app",
      visibility: "client",
      privateNote: "Company product — source is private.",
    },
    {
      // Copy taken from the live site at coreceraexim.com.
      slug: "core-cera-exim",
      title: "Core Cera Exim",
      tagline:
        "Premium agricultural exports from India — B2B storefront for international buyers.",
      description: [
        "A B2B export storefront for Core Cera Exim, presenting sustainably sourced Indian agricultural commodities to international importers and distributors.",
        "Built on React with Supabase behind it and Cloudinary handling product imagery.",
      ],
      role: "Developer — Preppers Info Tech",
      period: "2025",
      category: "web",
      status: "live",
      featured: false,
      weight: 70,
      tags: ["React", "Supabase", "B2B"],
      stack: ["React", "Supabase", "Cloudinary"],
      highlights: [
        "Product catalogue aimed at international importers",
        "Cloudinary-backed image pipeline",
      ],
      cover: "/projects/core-cera-exim.webp",
      liveUrl: "https://www.coreceraexim.com",
      visibility: "client",
      privateNote: "Client engagement — source is private.",
    },
    {
      // Copy taken from the live site at myrightsindia.com.
      slug: "my-rights-india",
      title: "My Rights India",
      tagline:
        "Rights · Remedy · Respect — India's Constitution turned into guidance a citizen can act on.",
      description: [
        "My Rights India is a legal-literacy platform that translates constitutional rights into plain, actionable guidance: what to do at a traffic stop, how to file an FIR, what a tenant can insist on, what happens during an arrest.",
        "Alongside the scenario guides it carries an interactive Constitution explorer organised by part and article, summaries of landmark judgments and their constitutional impact, a free legal-aid locator with emergency helplines, and quizzes to make the material stick.",
      ],
      role: "Developer — Preppers Info Tech",
      period: "2024 – present",
      category: "web",
      status: "live",
      featured: true,
      weight: 90,
      tags: ["Next.js", "Prisma", "Legal Tech"],
      stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Pusher"],
      highlights: [
        "Interactive Constitution explorer by part and article",
        "Scenario-based guidance for everyday situations",
        "Free legal-aid locator and emergency helpline directory",
        "Landmark judgment summaries",
      ],
      cover: "/projects/my-rights-india.webp",
      liveUrl: "https://myrightsindia.com",
      visibility: "client",
      privateNote: "Company product — source is private.",
    },
    {
      // Not a website — the netlify URL previously attached here belonged to a
      // different project, and the cover screenshot came from that site. Both
      // removed. Description is back to the original one-liner; the longer
      // write-up that was here made claims about the implementation that were
      // never verified.
      slug: "dios-forge",
      title: "DIOS Forge",
      tagline: "AI-powered project report generator.",
      description: [
        "An AI-powered report generator built on the OpenRouter API.",
        "An application rather than a website — no public link yet.",
      ],
      role: "Solo developer",
      period: "2025",
      category: "ai",
      status: "in-progress",
      featured: false,
      weight: 55,
      tags: ["AI", "OpenRouter"],
      stack: ["OpenRouter API"],
      highlights: [],
      visibility: "private",
      privateNote: "Source is private.",
    },
    {
      slug: "gesture-controlled-mouse",
      title: "Gesture Controlled Mouse",
      tagline: "Drive the desktop cursor with hand gestures over a plain webcam feed.",
      description: [
        "A Python desktop utility that reads the webcam, tracks hand landmarks with MediaPipe, and maps finger positions onto cursor movement, click and scroll.",
        "The interesting part was smoothing — raw landmark output jitters badly, so pointer positions run through an exponential filter before they reach the OS cursor.",
      ],
      role: "Solo developer",
      period: "2024",
      category: "tool",
      status: "archived",
      featured: false,
      weight: 40,
      tags: ["Python", "OpenCV", "MediaPipe"],
      stack: ["Python", "OpenCV", "MediaPipe", "PyAutoGUI"],
      highlights: [
        "Landmark smoothing to kill pointer jitter",
        "Gesture vocabulary for move, click, drag and scroll",
      ],
      repo: {
        owner: "roogeprimodio",
        name: "hand-gesture-controlled-mouse",
      },
      visibility: "public",
      caseStudy: {
        problem: [
          "Hand tracking looks solved from the outside — a library returns landmark coordinates and the rest seems like arithmetic. In practice the raw output jitters by several pixels every frame, which makes a cursor driven straight from it unusable.",
        ],
        approach: [
          "The webcam feed runs through MediaPipe for hand landmark detection, and finger positions map onto cursor movement, click, drag and scroll.",
          "Landmark coordinates pass through an exponential smoothing filter before they reach the OS cursor. That trades a small amount of responsiveness for a pointer that holds still when the hand does.",
        ],
        outcome: [
          "A working desktop utility that drives the cursor from an ordinary webcam, with a gesture vocabulary covering the actions a mouse actually needs.",
        ],
        challenges: [
          "Tuning the smoothing filter — too little leaves jitter, too much makes the pointer feel dragged",
          "Distinguishing a deliberate click gesture from an incidental hand position",
        ],
      },
    },
    {
      slug: "qr-wizard",
      title: "QR Wizard",
      tagline: "Scan and generate QR codes across web and mobile from one codebase.",
      description: [
        "A QR utility covering both directions — generate codes from text, URLs and contact payloads, and scan them through the device camera.",
        "Built collaboratively; the repository lives under a collaborator's GitHub account, so it isn't listed under mine.",
      ],
      role: "Contributor",
      period: "2024",
      category: "tool",
      status: "archived",
      featured: false,
      weight: 30,
      tags: ["JavaScript", "Flutter", "Utility"],
      stack: ["JavaScript", "Flutter"],
      highlights: ["Generation and scanning in one app", "Shared web and mobile surface"],
      visibility: "other-account",
      privateNote:
        "Repository hosted on a collaborator's GitHub account — not listed here.",
    },
    {
      slug: "madhuli",
      title: "Madhuli",
      tagline: "Business showcase site built for a family-run venture.",
      description: [
        "A showcase and catalogue site for a family business — product listing, enquiry flow and a simple content surface the owner can update without touching code.",
      ],
      role: "Solo developer",
      period: "2024",
      category: "web",
      status: "live",
      featured: false,
      weight: 20,
      tags: ["React", "Expo", "Firebase"],
      stack: ["React", "Expo", "Firebase"],
      highlights: ["Owner-editable catalogue", "Enquiry routing to the business inbox"],
      visibility: "private",
      privateNote: "Built for family — source and deployment are private.",
    },
    {
      slug: "rollex-international",
      title: "Rollex International",
      tagline: "PHP + MySQL business website for a local mobile brand.",
      description: [
        "A brochure and catalogue website for a regional mobile brand, built on a classic PHP/MySQL stack with an admin surface for updating products and dealer listings.",
      ],
      role: "Solo developer",
      period: "2023 – 2024",
      category: "web",
      status: "archived",
      featured: false,
      weight: 10,
      tags: ["PHP", "MySQL", "Website"],
      stack: ["PHP", "MySQL", "jQuery"],
      highlights: ["Admin panel for product and dealer management"],
      visibility: "client",
      privateNote:
        "Client engagement — source is private and the deployment is no longer public.",
    },
  ],
  "projects.ts",
);

/** Sorted newest-and-heaviest first. Used everywhere a list is rendered. */
export const sortedProjects: Project[] = [...projects].sort(
  (a, b) => b.weight - a.weight || a.title.localeCompare(b.title),
);

export const featuredProjects: Project[] = sortedProjects.filter(
  (project) => project.featured,
);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Every tag in use, most-used first, for the filter chips. */
export const allTags: string[] = Array.from(
  sortedProjects
    .flatMap((project) => project.tags)
    .reduce(
      (counts, tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1),
      new Map<string, number>(),
    ),
)
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  .map(([tag]) => tag);

export const allCategories: string[] = Array.from(
  new Set(sortedProjects.map((project) => project.category)),
).sort();
