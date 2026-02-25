'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { getBlogPostsByDateDesc } from '@/data/blogPosts';
import Seo from '@/components/seo/Seo';
import { buildWebSiteJsonLd } from '@/lib/structuredData';
import { getSeoRouteByPath } from '@/data/seoRoutes';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const yearOptions = ['2026', '2025'] as const;
type BlogYear = (typeof yearOptions)[number];
type BlogYearFilter = BlogYear | 'all';

const Blog = () => {
  const [selectedYear, setSelectedYear] = useState<BlogYearFilter>('all');
  const orderedBlogPosts = useMemo(() => getBlogPostsByDateDesc(), []);
  const visiblePosts = useMemo(() => {
    if (selectedYear === 'all') {
      return orderedBlogPosts;
    }

    const year = Number(selectedYear);
    return orderedBlogPosts.filter((post) => post.dateSort.getUTCFullYear() === year);
  }, [orderedBlogPosts, selectedYear]);
  const seoConfig = getSeoRouteByPath('/blog');
  const emptyStateCopy =
    selectedYear === 'all'
      ? 'No blog posts yet.'
      : `No posts yet for ${selectedYear}. Check "All" to see every post.`;

  return (
    <div className="min-h-screen bg-background px-4 py-12 max-w-3xl mx-auto">
      {seoConfig && (
        <Seo
          title={seoConfig.title}
          description={seoConfig.description}
          canonicalPath={seoConfig.path}
          jsonLd={buildWebSiteJsonLd()}
        />
      )}

      <h1 className="text-4xl font-bold mb-6">Blog</h1>
      <div className="bg-teal/10 border border-teal/20 rounded-2xl p-6 mb-10">
        <p className="text-gray-700">
          New to Rebellious Aging? Start with the{' '}
              <Link href="/pillars/health/nutrition-guide" className="text-teal font-semibold hover:underline">
                Whole-Food, Plant-Based Guide
              </Link>{' '}
              or explore the{' '}
              <Link href="/pillars/gratitude" className="text-teal font-semibold hover:underline">
                Gratitude Pillar
              </Link>{' '}
              for daily mindset practices.
            </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-8">
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Filter by year</span>
        <ToggleGroup
          type="single"
          value={selectedYear}
          onValueChange={(value) => setSelectedYear((value || 'all') as BlogYearFilter)}
          variant="outline"
          size="sm"
          className="flex flex-wrap justify-start gap-2"
          aria-label="Filter blog posts by year"
        >
          <ToggleGroupItem value="all" className="rounded-full px-4">
            All
          </ToggleGroupItem>
          {yearOptions.map((year) => (
            <ToggleGroupItem key={year} value={year} className="rounded-full px-4">
              {year}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      
      {visiblePosts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-muted-foreground/40 bg-muted/30 p-8 text-center text-muted-foreground">
          {emptyStateCopy}
        </div>
      ) : (
        <div className="space-y-8">
          {visiblePosts.map((post) => (
            <article key={post.id}>
              <Link
                href={`/blog/${post.id}`}
                className="block hover:opacity-70 transition-opacity"
              >
                <p className="text-sm text-muted-foreground mb-2">
                  {post.dateSort.getUTCFullYear()} | {post.readTime}
                </p>
                <h2 className="text-2xl font-semibold mb-2">
                  <span className="text-primary font-bold">#{post.blogNumber}</span>
                  {' - '}
                  {post.title}
                </h2>
                <p className="text-muted-foreground">{post.excerpt}</p>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
