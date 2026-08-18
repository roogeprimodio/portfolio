import { z } from "zod";
import { parseData, skillGroupSchema, type SkillGroup } from "./schema";

/** `icon` keys are resolved to lucide components inside the skills section. */
export const skillGroups: SkillGroup[] = parseData(
  z.array(skillGroupSchema),
  [
    {
      title: "Technical Skills",
      icon: "code",
      skills: [
        "JavaScript",
        "Java",
        "Python",
        "React.js",
        "Next.js",
        "Flutter",
        "Node.js",
        "Express.js",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "Firebase",
        "REST APIs",
        "SSR",
        "JWT Auth",
      ],
    },
    {
      title: "Analytical & Data Skills",
      icon: "chart",
      skills: [
        "MySQL",
        "MongoDB",
        "SQLite",
        "Data Structures & Algorithms",
        "JSON",
        "API Handling",
      ],
    },
    {
      title: "Tools & Platforms",
      icon: "tools",
      skills: [
        "Git",
        "GitHub",
        "AWS",
        "Vercel",
        "Netlify",
        "Figma",
        "Adobe Illustrator",
        "Premiere Pro",
        "Postman",
        "VS Code",
      ],
    },
    {
      title: "Professional Skills",
      icon: "handshake",
      skills: [
        "Agile Methodologies",
        "Scrum",
        "Team Collaboration",
        "Project Planning",
        "Technical Documentation",
      ],
    },
    {
      title: "Soft Skills",
      icon: "brain",
      skills: [
        "Time Management",
        "Creative Thinking",
        "Problem-Solving",
        "Adaptability",
      ],
    },
    {
      title: "Language Skills",
      icon: "languages",
      skills: ["English: Proficient", "Hindi: Native", "Gujarati: Native"],
    },
  ],
  "skills.ts",
);
