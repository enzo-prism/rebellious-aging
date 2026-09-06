'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useUrlFilters, UrlFiltersSync, writeParam } from '@/hooks/useUrlFilters';
import { ArrowRight, Lock, Search } from 'lucide-react';
import { getBlogPostsByDateDesc, getBlogReleaseLabel, isGatedBlogPost } from '@/data/blogPosts';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Seo from '@/components/seo/Seo';
import PageShareButton from '@/components/share/PageShareButton';
import PageTopUtilityRow from '@/components/share/PageTopUtilityRow';
import { getSeoRouteByPath } from '@/data/seoRoutes';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import SubstackAnnouncement from '@/components/common/SubstackAnnouncement';

const orderedBlogPosts = getBlogPostsByDateDesc();
const yearOptions = [...new Set(orderedBlogPosts.map((post) => String(post.dateSort.getUTCFullYear())))];
const parseBlogFilters = (params: URLSearchParams) => ({
  query: params.get('q') ?? '',
  selectedYear: yearOptions.includes(params.get('year') ?? '') ? params.get('year')! : 'all',
});
const writeBlogFilters = (filters: ReturnType<typeof parseBlogFilters>, params: URLSearchParams) => {
  writeParam(params, 'q', filters.query);
  writeParam(params, 'year', filters.selectedYear, 'all');
};

const Blog = () => {
  const [{ query, selectedYear }, setFilters] = useUrlFilters(parseBlogFilters, writeBlogFilters);
  const visiblePosts = useMemo(() => orderedBlogPosts.filter((post) =>
    (selectedYear === 'all' || String(post.dateSort.getUTCFullYear()) === selectedYear) &&
    `${post.title} ${post.excerpt}`.toLowerCase().includes(query.trim().toLowerCase())
  ), [selectedYear, query]);
  const seoConfig = getSeoRouteByPath('/blog');

  return (
    <div className="min-h-screen bg-background px-4 py-8 sm:py-12 max-w-4xl mx-auto">
      <UrlFiltersSync />
      {seoConfig && (
        <Seo
          title={seoConfig.title}
          description={seoConfig.description}
          canonicalPath={seoConfig.path}
        />
      )}

      <PageTopUtilityRow>
        <PageShareButton />
      </PageTopUtilityRow>
      <header className="mb-8 max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-teal">Notes from Suz</p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">The blog for living boldly.</h1>
        <p className="text-lg leading-relaxed text-gray-700">Explore the blog for fresh perspectives on aging, plant-based living, and finding more joy in the everyday.</p>
      </header>
      <div className="relative mb-5">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-teal" aria-hidden="true" />
        <Input type="search" aria-label="Search articles" placeholder="Search articles by title or topic" value={query} onChange={(event) => setFilters({ query: event.target.value })} className="h-12 rounded-xl pl-12" />
      </div>
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Filter by year</span>
        <ToggleGroup
          type="single"
          value={selectedYear}
          onValueChange={(value) => setFilters({ selectedYear: value || 'all' })}
          variant="outline"
          size="sm"
          className="flex flex-wrap justify-start gap-2"
          aria-label="Filter blog posts by year"
        >
          <ToggleGroupItem value="all" className="min-h-11 rounded-full px-4 text-base">
            All
          </ToggleGroupItem>
          {yearOptions.map((year) => (
            <ToggleGroupItem key={year} value={year} className="min-h-11 rounded-full px-4 text-base">
              {year}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      
      <p role="status" className="mb-6 text-sm text-muted-foreground">{visiblePosts.length} article{visiblePosts.length === 1 ? '' : 's'}{selectedYear !== 'all' ? ` from ${selectedYear}` : ''}</p>
      {visiblePosts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-muted-foreground/40 bg-muted/30 p-8 text-center text-muted-foreground">
          <p className="mb-4">No articles match your search. Try another topic or clear your filters.</p>
          <Button variant="outline" onClick={() => { setFilters({ query: '', selectedYear: 'all' }); }}>Clear filters</Button>
        </div>
      ) : (
        <div className="divide-y divide-border border-t border-border">
          {visiblePosts.map((post) => {
            const gated = isGatedBlogPost(post);
            const releaseLabel = gated ? getBlogReleaseLabel(post) : undefined;

            return (
              <article key={post.id} className="py-7">
                <Link
                  href={`/blog/${post.id}`}
                  aria-label={gated ? `${post.title} (password protected)` : undefined}
                  className="group block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-2 text-sm text-muted-foreground">
                    <span>
                      {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(post.dateSort)} · {post.readTime} · #{post.blogNumber}
                    </span>
                    {gated && (
                      <Badge
                        variant="outline"
                        className="gap-1 border-muted-foreground/30 font-medium uppercase tracking-wide text-muted-foreground"
                      >
                        <Lock className="h-3 w-3" aria-hidden />
                        Private
                      </Badge>
                    )}
                    {releaseLabel && (
                      <span className="font-semibold text-teal">Releasing {releaseLabel}</span>
                    )}
                  </div>
                  <h2 className="text-2xl font-semibold mb-3 group-hover:text-teal">
                    {post.title}
                  </h2>
                  <p className="text-gray-700 leading-relaxed max-w-3xl">{post.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-2 font-semibold text-teal">{gated ? 'View preview' : 'Read article'}<ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
                </Link>
              </article>
            );
          })}
        </div>
      )}
      <SubstackAnnouncement className="mt-10" />
      <p className="mt-6 text-gray-700">Looking for a practical first step? <Link href="/guides" className="font-semibold text-teal underline underline-offset-4">Explore the free guides.</Link></p>
    </div>
  );
};

export default Blog;
