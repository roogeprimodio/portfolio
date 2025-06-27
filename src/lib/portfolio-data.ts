import type { LucideIcon } from "lucide-react";
import { Code, BarChart2, HardHat, Handshake, Brain, Languages } from 'lucide-react';

// Types
export interface AboutDataType {
  summary: string;
  contactInfo: {
    address: string;
    email: string;
  };
  experience: {
    company: string;
    role: string;
    duration: string;
    description: string;
  }[];
  education: {
    institution: string;
    degree: string;
    duration: string;
    description: string;
  }[];
  certifications: {
    name: string;
    issuer: string;
    year: string;
    url: string;
  }[];
  programmingLanguages: { name: string }[];
  spokenLanguages: { name: string; proficiency: string }[];
}

export interface ProjectType {
  title: string;
  description: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
}

export interface SkillCategoryType {
    title: string;
    icon: LucideIcon;
    skills: string[];
}


// Data
export const aboutData: AboutDataType = {
  summary: "A highly motivated and results-oriented Digital Craftsman with a passion for building elegant and efficient solutions. I thrive on solving complex problems and turning innovative ideas into reality, blending artistic design with robust code.",
  contactInfo: {
    address: "India, Gujarat, Porbandar 360576",
    email: "jagdishodedara47@gmail.com",
  },
  experience: [
    {
      company: "Preppers Infotect Pvt Ltd",
      role: "Graphic Designer and Video Editor",
      duration: "2024 – 2025",
      description: "Created compelling graphic designs and edited high-impact videos for digital campaigns, branding materials, and corporate communication. Collaborated closely with marketing and development teams to maintain visual consistency and deliver engaging multimedia content."
    }
  ],
  education: [
    {
      institution: "K.J. Institute of Engineering & Technology, Savli",
      degree: "Bachelor’s Degree (4-Year Course)",
      duration: "2021 – 2025",
      description: "Pursuing undergraduate engineering studies with emphasis on practical learning, design, and development."
    },
    {
      institution: "Shree Swaminarayan Gurukul Vidhyalaya, Junagadh",
      degree: "Secondary & Higher Secondary Education",
      duration: "8th to 12th Grade",
      description: "Completed foundational and senior secondary schooling with a focus on discipline and values-driven learning."
    }
  ],
  certifications: [
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
  programmingLanguages: [
    { name: "JavaScript" },
    { name: "Python" },
    { name: "Java" },
    { name: "React.js" },
    { name: "Next.js" },
    { name: "Flutter" },
    { name: "Node.js" },
  ],
  spokenLanguages: [
    { name: "English", proficiency: "Proficient" },
    { name: "Hindi", proficiency: "Native" },
    { name: "Gujarati", proficiency: "Native" },
  ],
};

export const projects: ProjectType[] = [
  {
    title: "PG Hub – Owner & User Apps",
    description: "Flutter-based PG accommodation management system for owners and tenants.",
    tags: ["Flutter", "Firebase", "Google Maps"],
    liveUrl: "https://beeeshive.netlify.app/login",
    githubUrl: "https://github.com/roogeprimodio/Pg-hub.git",
  },
  {
    title: "DIOS Forge – AI Project Report Generator",
    description: "AI-powered report generator using OpenRouter API.",
    tags: ["React.js", "Node.js", "AI"],
    liveUrl: "https://reportforge.netlify.app/",
    githubUrl: "https://github.com/roogeprimodio/diosforge.git",
  },
  {
    title: "Pabble Battle – Web Game",
    description: "Casual web game with reflex-based mechanics.",
    tags: ["JavaScript", "HTML5 Canvas", "Game"],
    liveUrl: "https://pabblebattle.netlify.app/",
    githubUrl: "https://github.com/roogeprimodio/pabble-battle.git",
  },
  {
    title: "Gesture Controlled Mouse",
    description: "Python app to control cursor using hand gestures.",
    tags: ["Python", "OpenCV", "MediaPipe"],
    liveUrl: "#",
    githubUrl: "https://github.com/roogeprimodio/hand-gesture-controlled-mouse.git",
  },
  {
    title: "QR Wizard – QR Code Tool",
    description: "Scan and create QR codes for web and mobile use.",
    tags: ["JavaScript", "Flutter", "Utility"],
    liveUrl: "#",
    githubUrl: "https://github.com/buddhhu/QR-Wizard.git",
  },
  {
    title: "Madhuli – Business Showcase Website",
    description: "Personal business portfolio built for a family member.",
    tags: ["React.js", "Expo", "Firebase"],
    liveUrl: "#",
    githubUrl: "https://github.com/roogeprimodio/madhuli.git",
  },
    {
    title: "Rollex International – Business Website",
    description: "PHP-based website for a local mobile brand.",
    tags: ["PHP", "MySQL", "Website"],
    liveUrl: "#",
    githubUrl: "#",
  },
];

export const skillData: SkillCategoryType[] = [
  // Strand 1: Technical & Analytical
  {
    title: "Technical Skills",
    icon: Code,
    skills: ["JavaScript", "Java", "Python", "React.js", "Next.js", "Flutter", "Node.js", "Express.js", "HTML5", "CSS3", "Tailwind CSS", "Firebase", "REST APIs", "SSR", "JWT Auth"],
  },
  {
    title: "Analytical & Data Skills",
    icon: BarChart2,
    skills: ["MySQL", "MongoDB", "SQLite", "Data Structures & Algorithms", "JSON", "API Handling"],
  },
  {
    title: "Tools & Platforms",
    icon: HardHat,
    skills: ["Git", "GitHub", "AWS", "Vercel", "Netlify", "Figma", "Adobe Illustrator", "Premiere Pro", "Postman", "VS Code"],
  },
  // Strand 2: Professional & Soft
  {
    title: "Professional Skills",
    icon: Handshake,
    skills: ["Agile Methodologies", "Scrum", "Team Collaboration", "Project Planning", "Technical Documentation"],
  },
  {
    title: "Soft Skills",
    icon: Brain,
    skills: ["Time Management", "Creative Thinking", "Problem-Solving", "Adaptability"],
  },
  {
    title: "Language Skills",
    icon: Languages,
    skills: ["English: Proficient", "Hindi: Native", "Gujarati: Native"],
  }
];
