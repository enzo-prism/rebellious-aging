import type { Metadata } from 'next';

import PillarPage from '@/pages/PillarPage';
import { buildMetadata } from '@/lib/nextMetadata';
import { buildMetaDescription } from '@/lib/seo';
import { getRouteMetaByPath } from '@/lib/routeMetadata';
import { pillarContent } from '@/data/pillarContent';
import { seoRoutes } from '@/data/seoRoutes';
import { siteMetadata } from '@/lib/siteMetadata';

const getPillarIds = () => {
  const dynamicFromContent = Object.keys(pillarContent);
  const dynamicFromSeo = seoRoutes
    .map((route) => {
      if (!route.path.startsWith('/pillars/')) {
        return null;
      }

      const rest = route.path.slice('/pillars/'.length);
      if (rest.includes('/')) {
        return null;
      }

      return rest;
    })
    .filter((id): id is string => Boolean(id));

  return Array.from(new Set([...dynamicFromContent, ...dynamicFromSeo]));
};

const resolvePillarMeta = (pillarId: string) => {
  const path = `/pillars/${pillarId}`;
  const staticMeta = getRouteMetaByPath(path);

  if (staticMeta) {
    return staticMeta;
  }

  const content = pillarContent[pillarId];
  if (content) {
    return {
      path,
      canonical: path,
      title: content.title,
      description: buildMetaDescription(content.description),
      image: siteMetadata.defaultSocialImage,
    };
  }

  return {
    path,
    canonical: path,
    title: 'Pillar Not Found',
    description: 'The pillar you are looking for does not exist.',
    image: siteMetadata.defaultSocialImage,
    noindex: true,
  };
};

export const generateStaticParams = () =>
  getPillarIds().map((pillarId) => ({
    pillarId,
  }));

export const generateMetadata = async ({
  params,
}: {
  params: { pillarId: string };
}): Promise<Metadata> => {
  return buildMetadata(resolvePillarMeta(params.pillarId));
};

export default function PillarPageRoute({ params }: { params: { pillarId: string } }) {
  return <PillarPage pillarId={params.pillarId} />;
}
