import { afterEach, describe, expect, it } from 'vitest';

import {
  getBlogPublishInstant,
  getBlogScheduleNow,
  isBlogPostPublished,
  isBlogPostVisible,
  resetBlogScheduleNowForTests,
  shouldIncludeUnpublishedBlogPosts,
} from '@/lib/blogSchedule';
import { previewEnv, productionEnv } from '../../helpers/scheduledBlogPosts';

afterEach(() => {
  resetBlogScheduleNowForTests();
});

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
  });

  it('hides scheduled posts by default, including empty env values and production-only NODE_ENV', () => {
    expect(shouldIncludeUnpublishedBlogPosts({})).toBe(false);
    expect(shouldIncludeUnpublishedBlogPosts({
      VERCEL_ENV: '',
      NEXT_PUBLIC_VERCEL_ENV: '',
      NODE_ENV: '',
    })).toBe(false);
    expect(shouldIncludeUnpublishedBlogPosts({ NODE_ENV: 'production' })).toBe(false);
    expect(shouldIncludeUnpublishedBlogPosts({ VERCEL_ENV: 'production' })).toBe(false);
    expect(shouldIncludeUnpublishedBlogPosts({ NEXT_PUBLIC_VERCEL_ENV: 'production' })).toBe(false);
    expect(shouldIncludeUnpublishedBlogPosts({ NODE_ENV: 'test' })).toBe(false);
  });

  it('shows scheduled posts only for preview, development, or an explicit flag', () => {
    expect(shouldIncludeUnpublishedBlogPosts({ VERCEL_ENV: 'preview' })).toBe(true);
    expect(shouldIncludeUnpublishedBlogPosts({ NEXT_PUBLIC_VERCEL_ENV: 'development' })).toBe(true);
    expect(shouldIncludeUnpublishedBlogPosts({ NODE_ENV: 'development' })).toBe(true);
    expect(shouldIncludeUnpublishedBlogPosts({
      NODE_ENV: 'production',
      SHOW_SCHEDULED_POSTS: '1',
    })).toBe(true);
    expect(shouldIncludeUnpublishedBlogPosts({
      NODE_ENV: 'production',
      SHOW_SCHEDULED_POSTS: 'true',
    })).toBe(true);
  });

  it('reuses one build timestamp and honors BLOG_SCHEDULE_NOW', () => {
    const first = getBlogScheduleNow({ BLOG_SCHEDULE_NOW: '2026-11-09T20:00:00.000Z' });
    const second = getBlogScheduleNow({ BLOG_SCHEDULE_NOW: '2026-11-10T08:00:00.000Z' });
    expect(first.toISOString()).toBe('2026-11-09T20:00:00.000Z');
    expect(second).toBe(first);
  });

  it('keeps already-published and month-only archive dates visible on production', () => {
    const today = new Date('2026-10-07T17:00:00.000Z');
    expect(isBlogPostVisible('9/29/2026', { env: productionEnv, now: today })).toBe(true);
    expect(isBlogPostVisible('1/1/2025', { env: productionEnv, now: today })).toBe(true);
    expect(isBlogPostVisible('4/2026', { env: productionEnv, now: today })).toBe(true);
  });
});
