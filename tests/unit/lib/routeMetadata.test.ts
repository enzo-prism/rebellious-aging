import { describe, expect, it } from 'vitest';

import { getHomeMeta, getRouteMetaById, getRouteMetaByPath } from '@/lib/routeMetadata';

describe('route metadata', () => {
  it('resolves home metadata with canonical and fallback social image', () => {
    const home = getHomeMeta();
    expect(home.path).toBe('/');
    expect(home.canonical).toBe('/');
    expect(home.title).toBeTruthy();
    expect(home.image).toBeTruthy();
  });

  it('resolves route metadata for configured route', () => {
    const metadata = getRouteMetaByPath('/our-story');
    expect(metadata?.path).toBe('/our-story');
    expect(metadata?.canonical).toBe('/our-story');
    expect(metadata?.title).toContain('Our Story');
  });

  it('normalizes missing ids and returns undefined when unknown', () => {
    expect(getRouteMetaById('/unknown')).toBeUndefined();
    expect(getRouteMetaByPath('/unknown')).toBeUndefined();
  });
});
