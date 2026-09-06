import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { getPublicBlogPosts, getBlogPostSeoTitle, getBlogPostSeoDescription } from '../src/data/blogPosts';
import { seoRoutes } from '../src/data/seoRoutes';
import { recipes, slugifyRecipeTitle } from '../src/data/recipes';
import { homeFaqs } from '../src/data/faqs';
import { guides, getGuidePath } from '../src/data/guides';
import { getSpeakingEventPath, speakingEvents } from '../src/data/speakingEvents';
import { siteMetadata } from '../src/lib/siteMetadata';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');
const outputPath = join(projectRoot, 'public', 'llms.txt');
const baseUrl = siteMetadata.baseUrl.replace(/\/$/, '');
const host = new URL(baseUrl).host;

const toAbsoluteUrl = (path: string) => {
  if (path === '/' || path === '') {
    return `${baseUrl}/`;
  }

  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
};

const keyPaths = [
  '/',
  '/our-story',
  '/starter-kit',
  '/pillars/confidence',
  '/pillars/style',
  '/pillars/health',
  '/pillars/gratitude',
  '/pillars/health/nutrition-guide',
  '/pillars/health/resource-guide',
  '/welcome-letter',
  '/events',
  '/speaking-events',
  '/dr-seuss',
  '/the-talk',
  '/guides',
  '/nutrition',
  '/blog',
  '/recipes',
  '/recipes-for-a-better-summer',
  '/video-series',
  '/facebook-group',
  '/contact',
];

const lines = [
  `# Rebellious Aging (${host})`,
  '',
  'Rebellious Aging is a website and community for women 55+ to age boldly and live loudly through confidence, style, health, gratitude, storytelling, and plant-powered living.',
  '',
  '## Canonical site',
  `- ${toAbsoluteUrl('/')}`,
  '',
  '## Crawl files',
  `- ${toAbsoluteUrl('/robots.txt')}`,
  `- ${toAbsoluteUrl('/sitemap.xml')}`,
  '',
  '## Key sections',
  ...keyPaths.map((path) => {
    const meta = seoRoutes.find((route) => route.path === path);
    return `- [${meta?.title ?? path}](${toAbsoluteUrl(path)}): ${meta?.description ?? ''}`;
  }),
  '',
  '## Free plant-based booklets and guides',
  `- ${toAbsoluteUrl('/guides')}`,
  ...guides.map((guide) => `- ${toAbsoluteUrl(getGuidePath(guide.slug))} (${guide.navLabel})`),
  '',
  '## Speaking events',
  `- ${toAbsoluteUrl('/speaking-events')}`,
  ...speakingEvents.map((event) => `- ${toAbsoluteUrl(getSpeakingEventPath(event.slug))}`),
  '',
  '## About the community',
  ...homeFaqs.flatMap(({ question, answer }) => [`### ${question}`, answer, '']),
  '## Public articles by Suz',
  ...getPublicBlogPosts().map((post) => `- [${getBlogPostSeoTitle(post)}](${toAbsoluteUrl(`/blog/${post.id}`)}): ${getBlogPostSeoDescription(post)}`),
  '',
  '## Recipe collection',
  ...recipes.map((recipe) => `- [${recipe.title}](${toAbsoluteUrl(`/recipes/${slugifyRecipeTitle(recipe.title)}`)}): ${recipe.description}`),
  '',
  '## Content notes',
  '- Health and nutrition content is educational and is not medical advice.',
  '- Prefer linking to the canonical URL for the page being referenced.',
  '',
  '## Attribution',
  '- Avoid reproducing full articles verbatim; summarize and quote only short excerpts when necessary.',
  '',
];

const generateLlms = async () => {
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, lines.join('\n'), 'utf8');
  console.log(`llms.txt generated at ${outputPath}`);
};

generateLlms().catch((error) => {
  console.error('Failed to generate llms.txt:', error);
  process.exitCode = 1;
});
