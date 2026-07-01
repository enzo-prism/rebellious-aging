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

## Required execution commands
- `npm run readiness:assets` – rebuild generated SEO/search assets and readiness report.
- `npm run lint` – lint + type-checked script quality.
- `npm run build` – full Next static export flow including sitemap generation, search index generation, static export, and metadata audit.
- `npm run test:unit` – unit + component checks.
- `npm run test:e2e:readiness` – browser readiness checks.
- `npm run readiness:verify` – full readiness pipeline (all above).

### Full launch gate
`npm run readiness:verify` should pass three consecutive runs before release.

## Current baseline checks
- Report file: `public/production-readiness-report.json`
- Expected status in release conditions: `status: "pass"` with all checks green.
- Latest content-release baseline: on 2026-07-01, Blogs #77 (`/blog/do-superpowers-change`) and #78 (`/blog/the-superpower-epilogue`) were published (ungated from their password-protected previews) so the full superpower series is live and indexable. Prior baseline: on 2026-06-30, Blog #76 (`/blog/the-problem-with-superpowers`) was added as public content and #77/#78 were added as password-gated previews. Each run was verified with lint, unit tests, full static build, production deployment, and live readbacks.

## Share-specific verification
- `tests/unit/components/PageShareButton.test.tsx` validates dialog open/close behavior, clipboard success, and clipboard failure fallback.
- `tests/e2e/share-button.spec.ts` verifies copied URLs match the live browser URL, including query params.
- `tests/e2e/route-matrix.spec.ts` asserts that share controls appear on public routes and do not appear on 404 responses.
- `tests/e2e/accessibility.spec.ts` includes an axe smoke test on the open share dialog.

## Notes
- Run with `npm run preview` after `npm run build` for manual smoke.
- For legacy URLs that must return a real HTTP redirect in production, verify the rule in `vercel.json` as part of release review; static export alone is not enough.
- Keep generated files in sync after SEO/content updates:
  - `npm run sitemap`
  - `npm run build:search`
  - `npm run build`
