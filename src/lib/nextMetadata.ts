import type { Metadata } from 'next';

import { resolveAbsoluteUrl } from './seo';
import { siteMetadata } from './siteMetadata';
import type { RouteMeta } from './routeMetadata';

export type MetadataOverrides = {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  canonical?: string;
  noindex?: boolean;
  ogType?: 'website' | 'article';
};

const resolveCanonical = (path?: string, canonical?: string) => {
  if (canonical) {
    return canonical;
  }

  if (!path) {
    return undefined;
  }

  return resolveAbsoluteUrl(path);
};

const buildTwitterMetadata = (title: string, description: string, image?: string) => ({
  card: 'summary_large_image' as const,
  title,
  description,
  site: siteMetadata.twitterHandle,
  images: image ? [image] : undefined,
});

export const buildMetadata = (meta: RouteMeta, overrides: MetadataOverrides = {}): Metadata => {
  const title = overrides.title ?? meta.title;
  const description = overrides.description ?? meta.description;
  const ogType = overrides.ogType ?? meta.ogType ?? 'website';
  const canonical = resolveCanonical(overrides.path ?? meta.canonical ?? meta.path, overrides.canonical);
  const image = overrides.image ?? meta.image;
  const noindex = overrides.noindex ?? meta.noindex;
  const absoluteImage = image ? resolveAbsoluteUrl(image) : undefined;

  return {
    title,
    description,
    metadataBase: new URL(siteMetadata.baseUrl),
    alternates: canonical ? { canonical } : undefined,
    robots: noindex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
    openGraph: {
      type: ogType,
      title,
      description,
      url: canonical,
      images: absoluteImage ? [{ url: absoluteImage }] : undefined,
      siteName: siteMetadata.name,
    },
    twitter: buildTwitterMetadata(title, description, absoluteImage),
  };
};
