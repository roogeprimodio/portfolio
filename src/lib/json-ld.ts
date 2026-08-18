import type { Project } from "@/data/schema";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";
import { absoluteUrl, siteConfig } from "./site";

/**
 * Structured data builders. Google reads these to render rich results — a
 * knowledge-panel-style Person entry for the homepage, breadcrumbs on project
 * pages, and an item list for the vault index.
 */

const PERSON_ID = absoluteUrl("/#person");

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: profile.name,
    // Helps Google collapse spelling variants and handles onto one entity.
    alternateName: profile.alternateNames,
    givenName: profile.name.split(" ")[0],
    familyName: profile.name.split(" ").slice(1).join(" "),
    jobTitle: profile.title,
    description: profile.seoDescription,
    email: `mailto:${profile.email}`,
    url: absoluteUrl("/"),
    image: absoluteUrl(profile.avatar),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Porbandar",
      addressRegion: "Gujarat",
      addressCountry: "IN",
    },
    knowsLanguage: profile.spokenLanguages.map((language) => language.name),
    knowsAbout: profile.programmingLanguages,
    // sameAs is what links the profile to its social accounts for Google.
    sameAs: socials
      .filter((social) => social.sameAs && social.href.startsWith("http"))
      .map((social) => social.href),
  };
}

/**
 * Google's documented wrapper for a person's own page. Pairing ProfilePage
 * with a Person `mainEntity` is the clearest way to say "this page IS this
 * person" — which matters when a namesake already ranks for the query.
 */
export function profilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": absoluteUrl("/#profilepage"),
    url: absoluteUrl("/"),
    name: `${profile.name} — ${profile.title}`,
    mainEntity: { "@id": PERSON_ID },
    isPartOf: { "@id": absoluteUrl("/#website") },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: absoluteUrl("/"),
    name: siteConfig.name,
    description: profile.seoDescription,
    inLanguage: "en",
    publisher: { "@id": PERSON_ID },
  };
}

export function projectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.title,
    description: project.tagline,
    url: absoluteUrl(`/projects/${project.slug}`),
    keywords: project.tags.join(", "),
    creator: { "@id": PERSON_ID },
    author: { "@id": PERSON_ID },
    ...(project.cover ? { image: absoluteUrl(project.cover) } : {}),
    ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
  };
}

export function projectListJsonLd(projects: Project[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Projects",
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.title,
      url: absoluteUrl(`/projects/${project.slug}`),
    })),
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

/** Serialise for `dangerouslySetInnerHTML`, escaping the `</script>` case. */
export function jsonLdScript(data: unknown): { __html: string } {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
