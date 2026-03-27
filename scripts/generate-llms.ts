import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

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
  '/welcome-letter',
  '/speaking-events',
  '/dr-seuss',
  '/nutrition',
  '/blog',
  '/recipes',
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
  ...keyPaths.map((path) => `- ${toAbsoluteUrl(path)}`),
  '',
  '## Speaking events',
  `- ${toAbsoluteUrl('/speaking-events')}`,
  ...speakingEvents.map((event) => `- ${toAbsoluteUrl(getSpeakingEventPath(event.slug))}`),
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
