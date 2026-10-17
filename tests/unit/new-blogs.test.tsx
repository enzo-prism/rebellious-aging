import { createHash } from 'node:crypto';
import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { generateMetadata, generateStaticParams } from '../../app/blog/[postId]/page';
import buildSitemap from '../../app/sitemap';
import { buildSearchIndex } from '../../scripts/build-search-index';
import { buildLlmsText } from '../../scripts/generate-llms';
import { blogPostContent } from '@/data/blogPostContent';
import { formatBlogListingDate } from '@/data/blogListing';
import {
  blogPosts, getBlogPostById, getHomeBlogCards, getLatestBlogCard,
  getNextBlogPost, getPublicBlogPosts, getBlogListingCards,
} from '@/data/blogPosts';
import { getBlogPublishInstant, resetBlogScheduleNowForTests } from '@/lib/blogSchedule';
import { NEW_BLOG_POSTS } from '../helpers/newBlogPosts';
import { AT_WEBSITE_RELEASE, productionEnv } from '../helpers/scheduledBlogPosts';

afterEach(() => {
  vi.unstubAllEnvs();
  resetBlogScheduleNowForTests();
});

const setProductionClock = (now: Date) => {
  resetBlogScheduleNowForTests();
  vi.stubEnv('VERCEL_ENV', 'production');
  vi.stubEnv('NEXT_PUBLIC_VERCEL_ENV', 'production');
  vi.stubEnv('BLOG_SCHEDULE_NOW', now.toISOString());
};

describe('Suz’s October 16 share batch, blogs 113–115', () => {
  for (const source of NEW_BLOG_POSTS) {
    it(`preserves the complete source and structure of #${source.blogNumber}`, () => {
      expect(blogPosts.filter((post) => post.id === source.id)).toHaveLength(1);
      expect(blogPosts.filter((post) => post.blogNumber === source.blogNumber)).toHaveLength(1);
      expect(getBlogPostById(source.id)).toMatchObject({ title: source.title, date: source.date });
      expect(formatBlogListingDate(getBlogPostById(source.id)!.dateSort.toISOString())).toBe('Oct 16, 2026');
      const container = document.createElement('div');
      container.innerHTML = renderToStaticMarkup(blogPostContent[source.id].body).replace(/<br\s*\/?\s*>/g, ' ');
      const paragraphs = Array.from(container.querySelectorAll('.prose > p'));
      expect(paragraphs).toHaveLength(source.paragraphs);
      const text = paragraphs.map((paragraph) => paragraph.textContent).join(' ').replace(/\s+/g, ' ').trim();
      expect(createHash('sha256').update(text).digest('hex')).toBe(source.bodyHash);
      expect(container.querySelectorAll('img, a')).toHaveLength(0);
      expect(container.querySelector('strong em')?.textContent).toBeTruthy();
    });

    for (const offset of [-1, 0]) {
      it(`keeps every surface aligned ${offset === -1 ? 'just before' : 'at'} #${source.blogNumber}’s Pacific midnight`, async () => {
        const instant = new Date(source.publishedAt);
        expect(getBlogPublishInstant(source.date)?.toISOString()).toBe(source.publishedAt);
        const now = new Date(instant.getTime() + offset);
        setProductionClock(now);
        const released = NEW_BLOG_POSTS.filter((post) => new Date(post.publishedAt) <= now);
        const hidden = NEW_BLOG_POSTS.filter((post) => new Date(post.publishedAt) > now);
        const context = { env: productionEnv, now };
        const priorCount = now >= AT_WEBSITE_RELEASE ? 112 : 109;
        expect(getPublicBlogPosts(context)).toHaveLength(priorCount + released.length);
        expect(getBlogListingCards(context)).toHaveLength(priorCount + released.length);
        if (released.length === 3) {
          expect(getBlogListingCards(context).slice(0, 3).map((post) => post.blogNumber)).toEqual([115, 114, 113]);
        }
        expect(getLatestBlogCard(context)?.blogNumber).toBe(priorCount + released.length);
        expect(getHomeBlogCards(context)[0].blogNumber).toBe(priorCount + released.length);
        const params = generateStaticParams().map((entry) => entry.postId);
        const machines = [JSON.stringify(buildSitemap()), JSON.stringify(buildSearchIndex()), buildLlmsText()];
        for (const post of released) {
          expect(params).toContain(post.id);
          for (const content of machines) expect(content).toContain(post.id);
          const metadata = await generateMetadata({ params: Promise.resolve({ postId: post.id }) });
          expect(metadata.title).toBe(post.title);
          expect(metadata.alternates?.canonical).toBe(`https://www.rebelwithsuz.com/blog/${post.id}`);
        }
        for (const post of hidden) {
          expect(params).not.toContain(post.id);
          for (const content of machines) expect(content).not.toContain(post.id);
        }
        expect(getNextBlogPost(priorCount + released.length, context)).toBeUndefined();
      });
    }
  }

  it('preserves the author’s distinct emphasis and intentional line breaks', () => {
    const markup = (id: string) => renderToStaticMarkup(blogPostContent[id].body);
    expect(markup('weekending-confusion')).toContain('<p class="text-center"><strong>And There Goes Saturday.</strong></p>');
    expect(markup('weekending-confusion')).toContain('relaxed.<br/>“Needs improvement. Still thinking.”🤣');
    expect(markup('the-power-of-keeping-quiet')).toContain('<em>(Some ideas need a little privacy to grow).</em>');
    expect(markup('the-power-of-keeping-quiet')).toContain('<strong>THEIR</strong>');
    expect(markup('is-this-worth-sharing')).toContain('💚<strong><em>The Accidental Blogger</em></strong>');
  });
});
