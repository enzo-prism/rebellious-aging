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
- `npm run test:e2e` – broad Chromium browser suite.
- `npm run test:e2e:devices` – focused matrix against a fresh production export. Install engines with `npx playwright install chromium firefox webkit` (CI adds `--with-deps`).
- `npm run test:e2e:readiness` – focused browser readiness checks.
- CI splits the browser gate: functional and route-status coverage uses the Next.js development server, while `npm run test:e2e:perf` measures the built production export.
- `npm run readiness:verify` – full readiness pipeline (all above).

### Full launch gate
`npm run readiness:verify`, `npm run test:unit:coverage`, and `npm run test:e2e:devices` must pass locally. Run `PW_PRODUCTION_SERVER=true npm run test:e2e:perf` after the development server stops. Both matching GitHub Actions jobs must then be green on `main`. Verify that the production deployment and domain aliases point to the tested commit.

## Current baseline checks
- Report file: `public/production-readiness-report.json`
- Expected status in release conditions: `status: "pass"` with all checks green.
- September 6 baseline: 100 articles, 159 audited SEO routes, 157 indexable sitemap routes, and 166 validated local destinations. Current test counts are recorded in the latest `docs/design/` audit, since they grow with new regressions.
- Current hardening covers responsive images, on-demand search, server-rendered content, browser-history filter restoration, nutrition deep links, video focus, keyboard/mobile navigation, accessible forms, clipboard/manual-copy recovery, canonical sitemap policy, and Vercel response headers.
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

## Device coverage and practical limits

`playwright.devices.config.ts` runs representative journeys in Chromium Android phone/tablet and 320px phone layouts, Firefox desktop, and WebKit desktop/iPhone/iPad/landscape layouts. It uses the built static export on port 4173, independently of the broad development suite on port 3000. `PW_DEVICE_BASE_URL=https://www.rebelwithsuz.com npm run test:e2e:devices` runs the same checks against a deployment without starting a local server.

The matrix covers real browser engines with emulated viewports, touch input, manual-copy fallback, cooking controls, navigation focus, reduced motion, JavaScript-free reading, and reflow. It does not simulate every physical phone, browser extension, on-screen keyboard, OS share sheet, assistive technology, or third-party service outage. Manual checks on actual iOS and Android hardware remain useful before a major redesign. Avoid claiming universal device perfection from automated checks.

Do not grant Chromium-only clipboard permissions globally to Firefox/WebKit. Failed device tests upload screenshots and traces as `device-test-evidence` in CI. Inspect those artifacts, fix the actual issue or selector, and rerun the affected journey before broadening the run.
