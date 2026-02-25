import type { Metadata } from 'next';

import Blog from '@/pages/Blog';
import { buildMetadata } from '@/lib/nextMetadata';
import { getRouteMetaByPath } from '@/lib/routeMetadata';

const routeMeta = getRouteMetaByPath('/blog');

export const generateMetadata = (): Metadata => {
  return buildMetadata(
    routeMeta ?? {
      path: '/blog',
      title: 'Rebellious Aging Blog',
      description:
        'Catch up on Suz’s long-form reflections on gratitude, nourishment, style, mindset, and rebellious aging.',
    }
  );
};

export default function BlogPage() {
  return <Blog />;
}
