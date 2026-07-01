# Rebellious Aging Web Application

Rebellious Aging is a Next.js App Router site that helps women 55+ “age boldly, live loudly” through four pillars—Confidence, Style, Health, and Gratitude. The app houses long-form editorial content (blogs, pillar landing pages, nutrition guides), embedded Typeforms, and a Supabase-backed quiz submission flow.

---

## Tech Stack

- **Build tooling:** Next.js 14 App Router (static-first), TypeScript, React 18
- **UI:** Tailwind CSS, shadcn/ui components, Radix Primitives, Framer Motion
- **State & data:** TanStack Query, custom hooks, local data files under `src/data`
- **SEO tooling:** Shared route metadata (`src/data/seoRoutes.ts`), Next Metadata API, structured data helpers, minimal title-tag policy, SEO route audit pipeline
- **Backend integrations:** Supabase Edge Function (`supabase/functions/submit-quiz`) + database table `quiz_submissions`, embedded Typeforms for contact/newsletter

---

## Project Structure

```
app/                   # App Router route entries
  page.tsx             # Home
  blog/[postId]/page.tsx etc.

src/
  components/          # Layout, home, pillar, nutrition, ui primitives, seo helpers
  data/                # blogPosts, blogPostContent, blogPostCtas, blogSeo,
                       #   pillarContent, recipes, guides, speakingEvents,
                       #   communityEvents, videoSeries, nutritionTabs, etc.
    seoRoutes.ts       # Canonical metadata per static route
  hooks/               # Scroll, mobile, toast utilities
  lib/                 # SEO helpers (routeMetadata, nextMetadata, structuredData), constants, Facebook helpers
  views/               # Shared page components reused by App Router
  integrations/        # Supabase typed client
app/
  sitemap.ts           # Native Next MetadataRoute.Sitemap → out/sitemap.xml (the LIVE sitemap)
  robots.ts            # Native robots.txt
scripts/
  generate-llms.ts     # Rebuild `public/llms.txt` (runs first in `npm run build`)
  generate-sitemap.ts  # Rebuild `public/sitemap.xml` (build artifact; see app/sitemap.ts note)
  build-search-index.ts # Rebuild `public/search-index.json`
  prerender.tsx        # Audits SEO metadata coverage (`public/seo-route-audit.json`)
  production-readiness.ts # Writes `public/production-readiness-report.json`
supabase/
  config.toml
  functions/           # Edge functions (submit-quiz)
  migrations/          # SQL migrations for quiz_submissions
```

Additional architectural context lives in `docs/project-overview.md`.
Production readiness details now live in `docs/production-readiness.md`.
Metadata implementation details live in `docs/seo-metadata-implementation.md`.

Key conventions:

- Use the `@/` alias (configured in `tsconfig.json`) for internal imports.
- Tailwind + shadcn components live under `src/components/ui`.
- Keep generated Supabase files (`src/integrations/supabase/*`) read-only—regenerate via Supabase CLI if credentials change.
- Static-first output is generated under `/out` by `next build` (`output: "export"`).

---

## Core Experience Map

