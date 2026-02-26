# Rebellious Aging Web Application

Rebellious Aging is a Next.js App Router site that helps women 55+ “age boldly, live loudly” through four pillars—Confidence, Style, Health, and Gratitude. The app houses long-form editorial content (blogs, pillar landing pages, nutrition guides), embedded Typeforms, and a Supabase-backed quiz submission flow.

---

## Tech Stack

- **Build tooling:** Next.js 14 App Router (static-first), TypeScript, React 18
- **UI:** Tailwind CSS, shadcn/ui components, Radix Primitives, Framer Motion
- **State & data:** TanStack Query, custom hooks, local data files under `src/data`
- **SEO tooling:** Shared route metadata (`src/data/seoRoutes.ts`), Next Metadata API, structured data helpers, SEO route audit pipeline
- **Backend integrations:** Supabase Edge Function (`supabase/functions/submit-quiz`) + database table `quiz_submissions`, embedded Typeforms for contact/newsletter

---

## Project Structure

```
app/                   # App Router route entries
  page.tsx             # Home
  blog/[postId]/page.tsx etc.

src/
  components/          # Layout, home, pillar, nutrition, ui primitives, seo helpers
  data/                # blogPosts, pillarContent, videoSeries metadata
    seoRoutes.ts       # Canonical metadata per static route
  hooks/               # Scroll, mobile, toast utilities
  lib/                 # SEO helpers, structured data, constants, Facebook helpers
  pages/               # Shared page components reused by App Router
  integrations/        # Supabase typed client
scripts/
  generate-sitemap.ts  # Rebuild `public/sitemap.xml`
  build-search-index.ts # Rebuild `public/search-index.json`
  prerender.tsx        # Verifies SEO metadata coverage (`public/seo-route-audit.json`)
supabase/
  config.toml
  functions/           # Edge functions (submit-quiz)
  migrations/          # SQL migrations for quiz_submissions
```

Additional architectural context lives in `docs/project-overview.md`.
Production readiness details now live in `docs/production-readiness.md`.

Key conventions:

- Use the `@/` alias (configured in `tsconfig.json`) for internal imports.
- Tailwind + shadcn components live under `src/components/ui`.
- Keep generated Supabase files (`src/integrations/supabase/*`) read-only—regenerate via Supabase CLI if credentials change.
- Static-first output is generated under `/out` by `next build` (`output: "export"`).

---

## Core Experience Map

- **Home (`src/pages/Home.tsx`)** – Hero, inline Welcome Banner (no blocking modal), pillar overview, and repeated CTAs that route visitors toward Our Story or pillar pages.
- **Our Story / Movement (`src/pages/Movement.tsx`)** – Narrative, credentials, and the “Why” behind the rebellion, including scroll-triggered timelines.
- **Pillars (`/pillars/:pillarId`)** – Confidence, Style, and Health share a common data model for hero copy, galleries, quizzes, and downloadable checklists, while Gratitude features a custom long-form experience and Health links to the dedicated WFPB Nutrition Guide.
- **Nutrition (`src/pages/Nutrition.tsx`)** – Query-param-driven tabs that cover foundations, benefits, Dr. Esselstyn/Dr. Campbell material, “why & how,” and recipes.
- **Blog (`/blog` + `/blog/:postId`)** – Metadata list plus long-form posts with canonical tags, share actions, and article navigation.
- **Video Series (`src/pages/VideoSeries.tsx`)** – Card grid fed by `src/data/videoSeries.ts`.
- **Community touchpoints** – Welcome Letter, Contact (Typeform embed), Facebook Group, Team, etc.

Use this map when adding new sections so the navigation, voice, and CTAs remain cohesive.

---

## Content Data Reference

