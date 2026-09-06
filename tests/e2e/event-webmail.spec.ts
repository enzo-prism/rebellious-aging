import { expect, test } from '@playwright/test';

test('webmail users can prepare and copy an event draft without an email handler', async ({ page }) => {
  await page.goto('/events');
  await page.getByLabel('First name', { exact: true }).fill('Test Reader');
  await page.getByLabel('Email', { exact: true }).fill('reader@example.com');
  await page.getByLabel(/Anything you/).fill('Balance and staying active');
  await page.getByRole('checkbox', { name: /member of the Rebellious Aging/ }).check();
  await page.getByRole('button', { name: 'Prepare email for webmail' }).click();
  const draft = page.getByLabel('Your email draft');
  await expect(draft).toBeFocused();
  await expect(draft).toHaveValue(/To: suz@rebelwithsuz.com/);
  await expect(draft).toHaveValue(/Test Reader/);
  await expect(draft).toHaveValue(/Balance and staying active/);
  await expect(page.getByText(/Nothing has been sent yet/)).toBeVisible();
  await page.getByRole('button', { name: 'Copy email draft' }).click();
  await expect(page.getByRole('status').filter({ hasText: 'Email draft copied' })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('reader@example.com');
  await expect(page).toHaveURL(/\/events\/?$/);
});

test('event drafts remain selectable when clipboard access fails', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', { value: { writeText: () => Promise.reject(new Error('Blocked')) } });
  });
  await page.goto('/events');
  await page.getByLabel('First name', { exact: true }).fill('Test Reader');
  await page.getByLabel('Email', { exact: true }).fill('reader@example.com');
  await page.getByRole('checkbox', { name: /member of the Rebellious Aging/ }).check();
  await page.getByRole('button', { name: 'Prepare email for webmail' }).click();
  await page.getByRole('button', { name: 'Copy email draft' }).click();
  const draft = page.getByLabel('Your email draft');
  await expect(draft).toBeFocused();
  const selected = await draft.evaluate((element: HTMLTextAreaElement) => element.selectionEnd - element.selectionStart);
  expect(selected).toBe((await draft.inputValue()).length);
});
