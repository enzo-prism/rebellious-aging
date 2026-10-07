import { describe, expect, it } from 'vitest';

import {
  getBlogPublishInstant,
  isBlogPostPublished,
  isBlogPostVisible,
  shouldIncludeUnpublishedBlogPosts,
} from '@/lib/blogSchedule';

const productionEnv = {
  NODE_ENV: 'production',
  VERCEL_ENV: 'production',
  NEXT_PUBLIC_VERCEL_ENV: 'production',
} as NodeJS.ProcessEnv;

const previewEnv = {
  NODE_ENV: 'production',
  VERCEL_ENV: 'preview',
  NEXT_PUBLIC_VERCEL_ENV: 'preview',
} as NodeJS.ProcessEnv;

describe('blog publish schedule', () => {
  it('treats the publish instant as midnight America/Los_Angeles, including PST and PDT', () => {
    expect(getBlogPublishInstant('11/10/2026')?.toISOString()).toBe('2026-11-10T08:00:00.000Z');
    expect(getBlogPublishInstant('7/1/2026')?.toISOString()).toBe('2026-07-01T07:00:00.000Z');
    expect(getBlogPublishInstant('4/2026')).toBeUndefined();
  });

  it('keeps a future post hidden on production until the clock passes its date', () => {
    const before = new Date('2026-10-07T17:00:00.000Z');
    const justBefore = new Date('2026-11-10T07:59:59.000Z');
    const atInstant = new Date('2026-11-10T08:00:00.000Z');

    expect(isBlogPostPublished('11/10/2026', before)).toBe(false);
    expect(isBlogPostPublished('11/10/2026', justBefore)).toBe(false);
    expect(isBlogPostPublished('11/10/2026', atInstant)).toBe(true);
    expect(isBlogPostVisible('11/10/2026', { env: productionEnv, now: before })).toBe(false);
    expect(isBlogPostVisible('11/10/2026', { env: productionEnv, now: atInstant })).toBe(true);
  });

  it('shows a future post on Vercel preview even when the clock is before its date', () => {
    const before = new Date('2026-10-07T17:00:00.000Z');
    expect(isBlogPostVisible('11/10/2026', { env: previewEnv, now: before })).toBe(true);
    expect(shouldIncludeUnpublishedBlogPosts(previewEnv)).toBe(true);
    expect(shouldIncludeUnpublishedBlogPosts(productionEnv)).toBe(false);
    expect(shouldIncludeUnpublishedBlogPosts({ NODE_ENV: 'production' } as NodeJS.ProcessEnv)).toBe(true);
  });

  it('keeps already-published and month-only archive dates visible on production', () => {
    const today = new Date('2026-10-07T17:00:00.000Z');
    expect(isBlogPostVisible('9/29/2026', { env: productionEnv, now: today })).toBe(true);
    expect(isBlogPostVisible('1/1/2025', { env: productionEnv, now: today })).toBe(true);
    expect(isBlogPostVisible('4/2026', { env: productionEnv, now: today })).toBe(true);
  });
});
