import { aboutData, projects, skillData } from '@/lib/portfolio-data';
import { Mail, MapPin, Linkedin, Github, Phone, Link as LinkIcon, Briefcase, GraduationCap, Lightbulb, Wrench, Star } from "lucide-react";

const SectionTitle = ({ children, icon: Icon }: { children: React.ReactNode, icon: React.ElementType }) => (
    <div className="flex items-center gap-2 mb-1.5">
      <Icon className="w-4 h-4 text-blue-600" />
      <h2 className="text-base font-bold text-gray-800 uppercase tracking-wider">
        {children}
      </h2>
    </div>
);

const Section = ({ children }: { children: React.ReactNode }) => (
    <section className="border-t border-gray-200 pt-1.5">{children}</section>
);

const PageBreak = () => (
    <div className="relative text-center my-2 h-px bg-gray-200">
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2 text-xs text-gray-400 font-mono">Page Break</span>
    </div>
);

export const ResumePreview = () => {
  return (
    <div id="resume-content" className="bg-white text-gray-800 p-6 sm:p-8 font-sans shadow-2xl w-full max-w-[50rem] mx-auto">
      {/* Header */}
      <header className="text-center mb-3">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">JAGDISH ODEDARA</h1>
        <p className="text-md text-blue-600 font-semibold mt-0.5">Digital Craftsman & Code Poet</p>
        <div className="mt-1.5 flex justify-center items-center flex-wrap gap-x-3 gap-y-1 text-xs text-gray-600">
          <a href={`mailto:${aboutData.contactInfo.email}`} className="flex items-center gap-1 hover:text-blue-600 transition-colors">
            <Mail className="w-3 h-3" /> {aboutData.contactInfo.email}
          </a>
          <a href="tel:9773075648" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
            <Phone className="w-3 h-3" /> +91 9773075648
          </a>
          <p className="flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {aboutData.contactInfo.address}
          </p>
        </div>
        <div className="mt-1 flex justify-center items-center flex-wrap gap-x-3 text-xs text-gray-600">
          <a href="https://www.linkedin.com/in/jagdish-odedara-4703532a8/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
            <Linkedin className="w-3 h-3" /> linkedin.com/in/jagdish-odedara
          </a>
          <a href="https://github.com/roogeprimodio" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
            <Github className="w-3 h-3" /> github.com/roogeprimodio
          </a>
        </div>
      </header>

      {/* Summary */}
      <section className="my-2">
        <p className="text-center text-xs text-gray-700 leading-relaxed max-w-3xl mx-auto">{aboutData.summary}</p>
      </section>

      <main className="space-y-1.5">
        {/* Experience */}
        <Section>
          <SectionTitle icon={Briefcase}>Experience</SectionTitle>
          <div className="space-y-1">
            {aboutData.experience.map((exp, index) => (
              <div key={index} className="pl-5 relative break-inside-avoid">
                <div className="absolute left-0 top-1 h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-semibold text-gray-900">{exp.role}</h3>
                  <p className="text-[10px] text-gray-500 font-mono">{exp.duration}</p>
                </div>
                <p className="text-xs font-medium text-blue-600">{exp.company}</p>
                <p className="text-xs text-gray-700 mt-0.5 leading-normal">{exp.description}</p>
              </div>
            ))}
          </div>
        </Section>
        
        {/* Education */}
        <Section>
          <SectionTitle icon={GraduationCap}>Education</SectionTitle>
          <div className="space-y-1">
            {aboutData.education.map((edu, index) => (
              <div key={index} className="pl-5 relative break-inside-avoid">
                 <div className="absolute left-0 top-1 h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                <h3 className="text-sm font-semibold text-gray-900">{edu.degree}</h3>
                <div className="flex justify-between items-baseline">
                  <p className="text-xs font-medium text-blue-600">{edu.institution}</p>
                  <p className="text-[10px] text-gray-500 font-mono">{edu.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <PageBreak />

        {/* Projects */}
        <Section>
          <SectionTitle icon={Lightbulb}>Projects</SectionTitle>
          <div className="space-y-1">
            {projects.slice(0, 3).map((proj, index) => (
               <div key={index} className="pl-5 relative break-inside-avoid">
                  <div className="absolute left-0 top-1 h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                  <div className="flex justify-between items-baseline">
                      <h3 className="text-sm font-semibold text-gray-900">{proj.title}</h3>
                      {proj.liveUrl !== '#' && 
                        <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-600 hover:underline flex items-center gap-1">
                          Live Demo <LinkIcon className="w-2.5 h-2.5" />
                        </a>
                      }
                  </div>
                  <p className="text-xs text-gray-700 mt-0.5 leading-normal">{proj.description}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                      {proj.tags.map(tag => <span key={tag} className="text-[9px] bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded-full">{tag}</span>)}
                  </div>
               </div>
            ))}
          </div>
        </Section>

        {/* Skills */}
        <Section>
          <SectionTitle icon={Wrench}>Skills</SectionTitle>
          <div className="space-y-1">
            {skillData.map((category) => (
               <div key={category.title} className="flex items-start break-inside-avoid">
                  <h3 className="w-1/4 font-semibold text-gray-700 text-xs pr-2 text-right flex items-center justify-end gap-1.5"><category.icon className="w-3 h-3"/>{category.title}</h3>
                  <div className="w-3/4 flex flex-wrap gap-1">
                    {category.skills.map((skill) => (
                       <span key={skill} className="text-[9px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">{skill}</span>
                    ))}
                  </div>
               </div>
            ))}
          </div>
        </Section>

        {/* Certifications */}
        <Section>
          <SectionTitle icon={Star}>Certifications</SectionTitle>
          <div className="space-y-1">
            {aboutData.certifications.map((cert, index) => (
              <div key={index} className="flex justify-between items-baseline pl-5 break-inside-avoid">
                <div>
                  <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-blue-600 hover:underline">{cert.name}</a>
                  <p className="text-[10px] text-gray-700">{cert.issuer}</p>
                </div>
                <p className="text-[10px] text-gray-500 font-mono">{cert.year}</p>
              </div>
            ))}
          </div>
        </Section>
      </main>
    </div>
  );
};