| Content type | Location | Purpose |
|--------------|----------|---------|
| Blog metadata | `src/data/blogPosts.ts` | Drives the blog archive, sitemap generation, SEO fields, and article ordering. |
| Blog articles | `src/pages/BlogPost.tsx` | Each post is rendered by `postId` switch logic inside shared article page component. |
| Pillar content | `src/data/pillarContent.ts` | Hero text, gallery images, quiz titles, and checklist links for Confidence/Style/Health. |
| Video episodes | `src/data/videoSeries.ts` | Update YouTube metadata here to refresh the video grid. |
| Site metadata | `src/lib/siteMetadata.ts` | Central place for `baseUrl`, default descriptions, social images, and social profile links. |
| JSON-LD builders | `src/lib/structuredData.ts` | Generates Organization, WebSite, Article, and FAQ schema objects. |
| Route SEO config | `src/data/seoRoutes.ts` | Canonical metadata for static routes, aligned with App Router route files. |
| Facebook group link/logic | `src/lib/facebook.ts` + `src/lib/constants.ts` | Keeps outbound navigation consistent (open in new tab + fallback toast). |

After editing these files, rerun:

- `npm run sitemap`
- `npm run build:search`
- `npm run build`

to keep generated assets and metadata aligned.

---

## Getting Started

```bash
npm install

npm run dev      # start Next.js dev server on http://localhost:3000
npm run lint     # TypeScript + React linting via eslint.config.js
npm run sitemap  # regenerate public/sitemap.xml from routes + blog posts
npm run build:search # regenerate public/search-index.json
npm run build    # sitemap + search index + static export + SEO route audit
npm run preview  # serve exported output locally on port 4173
```

Environment variables (create `.env`):

```bash
NEXT_PUBLIC_SUPABASE_URL=<public-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
NEXT_PUBLIC_APP_VERSION=<optional-build-version-for-search-index-cache-busting>
NEXT_PUBLIC_ENABLE_ANALYTICS=true|false
NEXT_PUBLIC_GA_ID=<optional-ga-id>
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=<google-site-verification-token>
NEXT_PUBLIC_HOTJAR_ID=<optional-hotjar-id>
NEXT_PUBLIC_ENABLE_GPTENGINEER=true|false
```

For rollout compatibility, the app also reads legacy keys:

```bash
VITE_SUPABASE_URL=<legacy-public-url>
VITE_SUPABASE_ANON_KEY=<legacy-anon-key>
VITE_APP_VERSION=<legacy-build-version>
```

The Supabase Edge function expects `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to be available when deployed via the Supabase CLI.

---

## Migration, Hosting, and Ownership

This repository is now the primary source of truth for the live site:

- Repository: https://github.com/enzo-prism/rebellious-aging
- Production site: https://rebelwithsuz.com
- Vercel project: `ra-nextjs` (team `enzo-design-prisms-projects`)
- Retired legacy repo: https://github.com/enzo-prism/age-boldly-vibrantly

Current deployment model:

- Git branch `main` is the source branch for Vercel production.
- Production and preview builds inherit environment variables for:
  - `NEXT_PUBLIC_ENABLE_ANALYTICS`
  - `NEXT_PUBLIC_GA_ID`
  - `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (required for Search Console verification metadata)
  - `NEXT_PUBLIC_HOTJAR_ID` (optional)
- Keep this list current whenever you move analytics integrations forward.

If you change any of those values in Vercel, re-run a production deploy.

Verification commands with GitHub + Vercel CLIs:

```bash
gh repo view enzo-prism/rebellious-aging --json name,owner,url,description,homepageUrl
gh repo view enzo-prism/age-boldly-vibrantly --json isArchived,url,defaultBranchRef
vercel whoami
vercel project ls --scope enzo-design-prisms-projects --format json
vercel env ls
```

Recommended setup commands:

```bash
vercel link
vercel git connect --scope enzo-design-prisms-projects
vercel env add NEXT_PUBLIC_ENABLE_ANALYTICS
vercel env add NEXT_PUBLIC_GA_ID
vercel env add NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
vercel env add NEXT_PUBLIC_HOTJAR_ID
vercel --prod --yes --scope enzo-design-prisms-projects
```

