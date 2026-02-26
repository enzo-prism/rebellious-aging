import { expect, test } from '@playwright/test';

test.describe('Resilience readiness', () => {
  test('search page surfaces fallback state when search index is unavailable', async ({ page }) => {
    const isolatedPage = await page.context().newPage();

    await isolatedPage.route('**/search-index.json*', (route) => {
      void route.fulfill({
        status: 503,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'search index unavailable' }),
      });
    });

    await isolatedPage.goto('/search');

    await expect(isolatedPage.getByPlaceholder('Search blog, pillars, nutrition guide, video series…')).toBeVisible();
    await expect(isolatedPage.getByText(/Unable to load search index/)).toBeVisible({ timeout: 10000 });
    await isolatedPage.close();
  });

test('quiz block shows fallback form when embed script fails', async ({ page }) => {
    const isolatedPage = await page.context().newPage();
    await isolatedPage.route('https://embed.typeform.com/next/embed.js', (route) => route.abort());
    await isolatedPage.goto('/pillars/health');

    await isolatedPage.getByRole('button', { name: 'Load Quiz' }).click();
    await expect(
      isolatedPage.getByText('Please use the fallback form below.')
    ).toBeVisible({ timeout: 10000 });
    await isolatedPage.close();
  });
});
