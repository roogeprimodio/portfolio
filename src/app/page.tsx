import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { SkillsSection } from "@/components/skills-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[5%] left-[-10%] w-[50vw] h-[50vw] bg-accent/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-30%] right-[-15%] w-[60vw] h-[60vw] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[20%] left-[10%] w-[30vw] h-[30vw] bg-purple-500/5 rounded-full blur-[120px] animate-pulse-slow" />
      </div>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
