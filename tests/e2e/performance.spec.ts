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

const collectWebVitals = async (page: import('@playwright/test').Page): Promise<WebVitals> =>
  page.evaluate(() => {
    return new Promise<WebVitals>((resolve) => {
      const metrics: WebVitals = {
        lcp: 0,
        fcp: 0,
        cls: 0,
        tbt: 0,
        inp: 0,
      };

      const paintEntries = performance.getEntriesByType('paint');
      metrics.fcp = paintEntries.find((entry) => entry.name === 'first-contentful-paint')?.startTime ?? 0;

      const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
      if (lcpEntries.length > 0) {
        metrics.lcp = lcpEntries[lcpEntries.length - 1].startTime;
      }

      const layoutShiftEntries = performance.getEntriesByType('layout-shift') as Array<
        PerformanceEntry & { value: number; hadRecentInput: boolean }
      >;
      metrics.cls = layoutShiftEntries
        .filter((entry) => !entry.hadRecentInput)
        .reduce((total, entry) => total + entry.value, 0);

      const longTasks = performance.getEntriesByType('longtask') as Array<PerformanceEntry & { duration: number }>;
      metrics.tbt = longTasks.reduce((total, entry) => total + (entry.duration ?? 0), 0);

      const eventEntries = performance.getEntriesByType('event') as Array<
        PerformanceEntry & { duration: number; processingStart: number; startTime: number }
      >;
      metrics.inp = eventEntries.length > 0 ? Math.max(...eventEntries.map((entry) => entry.duration || 0), 0) : 0;

      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
              metrics.lcp = entry.startTime;
            }

            if (entry.entryType === 'layout-shift') {
              const layoutShift = entry as PerformanceEntry & { value: number; hadRecentInput: boolean };
              if (!layoutShift.hadRecentInput) {
                metrics.cls += layoutShift.value;
              }
            }

            if (entry.entryType === 'longtask') {
              metrics.tbt += (entry as PerformanceEntry & { duration: number }).duration ?? 0;
            }

            if (entry.entryType === 'event') {
              const evt = entry as PerformanceEntry & { duration: number; processingStart: number; startTime: number };
              const inputDelay = evt.processingStart ? evt.processingStart - evt.startTime : 0;
              metrics.inp = Math.max(metrics.inp, inputDelay, evt.duration || 0);
            }
          }
        });

        observer.observe({ type: 'largest-contentful-paint', buffered: true });
        observer.observe({ type: 'layout-shift', buffered: true });
        observer.observe({ type: 'longtask', buffered: true });
        observer.observe({ type: 'event', buffered: true } as PerformanceObserverInit);

        window.setTimeout(() => {
          observer.disconnect();
          const paintEntries = performance.getEntriesByType('paint');
          const finalFcp = paintEntries.find((entry) => entry.name === 'first-contentful-paint')?.startTime ?? 0;
          const finalLcpEntries = performance.getEntriesByType('largest-contentful-paint');
          const finalLcp = finalLcpEntries.length > 0 ? finalLcpEntries[finalLcpEntries.length - 1].startTime : 0;
          const finalLongTasks = performance.getEntriesByType('longtask') as Array<PerformanceEntry & { duration: number }>;
          const finalEventEntries = performance.getEntriesByType('event') as Array<
            PerformanceEntry & { duration: number; processingStart: number; startTime: number }
          >;

          if (finalFcp > 0) {
            metrics.fcp = finalFcp;
          }

          if (finalLcp > 0) {
            metrics.lcp = finalLcp;
          }

          metrics.tbt = finalLongTasks.reduce((total, entry) => total + (entry.duration ?? 0), 0);
          metrics.inp = finalEventEntries.length > 0
            ? Math.max(...finalEventEntries.map((entry) => entry.duration || 0))
            : metrics.inp;

          resolve(metrics);
        }, 2500);
      } catch {
        window.setTimeout(() => {
          resolve(metrics);
        }, 2500);
      }
    });
  });

test.describe('Performance readiness web-vitals smoke', () => {
  for (const route of routesToMeasure) {
    test(`captures metrics for ${route}`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'domcontentloaded' });
      await page.waitForLoadState('networkidle');

      const metrics = await collectWebVitals(page);

      if (metrics.fcp === 0 && metrics.lcp === 0) {
        test.skip(
          true,
          'Web-vital paint markers are unavailable in this runtime; collecting meaningful LCP/FCP thresholds is not currently possible.'
        );
      }

      if (metrics.lcp > 0) {
        expect(metrics.lcp).toBeLessThanOrEqual(thresholds.lcpMs);
      }

      if (metrics.fcp > 0) {
        expect(metrics.fcp).toBeLessThanOrEqual(thresholds.fcpMs);
      }

      if (metrics.inp > 0) {
        expect(metrics.inp).toBeLessThanOrEqual(thresholds.inpMs);
      }

      if (metrics.tbt > 0) {
        expect(metrics.tbt).toBeLessThanOrEqual(thresholds.tbtMs);
      }

      expect(metrics.lcp).toBeLessThanOrEqual(thresholds.lcpMs);
      expect(metrics.fcp).toBeLessThanOrEqual(thresholds.fcpMs);

      expect(metrics.cls).toBeLessThanOrEqual(thresholds.cls);
      expect(metrics.cls).toBeGreaterThanOrEqual(0);
    });
  }
});
