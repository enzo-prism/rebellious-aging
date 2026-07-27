import { describe, expect, it } from 'vitest';

import buildSitemap from '../../../app/sitemap';
import { serializeSitemap } from '../../../scripts/generate-sitemap';
import { siteMetadata } from '@/lib/siteMetadata';

describe('sitemap generators', () => {
  it('serializes the native sitemap entries without changing their policies', () => {
    const entries = buildSitemap();
    const xml = serializeSitemap(entries);
    const baseUrl = siteMetadata.baseUrl.replace(/\/$/, '');

    expect(xml.match(/<url>/g)).toHaveLength(entries.length);
    expect(new Set(entries.map((entry) => entry.url)).size).toBe(entries.length);

    for (const entry of entries) {
      expect(xml).toContain(`<loc>${entry.url}</loc>`);
      if (entry.changeFrequency) {
        expect(xml).toContain(`<changefreq>${entry.changeFrequency}</changefreq>`);
      }
      if (typeof entry.priority === 'number') {
        expect(xml).toContain(`<priority>${entry.priority.toFixed(1)}</priority>`);
      }
    }

    expect(entries.some((entry) => entry.url === `${baseUrl}/guides/suz-plant-based-starter`)).toBe(true);
    expect(entries.some((entry) => entry.url === `${baseUrl}/speaking-events/eat-for-the-earth-santa-cruz`)).toBe(
      true
    );
  });
});
