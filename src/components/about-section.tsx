
"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Briefcase, GraduationCap, BrainCircuit } from "lucide-react";

const aboutData = {
  summary: "A highly motivated and results-oriented Digital Craftsman with a passion for building elegant and efficient solutions. I thrive on solving complex problems and turning innovative ideas into reality, blending artistic design with robust code.",
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
  ]
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
  return (
    <section id="about" className="h-screen flex flex-col items-center justify-center p-4 overflow-hidden" style={{ scrollSnapAlign: 'start' }}>
      <div className="text-center space-y-2 mb-12">
        <h2 className="text-4xl md:text-5xl font-bold tracking-widest font-headline text-primary uppercase animate-glitch-subtle">
          Personal Datastream
        </h2>
        <p className="text-accent font-code">My background and experience.</p>
      </div>

      <div className="w-full max-w-4xl h-[60vh] overflow-y-auto scrollbar-hide space-y-12 px-4">
        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
        >
          <Card className="bg-card/60 backdrop-blur-md border border-accent/30 shadow-2xl shadow-black/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-4 font-headline text-2xl text-accent">
                <BrainCircuit className="h-8 w-8" />
                <span>Self-Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground font-code">{aboutData.summary}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Experience */}
        <div>
          <h3 className="flex items-center gap-4 text-3xl font-headline text-primary mb-6">
            <Briefcase className="h-8 w-8 text-accent" />
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
           <h3 className="flex items-center gap-4 text-3xl font-headline text-primary mb-6">
            <GraduationCap className="h-8 w-8 text-accent" />
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
      </div>
    </section>
  )
}
