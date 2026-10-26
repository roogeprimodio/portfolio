import type { SVGProps } from "react";

/**
 * Brand marks for the app-store buttons. Inline SVG, `currentColor` so they
 * take the button's text colour in both themes. Decorative: the parent link
 * carries the accessible label.
 */

export function GooglePlayIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M3.6 1.8a1.4 1.4 0 0 0-.6 1.2v18a1.4 1.4 0 0 0 .6 1.2l10-10.2L3.6 1.8Z" />
      <path d="M17.2 8.4 5.3 1.5 14.5 12l2.7-3.6Z" opacity={0.85} />
      <path d="M17.2 15.6 14.5 12l-9.2 10.5 11.9-6.9Z" opacity={0.85} />
      <path d="m20.9 10.5-3.7-2.1-3 3.6 3 3.6 3.7-2.1a1.5 1.5 0 0 0 0-3Z" opacity={0.7} />
    </svg>
  );
}

export function AppStoreIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M16.4 12.7c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.8 1.3 10.3.9 1.3 1.9 2.7 3.2 2.6 1.3 0 1.8-.8 3.4-.8s2 .8 3.4.8c1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9 0 0-2.8-1.1-2.8-4.2ZM13.9 5.1c.7-.9 1.2-2.1 1-3.3-1 0-2.3.7-3 1.6-.7.8-1.2 2-1.1 3.2 1.2.1 2.3-.6 3.1-1.5Z" />
    </svg>
  );
}
