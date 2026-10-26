import { z } from "zod";

/**
 * Every content file in `src/data` is validated against these schemas at import
 * time. A typo in a slug, a missing live URL on a project that claims to have
 * one, or a duplicate slug fails the build instead of shipping broken.
 */

export const visibilitySchema = z.enum([
  // Source is public on a GitHub account we control and want to advertise.
  "public",
  // Repo exists but is private — we can still link a live deployment.
  "private",
  // Built under someone else's GitHub account; we can't list the repo.
  "other-account",
  // Client / NDA work. Sometimes not even a public deployment.
  "client",
]);
export type Visibility = z.infer<typeof visibilitySchema>;

export const projectCategorySchema = z.enum([
  "web",
  "mobile",
  "ai",
  "game",
  "tool",
  "design",
]);
export type ProjectCategory = z.infer<typeof projectCategorySchema>;

export const availabilitySchema = z.enum([
  // Actively looking for work.
  "open",
  // Taking the right thing, not actively looking.
  "selective",
  // Not available.
  "closed",
]);
export type Availability = z.infer<typeof availabilitySchema>;

export const projectStatusSchema = z.enum([
  "live",
  "in-progress",
  "archived",
  "concept",
]);
export type ProjectStatus = z.infer<typeof projectStatusSchema>;

/**
 * Long-form case study. Optional per project — a card and a short overview are
 * enough for small builds, but recruiters and search both reward depth, so the
 * bigger projects should fill this in.
 */
const caseStudySchema = z.object({
  problem: z.array(z.string().min(1)).min(1),
  approach: z.array(z.string().min(1)).min(1),
  outcome: z.array(z.string().min(1)).min(1),
  challenges: z.array(z.string().min(1)).default([]),
  /** Headline numbers, e.g. { label: "Load time", value: "1.2s" }. */
  metrics: z
    .array(z.object({ label: z.string().min(1), value: z.string().min(1) }))
    .default([]),
});
export type CaseStudy = z.infer<typeof caseStudySchema>;

const repoSchema = z.object({
  owner: z.string().min(1),
  name: z.string().min(1),
});

export const projectSchema = z
  .object({
    slug: z
      .string()
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be kebab-case"),
    title: z.string().min(1),
    /** One line, shown on the card. Keep under ~90 chars. */
    tagline: z.string().min(1),
    /** Long form, shown on the detail page. Plain paragraphs. */
    description: z.array(z.string().min(1)).min(1),
    role: z.string().min(1),
    period: z.string().min(1),
    category: projectCategorySchema,
    status: projectStatusSchema.default("live"),
    tags: z.array(z.string().min(1)).min(1),
    stack: z.array(z.string().min(1)).default([]),
    highlights: z.array(z.string().min(1)).default([]),
    featured: z.boolean().default(false),
    /** Sort weight. Higher floats to the top. */
    weight: z.number().int().default(0),
    /** Screenshot, shown on the detail page hero. */
    cover: z.string().optional(),
    /** Brand mark, shown on the card. Square, transparent or self-contained. */
    logo: z.string().optional(),
    gallery: z.array(z.string()).default([]),
    liveUrl: z.string().url().optional(),
    /** Android listing. Rendered as a Play Store button. */
    playStoreUrl: z.string().url().optional(),
    /** iOS listing. Rendered as an App Store button. */
    appStoreUrl: z.string().url().optional(),
    /** Only set when the repo is genuinely public and listable. */
    repo: repoSchema.optional(),
    visibility: visibilitySchema,
    /** Shown in place of a repo link, e.g. "Private — client engagement". */
    privateNote: z.string().optional(),
    caseStudy: caseStudySchema.optional(),
  })
  .superRefine((project, ctx) => {
    if (project.repo && project.visibility !== "public") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["repo"],
        message: `"${project.slug}": repo may only be set when visibility is "public"`,
      });
    }
    const reachable =
      project.liveUrl ?? project.playStoreUrl ?? project.appStoreUrl;
    if (!project.repo && !reachable && !project.privateNote) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["privateNote"],
        message: `"${project.slug}": a project with no repo and no live URL needs a privateNote explaining why`,
      });
    }
  });

