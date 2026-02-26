import { describe, expect, it } from 'vitest';

import {
  buildMetaDescription,
  buildSeoTitle,
  getCanonicalUrl,
  resolveAbsoluteUrl,
  resolveSocialImage,
} from '@/lib/seo';

describe('seo utilities', () => {
  it('builds meta titles from a page title', () => {
    expect(buildSeoTitle('Recipes')).toBe('Recipes | Rebellious Aging');
    expect(buildSeoTitle()).toBe('Rebellious Aging');
  });

  it('truncates long descriptions', () => {
    const description = buildMetaDescription('This text is intentionally long '.repeat(20));
    expect(description.length).toBeLessThanOrEqual(155);
    expect(description.endsWith('…')).toBeTruthy();
  });

  it('builds canonical urls for relative and absolute paths', () => {
    expect(resolveAbsoluteUrl('/recipes')).toBe('https://rebelwithsuz.com/recipes');
    expect(resolveAbsoluteUrl('recipes')).toBe('https://rebelwithsuz.com/recipes');
    expect(resolveAbsoluteUrl('https://example.com/recipes')).toBe('https://example.com/recipes');
  });

  it('falls back to the site description when no description is supplied', () => {
    expect(buildMetaDescription(undefined, 'Fallback description')).toBe('Fallback description');
    expect(buildMetaDescription(undefined, '')).toBe('Age boldly through confidence, style, strength, and plant-powered living tailored for women 55+.');
  });

  it('builds canonical URLs and social image overrides', () => {
    expect(getCanonicalUrl('/search')).toBe('https://rebelwithsuz.com/search');
    expect(resolveSocialImage('/lovable-uploads/example.png')).toBe(
      'https://rebelwithsuz.com/lovable-uploads/example.png'
    );
  });
});
