import { expect, test } from '@playwright/test';

const normalizePath = (href: string) => {
  if (href.startsWith('mailto:') || href.startsWith('tel:')) {
    return null;
  }

  if (!href.startsWith('/')) {
    return null;
  }

  return href.split('?')[0];
};

test.describe('Navigation readiness', () => {
  test('top-level navigation links resolve to working routes', async ({ page, request }) => {
    await page.goto('/');
    const internalLinks = await page
      .locator('header a[href], footer a[href]')
      .evaluateAll((anchors: HTMLAnchorElement[]) =>
        Array.from(anchors, (anchor) => anchor.getAttribute('href')).filter((href): href is string => Boolean(href))
      );

    const paths = Array.from(
      new Set(
        internalLinks
          .map((href) => normalizePath(href))
          .filter((path): path is string => Boolean(path) && path.length > 0)
      )
    );

    const routesToCheck = paths.filter((path) => path !== '/404');

    for (const path of routesToCheck) {
      const response = await request.get(path);
      expect(response.status(), `${path} should return 2xx`).toBeLessThan(400);
      expect(response.status(), `${path} should be a successful route`).toBeGreaterThanOrEqual(200);
    }
  });
});
