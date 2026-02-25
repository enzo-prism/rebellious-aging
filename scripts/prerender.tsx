import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { blogPosts, getBlogPostById, getBlogPostSeoTitle } from '../src/data/blogPosts';
import { seoRoutes } from '../src/data/seoRoutes';
import { recipes, slugifyRecipeTitle } from '../src/data/recipes';
import { pillarContent } from '../src/data/pillarContent';
import { buildMetaDescription, buildSeoTitle } from '../src/lib/seo';
import { getRouteMetaByPath } from '../src/lib/routeMetadata';
import type { RouteMeta } from '../src/lib/routeMetadata';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');
const outputPath = join(projectRoot, 'public', 'seo-route-audit.json');

type RouteSource = 'seo-routes' | 'blog' | 'recipe' | 'pillar';

interface AuditRecord {
  path: string;
  source: RouteSource;
  hasMeta: boolean;
  hasTitle: boolean;
  hasDescription: boolean;
  computedKeys: string[];
  issues: string[];
  metadata: {
    title?: string;
    description?: string;
    canonical?: string;
    ogType?: RouteMeta['ogType'];
    noindex?: boolean;
    image?: string;
  };
}

const getPillarIds = () => {
  const contentIds = Object.keys(pillarContent);
  const staticIds = seoRoutes
    .map((route) => {
      if (!route.path.startsWith('/pillars/')) {
        return null;
      }

      const remainder = route.path.slice('/pillars/'.length);
      if (remainder.includes('/')) {
        return null;
      }

      return remainder;
    })
    .filter((id): id is string => Boolean(id));

  return Array.from(new Set([...contentIds, ...staticIds]));
};

const buildExpectedPaths = (): Array<{ path: string; source: RouteSource }> => {
  const staticPaths = seoRoutes.map((route) => ({ path: route.path, source: 'seo-routes' as RouteSource }));
  const blogPaths = blogPosts.map((post) => ({
    path: `/blog/${post.id}`,
    source: 'blog' as RouteSource,
  }));
  const recipePaths = recipes.map((recipe) => ({
    path: `/recipes/${slugifyRecipeTitle(recipe.title)}`,
    source: 'recipe' as RouteSource,
  }));
  const pillarPaths = getPillarIds().map((pillarId) => ({
    path: `/pillars/${pillarId}`,
    source: 'pillar' as RouteSource,
  }));

  return [...staticPaths, ...blogPaths, ...recipePaths, ...pillarPaths];
};

const resolveBlogMeta = (postId: string): RouteMeta | undefined => {
  const post = getBlogPostById(postId);
  if (!post) {
    return {
      path: `/blog/${postId}`,
      title: `Blog Post Not Found`,
      description: buildMetaDescription('The requested blog post does not exist.'),
      noindex: true,
      ogType: 'article',
    };
  }

  return {
    path: `/blog/${postId}`,
    title: getBlogPostSeoTitle(post),
    description: buildMetaDescription(post.seoDescription, post.excerpt),
    ogType: 'article',
  };
};

const resolveRecipeMeta = (slug: string): RouteMeta | undefined => {
  const recipe = recipes.find((item) => slugifyRecipeTitle(item.title) === slug);
  if (!recipe) {
    return {
      path: `/recipes/${slug}`,
      title: `Recipe Not Found`,
      description: buildMetaDescription('The requested recipe does not exist.'),
      noindex: true,
    };
  }

  return {
    path: `/recipes/${slug}`,
    title: recipe.title,
    description: buildMetaDescription(recipe.description),
    image: recipe.image,
  };
};

const resolvePillarMeta = (pillarId: string): RouteMeta => {
  const path = `/pillars/${pillarId}`;
  const staticMeta = getRouteMetaByPath(path);
  if (staticMeta) {
    return staticMeta;
  }

  const content = pillarContent[pillarId];
  if (content) {
    return {
      path,
      title: content.title,
      description: buildMetaDescription(content.description),
      ogType: 'website',
    };
  }

  return {
    path,
    title: `Pillar Not Found`,
    description: buildMetaDescription('The requested pillar does not exist.'),
    noindex: true,
  };
};

const resolveStaticMeta = (path: string): RouteMeta | undefined => {
  return getRouteMetaByPath(path);
};

const resolveMeta = (path: string, source: RouteSource): RouteMeta | undefined => {
  if (path.startsWith('/blog/')) {
    return resolveBlogMeta(path.replace('/blog/', ''));
  }

  if (path.startsWith('/recipes/')) {
    return resolveRecipeMeta(path.replace('/recipes/', ''));
  }

  if (path.startsWith('/pillars/')) {
    return resolvePillarMeta(path.replace('/pillars/', ''));
  }

  const staticMeta = resolveStaticMeta(path);
  if (staticMeta) {
    return staticMeta;
  }

  if (path === '/') {
    return {
      path,
      title: 'Rebellious Aging',
      description: 'Explore guidance for aging boldly and living vibrantly.',
    };
  }

  return {
    path,
    title: `Route Not Found`,
    description: buildMetaDescription('The requested page does not exist.'),
    noindex: true,
  };
};

const buildRecord = ({ path, source }: { path: string; source: RouteSource }): AuditRecord => {
  const metadata = resolveMeta(path, source);
  if (!metadata) {
    return {
      path,
      source,
      hasMeta: false,
      hasTitle: false,
      hasDescription: false,
      computedKeys: [],
      issues: ['No metadata resolved.'],
      metadata: {},
    };
  }

  const computedKeys = Object.keys(metadata).filter((key) => metadata[key as keyof RouteMeta] !== undefined) as Array<
    keyof RouteMeta
  >;
  const hasTitle = Boolean(metadata.title?.trim());
  const hasDescription = Boolean(metadata.description?.trim());
  const issues: string[] = [];

  if (!hasTitle) {
    issues.push('Missing title');
  }
  if (!hasDescription) {
    issues.push('Missing description');
  }

  return {
    path,
    source,
    hasMeta: hasTitle && hasDescription,
    hasTitle,
    hasDescription,
    computedKeys,
    issues,
    metadata: {
      title: metadata.title,
      description: metadata.description,
      canonical: metadata.canonical,
      ogType: metadata.ogType,
      noindex: metadata.noindex,
      image: metadata.image,
    },
  };
};

const run = async () => {
  const expectedRoutes = buildExpectedPaths();
  const uniqueRoutes = Array.from(new Map(expectedRoutes.map((item) => [item.path, item])).values());
  const records = uniqueRoutes.map(buildRecord);
  const failedRecords = records.filter((record) => !record.hasMeta);
  const summary = {
    generatedAt: new Date().toISOString(),
    totalRoutes: records.length,
    validRoutes: records.length - failedRecords.length,
    failedRoutes: failedRecords.length,
    records,
  };

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, JSON.stringify(summary, null, 2), 'utf8');

  if (failedRecords.length > 0) {
    console.error(`SEO route audit failed for ${failedRecords.length} route(s).`);
    failedRecords.forEach((record) => {
      console.error(`${record.path}: ${record.issues.join('; ')}`);
    });
    process.exitCode = 1;
    return;
  }

  const routeSamples = records
    .slice(0, 5)
    .map((record) => `${record.path} -> ${buildSeoTitle(record.metadata.title)}`);

  console.log(
    `SEO route audit passed for ${summary.validRoutes} route(s).`
  );
  console.log(`Audit sample: ${routeSamples.join(' | ')}`);
};

run().catch((error) => {
  console.error('SEO route audit failed to run:', error);
  process.exitCode = 1;
});
