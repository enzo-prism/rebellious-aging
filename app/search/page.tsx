import type { Metadata } from 'next';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

import { buildMetadata } from '@/lib/nextMetadata';
import { getRouteMetaByPath } from '@/lib/routeMetadata';

const SearchClientPage = dynamic(() => import('@/pages/Search'), {
  ssr: false,
});

const routeMeta = getRouteMetaByPath('/search');

export const generateMetadata = (): Metadata => {
  return buildMetadata(
    routeMeta ?? {
      path: '/search',
      title: 'Search Rebellious Aging',
      description:
        'Search pillars, nutrition guides, blog posts, and videos to find exactly what you need on Rebellious Aging.',
    }
  );
};

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center px-4">
          <p className="text-muted-foreground">Loading search…</p>
        </div>
      }
    >
      <SearchClientPage />
    </Suspense>
  );
}
