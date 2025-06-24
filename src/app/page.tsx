import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { SkillsSection } from "@/components/skills-section";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <div className="relative">
      <div className="absolute inset-0 -z-20 h-full w-full bg-background bg-[radial-gradient(hsl(var(--accent)/0.05)_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-background"></div>
      
      <main className="h-screen w-screen overflow-y-auto overflow-x-hidden" style={{ scrollSnapType: 'y mandatory' }}>
        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
    </div>
  );
}