export type Project = z.infer<typeof projectSchema>;

export const projectsSchema = z.array(projectSchema).superRefine((list, ctx) => {
  const seen = new Set<string>();
  for (const project of list) {
    if (seen.has(project.slug)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `duplicate project slug: "${project.slug}"`,
      });
    }
    seen.add(project.slug);
  }
});

export const skillGroupSchema = z.object({
  title: z.string().min(1),
  /** Key into ICONS in the skills section — not a component, so this data
   *  can cross the server/client boundary. */
  icon: z.string().min(1),
  skills: z.array(z.string().min(1)).min(1),
});
export type SkillGroup = z.infer<typeof skillGroupSchema>;

export const experienceSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  duration: z.string().min(1),
  description: z.string().min(1),
});
export type Experience = z.infer<typeof experienceSchema>;

export const educationSchema = z.object({
  institution: z.string().min(1),
  degree: z.string().min(1),
  duration: z.string().min(1),
  description: z.string().min(1),
});
export type Education = z.infer<typeof educationSchema>;

export const certificationSchema = z.object({
  name: z.string().min(1),
  issuer: z.string().min(1),
  year: z.string().min(1),
  url: z.string().url().optional(),
});
export type Certification = z.infer<typeof certificationSchema>;

export const socialLinkSchema = z.object({
  name: z.string().min(1),
  href: z.string().url(),
  /** Key into ICONS in the hero section. */
  icon: z.string().min(1),
  /**
   * Whether this link belongs in schema.org `sameAs`. Only real profile URLs
   * qualify — pointing sameAs at a site's homepage is a false identity claim
   * and can get the whole block discounted.
   */
  sameAs: z.boolean().default(true),
  /**
   * Position on the orbit around the hero portrait, in degrees clockwise from
   * 12 o'clock. The previous hand-tuned top/left/right percentages included
   * negative offsets, which pushed icons outside the viewport on small screens;
   * an angle plus a clamped radius scales cleanly instead.
   */
  angle: z.number().min(0).max(360),
});
export type SocialLink = z.infer<typeof socialLinkSchema>;

export const profileSchema = z.object({
  name: z.string().min(1),
  /**
   * Other spellings and handles people search by. Fed to schema.org
   * `alternateName`, which helps Google resolve them to the same entity —
   * and there is a different Jagdish Odedara already ranking, so entity
   * disambiguation matters here.
   */
  alternateNames: z.array(z.string().min(1)).default([]),
  /**
   * Meta description and OG description. Must lead with the full name: it is
   * the snippet Google shows for a name query and a direct entity signal.
   */
  seoDescription: z.string().min(1).max(160),
  title: z.string().min(1),
  tagline: z.string().min(1),
  summary: z.string().min(1),
  location: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  /** Path to a PDF in /public, e.g. "/resume.pdf". Button hides when unset. */
  resumeUrl: z.string().optional(),
  availability: availabilitySchema.default("open"),
  /** Optional detail next to the availability pill. */
  availabilityNote: z.string().optional(),
  avatar: z.string().min(1),
  programmingLanguages: z.array(z.string().min(1)).default([]),
  spokenLanguages: z
    .array(z.object({ name: z.string().min(1), proficiency: z.string().min(1) }))
    .default([]),
});
export type Profile = z.infer<typeof profileSchema>;

/**
 * Parse with a readable error. Zod's default throw inside a module import is
 * hard to trace back to the offending data file, so we prefix it.
 */
export function parseData<T extends z.ZodTypeAny>(
  schema: T,
  value: unknown,
  source: string,
): z.infer<T> {
  const result = schema.safeParse(value);
  if (!result.success) {
    throw new Error(
      `Invalid content in src/data/${source}:\n${result.error.issues
        .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
        .join("\n")}`,
    );
  }
  return result.data;
}
