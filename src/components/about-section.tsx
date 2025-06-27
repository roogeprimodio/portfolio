
"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Briefcase, GraduationCap, BrainCircuit, Award, Languages, Code, MapPin, Mail, ArrowUpRight } from "lucide-react";
import { aboutData } from "@/lib/portfolio-data";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

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
  const { resolvedTheme } = useTheme();

  return (
    <section id="about" className="flex flex-col items-center justify-center p-4 md:py-24 overflow-hidden">
      <div className="text-center space-y-2 mb-12">
        <h2 
           className={cn(
            "text-4xl md:text-5xl font-bold tracking-widest uppercase animate-glitch-subtle",
            resolvedTheme === 'dark' ? 'font-headline-dark text-primary dark:[text-shadow:0_0_8px_hsl(var(--primary)/0.5)]' : 'font-headline text-primary light:animate-electric-glow'
          )}
        >
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
              <CardTitle 
                className={cn(
                  "flex items-center gap-4 text-2xl text-accent",
                  resolvedTheme === 'dark' ? 'font-headline-dark dark:[text-shadow:0_0_8px_hsl(var(--accent)/0.5)]' : 'font-headline light:animate-electric-glow-accent'
                )}
              >
                <BrainCircuit className="h-8 w-8 dark:drop-shadow-[0_0_5px_hsl(var(--accent)/0.6)] light:animate-electric-glow-icon" />
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
              <CardTitle 
                className={cn(
                  "flex items-center gap-4 text-2xl text-accent",
                  resolvedTheme === 'dark' ? 'font-headline-dark dark:[text-shadow:0_0_8px_hsl(var(--accent)/0.5)]' : 'font-headline light:animate-electric-glow-accent'
                )}
              >
                <MapPin className="h-8 w-8 dark:drop-shadow-[0_0_5px_hsl(var(--accent)/0.6)] light:animate-electric-glow-icon" />
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
          <h3 
             className={cn(
              "flex items-center gap-4 text-3xl text-primary mb-6",
              resolvedTheme === 'dark' ? 'font-headline-dark dark:[text-shadow:0_0_8px_hsl(var(--primary)/0.5)]' : 'font-headline light:animate-electric-glow'
            )}
          >
            <Briefcase className="h-8 w-8 text-accent dark:drop-shadow-[0_0_5px_hsl(var(--accent)/0.6)] light:animate-electric-glow-icon" />
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
           <h3 
              className={cn(
                "flex items-center gap-4 text-3xl text-primary mb-6",
                resolvedTheme === 'dark' ? 'font-headline-dark dark:[text-shadow:0_0_8px_hsl(var(--primary)/0.5)]' : 'font-headline light:animate-electric-glow'
              )}
            >
            <GraduationCap className="h-8 w-8 text-accent dark:drop-shadow-[0_0_5px_hsl(var(--accent)/0.6)] light:animate-electric-glow-icon" />
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
          <h3 
            className={cn(
              "flex items-center gap-4 text-3xl text-primary mb-6",
              resolvedTheme === 'dark' ? 'font-headline-dark dark:[text-shadow:0_0_8px_hsl(var(--primary)/0.5)]' : 'font-headline light:animate-electric-glow'
            )}
          >
            <Award className="h-8 w-8 text-accent dark:drop-shadow-[0_0_5px_hsl(var(--accent)/0.6)] light:animate-electric-glow-icon" />
            <span>Accolades & Certifications</span>
          </h3>
          <div className="space-y-6 relative pl-8 border-l-2 border-accent/30">
            {aboutData.certifications.map((item, index) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <motion.div
                  custom={index + timelineItemsCount}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  className="relative"
                >
                  <div className="absolute -left-[37px] top-1 h-4 w-4 rounded-full bg-accent border-2 border-background"></div>
                  <Card className="bg-card/50 backdrop-blur-sm border border-accent/20 hover:border-accent transition-colors group">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between text-xl font-code text-primary">
                        <span>{item.name}</span>
                        <ArrowUpRight className="h-5 w-5 text-accent/70 group-hover:text-accent transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </CardTitle>
                      <CardDescription className="font-code text-accent">{item.issuer} // Acquired: {item.year}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              </a>
            ))}
          </div>
        </div>
        
        {/* Languages */}
        <div className="grid md:grid-cols-2 gap-12 pt-6">
            {/* Programming Languages */}
            <div>
                <h3 
                  className={cn(
                    "flex items-center gap-4 text-3xl text-primary mb-6",
                    resolvedTheme === 'dark' ? 'font-headline-dark dark:[text-shadow:0_0_8px_hsl(var(--primary)/0.5)]' : 'font-headline light:animate-electric-glow'
                  )}
                >
                    <Code className="h-8 w-8 text-accent dark:drop-shadow-[0_0_5px_hsl(var(--accent)/0.6)] light:animate-electric-glow-icon" />
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
                <h3 
                  className={cn(
                    "flex items-center gap-4 text-3xl text-primary mb-6",
                    resolvedTheme === 'dark' ? 'font-headline-dark dark:[text-shadow:0_0_8px_hsl(var(--primary)/0.5)]' : 'font-headline light:animate-electric-glow'
                  )}
                >
                    <Languages className="h-8 w-8 text-accent dark:drop-shadow-[0_0_5px_hsl(var(--accent)/0.6)] light:animate-electric-glow-icon" />
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
