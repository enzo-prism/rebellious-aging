export const BLOG_PUBLISH_TIME_ZONE = 'America/Los_Angeles';

export type BlogVisibilityContext = {
  now?: Date;
  env?: NodeJS.ProcessEnv;
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

/**
 * Only an explicit Vercel production environment hides scheduled posts.
 * Preview, local `next dev`, and unit tests show them.
 *
 * The decision uses `NEXT_PUBLIC_VERCEL_ENV` first so the server render and
 * the client bundle always agree. Using `NODE_ENV` alone hydrates incorrectly
 * in `next dev` (server is "development", some client graphs are "production").
 *
 * This site is `output: 'export'`, so the gate is evaluated at build time.
 * HTML, sitemap, search-index.json, and llms.txt cannot change until the
 * next production build. ISR / on-demand revalidate is not available.
 */
export const shouldIncludeUnpublishedBlogPosts = (
  env: NodeJS.ProcessEnv = process.env
) => {
  const vercelEnv = env.NEXT_PUBLIC_VERCEL_ENV ?? env.VERCEL_ENV;
  return vercelEnv !== 'production';
};

export const isBlogPostPublished = (date: string, now: Date = new Date()) => {
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
  return isBlogPostPublished(date, context.now ?? new Date());
};
