import { defineConfig, devices } from '@playwright/test';

// Keep the broad Chromium suite in playwright.config.ts. This focused matrix
// verifies browser-specific behavior against the same static export we ship.
export default defineConfig({
  testDir: './tests/devices',
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: 2,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  reporter: [['list']],
  outputDir: 'test-results/devices',
  use: {
    baseURL: process.env.PW_DEVICE_BASE_URL ?? 'http://localhost:4173',
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    // Clipboard permission names are Chromium-specific. The matrix verifies
    // the manual sharing fallback with clipboard access unavailable instead.
  },
  projects: [
    { name: 'android-phone', use: { ...devices['Pixel 5'], browserName: 'chromium' } },
    { name: 'android-tablet', use: { browserName: 'chromium', viewport: { width: 800, height: 1280 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 } },
    { name: 'narrow-phone', use: { ...devices['Pixel 5'], browserName: 'chromium', viewport: { width: 320, height: 568 } } },
    { name: 'firefox-desktop', use: { ...devices['Desktop Firefox'], viewport: { width: 1440, height: 900 } } },
    { name: 'safari-desktop', use: { ...devices['Desktop Safari'], viewport: { width: 1440, height: 900 } } },
    { name: 'iphone', use: { ...devices['iPhone 13'], browserName: 'webkit' } },
    { name: 'ipad', use: { ...devices['iPad (gen 7)'], browserName: 'webkit' } },
    { name: 'iphone-landscape', use: { ...devices['iPhone SE (3rd gen) landscape'], browserName: 'webkit' } },
  ],
  ...(process.env.PW_DEVICE_BASE_URL ? {} : {
    webServer: {
      command: 'npm run preview',
      url: 'http://localhost:4173',
      reuseExistingServer: !process.env.CI,
      timeout: 60_000,
    },
  }),
});
