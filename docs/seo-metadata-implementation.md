# SEO Metadata Implementation

Last reviewed: 2026-03-07.

This document describes how title tags, meta descriptions, canonicals, robots rules, and SEO validation actually work in the current codebase.

## Source of truth

- Static route metadata lives in `src/data/seoRoutes.ts`.
- Dynamic blog metadata lives in `src/data/blogPosts.ts`.
- Dynamic recipe metadata lives in `src/data/recipes.ts`.
- Shared site defaults live in `src/lib/siteMetadata.ts`.

## Title tag policy

- Homepage: `rebelwithsuz.com`
- Static pages: short page labels only, for example `Blog`, `Welcome Letter`, `Nutrition`, `Search`
- Blog posts: the post title only
- Recipes: the recipe title only
- No global site-name suffix is appended to page titles

This is enforced by:

- `app/layout.tsx` using a plain default title instead of a title template
- `src/lib/seo.ts` returning the page title directly from `buildSeoTitle()`
- route-level `generateMetadata()` functions calling `buildMetadata()` with short route titles

## Meta description policy

- Static page descriptions come from `src/data/seoRoutes.ts`.
- Blog post descriptions prefer `seoDescription`, then fall back to `excerpt`.
- Recipe descriptions come from recipe content data.
- All descriptions are normalized through `buildMetaDescription()` in `src/lib/seo.ts`.
- `buildMetaDescription()` trims values and truncates them to 155 characters when needed.

## Rendering flow

1. `app/layout.tsx` defines global metadata defaults like `metadataBase`, social defaults, icons, and verification tags.
2. Each route's `generateMetadata()` resolves route-specific metadata.
3. `src/lib/nextMetadata.ts` converts that metadata into Next.js `Metadata`:
   - `title`
   - `description`
   - canonical alternates
   - robots directives
   - Open Graph
   - Twitter cards
4. `next build` emits the final `<title>` and `<meta>` tags into the exported HTML under `out/`.

## Important caveat: `Seo.tsx`

`src/components/seo/Seo.tsx` is not the source of the route-level title tags or meta descriptions anymore.

Current role:

- JSON-LD injection
- legacy non-route SEO support where needed

Do not rely on `<Seo title="..." description="...">` to drive the document title for App Router pages. Route-level metadata should be changed through `generateMetadata()`, `src/data/seoRoutes.ts`, and the dynamic metadata helpers instead.

## Important caveat: `npm run prerender`

Despite the name, `scripts/prerender.tsx` does not rewrite exported HTML.

Current role:

- audits metadata coverage across expected routes
- writes `public/seo-route-audit.json`
- fails the build if required metadata is missing

The actual HTML title tags and meta descriptions come from `next build`, not from the prerender script.

## Important caveat: redirects in static export

For this project, `next.config.js` is not the source of truth for production HTTP redirects when `output: 'export'` is enabled.

Current redirect model:

- Production HTTP redirects that must return a real `3xx` status on Vercel are defined in `vercel.json`.
- App Router redirect pages such as `app/pillars/longevity/page.tsx` are still useful as in-app or runtime fallbacks.

If a legacy URL matters for SEO or backlinks, verify the live HTTP status with a request tool after deploy instead of assuming the framework config handled it.

## Current verification workflow

For any SEO or content change, run:

```bash
npm run lint
npm run build
```

If you want extra confidence, also spot-check representative files in `out/`, for example:

- `out/index.html`
- `out/blog.html`
- `out/welcome-letter.html`
- `out/search.html`
- one blog detail page
- one recipe detail page

## Editing checklist

When changing metadata behavior:

1. Update the route metadata source:
   - `src/data/seoRoutes.ts` for static pages
   - `src/data/blogPosts.ts` for blog metadata
   - route-level dynamic metadata helpers for dynamic pages
2. Keep title labels short and direct unless there is a strong reason not to.
3. Rebuild generated assets with `npm run build`.
4. Confirm `public/seo-route-audit.json` still reports zero failed routes.
5. Update docs if the metadata behavior or command semantics changed.
