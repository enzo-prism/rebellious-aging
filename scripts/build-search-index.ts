import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { blogPosts } from '../src/data/blogPosts';
import { blogPostContent } from '../src/data/blogPostContent';
import { nutritionTabs } from '../src/data/nutritionTabs';
import { recipes, slugifyRecipeTitle } from '../src/data/recipes';
import { nutritionGuideSections } from '../src/data/nutritionGuideSections';
import { pillarContent } from '../src/data/pillarContent';
import { seoRoutes } from '../src/data/seoRoutes';
import { videoSeriesData } from '../src/data/videoSeries';
import type { SearchDocument } from '../src/data/searchRecords';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');
const outputPath = join(projectRoot, 'public', 'search-index.json');

const STATIC_PATHS = new Set([
  '/',
  '/our-story',
  '/welcome-letter',
  '/starter-kit',
  '/nutrition',
  '/video-series',
  '/recipes',
  '/blog',
  '/contact',
  '/facebook-group',
  '/team',
  '/search',
]);

const decodeEntities = (value: string) =>
  value
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");

const stripMarkup = (markup: string) =>
  decodeEntities(
    markup
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
  )
    .replace(/\s+/g, ' ')
    .trim();

const extractText = (node: React.ReactNode) =>
  stripMarkup(renderToStaticMarkup(React.createElement(React.Fragment, null, node)));

const buildStaticPageDocs = (): SearchDocument[] => {
  return seoRoutes
    .filter((route) => STATIC_PATHS.has(route.path))
    .map<SearchDocument>((route) => ({
      id: `page:${route.path}`,
      type: 'page',
      title: route.title,
      path: route.path,
      summary: route.description,
      tags: ['page'],
    }));
};

const buildPillarDocs = (): SearchDocument[] =>
  Object.entries(pillarContent).map<SearchDocument>(([pillarId, content]) => ({
    id: `pillar:${pillarId}`,
    type: 'pillar',
    title: content.title,
    path: `/pillars/${pillarId}`,
    summary: content.description,
    tags: ['pillar', pillarId],
  }));

const buildGratitudeDoc = (): SearchDocument | null => {
  const gratitudeRoute = seoRoutes.find((route) => route.path === '/pillars/gratitude');
  if (!gratitudeRoute) {
    return null;
  }

  return {
    id: 'pillar:gratitude',
    type: 'pillar',
    title: gratitudeRoute.title,
    path: gratitudeRoute.path,
    summary: gratitudeRoute.description,
    tags: ['pillar', 'gratitude'],
  };
};

const buildBlogDocs = (): SearchDocument[] =>
  blogPosts.map<SearchDocument>((post) => {
    const contentEntry = blogPostContent[post.id];
    const bodyText = contentEntry ? extractText(contentEntry.body) : '';

    return {
      id: `blog:${post.id}`,
      type: 'blog',
      title: post.title,
      path: `/blog/${post.id}`,
      summary: post.seoDescription ?? post.excerpt,
      content: bodyText || `Blog #${post.blogNumber}: ${post.title}. ${post.excerpt}`,
      tags: ['blog', `blog-${post.blogNumber}`, post.blogNumber.toString()],
      updatedAt: post.dateSort?.toISOString(),
    };
  });

const buildVideoDocs = (): SearchDocument[] =>
  videoSeriesData.map<SearchDocument>((video) => ({
    id: `video:${video.id}`,
    type: 'video',
    title: `${video.title} (Episode ${video.episodeNumber})`,
    path: '/video-series',
    summary: video.description,
    tags: ['video', 'series'],
    content: `${video.description} ${video.duration}`,
    updatedAt: video.publishedDate,
  }));

const buildNutritionTabDocs = (): SearchDocument[] =>
  nutritionTabs.map<SearchDocument>((tab) => ({
    id: `section:nutrition:${tab.id}`,
    type: 'section',
    title: tab.title,
    path: `/nutrition?tab=${tab.id}`,
    summary: tab.summary,
    tags: ['nutrition', 'section', ...tab.tags],
    section: 'nutrition',
  }));

const buildRecipeDocs = (): SearchDocument[] =>
  recipes.map<SearchDocument>((recipe) => {
    const slug = slugifyRecipeTitle(recipe.title);
    const ingredientText = recipe.ingredients?.join(' ') ?? '';
    const instructionText = recipe.instructions?.join(' ') ?? '';
    const componentText = Object.entries(recipe.components ?? {})
      .flatMap(([key, component]) => [
        key,
        component.title,
        ...(component.ingredients ?? []),
        ...(component.instructions ?? []),
      ])
      .filter(Boolean)
      .join(' ');
    const content = [
      recipe.description,
      recipe.notes,
      recipe.category,
      ...(recipe.tags ?? []),
      ingredientText,
      instructionText,
      componentText,
    ]
      .filter(Boolean)
      .join(' ');

    return {
      id: `recipe:${slug}`,
      type: 'recipe',
      title: recipe.title,
      path: `/recipes/${slug}`,
      summary: recipe.description,
      content,
      tags: ['recipe', recipe.category, ...(recipe.tags ?? [])],
      section: 'nutrition',
    };
  });

const buildNutritionGuideSectionDocs = (): SearchDocument[] =>
  nutritionGuideSections.map<SearchDocument>((section) => ({
    id: `section:nutrition-guide:${section.id}`,
    type: 'section',
    title: section.title,
    path: `/pillars/health/nutrition-guide#${section.id}`,
    summary: section.summary,
    tags: ['nutrition-guide', 'section', ...section.tags],
    section: 'nutrition-guide',
  }));

const buildResourceGuideDoc = (): SearchDocument | null => {
  const resourceRoute = seoRoutes.find((route) => route.path === '/pillars/health/resource-guide');
  if (!resourceRoute) {
    return null;
  }

  return {
    id: 'resource:resource-guide',
    type: 'resource',
    title: resourceRoute.title,
    path: resourceRoute.path,
    summary: resourceRoute.description,
    tags: ['nutrition', 'resource', 'health', 'guide'],
  };
};

const buildSearchIndex = (): SearchDocument[] => {
  const gratitudeDoc = buildGratitudeDoc();
  const resourceGuideDoc = buildResourceGuideDoc();
  const docs: SearchDocument[] = [
    ...buildStaticPageDocs(),
    ...buildPillarDocs(),
    ...buildNutritionTabDocs(),
    ...buildRecipeDocs(),
    ...buildNutritionGuideSectionDocs(),
    ...buildBlogDocs(),
    ...buildVideoDocs(),
    {
      id: 'resource:nutrition-guide',
      type: 'resource',
      title: 'Whole-Food, Plant-Based Guide',
      path: '/pillars/health/nutrition-guide',
      summary:
        'What to eat, what to crowd out, and label-reading tips for a whole-food, plant-based lifestyle that supports the Health pillar.',
      tags: ['nutrition', 'guide', 'health'],
    },
    ...(resourceGuideDoc ? [resourceGuideDoc] : []),
    ...(gratitudeDoc ? [gratitudeDoc] : []),
  ];

  return docs;
};

const writeIndex = async (docs: SearchDocument[]) => {
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, JSON.stringify(docs, null, 2), 'utf8');
  console.log(`Wrote ${docs.length} search docs to ${outputPath}`);
};

const run = async () => {
  const docs = buildSearchIndex();
  await writeIndex(docs);
};

run().catch((error) => {
  console.error('Failed to build search index', error);
  process.exitCode = 1;
});
