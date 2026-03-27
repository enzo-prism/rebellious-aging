import { expect, test } from '@playwright/test';

const shareRoutes = [
  '/',
  '/blog',
  '/blog/rebellious-guide-what-is-on-your-plate',
  '/dr-seuss',
  '/recipes/orange-mango-bean-salad',
  '/pillars/health',
  '/speaking-events/eat-for-the-earth-santa-cruz',
  '/contact',
  '/team',
];

test.describe('Universal share button', () => {
  for (const path of shareRoutes) {
    test(`opens the share dialog on ${path}`, async ({ page }) => {
      const response = await page.goto(path, { waitUntil: 'domcontentloaded' });
      expect(response?.status()).toBe(200);

      const shareButton = page.getByRole('button', { name: /share page/i });
      await expect(shareButton).toBeVisible();

      await shareButton.click();

      const dialog = page.getByRole('dialog');
      await expect(dialog).toBeVisible();
      await expect(dialog.getByText('Share this page')).toBeVisible();
      await expect(dialog.getByLabel('Page link')).toHaveValue(page.url());

      await dialog.getByRole('button', { name: /^close$/i }).first().click();
      await expect(dialog).not.toBeVisible();
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
