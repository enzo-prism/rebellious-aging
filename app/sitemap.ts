import { MetadataRoute } from 'next';

import { blogPosts } from '@/data/blogPosts';
import { recipes, slugifyRecipeTitle } from '@/data/recipes';
import { seoRoutes } from '@/data/seoRoutes';
import { siteMetadata } from '@/lib/siteMetadata';

const baseUrl = siteMetadata.baseUrl?.replace(/\/$/, '') ?? 'https://rebelwithsuz.com';

const isIndexableRoute = (route: { noindex?: boolean }) => !route.noindex;

const toAbsolute = (path: string) => {
  if (path === '/' || path === '') {
    return `${baseUrl}/`;
  }

  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
};

const resolveStaticFrequency = (path: string) => {
  if (path === '/') {
    return 'weekly' as const;
  }
  if (path === '/blog' || path === '/nutrition' || path === '/recipes' || path === '/search') {
    return 'monthly' as const;
  }
  if (path.startsWith('/pillars/')) {
    return 'monthly' as const;
  }
  return 'monthly' as const;
};

const resolveStaticPriority = (path: string) => {
  if (path === '/') {
    return 1;
  }
  if (path === '/blog') {
    return 0.9;
  }
  if (path === '/recipes' || path === '/nutrition') {
    return 0.8;
  }
  if (path.startsWith('/pillars/')) {
    return 0.8;
  }
  return 0.6;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = seoRoutes
    .filter(isIndexableRoute)
    .map((route) => ({
      url: toAbsolute(route.path),
      changeFrequency: resolveStaticFrequency(route.path),
      priority: resolveStaticPriority(route.path),
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
