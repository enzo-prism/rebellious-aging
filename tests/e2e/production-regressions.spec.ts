import { expect, test } from '@playwright/test';

test.describe('Production behavior regressions', () => {
  test('event signup opens a complete, encoded email draft', async ({ page }) => {
    await page.goto('/events');

    await page.getByRole('textbox', { name: 'First name' }).fill('Test Name');
    await page.getByRole('textbox', { name: 'Email', exact: true }).fill('test@example.com');
    await page.getByRole('checkbox', { name: 'Weekdays', exact: true }).click();
    await page.getByRole('checkbox', { name: 'Mornings', exact: true }).click();
    await page
      .getByRole('checkbox', {
        name: /I'm a member of the Rebellious Aging Facebook group/,
      })
      .click();
    await page
      .getByRole('textbox', { name: /Anything you'd love Suz to cover/ })
      .fill('Healthy habits');

    const mailtoRequest = page.waitForRequest((request) =>
      request.url().startsWith('mailto:suz@rebelwithsuz.com?')
    );
    await page.getByRole('button', { name: 'Email my availability' }).click();

    const draftUrl = new URL((await mailtoRequest).url());
    expect(draftUrl.protocol).toBe('mailto:');
    expect(draftUrl.pathname).toBe('suz@rebelwithsuz.com');
    expect(draftUrl.searchParams.get('subject')).toBe(
      'Community Zoom availability from Test Name'
    );
    expect(draftUrl.searchParams.get('body')).toBe(
      [
        'Name: Test Name',
        'Email: test@example.com',
        'Preferred days: weekdays',
        'Preferred times: morning',
        'Facebook group member: Yes',
        '',
        'Topic or note:',
        'Healthy habits',
      ].join('\n')
    );
  });

  test('homepage requests responsive hero images only as they are selected', async ({ page }) => {
    await page.goto('/');

    const firstImage = page.getByRole('img', { name: 'Vibrant aging lifestyle 1' });
    const secondImage = page.getByRole('img', { name: 'Vibrant aging lifestyle 2' });
    const firstControl = page.getByRole('button', { name: /^Show hero image 1 of \d+$/ });
    const secondControl = page.getByRole('button', { name: /^Show hero image 2 of \d+$/ });

    await expect(firstImage).toHaveAttribute('fetchpriority', 'high');
    await expect(firstImage).toHaveAttribute(
      'sizes',
      '(min-width: 1280px) 608px, (min-width: 1024px) 50vw, (min-width: 640px) 672px, calc(100vw - 2rem)'
    );
    await expect(firstImage).toHaveAttribute(
      'srcset',
      /c_limit,w_480,f_auto,q_auto:good\/.* 480w, .*c_limit,w_768,f_auto,q_auto:good\/.* 768w, .*c_limit,w_1080,f_auto,q_auto:good\/.* 1080w/
    );
    await expect(secondImage).toHaveCount(0);
    await expect(firstControl).toHaveAttribute('aria-current', 'true');

    await secondControl.click();

    await expect(secondImage).toHaveAttribute('loading', 'lazy');
    await expect(secondImage).toHaveAttribute('fetchpriority', 'auto');
    await expect(secondControl).toHaveAttribute('aria-current', 'true');
    await expect(firstControl).not.toHaveAttribute('aria-current', 'true');
  });
});
