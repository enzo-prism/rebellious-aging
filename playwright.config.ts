import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.PW_BASE_URL ?? 'http://localhost:3000';
const webServerCommand = process.env.PW_PRODUCTION_SERVER === 'true'
  ? 'npm run start -- --listen 3000'
  : 'npm run dev -- --hostname localhost --port 3000';

export default defineConfig({
  testDir: './tests/e2e',
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  // Web-vital smoke tests need an uncontended browser on shared CI runners.
  // Local development keeps two workers for faster feedback.
  workers: process.env.CI ? 1 : 2,
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  reporter: [['list']],
  use: {
    baseURL,
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
    trace: 'on-first-retry',
    permissions: ['clipboard-read', 'clipboard-write'],
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
  webServer: {
    // Performance CI runs after `npm run build`, so it measures the production
    // export instead of Next.js development overhead. Functional tests retain
    // the dev server because they also verify framework-specific route status.
    command: webServerCommand,
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 300_000,
    env: {
      NEXT_PUBLIC_ENABLE_ANALYTICS: 'false',
    },
  },
});
