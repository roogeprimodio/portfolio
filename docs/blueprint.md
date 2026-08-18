# Design brief

The original brief in this file described a different site — "FolioFlow", a
light lavender page with indigo and fuchsia accents in Playfair and PT Sans.
None of that survived. This is what the site actually is.

## Concept

A dark, terminal-adjacent portfolio framed as an archive. Sections are labelled
as if they were records in a system — "Personal Datastream", "Hibernation
Vault", "Skills DNA", "Establish Link" — and projects are "specimens". The
framing is consistent enough to read as deliberate rather than decorative.

## Palette

Defined as HSL custom properties in [`src/app/globals.css`](../src/app/globals.css).

| Token | Value | Use |
|---|---|---|
| `--background` | `240 50% 4%` | near-black navy page ground |
| `--card` | `240 40% 8%` | panels, raised surfaces |
| `--primary` | `210 60% 96%` | headings, portrait ring |
| `--accent` | `210 60% 96%` | interactive elements, labels, borders |
| `--muted-foreground` | — | body copy |

Depth comes from opacity and glow rather than hue: translucent cards
(`bg-card/50`) over a fixed dot-grid background, hairline borders at
`border-accent/20`, and `text-shadow` halos on headings. Dark mode is the only
mode — `<html>` is hard-set to `dark`.

## Type

Self-hosted through `next/font` in [`src/app/layout.tsx`](../src/app/layout.tsx),
exposed as CSS variables and mapped in `tailwind.config.ts`.

| Role | Family | Where |
|---|---|---|
| `font-headline` | Cinzel | section titles, project names, wide uppercase tracking |
| `font-body` | Raleway | paragraphs |
| `font-code` | Source Code Pro | labels, metadata, badges, form fields |

The monospace face carries most of the character — it is used for UI chrome, not
just for code.

## Layout

- **Homepage** — one page, five sections, fixed side-nav rail on `md`+ with
  scroll-spy. Full-screen hero with an availability pill and social icons
  orbiting the portrait.
- **`/projects`** — full archive with search, category chips and AND-combined
  tag filters.
- **`/projects/[slug]`** — adapts to content volume. A project with a cover
  image or a long write-up gets a two-column layout with a metadata rail; a
  short one gets a single column with a horizontal metadata strip, so there is
  never a dead column beside thin content.

## Motion

Framer Motion throughout, kept subtle: word-staggered hero text, scroll-reveal
on cards, spring transitions on the nav indicator, floating social icons.

The full-screen opening sequence plays **once per browser session**, not on
every load, and is skipped entirely under `prefers-reduced-motion`. A repeat
three-second gate costs more in bounces than it earns in impression.

## Content model

Nothing is hardcoded in components. Everything renders from
[`src/data`](../src/data), validated by Zod at build time. See the README for
the schema and for how `visibility` controls whether a repository is linked.
