import { Suspense } from 'react';
import type { Metadata } from 'next';

import { buildMetadata } from '@/lib/nextMetadata';
import { getRouteMetaByPath } from '@/lib/routeMetadata';
import SearchClientPage from '@/pages/Search';

const routeMeta = getRouteMetaByPath('/search');

export const generateMetadata = (): Metadata => {
  return buildMetadata(
    routeMeta ?? {
      path: '/search',
      title: 'Search Rebellious Aging',
      description:
        'Search pillars, nutrition guides, blog posts, and videos to find exactly what you need on Rebellious Aging.',
    },
    { noindex: true }
  );
};

const SearchPageFallback = () => (
  <div className="min-h-screen bg-background px-4 py-4 sm:py-12">
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.28em] text-teal font-semibold">Search</p>
        <div className="h-11 w-5/6 sm:w-1/2 rounded-md bg-muted/40" />
        <div className="h-6 w-full max-w-3xl rounded bg-muted/40" />
      </div>
      <div className="sticky top-20 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:backdrop-blur-md border rounded-2xl p-3 sm:p-4 shadow-sm space-y-3">
        <div className="h-12 rounded-xl bg-muted/40" />
        <div className="flex flex-wrap gap-2">
          <div className="h-8 w-16 rounded-full bg-muted/40" />
          <div className="h-8 w-16 rounded-full bg-muted/40" />
          <div className="h-8 w-16 rounded-full bg-muted/40" />
          <div className="h-8 w-20 rounded-full bg-muted/40" />
          <div className="h-8 w-24 rounded-full bg-muted/40" />
        </div>
      </div>
      <div className="border rounded-2xl p-6 bg-muted/20 min-h-[220px]" />
    </div>
  </div>
);

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageFallback />}>
      <SearchClientPage />
    </Suspense>
  );
}
