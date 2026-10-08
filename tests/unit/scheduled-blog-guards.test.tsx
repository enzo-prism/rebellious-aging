import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { generateStaticParams } from '../../app/blog/[postId]/page';
import buildSitemap from '../../app/sitemap';
import { buildSearchIndex } from '../../scripts/build-search-index';
import { buildLlmsText } from '../../scripts/generate-llms';
import { getVisibleBlogPosts } from '@/data/blogPosts';
import { resetBlogScheduleNowForTests } from '@/lib/blogSchedule';
import BlogPost from '@/views/BlogPost';
import {
  AT_NOV_10,
  BEFORE_NOV_10,
  productionEnv,
  SCHEDULED_BLOG_POSTS,
} from '../helpers/scheduledBlogPosts';

beforeEach(() => {
  resetBlogScheduleNowForTests();
  process.env.BLOG_SCHEDULE_NOW = BEFORE_NOV_10.toISOString();
  delete process.env.VERCEL_ENV;
  delete process.env.NEXT_PUBLIC_VERCEL_ENV;
  delete process.env.SHOW_SCHEDULED_POSTS;
});

const readSource = (relativePath: string) =>
  readFileSync(join(process.cwd(), relativePath), 'utf8');

const collectFiles = (directory: string, collected: string[] = []): string[] => {
  for (const entry of readdirSync(directory)) {
    const fullPath = join(directory, entry);
    if (statSync(fullPath).isDirectory()) {
      collectFiles(fullPath, collected);
      continue;
    }
    if (/\.(tsx?|jsx?)$/.test(entry)) {
      collected.push(fullPath);
    }
  }
  return collected;
};

const clientComponentFiles = () =>
  collectFiles(join(process.cwd(), 'src')).filter((file) => {
    const source = readFileSync(file, 'utf8');
    return /['"]use client['"]/.test(source) || file.endsWith('LatestBlogBadge.tsx');
  });

describe('scheduled blog production guards', () => {
  it('keeps generateStaticParams on the visible-post helper so unfiltered catalog params fail', () => {
    const pageSource = readSource('app/blog/[postId]/page.tsx');
    expect(pageSource).toMatch(/getVisibleBlogPosts\(\)/);
    expect(pageSource).not.toMatch(/blogPosts\.map/);

    const params = generateStaticParams();
    const ids = params.map((entry) => entry.postId);
    for (const post of SCHEDULED_BLOG_POSTS) {
      expect(ids).not.toContain(post.id);
    }
    expect(ids).toContain('the-fence-has-a-gate');
  });

  it('keeps notFound calls on the post route for hidden slugs', () => {
    const pageSource = readSource('app/blog/[postId]/page.tsx');
    expect(pageSource.match(/notFound\(\)/g)?.length).toBeGreaterThanOrEqual(2);
    expect(pageSource).toMatch(/isVisibleBlogPost\(post\)/);
  });

  it('filters sitemap, search-index, and llms.txt through the public visibility helper', () => {
    expect(readSource('app/sitemap.ts')).toMatch(/getPublicBlogPosts\(\)/);
    expect(readSource('scripts/generate-llms.ts')).toMatch(/getPublicBlogPosts\(\)/);
    expect(readSource('scripts/build-search-index.ts')).toMatch(/getPublicBlogPosts\(\)/);
    expect(readSource('scripts/prerender.tsx')).toMatch(/getVisibleBlogPosts\(\)/);

    const sitemap = buildSitemap().map((entry) => entry.url).join('\n');
    const search = JSON.stringify(buildSearchIndex());
    const llms = buildLlmsText();
    for (const post of SCHEDULED_BLOG_POSTS) {
      expect(sitemap).not.toContain(post.id);
      expect(search).not.toContain(post.id);
      expect(search).not.toContain(post.title);
      expect(llms).not.toContain(post.id);
      expect(llms).not.toContain(post.title);
    }
  });

  it('does not treat a VERCEL_ENV-only production read as fail-open', () => {
    const scheduleSource = readSource('src/lib/blogSchedule.ts');
    expect(scheduleSource).not.toMatch(/vercelEnv !== ['"]production['"]/);
    expect(
      getVisibleBlogPosts({ env: { VERCEL_ENV: 'production' }, now: BEFORE_NOV_10 })
        .map((post) => post.id)
    ).not.toEqual(expect.arrayContaining(SCHEDULED_BLOG_POSTS.map((post) => post.id)));
    expect(
      getVisibleBlogPosts({ env: productionEnv, now: AT_NOV_10 }).map((post) => post.id)
    ).toContain('a-boundary-is-not-an-argument');
    expect(
      getVisibleBlogPosts({ env: productionEnv, now: AT_NOV_10 }).map((post) => post.id)
    ).not.toContain('enough-according-to-whom');
  });

  it('keeps the BlogPost visibility guard so a removed check renders the not-found page', () => {
    expect(readSource('src/views/BlogPost.tsx')).toMatch(/isVisibleBlogPost\(currentPost\)/);
    const { getByRole, unmount } = render(<BlogPost postId="enough-according-to-whom" />);
    expect(getByRole('heading', { name: /Blog Post Not Found/i })).toBeTruthy();
    unmount();
  });

  it('keeps client listing views free of the catalog and schedule modules', () => {
    const listingFiles = [
      'src/views/Blog.tsx',
      'src/views/Home.tsx',
      'src/components/home/LatestBlogBadge.tsx',
    ];
    for (const file of listingFiles) {
      const source = readSource(file);
      expect(source).not.toMatch(/from ['"]@\/data\/blogPosts['"]/);
      expect(source).not.toMatch(/from ['"]@\/lib\/blogSchedule['"]/);
    }
    for (const file of clientComponentFiles()) {
      const source = readFileSync(file, 'utf8');
      expect(source, file).not.toMatch(/from ['"]@\/data\/blogPosts['"]/);
      expect(source, file).not.toMatch(/from ['"]@\/lib\/blogSchedule['"]/);
    }
  });

  it('keeps the committed SEO audit free of unpublished slugs', () => {
    const audit = readSource('public/seo-route-audit.json');
    for (const post of SCHEDULED_BLOG_POSTS) {
      expect(audit).not.toContain(post.id);
      expect(audit).not.toContain(post.title);
    }
  });
});
