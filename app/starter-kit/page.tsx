import type { Metadata } from 'next';

import StarterKit from '@/pages/StarterKit';
import { buildMetadata } from '@/lib/nextMetadata';
import { getRouteMetaByPath } from '@/lib/routeMetadata';

const routeMeta = getRouteMetaByPath('/starter-kit');

export const generateMetadata = (): Metadata => {
  return buildMetadata(
    routeMeta ?? {
      path: '/starter-kit',
      title: 'Rebellious Aging Starter Kit',
      description:
        'A gentle starter kit for women 55-105 to begin with Nibble, Wiggle, Dazzle, and Gratefulness in the Rebellious Aging journey.',
    }
  );
};

export default function StarterKitPage() {
  return <StarterKit />;
}
