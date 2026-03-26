import type { Metadata } from 'next';

import SpeakingEvents from '@/views/SpeakingEvents';
import { buildMetadata } from '@/lib/nextMetadata';
import { getRouteMetaByPath } from '@/lib/routeMetadata';

const routeMeta = getRouteMetaByPath('/speaking-events');

export const generateMetadata = (): Metadata => {
  return buildMetadata(
    routeMeta ?? {
      path: '/speaking-events',
      title: 'Speaking Events',
      description:
        "Explore Suz's talks, community presentations, and future speaking appearances as Rebellious Aging keeps growing.",
    }
  );
};

export default function SpeakingEventsPage() {
  return <SpeakingEvents />;
}
