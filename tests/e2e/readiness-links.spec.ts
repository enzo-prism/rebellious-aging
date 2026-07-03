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

  test('the-talk video and free downloadable resources point to working assets', async ({ page, request }) => {
    await page.goto('/the-talk');

    await expect(page.getByRole('link', { name: /Watch on YouTube/i })).toHaveAttribute(
      'href',
      'https://www.youtube.com/watch?v=vGDZRW8FTWw'
    );

    const expectedResourceLinks = [
      'https://esselstynfamilyfoundation.org/ef-content/uploads/2022/06/PB-jumpstart-guide.pdf',
      'https://nutritionstudies.s3.us-east-2.amazonaws.com/resources/CNS_Whole_Food_Plant-Based_Guide.pdf',
      '/resources/suz-plant-based-starter.pdf',
    ];

    for (const href of expectedResourceLinks) {
      await expect(page.locator(`a[href="${href}"]`).first(), `${href} should be linked`).toBeVisible();
    }

    const localPdfResponse = await request.get('/resources/suz-plant-based-starter.pdf');
    expect(localPdfResponse.status(), 'Suz starter PDF should resolve locally').toBe(200);
    expect(localPdfResponse.headers()['content-type'] ?? '').toContain('application/pdf');
  });
});
