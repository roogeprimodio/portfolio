import { aboutData, projects, skillData } from '@/lib/portfolio-data';
import { Mail, MapPin, Linkedin, Github, Phone, Link as LinkIcon, Briefcase, GraduationCap, Lightbulb, Wrench, Star } from "lucide-react";

const SectionTitle = ({ children, icon: Icon }: { children: React.ReactNode, icon: React.ElementType }) => (
    <div className="flex items-center gap-2 mb-1.5">
      <Icon className="w-4 h-4 text-blue-600" />
      <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wider">
        {children}
      </h2>
    </div>
);

const Section = ({ children }: { children: React.ReactNode }) => (
    <section className="border-t border-gray-200 pt-2">{children}</section>
);


export const ResumePreview = () => {
  return (
    <div id="resume-content" className="bg-white text-gray-800 p-8 font-sans shadow-2xl w-[50rem]">
      {/* Header */}
      <header className="text-center mb-3">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">JAGDISH ODEDARA</h1>
        <p className="text-lg text-blue-600 font-semibold mt-1">Digital Craftsman & Code Poet</p>
        <div className="mt-2 flex justify-center items-center flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
          <a href={`mailto:${aboutData.contactInfo.email}`} className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
            <Mail className="w-3.5 h-3.5" /> {aboutData.contactInfo.email}
          </a>
          <a href="tel:9773075648" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
            <Phone className="w-3.5 h-3.5" /> +91 9773075648
          </a>
          <p className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" /> {aboutData.contactInfo.address}
          </p>
        </div>
        <div className="mt-1.5 flex justify-center items-center gap-x-4 text-sm text-gray-600">
          <a href="https://www.linkedin.com/in/jagdish-odedara-4703532a8/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
            <Linkedin className="w-3.5 h-3.5" /> linkedin.com/in/jagdish-odedara
          </a>
          <a href="https://github.com/roogeprimodio" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
            <Github className="w-3.5 h-3.5" /> github.com/roogeprimodio
          </a>
        </div>
      </header>

      {/* Summary */}
      <section className="mb-3">
        <p className="text-center text-sm text-gray-700 leading-relaxed max-w-3xl mx-auto">{aboutData.summary}</p>
      </section>

      <main className="space-y-2">
        {/* Experience */}
        <Section>
          <SectionTitle icon={Briefcase}>Experience</SectionTitle>
          <div className="space-y-2">
            {aboutData.experience.map((exp, index) => (
              <div key={index} className="pl-6 relative break-inside-avoid">
                <div className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-blue-600 border border-white"></div>
                <div className="absolute left-[3px] top-3 h-full w-px bg-gray-200"></div>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-base font-semibold text-gray-900">{exp.role}</h3>
                  <p className="text-xs text-gray-500 font-mono">{exp.duration}</p>
                </div>
                <p className="text-sm font-medium text-blue-600">{exp.company}</p>
                <p className="text-sm text-gray-700 mt-0.5 leading-normal">{exp.description}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Projects */}
        <Section>
          <SectionTitle icon={Lightbulb}>Projects</SectionTitle>
          <div className="space-y-2">
            {projects.slice(0, 3).map((proj, index) => (
               <div key={index} className="pl-6 relative break-inside-avoid">
                  <div className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-blue-600 border border-white"></div>
                  <div className="absolute left-[3px] top-3 h-full w-px bg-gray-200"></div>
                  <div className="flex justify-between items-baseline">
                      <h3 className="text-base font-semibold text-gray-900">{proj.title}</h3>
                      {proj.liveUrl !== '#' && 
                        <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                          Live Demo <LinkIcon className="w-3 h-3" />
                        </a>
                      }
                  </div>
                  <p className="text-sm text-gray-700 mt-0.5 leading-normal">{proj.description}</p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                      {proj.tags.map(tag => <span key={tag} className="text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">{tag}</span>)}
                  </div>
               </div>
            ))}
          </div>
        </Section>

        {/* Education */}
        <Section>
          <SectionTitle icon={GraduationCap}>Education</SectionTitle>
          <div className="space-y-2">
            {aboutData.education.map((edu, index) => (
              <div key={index} className="pl-6 relative break-inside-avoid">
                <div className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-blue-600 border-2 border-white"></div>
                <div className="absolute left-[3px] top-3 h-full w-px bg-gray-200"></div>
                <h3 className="text-base font-semibold text-gray-900">{edu.degree}</h3>
                <div className="flex justify-between items-baseline">
                  <p className="text-sm font-medium text-blue-600">{edu.institution}</p>
                  <p className="text-xs text-gray-500 font-mono">{edu.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
        
        {/* Skills */}
        <Section>
          <SectionTitle icon={Wrench}>Skills</SectionTitle>
          <div className="space-y-2">
            {skillData.map((category) => (
               <div key={category.title} className="flex items-start break-inside-avoid">
                  <h3 className="w-1/4 font-semibold text-gray-700 text-xs pr-4 text-right flex items-center justify-end gap-2"><category.icon className="w-3.5 h-3.5"/>{category.title}</h3>
                  <div className="w-3/4 flex flex-wrap gap-1">
                    {category.skills.map((skill) => (
                       <span key={skill} className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">{skill}</span>
                    ))}
                  </div>
               </div>
            ))}
          </div>
        </Section>

        {/* Certifications */}
        <Section>
          <SectionTitle icon={Star}>Certifications</SectionTitle>
          <div className="space-y-1.5">
            {aboutData.certifications.map((cert, index) => (
              <div key={index} className="flex justify-between items-baseline pl-6 break-inside-avoid">
                <div>
                  <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-blue-600 hover:underline">{cert.name}</a>
                  <p className="text-xs text-gray-700">{cert.issuer}</p>
                </div>
                <p className="text-xs text-gray-500 font-mono">{cert.year}</p>
              </div>
            ))}
          </div>
        </Section>
      </main>
    </div>
  );
};
