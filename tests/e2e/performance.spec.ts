import { expect, test } from '@playwright/test';

type WebVitals = {
  lcp: number;
  cls: number;
  fcp: number;
  tbt: number;
  inp: number;
};

const routesToMeasure = ['/', '/search', '/recipes', '/blog', '/pillars/health', '/contact'];

const thresholds = {
  fcpMs: 2500,
  lcpMs: 2500,
  cls: 0.1,
  inpMs: 200,
  tbtMs: 200,
} as const;

type WebVitalsWindow = Window & {
  __webVitals?: WebVitals;
  __webVitalsObservers?: PerformanceObserver[];
};

const installWebVitalsObservers = async (page: import('@playwright/test').Page): Promise<void> => {
  await page.addInitScript(() => {
    const metrics: WebVitals = {
      lcp: 0,
      cls: 0,
      fcp: 0,
      tbt: 0,
      inp: 0,
    };
    const observers: PerformanceObserver[] = [];
    const metricsWindow = window as WebVitalsWindow;

    metricsWindow.__webVitals = metrics;
    metricsWindow.__webVitalsObservers = observers;

    const observe = (
      type: string,
      handleEntries: (entries: PerformanceEntry[]) => void
    ): void => {
      try {
        const observer = new PerformanceObserver((list) => {
          handleEntries(list.getEntries());
        });
        observer.observe({ type, buffered: true });
        observers.push(observer);
      } catch {
        // Unsupported performance entry types are expected in some browsers.
      }
    };

    observe('paint', (entries) => {
      const fcp = entries.find((entry) => entry.name === 'first-contentful-paint');
      if (fcp) {
        metrics.fcp = fcp.startTime;
      }
    });

    observe('largest-contentful-paint', (entries) => {
      const lcp = entries.at(-1);
      if (lcp) {
        metrics.lcp = lcp.startTime;
      }
    });

    observe('layout-shift', (entries) => {
      for (const entry of entries as Array<
        PerformanceEntry & { value: number; hadRecentInput: boolean }
      >) {
        if (!entry.hadRecentInput) {
          metrics.cls += entry.value;
        }
      }
    });

    observe('longtask', (entries) => {
      for (const entry of entries) {
        // Total Blocking Time counts only the portion of each long task over 50ms.
        metrics.tbt += Math.max(0, entry.duration - 50);
      }
    });

    observe('event', (entries) => {
      for (const entry of entries) {
        metrics.inp = Math.max(metrics.inp, entry.duration);
      }
    });
  });
};

const collectWebVitals = async (page: import('@playwright/test').Page): Promise<WebVitals> => {
  await page.waitForTimeout(2500);

  return page.evaluate(() => {
    const metricsWindow = window as WebVitalsWindow;
    metricsWindow.__webVitalsObservers?.forEach((observer) => observer.disconnect());

    return metricsWindow.__webVitals ?? {
      lcp: 0,
      cls: 0,
      fcp: 0,
      tbt: 0,
      inp: 0,
    };
  });
};

test.describe('Performance readiness web-vitals smoke', () => {
  for (const route of routesToMeasure) {
    test(`captures metrics for ${route}`, async ({ page, request }) => {
      // Compile the route before measuring when Playwright is using the local
      // development server. This keeps framework compilation out of page vitals.
      const warmupResponse = await request.get(route);
      expect(warmupResponse.ok()).toBe(true);

      await installWebVitalsObservers(page);
      await page.goto(route, { waitUntil: 'load' });
      const metrics = await collectWebVitals(page);

      expect(metrics.lcp, `LCP was not reported for ${route}`).toBeGreaterThan(0);
      expect(metrics.fcp, `FCP was not reported for ${route}`).toBeGreaterThan(0);
      expect(metrics.lcp).toBeLessThanOrEqual(thresholds.lcpMs);
      expect(metrics.fcp).toBeLessThanOrEqual(thresholds.fcpMs);

      if (metrics.inp > 0) {
        expect(metrics.inp).toBeLessThanOrEqual(thresholds.inpMs);
      }

      if (metrics.tbt > 0) {
        expect(metrics.tbt).toBeLessThanOrEqual(thresholds.tbtMs);
      }

      expect(metrics.cls).toBeLessThanOrEqual(thresholds.cls);
      expect(metrics.cls).toBeGreaterThanOrEqual(0);
    });
  }
});
