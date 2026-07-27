import type { Metadata } from 'next';
import { Suspense } from 'react';

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
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center px-4">
          <p className="text-muted-foreground">Loading nutrition page…</p>
        </div>
      }
    >
      <Nutrition />
    </Suspense>
  );
}
