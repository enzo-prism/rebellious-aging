import React from 'react';

type JsonLdSchema = Record<string, unknown>;
type JsonLdValue = JsonLdSchema | JsonLdSchema[];

interface LegacyMetadataProps {
  /** @deprecated Set route metadata with Next.js generateMetadata instead. */
  title?: string;
  /** @deprecated Set route metadata with Next.js generateMetadata instead. */
  description?: string;
  /** @deprecated Set route metadata with Next.js generateMetadata instead. */
  canonicalPath?: string;
  /** @deprecated Set route metadata with Next.js generateMetadata instead. */
  canonicalUrl?: string;
  /** @deprecated Set route metadata with Next.js generateMetadata instead. */
  image?: string;
  /** @deprecated Set route metadata with Next.js generateMetadata instead. */
  noindex?: boolean;
  /** @deprecated Set route metadata with Next.js generateMetadata instead. */
  publishedTime?: string;
  /** @deprecated Set route metadata with Next.js generateMetadata instead. */
  ogType?: 'website' | 'article';
}

interface SeoProps extends LegacyMetadataProps {
  jsonLd?: JsonLdValue;
}

const normalizeJsonLd = (value?: JsonLdValue) => {
  if (!value) {
    return undefined;
  }

  return Array.isArray(value) ? value : [value];
};

const jsonLdEscapeCharacters: Record<string, string> = {
  '<': '\\u003c',
  '>': '\\u003e',
  '&': '\\u0026',
  '\u2028': '\\u2028',
  '\u2029': '\\u2029',
};

export const serializeJsonLd = (schema: JsonLdSchema) =>
  JSON.stringify(schema).replace(
    /[<>&\u2028\u2029]/g,
    (character) => jsonLdEscapeCharacters[character]
  );

export const Seo: React.FC<SeoProps> = ({ jsonLd }) => {
  const structuredData = normalizeJsonLd(jsonLd);

  return (
    <>
      {structuredData?.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
        />
      ))}
    </>
  );
};

export default Seo;
