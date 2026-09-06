import Seo from '@/components/seo/Seo';
import { siteMetadata } from '@/lib/siteMetadata';
import PageBreadcrumbs from '@/components/seo/PageBreadcrumbs';
import type { Metadata } from 'next';

import Movement from '@/views/Movement';
import { buildMetadata } from '@/lib/nextMetadata';
import { getRouteMetaByPath } from '@/lib/routeMetadata';

const routeMeta = getRouteMetaByPath('/our-story');

export const generateMetadata = (): Metadata => {
  return buildMetadata(
    routeMeta ?? {
      path: '/our-story',
      title: 'Our Story',
      description: 'Meet Suz and discover how Rebellious Aging challenges outdated rules with science-backed lifestyle shifts rooted in compassion.',
    }
  );
};

export default function OurStoryPage() {
  return <>
    <Seo jsonLd={{
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      '@id': `${siteMetadata.baseUrl}/our-story#page`,
      url: `${siteMetadata.baseUrl}/our-story`,
      name: routeMeta?.title,
      mainEntity: { '@id': siteMetadata.author.id },
      isPartOf: { '@id': `${siteMetadata.baseUrl}/#website` },
    }} />
    <div className="container mx-auto px-4 pt-6"><PageBreadcrumbs items={[{ name: "Our Story", path: "/our-story" }]} /></div>
    <Movement />
  </>;
}
