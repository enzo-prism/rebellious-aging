import { expect, test } from '@playwright/test';

test('mobile search is visible and returns focus after Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Open search' });
  await expect(trigger).toBeVisible();
  await trigger.click();
  await expect(page.getByRole('dialog', { name: 'Search Rebellious Aging' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
  await expect(page.locator('body')).not.toHaveAttribute('data-scroll-locked');
});

test('resizing an open mobile menu releases modal focus and scroll locking', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open menu' }).click();
  await expect(page.getByRole('dialog', { name: 'Mobile menu' })).toBeVisible();
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.getByRole('dialog', { name: 'Mobile menu' })).toHaveCount(0);
  await expect(page.locator('body')).not.toHaveAttribute('data-scroll-locked');
  await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('button', { name: 'Search', exact: true })).toBeFocused();
});

test('desktop More menu can scroll to its final destination in a short viewport', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 600 });
  await page.goto('/');
  await page.getByRole('button', { name: 'More', exact: true }).click();
  const contact = page.getByRole('menuitem', { name: /Contact/ });
  await contact.scrollIntoViewIfNeeded();
  await contact.click();
  await expect(page).toHaveURL(/\/contact\/?$/);
});

test('query URLs populate after a delayed cold search index loads', async ({ page }) => {
  let releaseIndex!: () => void;
  const gate = new Promise<void>((resolve) => { releaseIndex = resolve; });
  await page.route('**/search-index.json*', async (route) => {
    await gate;
    await route.fulfill({ json: [{
      id: 'cold-index-guide', type: 'resource', title: 'Nutrition for Everyday Life',
      path: '/nutrition', summary: 'A practical nutrition guide.', content: 'nutrition',
    }] });
  });
  await page.goto('/search?q=nutrition');
  await expect(page.getByText('Loading search results…')).toBeVisible();
  releaseIndex();
  await expect(page.getByRole('heading', { name: 'Nutrition for Everyday Life' })).toBeVisible();
});


test('search shortcut replaces an open mobile drawer instead of stacking dialogs', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.keyboard.press(process.platform === 'darwin' ? 'Meta+K' : 'Control+K');
  await expect(page.getByRole('dialog', { name: 'Mobile menu' })).toHaveCount(0);
  const search = page.getByRole('dialog', { name: 'Search Rebellious Aging' });
  await expect(search).toBeVisible();
  await expect(search.getByRole('combobox')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Open search' })).toBeFocused();
});
