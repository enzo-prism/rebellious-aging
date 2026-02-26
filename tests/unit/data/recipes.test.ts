import { describe, expect, it } from 'vitest';

import { recipes, slugifyRecipeTitle } from '@/data/recipes';

describe('recipe data', () => {
  it('includes recipes with required fields', () => {
    expect(recipes.length).toBeGreaterThan(0);

    const first = recipes[0];
    expect(first.title).toBeTruthy();
    expect(first.description).toBeTruthy();
    expect(first.ingredients.length).toBeGreaterThan(0);
    expect(first.instructions.length).toBeGreaterThan(0);
  });

  it('creates stable, unique, non-empty slugs', () => {
    const slugs = recipes.map((recipe) => slugifyRecipeTitle(recipe.title));
    const unique = new Set(slugs);
    expect(unique.size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toBeTruthy();
      expect(slug.includes('  ')).toBe(false);
    }
  });
});
