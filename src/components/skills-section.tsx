import { Code, Database, Braces, TerminalSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const skillCategories = [
  {
    title: "Languages",
    icon: <Braces className="h-8 w-8 text-accent" />,
    skills: ["JavaScript", "TypeScript", "Python", "HTML5", "CSS3"],
  },
  {
    title: "Frameworks & Libraries",
    icon: <Code className="h-8 w-8 text-accent" />,
    skills: ["React", "Next.js", "Node.js", "Express", "Tailwind CSS"],
  },
  {
    title: "Databases",
    icon: <Database className="h-8 w-8 text-accent" />,
    skills: ["MongoDB", "PostgreSQL", "Firebase", "MySQL"],
  },
  {
    title: "Tools & Platforms",
    icon: <TerminalSquare className="h-8 w-8 text-accent" />,
    skills: ["Git", "GitHub", "Docker", "Vercel", "Figma"],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">
            My Technical Skills
          </h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
            The technologies I use to build modern, efficient, and beautiful web applications.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category) => (
            <Card key={category.title} className="text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardHeader>
                <div className="mx-auto bg-accent/10 p-4 rounded-full w-fit">
                    {category.icon}
                </div>
                <CardTitle className="mt-4 font-headline">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  {category.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
