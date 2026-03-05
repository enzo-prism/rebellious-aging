import type { Metadata } from 'next';

import FacebookGroup from '@/views/FacebookGroup';
import { buildMetadata } from '@/lib/nextMetadata';
import { getRouteMetaByPath } from '@/lib/routeMetadata';

const routeMeta = getRouteMetaByPath('/facebook-group');

export const generateMetadata = (): Metadata => {
  return buildMetadata(
    routeMeta ?? {
      path: '/facebook-group',
      title: 'Facebook Group',
      description:
        'Join the private Rebellious Aging Facebook group for daily inspiration, accountability, and plant-strong conversation.',
    }
  );
};

export default function FacebookGroupPage() {
  return <FacebookGroup />;
}
