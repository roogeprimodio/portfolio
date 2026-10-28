import { parseData, profileSchema, type Profile } from "./schema";

export const profile: Profile = parseData(
  profileSchema,
  {
    name: "Jagdish Odedara",
    alternateNames: ["Jagdish Odedra", "Jagadish Odedara", "roogeprimodio"],
    seoDescription:
      "Jagdish Odedara — full-stack developer from Porbandar, Gujarat. Flutter, Next.js and Node.js projects, plus design and video work.",
    title: "Digital Craftsman & Code Poet",
    tagline: "I build things that work, then make them feel good to use.",
    summary:
      "A highly motivated and results-oriented Digital Craftsman with a passion for building elegant and efficient solutions. I thrive on solving complex problems and turning innovative ideas into reality, blending artistic design with robust code.",
    location: "India, Gujarat, Porbandar 360576",
    email: "jagdishodedara47@gmail.com",
    avatar: "/jagdish.png",
    // Flip this one value to change the hero badge — no component edits.
    availability: "open",
    availabilityNote: "Open to full-time and freelance work",
    // Generated from this data at /resume; the eye icon previews it.
    resumeUrl: "/resume",
    programmingLanguages: [
      "JavaScript",
      "Python",
      "Java",
      "React.js",
      "Next.js",
      "Flutter",
      "Node.js",
    ],
    spokenLanguages: [
      { name: "English", proficiency: "Proficient" },
      { name: "Hindi", proficiency: "Native" },
      { name: "Gujarati", proficiency: "Native" },
    ],
  },
  "profile.ts",
);
