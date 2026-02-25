import React from 'react';

interface SeoProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  canonicalUrl?: string;
  image?: string;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
  noindex?: boolean;
  publishedTime?: string;
  ogType?: 'website' | 'article';
  children?: React.ReactNode;
}

const normalizeJsonLd = (
  value?: Record<string, unknown> | Array<Record<string, unknown>>
) => {
  if (!value) {
    return undefined;
  }

  return Array.isArray(value) ? value : [value];
};

export const Seo: React.FC<SeoProps> = ({ jsonLd }) => {
  const structuredData = normalizeJsonLd(jsonLd);

  return (
    <>
      {structuredData?.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
};

export default Seo;
