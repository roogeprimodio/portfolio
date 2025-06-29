
import { aboutData, projects, skillData } from '@/lib/portfolio-data';
import { Mail, MapPin, Linkedin, Github, Phone, Link as LinkIcon, Briefcase, GraduationCap, Lightbulb, Wrench, Star } from "lucide-react";

// Reusable component for a major section with a title and a dividing line
const SectionTitle = ({ children, icon: Icon }: { children: React.ReactNode, icon: React.ElementType }) => (
    <div className="flex items-center gap-2 mb-2">
      <Icon className="w-4 h-4 text-blue-600" />
      <h2 className="text-base font-bold text-gray-800 uppercase tracking-wider">
        {children}
      </h2>
    </div>
);

// Reusable wrapper for a section to add top border and padding
const Section = ({ children }: { children: React.ReactNode }) => (
    <div className="border-t border-gray-200 pt-2.5 mt-3">{children}</div>
);


export const ResumePreview = () => {
  return (
    <div id="resume-content" className="w-[50rem] max-w-full bg-white text-gray-800 p-8 font-sans shadow-lg">
        {/* Header */}
        <header className="text-center mb-4">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">JAGDISH ODEDARA</h1>
          <p className="text-md text-blue-600 font-semibold mt-0.5">Digital Craftsman & Code Poet</p>
          <div className="mt-2 flex justify-center items-center flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">
            <a href={`mailto:${aboutData.contactInfo.email}`} className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
              <Mail className="w-3 h-3" /> {aboutData.contactInfo.email}
            </a>
            <a href="tel:9773075648" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
              <Phone className="w-3 h-3" /> +91 9773075648
            </a>
            <p className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3" /> {aboutData.contactInfo.address}
            </p>
          </div>
          <div className="mt-1.5 flex justify-center items-center flex-wrap gap-x-4 text-xs text-gray-600">
            <a href="https://www.linkedin.com/in/jagdish-odedara-4703532a8/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
              <Linkedin className="w-3 h-3" /> linkedin.com/in/jagdish-odedara
            </a>
            <a href="https://github.com/roogeprimodio" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
              <Github className="w-3 h-3" /> github.com/roogeprimodio
            </a>
          </div>
        </header>

        {/* Summary */}
        <div className="my-3">
          <p className="text-center text-xs text-gray-700 leading-normal max-w-3xl mx-auto">{aboutData.summary}</p>
        </div>

        <main className="space-y-2">
          {/* Experience */}
          <Section>
            <SectionTitle icon={Briefcase}>Experience</SectionTitle>
            <div className="space-y-3">
              {aboutData.experience.map((exp, index) => (
                <div key={index} className="pl-5 relative">
                  <div className="absolute left-0 top-1.5 h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-semibold text-gray-900">{exp.role}</h3>
                    <p className="text-[10px] text-gray-500 font-mono">{exp.duration}</p>
                  </div>
                  <p className="text-xs font-medium text-blue-600 mt-0.5">{exp.company}</p>
                  <p className="text-xs text-gray-700 leading-normal mt-0.5">{exp.description}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Education */}
          <Section>
            <SectionTitle icon={GraduationCap}>Education</SectionTitle>
            <div className="space-y-3">
              {aboutData.education.map((edu, index) => (
                <div key={index} className="pl-5 relative">
                  <div className="absolute left-0 top-1.5 h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-[10px] text-gray-500 font-mono">{edu.duration}</p>
                  </div>
                  <p className="text-xs font-medium text-blue-600 mt-0.5">{edu.institution}</p>
                </div>
              ))}
            </div>
          </Section>
          
          {/* Projects */}
          <Section>
            <SectionTitle icon={Lightbulb}>Projects</SectionTitle>
            <div className="space-y-3">
              {projects.map((proj, index) => (
                <div key={index} className="pl-5 relative">
                    <div className="absolute left-0 top-1.5 h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                    <div className="flex justify-between items-baseline">
                        <h3 className="text-sm font-semibold text-gray-900">{proj.title}</h3>
                        {proj.liveUrl !== '#' && 
                          <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-600 hover:underline flex items-center gap-1">
                            Live Demo <LinkIcon className="w-2.5 h-2.5" />
                          </a>
                        }
                    </div>
                    <p className="text-xs text-gray-700 leading-normal mt-0.5">{proj.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                        {proj.tags.map(tag => <span key={tag} className="text-[9px] bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded-full font-medium">{tag}</span>)}
                    </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Skills */}
          <Section>
            <SectionTitle icon={Wrench}>Skills</SectionTitle>
            <div className="space-y-3">
              {skillData.map((category) => (
                <div key={category.title} className="flex items-start text-xs">
                    <h3 className="w-1/4 font-semibold text-gray-700 pr-2 text-right shrink-0">{category.title}</h3>
                    <div className="w-3/4 flex flex-wrap gap-1.5">
                      {category.skills.map((skill) => (
                        <span key={skill} className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium">{skill}</span>
                      ))}
                    </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Certifications */}
          <Section>
            <SectionTitle icon={Star}>Certifications</SectionTitle>
            <div className="space-y-3">
              {aboutData.certifications.map((cert, index) => (
                <div key={index} className="flex justify-between items-baseline pl-5">
                  <div>
                    <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-blue-600 hover:underline">{cert.name}</a>
                    <p className="text-[10px] text-gray-700 mt-0.5">{cert.issuer}</p>
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
