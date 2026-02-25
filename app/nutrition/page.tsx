import type { Metadata } from 'next';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

import { buildMetadata } from '@/lib/nextMetadata';
import { getRouteMetaByPath } from '@/lib/routeMetadata';

const NutritionClientPage = dynamic(() => import('@/pages/Nutrition'), {
  ssr: false,
});

const routeMeta = getRouteMetaByPath('/nutrition');

export const generateMetadata = (): Metadata => {
  return buildMetadata(
    routeMeta ?? {
      path: '/nutrition',
      title: 'Whole-Food Plant-Based Nutrition',
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
      <NutritionClientPage />
    </Suspense>
  );
}
