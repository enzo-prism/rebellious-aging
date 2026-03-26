import type { Metadata } from 'next';

import DrSeussPage from '@/views/DrSeussPage';
import { buildMetadata } from '@/lib/nextMetadata';
import { getRouteMetaByPath } from '@/lib/routeMetadata';

const routeMeta = getRouteMetaByPath('/dr-seuss');

export const generateMetadata = (): Metadata => {
  return buildMetadata(
    routeMeta ?? {
      path: '/dr-seuss',
      title: 'Dr. Seuss & Rebellious Aging',
      description:
        "Explore why Dr. Seuss's You're Only Old Once! resonates with Rebellious Aging through humor, healthcare satire, resilience, and Suz's Santa Cruz reading.",
      ogType: 'article',
    }
  );
};

export default function DrSeussRoute() {
  return <DrSeussPage />;
}
