import type { Metadata } from 'next';

import Recipes from '@/pages/Recipes';
import { buildMetadata } from '@/lib/nextMetadata';
import { getRouteMetaByPath } from '@/lib/routeMetadata';

const routeMeta = getRouteMetaByPath('/recipes');

export const generateMetadata = (): Metadata => {
  return buildMetadata(
    routeMeta ?? {
      path: '/recipes',
      title: 'Rebellious Aging Recipes',
      description:
        'Browse plant-powered recipes from quick weeknight meals to celebratory favorites, built for vibrant, rebellious aging.',
    }
  );
};

export default function RecipesPage() {
  return <Recipes />;
}
