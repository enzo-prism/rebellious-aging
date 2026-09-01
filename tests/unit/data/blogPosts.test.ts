import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';

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
import { blogPostCtas } from '@/data/blogPostCtas';
import { blogPostContent } from '@/data/blogPostContent';

describe('blog post data', () => {
  it('provides a community CTA for every blog post', () => {
    const missingCtaIds = blogPosts.filter((post) => !blogPostCtas[post.id]).map((post) => post.id);

    expect(missingCtaIds).toEqual([]);
  });

  it('provides rendered content for every blog post', () => {
    const missingContentIds = blogPosts.filter((post) => !blogPostContent[post.id]).map((post) => post.id);

    expect(missingContentIds).toEqual([]);
  });

  it('preserves source-defining passages across blogs 94–100', () => {
    const sourceAnchors: Record<string, string[]> = {
      'the-front-is-marketing-the-back-is-information': [
        'The words NO SUGAR were right there on the front of the package.',
        'The point is to make the choice with our eyes wide open.',
        'Yuka is advertised as a completely independent app',
      ],
      'the-ship-hasnt-sailed': [
        'Today is data, it is not destiny.',
        'There may in fact be another boat at the dock.',
        'Perhaps it is simply just waiting for you to take the first step toward the dock.',
      ],
      'keep-the-truth-change-the-route': [
        'The truth did not need to be abandoned.',
        'The pivot is part of the process.',
        'That may be the real power of the pivot.',
      ],
      'when-the-door-cracks-open': [
        'Everything you’ve ever wanted is on the other side of fear.',
        'Confidence was not waiting for me before the door',
        'It was standing at the entrance to your next beginning.',
      ],
      'the-stories-we-tell-ourselves': [
        'A familiar story can feel like home even when it has become a cage.',
        'What has this story cost me?',
        'But you might begin by remembering that you have wings.',
      ],
      'you-are-still-holding-the-pen': [
        'The goal is not to rewrite history.',
        'What small thing could I do that would provide evidence for my new story?',
        'And you are holding the pen.',
      ],
      'a-marker-beside-the-road': [
        'Blog 100 is not a finish line. It is a marker beside the road.',
        'Today belongs to number 100.',
        'The best may still be waiting just around the bend.',
      ],
    };

    for (const [postId, anchors] of Object.entries(sourceAnchors)) {
      const entry = blogPostContent[postId];
      const { container, unmount } = render(entry.body);
      const renderedText = container.textContent?.replace(/\s+/g, ' ').trim() ?? '';

      for (const anchor of anchors) {
        expect(renderedText, `${postId} is missing source text: ${anchor}`).toContain(anchor);
      }

      expect(container.querySelectorAll('p').length, `${postId} lost too much source structure`).toBeGreaterThanOrEqual(10);
      unmount();
    }
  });

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

  it('keeps the full superpower series public with no gated previews', () => {
    const gatedIds = gatedPosts.map((post) => post.id);
    // The entire superpower series (#74–#78) is public and indexable; #77 and #78
    // were ungated from their password-protected previews on 2026-07-01.
    expect(gatedIds).not.toContain('what-if-superpowers-are-real');
    expect(gatedIds).not.toContain('how-do-you-discover-your-superpower');
    expect(gatedIds).not.toContain('the-problem-with-superpowers');
    expect(gatedIds).not.toContain('do-superpowers-change');
    expect(gatedIds).not.toContain('the-superpower-epilogue');
    expect(gatedPosts).toHaveLength(0);
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

  it('does not attach a "Releasing …" label to any superpower post now that they are public', () => {
    // The whole superpower series (#74–#78) is public, so none carries a release label.
    expect(getBlogReleaseLabel(getBlogPostById('what-if-superpowers-are-real')!)).toBeUndefined();
    expect(getBlogReleaseLabel(getBlogPostById('how-do-you-discover-your-superpower')!)).toBeUndefined();
    expect(getBlogReleaseLabel(getBlogPostById('the-problem-with-superpowers')!)).toBeUndefined();
    expect(getBlogReleaseLabel(getBlogPostById('do-superpowers-change')!)).toBeUndefined();
    expect(getBlogReleaseLabel(getBlogPostById('the-superpower-epilogue')!)).toBeUndefined();
  });

  it('does not attach a release label to public posts', () => {
    const publicPost = getPublicBlogPosts()[0];
    expect(getBlogReleaseLabel(publicPost)).toBeUndefined();
  });
});
