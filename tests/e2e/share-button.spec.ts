import { expect, test } from '@playwright/test';

const shareRoutes = [
  '/',
  '/blog',
  '/blog/rebellious-guide-what-is-on-your-plate',
  '/recipes/orange-mango-bean-salad',
  '/pillars/health',
  '/contact',
];

test.describe('Universal share button', () => {
  for (const path of shareRoutes) {
    test(`renders the share button on ${path}`, async ({ page }) => {
      const response = await page.goto(path, { waitUntil: 'domcontentloaded' });
      expect(response?.status()).toBe(200);
      await expect(page.getByRole('button', { name: /share page/i })).toBeVisible();
    });
  }

  test('shows and copies the exact live URL, including query params', async ({ page }) => {
    await page.goto('/nutrition?tab=benefits', { waitUntil: 'domcontentloaded' });

    await page.evaluate(() => {
      let copiedText = '';

      Object.defineProperty(window, '__copiedText', {
        configurable: true,
        get: () => copiedText,
        set: (value: string) => {
          copiedText = value;
        },
      });

      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: {
          writeText: async (text: string) => {
            (window as typeof window & { __copiedText: string }).__copiedText = text;
          },
        },
      });
    });

    await page.getByRole('button', { name: /share page/i }).click();

    const urlField = page.getByLabel('Page link');
    await expect(urlField).toHaveValue(page.url());

    await page.getByRole('button', { name: /copy url/i }).click();
    await expect(page.getByRole('dialog').getByText('Copied to clipboard.')).toBeVisible();

    const copiedText = await page.evaluate(
      () => (window as typeof window & { __copiedText: string }).__copiedText
    );
    expect(copiedText).toBe(page.url());
  });
});
