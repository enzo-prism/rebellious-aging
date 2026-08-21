# Production Readiness Program

This project uses a codified readiness gate before public launch.

## What it validates
- Route and content integrity via build-time metadata audit (`npm run prerender`) and route matrix checks.
- SEO coverage (`public/sitemap.xml`, `public/search-index.json`, `public/seo-route-audit.json`, `public/llms.txt`). Note the shipped `/sitemap.xml` is produced by `app/sitemap.ts` at `next build`; `public/sitemap.xml` is the build-artifact copy the readiness checks read.
- Component/unit coverage for metadata, search, pages, and key layout primitives.
- Browser readiness for route rendering, command palette/search behavior, resilience states, and keyboard/accessibility checks.
- Browser readiness for the universal share dialog, including public-route visibility, exact URL copying, manual-copy fallback, and 404 exclusion.
- Web-vitals smoke thresholds for key public routes.
- Security guardrails for outbound links with `target="_blank"` using `rel="noopener noreferrer"`.
- Production response headers defined in `vercel.json`.

## Required execution commands
- `npm run readiness:assets` – rebuild generated SEO/search assets and readiness report.
- `npm run typecheck` – TypeScript validation.
- `npm run lint` – ESLint validation.
- `npm run build` – full Next static export flow including sitemap generation, search index generation, static export, and metadata audit.
- `npm run test:unit:coverage` – unit + component checks with enforced coverage thresholds.
- `npm run test:e2e` – full browser suite.
- `npm run test:e2e:readiness` – focused browser readiness checks.
- CI splits the browser gate: functional and route-status coverage uses the Next.js development server, while `npm run test:e2e:perf` measures the built production export.
- `npm run readiness:verify` – full readiness pipeline (all above).

### Full launch gate
`npm run readiness:verify` must pass locally, then the matching GitHub Actions gate must be green on `main`.

## Current baseline checks
- Report file: `public/production-readiness-report.json`
- Expected status in release conditions: `status: "pass"` with all checks green.
- August 20, 2026 full Drive parity baseline: Blogs #1–#93 are represented, with 152 audited SEO routes, 150 sitemap URLs, 170 search documents, 67 passing unit tests, and 86 passing browser tests. The earlier August 14 Blog #93 baseline was 150 audited SEO routes, 148 sitemap URLs, and 168 search documents. Typecheck, lint, build, readiness report, and `git diff --check` pass; lint reports 26 existing image-optimization warnings and no errors.
- Current hardening covers responsive hero/gallery images, on-demand search indexing, server-rendered nutrition and pillar content, keyboard/mobile navigation, accessible search filters, event email handoff, consistent recipe fallbacks, sitemap policy alignment, and baseline Vercel response headers.
- GitHub Actions runs the same release checks from `.github/workflows/ci.yml`.

## Share-specific verification
- `tests/unit/components/PageShareButton.test.tsx` validates dialog open/close behavior, clipboard success, and clipboard failure fallback.
- `tests/e2e/share-button.spec.ts` verifies copied URLs match the live browser URL, including query params.
- `tests/e2e/route-matrix.spec.ts` asserts that share controls appear on public routes and do not appear on 404 responses.
- `tests/e2e/accessibility.spec.ts` includes an axe smoke test on the open share dialog.

## Notes
- Run with `npm run preview` after `npm run build` for manual smoke.
- Public pillar quizzes are retired. The existing Supabase quiz schema and Edge Function are legacy infrastructure and should not be redeployed unless the feature is deliberately reactivated and reviewed.
- For legacy URLs that must return a real HTTP redirect in production, verify the rule in `vercel.json` as part of release review; static export alone is not enough.
- Keep generated files in sync after SEO/content updates:
  - `npm run sitemap`
  - `npm run build:search`
  - `npm run build`
