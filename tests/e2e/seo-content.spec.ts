import { expect, test } from '@playwright/test';

test.describe('Search-readable content without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('nutrition explains the topic and answers questions in the initial HTML', async ({ page }) => {
    await page.goto('/nutrition');
    await expect(page.getByRole('heading', { level: 1, name: 'Whole-Food, Plant-Based Nutrition' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'What is Whole-Food, Plant-Based Nutrition?', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'How is whole-food, plant-based eating different from vegan eating?' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Read the whole-food, plant-based guide', exact: true })).toHaveAttribute('href', '/pillars/health/nutrition-guide');
    await expect(page.getByText('Loading nutrition page…')).toHaveCount(0);
  });

  test('the homepage has readable community answers', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'What is Rebellious Aging?', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'How can I join the community?' })).toBeVisible();
  });

  test('Suz’s story remains visible when animation scripts cannot run', async ({ page }) => {
    await page.goto('/our-story');
    const title = page.getByRole('heading', { name: 'About Rebellious Aging', exact: true });
    await expect(title).toBeVisible();
    await expect(title).toHaveCSS('opacity', '1');
    await expect(page.locator('#suz')).toBeVisible();
  });

  test('articles expose their author, publication date and breadcrumbs', async ({ page }) => {
    await page.goto('/blog/a-marker-beside-the-road');
    await expect(page.locator('article a[rel="author"]')).toHaveAttribute('href', '/our-story#suz');
    await expect(page.locator('article time')).toHaveAttribute('datetime', '2026-08-31');
    await expect(page.getByRole('navigation', { name: 'Breadcrumb', exact: true })).toBeVisible();
    await expect(page.locator('article')).toContainText('At Blog 100, Suz pauses to honor the distance traveled');
  });
});
