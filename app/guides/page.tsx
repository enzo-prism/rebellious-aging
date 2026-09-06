import Seo from '@/components/seo/Seo';
import { buildCollectionJsonLd } from '@/lib/structuredData';
import { guides, getGuidePath } from '@/data/guides';
import PageBreadcrumbs from '@/components/seo/PageBreadcrumbs';
import type { Metadata } from 'next';

import Guides from '@/views/Guides';
import { buildMetadata } from '@/lib/nextMetadata';
import { getRouteMetaByPath } from '@/lib/routeMetadata';

const routeMeta = getRouteMetaByPath('/guides');

export const generateMetadata = (): Metadata => {
  return buildMetadata(
    routeMeta ?? {
      path: '/guides',
      title: 'Free Plant-Based Booklets & Guides',
      description:
        'The free plant-based booklets Suz recommends most — from the Esselstyn Family Foundation and the T. Colin Campbell Center for Nutrition Studies — plus her own one-page starter.',
    }
  );
};

export default function GuidesPage() {
  return <>
    <Seo jsonLd={buildCollectionJsonLd(routeMeta?.title ?? 'Guides', '/guides', guides.map((guide) => ({ name: guide.title, path: getGuidePath(guide.slug) })))} />
    <div className="container mx-auto px-4 pt-6"><PageBreadcrumbs items={[{ name: "Free Guides", path: "/guides" }]} /></div>
    <Guides />
  </>;
}
