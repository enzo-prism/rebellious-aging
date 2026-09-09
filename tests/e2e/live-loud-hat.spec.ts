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
    await expect(page.getByRole('heading', { name: 'The Live Loud hat' })).toBeVisible();
    await expect(page.getByRole('button', { name: /share page/i })).toBeVisible();
    await expect(page.getByText(/Invite-only waitlist/i).first()).toBeVisible();

    await page.getByRole('textbox', { name: 'Name' }).fill('Playwright Neighbor');
    await page.getByRole('textbox', { name: 'Email', exact: true }).fill('playwright@example.com');
    await page.getByRole('textbox', { name: /City/ }).fill('Santa Cruz');
    await page
      .getByLabel('Why you, or how you found Rebellious Aging')
      .fill('Saw the green hat on a walk and asked about the next batch.');
    await page.getByLabel(/Size note/).fill('I like a looser fit');
    await page.getByRole('button', { name: 'Request the next batch' }).click();

    await expect(page.getByRole('status')).toContainText('Suz has your request');
    expect(postedBody).toMatchObject({
      name: 'Playwright Neighbor',
      email: 'playwright@example.com',
      city: 'Santa Cruz',
      why: 'Saw the green hat on a walk and asked about the next batch.',
      sizeNote: 'I like a looser fit',
      _subject: 'Live Loud hat waitlist request',
    });
    expect(LIVE_LOUD_HAT_FORMSPREE_ENDPOINT).toMatch(/^https:\/\/formspree\.io\/f\/[a-z0-9]+$/);
  });
});
