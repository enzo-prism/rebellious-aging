# Production Readiness Program

This project uses a codified readiness gate before public launch.

## What it validates
- Route and content integrity via build-time prerender and route matrix checks.
- SEO coverage (`public/sitemap.xml`, `public/search-index.json`, `public/seo-route-audit.json`).
- Component/unit coverage for metadata, search, pages, and key layout primitives.
- Browser readiness for route rendering, command palette/search behavior, resilience states, and keyboard/accessibility checks.
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

## Notes
- Run with `npm run preview` after `npm run build` for manual smoke.
- Keep generated files in sync after SEO/content updates:
  - `npm run sitemap`
  - `npm run build:search`
  - `npm run build`

