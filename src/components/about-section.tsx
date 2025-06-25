
"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Briefcase, GraduationCap, BrainCircuit, Award, Languages, Gamepad2, Bot, Cpu, Code, MapPin, Mail } from "lucide-react";

const aboutData = {
  summary: "A highly motivated and results-oriented Digital Craftsman with a passion for building elegant and efficient solutions. I thrive on solving complex problems and turning innovative ideas into reality, blending artistic design with robust code.",
  contactInfo: {
    address: "Sector 7, Neo-Kyoto, Earth",
    email: "contact@jagdishodedara.dev",
  },
  experience: [
    {
      company: "CyberCorp",
      role: "Lead Systems Architect",
      duration: "2022 - Present",
      description: "Designed and implemented scalable backend systems for next-gen security platforms. Led a team of engineers to develop and deploy microservices, improving system efficiency by 40%."
    },
    {
      company: "Innovatech Solutions",
      role: "Full-Stack Developer",
      duration: "2020 - 2022",
      description: "Developed and maintained full-stack web applications for various clients, utilizing React, Node.js, and Python. Contributed to all phases of the development lifecycle."
    }
  ],
  education: [
    {
      institution: "MIT - Massachusetts Institute of Technology",
      degree: "Master of Science in Computer Science & AI",
      duration: "2018 - 2020",
      description: "Focused on machine learning, neural networks, and advanced algorithms. Thesis project involved developing a predictive model for network threat detection."
    },
    {
      institution: "University of Neo-Tokyo",
      degree: "Bachelor of Science in Cybernetics",
      duration: "2014 - 2018",
      description: "Graduated with honors. Specialized in human-computer interaction and robotics."
    }
  ],
  certifications: [
    {
      name: "React (Basic)",
      issuer: "HackerRank",
      year: "2024",
      url: "https://www.hackerrank.com/certificates/aba7c97fd4ea",
    },
    {
      name: "JavaScript (Intermediate)",
      issuer: "HackerRank",
      year: "2024",
      url: "https://www.hackerrank.com/certificates/6544ad97d607",
    },
    {
      name: "Google Certified Professional - Cloud Architect",
      issuer: "Google Cloud",
      year: "2023",
      url: "about:blank"
    },
    {
      name: "Certified Kubernetes Administrator (CKA)",
      issuer: "Cloud Native Computing Foundation",
      year: "2022",
      url: "about:blank"
    },
  ],
  programmingLanguages: [
    { name: "Python", proficiency: "Fluent" },
    { name: "TypeScript", proficiency: "Fluent" },
    { name: "JavaScript", proficiency: "Fluent" },
    { name: "SQL", proficiency: "Advanced" },
    { name: "Binary", proficiency: "Heavily Accented" },
  ],
  spokenLanguages: [
    { name: "English", proficiency: "Native" },
    { name: "Japanese", proficiency: "Business" },
  ],
  hobbies: [
    { name: "Neuro-Hacking", icon: BrainCircuit },
    { name: "Retro VR Gaming", icon: Gamepad2 },
    { name: "Drone Piloting", icon: Bot },
    { name: "Quantum Computing Theory", icon: Cpu },
  ],
}

const cardVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      ease: "easeOut"
    },
  }),
};

