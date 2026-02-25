import type { Metadata } from 'next';

import WelcomeLetter from '@/pages/WelcomeLetter';
import { buildMetadata } from '@/lib/nextMetadata';
import { getRouteMetaByPath } from '@/lib/routeMetadata';

const routeMeta = getRouteMetaByPath('/welcome-letter');

export const generateMetadata = (): Metadata => {
  return buildMetadata(
    routeMeta ?? {
      path: '/welcome-letter',
      title: 'Welcome Letter',
      description:
        'A heartfelt welcome from Suz inviting women 55-105 to join a bold movement centered on community, plant-strong nourishment, and confidence.',
    }
  );
};

export default function WelcomeLetterPage() {
  return <WelcomeLetter />;
}
