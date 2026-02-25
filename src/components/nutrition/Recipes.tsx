import React from 'react';
import Link from 'next/link';
import { Clock, ChefHat, Users } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { recipes, slugifyRecipeTitle } from '@/data/recipes';
import { siteMetadata } from '@/lib/siteMetadata';

const Recipes = () => {
  const featuredRecipes = [...recipes].sort((a, b) => b.id - a.id).slice(0, 3);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-3">Recipes</h2>
        <h3 className="text-xl font-semibold mb-4 text-teal">Whipping Up a Little Plant Powered Magic</h3>
        <div className="prose max-w-none mb-6">
          <p className="mb-4">
            Let&apos;s be honest—food should make you feel something. Joy. Energy. Comfort. This lifestyle isn&apos;t about counting calories or chasing trends—it&apos;s about falling in love with real food that nourishes you from the inside out.
          </p>
          <p>
            Here you will find a few of my favorite recipes—dishes I return to because they are nutritious and delicious and 100% plant-powered.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {featuredRecipes.map((recipe) => {
          const slug = slugifyRecipeTitle(recipe.title);
          const image = recipe.image ?? siteMetadata.defaultSocialImage;

          return (
              <Link key={recipe.id} href={`/recipes/${slug}`} className="group">
              <Card className="h-full overflow-hidden border-gray-200 hover:border-teal transition">
                <div className="relative">
                  <img
                    src={image}
                    alt={recipe.imageAlt ?? recipe.title}
                    className="h-40 w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg group-hover:text-teal transition-colors">
                    {recipe.title}
                  </CardTitle>
                  <CardDescription>{recipe.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>Serves {recipe.servings}</span>
                    </div>
                    {recipe.prepTime && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{recipe.prepTime}</span>
                      </div>
                    )}
                    {recipe.difficulty && (
                      <div className="flex items-center gap-1">
                        <ChefHat className="w-4 h-4" />
                        <span>{recipe.difficulty}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recipe.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3">
          <Button asChild className="bg-teal text-white hover:bg-teal-dark">
            <Link href="/recipes">Explore all recipes</Link>
          </Button>
          <Button asChild variant="outline" className="border-teal text-teal hover:bg-teal hover:text-white">
            <Link href="/nutrition">Back to Nutrition</Link>
          </Button>
      </div>
    </div>
  );
};

export default Recipes;
