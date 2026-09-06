import { SUBSTACK_URL } from './constants';
import { siteMetadata } from './siteMetadata';
import { resolveAbsoluteUrl } from './seo';

export const buildOrganizationJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteMetadata.baseUrl}/#organization`,
  founder: { '@id': siteMetadata.author.id },
  name: siteMetadata.name,
  url: siteMetadata.baseUrl,
  logo: resolveAbsoluteUrl(siteMetadata.defaultSocialImage),
  sameAs: siteMetadata.socialProfiles ?? [],
});

export const buildWebSiteJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteMetadata.baseUrl}/#website`,
  inLanguage: 'en-US',
  publisher: { '@id': `${siteMetadata.baseUrl}/#organization` },
  name: siteMetadata.name,
  url: siteMetadata.baseUrl,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteMetadata.baseUrl}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
});

interface ArticleParams {
  title: string;
  description: string;
  canonicalUrl?: string;
  image?: string;
  datePublished?: string;
}

export const buildArticleJsonLd = ({
  title,
  description,
  canonicalUrl,
  image,
  datePublished,
}: ArticleParams) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': canonicalUrl ? `${canonicalUrl}#article` : undefined,
  url: canonicalUrl,
  inLanguage: 'en-US',
  isAccessibleForFree: true,
  isPartOf: { '@id': `${siteMetadata.baseUrl}/#website` },
  headline: title,
  description,
  author: {
    '@type': 'Person',
    '@id': siteMetadata.author.id,
    name: siteMetadata.author.name,
    url: resolveAbsoluteUrl(siteMetadata.author.path),
  },
  publisher: {
    '@id': `${siteMetadata.baseUrl}/#organization`,
    '@type': 'Organization',
    name: siteMetadata.name,
    logo: {
      '@type': 'ImageObject',
      url: resolveAbsoluteUrl(siteMetadata.defaultSocialImage),
    },
  },
  mainEntityOfPage: canonicalUrl,
  image: image ? resolveAbsoluteUrl(image) : resolveAbsoluteUrl(siteMetadata.defaultSocialImage),
  datePublished,
});

interface RecipeParams {
  name: string;
  description: string;
  canonicalUrl?: string;
  image?: string;
  author?: string;
  source?: string;
  ingredients: string[];
  instructions: string[];
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
  recipeYield?: string;
  recipeCategory?: string;
  keywords?: string;
}

const toIsoDuration = (value?: string) => {
  if (!value) return undefined;
  const matches = [...value.matchAll(/(\d+(?:\.\d+)?)\s*(hour|hr|hrs|minute|min|mins)/gi)];
  if (!matches.length) return undefined;
  let hours = 0;
  let minutes = 0;

  matches.forEach((match) => {
    const amount = parseFloat(match[1]);
    const unit = match[2].toLowerCase();
    if (unit.startsWith('hour') || unit.startsWith('hr')) {
      hours += amount;
    } else {
      minutes += amount;
    }
  });

  if (!hours && !minutes) return undefined;

  let iso = 'PT';
  if (hours) {
    iso += `${hours}H`;
  }
  if (minutes) {
    iso += `${minutes}M`;
  }
  return iso;
};

export const buildRecipeJsonLd = ({
  name,
  description,
  canonicalUrl,
  image,
  author,
  source,
  ingredients,
  instructions,
  prepTime,
  cookTime,
  totalTime,
  recipeYield,
  recipeCategory,
  keywords,
}: RecipeParams) => {
  const prepTimeIso = toIsoDuration(prepTime);
  const cookTimeIso = toIsoDuration(cookTime);
  const totalTimeIso = toIsoDuration(totalTime);

  return {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    '@id': canonicalUrl ? `${canonicalUrl}#recipe` : undefined,
    url: canonicalUrl,
    inLanguage: 'en-US',
    citation: source,
    name,
    description,
    image: image ? resolveAbsoluteUrl(image) : undefined,
    ...(author && !['Recipe source unclear', 'Prevent and Reverse Heart Disease Cookbook', 'Plant Based Woman Warrior'].includes(author) ? {
      author: {
        '@type': ['Forks Over Knives', 'plantyou.com', 'veganhuggs.com', 'Rebellious Aging'].includes(author) ? 'Organization' : 'Person',
        name: author,
      },
    } : {}),
    mainEntityOfPage: canonicalUrl,
    recipeIngredient: ingredients,
    recipeInstructions: instructions.map((text) => ({
      '@type': 'HowToStep',
      text,
    })),
    ...(prepTimeIso ? { prepTime: prepTimeIso } : {}),
    ...(cookTimeIso ? { cookTime: cookTimeIso } : {}),
    ...(totalTimeIso ? { totalTime: totalTimeIso } : {}),
    ...(recipeYield ? { recipeYield } : {}),
    ...(recipeCategory ? { recipeCategory } : {}),
    ...(keywords ? { keywords } : {}),
  };
};

interface Question {
  question: string;
  answer: string;
}

export const buildFaqJsonLd = (questions: Question[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: questions.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export const buildPersonJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': siteMetadata.author.id,
  name: siteMetadata.author.name,
  sameAs: [SUBSTACK_URL],
  url: resolveAbsoluteUrl(siteMetadata.author.path),
  description: 'Founder of Rebellious Aging, writer, and life and success coach sharing her experience of confidence, personal style, gratitude, and plant-based living with women 55+.',
  worksFor: { '@id': `${siteMetadata.baseUrl}/#organization` },
  knowsAbout: ['Rebellious aging', 'Whole-food, plant-based living', 'Confidence', 'Personal style', 'Gratitude'],
});

export const buildBreadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: resolveAbsoluteUrl(item.path),
  })),
});

export const buildCollectionJsonLd = (name: string, path: string, items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${resolveAbsoluteUrl(path)}#collection`,
  name,
  url: resolveAbsoluteUrl(path),
  inLanguage: 'en-US',
  isPartOf: { '@id': `${siteMetadata.baseUrl}/#website` },
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: resolveAbsoluteUrl(item.path),
    })),
  },
});
