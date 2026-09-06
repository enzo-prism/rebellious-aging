import PageBreadcrumbs from '@/components/seo/PageBreadcrumbs';
import type { Metadata } from 'next';

import { buildMetadata } from '@/lib/nextMetadata';
import { getRouteMetaByPath } from '@/lib/routeMetadata';
import Nutrition from '@/views/Nutrition';

const routeMeta = getRouteMetaByPath('/nutrition');

export const generateMetadata = (): Metadata => {
  return buildMetadata(
    routeMeta ?? {
      path: '/nutrition',
      title: 'Nutrition',
      description:
        'Explore the what, why, and how of Whole-Food, Plant-Based (WFPB) living with protocols, benefits, recipes, and expert-backed guidance.',
    }
  );
};

export default function NutritionPage() {
  return <>
    <div className="container mx-auto px-4 pt-6"><PageBreadcrumbs items={[{ name: "Nutrition", path: "/nutrition" }]} /></div>
    <Nutrition />
  </>;
}
