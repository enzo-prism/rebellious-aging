import { expect, test } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

const criticalRoutes = ['/', '/search', '/recipes', '/blog', '/contact', '/pillars/health', '/404'];

test.describe('Accessibility smoke', () => {
  for (const path of criticalRoutes) {
    test(`run axe on ${path}`, async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      const blockingViolations = results.violations.filter(
        (violation) => violation.impact === 'critical' || violation.impact === 'serious'
      );

      expect(blockingViolations).toHaveLength(0);
    });
  }
});
