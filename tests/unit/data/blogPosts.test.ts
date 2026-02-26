import { describe, expect, it } from 'vitest';

import {
  blogPosts,
  getBlogPostById,
  getBlogPostSeoTitle,
} from '@/data/blogPosts';

describe('blog post data', () => {
  it('loads blog posts with required metadata', () => {
    expect(blogPosts.length).toBeGreaterThan(0);
    const first = blogPosts[0];
    expect(first.id).toBeTruthy();
    expect(first.title).toBeTruthy();
    expect(typeof first.blogNumber).toBe('number');
    expect(first.dateSort instanceof Date).toBe(true);
  });

  it('looks up known posts by id', () => {
    const sample = getBlogPostById(blogPosts[1].id);
    expect(sample?.title).toBe(blogPosts[1].title);
  });

  it('builds fallback seo title', () => {
    const sample = blogPosts[0];
    expect(getBlogPostSeoTitle(sample)).toBe(`Blog #${sample.blogNumber}: ${sample.title}`);
  });
});
