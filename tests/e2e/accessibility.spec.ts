import { expect, test, type Page } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

const criticalRoutes = ['/', '/search', '/recipes', '/blog', '/contact', '/pillars/health', '/404'];
const gotoWithRetry = async (page: Page, path: string) => {
  const expectedStatus = path === '/404' ? 404 : 200;
  let response = await page.goto(path, { waitUntil: 'domcontentloaded' });

  for (let attempt = 0; attempt < 2 && response?.status() !== expectedStatus; attempt += 1) {
    await page.waitForTimeout(500);
    response = await page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  expect(response?.status()).toBe(expectedStatus);
};

test.describe('Accessibility smoke', () => {
  for (const path of criticalRoutes) {
    test(`run axe on ${path}`, async ({ page }) => {
      await gotoWithRetry(page, path);
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      const blockingViolations = results.violations.filter(
        (violation) => violation.impact === 'critical' || violation.impact === 'serious'
      );

      expect(blockingViolations).toHaveLength(0);
    });
  }

  test('run axe on the open share dialog', async ({ page }) => {
    await gotoWithRetry(page, '/blog');
    await expect(page.locator('main')).toBeVisible();
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: /share page/i }).click();
    await expect(page.getByRole('dialog')).toBeVisible();

    const results = await new AxeBuilder({ page })
      .include('[role="dialog"]')
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const blockingViolations = results.violations.filter(
      (violation) => violation.impact === 'critical' || violation.impact === 'serious'
    );

    expect(blockingViolations).toHaveLength(0);
  });
});
