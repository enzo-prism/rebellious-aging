import { describe, expect, it } from 'vitest';

import {
  blogPosts,
  getBlogPostById,
  getBlogPostSeoTitle,
  getBlogPostsByDateDesc,
  getBlogReleaseLabel,
  getNextBlogPost,
  getPublicBlogPosts,
  getSortedBlogPosts,
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

  it('uses the blog title as the fallback seo title', () => {
    const sample = {
      ...blogPosts[0],
      id: 'post-without-seo-overrides',
    };

    expect(getBlogPostSeoTitle(sample)).toBe(sample.title);
  });
});

describe('gated (password-protected) blog posts', () => {
  const gatedPosts = blogPosts.filter((post) => post.gated);

  it('keeps released superpower posts public and future previews gated', () => {
    const gatedIds = gatedPosts.map((post) => post.id);
    // "What If Superpowers Are Real?" (#74) went public on its 2026-06-23 release date.
    // "How Do You Discover Your Superpower?" (#75) went public after its 2026-06-25 release date.
    // "The Problem With Superpowers" (#76) is public for its 2026-06-30 release date.
    expect(gatedIds).not.toContain('what-if-superpowers-are-real');
    expect(gatedIds).not.toContain('how-do-you-discover-your-superpower');
    expect(gatedIds).not.toContain('the-problem-with-superpowers');
    expect(gatedIds).toContain('do-superpowers-change');
    expect(gatedIds).toContain('the-superpower-epilogue');
  });

  it('excludes gated posts from the machine-facing public list', () => {
    const publicIds = getPublicBlogPosts().map((post) => post.id);
    for (const post of gatedPosts) {
      expect(publicIds).not.toContain(post.id);
    }
    expect(getPublicBlogPosts().length).toBe(blogPosts.length - gatedPosts.length);
  });

  it('lists gated posts in the blog index but not on homepage surfaces', () => {
    const dateOrderedIds = getBlogPostsByDateDesc().map((post) => post.id);
    const numberOrderedIds = getSortedBlogPosts().map((post) => post.id);
    for (const post of gatedPosts) {
      expect(dateOrderedIds).toContain(post.id); // shown on /blog with a lock badge
      expect(numberOrderedIds).not.toContain(post.id); // kept off the homepage
    }
    expect(getBlogPostsByDateDesc().length).toBe(blogPosts.length);
  });

  it('still resolves gated posts by id for direct links', () => {
    for (const post of gatedPosts) {
      expect(getBlogPostById(post.id)?.id).toBe(post.id);
    }
  });

  it('never links a public post to a gated next post', () => {
    const latestPublic = getSortedBlogPosts().at(-1);
    expect(latestPublic).toBeDefined();
    const next = latestPublic ? getNextBlogPost(latestPublic.blogNumber) : undefined;
    expect(next?.gated).not.toBe(true);
  });

  it('exposes a UTC-stable "Releasing …" label for the unreleased preview post', () => {
    // #74, #75, and #76 are public now, so none carries a release label.
    expect(getBlogReleaseLabel(getBlogPostById('what-if-superpowers-are-real')!)).toBeUndefined();
    expect(getBlogReleaseLabel(getBlogPostById('how-do-you-discover-your-superpower')!)).toBeUndefined();
    expect(getBlogReleaseLabel(getBlogPostById('the-problem-with-superpowers')!)).toBeUndefined();
    expect(getBlogReleaseLabel(getBlogPostById('do-superpowers-change')!)).toBe(
      'Thursday, July 2, 2026'
    );
    expect(getBlogReleaseLabel(getBlogPostById('the-superpower-epilogue')!)).toBe(
      'Tuesday, July 7, 2026'
    );
  });

  it('does not attach a release label to public posts', () => {
    const publicPost = getPublicBlogPosts()[0];
    expect(getBlogReleaseLabel(publicPost)).toBeUndefined();
  });
});
