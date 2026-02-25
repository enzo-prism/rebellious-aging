import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { blogPosts } from '../src/data/blogPosts';
import { recipes, slugifyRecipeTitle } from '../src/data/recipes';
import { siteMetadata } from '../src/lib/siteMetadata';

interface StaticRouteConfig {
  path: string;
  changefreq?: string;
  priority?: number;
}

const STATIC_ROUTES: StaticRouteConfig[] = [
  { path: '/', changefreq: 'weekly', priority: 1.0 },
  { path: '/our-story', changefreq: 'monthly', priority: 0.8 },
  { path: '/welcome-letter', changefreq: 'monthly', priority: 0.6 },
  { path: '/starter-kit', changefreq: 'monthly', priority: 0.6 },
  { path: '/pillars/confidence', changefreq: 'monthly', priority: 0.9 },
  { path: '/pillars/style', changefreq: 'monthly', priority: 0.9 },
  { path: '/pillars/health', changefreq: 'monthly', priority: 0.9 },
  { path: '/pillars/gratitude', changefreq: 'monthly', priority: 0.9 },
  { path: '/nutrition', changefreq: 'weekly', priority: 0.8 },
  { path: '/pillars/health/nutrition-guide', changefreq: 'monthly', priority: 0.8 },
  { path: '/pillars/health/resource-guide', changefreq: 'monthly', priority: 0.7 },
  { path: '/video-series', changefreq: 'monthly', priority: 0.6 },
  { path: '/recipes', changefreq: 'weekly', priority: 0.8 },
  { path: '/search', changefreq: 'weekly', priority: 0.5 },
  { path: '/blog', changefreq: 'daily', priority: 0.8 },
  { path: '/team', changefreq: 'yearly', priority: 0.4 },
  { path: '/contact', changefreq: 'monthly', priority: 0.6 },
  { path: '/facebook-group', changefreq: 'monthly', priority: 0.5 },
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');
const outputPath = join(projectRoot, 'public', 'sitemap.xml');

const baseUrl = siteMetadata.baseUrl?.replace(/\/$/, '') ?? 'http://localhost:5173';

const formatDate = (value: Date | string) => {
  const date = value instanceof Date ? value : new Date(value);
  return date.toISOString().split('T')[0];
};

const toAbsoluteUrl = (path: string) => {
  if (path === '/' || path === '') {
    return `${baseUrl}/`;
  }
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
};

const buildUrlEntry = (loc: string, options: { changefreq?: string; priority?: number; lastmod?: string }) => {
  const lines = [
    '  <url>',
    `    <loc>${loc}</loc>`,
    options.lastmod ? `    <lastmod>${options.lastmod}</lastmod>` : '',
    options.changefreq ? `    <changefreq>${options.changefreq}</changefreq>` : '',
    typeof options.priority === 'number' ? `    <priority>${options.priority.toFixed(1)}</priority>` : '',
    '  </url>',
  ];

  return lines.filter(Boolean).join('\n');
};

const generateSitemap = async () => {
  const staticEntries = STATIC_ROUTES.map((route) =>
    buildUrlEntry(toAbsoluteUrl(route.path), {
      changefreq: route.changefreq,
      priority: route.priority,
    })
  );

  const blogEntries = blogPosts.map((post) =>
    buildUrlEntry(toAbsoluteUrl(`/blog/${post.id}`), {
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: formatDate(post.dateSort ?? post.date),
    })
  );

  const recipeEntries = recipes.map((recipe) =>
    buildUrlEntry(toAbsoluteUrl(`/recipes/${slugifyRecipeTitle(recipe.title)}`), {
      changefreq: 'monthly',
      priority: 0.6,
    })
  );

  const xmlContent = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...staticEntries,
    ...blogEntries,
    ...recipeEntries,
    '</urlset>',
    '',
  ].join('\n');

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, xmlContent, 'utf8');
  console.log(`Sitemap generated at ${outputPath}`);
};

generateSitemap().catch((error) => {
  console.error('Failed to generate sitemap:', error);
  process.exitCode = 1;
});
