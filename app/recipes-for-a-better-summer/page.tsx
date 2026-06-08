import type { Metadata } from 'next';

import RecipesForBetterSummer from '@/views/RecipesForBetterSummer';
import { buildMetadata } from '@/lib/nextMetadata';
import { getRouteMetaByPath } from '@/lib/routeMetadata';

const routeMeta = getRouteMetaByPath('/recipes-for-a-better-summer');

export const generateMetadata = (): Metadata => {
  return buildMetadata(
    routeMeta ?? {
      path: '/recipes-for-a-better-summer',
      title: 'Recipes for a Better Summer',
      description:
        'Original summer recipe and event links from the T. Colin Campbell Center for Nutrition Studies, curated for Rebellious Aging readers.',
      ogType: 'article',
    }
  );
};

export default function RecipesForBetterSummerPage() {
  return <RecipesForBetterSummer />;
}
