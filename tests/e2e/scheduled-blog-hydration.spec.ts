import { expect, test } from '@playwright/test';

import { SCHEDULED_BLOG_POSTS } from '../helpers/scheduledBlogPosts';

const productionExport = process.env.PW_PRODUCTION_SERVER === 'true';

test.describe('scheduled blog production hydration', () => {
  test.skip(!productionExport, 'Serves the static export only');

  test('keeps future posts out of /blog after hydration', async ({ page }) => {
    await page.goto('/blog', { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { name: 'The blog for living boldly.' })).toBeVisible();
    await expect(page.getByRole('status')).toHaveText(/109 articles/);
    await expect(page.getByText('#109')).toBeVisible();
    for (const post of SCHEDULED_BLOG_POSTS) {
      await expect(page.getByRole('link', { name: post.title })).toHaveCount(0);
      await expect(page.locator(`a[href="/blog/${post.id}"]`)).toHaveCount(0);
    }
  });

  test('keeps future posts off the homepage after hydration', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { name: 'Welcome Home' })).toBeVisible();
    await expect(page.getByRole('link', { name: /Blog #109/ })).toBeVisible();
    for (const post of SCHEDULED_BLOG_POSTS) {
      await expect(page.getByRole('link', { name: post.title })).toHaveCount(0);
      await expect(page.locator(`a[href="/blog/${post.id}"]`)).toHaveCount(0);
      await expect(page.getByText(`Blog #${post.blogNumber}`)).toHaveCount(0);
    }
  });
});
