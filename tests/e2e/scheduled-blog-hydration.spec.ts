import { expect, test } from '@playwright/test';

import { NEW_BLOG_POSTS } from '../helpers/newBlogPosts';

import { AT_WEBSITE_RELEASE, WEBSITE_RELEASE_POSTS } from '../helpers/scheduledBlogPosts';

const productionExport = process.env.PW_PRODUCTION_SERVER === 'true';
const buildNow = new Date(process.env.BLOG_SCHEDULE_NOW ?? Date.now());
const released = buildNow >= AT_WEBSITE_RELEASE;
const newPostsReleased = NEW_BLOG_POSTS.filter((post) => new Date(post.publishedAt) <= buildNow);
const visibleCount = (released ? 112 : 109) + newPostsReleased.length;
const latestNumber = visibleCount;
const releasePosts = [
  ...WEBSITE_RELEASE_POSTS.map((post) => ({ ...post, released })),
  ...NEW_BLOG_POSTS.map((post) => ({ ...post, released: new Date(post.publishedAt) <= buildNow })),
];

test.describe('blog publication production hydration', () => {
  test.skip(!productionExport, 'Serves the static export only');

  test('keeps the blog archive aligned with the website publication date after hydration', async ({ page }) => {
    await page.goto('/blog', { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { name: 'The blog for living boldly.' })).toBeVisible();
    await expect(page.getByRole('status')).toHaveText(new RegExp(`${visibleCount} articles`));
    await expect(page.getByText(`#${latestNumber}`)).toBeVisible();
    for (const post of releasePosts) {
      const link = page.locator(`a[href="/blog/${post.id}"]`);
      if (post.released) await expect(link.first()).toBeVisible();
      else await expect(link).toHaveCount(0);
    }
  });

  test('keeps the homepage aligned with the website publication date after hydration', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { name: 'Welcome Home' })).toBeVisible();
    await expect(page.getByRole('link', {
      name: `Read the latest blog post: Blog #${latestNumber}`,
    })).toBeVisible();
    for (const post of releasePosts) {
      const link = page.locator(`a[href="/blog/${post.id}"]`);
      if (post.released && post.blogNumber > latestNumber - 3) await expect(link.first()).toBeVisible();
      else await expect(link).toHaveCount(0);
    }
  });
});
