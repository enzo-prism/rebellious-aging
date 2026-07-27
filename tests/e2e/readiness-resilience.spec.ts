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

  test('quiz block shows fallback form when embed script fails', async ({ page }) => {
    let embedRequestBlocked = false;
    await page.route('https://embed.typeform.com/next/embed.js*', (route) => {
      embedRequestBlocked = true;
      void route.abort();
    });
    await page.goto('/pillars/health');

    await page.getByRole('button', { name: 'Load Quiz' }).click();
    await expect(
      page.getByText('Please use the fallback form below.')
    ).toBeVisible({ timeout: 10000 });
    expect(embedRequestBlocked).toBe(true);
  });
});
