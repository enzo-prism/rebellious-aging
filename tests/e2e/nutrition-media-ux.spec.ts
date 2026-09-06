import { expect, test } from '@playwright/test';

test('nutrition topics recover from invalid URLs and follow browser history', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/nutrition?tab=unknown');
  const topic = page.getByRole('combobox', { name: 'Choose a nutrition topic' });
  await expect(topic).toHaveValue('what-is-wfpb');
  await expect(page.getByRole('tabpanel')).not.toBeEmpty();
  await topic.selectOption('benefits');
  await expect(page).toHaveURL(/tab=benefits/);
  await topic.selectOption('recipes');
  await expect(page).toHaveURL(/tab=recipes/);
  await page.goBack();
  await expect(topic).toHaveValue('benefits');
  await page.goForward();
  await expect(topic).toHaveValue('recipes');
  await page.reload();
  await expect(topic).toHaveValue('recipes');
  await expect(page.getByRole('link', { name: 'Explore all recipes' })).toBeVisible();
});

test('nutrition guide contents reach sections below the fixed navigation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/pillars/health/nutrition-guide');
  await page.getByRole('navigation', { name: 'In this nutrition guide' }).getByRole('link', { name: /Vitamin B12/ }).click();
  await expect(page).toHaveURL(/#b12$/);
  const top = await page.locator('#b12').evaluate((section) => section.getBoundingClientRect().top);
  expect(top).toBeGreaterThanOrEqual(80);
  expect(top).toBeLessThan(250);
});

test('playing a video transfers keyboard focus without an overlay', async ({ page }) => {
  await page.route('https://www.youtube.com/embed/**', (route) => route.fulfill({ contentType: 'text/html', body: '<button>Video controls</button>' }));
  await page.goto('/video-series');
  const play = page.getByRole('button', { name: 'Play Introduction to Rebellious Aging', exact: true });
  await play.focus();
  await page.keyboard.press('Enter');
  const player = page.locator('iframe[title="Introduction to Rebellious Aging"]');
  await expect(player).toBeFocused();
  await expect(page.getByText('01', { exact: true })).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Watch on YouTube' }).first()).toBeVisible();
});
