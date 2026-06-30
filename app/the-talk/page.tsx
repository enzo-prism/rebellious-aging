import type { Metadata } from 'next';

import TheTalk from '@/views/TheTalk';
import { buildMetadata } from '@/lib/nextMetadata';
import { getRouteMetaByPath } from '@/lib/routeMetadata';

const routeMeta = getRouteMetaByPath('/the-talk');

export const generateMetadata = (): Metadata => {
  return buildMetadata(
    routeMeta ?? {
      path: '/the-talk',
      title: 'The Talk: Be the CEO of Your Own Health',
      description:
        "Watch Suz's talk on whole-food, plant-based living and rebellious aging, then get the free guides, recommended books, and documentaries she shares.",
      ogType: 'article',
      image: 'https://i.ytimg.com/vi/9g79lPoQNkU/maxresdefault.jpg',
    }
  );
};

export default function TheTalkPage() {
  return <TheTalk />;
}
