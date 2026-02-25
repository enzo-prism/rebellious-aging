import { siteMetadata } from './siteMetadata';
import { resolveAbsoluteUrl } from './seo';

export const buildOrganizationJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteMetadata.name,
  url: siteMetadata.baseUrl,
  logo: resolveAbsoluteUrl(siteMetadata.defaultSocialImage),
  sameAs: siteMetadata.socialProfiles ?? [],
});

export const buildWebSiteJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
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
  headline: title,
  description,
  author: {
    '@type': 'Person',
    name: 'Suzanne (Suz)',
  },
  publisher: {
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
    name,
    description,
    image: image ? resolveAbsoluteUrl(image) : resolveAbsoluteUrl(siteMetadata.defaultSocialImage),
    author: {
      '@type': 'Person',
      name: author ?? 'Suzanne (Suz)',
    },
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
