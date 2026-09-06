import { expect, test } from '@playwright/test';

test.describe('Command palette', () => {
  test('opens from keyboard and supports query input', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    await page.keyboard.press(process.platform === 'darwin' ? 'Meta+K' : 'Control+K');
    await expect(page.locator('[role=\"dialog\"]')).toBeVisible();
    await expect(page.getByPlaceholder('Search recipes, blog posts, speaking events, nutrition...')).toBeVisible();

    await page.getByPlaceholder('Search recipes, blog posts, speaking events, nutrition...').fill('recipes');
    await expect(page.getByRole('dialog').getByRole('option').first()).toBeVisible();
    expect(errors).toEqual([]);
  });
});


test('typing and keyboard navigation work while the palette index is loading', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  let releaseIndex!: () => void;
  const gate = new Promise<void>((resolve) => { releaseIndex = resolve; });
  await page.route('**/search-index.json*', async (route) => {
    await gate;
    await route.fulfill({ json: [{
      id: 'slow-recipe', type: 'recipe', title: 'Everyday Recipes',
      path: '/recipes', summary: 'Simple recipes for everyday meals.',
    }] });
  });
  await page.goto('/');
  await page.keyboard.press(process.platform === 'darwin' ? 'Meta+K' : 'Control+K');
  const dialog = page.getByRole('dialog', { name: 'Search Rebellious Aging' });
  await expect(dialog.getByRole('status')).toContainText('Loading search');
  await dialog.getByRole('combobox').fill('recipes');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowUp');
  expect(errors).toEqual([]);
  await expect(dialog.getByRole('combobox')).toHaveValue('recipes');
  releaseIndex();
  const result = dialog.getByRole('option', { name: /Everyday Recipes/ });
  await expect(result).toBeVisible();
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/recipes\/?$/);
  expect(errors).toEqual([]);
});
