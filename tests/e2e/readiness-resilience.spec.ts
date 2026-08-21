import { expect, test } from '@playwright/test';

test.describe('Resilience readiness', () => {
  test('search page surfaces fallback state when search index is unavailable', async ({ page }) => {
    await page.route('**/search-index.json*', (route) => {
      void route.fulfill({
        status: 503,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'search index unavailable' }),
      });
    });

    await page.goto('/search');

    await expect(page.getByPlaceholder('Search blog, pillars, speaking events, nutrition guide…')).toBeVisible();
    await expect(page.getByText(/Unable to load search index/)).toBeVisible({ timeout: 10000 });
  });

  test('pillar quizzes stay retired while private contact remains available', async ({ page }) => {
    for (const path of ['/pillars/confidence', '/pillars/style', '/pillars/health']) {
      await page.goto(path);
      await expect(page.getByRole('button', { name: 'Load Quiz' })).toHaveCount(0);
      await expect(page.getByRole('link', { name: 'suz@rebelwithsuz.com' })).toHaveAttribute(
        'href',
        'mailto:suz@rebelwithsuz.com'
      );
    }
  });

  test('Facebook group page shows the editable monthly highlights without private details', async ({ page }) => {
    await page.goto('/facebook-group');

    await expect(page.getByRole('heading', { name: "What We're Spotlighting" })).toBeVisible();
    await expect(page.getByText('August 2026')).toBeVisible();
    await expect(page.getByText(/Member names, stories, and conversations stay inside the group/)).toBeVisible();
  });
});
