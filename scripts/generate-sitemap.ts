import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { MetadataRoute } from 'next';

import buildSitemap from '../app/sitemap';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');
const outputPath = join(projectRoot, 'public', 'sitemap.xml');

const formatDate = (value: Date | string) => {
  const date = value instanceof Date ? value : new Date(value);
  return date.toISOString().split('T')[0];
};

const escapeXml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

const buildUrlEntry = (entry: MetadataRoute.Sitemap[number]) => {
  const lastModified = entry.lastModified ? formatDate(entry.lastModified) : undefined;
  const lines = [
    '  <url>',
    `    <loc>${escapeXml(entry.url)}</loc>`,
    lastModified ? `    <lastmod>${lastModified}</lastmod>` : '',
    entry.changeFrequency ? `    <changefreq>${entry.changeFrequency}</changefreq>` : '',
    typeof entry.priority === 'number' ? `    <priority>${entry.priority.toFixed(1)}</priority>` : '',
    '  </url>',
  ];

  return lines.filter(Boolean).join('\n');
};

export const serializeSitemap = (entries: MetadataRoute.Sitemap) => {
  const xmlContent = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map(buildUrlEntry),
    '</urlset>',
    '',
  ].join('\n');

  return xmlContent;
};

export const generateSitemap = async () => {
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, serializeSitemap(buildSitemap()), 'utf8');
  console.log(`Sitemap generated at ${outputPath}`);
};

const isDirectRun = process.argv[1] && resolve(process.argv[1]) === __filename;

if (isDirectRun) {
  generateSitemap().catch((error) => {
    console.error('Failed to generate sitemap:', error);
    process.exitCode = 1;
  });
}
