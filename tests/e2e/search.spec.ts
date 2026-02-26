import { expect, test } from '@playwright/test';

test.describe('Search page quality', () => {
  test('shows empty state for no matches and recovers', async ({ page }) => {
    await page.goto('/search');
    const searchInput = page.getByPlaceholder('Search blog, pillars, nutrition guide, video series…');

    await searchInput.fill('zzqpx9fj2k1');
    await page.keyboard.press('Tab');

    await expect(page.getByText('No results yet')).toBeVisible();
    await expect(page.getByText('Try a different keyword')).toBeVisible();

    await searchInput.fill('nutrition');
    await expect(
      page.locator('p.text-sm.text-muted-foreground').filter({ hasText: /^Showing \d+ results?/ })
    ).toBeVisible();
  });

  test('toggles category filter chips', async ({ page }) => {
    await page.goto('/search');
    await page.getByPlaceholder('Search blog, pillars, nutrition guide, video series…').fill('nutrition');
    await page.locator('form').getByText('Blog', { exact: true }).click();

    const resultCount = page.locator('p.text-sm.text-muted-foreground').filter({ hasText: /^Showing \d+ results?/ });
    const noResultsState = page.getByText('No results yet');

    await expect(resultCount.or(noResultsState)).toBeVisible({ timeout: 5000 });
  });
});
