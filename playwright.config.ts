import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.PW_BASE_URL ?? 'http://localhost:3000';

export default defineConfig({
  testDir: './tests/e2e',
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
    command: 'npm run dev -- --hostname localhost --port 3000',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 300_000,
    env: {
      NEXT_PUBLIC_ENABLE_ANALYTICS: 'false',
    },
  },
});
