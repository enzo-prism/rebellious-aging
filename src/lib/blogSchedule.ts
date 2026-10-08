export const BLOG_PUBLISH_TIME_ZONE = 'America/Los_Angeles';
export const BLOG_SCHEDULE_NOW_ENV = 'BLOG_SCHEDULE_NOW';

export type BlogScheduleEnv = Record<string, string | undefined>;

export type BlogVisibilityContext = {
  now?: Date;
  env?: BlogScheduleEnv;
};

const readTimeZoneParts = (date: Date, timeZone: string) => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes) => {
    const value = parts.find((part) => part.type === type)?.value;
    if (!value) {
      throw new Error(`Missing ${type} while reading ${timeZone}`);
    }
    return Number(value);
  };

  return {
    year: get('year'),
    month: get('month'),
    day: get('day'),
    hour: get('hour'),
    minute: get('minute'),
    second: get('second'),
  };
};

const getTimeZoneOffsetMs = (date: Date, timeZone: string) => {
  const parts = readTimeZoneParts(date, timeZone);
  const asUtc = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second
  );
  return asUtc - date.getTime();
};

export const zonedLocalDateTimeToUtc = (
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second: number,
  timeZone: string
) => {
  const asUtcMs = Date.UTC(year, month - 1, day, hour, minute, second);
  let utcMs = asUtcMs - getTimeZoneOffsetMs(new Date(asUtcMs), timeZone);
  utcMs = asUtcMs - getTimeZoneOffsetMs(new Date(utcMs), timeZone);
  return new Date(utcMs);
};

export const parseBlogCalendarDate = (date: string) => {
  const parts = date.split('/');
  if (parts.length !== 3) {
    return undefined;
  }

  const [month, day, year] = parts.map(Number);
  if (!month || !day || !year) {
    return undefined;
  }

  return { year, month, day };
};

/**
 * Midnight America/Los_Angeles on the post's M/D/YYYY date.
 * Month-only archive dates have no day, so they have no scheduled instant.
 */
export const getBlogPublishInstant = (date: string) => {
  const parts = parseBlogCalendarDate(date);
  if (!parts) {
    return undefined;
  }

  return zonedLocalDateTimeToUtc(
    parts.year,
    parts.month,
    parts.day,
    0,
    0,
    0,
    BLOG_PUBLISH_TIME_ZONE
  );
};

const readEnvValue = (value: string | undefined) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
};

let cachedScheduleNow: Date | undefined;

export const parseBlogScheduleNow = (value: string) => {
  const trimmed = value.trim();
  const parsed = new Date(trimmed);
  if (!trimmed || Number.isNaN(parsed.getTime())) {
    throw new Error(
      `BLOG_SCHEDULE_NOW must be a valid date, received ${JSON.stringify(value)}`
    );
  }
  return parsed;
};

/**
 * Per-process cache of the schedule clock. `npm run build` sets
 * BLOG_SCHEDULE_NOW once in scripts/run-production-build.ts so llms,
 * sitemap, search-index, prerender, next build, and the SEO audit all
 * inherit the same ISO timestamp. This module cache cannot span those
 * child processes. A set-but-unparseable value fails the process.
 */
export const getBlogScheduleNow = (env: BlogScheduleEnv = process.env) => {
  if (cachedScheduleNow) {
    return cachedScheduleNow;
  }

  const override = readEnvValue(env[BLOG_SCHEDULE_NOW_ENV]);
  cachedScheduleNow = override ? parseBlogScheduleNow(override) : new Date();
  return cachedScheduleNow;
};

export const resolveBlogScheduleNowIso = (env: BlogScheduleEnv = process.env) => {
  const override = readEnvValue(env[BLOG_SCHEDULE_NOW_ENV]);
  return (override ? parseBlogScheduleNow(override) : new Date()).toISOString();
};

export const resetBlogScheduleNowForTests = () => {
  cachedScheduleNow = undefined;
};

/**
 * Hide scheduled posts unless this deploy is explicitly a preview/dev
 * environment or SHOW_SCHEDULED_POSTS=1. Empty strings count as unset.
 * VERCEL_ENV=production (or NEXT_PUBLIC_VERCEL_ENV=production) always
 * hides, even if SHOW_SCHEDULED_POSTS=1 or NODE_ENV=development.
 * CI and any unknown env stay closed.
 *
 * This site is `output: 'export'`, so the gate is evaluated at build time.
 * HTML, sitemap, search-index.json, and llms.txt cannot change until the
 * next production build. ISR / on-demand revalidate is not available.
 */
export const shouldIncludeUnpublishedBlogPosts = (
  env: BlogScheduleEnv = process.env
) => {
  const vercelEnv = readEnvValue(env.VERCEL_ENV) ?? readEnvValue(env.NEXT_PUBLIC_VERCEL_ENV);
  if (vercelEnv === 'production') {
    return false;
  }

  const showFlag = readEnvValue(env.SHOW_SCHEDULED_POSTS);
  if (showFlag === '1' || showFlag === 'true') {
    return true;
  }

  if (vercelEnv === 'preview' || vercelEnv === 'development') {
    return true;
  }

  return readEnvValue(env.NODE_ENV) === 'development';
};

export const isBlogPostPublished = (date: string, now: Date = getBlogScheduleNow()) => {
  const instant = getBlogPublishInstant(date);
  if (!instant) {
    return true;
  }
  return instant.getTime() <= now.getTime();
};

export const isBlogPostVisible = (
  date: string,
  context: BlogVisibilityContext = {}
) => {
  if (shouldIncludeUnpublishedBlogPosts(context.env ?? process.env)) {
    return true;
  }
  return isBlogPostPublished(date, context.now ?? getBlogScheduleNow(context.env ?? process.env));
};

