export const WEBSITE_RELEASE_POSTS = [
  {
    id: 'a-boundary-is-not-an-argument',
    title: 'A Boundary is NOT An Argument',
    blogNumber: 110,
  },
  {
    id: 'are-your-boundaries-protecting-your-peace-or-protecting-your-fear',
    title: 'Are Your Boundaries Protecting Your Peace or Protecting Your Fear?',
    blogNumber: 111,
  },
  {
    id: 'enough-according-to-whom',
    title: 'Enough. According to Whom?',
    blogNumber: 112,
  },
] as const;

export const BEFORE_WEBSITE_RELEASE = new Date('2026-10-07T17:00:00.000Z');
export const AT_WEBSITE_RELEASE = new Date('2026-10-16T07:00:00.000Z');

export const productionEnv = {
  NODE_ENV: 'production',
  VERCEL_ENV: 'production',
  NEXT_PUBLIC_VERCEL_ENV: 'production',
};

export const previewEnv = {
  NODE_ENV: 'production',
  VERCEL_ENV: 'preview',
  NEXT_PUBLIC_VERCEL_ENV: 'preview',
};

export const showScheduledEnv = {
  SHOW_SCHEDULED_POSTS: '1',
};
