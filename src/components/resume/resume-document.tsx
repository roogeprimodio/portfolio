import { profile } from "@/data/profile";
import { certifications, education, experience } from "@/data/experience";
import { sortedProjects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { socials } from "@/data/socials";

/**
 * The resume, generated from the same data files that drive the site, so it
 * can never drift from what the portfolio says. Rendered in two places: inside
 * the eye-icon modal as a scaled preview, and at /resume as a print page.
 *
 * Styling is deliberately plain and self-contained (no theme tokens): a resume
 * is read on paper or in an ATS, and it must look the same in dark mode, in
 * the modal, and in a PDF. Colours are literal for the same reason.
 */

const RESUME_PROJECT_COUNT = 6;

/** Strip the scheme so links read cleanly on paper. */
function bare(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-5 break-inside-avoid">
      <h2 className="mb-2 border-b border-neutral-300 pb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-800">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function ResumeDocument() {
  const linkable = socials.filter(
    (social) => social.href.startsWith("http") && ["github", "linkedin"].includes(social.icon),
  );
  const phone = socials.find((social) => social.href.startsWith("tel:"))?.href.replace(/^tel:/, "");
  const projects = sortedProjects
    .filter((project) => project.status !== "concept")
    .slice(0, RESUME_PROJECT_COUNT);

  return (
    <article
      id="resume-document"
      className="mx-auto w-[210mm] min-h-[297mm] bg-white px-[16mm] py-[14mm] font-sans text-[10.5px] leading-snug text-neutral-800 print:min-h-0 print:w-auto print:px-0 print:py-0"
    >
      <header className="mb-5 flex items-start justify-between gap-6 border-b-2 border-neutral-800 pb-4">
        <div>
          <h1 className="text-[26px] font-bold uppercase tracking-wide text-neutral-900">{profile.name}</h1>
          <p className="text-[12px] font-medium text-neutral-600">{profile.title}</p>
        </div>
        <ul className="space-y-0.5 text-right text-[10px] text-neutral-700">
          <li>
            <a href={`mailto:${profile.email}`} className="hover:underline">{profile.email}</a>
          </li>
          {phone && <li>+91 {phone}</li>}
          <li>{profile.location}</li>
          {linkable.map((social) => (
            <li key={social.name}>
              <a href={social.href} className="hover:underline">{bare(social.href)}</a>
            </li>
          ))}
        </ul>
      </header>

      <Section title="Summary">
        <p className="text-neutral-700">{profile.summary}</p>
      </Section>

      <div className="grid grid-cols-[1.6fr_1fr] gap-x-7">
        <div>
          <Section title="Experience">
            {experience.map((job) => (
              <div key={`${job.company}-${job.role}`} className="mb-3 break-inside-avoid last:mb-0">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-[12px] font-semibold text-neutral-900">{job.role}</h3>
                  <span className="shrink-0 text-[9.5px] text-neutral-500">{job.duration}</span>
                </div>
                <p className="text-[10.5px] font-medium text-neutral-600">{job.company}</p>
                <p className="mt-0.5 text-neutral-700">{job.description}</p>
              </div>
            ))}
          </Section>

          <Section title="Selected projects">
            {projects.map((project) => (
              <div key={project.slug} className="mb-3 break-inside-avoid last:mb-0">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-[12px] font-semibold text-neutral-900">
                    {project.title}
                    <span className="ml-2 text-[9.5px] font-normal text-neutral-500">{project.role}</span>
                  </h3>
                  <span className="shrink-0 text-[9.5px] text-neutral-500">{project.period}</span>
                </div>
                <p className="text-neutral-700">{project.tagline}</p>
                <p className="mt-0.5 text-[9.5px] text-neutral-500">
                  {project.stack.length > 0 ? project.stack.join(" · ") : project.tags.join(" · ")}
                  {project.liveUrl && (
                    <>
                      {" — "}
                      <a href={project.liveUrl} className="hover:underline">{bare(project.liveUrl)}</a>
                    </>
                  )}
                </p>
              </div>
            ))}
          </Section>
        </div>

        <div>
          <Section title="Skills">
            {skillGroups.map((group) => (
              <div key={group.title} className="mb-2.5 break-inside-avoid last:mb-0">
                <h3 className="mb-0.5 text-[10px] font-semibold text-neutral-800">{group.title}</h3>
                <p className="text-neutral-700">{group.skills.join(", ")}</p>
              </div>
            ))}
          </Section>

          <Section title="Education">
            {education.map((item) => (
              <div key={item.institution} className="mb-2.5 break-inside-avoid last:mb-0">
                <h3 className="text-[10.5px] font-semibold text-neutral-900">{item.degree}</h3>
                <p className="text-neutral-700">{item.institution}</p>
                <p className="text-[9.5px] text-neutral-500">{item.duration}</p>
              </div>
            ))}
          </Section>

          {certifications.length > 0 && (
            <Section title="Certifications">
              {certifications.map((cert) => (
                <div key={cert.name} className="mb-1.5 break-inside-avoid last:mb-0">
                  <h3 className="text-[10.5px] font-semibold text-neutral-900">
                    {cert.url ? (
                      <a href={cert.url} className="hover:underline">{cert.name}</a>
                    ) : (
                      cert.name
                    )}
                  </h3>
                  <p className="text-[9.5px] text-neutral-500">
                    {cert.issuer} · {cert.year}
                  </p>
                </div>
              ))}
            </Section>
          )}

          <Section title="Languages">
            <p className="text-neutral-700">
              {profile.spokenLanguages.map((lang) => `${lang.name} (${lang.proficiency})`).join(", ")}
            </p>
          </Section>
        </div>
      </div>
    </article>
  );
}
