import type { Metadata } from 'next';

import WfpbResourceGuide from '@/pages/WfpbResourceGuide';
import { buildMetadata } from '@/lib/nextMetadata';
import { getRouteMetaByPath } from '@/lib/routeMetadata';

const routeMeta = getRouteMetaByPath('/pillars/health/resource-guide');

export const generateMetadata = (): Metadata => {
  return buildMetadata(
    routeMeta ?? {
      path: '/pillars/health/resource-guide',
      title: 'Whole-Food, Plant-Based Resource Guide',
      description:
        'A curated library of documentaries, books, cookbooks, websites, and talks to explore WFPB living at your own pace.',
    }
  );
};

export default function ResourceGuidePage() {
  return <WfpbResourceGuide />;
}
