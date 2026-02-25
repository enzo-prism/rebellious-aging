import type { Metadata } from 'next';

import NutritionGuide from '@/pages/NutritionGuide';
import { buildMetadata } from '@/lib/nextMetadata';
import { getRouteMetaByPath } from '@/lib/routeMetadata';

const routeMeta = getRouteMetaByPath('/pillars/health/nutrition-guide');

export const generateMetadata = (): Metadata => {
  return buildMetadata(
    routeMeta ?? {
      path: '/pillars/health/nutrition-guide',
      title: 'Whole-Food, Plant-Based Guide',
      description:
        'Dive into what to eat, what to crowd out, and how to read labels like a rebel with a printable WFPB roadmap for rebellious agers.',
    }
  );
};

export default function NutritionGuidePage() {
  return <NutritionGuide />;
}
