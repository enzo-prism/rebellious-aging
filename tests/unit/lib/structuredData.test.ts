import { describe, expect, it } from 'vitest';
import { blogPosts, getBlogPublishedDate } from '@/data/blogPosts';
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildOrganizationJsonLd, buildPersonJsonLd, buildRecipeJsonLd, buildWebSiteJsonLd } from '@/lib/structuredData';
import { siteMetadata } from '@/lib/siteMetadata';

const recipe = { name: 'Test recipe', description: 'An attributed recipe', ingredients: ['Beans'], instructions: ['Cook the beans'], source: 'Original cookbook' };

describe('Editorial structured data', () => {
  it('connects articles, their author, publisher and site with stable IDs', () => {
    const article = buildArticleJsonLd({ title: 'A story', description: 'A story from Suz', canonicalUrl: `${siteMetadata.baseUrl}/blog/story` });
    expect(article.author['@id']).toBe(buildPersonJsonLd()['@id']);
    expect(article.author.url).toBe(`${siteMetadata.baseUrl}/our-story`);
    expect(article.publisher['@id']).toBe(buildOrganizationJsonLd()['@id']);
    expect(article.isPartOf['@id']).toBe(buildWebSiteJsonLd()['@id']);
  });

  it('does not invent a recipe creator or use the brand logo as a food image', () => {
    const schema = buildRecipeJsonLd(recipe);
    expect(schema.author).toBeUndefined();
    expect(schema.image).toBeUndefined();
    expect(schema.citation).toBe(recipe.source);
    expect(buildRecipeJsonLd({ ...recipe, author: 'Recipe source unclear' }).author).toBeUndefined();
    expect(buildRecipeJsonLd({ ...recipe, author: 'Prevent and Reverse Heart Disease Cookbook' }).author).toBeUndefined();
  });

  it('distinguishes credited people from credited organizations', () => {
    expect(buildRecipeJsonLd({ ...recipe, author: 'Chef AJ' }).author).toMatchObject({ '@type': 'Person', name: 'Chef AJ' });
    expect(buildRecipeJsonLd({ ...recipe, author: 'Forks Over Knives' }).author).toMatchObject({ '@type': 'Organization', name: 'Forks Over Knives' });
  });

  it('keeps usable recipe times and step markup', () => {
    const schema = buildRecipeJsonLd({ ...recipe, prepTime: '15 minutes', cookTime: '1 hour 30 minutes' });
    expect(schema.prepTime).toBe('PT15M');
    expect(schema.cookTime).toBe('PT1H30M');
    expect(schema.recipeInstructions).toEqual([{ '@type': 'HowToStep', text: 'Cook the beans' }]);
  });

  it('creates ordered canonical breadcrumb links', () => {
    const schema = buildBreadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Recipes', path: '/recipes' }]);
    expect(schema.itemListElement.map((item) => item.position)).toEqual([1, 2]);
    expect(schema.itemListElement[1].item).toBe(`${siteMetadata.baseUrl}/recipes`);
  });

  it('uses verified calendar dates without guessing days for month-only archives', () => {
    for (const post of blogPosts) {
      const date = getBlogPublishedDate(post);
      if (post.date.split('/').length === 2) {
        expect(date).toBeUndefined();
      } else {
        expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(new Date(date!).toISOString().slice(0, 10)).toBe(date);
      }
    }
  });
});
