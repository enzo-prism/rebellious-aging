import type { Metadata } from 'next';

import Team from '@/pages/Team';
import { buildMetadata } from '@/lib/nextMetadata';
import { getRouteMetaByPath } from '@/lib/routeMetadata';

const routeMeta = getRouteMetaByPath('/team');

export const generateMetadata = (): Metadata => {
  return buildMetadata(
    routeMeta ?? {
      path: '/team',
      title: 'Team',
      description:
        'Meet the collaborators and creatives bringing the Rebellious Aging vision to life through photography, storytelling, and design.',
    }
  );
};

export default function TeamPage() {
  return <Team />;
}
