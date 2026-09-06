/** Verify the HTML that ships, without executing client JavaScript. */
import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { JSDOM } from 'jsdom';

const output = resolve('out');
const base = 'https://www.rebelwithsuz.com';
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };
const exists = async (path) => { try { await access(path); return true; } catch { return false; } };
const readDocument = async (path) => new JSDOM(await readFile(path, 'utf8')).window.document;
const sitemap = new JSDOM(await readFile(`${output}/sitemap.xml`, 'utf8'), { contentType: 'text/xml' }).window.document;
const urls = [...sitemap.querySelectorAll('loc')].map((node) => node.textContent);
check(new Set(urls).size === urls.length, 'Sitemap contains duplicate URLs');
const titles = new Map();
const destinations = new Set();
let faqCount = 0;
let articleCount = 0;
for (const url of urls) {
  const path = new URL(url).pathname;
  const doc = await readDocument(path === '/' ? `${output}/index.html` : `${output}${path}.html`);
  check(url.startsWith(`${base}/`), `${path}: noncanonical sitemap host`);
  check(doc.querySelectorAll('title').length === 1 && doc.title.trim(), `${path}: missing/duplicate title`);
  check(!titles.has(doc.title), `${path}: title also used at ${titles.get(doc.title)}`);
  titles.set(doc.title, path);
  check(doc.querySelectorAll('meta[name="description"]').length === 1, `${path}: missing/duplicate description`);
  check(doc.querySelector('meta[name="description"]')?.content.length >= 40, `${path}: empty description`);
  check(doc.querySelectorAll('link[rel="canonical"]').length === 1, `${path}: missing/duplicate canonical`);
  check(doc.querySelector('link[rel="canonical"]')?.href === url, `${path}: canonical mismatch`);
  check(new URL(doc.querySelector('meta[property="og:url"]')?.content ?? '/', base).href === url, `${path}: Open Graph URL mismatch`);
  check(doc.querySelector('meta[property="og:image"]')?.content.startsWith('https://'), `${path}: missing social image`);
  check(!doc.querySelector('meta[name="robots"]')?.content.includes('noindex'), `${path}: indexable route marked noindex`);
  check(doc.querySelector('meta[name="googlebot"]')?.content.includes('max-image-preview:large'), `${path}: large image previews not enabled`);
  check(doc.querySelectorAll('main h1').length === 1, `${path}: expected one main H1`);
  const mainText = doc.querySelector('main')?.textContent.replace(/\s+/g, ' ').trim() ?? '';
  check(mainText.length > 120, `${path}: body missing in raw HTML`);
  const schemas = [...doc.querySelectorAll('script[type="application/ld+json"]')].map((node) => JSON.parse(node.textContent));
  check(schemas.some((schema) => schema['@type'] === 'Person' && schema['@id'] === `${base}/our-story#suz`), `${path}: missing author entity`);
  for (const schema of schemas) {
    if (schema['@type'] === 'FAQPage') {
      faqCount++;
      for (const question of schema.mainEntity) {
        check(mainText.includes(question.name), `${path}: FAQ question absent from visible content`);
        check(mainText.includes(question.acceptedAnswer.text), `${path}: FAQ answer absent from visible content`);
      }
    }
    if (schema['@type'] === 'Article' && path.startsWith('/blog/')) {
      articleCount++;
      check(Boolean(doc.querySelector('article')), `${path}: missing article landmark`);
      check(doc.querySelector('a[rel="author"]')?.getAttribute('href') === '/our-story#suz', `${path}: missing visible author link`);
      if (schema.datePublished) {
        check(/^\d{4}-\d{2}-\d{2}$/.test(schema.datePublished), `${path}: invalid publication date`);
        check(doc.querySelector('time')?.dateTime === schema.datePublished, `${path}: visible date and schema differ`);
        check(doc.querySelector('meta[property="article:published_time"]')?.content === schema.datePublished, `${path}: social publication date differs`);
      }
    }
    if (schema['@type'] === 'CollectionPage') {
      check(schema.mainEntity.numberOfItems === schema.mainEntity.itemListElement.length, path + ': collection count mismatch');
      for (const item of schema.mainEntity.itemListElement) {
        const itemPath = new URL(item.url).pathname;
        check([...doc.querySelectorAll('main a[href]')].some((a) => a.getAttribute('href') === itemPath), path + ': collection item has no visible link: ' + itemPath);
      }
    }
    if (schema['@type'] === 'Recipe') {
      check(schema.recipeIngredient.length > 0 && schema.recipeInstructions.length > 0, `${path}: empty recipe`);
      check(schema.author?.name !== 'Suzanne (Suz)', `${path}: invented recipe attribution`);
    }
    if (schema['@type'] === 'BreadcrumbList') {
      check(Boolean(doc.querySelector('nav[aria-label="Breadcrumb"]')), `${path}: schema-only breadcrumbs`);
      check(schema.itemListElement.at(-1).item === url, `${path}: breadcrumb does not end on current page`);
    }
  }
  for (const node of doc.querySelectorAll('a[href], img[src]')) {
    const href = node.getAttribute('href') ?? node.getAttribute('src');
    if (href.startsWith('/') && !href.startsWith('//')) destinations.add(new URL(href, base).pathname);
  }
}
for (const path of destinations) {
  if (path === '/pillars/longevity') continue; // Explicit permanent redirect in vercel.json.
  const decoded = decodeURIComponent(path);
  check(await exists(`${output}${decoded}`) || await exists(`${output}${decoded}.html`) || await exists(`${output}${decoded}/index.html`), `Broken local link/asset: ${path}`);
}
const search = await readDocument(`${output}/search.html`);
check(search.querySelector('meta[name="robots"]')?.content.includes('noindex'), 'Search results must be noindex');
const notFound = await readDocument(`${output}/404.html`);
check(notFound.querySelector('meta[name="robots"]')?.content.includes('noindex'), '404 must be noindex');
check(faqCount === 2, `Expected two FAQ sections, found ${faqCount}`);
check(articleCount > 0, 'No blog articles audited');
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`SEO export audit passed: ${urls.length} routes, ${articleCount} articles, ${faqCount} visible FAQ sections, ${destinations.size} local destinations.`);
}
