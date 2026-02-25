import type { Metadata } from 'next';

import Movement from '@/pages/Movement';
import { buildMetadata } from '@/lib/nextMetadata';
import { getRouteMetaByPath } from '@/lib/routeMetadata';

const routeMeta = getRouteMetaByPath('/our-story');

export const generateMetadata = (): Metadata => {
  return buildMetadata(
    routeMeta ?? {
      path: '/our-story',
      title: 'Our Story',
      description: 'Meet Suz and discover how Rebellious Aging challenges outdated rules with science-backed lifestyle shifts rooted in compassion.',
    }
  );
};

export default function OurStoryPage() {
  return <Movement />;
}
