import { parseData, socialLinkSchema, type SocialLink } from "./schema";
import { z } from "zod";

/**
 * `icon` is a key, not a component — data files are imported by server
 * components and functions can't cross the server/client boundary. The hero
 * section maps these keys onto lucide icons.
 */
export const socials: SocialLink[] = parseData(
  z.array(socialLinkSchema),
  [
    {
      name: "Instagram",
      icon: "instagram",
      href: "https://www.instagram.com/jagadish_.odedra/",
      angle: 315,
    },
    {
      name: "Twitter",
      icon: "twitter",
      href: "https://twitter.com/jagdishodedara0",
      angle: 25,
    },
    {
      name: "GitHub",
      icon: "github",
      href: "https://github.com/roogeprimodio",
      angle: 95,
    },
    {
      name: "LinkedIn",
      icon: "linkedin",
      href: "https://www.linkedin.com/in/jagdish-odedara-4703532a8/",
      angle: 150,
    },
    {
      name: "Telegram",
      icon: "telegram",
      href: "https://t.me/R00ge",
      angle: 250,
    },
    {
      name: "Call",
      icon: "phone",
      href: "tel:9773075648",
      angle: 195,
    },
  ],
  "socials.ts",
);

/** GitHub account the public repos live under. Used by the GitHub enrichment. */
export const primaryGithubUser = "roogeprimodio";
