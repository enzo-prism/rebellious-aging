import { expect, test } from '@playwright/test';

import { AT_WEBSITE_RELEASE, WEBSITE_RELEASE_POSTS } from '../helpers/scheduledBlogPosts';

const productionExport = process.env.PW_PRODUCTION_SERVER === 'true';
const buildNow = new Date(process.env.BLOG_SCHEDULE_NOW ?? Date.now());
const released = buildNow >= AT_WEBSITE_RELEASE;

test.describe('blog publication production hydration', () => {
  test.skip(!productionExport, 'Serves the static export only');

  test('keeps the blog archive aligned with the website publication date after hydration', async ({ page }) => {
    await page.goto('/blog', { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { name: 'The blog for living boldly.' })).toBeVisible();
    await expect(page.getByRole('status')).toHaveText(released ? /112 articles/ : /109 articles/);
    await expect(page.getByText(released ? '#112' : '#109')).toBeVisible();
    for (const post of WEBSITE_RELEASE_POSTS) {
      const link = page.locator(`a[href="/blog/${post.id}"]`);
      if (released) await expect(link.first()).toBeVisible();
      else await expect(link).toHaveCount(0);
    }
  });

  test('keeps the homepage aligned with the website publication date after hydration', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { name: 'Welcome Home' })).toBeVisible();
    await expect(page.getByRole('link', {
      name: `Read the latest blog post: Blog #${released ? 112 : 109}`,
    })).toBeVisible();
    for (const post of WEBSITE_RELEASE_POSTS) {
      const link = page.locator(`a[href="/blog/${post.id}"]`);
      if (released) await expect(link.first()).toBeVisible();
      else await expect(link).toHaveCount(0);
    }
  });
});
