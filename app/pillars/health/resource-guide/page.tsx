import PageBreadcrumbs from '@/components/seo/PageBreadcrumbs';
import type { Metadata } from 'next';

import WfpbResourceGuide from '@/views/WfpbResourceGuide';
import { buildMetadata } from '@/lib/nextMetadata';
import { getRouteMetaByPath } from '@/lib/routeMetadata';

const routeMeta = getRouteMetaByPath('/pillars/health/resource-guide');

export const generateMetadata = (): Metadata => {
  return buildMetadata(
    routeMeta ?? {
      path: '/pillars/health/resource-guide',
      title: 'Resource Guide',
      description:
        'A curated library of documentaries, books, cookbooks, websites, and talks to explore WFPB living at your own pace.',
    }
  );
};

export default function ResourceGuidePage() {
  return <>
    <div className="container mx-auto px-4 pt-6"><PageBreadcrumbs items={[{ name: "Health", path: "/pillars/health" }, { name: "Resource Guide", path: "/pillars/health/resource-guide" }]} /></div>
    <WfpbResourceGuide />
  </>;
}
