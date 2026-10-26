import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Send,
  Twitter,
  type LucideIcon,
} from "lucide-react";
import type { ComponentProps } from "react";

/**
 * Data files carry icon *keys*, not components — they are imported by server
 * components and functions can't cross the server/client boundary. Every
 * surface that renders a social link (hero orbit, footer, contact channels)
 * resolves keys through this one map so a new network is added in one place.
 */

const RedditIcon = (props: ComponentProps<"svg">) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    {...props}
  >
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87s-7.004-2.176-7.004-4.87c0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.34.34 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12.469c.53 0 .96.43.96.96s-.43.96-.96.96-.96-.43-.96-.96.43-.96.96-.96zm5.5 0c.53 0 .96.43.96.96s-.43.96-.96.96-.96-.43-.96-.96.43-.96.96-.96zM12 15.968c-1.664 0-3.023-.956-3.023-2.131 0-.225.053-.438.147-.636C10.278 13.511 11.166 13.74 12 13.74c.834 0 1.722-.229 2.876-.636.094.198.147.41.147.636 0 1.175-1.359 2.131-3.023 2.131z" />
  </svg>
);

export type IconComponent =
  | LucideIcon
  | ((props: ComponentProps<"svg">) => JSX.Element);

export const SOCIAL_ICONS: Record<string, IconComponent> = {
  instagram: Instagram,
  twitter: Twitter,
  github: Github,
  linkedin: Linkedin,
  reddit: RedditIcon,
  telegram: Send,
  phone: Phone,
  mail: Mail,
};

/** Resolve an icon key; unknown keys fall back to a generic "send" mark. */
export function iconFor(key: string): IconComponent {
  return SOCIAL_ICONS[key] ?? Send;
}
