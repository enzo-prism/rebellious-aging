'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Clock, ChefHat, Search, Snowflake, Users } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Seo from '@/components/seo/Seo';
import { getSeoRouteByPath } from '@/data/seoRoutes';
import { recipes, slugifyRecipeTitle, type Recipe } from '@/data/recipes';
import { siteMetadata } from '@/lib/siteMetadata';

const recipeTags = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Snack',
  'Dessert',
  'Budget-Friendly',
  'No-Bake',
  'Make-Ahead',
  'Special Occasion',
  'Raw',
  'Oil-Free',
  'Quick',
  'High-Protein',
  'Gluten-Free',
  'Mexican',
];

const categories = [
  { id: 'all', name: 'All Recipes', icon: '🍽️' },
  { id: 'dressings', name: 'Salad Dressings', icon: '🥗' },
  { id: 'appetizers', name: 'Appetizers/Snacks', icon: '🥜' },
  { id: 'salads', name: 'Salads', icon: '🥬' },
  { id: 'soups', name: 'Soups', icon: '🍲' },
  { id: 'mains', name: 'Main Dishes', icon: '🍽️' },
  { id: 'baked', name: 'Muffins/Breads', icon: '🧁' },
  { id: 'desserts', name: 'Desserts', icon: '🍰' },
];

const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const normalizeQuery = (value: string) =>
  normalizeText(value)
    .replace(/\breciepe\b/g, 'recipe')
    .replace(/\breceipe\b/g, 'recipe')
    .replace(/\brecepie\b/g, 'recipe')
    .replace(/\brecipie\b/g, 'recipe')
    .replace(/\brecipies\b/g, 'recipes')
    .replace(/\bsweetpotato\b/g, 'sweet potato');

const buildSearchText = (recipe: Recipe) =>
  normalizeText(
    [
      recipe.title,
      recipe.description,
      recipe.author,
      recipe.category,
      recipe.notes,
      recipe.suzNotes,
      recipe.storageInstructions,
      recipe.source,
      ...(recipe.tags ?? []),
      ...(recipe.ingredients ?? []),
      ...(recipe.instructions ?? []),
      ...Object.entries(recipe.components ?? {}).flatMap(([key, component]) => [
        key,
        component.title,
        ...(component.ingredients ?? []),
        ...(component.instructions ?? []),
      ]),
    ]
      .filter(Boolean)
      .join(' ')
  );

const extractMinutes = (value?: string) => {
  if (!value) return null;
  const matches = [...value.matchAll(/(\d+(?:\.\d+)?)\s*(hour|hr|hrs|minute|min|mins)/gi)];
  if (!matches.length) return null;
  let minutes = 0;
  matches.forEach((match) => {
    const amount = parseFloat(match[1]);
    const unit = match[2].toLowerCase();
    if (unit.startsWith('hour') || unit.startsWith('hr')) {
      minutes += amount * 60;
    } else {
      minutes += amount;
    }
  });
  return minutes || null;
};

const recipeSearchIndex = new Map<number, string>(recipes.map((recipe) => [recipe.id, buildSearchText(recipe)]));

