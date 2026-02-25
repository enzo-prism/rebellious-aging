import type { Metadata } from 'next';

import Home from '@/pages/Home';
import { buildMetadata } from '@/lib/nextMetadata';
import { getHomeMeta } from '@/lib/routeMetadata';

export const generateMetadata = (): Metadata => {
  const routeMeta = getHomeMeta();
  return buildMetadata(routeMeta);
};

export default function HomePage() {
  return <Home />;
}
