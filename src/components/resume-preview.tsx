
import { aboutData, projects, skillData } from '@/lib/portfolio-data';
import { Mail, MapPin, Linkedin, Github, Phone, Link as LinkIcon } from "lucide-react";

export const ResumePreview = () => {
  return (
    <div className="bg-white text-gray-900 p-8 font-sans w-full max-w-4xl mx-auto shadow-lg" id="resume-content">
      <header className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">JAGDISH ODEDARA</h1>
          <p className="text-lg text-blue-600 font-medium">Digital Craftsman & Code Poet</p>
        </div>
        <div className="text-right text-sm space-y-1">
          <p className="flex items-center justify-end gap-2"><Mail className="w-4 h-4 text-gray-600" /> {aboutData.contactInfo.email}</p>
          <p className="flex items-center justify-end gap-2"><MapPin className="w-4 h-4 text-gray-600" /> {aboutData.contactInfo.address}</p>
          <p className="flex items-center justify-end gap-2"><Phone className="w-4 h-4 text-gray-600" /> +91 9773075648</p>
          <a href="https://www.linkedin.com/in/jagdish-odedara-4703532a8/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-end gap-2 text-blue-600 hover:underline"><Linkedin className="w-4 h-4" /> /in/jagdish-odedara</a>
          <a href="https://github.com/roogeprimodio" target="_blank" rel="noopener noreferrer" className="flex items-center justify-end gap-2 text-blue-600 hover:underline"><Github className="w-4 h-4" /> /roogeprimodio</a>
        </div>
      </header>
      
      <section className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-1 mb-2">SUMMARY</h2>
        <p className="text-sm text-gray-700">{aboutData.summary}</p>
      </section>
      
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-1 mb-3">EXPERIENCE</h2>
            {aboutData.experience.map((exp, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-semibold">{exp.role}</h3>
                  <p className="text-sm text-gray-500 font-mono">{exp.duration}</p>
                </div>
                <p className="text-md font-medium text-blue-600">{exp.company}</p>
                <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
              </div>
            ))}
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-1 mb-3">PROJECTS</h2>
            {projects.slice(0, 3).map((proj, index) => (
                 <div key={index} className="mb-3 last:mb-0">
                    <div className="flex justify-between items-baseline">
                        <h3 className="text-lg font-semibold">{proj.title}</h3>
                        {proj.liveUrl !== '#' && <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline flex items-center gap-1">Live <LinkIcon className="w-3 h-3" /></a>}
                    </div>
                    <p className="text-sm text-gray-700">{proj.description}</p>
                 </div>
            ))}
          </section>
        </div>

        <div className="col-span-1">
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-1 mb-3">SKILLS</h2>
            <div className="space-y-3">
              {skillData.map((category) => (
                 <div key={category.title}>
                    <h3 className="text-md font-semibold mb-1 flex items-center gap-1.5"><category.icon className="w-4 h-4"/>{category.title}</h3>
                    <div className="flex flex-wrap gap-1">
                      {category.skills.map((skill) => (
                         <span key={skill} className="text-xs bg-gray-200 text-gray-800 px-1.5 py-0.5 rounded">{skill}</span>
                      ))}
                    </div>
                 </div>
              ))}
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-1 mb-3">EDUCATION</h2>
            {aboutData.education.map((edu, index) => (
              <div key={index} className="mb-3 last:mb-0">
                <h3 className="text-md font-semibold">{edu.degree}</h3>
                <p className="text-sm font-medium text-blue-600">{edu.institution}</p>
                <p className="text-xs text-gray-500 font-mono">{edu.duration}</p>
              </div>
            ))}
          </section>
          
          <section>
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-1 mb-3">CERTIFICATIONS</h2>
            {aboutData.certifications.map((cert, index) => (
              <div key={index} className="mb-2 last:mb-0">
                <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-md font-semibold text-blue-600 hover:underline">{cert.name}</a>
                <p className="text-sm">{cert.issuer}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};