const Recipes = () => {
  const seoConfig = getSeoRouteByPath('/recipes');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'newest' | 'alpha' | 'quick'>('newest');

  const normalizedQuery = normalizeQuery(searchQuery);
  const tokens = normalizedQuery.split(' ').filter(Boolean);

  const filteredRecipes = useMemo(() => {
    const matchesQuery = (recipe: Recipe) => {
      if (!tokens.length) return true;
      const searchText = recipeSearchIndex.get(recipe.id) ?? '';
      return tokens.every((token) => searchText.includes(token));
    };

    const matchesCategory = (recipe: Recipe) =>
      activeCategory === 'all' ? true : recipe.category === activeCategory;

    const matchesTags = (recipe: Recipe) =>
      activeTags.length ? activeTags.some((tag) => recipe.tags.includes(tag)) : true;

    const sortRecipes = (items: Recipe[]) => {
      if (sortBy === 'alpha') {
        return [...items].sort((a, b) => a.title.localeCompare(b.title));
      }
      if (sortBy === 'quick') {
        return [...items].sort((a, b) => {
          const aMinutes = extractMinutes(a.prepTime) ?? Number.POSITIVE_INFINITY;
          const bMinutes = extractMinutes(b.prepTime) ?? Number.POSITIVE_INFINITY;
          return aMinutes - bMinutes;
        });
      }
      return [...items].sort((a, b) => b.id - a.id);
    };

    return sortRecipes(recipes.filter((recipe) => matchesQuery(recipe) && matchesCategory(recipe) && matchesTags(recipe)));
  }, [activeCategory, activeTags, sortBy, tokens]);

  const clearFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setActiveTags([]);
    setSortBy('newest');
  };

  return (
    <div className="min-h-screen bg-background">
      {seoConfig && (
        <Seo title={seoConfig.title} description={seoConfig.description} canonicalPath={seoConfig.path} />
      )}

      <section className="px-4 py-16 sm:py-20 bg-gradient-to-br from-teal/5 via-white to-coral/10">
        <div className="max-w-5xl mx-auto text-center space-y-5">
          <p className="text-xs uppercase tracking-[0.35em] text-teal font-semibold">Recipes</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Plant-Powered Recipes for Rebellious Appetites
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Joyful, nourishing, no-nonsense recipes that keep you fueled, satisfied, and vibrantly rebellious. Search by ingredient,
            mood, or meal and jump straight to something delicious.
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search sweet potato, soup, oil-free, quick..."
                className="h-12 pl-12 pr-4 rounded-full text-base"
                type="search"
                aria-label="Search recipes"
              />
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
            <span>{recipes.length} total recipes</span>
            <span className="hidden sm:inline">•</span>
            <span>{filteredRecipes.length} matching your filters</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild variant="outline" className="border-teal text-teal hover:bg-teal hover:text-white">
              <a href="#recipe-filters">Browse filters</a>
            </Button>
            <Button asChild className="bg-teal text-white hover:bg-teal-dark">
              <Link href="/nutrition">Back to Nutrition</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="recipe-filters" className="px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
	          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
	            <div>
	              <h2 className="text-2xl font-bold">Find the perfect recipe</h2>
	              <p className="text-muted-foreground">Filter by category or tag, then sort by what matters most today.</p>
	            </div>
	            <div className="flex flex-wrap items-center gap-3">
	              <span id="recipe-sort-label" className="text-sm text-muted-foreground">
	                Sort by
	              </span>
	              <Select value={sortBy} onValueChange={(value) => setSortBy(value as 'newest' | 'alpha' | 'quick')}>
	                <SelectTrigger
	                  aria-labelledby="recipe-sort-label"
	                  className="h-11 w-[180px] rounded-full px-4 text-sm font-medium"
	                >
	                  <SelectValue />
	                </SelectTrigger>
	                <SelectContent className="rounded-2xl border border-border shadow-xl">
	                  <SelectItem value="newest" className="rounded-xl">
	                    Newest
	                  </SelectItem>
	                  <SelectItem value="alpha" className="rounded-xl">
	                    A - Z
	                  </SelectItem>
	                  <SelectItem value="quick" className="rounded-xl">
	                    Quick to Prep
	                  </SelectItem>
	                </SelectContent>
	              </Select>
	              <Button variant="ghost" onClick={clearFilters} className="text-sm">
	                Clear all
	              </Button>
	            </div>
	          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Browse by Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? 'default' : 'outline'}
                  className="flex items-center gap-2"
                  onClick={() => setActiveCategory(category.id)}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                  <span className="ml-1 text-xs bg-white/20 px-1.5 py-0.5 rounded-full">
                    {category.id === 'all'
                      ? recipes.length
                      : recipes.filter((recipe) => recipe.category === category.id).length}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-lg font-semibold">Filter by Tag</h3>
              {activeTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {activeTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => setActiveTags(activeTags.filter((item) => item !== tag))}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {recipeTags.map((tag) => {
                const isActive = activeTags.includes(tag);
                return (
                  <Badge
                    key={tag}
                    className={`cursor-pointer px-3 py-1.5 ${isActive ? 'bg-teal text-white hover:bg-teal-dark' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    onClick={() =>
                      setActiveTags((current) =>
                        current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]
                      )
                    }
                  >
                    {tag}
                  </Badge>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          {filteredRecipes.length === 0 ? (
            <div className="border rounded-3xl p-10 text-center bg-muted/20">
              <h3 className="text-xl font-semibold mb-2">No recipes match those filters.</h3>
              <p className="text-muted-foreground mb-6">Try clearing filters or searching for a different ingredient.</p>
              <Button onClick={clearFilters}>Reset filters</Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredRecipes.map((recipe) => {
                const slug = slugifyRecipeTitle(recipe.title);
                const image = recipe.image ?? siteMetadata.defaultSocialImage;
                const alt = recipe.imageAlt ?? recipe.title;

                return (
                    <Link key={recipe.id} href={`/recipes/${slug}`} className="group">
                    <Card className="h-full overflow-hidden border-gray-200 hover:border-teal transition">
                      <div className="relative">
                        <img
                          src={image}
                          alt={alt}
                          className="h-48 w-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge variant="secondary" className="capitalize">
                            {recipe.category}
                          </Badge>
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl group-hover:text-teal transition-colors">
                          {recipe.title}
                        </CardTitle>
                        {recipe.author && (
                          <p className="text-xs text-muted-foreground">by {recipe.author}</p>
                        )}
                        <CardDescription>{recipe.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
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
                          {recipe.freezeTime && (
                            <div className="flex items-center gap-1">
                              <Snowflake className="w-4 h-4" />
                              <span>{recipe.freezeTime}</span>
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
                          {recipe.tags.slice(0, 4).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {recipe.tags.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{recipe.tags.length - 4}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Recipes;
