import { expect, test } from '@playwright/test';

import { LIVE_LOUD_HAT_FORMSPREE_ENDPOINT } from '../../src/lib/constants';

test.describe('Live Loud hat waitlist', () => {
  test('renders the invite-only page and posts to Formspree', async ({ page }) => {
    let postedBody: Record<string, string> | null = null;

    await page.route('https://formspree.io/f/**', async (route) => {
      postedBody = route.request().postDataJSON() as Record<string, string>;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true }),
      });
    });

    const response = await page.goto('/live-loud-hat', { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1, name: 'The Rebellious Aging hats' })).toBeVisible();
    await expect(page.getByRole('button', { name: /share page/i })).toBeVisible();
    await expect(page.getByText(/Invite-only waitlist/i).first()).toBeVisible();

    // Both real hats are shown, and every hat photo actually loads.
    const hatImages = page.locator('img[src^="/hats/"]');
    await expect(hatImages.first()).toBeVisible();
    for (const img of await hatImages.all()) {
      await img.scrollIntoViewIfNeeded();
      await expect
        .poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0))
        .toBe(true);
    }

    // Choosing a style from its card scrolls to the form with that hat preselected.
    await page.getByRole('link', { name: 'Request the R hat' }).click();
    await expect(page.getByRole('radio', { name: /The R/ })).toBeChecked();

    await page.getByRole('textbox', { name: 'Name' }).fill('Playwright Neighbor');
    await page.getByRole('textbox', { name: 'Email', exact: true }).fill('playwright@example.com');
    await page.getByRole('textbox', { name: /City/ }).fill('Santa Cruz');
    await page
      .getByLabel('Why you, or how you found Rebellious Aging')
      .fill('Saw the green hat on a walk and asked about the next batch.');
    await page.getByLabel(/Size note/).fill('I like a looser fit');
    await page.getByRole('button', { name: 'Request the next batch' }).click();

    await expect(page.getByRole('status')).toContainText('Suz has your request');
    await expect(page.getByRole('status')).toContainText('You asked for: The R');
    expect(postedBody).toMatchObject({
      name: 'Playwright Neighbor',
      email: 'playwright@example.com',
      city: 'Santa Cruz',
      why: 'Hat choice: The R\n\nSaw the green hat on a walk and asked about the next batch.',
      sizeNote: 'I like a looser fit',
      _subject: 'Hat request: The R (Rebellious Aging hat waitlist)',
    });
    expect(LIVE_LOUD_HAT_FORMSPREE_ENDPOINT).toMatch(/^https:\/\/formspree\.io\/f\/[a-z0-9]+$/);
  });

  for (const viewport of [
    { name: '390px phone', width: 390, height: 844 },
    { name: 'desktop', width: 1280, height: 800 },
  ]) {
    test(`hero sits just under the sticky header on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/live-loud-hat', { waitUntil: 'domcontentloaded' });

      const header = page.locator('header').first();
      const firstHeroContent = page.getByRole('button', { name: /share page/i });
      await expect(firstHeroContent).toBeVisible();

      const headerBox = await header.boundingBox();
      const heroBox = await firstHeroContent.boundingBox();
      expect(headerBox).toBeTruthy();
      expect(heroBox).toBeTruthy();

      const gap = (heroBox?.y ?? 0) - ((headerBox?.y ?? 0) + (headerBox?.height ?? 0));
      expect(gap).toBeGreaterThanOrEqual(8);
      expect(gap).toBeLessThan(96);
    });
  }
});

test('a ?hat= link preselects that hat in the request form', async ({ page }) => {
  await page.goto('/live-loud-hat?hat=live-loud', { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('radio', { name: /Live Loud!/ })).toBeChecked();
});
