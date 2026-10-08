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
  getVisibleBlogPosts,
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

  it('preserves Suz’s wording in blogs 102 and 103', () => {
    const sourceAnchors: Record<string, string[]> = {
      'hard-is-not-the-same-as-impossible': [
        'But I have noticed something.',
        'There are hard things that we can choose..',
        'struggling with something does not not mean we are incapable of doing it.',
        'It was an invitation to meet the person you are still becoming.',
      ],
      'i-forgot-how-to-weekend': [
        'I no longer WEEKENDED.',
        'Life does enjoy a pivot.',
        'Cyndi Lauper - Girls Just Want To Have Fun (Official Video)',
        'You are simply being.',
      ],
    };

    for (const [postId, anchors] of Object.entries(sourceAnchors)) {
      const entry = blogPostContent[postId];
      const { container, unmount } = render(entry.body);
      const renderedText = container.textContent?.replace(/\s+/g, ' ').trim() ?? '';

      for (const anchor of anchors) {
        expect(renderedText, `${postId} is missing source text: ${anchor}`).toContain(anchor);
      }

      if (postId === 'i-forgot-how-to-weekend') {
        expect(container.querySelector('a')?.getAttribute('href')).toBe(
          'https://www.youtube.com/watch?v=PIb6AZdTr-A',
        );
      }

      unmount();
    }
  });

  it('preserves Suz’s wording in blogs 104 through 106', () => {
    const sourceAnchors: Record<string, string[]> = {
      'the-power-of-doing-nothing': [
        'DOING NOTHING!',
        'every day became a workday wearing different clothes.',
        'Humans need moments in which nothing is required of them.',
        'I think it is time for life to catch me.',
      ],
      'you-are-not-lost-you-are-between-identities': [
        'Maybe you are not lost. Maybe you are between identities.',
        'It may even need some of the nothingness I wrote about in Blog 104.',
        'That seed is still becoming.',
        'You are under revision.',
      ],
      'dont-trip-over-what-is-behind-you': [
        'But it DOES NOT DESERVE unlimited authority over what happens next.',
        'A mistake is something you made. It is NOT something you are.',
        'Try not to trip over it.',
      ],
    };
    const crossLinks: Record<string, string> = {
      'the-power-of-doing-nothing': '/blog/i-forgot-how-to-weekend',
      'you-are-not-lost-you-are-between-identities': '/blog/the-power-of-doing-nothing',
    };

    for (const [postId, anchors] of Object.entries(sourceAnchors)) {
      const entry = blogPostContent[postId];
      const { container, unmount } = render(entry.body);
      const renderedText = container.textContent?.replace(/\s+/g, ' ').trim() ?? '';

      for (const anchor of anchors) {
        expect(renderedText, `${postId} is missing source text: ${anchor}`).toContain(anchor);
      }
      expect(renderedText).toContain('💚 The Accidental Blogger');

      if (crossLinks[postId]) {
        expect(container.querySelector('a')?.getAttribute('href')).toBe(crossLinks[postId]);
      }

      unmount();
    }

    expect(getNextBlogPost(103)?.id).toBe('the-power-of-doing-nothing');
    expect(getNextBlogPost(105)?.id).toBe('dont-trip-over-what-is-behind-you');
  });

  it('preserves Suz’s wording in blogs 110 through 112', () => {
    const sourceAnchors: Record<string, string[]> = {
      'a-boundary-is-not-an-argument': [
        'A Boundary is NOT An Argument',
        'She chose not to attend.',
        'Wowzer. Their surprise was obvious.',
        'It was the discomfort of being misunderstood.',
        'That is what a boundary is.',
        'I do not have to turn my boundary into a courtroom argument',
        'Then stop.',
        'A boundary is a decision, NOT an opening statement in a debate.',
      ],
      'are-your-boundaries-protecting-your-peace-or-protecting-your-fear': [
        'too. There is something wonderfully freeing',
        'Could I sometimes be using that gate to keep myself from something I really want?',
        '“I don’t want to” and “I am afraid to” can sound remarkably alike',
        'I get to close it.',
        'I also get to open it.',
        'I want my boundaries to make room for me, including the parts that still want to grow.',
      ],
      'enough-according-to-whom': [
        'say, "I wish you enough."',
        'Am I enough?',
        'The unfinished “things” are running the meeting.',
        'distracted, or interrupted',
        'There can be more to do, and I can have done enough for today.',
        'I wish you enough.',
      ],
    };

    for (const [postId, anchors] of Object.entries(sourceAnchors)) {
      const entry = blogPostContent[postId];
      const heading = render(entry.heading);
      const body = render(entry.body);
      const renderedText = `${heading.container.textContent ?? ''} ${body.container.textContent ?? ''}`
        .replace(/\s+/g, ' ')
        .trim();

      for (const anchor of anchors) {
        expect(renderedText, `${postId} is missing source text: ${anchor}`).toContain(anchor);
      }
      expect(renderedText).toContain('💚 The Accidental Blogger');
      expect(renderedText).not.toMatch(/Blog 11[012]/);
      expect(renderedText).not.toMatch(/\bI\s*$/);
      heading.unmount();
      body.unmount();
    }

    const showScheduled = { env: { SHOW_SCHEDULED_POSTS: '1' } };
    expect(getNextBlogPost(109, showScheduled)?.id).toBe('a-boundary-is-not-an-argument');
    expect(getNextBlogPost(110, showScheduled)?.id).toBe('are-your-boundaries-protecting-your-peace-or-protecting-your-fear');
    expect(getNextBlogPost(111, showScheduled)?.id).toBe('enough-according-to-whom');
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
    const showScheduled = { env: { SHOW_SCHEDULED_POSTS: '1' } };
    expect(getPublicBlogPosts(showScheduled).length).toBe(blogPosts.length - gatedPosts.length);
  });

  it('lists gated posts in the blog index but not on homepage surfaces', () => {
    const dateOrderedIds = getBlogPostsByDateDesc().map((post) => post.id);
    const numberOrderedIds = getSortedBlogPosts().map((post) => post.id);
    for (const post of gatedPosts) {
      expect(dateOrderedIds).toContain(post.id); // shown on /blog with a lock badge
      expect(numberOrderedIds).not.toContain(post.id); // kept off the homepage
    }
    expect(getBlogPostsByDateDesc({ env: { SHOW_SCHEDULED_POSTS: '1' } }).length).toBe(blogPosts.length);
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

describe('scheduled blog publish gate', () => {
  const scheduledIds = [
    'a-boundary-is-not-an-argument',
    'are-your-boundaries-protecting-your-peace-or-protecting-your-fear',
    'enough-according-to-whom',
  ] as const;
  const productionEnv = {
    NODE_ENV: 'production',
    VERCEL_ENV: 'production',
    NEXT_PUBLIC_VERCEL_ENV: 'production',
  };
  const previewEnv = {
    NODE_ENV: 'production',
    VERCEL_ENV: 'preview',
    NEXT_PUBLIC_VERCEL_ENV: 'preview',
  };
  const today = new Date('2026-10-07T17:00:00.000Z');
  const after110 = new Date('2026-11-10T08:00:00.000Z');
  const after111 = new Date('2026-11-12T08:00:00.000Z');
  const after112 = new Date('2026-11-17T08:00:00.000Z');

  it('hides future posts on production and shows them on preview', () => {
    const productionIds = getVisibleBlogPosts({ env: productionEnv, now: today }).map((post) => post.id);
    const previewIds = getVisibleBlogPosts({ env: previewEnv, now: today }).map((post) => post.id);
    const publicProductionIds = getPublicBlogPosts({ env: productionEnv, now: today }).map((post) => post.id);
    const indexProductionIds = getBlogPostsByDateDesc({ env: productionEnv, now: today }).map((post) => post.id);

    for (const id of scheduledIds) {
      expect(productionIds).not.toContain(id);
      expect(publicProductionIds).not.toContain(id);
      expect(indexProductionIds).not.toContain(id);
      expect(previewIds).toContain(id);
    }

    expect(productionIds).toContain('the-fence-has-a-gate');
    expect(productionIds).toContain('birthing-your-authentic-self');
    expect(getNextBlogPost(109, { env: productionEnv, now: today })).toBeUndefined();
    expect(getNextBlogPost(109, { env: previewEnv, now: today })?.id).toBe('a-boundary-is-not-an-argument');
    expect(getSortedBlogPosts({ env: productionEnv, now: today }).at(-1)?.id).toBe('the-fence-has-a-gate');
  });

  it('publishes each scheduled post once the mocked clock passes its date', () => {
    expect(
      getVisibleBlogPosts({ env: productionEnv, now: after110 }).map((post) => post.id)
    ).toContain('a-boundary-is-not-an-argument');
    expect(
      getVisibleBlogPosts({ env: productionEnv, now: after110 }).map((post) => post.id)
    ).not.toContain('are-your-boundaries-protecting-your-peace-or-protecting-your-fear');

    expect(
      getVisibleBlogPosts({ env: productionEnv, now: after111 }).map((post) => post.id)
    ).toEqual(
      expect.arrayContaining([
        'a-boundary-is-not-an-argument',
        'are-your-boundaries-protecting-your-peace-or-protecting-your-fear',
      ])
    );
    expect(
      getVisibleBlogPosts({ env: productionEnv, now: after111 }).map((post) => post.id)
    ).not.toContain('enough-according-to-whom');

    const afterAll = getVisibleBlogPosts({ env: productionEnv, now: after112 }).map((post) => post.id);
    for (const id of scheduledIds) {
      expect(afterAll).toContain(id);
    }
    expect(getNextBlogPost(109, { env: productionEnv, now: after110 })?.id).toBe(
      'a-boundary-is-not-an-argument'
    );
    expect(getNextBlogPost(111, { env: productionEnv, now: after112 })?.id).toBe(
      'enough-according-to-whom'
    );
  });
});
