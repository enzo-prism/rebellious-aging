import type { Metadata } from 'next';

import Home from '@/views/Home';
import { buildMetadata } from '@/lib/nextMetadata';
import { getHomeMeta } from '@/lib/routeMetadata';

export const generateMetadata = (): Metadata => {
  const routeMeta = getHomeMeta();
  return buildMetadata(routeMeta, { title: 'rebelwithsuz.com' });
};

export default function HomePage() {
  return <Home />;
}