export function AboutSection() {
  const timelineItemsCount = aboutData.experience.length + aboutData.education.length;
  const certItemsCount = aboutData.certifications.length;

  return (
    <section id="about" className="flex flex-col items-center justify-center p-4 md:py-24 overflow-hidden">
      <div className="text-center space-y-2 mb-12">
        <h2 className="text-4xl md:text-5xl font-bold tracking-widest font-headline text-primary uppercase animate-glitch-subtle [text-shadow:0_0_8px_hsl(var(--primary)/0.5)]">
          Personal Datastream
        </h2>
        <p className="text-accent font-code">My background and experience.</p>
      </div>

      <div className="w-full max-w-4xl space-y-12 px-4">
        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
        >
          <Card className="bg-card/60 backdrop-blur-md border border-accent/30 shadow-2xl shadow-black/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-4 font-headline text-2xl text-accent [text-shadow:0_0_8px_hsl(var(--accent)/0.5)]">
                <BrainCircuit className="h-8 w-8 drop-shadow-[0_0_5px_hsl(var(--accent)/0.6)]" />
                <span>Self-Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground font-code">{aboutData.summary}</p>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <Card className="bg-card/60 backdrop-blur-md border border-accent/30 shadow-2xl shadow-black/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-4 font-headline text-2xl text-accent [text-shadow:0_0_8px_hsl(var(--accent)/0.5)]">
                <MapPin className="h-8 w-8 drop-shadow-[0_0_5px_hsl(var(--accent)/0.6)]" />
                <span>Location & Contact</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-4 font-code">
              <div className="flex items-center gap-4">
                  <Mail className="h-5 w-5 text-accent" />
                  <a href={`mailto:${aboutData.contactInfo.email}`} className="text-muted-foreground hover:text-primary transition-colors">{aboutData.contactInfo.email}</a>
              </div>
              <div className="flex items-center gap-4">
                  <MapPin className="h-5 w-5 text-accent" />
                  <p className="text-muted-foreground">{aboutData.contactInfo.address}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Experience */}
        <div>
          <h3 className="flex items-center gap-4 text-3xl font-headline text-primary mb-6 [text-shadow:0_0_8px_hsl(var(--primary)/0.5)]">
            <Briefcase className="h-8 w-8 text-accent drop-shadow-[0_0_5px_hsl(var(--accent)/0.6)]" />
            <span>Experience Log</span>
          </h3>
          <div className="space-y-6 relative pl-8 border-l-2 border-accent/30">
            {aboutData.experience.map((item, index) => (
              <motion.div 
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="relative"
              >
                 <div className="absolute -left-[37px] top-1 h-4 w-4 rounded-full bg-accent border-2 border-background"></div>
                <Card className="bg-card/50 backdrop-blur-sm border border-accent/20">
                  <CardHeader>
                    <CardTitle className="text-xl font-code text-primary">{item.role}</CardTitle>
                    <CardDescription className="font-code text-accent">{item.company} // {item.duration}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
           <h3 className="flex items-center gap-4 text-3xl font-headline text-primary mb-6 [text-shadow:0_0_8px_hsl(var(--primary)/0.5)]">
            <GraduationCap className="h-8 w-8 text-accent drop-shadow-[0_0_5px_hsl(var(--accent)/0.6)]" />
            <span>Education Archive</span>
          </h3>
          <div className="space-y-6 relative pl-8 border-l-2 border-accent/30">
            {aboutData.education.map((item, index) => (
              <motion.div 
                key={index}
                custom={index + aboutData.experience.length}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="relative"
              >
                <div className="absolute -left-[37px] top-1 h-4 w-4 rounded-full bg-accent border-2 border-background"></div>
                <Card className="bg-card/50 backdrop-blur-sm border border-accent/20">
                  <CardHeader>
                    <CardTitle className="text-xl font-code text-primary">{item.degree}</CardTitle>
                    <CardDescription className="font-code text-accent">{item.institution} // {item.duration}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Certifications */}
        <div>
           <h3 className="flex items-center gap-4 text-3xl font-headline text-primary mb-6 [text-shadow:0_0_8px_hsl(var(--primary)/0.5)]">
            <Award className="h-8 w-8 text-accent drop-shadow-[0_0_5px_hsl(var(--accent)/0.6)]" />
            <span>Accolades & Certifications</span>
          </h3>
          <div className="space-y-6 relative pl-8 border-l-2 border-accent/30">
            {aboutData.certifications.map((item, index) => (
              <Dialog key={item.name}>
                <DialogTrigger asChild>
                  <motion.div 
                    custom={index + timelineItemsCount}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    className="relative cursor-pointer"
                  >
                    <div className="absolute -left-[37px] top-1 h-4 w-4 rounded-full bg-accent border-2 border-background"></div>
                    <Card className="bg-card/50 backdrop-blur-sm border border-accent/20 hover:border-accent transition-colors">
                      <CardHeader>
                        <CardTitle className="text-xl font-code text-primary">{item.name}</CardTitle>
                        <CardDescription className="font-code text-accent">{item.issuer} // Acquired: {item.year}</CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl h-4/5">
                  <DialogHeader>
                    <DialogTitle className="font-headline text-accent">{item.name}</DialogTitle>
                  </DialogHeader>
                  <div className="w-full h-full rounded-lg overflow-hidden border border-accent/20">
                    <iframe src={item.url} title={item.name} className="w-full h-full" />
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
        
        {/* Languages & Hobbies */}
        <div className="grid md:grid-cols-2 gap-12 pt-6">
            {/* Programming Languages */}
            <div>
                <h3 className="flex items-center gap-4 text-3xl font-headline text-primary mb-6 [text-shadow:0_0_8px_hsl(var(--primary)/0.5)]">
                    <Code className="h-8 w-8 text-accent drop-shadow-[0_0_5px_hsl(var(--accent)/0.6)]" />
                    <span>Programming Languages</span>
                </h3>
                <div className="space-y-4">
                    {aboutData.programmingLanguages.map((lang, index) => (
                        <motion.div 
                            key={index}
                            custom={index + timelineItemsCount + certItemsCount}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            className="flex justify-between items-center p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-accent/20"
                        >
                            <span className="font-code text-primary">{lang.name}</span>
                            <Badge variant="secondary" className="font-code bg-accent/10 text-accent border-accent/20">{lang.proficiency}</Badge>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Spoken Languages */}
            <div>
                <h3 className="flex items-center gap-4 text-3xl font-headline text-primary mb-6 [text-shadow:0_0_8px_hsl(var(--primary)/0.5)]">
                    <Languages className="h-8 w-8 text-accent drop-shadow-[0_0_5px_hsl(var(--accent)/0.6)]" />
                    <span>Spoken Languages</span>
                </h3>
                <div className="space-y-4">
                    {aboutData.spokenLanguages.map((lang, index) => (
                        <motion.div 
                            key={index}
                            custom={index + timelineItemsCount + certItemsCount + aboutData.programmingLanguages.length}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            className="flex justify-between items-center p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-accent/20"
                        >
                            <span className="font-code text-primary">{lang.name}</span>
                            <Badge variant="secondary" className="font-code bg-accent/10 text-accent border-accent/20">{lang.proficiency}</Badge>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>

        <div className="pt-6">
            <h3 className="flex items-center gap-4 text-3xl font-headline text-primary mb-6 [text-shadow:0_0_8px_hsl(var(--primary)/0.5)]">
                <Gamepad2 className="h-8 w-8 text-accent drop-shadow-[0_0_5px_hsl(var(--accent)/0.6)]" />
                <span>Hobbies & Interests</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {aboutData.hobbies.map((hobby, index) => (
                    <motion.div 
                        key={index}
                        custom={index + timelineItemsCount + certItemsCount + aboutData.programmingLanguages.length + aboutData.spokenLanguages.length}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-accent/20 text-center h-28"
                    >
                        <hobby.icon className="h-8 w-8 text-accent" />
                        <span className="font-code text-primary text-sm text-center">{hobby.name}</span>
                    </motion.div>
                ))}
            </div>
        </div>
      </div>
    </section>
  )
}

    
