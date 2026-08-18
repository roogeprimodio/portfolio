# Portfolio

Next.js 15 (App Router) portfolio. All content is data-driven — adding or
editing a project never requires touching a component.

## Adding a project

Append one object to [`src/data/projects.ts`](src/data/projects.ts) and commit.
The homepage grid, `/projects` (with tag/category filters and search),
`/projects/[slug]`, the sitemap and the tag list all derive from that array.

The schema in [`src/data/schema.ts`](src/data/schema.ts) validates at build
time, so a bad slug, a duplicate, or a repo attached to a private project fails
the build rather than shipping.

### `visibility`

| Value | Meaning | Repo link | GitHub stats |
|---|---|---|---|
| `public` | source is public on an account you control | shown | fetched |
| `private` | repo is private; a live demo may still exist | hidden | none |
| `other-account` | built under a collaborator's account | hidden | none |
| `client` | client / NDA work | hidden | none |

`repo` may only be set when `visibility` is `"public"` — enforced by the schema,
so a private repo can't leak into the markup by accident.

## GitHub enrichment

[`src/lib/github.ts`](src/lib/github.ts) fetches stars, forks and primary
language for `public` projects only, revalidating daily. Every failure path
returns `null` and falls back to the static data — a rate-limited or offline
GitHub never breaks a build. Set `GITHUB_TOKEN` to raise the 60/hour
unauthenticated limit.

The API is **enrichment, not a source**. Private, client and other-account
projects can't be discovered from it, which is why the data file is canonical.

## Layout

```
src/
  app/          routes: /, /projects, /projects/[slug], sitemap, robots
  data/         content + zod schemas — the only files you edit to add work
  lib/          github.ts (server-only), project-view.ts (client-safe), site.ts
  components/
    sections/   homepage sections
    projects/   card, filterable grid
    layout/     side nav, footer, intro animation
    ui/         shadcn primitives
```

### Case studies

`caseStudy` is optional per project. When present, the detail page renders
metrics, problem / approach / outcome sections and a "what was hard" list:

```ts
caseStudy: {
  metrics: [{ label: "Load time", value: "1.2s" }],
  problem: ["..."],
  approach: ["..."],
  outcome: ["..."],
  challenges: ["..."],
},
```

Worth filling in for the two or three projects you actually want to be found
for — it is the strongest SEO and recruiter surface on the site.

## SEO

Generated automatically, no per-page work:

- `sitemap.xml` and `robots.txt` covering every project route
- canonical URLs and per-project `title` / `description`
- Open Graph + Twitter cards, with a branded 1200×630 image for the site
  (`opengraph-image.tsx`) and a distinct one per project
- JSON-LD in [`src/lib/json-ld.ts`](src/lib/json-ld.ts): `Person` (with `sameAs`
  linking your socials), `WebSite`, `CreativeWork` per project, `ItemList` on
  the index, and `BreadcrumbList` on nested pages
- `manifest.webmanifest`

### Search Console

1. Set `NEXT_PUBLIC_SITE_URL` and deploy.
2. Add the property at <https://search.google.com/search-console>.
3. Choose the "HTML tag" method, copy the `content` value into
   `GOOGLE_SITE_VERIFICATION`, redeploy, then verify.
4. Submit `https://<your-domain>/sitemap.xml` under Sitemaps.

## Analytics

Cloudflare Web Analytics — free, unlimited, cookieless, so no consent banner is
needed and it works on any host. Set `NEXT_PUBLIC_CF_BEACON_TOKEN`; the script
is omitted entirely when unset, so local runs and previews stay out of the data.

## Environment

Copy `.env.example` to `.env.local`.

`NEXT_PUBLIC_SITE_URL` sets the canonical origin. On Vercel it can stay unset —
[`src/lib/site.ts`](src/lib/site.ts) falls back to `VERCEL_PROJECT_PRODUCTION_URL`
(the stable `*.vercel.app` domain Vercel injects), so the sitemap and OG tags
are correct out of the box. Set it explicitly when you move to a custom domain.

Note it deliberately prefers `VERCEL_PROJECT_PRODUCTION_URL` over `VERCEL_URL`:
the latter is the per-deployment host and changes on every push, which would
point each deploy's canonicals at a different URL.

The contact form needs `RESEND_API_KEY`, `EMAIL_TO`, and `RESEND_FROM` on a
domain verified in Resend — the default `onboarding@resend.dev` sender only
delivers to the Resend account owner.

## Scripts

```bash
npm run dev        # localhost:9002
npm run build
npm run typecheck
npm run lint
```

`typecheck` and `lint` must pass — build errors are no longer suppressed in
`next.config.ts`.
