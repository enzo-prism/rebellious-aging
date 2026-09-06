import { expect, test } from '@playwright/test';

test('reading supports zoom and shows story content with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/our-story');
  await expect(page.getByRole('heading', { name: 'About Rebellious Aging', exact: true })).toBeVisible();
  const reading = await page.locator('body').evaluate((body) => ({
    touchAction: getComputedStyle(body).touchAction,
    hiddenContent: Array.from(document.querySelectorAll('main .animate-on-scroll, main .animate-slide-left, main .animate-slide-right')).filter((element) => getComputedStyle(element).opacity === '0').length,
    moving: document.getAnimations().filter((animation) => animation.playState === 'running' && animation.effect?.getTiming().iterations === Infinity).length,
  }));
  expect(reading.touchAction).toContain('pinch-zoom');
  expect(reading.hiddenContent).toBe(0);
  expect(reading.moving).toBe(0);
});

test('share dialog fits a short viewport and has an accessible close target', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 480 });
  await page.goto('/blog');
  await page.getByRole('button', { name: 'Share page', exact: true }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  const box = await dialog.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.y).toBeGreaterThanOrEqual(0);
  expect(box!.y + box!.height).toBeLessThanOrEqual(480);
  const close = dialog.getByRole('button', { name: 'Close', exact: true }).last();
  // Wait for the opening transform to settle before measuring its hit area.
  await expect.poll(async () => {
    const closeBox = await close.boundingBox();
    return closeBox ? Math.min(closeBox.width, closeBox.height) : 0;
  }).toBeGreaterThanOrEqual(44);
  await close.click();
  await expect(dialog).not.toBeVisible();
});

test('contact offers direct email and a form fallback before an embed loads', async ({ page }) => {
  await page.goto('/contact');
  await expect(page.getByRole('link', { name: 'suz@rebelwithsuz.com', exact: true }).first()).toHaveAttribute('href', 'mailto:suz@rebelwithsuz.com');
  await expect(page.getByRole('link', { name: 'Open the contact form in a new tab' })).toHaveAttribute('href', 'https://fxuqp40sseh.typeform.com/to/DbY1YJrs');
  await expect(page.getByRole('link', { name: /Join the Facebook group/ }).first()).toBeVisible();
});

test('printed articles retain their page heading while site chrome is hidden', async ({ page }) => {
  await page.goto('/blog');
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('main h1')).toBeVisible();
  await expect(page.locator('header:has(+ #main-content)')).toBeHidden();
  await expect(page.locator('#main-content + footer')).toBeHidden();
});
