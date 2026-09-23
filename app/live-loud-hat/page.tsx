import type { Metadata } from 'next';

import LiveLoudHat from '@/views/LiveLoudHat';
import { buildMetadata } from '@/lib/nextMetadata';
import { getRouteMetaByPath } from '@/lib/routeMetadata';

const routeMeta = getRouteMetaByPath('/live-loud-hat');

export const generateMetadata = (): Metadata => {
  return buildMetadata(
    routeMeta ?? {
      path: '/live-loud-hat',
      title: 'Rebellious Aging Hats: Live Loud! & the R',
      description:
        'See both Rebellious Aging hats, Live Loud! in green script and the R with its butterfly, then ask Suz for one from the next small batch.',
      image: '/hats/rebellious-aging-hats-og.jpg',
    }
  );
};

export default function LiveLoudHatPage() {
  return <LiveLoudHat />;
}
