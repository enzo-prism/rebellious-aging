import { expect, test } from '@playwright/test';

const routeMatrix = [
  '/',
  '/our-story',
  '/welcome-letter',
  '/starter-kit',
  '/nutrition',
  '/video-series',
  '/recipes',
  '/blog',
  '/contact',
  '/pillars/health',
  '/pillars/style',
  '/pillars/confidence',
  '/pillars/gratitude',
  '/pillars/health/nutrition-guide',
  '/search',
];

const dynamicChecks = [
  { path: '/blog/rebellious-guide-what-is-on-your-plate', found: true },
  { path: '/recipes/orange-mango-bean-salad', found: true },
  { path: '/blog/ultra-processed-trap-eat-whole-live-whole', found: true },
  { path: '/recipes/kale-and-red-cabbage-salad-with-apples-and-dried-cherries', found: true },
  { path: '/recipes/big-bean-barley-and-sweet-potato-soup', found: true },
];

test.describe('Public route matrix', () => {
  for (const path of routeMatrix) {
    test(`renders ${path} successfully`, async ({ page }) => {
      const response = await page.goto(path, { waitUntil: 'domcontentloaded' });
      expect(response?.status()).toBe(200);
      await expect(page.getByRole('heading').first()).toBeVisible();
      await expect(page).toHaveTitle(/Rebellious Aging|Age Boldly/i);
    });
  }

  for (const { path } of dynamicChecks) {
    test(`handles dynamic/edge route ${path}`, async ({ page }) => {
      const response = await page.goto(path, { waitUntil: 'domcontentloaded' });
      expect(response?.status()).toBe(200);
      await expect(page.locator('main')).toBeVisible();
    });
  }

  test('renders legacy not-found route', async ({ page }) => {
    const response = await page.goto('/404', { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(404);
    await expect(page.locator('main')).toBeVisible();
    await expect(page.getByText(/Not Found/i)).toBeVisible();
  });

  test('returns 404 for unknown static routes', async ({ page }) => {
    const missing = ['/does-not-exist', '/totally-missing-route'];
    for (const path of missing) {
      const response = await page.goto(path, { waitUntil: 'domcontentloaded' });
      expect(response?.status()).toBe(404);
      await expect(page.locator('main')).toBeVisible();
    }
  });
});
