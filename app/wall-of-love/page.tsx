import type { Metadata } from 'next';

import WallOfLove from '@/views/WallOfLove';
import { buildMetadata } from '@/lib/nextMetadata';
import { getRouteMetaByPath } from '@/lib/routeMetadata';

const routeMeta = getRouteMetaByPath('/wall-of-love');

export const generateMetadata = (): Metadata => {
  return buildMetadata(
    routeMeta ?? {
      path: '/wall-of-love',
      title: 'Wall of Love | Kind Words from the Rebellious Aging Community',
      description:
        'A wall of love for Suz: real comments from the Rebellious Aging community on TikTok and YouTube, celebrating confidence, courage, and aging boldly.',
    }
  );
};

export default function WallOfLovePage() {
  return <WallOfLove />;
}
