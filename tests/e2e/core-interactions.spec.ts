import { expect, test } from '@playwright/test';

test.describe('Core site interactions', () => {
  test('recipe tag filters update the visible results and pressed state', async ({ page }) => {
    // Wait for client hydration before exercising stateful filters. A click
    // during the initial server-rendered handoff can otherwise be discarded.
    await page.goto('/recipes', { waitUntil: 'networkidle' });

    await page.getByText('More filters', { exact: true }).click();
    const noBakeFilter = page.getByRole('button', { name: 'No-Bake', exact: true });
    await expect(noBakeFilter).toHaveAttribute('aria-pressed', 'false');

    await noBakeFilter.click();

    await expect(noBakeFilter).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByRole('status').filter({ hasText: '2 matching your filters' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Raw Blueberry Cheesecake' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Mint Chocolate Mousse Torte' })).toBeVisible();
  });

  test('event signup clearly hands off to email instead of claiming a false success', async ({ page }) => {
    await page.goto('/events');

    await page.getByRole('textbox', { name: 'First name' }).fill('Test');
    await page.getByRole('textbox', { name: 'Email', exact: true }).fill('test@example.com');
    await page.getByRole('checkbox', { name: 'Weekdays', exact: true }).check();
    await page.getByRole('checkbox', { name: 'Mornings', exact: true }).check();
    await page
      .getByRole('checkbox', {
        name: /I'm a member of the Rebellious Aging Facebook group/,
      })
      .check();

    await expect(page.getByRole('button', { name: 'Email my availability' })).toBeEnabled();
    await expect(
      page.getByText('Use “Email my availability” to open your email app, or prepare a draft for webmail. Send the email to complete your registration.')
    ).toBeVisible();
    await expect(page.getByText("You're on the list!")).toHaveCount(0);
  });
});
