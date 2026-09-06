import Seo from '@/components/seo/Seo';
import { buildCollectionJsonLd } from '@/lib/structuredData';
import { recipes, slugifyRecipeTitle } from '@/data/recipes';
import PageBreadcrumbs from '@/components/seo/PageBreadcrumbs';
import type { Metadata } from 'next';

import Recipes from '@/views/Recipes';
import { buildMetadata } from '@/lib/nextMetadata';
import { getRouteMetaByPath } from '@/lib/routeMetadata';

const routeMeta = getRouteMetaByPath('/recipes');

export const generateMetadata = (): Metadata => {
  return buildMetadata(
    routeMeta ?? {
      path: '/recipes',
      title: 'Recipes',
      description:
        'Browse plant-powered recipes from quick weeknight meals to celebratory favorites, built for vibrant, rebellious aging.',
    }
  );
};

export default function RecipesPage() {
  return <>
    <Seo jsonLd={buildCollectionJsonLd(routeMeta?.title ?? 'Recipes', '/recipes', recipes.map((recipe) => ({ name: recipe.title, path: `/recipes/${slugifyRecipeTitle(recipe.title)}` })))} />
    <div className="container mx-auto px-4 pt-6"><PageBreadcrumbs items={[{ name: "Recipes", path: "/recipes" }]} /></div>
    <Recipes />
  </>;
}