### Google Analytics + Search Console Configuration

Recommended flow for production:

1. Set `NEXT_PUBLIC_ENABLE_ANALYTICS=true` and `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX` in production.
2. Add `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` with the Search Console meta token.
3. Optional: keep `NEXT_PUBLIC_HOTJAR_ID` set for session maps.
4. In Vercel, save these in the Production environment and remove any stale previews if not needed.
3. Verify the production domain in Search Console and submit:
   - https://rebelwithsuz.com/sitemap.xml
   - https://rebelwithsuz.com/robots.txt
4. In Search Console URL Inspection, confirm top URLs show `IndexingState: INDEXING_ALLOWED` and `Coverage` is not blocked by crawl issues.
5. Validate that all noindex routes (`/search`, `/404`, app-level not-found) are listed as intentionally unindexed in coverage.

### Modern SEO + Search Engine Operating Checklist (Google-first, Vercel-friendly)

- Core signals to keep healthy:
  - Unique `title` + `description` per indexable route.
  - Canonical URL consistency between `buildMetadata`, `app/sitemap.ts`, `scripts/generate-sitemap.ts`, and `sitemap.xml`.
  - Explicit `noindex, nofollow` for low-value or duplicate pages (`/search`, `/404`, legacy misses).
  - Clean robots directives with no unsupported patterns.
  - JSON-LD only where meaningful and valid; page-level Open Graph/Twitter images must resolve to absolute HTTPS.
  - Single canonical host (`https://rebelwithsuz.com`).
- Deployment + Search Console rhythm:
  - Every content/metadata change: `npm run build` (or `npm run sitemap` + `npm run build:search` + `npm run prerender`).
  - After deploy: refresh and inspect:
    - `Coverage` for crawl/index errors.
    - `Sitemaps` for last crawl status.
    - Core URL performance in Search Console's URL Inspection.
  - Monthly: audit titles/descriptions for clarity, intent-match, and length drift.

---

## Blog Management

Blog content is managed in two places:

1. **Metadata list:** `src/data/blogPosts.ts`
   - Add a new object with `id`, `title`, `excerpt`, `date`, `readTime`, `blogNumber`, and optional `seoDescription`.
   - `blogNumber` is the source of truth for ordering and prev/next resolution. Keep IDs and blog numbers aligned with the reference content source so archive order stays stable across deployments.
2. **Long-form article:** `src/pages/BlogPost.tsx`
   - Add or update an `if (postId === '<slug>')` block.
   - Keep `<BlogPostFooter>` and share metadata parity intact.

Deployment note:
- Production URL: https://rebelwithsuz.com
- Source-of-truth reference for content parity: https://github.com/enzo-prism/rebellious-aging

After editing blog content, run:

```bash
npm run sitemap
npm run build:search
npm run build
```

`npm run build` also triggers an SEO route audit (`public/seo-route-audit.json`) to verify route metadata coverage.

---

## Forms, Quizzes & Integrations

- **Quiz submission:** `src/components/pillar/QuizSection.tsx` posts to `supabase/functions/submit-quiz/index.ts`.
- **Typeforms:** Contact, newsletter, and quiz fallback embeds load Typeform’s `embed.js` lazily.
- **Facebook CTA:** Use helper utilities in `src/lib/facebook.ts` for consistent popup + fallback behavior for group links.

---

## SEO Workflow

