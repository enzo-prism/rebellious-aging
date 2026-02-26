# SEO Best Practices for This Project (Next.js + Vercel, Google-first)

Last reviewed: 2026-02-26.

This project is a static-exported Next.js App Router site. SEO should be treated as a build-time artifact quality system, not a one-time page-level task.

## 1) URL, metadata, and crawl signals

- Keep one canonical host: `https://rebelwithsuz.com`.
- Every indexable route should have:
  - A unique title (`<title>`, via `buildMetadata` / `title` in route metadata).
  - A unique description (`<meta name="description">`) and avoid duplicated summaries.
  - A canonical URL resolved to the final HTTPS route.
  - Open Graph and Twitter card fields populated consistently.
- Keep `robots.txt` explicit and minimal:
  - Block only private/admin areas you truly want hidden.
  - Do not rely on unsupported regex-like entries in broad bots lists.
- Ensure `sitemap.xml` includes all indexable routes from:
  - `src/data/seoRoutes.ts` (excluding `noindex: true`)
  - `blogPosts`
  - recipe pages
- Keep `noindex` pages intentional:
  - `/search`
  - `/404`
  - custom app-level 404/not-found paths

## 2) Metadata system checks in this repository

- Route metadata source of truth: `src/data/seoRoutes.ts`
- Build-time metadata composer: `src/lib/nextMetadata.ts`
- Route-driven metadata coverage check: `scripts/prerender.tsx`
- Runtime sitemap: `app/sitemap.ts`
- Generated sitemap artifact: `scripts/generate-sitemap.ts` -> `public/sitemap.xml`
- SEO audit output: `public/seo-route-audit.json`

Current hardening already in place:
- `noindex` pages return crawler-restricted metadata (`index: false, follow: false`).
- `app/not-found.tsx` and `app/404/page.tsx` enforce noindex behavior.
- Search index generation and readiness checks are part of CI scripts.

## 3) Google Search Console setup (required operational loop)

1. Verify property ownership for `https://rebelwithsuz.com` in Search Console.
2. Keep `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` set in Vercel Production env.
3. Submit:
   - `https://rebelwithsuz.com/sitemap.xml`
   - `https://rebelwithsuz.com/robots.txt`
4. Validate top-priority pages with URL Inspection and confirm:
   - `Coverage` allows indexing when intended.
   - No index blocking from canonical mismatch or noindex errors.
5. Track manual actions, core indexing, and crawl anomalies weekly until stable.

## 4) Google Analytics + behavior instrumentation

- Keep tracking gated behind `NEXT_PUBLIC_ENABLE_ANALYTICS`.
- Set `NEXT_PUBLIC_GA_ID=G-...` in Production.
- Confirm tags load only on final rendered routes (no missing script errors).
- Track:
  - organic landing page composition
  - average time on first-scroll and scroll depth
  - search click-through patterns (for high intent pages: /nutrition, /pillars, /blog posts)

## 5) Content quality rules (most important for ranking over time)

- Match search intent: titles should reflect the exact promise of the page.
- Prefer one primary intent per page.
- Keep description concise and compelling (typically 120–160 characters, no keyword stuffing).
- For recipes/blogs:
  - Ensure each has strong heading structure and enough semantic context.
  - Use clear internal links to related pillars and guide pages.
  - Avoid duplicate opening/summary copy from page title/description.

## 6) Deployment sequence for SEO-safe releases

Use this command chain for every SEO/content change:

```bash
npm run sitemap
npm run build:search
npm run build
vercel --prod --yes
```

After deploy:

1. Verify `https://rebelwithsuz.com/sitemap.xml` returns 200 and includes changed routes.
2. In Search Console, request indexing only when needed for major rewrites.
3. Confirm `robots.txt` still includes the sitemap URL and only intended disallow rules.

## 7) CLI verification runbook (repo + deployment ownership)

```bash
gh repo view enzo-prism/rebellious-aging --json url,description,homepageUrl,defaultBranchRef
gh repo view enzo-prism/age-boldly-vibrantly --json isArchived,url,description
vercel whoami
vercel project ls --scope enzo-design-prisms-projects --format json
vercel env ls
```

Use this file as the starting checklist before each release and after any migration change.
