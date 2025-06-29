
import { aboutData, projects, skillData } from '@/lib/portfolio-data';
import { FaBriefcase, FaGraduationCap, FaLightbulb, FaWrench, FaStar, FaLink } from 'react-icons/fa';
import { IoMail, IoLocationSharp, IoLogoLinkedin, IoLogoGithub, IoCall } from 'react-icons/io5';


// Reusable component for a major section with a title and a dividing line
const SectionTitle = ({ children, icon: Icon }: { children: React.ReactNode, icon: React.ElementType }) => (
    <div className="flex items-center gap-3 mb-3">
      <Icon className="w-5 h-5 text-blue-700" />
      <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wider">
        {children}
      </h2>
    </div>
);

// Reusable wrapper for a section to add top border and padding
const Section = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={`border-t border-gray-200 pt-4 mt-4 ${className}`}>{children}</div>
);

// Component for a single project entry
const ProjectEntry = ({ project }: { project: typeof projects[0] }) => (
    <div className="mb-3 break-inside-avoid">
        <div className="grid grid-cols-4 items-center">
            <h3 className="col-span-3 text-base font-semibold text-gray-900">{project.title}</h3>
            {project.liveUrl !== '#' &&
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-700 hover:underline flex items-center gap-1 shrink-0 ml-4 justify-self-end">
                Live Demo <FaLink className="w-3 h-3" />
              </a>
            }
        </div>
        <p className="text-sm text-gray-700 leading-relaxed mt-1">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-2">
            {project.tags.map(tag => <span key={tag} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full font-medium">{tag}</span>)}
        </div>
    </div>
);

// A wrapper for each visual page to enforce A4 aspect ratio and styling
const Page = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-white shadow-lg w-[50rem] min-h-[70.7rem] max-w-full mb-8 p-12">
        {children}
    </div>
);

export const ResumePreview = () => {
  return (
    <div id="resume-content" className="w-full bg-transparent flex flex-col items-center">
        {/* Page 1 */}
        <Page>
            {/* Header */}
            <header className="text-center mb-6">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">JAGDISH ODEDARA</h1>
                <p className="text-md text-blue-700 font-semibold mt-1">Digital Craftsman & Code Poet</p>
                <div className="mt-4 space-y-1 text-xs text-gray-600">
                    <div className="flex justify-center items-center flex-wrap gap-x-5 gap-y-1">
                        <a href={`mailto:${aboutData.contactInfo.email}`} className="flex items-center gap-1.5 hover:text-blue-700 transition-colors">
                            <IoMail className="w-3.5 h-3.5" /> {aboutData.contactInfo.email}
                        </a>
                        <a href="tel:9773075648" className="flex items-center gap-1.5 hover:text-blue-700 transition-colors">
                            <IoCall className="w-3.5 h-3.5" /> +91 9773075648
                        </a>
                    </div>
                     <div className="flex justify-center items-center flex-wrap gap-x-5 gap-y-1">
                        <a href="https://www.linkedin.com/in/jagdish-odedara-4703532a8/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-700 transition-colors">
                            <IoLogoLinkedin className="w-3.5 h-3.5" /> /in/jagdish-odedara
                        </a>
                        <a href="https://github.com/roogeprimodio" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-700 transition-colors">
                            <IoLogoGithub className="w-3.5 h-3.5" /> /roogeprimodio
                        </a>
                    </div>
                </div>
                <div className="mt-2 flex justify-center items-center">
                    <p className="flex items-center gap-1.5 text-xs text-gray-600">
                    <IoLocationSharp className="w-3.5 h-3.5" /> {aboutData.contactInfo.address}
                    </p>
                </div>
            </header>

            {/* Summary */}
            <div className="my-4">
                <p className="text-center text-sm text-gray-700 leading-relaxed max-w-3xl mx-auto">{aboutData.summary}</p>
            </div>

            {/* Experience */}
            <Section>
                <SectionTitle icon={FaBriefcase}>Experience</SectionTitle>
                <div className="space-y-4">
                    {aboutData.experience.map((exp, index) => (
                    <div key={index} className="break-inside-avoid">
                        <div className="grid grid-cols-4 items-baseline">
                            <h3 className="col-span-3 text-base font-semibold text-gray-900">{exp.role}</h3>
                            <p className="text-xs text-gray-500 font-mono justify-self-end">{exp.duration}</p>
                        </div>
                        <p className="text-sm font-medium text-blue-700 mt-0.5">{exp.company}</p>
                        <p className="text-sm text-gray-700 leading-relaxed mt-1">{exp.description}</p>
                    </div>
                    ))}
                </div>
            </Section>
            
            {/* Education */}
            <Section>
                <SectionTitle icon={FaGraduationCap}>Education</SectionTitle>
                <div className="space-y-4">
                    {aboutData.education.map((edu, index) => (
                    <div key={index} className="break-inside-avoid">
                        <div className="grid grid-cols-4 items-baseline">
                            <h3 className="col-span-3 text-base font-semibold text-gray-900">{edu.degree}</h3>
                            <p className="text-xs text-gray-500 font-mono justify-self-end">{edu.duration}</p>
                        </div>
                        <p className="text-sm font-medium text-blue-700 mt-0.5">{edu.institution}</p>
                        <p className="text-sm text-gray-700 leading-relaxed mt-1">{edu.description}</p>
                    </div>
                    ))}
                </div>
            </Section>

             {/* Certifications */}
            <Section>
                <SectionTitle icon={FaStar}>Certifications</SectionTitle>
                <div className="space-y-3">
                {aboutData.certifications.map((cert, index) => (
                    <div key={index} className="grid grid-cols-4 items-center break-inside-avoid">
                        <div className="col-span-3">
                            <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-blue-700 hover:underline">{cert.name}</a>
                            <p className="text-xs text-gray-600 mt-0.5">{cert.issuer}</p>
                        </div>
                        <p className="text-xs text-gray-500 font-mono justify-self-end">{cert.year}</p>
                    </div>
                ))}
                </div>
            </Section>
        </Page>

        {/* Page 2 */}
        <Page>
             {/* Projects */}
             <Section className="mt-0 pt-0 border-none">
                <SectionTitle icon={FaLightbulb}>Projects</SectionTitle>
                <div className="space-y-4">
                    {projects.map((proj, index) => (
                        <ProjectEntry key={index} project={proj} />
                    ))}
                </div>
            </Section>
        </Page>
        
        {/* Page 3 */}
        <Page>
             {/* Skills */}
            <Section className="mt-0 pt-0 border-none">
                <SectionTitle icon={FaWrench}>Technical Skills</SectionTitle>
                <div className="space-y-4 text-sm">
                {skillData.map((category) => (
                    <div key={category.title} className="break-inside-avoid">
                        <h3 className="text-base font-semibold text-gray-700 mb-2">{category.title}</h3>
                        <div className="flex flex-wrap gap-x-2 gap-y-1.5">
                        {category.skills.map((skill) => (
                            <span key={skill.name} className="inline-flex items-center gap-1.5 text-xs bg-blue-50 text-blue-800 px-2 py-1 rounded-full font-medium">
                                {skill.icon && <skill.icon className="h-3 w-3 shrink-0" />}
                                <span className="leading-none">{skill.name}</span>
                            </span>
                        ))}
                        </div>
                    </div>
                ))}
                </div>
            </Section>
        </Page>
    </div>
  );
};
