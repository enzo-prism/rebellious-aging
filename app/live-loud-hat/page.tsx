import type { Metadata } from 'next';

import LiveLoudHat from '@/views/LiveLoudHat';
import { buildMetadata } from '@/lib/nextMetadata';
import { getRouteMetaByPath } from '@/lib/routeMetadata';

const routeMeta = getRouteMetaByPath('/live-loud-hat');

export const generateMetadata = (): Metadata => {
  return buildMetadata(
    routeMeta ?? {
      path: '/live-loud-hat',
      title: 'Live Loud Hat Waitlist',
      description:
        'Apply for the next small batch of Rebellious Aging Live Loud hats. Invite-only waitlist — Suz reviews every request.',
    }
  );
};

export default function LiveLoudHatPage() {
  return <LiveLoudHat />;
}
