import { describe, expect, it } from 'vitest';

import { buildMetadata } from '@/lib/nextMetadata';
import { getHomeMeta } from '@/lib/routeMetadata';
import { siteMetadata } from '@/lib/siteMetadata';

describe('nextMetadata', () => {
  it('builds metadata with expected fields', () => {
    const meta = buildMetadata(
      getHomeMeta(),
      {
        path: '/test',
        title: 'Test',
        description: 'A short description for testing.',
      }
    );

    expect(meta.title).toBe('Test');
    expect(meta.description).toBe('A short description for testing.');
    expect(meta.openGraph?.url).toBe(`${siteMetadata.baseUrl}/test`);
    expect(meta.openGraph?.images?.[0]).toHaveProperty('url', `${siteMetadata.baseUrl}${siteMetadata.defaultSocialImage}`);
    expect(meta.twitter?.site).toBe(siteMetadata.twitterHandle);
    expect(meta.alternates?.canonical).toBe(`${siteMetadata.baseUrl}/test`);
  });

  it('supports noindex overrides', () => {
    const meta = buildMetadata(getHomeMeta(), { noindex: true, canonical: '/hidden' });
    expect(meta.robots).toMatchObject({ index: false, follow: false });
    expect(meta.alternates?.canonical).toBe(`${siteMetadata.baseUrl}/hidden`);
  });

  it('keeps article publish dates passed in route metadata', () => {
    const publishedTime = '2026-07-26T12:00:00.000Z';
    const meta = buildMetadata({
      path: '/blog/test-post',
      title: 'Test Post',
      description: 'A useful test post description.',
      ogType: 'article',
      publishedTime,
    });

    expect(meta.openGraph).toMatchObject({
      type: 'article',
      publishedTime,
    });
  });
});
