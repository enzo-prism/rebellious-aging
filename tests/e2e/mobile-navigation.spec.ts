import { expect, test } from '@playwright/test';

test.use({ viewport: { width: 390, height: 844 } });

test('the expanded mobile More section can reveal its final link', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Open menu' }).click();
  const menu = page.getByRole('dialog', { name: 'Mobile menu' });
  const moreButton = menu.getByRole('button', { name: 'More' });
  await moreButton.click();

  const contentId = await moreButton.getAttribute('aria-controls');
  expect(contentId).toBeTruthy();
  const expandedContent = page.locator(`[id="${contentId}"]`);
  await expect(expandedContent).toBeVisible();

  const finalLink = menu.getByRole('link', { name: 'Contact' });
  await finalLink.scrollIntoViewIfNeeded();

  await expect.poll(() =>
    finalLink.evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      const hitTarget = document.elementFromPoint(
        bounds.left + bounds.width / 2,
        bounds.top + bounds.height / 2
      );

      return hitTarget === element || element.contains(hitTarget);
    })
  ).toBe(true);
});
