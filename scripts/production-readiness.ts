import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { relative, resolve } from 'node:path';
import { blogPosts } from '../src/data/blogPosts';
import { recipes, slugifyRecipeTitle } from '../src/data/recipes';
import { pillarContent } from '../src/data/pillarContent';
import { seoRoutes } from '../src/data/seoRoutes';
import { buildMetaDescription, buildSeoTitle } from '../src/lib/seo';
import { siteMetadata } from '../src/lib/siteMetadata';

type ReadinessCheck = {
  ok: boolean;
  details: string;
};

type ReadinessReport = {
  generatedAt: string;
  checks: Array<{ name: string; ok: boolean; details: string }>;
  status: 'pass' | 'fail';
};

const rootDir = process.cwd();
const publicDir = resolve(rootDir, 'public');
const publicSitemapPath = resolve(publicDir, 'sitemap.xml');
const publicSearchIndexPath = resolve(publicDir, 'search-index.json');
const publicSeoAuditPath = resolve(publicDir, 'seo-route-audit.json');
const outputPath = resolve(publicDir, 'production-readiness-report.json');
const baseUrl = siteMetadata.baseUrl?.replace(/\/$/, '') || 'https://rebelwithsuz.com';

const stripBaseFromUrl = (value: string) => {
  try {
    const parsed = new URL(value);
    return parsed.pathname;
  } catch {
    return value;
  }
};

const checks: ReadinessCheck[] = [];
const checkResults: Array<{ name: string; ok: boolean; details: string }> = [];
const sourceRoots = [
  resolve(rootDir, 'app'),
  resolve(rootDir, 'src'),
  resolve(rootDir, 'scripts'),
];

const isScanTarget = (filePath: string) =>
  /\.(t|j)sx?$/.test(filePath) &&
  !filePath.includes('node_modules') &&
  !filePath.includes('.next');

const walkTextFiles = (directory: string, collected: string[] = []): string[] => {
  if (!existsSync(directory)) {
    return collected;
  }

  const items = readdirSync(directory, { withFileTypes: true });
  for (const item of items) {
    const itemPath = resolve(directory, item.name);
    if (item.isDirectory()) {
      walkTextFiles(itemPath, collected);
      continue;
    }
    if (item.isFile() && isScanTarget(itemPath)) {
      collected.push(itemPath);
    }
  }
  return collected;
};

const runCheck = (name: string, check: () => ReadinessCheck) => {
  try {
    const result = check();
    checks.push(result);
    checkResults.push({ name, ok: result.ok, details: result.details });
  } catch (error) {
    const details = error instanceof Error ? error.message : String(error);
    checks.push({ ok: false, details });
    checkResults.push({ name, ok: false, details });
  }
};

const parseJson = <T>(path: string) => {
  const raw = readFileSync(path, 'utf8');
  return JSON.parse(raw) as T;
};

