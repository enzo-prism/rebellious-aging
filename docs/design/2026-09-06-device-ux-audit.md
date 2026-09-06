# Cross-device UX follow-up

## Baseline and intent

This pass builds on production commit `d260082`. The preceding audit improved the homepage, blog, recipes, controls, and search. This follow-up examines returning to content, nutrition and video discovery, email/share handoffs, and browser-engine coverage. Source review and live checks were split across navigation, content, accessibility, and an independent regression reviewer.

## Findings addressed

| Finding | User-facing change | Regression coverage |
| --- | --- | --- |
| Search, blog, and recipe filters vanished after opening content and returning | Query, year, category, tags, sort, and search types persist in the URL; Back, reload, and sharing restore the current collection | Collection-return browser tests; recipe history in every device context |
| Invalid nutrition topic URLs selected no panel | Unsupported topic IDs show the default topic; supported topics participate in browser history | Nutrition unit and browser checks |
| Nutrition topics and videos were buried below oversized introductions and promotions | Compact introductions place topic selection and the first video earlier on phones; secondary nutrition promotions follow the main content | Inspected 320px screenshots and matrix reflow checks |
| Nutrition featured recipes used site branding as food images | Removed misleading placeholder image panels, retaining recipe titles and real data | Nutrition unit checks; export SEO audit |
| Long nutrition guide required repeated scrolling | Native contents links expose all existing sections and respect browser/reduced-motion behavior | Anchor and device navigation checks |
| Starting a video removed the focused control and overlaid player controls | Focus transfers to the labeled iframe; episode badge disappears; direct YouTube fallback is a readable touch target | Video unit checks and browser focus inspection |
| Copy-only sharing was cumbersome on mobile and assumed keyboard shortcuts on failure | Optional native device sharing plus persistent copy/manual-copy controls; cancellation stays quiet | Native share success/cancel/failure unit tests; clipboard-denied checks in all engines |
| Event signup failed for users without a configured mail app | Prepare a complete, copyable email draft for webmail, with manual-copy fallback and clear unsent status | Email draft and clipboard failure browser tests |
| Browser coverage only exercised desktop Chromium | Added a production-export matrix with three engines and eight device contexts, enforced in CI | Dedicated device job and failure artifacts |

The review also caught a recent-search hydration mismatch exposed by moving URL state into an isolated observer. Recent searches now load from validated browser storage after hydration.

## Visual evidence

Browser captures are saved locally under `output/playwright/design-audit/`: `18-nutrition-small-before.png`, `19-nutrition-small-after.png`, `20-videos-small-after.png`, and `21-webmail-draft-small-after.png`. At 320px wide, the nutrition topic selector is now visible within the first 740px viewport; the first video appears within that same viewport. Both were visually inspected. Existing identity, photographs, editorial content, and structured attribution remain intact.

## Operating contract

See [Production readiness](../production-readiness.md) for commands, failure artifacts, and the distinction between device emulation and physical-device coverage. See [Project overview](../project-overview.md) for URL-filter, media-focus, event handoff, and share behavior conventions.

## Validation

Release checks passed:

- `npm run readiness:verify`: TypeScript, lint without errors, production build, 87 unit tests, and all 120 Chromium browser tests.
- `npm run test:unit:coverage`: 85.66% lines, 91.07% functions, 62.44% branches in configured critical modules.
- `npm run test:e2e:devices`: 40/40 checks across eight contexts, including filter restoration after Back and reload.
- `PW_PRODUCTION_SERVER=true npm run test:e2e:perf`: 6/6 production-export checks.
- Export audit: 157 indexable routes, 100 articles, two visible FAQ sections, and 166 local destinations.
- Independent review: hydration correction verified; no remaining release blockers.
 Automated coverage checks representative browser engines and device layouts; it is not a guarantee that every possible device or external service will always work.
