import { expect, test, type Page } from '@playwright/test';

const ALLOWED_LEAD_KEYS = new Set([
  'form_id',
  'form_name',
  'lead_source',
  'location',
  'method',
  'contact_method',
]);

type LeadParams = Record<string, string>;

async function installGa4TestHooks(page: Page) {
  await page.addInitScript(() => {
    const dataLayer = ((window as Window & { dataLayer?: unknown[] }).dataLayer =
      (window as Window & { dataLayer?: unknown[] }).dataLayer || []);
    const events: unknown[] = [];

    Object.defineProperty(window, '__gaEvents', {
      configurable: true,
      value: events,
    });

    const originalPush = dataLayer.push.bind(dataLayer);
    dataLayer.push = (...args: unknown[]) => {
      for (const arg of args) {
        events.push(arg);
      }
      return originalPush(...args);
    };

    Object.defineProperty(window, 'gtag', {
      configurable: true,
      value: (...args: unknown[]) => {
        dataLayer.push(args);
      },
    });

    Object.defineProperty(window, 'tf', {
      configurable: true,
      value: {
        createPopup: (_formId: string, options?: { onSubmit?: () => void }) => ({
          open: () => {
            Object.defineProperty(window, '__typeformOnSubmit', {
              configurable: true,
              writable: true,
              value: options?.onSubmit,
            });
          },
          close: () => undefined,
          unmount: () => undefined,
        }),
      },
    });
  });
}

async function getLeadEvents(page: Page): Promise<LeadParams[]> {
  return page.evaluate(() => {
    const events = ((window as Window & { __gaEvents?: unknown[] }).__gaEvents ?? []) as unknown[];

    return events
      .map((entry) => Array.from(entry as ArrayLike<unknown>))
      .filter((args) => args[0] === 'event' && args[1] === 'generate_lead')
      .map((args) => (args[2] && typeof args[2] === 'object' ? (args[2] as LeadParams) : {}));
  });
}

function expectSafeLeadParams(params: LeadParams) {
  expect(Object.keys(params).every((key) => ALLOWED_LEAD_KEYS.has(key))).toBe(true);
  expect(JSON.stringify(params)).not.toMatch(/@|tel:|\+1\d{10}|notes|first_name|email/i);
}

test('opening the contact Typeform does not fire generate_lead', async ({ page }) => {
  await installGa4TestHooks(page);
  await page.goto('/contact');

  await page.getByRole('button', { name: 'Open Contact Form' }).click();
  await expect(page.locator('iframe[title="Contact Form"]')).toBeVisible();
  expect(await getLeadEvents(page)).toEqual([]);
});

test('welcome-letter Typeform overlay submit fires a newsletter generate_lead', async ({ page }) => {
  await installGa4TestHooks(page);
  await page.goto('/welcome-letter');

  await page.getByRole('link', { name: 'Share Your Email for Updates' }).click();
  await page.waitForFunction(
    () => typeof (window as Window & { __typeformOnSubmit?: () => void }).__typeformOnSubmit === 'function'
  );

  expect(await getLeadEvents(page)).toEqual([]);

  await page.evaluate(() => {
    (window as Window & { __typeformOnSubmit?: () => void }).__typeformOnSubmit?.();
  });

  await expect.poll(async () => (await getLeadEvents(page)).length).toBe(1);

  const [lead] = await getLeadEvents(page);
  expectSafeLeadParams(lead);
  expect(lead).toMatchObject({
    form_id: 'newsletter',
    form_name: 'newsletter',
    lead_source: 'website_newsletter_form',
    location: 'welcome_letter',
    method: 'form',
    contact_method: 'form',
  });
});

test('the site has no tel click-to-call links to instrument', async ({ page }) => {
  await page.goto('/contact');
  await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);
});
