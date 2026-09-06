import { expect, test, type Locator } from '@playwright/test';

// Deliberately keep these journeys portable: no Chromium CDP, browser-specific
// clipboard permissions, layout-only deviceScaleFactor zoom, or arbitrary sleeps.
test('navigation and search work with touch and desktop keyboard layouts', async ({ page }) => {
  await page.goto('/');
  const mobileLayout = page.viewportSize()!.width < 1280;
  const activate = (control: Locator) => test.info().project.use.hasTouch ? control.tap() : control.click();
  if (mobileLayout) {
    await activate(page.getByRole('button', { name: 'Open menu', exact: true }));
    const menu = page.getByRole('dialog', { name: 'Mobile menu' });
    await activate(menu.getByRole('button', { name: /More$/ }));
    await activate(menu.getByRole('link', { name: /Contact$/ }));
  } else {
    await page.getByRole('button', { name: 'More', exact: true }).click();
    await page.getByRole('menuitem', { name: /Contact/ }).click();
  }
  await expect(page).toHaveURL(/\/contact\/?$/);
  await expect(page.getByRole('heading', { name: 'Get in Touch with Suz' })).toBeVisible();
  await expect(page.locator('body')).not.toHaveAttribute('data-scroll-locked');

  const searchTrigger = mobileLayout
    ? page.getByRole('button', { name: 'Open search', exact: true })
    : page.getByRole('navigation', { name: 'Main navigation' }).getByRole('button', { name: 'Search', exact: true });
  await activate(searchTrigger);
  const search = page.getByRole('dialog', { name: 'Search Rebellious Aging' });
  await expect(search.getByRole('combobox')).toBeFocused();
  await search.getByRole('combobox').fill('nutrition');
  await expect(search.getByRole('option').first()).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(search).toBeHidden();
  await expect(searchTrigger).toBeFocused();
  await expect(page.locator('body')).not.toHaveAttribute('data-scroll-locked');
});

test('recipe discovery and cooking checkboxes work across browsers', async ({ page }) => {
  await page.goto('/recipes');
  const mobileCategory = page.getByRole('combobox', { name: 'Recipe category' });
  if (await mobileCategory.isVisible()) {
    await mobileCategory.selectOption('soups');
  } else {
    await page.getByRole('button', { name: /Soups/ }).click();
  }
  await expect(page.getByRole('heading', { name: 'Big Bean Barley and Sweet Potato Soup', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Raw Blueberry Cheesecake', exact: true })).toHaveCount(0);
  await expect(page).toHaveURL(/category=soups/);
  await page.getByRole('heading', { name: 'Big Bean Barley and Sweet Potato Soup', exact: true }).click();
  await expect(page).toHaveURL(/\/recipes\/big-bean-barley-and-sweet-potato-soup\/?$/);
  await page.goBack();
  const assertSoupCategory = async () => {
    await expect(page).toHaveURL(/category=soups/);
    if (await mobileCategory.isVisible()) {
      await expect(mobileCategory).toHaveValue('soups');
    } else {
      await expect(page.getByRole('button', { name: /Soups/ })).toHaveAttribute('aria-pressed', 'true');
    }
    await expect(page.getByRole('heading', { name: 'Big Bean Barley and Sweet Potato Soup', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Raw Blueberry Cheesecake', exact: true })).toHaveCount(0);
  };
  await assertSoupCategory();
  await page.reload();
  await assertSoupCategory();
  await page.goto('/recipes/orange-mango-bean-salad');
  await page.getByRole('link', { name: 'Jump to recipe', exact: true }).click();
  await expect(page).toHaveURL(/#recipe-instructions$/);
  const ingredient = page.locator('#recipe-instructions input[type="checkbox"]').first();
  await ingredient.check();
  await expect(ingredient).toBeChecked();
  await ingredient.uncheck();
  await expect(ingredient).not.toBeChecked();
});

test('share dialog stays usable when clipboard access fails', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: () => Promise.reject(new Error('Clipboard unavailable')) },
    });
  });
  await page.goto('/blog');
  await page.getByRole('button', { name: 'Share page', exact: true }).click();
  const dialog = page.getByRole('dialog');
  await dialog.getByRole('button', { name: 'Copy URL', exact: true }).click();
  await expect(dialog.getByText(/Clipboard access is unavailable/)).toBeVisible();
  const url = dialog.getByRole('textbox');
  await expect(url).toBeFocused();
  expect(await url.evaluate((input: HTMLInputElement) => input.selectionEnd! - input.selectionStart!)).toBeGreaterThan(0);
  const close = dialog.getByRole('button', { name: 'Close', exact: true }).last();
  await expect.poll(async () => {
    const box = await close.boundingBox();
    return box ? Math.min(box.width, box.height) : 0;
  }).toBeGreaterThanOrEqual(44);
  await close.click();
  await expect(dialog).toBeHidden();
});

test('representative pages reflow without clipped reading controls', async ({ page }) => {
  for (const path of ['/', '/guides', '/nutrition', '/events', '/pillars/health/nutrition-guide', '/contact']) {
    await page.goto(path);
    await expect(page.locator('main h1')).toBeVisible();
    const overflow = await page.evaluate(() => {
      const viewport = document.documentElement.clientWidth;
      return Array.from(document.querySelectorAll('main h1, main h2, main p, main button, main input, main select')).filter((element) => {
        const box = element.getBoundingClientRect();
        return box.width > 0 && (box.left < -2 || box.right > viewport + 2);
      }).map((element) => `${element.tagName}: ${element.textContent?.trim().slice(0, 80)}`);
    });
    expect(overflow, `Content outside the viewport at ${path}`).toEqual([]);
  }
});

test('reduced motion and JavaScript-free reading keep essential content visible', async ({ page, browser, baseURL }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/our-story');
  await expect(page.getByRole('heading', { name: 'About Rebellious Aging', exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.getAnimations().filter((animation) => animation.playState === 'running' && animation.effect?.getTiming().iterations === Infinity).length)).toBe(0);

  const context = await browser.newContext({ javaScriptEnabled: false, viewport: page.viewportSize()!, baseURL });
  try {
    const reader = await context.newPage();
    await reader.goto('/our-story');
    await expect(reader.getByRole('heading', { name: 'About Rebellious Aging', exact: true })).toBeVisible();
    await reader.goto('/nutrition');
    await expect(reader.locator('main h1')).toBeVisible();
    await expect(reader.locator('main')).toContainText('Whole-Food');
  } finally {
    await context.close();
  }
});