- **Home (`src/views/Home.tsx`)** – Hero, inline Welcome Banner (no blocking modal), pillar overview, and repeated CTAs that route visitors toward Our Story or pillar pages.
- **Our Story / Movement (`src/views/Movement.tsx`)** – Narrative, credentials, and the “Why” behind the rebellion, including scroll-triggered timelines.
- **Pillars (`/pillars/:pillarId`)** – Confidence, Style, and Health share a common data model for hero copy, galleries, quizzes, and downloadable checklists, while Gratitude features a custom long-form experience and Health links to the dedicated WFPB Nutrition Guide.
- **Nutrition (`src/views/Nutrition.tsx`)** – Query-param-driven tabs that cover foundations, benefits, Dr. Esselstyn/Dr. Campbell material, “why & how,” and recipes.
- **Blog (`/blog` + `/blog/:postId`)** – Metadata list plus long-form posts with canonical tags, share actions, and article navigation.
- **Recipes (`/recipes` + `/recipes/:slug`)** – Plant-based recipe archive (`src/data/recipes.ts`) with individual recipe detail pages (`src/views/RecipeDetail.tsx`), plus the curated **Better Summer Recipes** page (`/recipes-for-a-better-summer`).
- **Free Booklets & Guides (`/guides` + `/guides/:slug`)** – The free plant-based booklets Suz recommends (Esselstyn jumpstart, Campbell WFPB guide, and Suz's one-page starter), driven by `src/data/guides.ts` (`src/views/Guides.tsx` / `GuideDetail.tsx`). Each has its own shareable page and is surfaced in nav, on-site search, sitemap, and `llms.txt`.
- **Health sub-guides** – **Nutrition Guide** (`/pillars/health/nutrition-guide`, printable WFPB roadmap) and **Resource Guide** (`/pillars/health/resource-guide`, curated documentary/book/cookbook library).
- **The Talk (`/the-talk`, `src/views/TheTalk.tsx`)** – "Be the CEO of Your Own Health" video talk plus the free guides, books, and documentaries Suz shares.
- **Events** – **Community Events** (`/events`, live Zoom gatherings from `src/data/communityEvents.ts`) and **Speaking Events** (`/speaking-events` + `/speaking-events/:slug`, `src/data/speakingEvents.ts`).
- **Editorial** – **Dr. Seuss & Aging** (`/dr-seuss`) and **Starter Kit** (`/starter-kit`).
- **Search (`/search`)** – Client-side search over `public/search-index.json` (marked `noindex`).
- **Video Series (`src/views/VideoSeries.tsx`)** – Card grid fed by `src/data/videoSeries.ts`.
- **Community touchpoints** – Welcome Letter, Contact (Typeform embed), Facebook Group, Team, etc.
- **Global navigation (`src/components/layout/Header.tsx` / `Footer.tsx`)** – Primary nav is Home, Blog, Recipes, **Free Guides** (`/guides`), Facebook Group, and a **More** dropdown grouped into Discover, Pillars, and Nutrition (WFPB). The footer's Health column also links Free Booklets & Guides, Nutrition Guide, and Resource Guide.
- **Page sharing (`src/components/share/*`)** – Public pages now use a shared top-of-page share action that opens a copy-link dialog, preserves query params, and falls back to manual copy when clipboard APIs are unavailable.

Use this map when adding new sections so the navigation, voice, and CTAs remain cohesive.

---

## Content Data Reference

| Content type | Location | Purpose |
|--------------|----------|---------|
| Blog metadata | `src/data/blogPosts.ts` | Drives the blog archive, sitemap generation, SEO fields, and article ordering (by `blogNumber`). |
| Blog article bodies | `src/data/blogPostContent.tsx` | `Record<postId, { heading, body }>` looked up via `blogPostContent[postId]` in `src/views/BlogPost.tsx` (no per-post switch statement). |
| Blog CTAs / SEO overrides | `src/data/blogPostCtas.ts`, `src/data/blogSeo.ts` | Per-post Facebook CTA copy and per-post SEO title/description overrides. |
| Pillar content | `src/data/pillarContent.ts` | Hero text, gallery images, quiz titles, and checklist links for Confidence/Style/Health. |
| Recipes | `src/data/recipes.ts` | Recipes powering `/recipes` and `/recipes/:slug`. |
| Free guides | `src/data/guides.ts` | The three free booklets (`Guide` interface) powering `/guides` and `/guides/:slug`. |
| Speaking / community events | `src/data/speakingEvents.ts`, `src/data/communityEvents.ts` | Talks/appearances (`/speaking-events`) and live Zoom gatherings (`/events`). |
| Video episodes | `src/data/videoSeries.ts` | Update YouTube metadata here to refresh the video grid. |
| Site metadata | `src/lib/siteMetadata.ts` | Central place for `baseUrl`, default descriptions, social images, and social profile links. |
| JSON-LD builders | `src/lib/structuredData.ts` | Generates Organization, WebSite, Article, Recipe, and FAQ schema objects (guide pages emit a CreativeWork schema inline). |
| Route SEO config | `src/data/seoRoutes.ts` | Canonical metadata for static routes, resolved via `src/lib/routeMetadata.ts` (`getRouteMetaByPath`) and aligned with App Router route files. |
| Facebook group link/logic | `src/lib/facebook.ts` + `src/lib/constants.ts` | Keeps outbound navigation consistent (open in new tab + fallback toast). |

After editing these files, rerun:

- `npm run sitemap`
- `npm run build:search`
- `npm run build`

to keep generated assets and metadata aligned.

Current title-tag policy:

- Homepage: `Rebellious Aging | Age Boldly, Live Loudly` (from the `/` entry in `seoRoutes.ts`)
- Static routes: concise titles from `seoRoutes.ts` — short labels where possible (`Blog`, `Recipes`, `Welcome Letter`) and descriptive titles where clearer (e.g. `The Talk: Be the CEO of Your Own Health`, `Free Plant-Based Booklets & Guides`)
- Blog and recipe detail routes: the content title only
- No site-name suffix is appended to page titles

---

## Universal Share Button

The site now uses one consistent sharing pattern across public pages.

- Trigger: `src/components/share/PageShareButton.tsx`
- Dialog UI: `src/components/share/PageShareDialog.tsx`
- Layout helper: `src/components/share/PageTopUtilityRow.tsx`

Behavior contract:

- The copied link always comes from `window.location.href`, not static metadata.
- Query-string state is preserved for routes like `/nutrition?tab=benefits` and `/search?q=...`.
- The dialog uses `document.title` only for descriptive copy.
- If `navigator.clipboard.writeText` fails or is unavailable, the URL is auto-selected and the dialog explains manual copy.
- Share controls live in page shells and hero blocks, never in the global header and never on 404 pages.

Verification coverage:

- `tests/unit/components/PageShareButton.test.tsx` covers open/close behavior, clipboard success, and manual fallback.
- `tests/e2e/share-button.spec.ts` verifies exact live-URL copying, including query params.
- `tests/e2e/route-matrix.spec.ts` asserts the share button is present on public routes and absent on 404 routes.
- `tests/e2e/accessibility.spec.ts` runs an axe smoke check on the open share dialog.

---

## Getting Started

```bash
npm install

npm run dev      # start Next.js dev server on http://localhost:3000
npm run lint     # TypeScript + React linting via eslint.config.js
npm run llms     # regenerate public/llms.txt (LLM crawler guide)
npm run sitemap  # regenerate public/sitemap.xml (build artifact; app/sitemap.ts ships the live one)
npm run build:search # regenerate public/search-index.json
npm run build    # llms + sitemap + search index + static export + SEO route audit
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

Vercel Web Analytics does not require an environment variable. It is enabled from the Vercel project dashboard and injected by `@vercel/analytics` in [`app/layout.tsx`](/Users/enzo/ra-nextjs/app/layout.tsx).

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
- Current migration + verification runbook: `docs/migration-and-google-operations-2026.md`

Current deployment model:

- Git branch `main` is the source branch for Vercel production.
- Vercel Web Analytics is wired through [`app/layout.tsx`](/Users/enzo/ra-nextjs/app/layout.tsx) via `@vercel/analytics`; the dashboard toggle must stay enabled for the Vercel project.
- Legacy production redirects that need true HTTP status codes are defined in [`vercel.json`](/Users/enzo/ra-nextjs/vercel.json), not `next.config.js`, because this app ships as a static export.
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

Post-deploy verification snapshot (Feb 26, 2026):

```text
- `gh repo view enzo-prism/rebellious-aging` confirms active source-of-truth repo
- `gh repo view enzo-prism/age-boldly-vibrantly` confirms legacy repo is still reachable
- `vercel env ls` shows production GA vars are present
- `vercel aliases ls --scope enzo-design-prisms-projects` shows rebelwithsuz.com points to ra-nextjs
```

Latest content release snapshot (Jul 1, 2026):

```text
- Blogs #75–#78 (the "superpower" series: `How Do You Discover Your Superpower?`, `The Problem With Superpowers`, `Do Superpowers Change?`, `The Superpower Epilogue`) are all public and indexable.
- No blog post is currently password-gated. The gate infrastructure (`gated`/`releaseDate` fields, `BlogPasswordGate`) remains in the codebase but is inactive because no post sets `gated: true`.
- Free Booklets & Guides launched: `/guides` hub plus `/guides/:slug` detail pages for the Esselstyn jumpstart booklet, the T. Colin Campbell Center for Nutrition Studies guide, and Suz's one-page starter (see `src/data/guides.ts`).
- Suz email-derived blog mirrors `The Accidental Blogger` and `The Class You Cannot Take` are present in the repo, sitemap, search index, and production.
- Release verification used `npm run lint`, `npm run test:unit`, `npm run build`, production deploy, and live readbacks for the updated URLs plus sitemap/search index.
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

### Vercel Analytics + Google Analytics + Search Console Configuration

Recommended flow for production:

1. Enable Web Analytics in the Vercel project settings so the installed `@vercel/analytics` package can report traffic.
2. Set `NEXT_PUBLIC_ENABLE_ANALYTICS=true` and `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX` in production if GA4 should continue loading alongside Vercel Analytics.
3. Add `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` with the Search Console meta token.
4. Optional: keep `NEXT_PUBLIC_HOTJAR_ID` set for session maps.
5. In Vercel, save these in the Production environment and remove any stale previews if not needed.
6. Verify the production domain in Search Console and submit:
   - https://rebelwithsuz.com/sitemap.xml
   - https://rebelwithsuz.com/robots.txt
7. In Search Console URL Inspection, confirm top URLs show `IndexingState: INDEXING_ALLOWED` and `Coverage` is not blocked by crawl issues.
8. Validate that all noindex routes (`/search`, `/404`, app-level not-found) are listed as intentionally unindexed in coverage.

### Modern SEO + Search Engine Operating Checklist (Google-first, Vercel-friendly)

- Core signals to keep healthy:
  - Unique `title` + `description` per indexable route.
  - Keep titles short, specific, and uncluttered; avoid adding the site name unless there is a strong reason.
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
2. **Long-form article body:** `src/data/blogPostContent.tsx`
   - Add or update the entry keyed by the post's `id` in the `blogPostContent` record (`{ heading, body }`). `src/views/BlogPost.tsx` renders it via `blogPostContent[postId]`; there is no per-post switch statement.
   - Optionally add a per-post Facebook CTA in `src/data/blogPostCtas.ts` and SEO overrides in `src/data/blogSeo.ts`.
   - `<BlogPostFooter>` and next-post navigation resolve automatically from `blogNumber`.
   - To ship a post as a password-gated preview, set `gated: true` (and optional `releaseDate`) on its `blogPosts.ts` entry; omit them to publish it fully (public, indexed, in sitemap/search).

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
- App Router pages resolve their metadata through `src/lib/routeMetadata.ts` (`getRouteMetaByPath` / `getHomeMeta`), which reads `seoRoutes.ts` and feeds `buildMetadata` in `src/lib/nextMetadata.ts`.
- **Sitemap duality:** `app/sitemap.ts` (native Next `MetadataRoute.Sitemap`) regenerates `out/sitemap.xml` during `next build` and is the sitemap that actually ships. `scripts/generate-sitemap.ts` only refreshes the `public/sitemap.xml` build artifact. Edit `app/sitemap.ts` for the live sitemap and keep the script in sync (both iterate `seoRoutes`, recipes, blog posts, speaking events, and guides). Same pattern for `app/robots.ts`.
- JSON-LD is emitted through the builders in `src/lib/structuredData.ts` (Organization, WebSite, Article, Recipe, FAQ) rendered via `src/components/seo/Seo.tsx`; guide detail pages inject a `CreativeWork` schema inline in `src/views/GuideDetail.tsx`.
- `src/components/seo/Seo.tsx` is not the source of route-level title tags; App Router metadata is.
- `scripts/prerender.tsx` runs during build as a validation step and writes route audit output to `public/seo-route-audit.json`; it does not inject tags into `out/`.
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
   - `npm run build`
   - optional targeted regeneration: `npm run sitemap`, `npm run build:search`, or `npm run prerender`
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

1. `npm run build` — runs llms.txt generation, sitemap, search index, Next static export, and SEO audit.
2. Commit and push to `main` before production deploys so GitHub stays the source of truth for the live site. Pushing `main` auto-deploys production via Vercel's git integration.
3. Optionally trigger/force a production deploy from the CLI with `vercel --prod` (or `vercel redeploy <url> --target production` to rebuild + bust the edge cache). Note: `sitemap.xml`/`robots.txt` can sit behind a sticky edge cache for a few minutes after deploy even when other paths update immediately.
4. Keep legacy HTTP redirects in `vercel.json`; do not rely on `next.config.js` redirects for static-export production behavior.

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
