import { profile } from "@/data/profile";

/**
 * Absolute origin for canonical URLs, sitemap and OG tags.
 *
 * Order matters. VERCEL_URL is the *per-deployment* host
 * (portfolio-a1b2c3.vercel.app) and changes on every push — using it for
 * canonicals would point every deploy at a different URL and split ranking
 * signals. VERCEL_PROJECT_PRODUCTION_URL is the stable production domain, so
 * it wins. VERCEL_URL stays last as a preview-only fallback.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");

  const production =
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (production) return `https://${production.replace(/\/+$/, "")}`;

  const deployment =
    process.env.NEXT_PUBLIC_VERCEL_URL ?? process.env.VERCEL_URL;
  if (deployment) return `https://${deployment.replace(/\/+$/, "")}`;

  return "http://localhost:9002";
}

export const siteConfig = {
  url: resolveSiteUrl(),
  name: `${profile.name.toUpperCase()} // Portfolio`,
  shortName: profile.name,
  description: profile.seoDescription,
  locale: "en_IN",
} as const;

export function absoluteUrl(path = "/"): string {
  return new URL(path, `${siteConfig.url}/`).toString();
}
