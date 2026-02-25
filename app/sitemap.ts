import { MetadataRoute } from 'next';

import { blogPosts } from '@/data/blogPosts';
import { recipes, slugifyRecipeTitle } from '@/data/recipes';
import { seoRoutes } from '@/data/seoRoutes';
import { siteMetadata } from '@/lib/siteMetadata';

const baseUrl = siteMetadata.baseUrl?.replace(/\/$/, '') ?? 'https://rebelwithsuz.com';

const toAbsolute = (path: string) => {
  if (path === '/' || path === '') {
    return `${baseUrl}/`;
  }

  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = seoRoutes.map((route) => ({
    url: toAbsolute(route.path),
    changeFrequency: 'weekly' as const,
    priority: route.path === '/' ? 1 : 0.8,
  }));

  const recipeEntries = recipes.map((recipe) => ({
    url: toAbsolute(`/recipes/${slugifyRecipeTitle(recipe.title)}`),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const blogEntries = blogPosts.map((post) => ({
    url: toAbsolute(`/blog/${post.id}`),
    lastModified: post.dateSort,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  return [...staticEntries, ...recipeEntries, ...blogEntries];
}
