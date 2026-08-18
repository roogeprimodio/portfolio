import { z } from "zod";
import {
  certificationSchema,
  educationSchema,
  experienceSchema,
  parseData,
  type Certification,
  type Education,
  type Experience,
} from "./schema";

export const experience: Experience[] = parseData(
  z.array(experienceSchema),
  [
    {
      company: "Preppers Infotect Pvt Ltd",
      role: "Graphic Designer and Video Editor",
      duration: "2024 – 2025",
      description:
        "Created compelling graphic designs and edited high-impact videos for digital campaigns, branding materials, and corporate communication. Collaborated closely with marketing and development teams to maintain visual consistency and deliver engaging multimedia content.",
    },
  ],
  "experience.ts",
);

export const education: Education[] = parseData(
  z.array(educationSchema),
  [
    {
      institution: "K.J. Institute of Engineering & Technology, Savli",
      degree: "Bachelor’s Degree (4-Year Course)",
      duration: "2021 – 2025",
      description:
        "Pursuing undergraduate engineering studies with emphasis on practical learning, design, and development.",
    },
    {
      institution: "Shree Swaminarayan Gurukul Vidhyalaya, Junagadh",
      degree: "Secondary & Higher Secondary Education",
      duration: "8th to 12th Grade",
      description:
        "Completed foundational and senior secondary schooling with a focus on discipline and values-driven learning.",
    },
  ],
  "experience.ts",
);

export const certifications: Certification[] = parseData(
  z.array(certificationSchema),
  [
    {
      name: "Problem Solving (Intermediate)",
      issuer: "HackerRank",
      year: "2025",
      url: "https://www.hackerrank.com/certificates/aba7c97fd4ea",
    },
    {
      name: "Python (Basic)",
      issuer: "HackerRank",
      year: "2025",
      url: "https://www.hackerrank.com/certificates/6544ad97d607",
    },
  ],
  "experience.ts",
);
