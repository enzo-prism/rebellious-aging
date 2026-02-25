import type { Metadata } from 'next';

import NotFound from '@/pages/NotFound';
import { buildMetadata } from '@/lib/nextMetadata';
import { getRouteMetaByPath } from '@/lib/routeMetadata';

const routeMeta = getRouteMetaByPath('/404');

export const generateMetadata = (): Metadata => {
  return buildMetadata(
    routeMeta ?? {
      path: '/404',
      title: 'Page Not Found',
      description: 'This page does not exist. Return to our home and keep exploring your rebellious journey.',
    },
    { noindex: true }
  );
};

export default function LegacyNotFoundRoutePage() {
  return <NotFound />;
}
