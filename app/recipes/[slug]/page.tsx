import type { Metadata } from 'next';

import RecipeDetail from '@/views/RecipeDetail';
import { buildMetadata } from '@/lib/nextMetadata';
import { buildMetaDescription } from '@/lib/seo';
import { recipes, slugifyRecipeTitle } from '@/data/recipes';
import { siteMetadata } from '@/lib/siteMetadata';

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
      canonical: path,
      image: siteMetadata.defaultSocialImage,
      noindex: true,
    };
  }

  return {
    path,
    canonical: path,
    title: recipe.title,
    description: buildMetaDescription(recipe.description),
    image: recipe.image ?? siteMetadata.defaultSocialImage,
  };
};

export const generateStaticParams = () =>
  recipes.map((recipe) => ({
    slug: slugifyRecipeTitle(recipe.title),
  }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const { slug } = await params;
  return buildMetadata(resolveRecipeMeta(slug));
};

export default async function RecipeDetailRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <RecipeDetail slug={slug} />;
}
