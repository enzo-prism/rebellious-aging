import type { Recipe } from '../data/recipes';

export interface RecipeSection {
  key: string;
  title: string;
  ingredients: string[];
  instructions: string[];
}

const normalizeLines = (value?: string[]) =>
  (value ?? [])
    .map((line) => (typeof line === 'string' ? line.trim() : ''))
    .filter(Boolean);

const dedupePreserveOrder = (items: string[]) => {
  const seen = new Set<string>();
  const result: string[] = [];

  items.forEach((item) => {
    if (seen.has(item)) return;
    seen.add(item);
    result.push(item);
  });

  return result;
};

const formatComponentTitle = (key: string, title?: string) => {
  if (title) return title;

  return key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const getRecipeSections = (recipe: Recipe): RecipeSection[] => {
  const sections: RecipeSection[] = [];

  const hasComponents = Boolean(recipe.components && Object.keys(recipe.components).length);
  const rootIngredients = normalizeLines(recipe.ingredients);
  const rootInstructions = normalizeLines(recipe.instructions);
  const hasRoot = rootIngredients.length > 0 || rootInstructions.length > 0;

  const buildRootSection = () => {
    if (!hasRoot) return null;
    const hasDressingComponent = Boolean(recipe.components && Object.prototype.hasOwnProperty.call(recipe.components, 'dressing'));

    let rootTitle = 'Main';
    if (!rootIngredients.length && rootInstructions.length && hasComponents) {
      rootTitle = 'Assembly';
    } else if (recipe.category === 'salads' && hasDressingComponent) {
      rootTitle = 'Salad';
    } else if (recipe.category === 'soups') {
      rootTitle = 'Soup';
    }

    return {
      key: 'main',
      title: rootTitle,
      ingredients: rootIngredients,
      instructions: rootInstructions,
    } satisfies RecipeSection;
  };

  const rootSection = buildRootSection();
  // If the root section is only assembly steps, it reads better after the component prep.
  const shouldAppendRootAfterComponents = rootSection?.title === 'Assembly';

  if (rootSection && !shouldAppendRootAfterComponents) {
    sections.push(rootSection);
  }

  if (recipe.components) {
    Object.entries(recipe.components).forEach(([key, component]) => {
      const ingredients = normalizeLines(component.ingredients);
      const instructions = normalizeLines(component.instructions);

      if (!ingredients.length && !instructions.length) return;

      sections.push({
        key,
        title: formatComponentTitle(key, component.title),
        ingredients,
        instructions,
      });
    });
  }

  if (rootSection && shouldAppendRootAfterComponents) {
    sections.push(rootSection);
  }

  return sections;
};

export const getAllRecipeIngredients = (recipe: Recipe): string[] => {
  const rootIngredients = normalizeLines(recipe.ingredients);
  const componentIngredients = recipe.components
    ? Object.values(recipe.components).flatMap((component) => normalizeLines(component.ingredients))
    : [];

  return dedupePreserveOrder([...rootIngredients, ...componentIngredients]);
};

export const getAllRecipeInstructions = (recipe: Recipe): string[] => {
  const rootInstructions = normalizeLines(recipe.instructions);
  const componentInstructions = recipe.components
    ? Object.values(recipe.components).flatMap((component) => normalizeLines(component.instructions))
    : [];

  return dedupePreserveOrder([...rootInstructions, ...componentInstructions]);
};
