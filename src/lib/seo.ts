import { siteMetadata } from './siteMetadata';

const DEFAULT_DESCRIPTION_LENGTH = 155;

const truncateDescription = (value: string, maxLength = DEFAULT_DESCRIPTION_LENGTH) => {
  if (!value) {
    return '';
  }

  if (value.length <= maxLength) {
    return value;
  }

  const truncated = value.slice(0, maxLength - 1);
  const lastWhitespace = truncated.lastIndexOf(' ');
  const safeSlice = lastWhitespace > 0 ? truncated.slice(0, lastWhitespace) : truncated;

  return `${safeSlice}…`;
};

export const buildSeoTitle = (pageTitle?: string) => {
  if (!pageTitle) {
    return siteMetadata.name;
  }

  return `${pageTitle} | ${siteMetadata.name}`;
};

export const buildMetaDescription = (description?: string, fallback?: string) => {
  const base = description?.trim() || fallback?.trim() || siteMetadata.defaultDescription;
  return truncateDescription(base);
};

export const resolveAbsoluteUrl = (value?: string | null) => {
  if (!value) {
    return undefined;
  }

  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value;
  }

  const base = siteMetadata.baseUrl?.replace(/\/$/, '');
  if (!base) {
    return value;
  }

  const normalized = value.startsWith('/') ? value : `/${value}`;
  return `${base}${normalized}`;
};

export const resolveSocialImage = (imagePath?: string | null) => resolveAbsoluteUrl(imagePath);

export const getCanonicalUrl = (path: string) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const absolute = resolveAbsoluteUrl(normalizedPath);

  if (absolute) {
    return absolute;
  }

  if (typeof window !== 'undefined') {
    return `${window.location.origin}${normalizedPath}`;
  }

  return undefined;
};
