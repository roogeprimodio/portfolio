
"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Briefcase, GraduationCap, BrainCircuit, Award, Languages, Code, MapPin, Mail } from "lucide-react";

const aboutData = {
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
        
        {/* Languages */}
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
                            <span className="font-code text-muted-foreground">{lang.proficiency}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  )
}
