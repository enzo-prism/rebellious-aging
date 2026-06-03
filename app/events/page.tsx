import type { Metadata } from 'next';

import Events from '@/views/Events';
import { buildMetadata } from '@/lib/nextMetadata';
import { getRouteMetaByPath } from '@/lib/routeMetadata';

const routeMeta = getRouteMetaByPath('/events');

export const generateMetadata = (): Metadata => {
  return buildMetadata(
    routeMeta ?? {
      path: '/events',
      title: 'Community Events',
      description:
        'Live Zoom gatherings Suz hosts for the Rebellious Aging community — free for members of our private Facebook group, where every meeting link is shared.',
    }
  );
};

export default function EventsPage() {
  return <Events />;
}
