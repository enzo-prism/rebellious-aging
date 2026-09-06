'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useUrlFilters, UrlFiltersSync, writeParam, readAllowedValues } from '@/hooks/useUrlFilters';
import { Clock, ChefHat, Search, Snowflake, Users } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Seo from '@/components/seo/Seo';
import PageShareButton from '@/components/share/PageShareButton';
import { getSeoRouteByPath } from '@/data/seoRoutes';
import { recipes, slugifyRecipeTitle, type Recipe } from '@/data/recipes';

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

type RecipeSort = 'newest' | 'alpha' | 'quick';
const parseRecipeFilters = (params: URLSearchParams) => ({
  searchQuery: params.get('q') ?? '',
  activeCategory: categories.some((category) => category.id === params.get('category')) ? params.get('category')! : 'all',
  activeTags: readAllowedValues(params, 'tag', recipeTags),
  sortBy: (['alpha', 'quick'].includes(params.get('sort') ?? '') ? params.get('sort') : 'newest') as RecipeSort,
});
const writeRecipeFilters = (filters: ReturnType<typeof parseRecipeFilters>, params: URLSearchParams) => {
  writeParam(params, 'q', filters.searchQuery);
  writeParam(params, 'category', filters.activeCategory, 'all');
  writeParam(params, 'tag', filters.activeTags);
  writeParam(params, 'sort', filters.sortBy, 'newest');
};

const Recipes = () => {
  const seoConfig = getSeoRouteByPath('/recipes');
  const [{ searchQuery, activeCategory, activeTags, sortBy }, setFilters] = useUrlFilters(parseRecipeFilters, writeRecipeFilters);

  const normalizedQuery = normalizeQuery(searchQuery);
  const tokens = useMemo(() => normalizedQuery.split(' ').filter(Boolean), [normalizedQuery]);

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
    setFilters({ searchQuery: '', activeCategory: 'all', activeTags: [], sortBy: 'newest' });
  };

  return (
    <div className="min-h-screen bg-background">
      <UrlFiltersSync />
      {seoConfig && (
        <Seo title={seoConfig.title} description={seoConfig.description} canonicalPath={seoConfig.path} />
      )}

      <section className="px-4 pt-4 pb-5 sm:pt-12 sm:pb-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm uppercase tracking-widest text-teal font-semibold">Plant-powered cooking</p>
            <PageShareButton />
          </div>
          <h1 className="mt-3 text-3xl sm:text-5xl font-bold leading-tight">Plant-powered recipes. More good days.</h1>
          <p className="mt-3 text-gray-700 text-base sm:text-lg max-w-2xl">Simple, satisfying plant-based recipes. Find a favorite by ingredient, meal, or the time you have.</p>
        </div>
      </section>

      <section id="recipe-filters" className="px-4 pb-6">
        <div className="max-w-6xl mx-auto space-y-3 sm:space-y-5">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="relative flex-1 max-w-2xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-teal h-5 w-5" aria-hidden="true" />
                <Input value={searchQuery} onChange={(event) => setFilters({ searchQuery: event.target.value })} placeholder="Search sweet potato, soup, oil-free, quick..." className="h-12 pl-12 rounded-xl text-base" type="search" aria-label="Search recipes" />
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span id="recipe-sort-label" className="text-sm text-muted-foreground">
                  Sort by
                </span>
                <Select value={sortBy} onValueChange={(value) => setFilters({ sortBy: value as RecipeSort })}>
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
            <h2 className="sr-only">Browse recipes by category</h2>
            <div className="sm:hidden">
              <label htmlFor="recipe-category" className="sr-only">Recipe category</label>
              <select id="recipe-category" value={activeCategory} onChange={(event) => setFilters({ activeCategory: event.target.value })} className="h-12 w-full rounded-xl border border-input bg-background px-4 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                {categories.map((category) => <option key={category.id} value={category.id}>{category.name} ({category.id === 'all' ? recipes.length : recipes.filter((recipe) => recipe.category === category.id).length})</option>)}
              </select>
            </div>
            <div className="hidden sm:flex sm:flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? 'default' : 'outline'}
                  className="flex items-center gap-2"
                  aria-pressed={activeCategory === category.id}
                  onClick={() => setFilters({ activeCategory: category.id })}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                  <span className="ml-1 text-xs px-1.5 py-0.5 rounded-full bg-white/30 text-gray-900">
                    {category.id === 'all'
                      ? recipes.length
                      : recipes.filter((recipe) => recipe.category === category.id).length}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          <details className="rounded-xl border border-border px-4">
            <summary className="cursor-pointer py-3 font-semibold text-teal">More filters{activeTags.length ? ` (${activeTags.length} selected)` : ''}</summary>
            <p className="mb-3 text-sm text-muted-foreground">Select tags to include recipes matching any of your choices.</p>
            <div className="flex flex-wrap gap-2 pb-4">
              {recipeTags.map((tag) => {
                const isActive = activeTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    aria-pressed={isActive}
                    className={`inline-flex items-center rounded-full border border-transparent min-h-11 px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${isActive ? 'bg-teal text-white hover:bg-teal-dark' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    onClick={() =>
                      setFilters((current) => ({ activeTags: current.activeTags.includes(tag) ? current.activeTags.filter((item) => item !== tag) : [...current.activeTags, tag] }))
                    }
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </details>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <p role="status" className="mb-5 text-sm text-muted-foreground">{filteredRecipes.length} matching your filters <span aria-hidden="true">·</span> {recipes.length} total recipes</p>
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

                return (
                    <Link key={recipe.id} href={`/recipes/${slug}`} className="group rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-4">
                    <Card className="h-full overflow-hidden border-gray-200 hover:border-teal transition">
                      {recipe.image && (
                        <img src={recipe.image} alt={recipe.imageAlt ?? recipe.title} className="h-48 w-full object-cover" loading="lazy" />
                      )}
                      <CardHeader>
                        <p className="mb-2 text-sm font-semibold text-teal">{categories.find((category) => category.id === recipe.category)?.name ?? recipe.category}</p>
                        <CardTitle className="text-xl group-hover:text-teal transition-colors">
                          {recipe.title}
                        </CardTitle>
                        {recipe.author && (
                          <p className="text-sm text-muted-foreground">by {recipe.author}</p>
                        )}
                        <CardDescription>{recipe.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>Serves {recipe.servings}</span>
                          </div>
                          {recipe.prepTime && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>Prep: {recipe.prepTime}</span>
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
      <div className="mx-auto max-w-6xl px-4 pb-12 flex flex-wrap gap-6 text-teal font-semibold">
        <Link href="/nutrition" className="underline underline-offset-4">Explore nutrition</Link>
        <Link href="/recipes-for-a-better-summer" className="underline underline-offset-4">Better Summer Picks</Link>
      </div>
    </div>
  );
};

export default Recipes;
