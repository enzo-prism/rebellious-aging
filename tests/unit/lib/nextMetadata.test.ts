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
    expect(meta.openGraph?.url).toBe('https://rebelwithsuz.com/test');
    expect(meta.openGraph?.images?.[0]).toHaveProperty('url', `${siteMetadata.baseUrl}${siteMetadata.defaultSocialImage}`);
    expect(meta.twitter?.site).toBe(siteMetadata.twitterHandle);
    expect(meta.alternates?.canonical).toBe('https://rebelwithsuz.com/test');
  });

  it('supports noindex overrides', () => {
    const meta = buildMetadata(getHomeMeta(), { noindex: true, canonical: '/hidden' });
    expect(meta.robots).toMatchObject({ index: false, follow: false });
    expect(meta.alternates?.canonical).toBe('https://rebelwithsuz.com/hidden');
  });
});
