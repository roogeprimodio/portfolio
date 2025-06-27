
import { aboutData, projects, skillData } from '@/lib/portfolio-data';
import { Mail, MapPin, Linkedin, Github, Phone, Link as LinkIcon } from "lucide-react";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-1 mb-3 uppercase tracking-wider">
      {children}
    </h2>
);

export const ResumePreview = () => {
  return (
    <div className="bg-white text-gray-800 p-8 font-sans w-full max-w-4xl mx-auto shadow-lg" id="resume-content">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">JAGDISH ODEDARA</h1>
        <p className="text-xl text-blue-600 font-semibold mt-1">Digital Craftsman & Code Poet</p>
        <div className="mt-4 flex justify-center items-center flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
          <a href={`mailto:${aboutData.contactInfo.email}`} className="flex items-center gap-2 hover:text-blue-600 transition-colors">
            <Mail className="w-4 h-4" /> {aboutData.contactInfo.email}
          </a>
          <a href="tel:9773075648" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
            <Phone className="w-4 h-4" /> +91 9773075648
          </a>
          <p className="flex items-center gap-2">
            <MapPin className="w-4 h-4" /> {aboutData.contactInfo.address}
          </p>
        </div>
        <div className="mt-2 flex justify-center items-center gap-x-6 text-sm text-gray-600">
          <a href="https://www.linkedin.com/in/jagdish-odedara-4703532a8/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
            <Linkedin className="w-4 h-4" /> /in/jagdish-odedara
          </a>
          <a href="https://github.com/roogeprimodio" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
            <Github className="w-4 h-4" /> /roogeprimodio
          </a>
        </div>
      </header>
      
      {/* Summary */}
      <section className="mb-6">
        <SectionTitle>Summary</SectionTitle>
        <p className="text-sm text-gray-700 leading-relaxed">{aboutData.summary}</p>
      </section>
      
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-6">
          {/* Experience */}
          <section>
            <SectionTitle>Experience</SectionTitle>
            <div className="space-y-4">
              {aboutData.experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-lg font-semibold text-gray-900">{exp.role}</h3>
                    <p className="text-sm text-gray-500 font-mono">{exp.duration}</p>
                  </div>
                  <p className="text-md font-medium text-blue-600">{exp.company}</p>
                  <p className="text-sm text-gray-700 mt-1 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section>
            <SectionTitle>Projects</SectionTitle>
            <div className="space-y-4">
              {projects.slice(0, 3).map((proj, index) => (
                 <div key={index}>
                    <div className="flex justify-between items-baseline">
                        <h3 className="text-lg font-semibold text-gray-900">{proj.title}</h3>
                        {proj.liveUrl !== '#' && 
                          <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                            Live Demo <LinkIcon className="w-3 h-3" />
                          </a>
                        }
                    </div>
                    <p className="text-sm text-gray-700 mt-1 leading-relaxed">{proj.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {proj.tags.map(tag => <span key={tag} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{tag}</span>)}
                    </div>
                 </div>
              ))}
            </div>
          </section>
        </div>

        <div className="col-span-1 space-y-6">
          {/* Skills */}
          <section>
            <SectionTitle>Skills</SectionTitle>
            <div className="space-y-4">
              {skillData.map((category) => (
                 <div key={category.title}>
                    <h3 className="text-md font-semibold mb-2 flex items-center gap-2 text-gray-700"><category.icon className="w-4 h-4"/>{category.title}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {category.skills.map((skill) => (
                         <span key={skill} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{skill}</span>
                      ))}
                    </div>
                 </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <SectionTitle>Education</SectionTitle>
            <div className="space-y-3">
              {aboutData.education.map((edu, index) => (
                <div key={index}>
                  <h3 className="text-md font-semibold text-gray-900">{edu.degree}</h3>
                  <p className="text-sm font-medium text-blue-600">{edu.institution}</p>
                  <p className="text-xs text-gray-500 font-mono mt-0.5">{edu.duration}</p>
                </div>
              ))}
            </div>
          </section>
          
          {/* Certifications */}
          <section>
            <SectionTitle>Certifications</SectionTitle>
            <div className="space-y-3">
              {aboutData.certifications.map((cert, index) => (
                <div key={index}>
                  <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-md font-semibold text-blue-600 hover:underline">{cert.name}</a>
                  <p className="text-sm text-gray-700">{cert.issuer} ({cert.year})</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
