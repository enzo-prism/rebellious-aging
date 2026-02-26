import { siteMetadata } from './siteMetadata';
import { seoRoutes } from '@/data/seoRoutes';

export type RouteMeta = {
  path: string;
  title: string;
  description: string;
  image: string;
  canonical: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

const normalizeCanonicalPath = (path: string) => {
  if (!path.startsWith('/')) {
    return `/${path}`;
  }
  return path;
};

const normalizeRouteMeta = (meta: typeof seoRoutes[number]): RouteMeta => ({
  path: normalizeCanonicalPath(meta.path),
  title: meta.title,
  description: meta.description,
  canonical: normalizeCanonicalPath(meta.path),
  image: meta.image ?? siteMetadata.defaultSocialImage,
  ogType: meta.ogType ?? 'website',
  noindex: false,
});

export const getRouteMetaByPath = (path: string): RouteMeta | undefined => {
  const exact = seoRoutes.find((route) => route.path === path);
  if (exact) {
    return normalizeRouteMeta(exact);
  }

  const normalized = normalizeCanonicalPath(path);
  const normalizedMatch = seoRoutes.find((route) => route.path === normalized);
  if (normalizedMatch) {
    return normalizeRouteMeta(normalizedMatch);
  }

  return undefined;
};

export const getRouteMetaById = (path: string): RouteMeta | undefined => {
  const normalized = normalizeCanonicalPath(path);
  const match = seoRoutes.find((route) => route.path === normalized);
  if (!match) {
    return undefined;
  }

  return normalizeRouteMeta(match);
};

export const getHomeMeta = (): RouteMeta => {
  return (
    getRouteMetaByPath('/') ?? {
      path: '/',
      canonical: '/',
      title: siteMetadata.name,
      description: siteMetadata.defaultDescription,
      image: siteMetadata.defaultSocialImage,
    }
  );
};
