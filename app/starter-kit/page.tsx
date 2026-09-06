import PageBreadcrumbs from '@/components/seo/PageBreadcrumbs';
import type { Metadata } from 'next';

import StarterKit from '@/views/StarterKit';
import { buildMetadata } from '@/lib/nextMetadata';
import { getRouteMetaByPath } from '@/lib/routeMetadata';

const routeMeta = getRouteMetaByPath('/starter-kit');

export const generateMetadata = (): Metadata => {
  return buildMetadata(
    routeMeta ?? {
      path: '/starter-kit',
      title: 'Starter Kit',
      description:
        'A gentle starter kit for women 55-105 to begin with Nibble, Wiggle, Dazzle, and Gratefulness in the Rebellious Aging journey.',
    }
  );
};

export default function StarterKitPage() {
  return <>
    <div className="container mx-auto px-4 pt-6"><PageBreadcrumbs items={[{ name: "Starter Kit", path: "/starter-kit" }]} /></div>
    <StarterKit />
  </>;
}
