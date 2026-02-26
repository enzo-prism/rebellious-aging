import NotFound from '@/pages/NotFound';
import type { Metadata } from 'next';

import { buildMetadata } from '@/lib/nextMetadata';
import { getRouteMetaByPath } from '@/lib/routeMetadata';
import { siteMetadata } from '@/lib/siteMetadata';

const routeMeta = getRouteMetaByPath('/404');

export const generateMetadata = (): Metadata => {
  return buildMetadata(
    routeMeta ?? {
      path: '/404',
      title: 'Page Not Found',
      description: 'This page does not exist. Return to the Rebellious Aging home page.',
      canonical: '/404',
      image: siteMetadata.defaultSocialImage,
    },
    { noindex: true }
  );
};

const NotFoundRoute = () => {
  return <NotFound />;
};

export default NotFoundRoute;
