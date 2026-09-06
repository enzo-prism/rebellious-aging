import { expect, test } from '@playwright/test';

test('blog search combines with year filters and resets cleanly', async ({ page }) => {
  await page.goto('/blog', { waitUntil: 'networkidle' });
  const search = page.getByRole('searchbox', { name: 'Search articles' });
  await search.fill('What is on Your Plate');
  await expect(page.getByRole('status')).toHaveText('1 article');
  await page.getByRole('radio', { name: '2026', exact: true }).click();
  await expect(page.getByText('No articles match your search.', { exact: false })).toBeVisible();
  await page.getByRole('button', { name: 'Clear filters', exact: true }).click();
  await expect(search).toHaveValue('');
  await expect(page.locator('article').first()).toBeVisible();
});

test('recipe cooking tools preserve readable ingredients and support printing', async ({ page }) => {
  await page.goto('/recipes/orange-mango-bean-salad', { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: 'Jump to recipe' }).click();
  await expect(page).toHaveURL(/#recipe-instructions$/);
  const ingredient = page.locator('#recipe-instructions input[type="checkbox"]').first();
  await ingredient.check();
  await expect(ingredient).toBeChecked();
  await ingredient.uncheck();
  await expect(ingredient).not.toBeChecked();
  await page.evaluate(() => { window.print = () => { document.body.dataset.printRequested = 'true'; }; });
  await page.getByRole('button', { name: 'Print recipe' }).click();
  await expect(page.locator('body')).toHaveAttribute('data-print-requested', 'true');
  await page.emulateMedia({ media: 'print' });
  await expect(page.getByRole('button', { name: 'Print recipe' })).toBeHidden();
  await expect(page.locator('#recipe-instructions')).toBeVisible();
});


test('mobile recipes use a compact category selector and recover all results', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/recipes', { waitUntil: 'networkidle' });
  const category = page.getByRole('combobox', { name: 'Recipe category' });
  await expect(category).toBeVisible();
  await category.selectOption('soups');
  await expect(page.getByRole('heading', { name: 'Big Bean Barley and Sweet Potato Soup', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Raw Blueberry Cheesecake', exact: true })).toHaveCount(0);
  await category.selectOption('all');
  await expect(page.getByRole('heading', { name: 'Raw Blueberry Cheesecake', exact: true })).toBeVisible();
});
