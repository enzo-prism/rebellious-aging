# Production Readiness Program

This project uses a codified readiness gate before public launch.

## What it validates
- Route and content integrity via build-time prerender and route matrix checks.
- SEO coverage (`public/sitemap.xml`, `public/search-index.json`, `public/seo-route-audit.json`).
- Component/unit coverage for metadata, search, pages, and key layout primitives.
- Browser readiness for route rendering, command palette/search behavior, resilience states, and keyboard/accessibility checks.
- Browser readiness for the universal share dialog, including public-route visibility, exact URL copying, manual-copy fallback, and 404 exclusion.
- Web-vitals smoke thresholds for key public routes.
- Security guardrails for outbound links with `target="_blank"` using `rel="noopener noreferrer"`.

## Required execution commands
- `npm run readiness:assets` – rebuild generated SEO/search assets and readiness report.
- `npm run lint` – lint + type-checked script quality.
- `npm run build` – full Next static export flow including prerender.
- `npm run test:unit` – unit + component checks.
- `npm run test:e2e:readiness` – browser readiness checks.
- `npm run readiness:verify` – full readiness pipeline (all above).

### Full launch gate
`npm run readiness:verify` should pass three consecutive runs before release.

## Current baseline checks
- Report file: `public/production-readiness-report.json`
- Expected status in release conditions: `status: "pass"` with all checks green.

## Share-specific verification
- `tests/unit/components/PageShareButton.test.tsx` validates dialog open/close behavior, clipboard success, and clipboard failure fallback.
- `tests/e2e/share-button.spec.ts` verifies copied URLs match the live browser URL, including query params.
- `tests/e2e/route-matrix.spec.ts` asserts that share controls appear on public routes and do not appear on 404 responses.
- `tests/e2e/accessibility.spec.ts` includes an axe smoke test on the open share dialog.

## Notes
- Run with `npm run preview` after `npm run build` for manual smoke.
- Keep generated files in sync after SEO/content updates:
  - `npm run sitemap`
  - `npm run build:search`
  - `npm run build`
