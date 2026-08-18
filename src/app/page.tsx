import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ContactSection } from "@/components/sections/contact-section";
import { IntroGate } from "@/components/layout/intro-gate";
import {
  jsonLdScript,
  personJsonLd,
  profilePageJsonLd,
  websiteJsonLd,
} from "@/lib/json-ld";

/**
 * Server component. The intro animation and the individual interactive
 * sections opt into the client themselves, so the page content is still in
 * the initial HTML for crawlers.
 */
export default function Home() {
  return (
    <>
      <IntroGate />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(personJsonLd())}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(websiteJsonLd())}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(profilePageJsonLd())}
      />

      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </>
  );
}