const checkTargetBlankRel = () => {
  const files = sourceRoots.flatMap((dir) => walkTextFiles(dir));
  const anchorRegex = /<a\b[^>]*\btarget\s*=\s*(['"])_blank\1[^>]*>/gis;
  const relRegex = /\brel\s*=\s*(['"])(.*?)\1/i;
  const found: string[] = [];

  for (const filePath of files) {
    const content = readFileSync(filePath, 'utf8');
    const matches = Array.from(content.matchAll(anchorRegex));

    for (const match of matches) {
      const tag = match[0];
      const relMatch = tag.match(relRegex);
      const relValue = relMatch?.[2]?.toLowerCase() ?? '';
      const relTokens = relValue.split(/\s+/).filter(Boolean);
      const hasNoopener = relTokens.includes('noopener');
      const hasNoreferrer = relTokens.includes('noreferrer');

      if (!hasNoopener || !hasNoreferrer) {
        const line = content.slice(0, match.index ?? 0).split('\n').length;
        const relativePath = relative(rootDir, filePath);
        found.push(`${relativePath}:${line}`);
      }
    }
  }

  if (found.length > 0) {
    return {
      ok: false,
      details: `Found ${found.length} <a> tags with target="_blank" missing rel="noopener noreferrer": ${found.slice(0, 12).join(', ')}${found.length > 12 ? ', ...' : ''}`,
    };
  }

  return { ok: true, details: 'All scanned target="_blank" links include rel="noopener noreferrer".' };
};

const checkSitemap = () => {
  if (!existsSync(publicSitemapPath)) {
    return {
      ok: false,
      details: `Missing sitemap at ${publicSitemapPath}`,
    };
  }

  const xml = readFileSync(publicSitemapPath, 'utf8');
  const urlMatches = xml.match(/<loc>(.*?)<\/loc>/g) || [];
  if (!xml.includes('<urlset')) {
    return { ok: false, details: 'sitemap.xml is malformed (missing <urlset>).' };
  }
  if (urlMatches.length === 0) {
    return { ok: false, details: 'sitemap.xml has no route entries.' };
  }
  return { ok: true, details: `${urlMatches.length} sitemap URLs generated.` };
};

const checkSearchIndex = () => {
  if (!existsSync(publicSearchIndexPath)) {
    return {
      ok: false,
      details: `Missing search index at ${publicSearchIndexPath}`,
    };
  }

  const raw = parseJson<Array<unknown>>(publicSearchIndexPath);
  if (!Array.isArray(raw)) {
    return { ok: false, details: 'search-index.json is not an array.' };
  }
  if (raw.length === 0) {
    return { ok: false, details: 'search-index.json is empty.' };
  }

  const requiredKeys = ['id', 'type', 'title', 'path', 'summary'];
  const invalid = raw.find((entry) => {
    if (!entry || typeof entry !== 'object') {
      return true;
    }
    const candidate = entry as Record<string, unknown>;
    return requiredKeys.some((key) => !candidate[key]);
  });

  if (invalid) {
    return {
      ok: false,
      details: 'search-index.json contains entries missing required fields.',
    };
  }

  return { ok: true, details: `${raw.length} search index records generated.` };
};

const buildExpectedPaths = () => {
  const staticPaths = seoRoutes.map((route) => route.path);
  const blogPaths = blogPosts.map((post) => `/blog/${post.id}`);
  const recipePaths = recipes.map((recipe) => `/recipes/${slugifyRecipeTitle(recipe.title)}`);
  const pillarPaths = Object.keys(pillarContent).map((id) => `/pillars/${id}`);

  return Array.from(new Set([...staticPaths, ...blogPaths, ...recipePaths, ...pillarPaths]));
};

const checkSitemapCoverage = () => {
  if (!existsSync(publicSitemapPath)) {
    return {
      ok: false,
      details: `Missing sitemap at ${publicSitemapPath}`,
    };
  }

  const xml = readFileSync(publicSitemapPath, 'utf8');
  const urls = new Set(
    xml
      .match(/<loc>(.*?)<\/loc>/g)
      ?.map((entry) => stripBaseFromUrl(entry.replace('<loc>', '').replace('</loc>', '')))
      .filter(Boolean)
      .map((path) => path)
  );

  const expectedPaths = buildExpectedPaths().filter((path) => path !== '/404');
  const missing = expectedPaths.filter((path) => {
    const pathWithTrailing = path.endsWith('/') ? path : path;
    const pathNoTrailing = path.endsWith('/') ? path.slice(0, -1) : path;
    return !urls?.has(pathWithTrailing) && !urls?.has(pathNoTrailing);
  });

  if (missing.length) {
    return {
      ok: false,
      details: `Sitemap missing ${missing.length} expected routes: ${missing.slice(0, 8).join(', ')}${
        missing.length > 8 ? ', ...' : ''
      }`,
    };
  }

  return {
    ok: true,
    details: `Sitemap covers ${expectedPaths.length} expected routes.`,
  };
};

const checkSeoRouteMetadataCompleteness = () => {
  const brokenSeo = seoRoutes.filter(
    (route) => !route.title || !route.description || typeof route.path !== 'string' || !route.path.trim()
  );

  if (brokenSeo.length) {
    return {
      ok: false,
      details: `seoRoutes has ${brokenSeo.length} invalid entries.`,
    };
  }

  const withDefaults = seoRoutes.map((route) => {
    const description = buildMetaDescription(route.description);
    return {
      path: route.path,
      title: buildSeoTitle(route.title),
      description,
    };
  });

  const invalid = withDefaults.find((entry) => !entry.title || !entry.description || !entry.path);
  if (invalid) {
    return {
      ok: false,
      details: `seoRoutes validation failed for ${invalid.path}.`,
    };
  }

  return { ok: true, details: `${seoRoutes.length} SEO routes validated with defaults fallback intact.` };
};

const checkSeoAudit = () => {
  if (!existsSync(publicSeoAuditPath)) {
    return { ok: false, details: `Missing SEO audit at ${publicSeoAuditPath}` };
  }

  const raw = parseJson<{ failedRoutes?: number; totalRoutes?: number }>(publicSeoAuditPath);
  if (typeof raw.failedRoutes !== 'number' || raw.failedRoutes > 0) {
    return {
      ok: false,
      details: `SEO audit has ${raw.failedRoutes ?? 'unknown'} failed route(s).`,
    };
  }
  if (typeof raw.totalRoutes !== 'number') {
    return { ok: false, details: 'SEO audit payload is malformed.' };
  }

  return { ok: true, details: `${raw.totalRoutes} routes verified with complete metadata.` };
};

const report: ReadinessReport = {
  generatedAt: new Date().toISOString(),
  checks: [],
  status: 'pass',
};

runCheck('sitemap', checkSitemap);
runCheck('sitemap-coverage', checkSitemapCoverage);
runCheck('search-index', checkSearchIndex);
runCheck('seo-route-metadata', checkSeoRouteMetadataCompleteness);
runCheck('seo-route-audit', checkSeoAudit);
runCheck('target-blank-rel', checkTargetBlankRel);

report.checks = checkResults;
report.status = checkResults.every((item) => item.ok) ? 'pass' : 'fail';

writeFileSync(outputPath, JSON.stringify(report, null, 2), 'utf8');

if (report.status === 'fail') {
  for (const item of report.checks.filter((check) => !check.ok)) {
    console.error(`${item.name}: ${item.details}`);
  }
  console.error(`Production readiness check failed. Report: ${outputPath}`);
  process.exitCode = 1;
} else {
  console.log('Production readiness checks passed.');
  console.log(`Report: ${outputPath}`);
}