- Site-wide defaults live in `src/lib/siteMetadata.ts`; keep social profile values current.
- Route SEO data lives in `src/data/seoRoutes.ts` and should be kept in sync with App Router routes.
- JSON-LD is emitted through page-level metadata helpers (`buildMetadata`) and optional schema helpers in `src/lib/nextMetadata.ts` / `src/components/seo/Seo.tsx`.
- `scripts/prerender.tsx` runs during build as a validation step and writes route audit output to `public/seo-route-audit.json`.
- Search and discovery pipeline runs `npm run build:search` → `public/search-index.json`.
- `app/robots.ts` now drives crawler rules and sitemap reference (`/sitemap.xml`) via Next.js file conventions.
- `src/data/seoRoutes.ts` supports explicit `noindex` route entries (for low-value routes like search/404).
- Keep titles concise and distinct per page (target ~50–60 visible characters where possible) and keep descriptions accurate, unique, and user-oriented.
- Canonical behavior is controlled from `buildMetadata` and route definitions; use 301 redirects for moved pages and keep one canonical destination.

### Indexing sequence recommended for Google

1. Keep route metadata and canonical values aligned between:
   - `app/layout.tsx` (`metadataBase`, social defaults, verification)
   - `src/lib/nextMetadata.ts` (`alternates.canonical` + robots directives)
   - `app/sitemap.ts` + `scripts/generate-sitemap.ts` (discovery)
2. Run:
   - `npm run sitemap`
   - `npm run build:search`
   - `npm run build`
   - `npm run prerender`
3. Verify the updated sitemap and URL-level indexing in Search Console:
   - Add/refresh `https://rebelwithsuz.com/sitemap.xml` in the Sitemaps report.
   - Use URL Inspection for priority pages and confirm Google can access them (`IndexingState: INDEXING_ALLOWED`).
   - Compare sitemap coverage against index status and fix exclusions (noindex/blocked/duplicate canonical issues).

4. Keep crawler/preview hygiene in place:
   - Keep canonical host aligned to `https://rebelwithsuz.com` in `buildMetadata`.
   - Keep low-value pages explicitly marked `noindex` in `src/data/seoRoutes.ts` and `app/search/page.tsx`.
   - Use `app/robots.ts` and robots declarations to prevent accidental crawler paths.

## Production Readiness and Launch Protocol

This project now includes a readiness pipeline that validates functional, SEO, accessibility, and performance gates before release.

- Generate and verify release assets:
  - `npm run readiness:assets`
  - `npm run readiness:report`
- Run full readiness pass:
  - `npm run readiness:verify`
- If needed, run focused suites:
  - `npm run test:unit`
  - `npm run test:e2e`
  - `npm run test:readiness`
  - `npm run test:accessibility`
  - `npm run test:e2e:perf`
- Final artifacts for audit are written to:
  - `public/sitemap.xml`
  - `public/search-index.json`
  - `public/seo-route-audit.json`
  - `public/production-readiness-report.json`

Baseline launch checklist:
- `npm run lint` passes.
- `npm run build` (sitemap + search index + static build + SEO prerender audit) passes.
- Search, accessibility, route matrix, resilience, and performance checks pass under `test:e2e:readiness`.
- `public/production-readiness-report.json` is green.
- No open critical-severity issues in recent readiness runs.

## Performance & Embed Guardrails

- Home now uses inline welcome patterns instead of auto-opening modals; avoid blocking interstitials.
- Embeds are lazy by default:
  - Contact Typeform loads on user interaction.
  - Pillar quizzes load on interaction + intersection.
  - Video cards use placeholder thumbnails before mounting YouTube iframes.
- Add new third-party scripts behind user intent and avoid broad global loading in `layout`.

---

## Deployment

1. `npm run build` — runs sitemap, search index, Next static export, and SEO audit.
2. Deploy `/out` to Vercel (static output) and keep redirects/headers in `next.config.js`.

Supabase function (`submit-quiz`) can be deployed with:

```bash
supabase functions deploy submit-quiz
```

Ensure `supabase/config.toml` matches the project you deploy to.

---

## Contributing Tips

- Follow existing formatting (2-space indentation, semicolons on TypeScript files).
- Keep lint/build clean (`npm run lint`, `npm run build`) before opening a PR.
- Document any new scripts, routes, or migration-sensitive behavior in this README.

Happy building.
