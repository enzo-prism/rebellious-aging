import { expect, test } from '@playwright/test';

test.use({ viewport: { width: 390, height: 844 } });

test('site search keeps its query and type when returning from a result', async ({ page }) => {
  await page.goto('/search');
  const input = page.getByRole('searchbox', { name: 'Search site content' });
  await input.fill('nutrition');
  await page.getByRole('button', { name: 'Filter by type', exact: true }).click();
  await page.getByRole('button', { name: 'Blog', exact: true }).click();
  const result = page.locator('main a[href^="/blog/"]').first();
  await expect(result).toBeVisible();
  const href = await result.getAttribute('href');
  const searchUrl = page.url();
  expect(new URL(searchUrl).searchParams.get('q')).toBe('nutrition');
  expect(new URL(searchUrl).searchParams.getAll('type')).toEqual(['blog']);
  await result.click();
  await expect(page).toHaveURL(new RegExp(`${href}/?$`));
  await page.goBack();
  await expect(page).toHaveURL(searchUrl);
  await expect(input).toHaveValue('nutrition');
  await expect(page.getByRole('button', { name: 'Filter by type (1)' })).toBeVisible();
  await page.goForward();
  await expect(page).toHaveURL(new RegExp(`${href}/?$`));
});

test('blog query and year survive article navigation, Back, and reload', async ({ page }) => {
  await page.goto('/blog');
  const input = page.getByRole('searchbox', { name: 'Search articles' });
  await input.fill('What is on Your Plate');
  await page.getByRole('radio', { name: '2025', exact: true }).click();
  await expect(page.locator('article')).toHaveCount(1);
  const url = page.url();
  expect(new URL(url).searchParams.get('year')).toBe('2025');
  await page.locator('article a').click();
  await expect(page).toHaveURL(/\/blog\/rebellious-guide-what-is-on-your-plate\/?$/);
  await page.goBack();
  await expect(input).toHaveValue('What is on Your Plate');
  await expect(page.getByRole('radio', { name: '2025', exact: true })).toHaveAttribute('aria-checked', 'true');
  await page.reload();
  await expect(page).toHaveURL(url);
  await expect(page.locator('article')).toHaveCount(1);
});

test('recipe search, category, tags, and sorting survive a recipe and Back', async ({ page }) => {
  await page.goto('/recipes');
  const input = page.getByRole('searchbox', { name: 'Search recipes' });
  await input.fill('bean');
  await page.getByRole('combobox', { name: 'Recipe category' }).selectOption('soups');
  await page.getByText('More filters', { exact: true }).click();
  await page.getByRole('button', { name: 'Dinner', exact: true }).click();
  await page.getByRole('combobox', { name: 'Sort by' }).click();
  await page.getByRole('option', { name: 'A - Z' }).click();
  const url = page.url();
  const params = new URL(url).searchParams;
  expect(params.get('q')).toBe('bean');
  expect(params.get('category')).toBe('soups');
  expect(params.getAll('tag')).toEqual(['Dinner']);
  expect(params.get('sort')).toBe('alpha');
  await page.locator('main a[href^="/recipes/"]').first().click();
  await expect(page).toHaveURL(/\/recipes\/.+/);
  await page.goBack();
  await expect(page).toHaveURL(url);
  await expect(input).toHaveValue('bean');
  await expect(page.getByRole('combobox', { name: 'Recipe category' })).toHaveValue('soups');
  await expect(page.getByRole('combobox', { name: 'Sort by' })).toHaveText('A - Z');
  await expect(page.getByText('More filters (1 selected)', { exact: true })).toBeVisible();
});

test('shared query URLs initialize filters without adding history entries while typing', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error' && /hydration|server rendered/i.test(message.text())) errors.push(message.text()); });
  await page.addInitScript(() => localStorage.setItem('ra-recent-searches', JSON.stringify(['confidence'])));
  await page.goto('/recipes?q=bean&category=soups&tag=Dinner&sort=alpha');
  await expect(page.getByRole('searchbox', { name: 'Search recipes' })).toHaveValue('bean');
  await expect(page.getByRole('combobox', { name: 'Recipe category' })).toHaveValue('soups');
  await expect(page.getByRole('combobox', { name: 'Sort by' })).toHaveText('A - Z');
  await page.goto('/search?q=nutrition&type=recipe');
  await expect(page.getByRole('searchbox')).toHaveValue('nutrition');
  await expect(page.getByRole('button', { name: 'Filter by type (1)' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'confidence', exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('button', { name: 'confidence', exact: true })).toBeVisible();
  const historyLength = await page.evaluate(() => history.length);
  await page.getByRole('searchbox').fill('');
  await page.getByRole('searchbox').pressSequentially('nutrition guide');
  expect(await page.evaluate(() => history.length)).toBe(historyLength);
  expect(new URL(page.url()).searchParams.get('q')).toBe('nutrition guide');
  expect(errors).toEqual([]);
});
