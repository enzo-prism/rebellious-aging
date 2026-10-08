import { spawnSync } from 'node:child_process';

import { resolveBlogScheduleNowIso } from '../src/lib/blogSchedule';

const iso = resolveBlogScheduleNowIso(process.env);
const env = { ...process.env, BLOG_SCHEDULE_NOW: iso };

console.log(`Using BLOG_SCHEDULE_NOW=${iso} for every production-build step.`);

const steps: Array<[string, string[]]> = [
  ['npm', ['run', 'llms']],
  ['npm', ['run', 'sitemap']],
  ['npm', ['run', 'build:search']],
  ['npm', ['run', 'prerender']],
  ['npx', ['next', 'build']],
  ['npm', ['run', 'prerender']],
  ['npm', ['run', 'audit:seo']],
];

for (const [command, args] of steps) {
  const result = spawnSync(command, args, {
    env,
    stdio: 'inherit',
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
