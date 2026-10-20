import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

import { NEW_BLOG_POSTS } from '../tests/helpers/newBlogPosts';
import { AT_WEBSITE_RELEASE } from '../tests/helpers/scheduledBlogPosts';
import { blogPosts } from '../src/data/blogPosts';

const out = resolve(process.env.BLOG_EXPORT_DIR ?? 'out');
const now = new Date(process.env.BLOG_SCHEDULE_NOW ?? Date.now());
assert(!Number.isNaN(now.getTime()), 'A valid build clock is required.');
const files = (directory: string): string[] => readdirSync(directory).flatMap((name) => {
  const path = join(directory, name);
  return statSync(path).isDirectory() ? files(path) : [path];
});
const exported = files(out).map((path) => ({ path, contents: readFileSync(path, 'utf8') }));
const read = (path: string) => readFileSync(join(out, path), 'utf8');
const surfaces = ['blog.html', 'index.html', 'sitemap.xml', 'search-index.json', 'llms.txt', 'seo-route-audit.json'];
const released = NEW_BLOG_POSTS.filter((post) => new Date(post.publishedAt) <= now);

for (const post of NEW_BLOG_POSTS) {
  const metadata = blogPosts.find((entry) => entry.id === post.id);
  assert(metadata, `Missing metadata for #${post.blogNumber}`);
  const articlePath = join(out, 'blog', `${post.id}.html`);
  if (new Date(post.publishedAt) > now) {
    assert(!existsSync(articlePath), `Future article file exists: ${articlePath}`);
    const needles = [post.id, post.title, metadata.excerpt, post.bodySentence, `Blog #${post.blogNumber}`, `Blog #<!-- -->${post.blogNumber}`];
    for (const { path, contents } of exported) {
      for (const needle of needles) assert(!contents.includes(needle), `${path} leaked ${needle}`);
    }
    continue;
  }
  assert(existsSync(articlePath), `Missing released article #${post.blogNumber}`);
  const article = readFileSync(articlePath, 'utf8');
  assert(article.includes(`<h1 class="text-4xl font-bold mb-4">${post.title}</h1>`));
  assert(article.includes(`https://www.rebelwithsuz.com/blog/${post.id}`));
  assert(article.includes(post.publishedAt.slice(0, 10)), `Missing publication date for #${post.blogNumber}`);
  const body = article.match(/<div class="prose max-w-none space-y-4 mb-16">([\s\S]*?)<\/div>/)?.[1];
  assert(body, `Missing article body for #${post.blogNumber}`);
  assert.equal((body.match(/<p(?:\s|>)/g) ?? []).length, post.paragraphs);
  const entities: Record<string, string> = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#x27;': "'", '&#39;': "'" };
  const text = body.replace(/<br\s*\/?\s*>/g, ' ').replace(/<\/p>/g, ' ').replace(/<[^>]+>/g, '')
    .replace(/&(?:amp|lt|gt|quot|#x27|#39);/g, (entity) => entities[entity]).replace(/\s+/g, ' ').trim();
  assert.equal(createHash('sha256').update(text).digest('hex'), post.bodyHash, `Source mismatch for #${post.blogNumber}`);
  for (const surface of surfaces) assert(read(surface).includes(post.id), `${surface} is missing #${post.blogNumber}`);
  for (const match of article.matchAll(/(?:src|href)="(\/[^"?#]+)[^"]*"/g)) {
    const path = match[1];
    if (/\.(?:png|jpe?g|gif|webp|svg|css|js|woff2?)$/.test(path)) {
      assert(existsSync(join(out, path)), `Missing asset ${path}`);
    }
  }
}
const indexedBlogs = (JSON.parse(read('search-index.json')) as Array<{ type: string }>).filter((doc) => doc.type === 'blog');
assert.equal(indexedBlogs.length, (now >= AT_WEBSITE_RELEASE ? 112 : 109) + released.length);
console.log(`${now.toISOString()}: ${indexedBlogs.length} public blogs; ${released.length}/${NEW_BLOG_POSTS.length} new articles released; complete source hashes, metadata, assets, discovery surfaces and hidden-file leak checks passed.`);
