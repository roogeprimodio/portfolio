
import type { ElementType } from "react";
import { Github, Instagram, Linkedin, Twitter, Send, Phone } from "lucide-react";
import { FaCode, FaChartBar, FaTools, FaHandshake, FaBrain, FaLanguage, FaPython, FaJava, FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaGitAlt, FaAws } from 'react-icons/fa';
import { SiJavascript, SiNextdotjs, SiFlutter, SiExpress, SiTailwindcss, SiFirebase, SiJsonwebtokens, SiMongodb, SiSqlite, SiFigma, SiAdobeillustrator, SiAdobepremierepro, SiPostman, SiVercel, SiNetlify } from 'react-icons/si';
import { GrMysql } from 'react-icons/gr';
import { AiOutlineApi } from 'react-icons/ai';
import { VscVscode } from 'react-icons/vsc';
import { GoGitBranch } from 'react-icons/go';
import { IoLogoGithub } from "react-icons/io5";


// --- INTERFACES ---

export interface PersonalInfoType {
    name: string;
    jobTitle: string;
    tagline: string;
    profileImage: string; // Path relative to the /public folder
    url: string;
    alternateNames: string[];
    keywords: string[];
}

export interface SocialLinkType {
    name: string;
    href: string;
    Icon: ElementType;
    pos?: string; // For Hero section positioning
}

export interface AboutDataType {
  summary: string;
  contactInfo: {
    address: string;
    email: string;
    phone: string;
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

export interface SkillType {
  name: string;
  icon?: ElementType;
}

export interface SkillCategoryType {
    title: string;
    icon: ElementType;
    skills: SkillType[];
}

// --- DATA ---

const personalInfo: PersonalInfoType = {
    name: "JAGDISH ODEDARA",
    jobTitle: "Digital Craftsman & Code Poet",
    tagline: "A full-stack developer specializing in creating beautiful and performant web applications.",
    profileImage: "/jagdish.png",
    url: "https://your-portfolio-url.com", // IMPORTANT: Replace with your actual domain name
    keywords: [
      "Jagdish Odedara",
      "Jagadish Odedra",
      "Full Stack Developer",
      "Software Engineer",
      "React Developer",
      "Next.js",
      "Flutter",
      "Portfolio",
      "Web Developer",
      "Graphic Designer"
    ],
    alternateNames: ["Jagadish Odedra", "Jagdish", "Odedara"],
};

const socialLinks: SocialLinkType[] = [
    { name: 'Instagram', href: 'https://www.instagram.com/jagadish_.odedra/', Icon: Instagram, pos: 'top-[-2.5rem] left-1/2 -translate-x-1/2' }, // Top-center
    { name: 'Twitter', href: 'https://twitter.com/jagdishodedara0', Icon: Twitter, pos: 'top-4 left-[-4.5rem]' }, // Top-left
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/jagdish-odedara-4703532a8/', Icon: Linkedin, pos: 'top-4 right-[-4.5rem]' }, // Top-right
    { name: 'GitHub', href: 'https://github.com/roogeprimodio', Icon: Github, pos: 'top-1/2 -translate-y-1/2 left-[-5.5rem]' }, // Middle-left
    { name: 'Telegram', href: 'https://t.me/R00ge', Icon: Send, pos: 'bottom-4 left-[-4.5rem]' }, // Bottom-left
    { name: 'Call', href: 'tel:9773075648', Icon: Phone, pos: 'bottom-4 right-[-4.5rem]' }, // Bottom-right
];

const aboutData: AboutDataType = {
  summary: "A highly motivated and results-oriented Digital Craftsman with a passion for building elegant and efficient solutions. I thrive on solving complex problems and turning innovative ideas into reality, blending artistic design with robust code.",
  contactInfo: {
    address: "India, Gujarat, Porbandar, 360576",
    email: "jagdishodedara47@gmail.com",
    phone: "9773075648"
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

const projects: ProjectType[] = [
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

const skillData: SkillCategoryType[] = [
  {
    title: "Technical Skills",
    icon: FaCode,
    skills: [
      { name: "JavaScript", icon: SiJavascript },
      { name: "Java", icon: FaJava },
      { name: "Python", icon: FaPython },
      { name: "React.js", icon: FaReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Flutter", icon: SiFlutter },
      { name: "Node.js", icon: FaNodeJs },
      { name: "Express.js", icon: SiExpress },
      { name: "HTML5", icon: FaHtml5 },
      { name: "CSS3", icon: FaCss3Alt },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Firebase", icon: SiFirebase },
      { name: "REST APIs", icon: AiOutlineApi },
      { name: "SSR" },
      { name: "JWT Auth", icon: SiJsonwebtokens },
    ],
  },
  {
    title: "Analytical & Data Skills",
    icon: FaChartBar,
    skills: [
        { name: "MySQL", icon: GrMysql },
        { name: "MongoDB", icon: SiMongodb },
        { name: "SQLite", icon: SiSqlite },
        { name: "Data Structures & Algorithms", icon: GoGitBranch },
        { name: "JSON" },
        { name: "API Handling", icon: AiOutlineApi },
    ],
  },
  {
    title: "Tools & Platforms",
    icon: FaTools,
    skills: [
        { name: "Git", icon: FaGitAlt },
        { name: "GitHub", icon: IoLogoGithub },
        { name: "AWS", icon: FaAws },
        { name: "Vercel", icon: SiVercel },
        { name: "Netlify", icon: SiNetlify },
        { name: "Figma", icon: SiFigma },
        { name: "Adobe Illustrator", icon: SiAdobeillustrator },
        { name: "Premiere Pro", icon: SiAdobepremierepro },
        { name: "Postman", icon: SiPostman },
        { name: "VS Code", icon: VscVscode },
    ],
  },
  {
    title: "Professional Skills",
    icon: FaHandshake,
    skills: [
      { name: "Agile Methodologies" },
      { name: "Scrum" },
      { name: "Team Collaboration" },
      { name: "Project Planning" },
      { name: "Technical Documentation" },
    ],
  },
  {
    title: "Soft Skills",
    icon: FaBrain,
    skills: [
      { name: "Time Management" },
      { name: "Creative Thinking" },
      { name: "Problem-Solving" },
      { name: "Adaptability" },
    ],
  },
  {
    title: "Language Skills",
    icon: FaLanguage,
    skills: [
      { name: "English: Proficient" },
      { name: "Hindi: Native" },
      { name: "Gujarati: Native" },
    ],
  }
];


// --- MAIN EXPORT ---
export const portfolioData = {
    personalInfo,
    socialLinks,
    about: aboutData,
    projects,
    skills: skillData,
};
