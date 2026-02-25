import React from 'react';
import Link from 'next/link';
import { ChefHat, Clock, Snowflake, Users } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Seo from '@/components/seo/Seo';
import { recipes, slugifyRecipeTitle } from '@/data/recipes';
import { getAllRecipeIngredients, getAllRecipeInstructions, getRecipeSections } from '@/lib/recipeSections';
import { buildMetaDescription, getCanonicalUrl } from '@/lib/seo';
import { buildRecipeJsonLd } from '@/lib/structuredData';
import { siteMetadata } from '@/lib/siteMetadata';

interface RecipeDetailProps {
  slug?: string;
}

const RecipeDetail = ({ slug }: RecipeDetailProps) => {
  const recipe = recipes.find((item) => slugifyRecipeTitle(item.title) === slug);
  const canonicalPath = slug ? `/recipes/${slug}` : '/recipes';

  if (!recipe) {
    const fallbackDescription = buildMetaDescription(
      'The recipe you are looking for does not exist. Explore more plant-powered recipes in our collection.'
    );
    const canonicalUrl = getCanonicalUrl(canonicalPath);

    return (
      <div className="min-h-screen bg-background px-4 py-12 max-w-3xl mx-auto">
        <Seo
          title="Recipe Not Found"
          description={fallbackDescription}
          canonicalPath={canonicalPath}
          canonicalUrl={canonicalUrl}
          noindex
        />
        <Link href="/recipes" className="text-sm hover:underline mb-8 inline-block">← Back to Recipes</Link>
        <h1 className="text-4xl font-bold mb-4">Recipe Not Found</h1>
        <p>The recipe you're looking for doesn't exist.</p>
      </div>
    );
  }

  const canonicalUrl = getCanonicalUrl(canonicalPath);
  const metaDescription = buildMetaDescription(recipe.description);
  const image = recipe.image ?? siteMetadata.defaultSocialImage;

  const instructionsForSchema = getAllRecipeInstructions(recipe);
  const ingredientsForSchema = getAllRecipeIngredients(recipe);

  const recipeJsonLd = buildRecipeJsonLd({
    name: recipe.title,
    description: metaDescription,
    canonicalUrl,
    image,
    author: recipe.author,
    ingredients: ingredientsForSchema,
    instructions: instructionsForSchema,
    prepTime: recipe.prepTime,
    cookTime: recipe.cookTime,
    totalTime: recipe.totalTime,
    recipeYield: recipe.servings,
    recipeCategory: recipe.category,
    keywords: recipe.tags?.join(', '),
  });

  const recipeSections = getRecipeSections(recipe);

  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <Seo
        title={recipe.title}
        description={metaDescription}
        canonicalPath={canonicalPath}
        canonicalUrl={canonicalUrl}
        jsonLd={recipeJsonLd}
      />

      <div className="max-w-5xl mx-auto space-y-10">
        <Link href="/recipes" className="text-sm hover:underline inline-block">← Back to Recipes</Link>

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 items-start">
          <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
            <img
              src={image}
              alt={recipe.imageAlt ?? recipe.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="space-y-5">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-teal font-semibold">Recipe</p>
              <h1 className="text-4xl font-bold leading-tight mt-2">{recipe.title}</h1>
              <p className="text-muted-foreground text-lg mt-4">{recipe.description}</p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Serves {recipe.servings}</span>
              </div>
              {recipe.prepTime && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{recipe.prepTime}</span>
                </div>
              )}
              {recipe.totalTime && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{recipe.totalTime}</span>
                </div>
              )}
              {recipe.freezeTime && (
                <div className="flex items-center gap-2">
                  <Snowflake className="h-4 w-4" />
                  <span>{recipe.freezeTime}</span>
                </div>
              )}
              {recipe.difficulty && (
                <div className="flex items-center gap-2">
                  <ChefHat className="h-4 w-4" />
                  <span>{recipe.difficulty}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {recipe.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Category: <span className="capitalize">{recipe.category}</span></p>
              {recipe.source && <p>Source: {recipe.source}</p>}
              {recipe.storageInstructions && <p>Storage: {recipe.storageInstructions}</p>}
            </div>

            {(recipe.notes || recipe.suzNotes) && (
              <div className="bg-coral/10 border border-coral/20 rounded-2xl p-4 text-sm">
                {recipe.notes && <p className="mb-2">{recipe.notes}</p>}
                {recipe.suzNotes && <p>{recipe.suzNotes}</p>}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Let&apos;s cook</h2>

          <div className="space-y-8">
            {recipeSections.map((section) => {
              const hasIngredients = section.ingredients.length > 0;
              const hasInstructions = section.instructions.length > 0;
              const gridClassName = hasIngredients && hasInstructions ? 'grid lg:grid-cols-2 gap-6' : 'grid gap-6';

              return (
                <div key={section.key} className="space-y-4">
                  {recipeSections.length > 1 && (
                    <h3 className="text-lg font-semibold">{section.title}</h3>
                  )}

                  <div className={gridClassName}>
                    {hasIngredients && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Ingredients</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            {section.ingredients.map((ingredient, index) => (
                              <li key={index}>{ingredient}</li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )}

                    {hasInstructions && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Instructions</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ol className="space-y-3 text-sm">
                            {section.instructions.map((step, index) => (
                              <li key={index} className="flex gap-3">
                                <span className="flex-shrink-0 w-7 h-7 bg-teal text-white rounded-full flex items-center justify-center text-xs font-medium">
                                  {index + 1}
                                </span>
                                <span className="leading-relaxed">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline" className="border-teal text-teal hover:bg-teal hover:text-white">
            <Link href="/recipes">Explore more recipes</Link>
          </Button>
          <Button asChild>
            <Link href="/nutrition">Back to Nutrition</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
