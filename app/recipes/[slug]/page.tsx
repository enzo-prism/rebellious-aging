import type { Metadata } from 'next';

import RecipeDetail from '@/pages/RecipeDetail';
import { buildMetadata } from '@/lib/nextMetadata';
import { buildMetaDescription } from '@/lib/seo';
import { recipes, slugifyRecipeTitle } from '@/data/recipes';

const resolveRecipeMeta = (slug: string) => {
  const recipe = recipes.find((item) => slugifyRecipeTitle(item.title) === slug);
  const path = `/recipes/${slug}`;

  if (!recipe) {
    return {
      path,
      title: 'Recipe Not Found',
      description: buildMetaDescription(
        'The recipe you are looking for does not exist. Explore more plant-powered recipes in our collection.'
      ),
      noindex: true,
    };
  }

  return {
    path,
    title: recipe.title,
    description: buildMetaDescription(recipe.description),
    image: recipe.image,
  };
};

export const generateStaticParams = () =>
  recipes.map((recipe) => ({
    slug: slugifyRecipeTitle(recipe.title),
  }));

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  return buildMetadata(resolveRecipeMeta(params.slug));
};

export default function RecipeDetailRoute({ params }: { params: { slug: string } }) {
  return <RecipeDetail slug={params.slug} />;
}
