import { expect, test } from '@playwright/test';

test.describe('Command palette', () => {
  test('opens from keyboard and supports query input', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    await page.keyboard.press(process.platform === 'darwin' ? 'Meta+K' : 'Control+K');
    await expect(page.locator('[role=\"dialog\"]')).toBeVisible();
    await expect(page.getByPlaceholder('Search recipes, blog posts, pillars, nutrition...')).toBeVisible();

    await page.getByPlaceholder('Search recipes, blog posts, pillars, nutrition...').fill('recipes');
    await expect(page.locator('body')).toContainText(/Recipes|recipe/i);
  });
});
