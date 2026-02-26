# Migration + Google Operations Checklist (2026)

Last reviewed: 2026-02-26.

This document is the one-stop guide for repository migration ownership, deployment readiness, and Google Search visibility checks.

## 1) Single source of truth

- Primary repository: `https://github.com/enzo-prism/rebellious-aging`
- Legacy repository (historical only): `https://github.com/enzo-prism/age-boldly-vibrantly`
- Vercel project: `ra-nextjs` (scope `enzo-design-prisms-projects`)
- Production domain: `https://rebelwithsuz.com`
- Production alias: `https://ra-nextjs.vercel.app`

## 2) Deployment command sequence

Use this after each content or metadata change:

```bash
npm run build
vercel --prod --yes --scope enzo-design-prisms-projects
```

Then run the verification checks:

```bash
gh repo view enzo-prism/rebellious-aging --json nameWithOwner,url,description,defaultBranchRef
gh repo view enzo-prism/age-boldly-vibrantly --json isArchived,url,defaultBranchRef
vercel whoami
vercel project inspect ra-nextjs --scope enzo-design-prisms-projects
vercel aliases ls --scope enzo-design-prisms-projects
vercel env ls
```

## 3) SEO artifact checks

1. Confirm crawler files:
   - `https://rebelwithsuz.com/robots.txt`
   - `https://rebelwithsuz.com/sitemap.xml`
2. Confirm meta signals on representative URLs:
   - `/` contains `index, follow`
   - `/search` contains `noindex, nofollow`
   - `/404` contains `noindex`
3. Re-run generation commands when route metadata changes:
   - `npm run sitemap`
   - `npm run build:search`
   - `npm run prerender` (or full `npm run build`)

## 4) Google Search Console loop

- Keep `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in Production env.
- Add the property `https://rebelwithsuz.com`.
- In Sitemaps, submit:
  - `https://rebelwithsuz.com/sitemap.xml`
- In crawl audit:
  - Confirm noindex pages (`/search`, `/404`, legacy not-found flows) are intentionally excluded.
  - Confirm canonical host is `https://rebelwithsuz.com`.

## 5) Analytics + verification status

At deployment time, ensure production env includes:

- `NEXT_PUBLIC_ENABLE_ANALYTICS=true`
- `NEXT_PUBLIC_GA_ID=<GA4 property ID>`
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=<token>`

`NEXT_PUBLIC_HOTJAR_ID` is optional if session recordings are still required.

## 6) Ongoing ownership reminder

- When docs, metadata, or redirects change: update `README.md`, `docs/project-overview.md`, and `docs/seo-best-practices-nextjs-vercel-2026.md`.
- Tag each pull request with the runbook command set used and the post-deploy verification URLs used.
