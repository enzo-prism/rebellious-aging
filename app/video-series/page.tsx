import type { Metadata } from 'next';

import VideoSeries from '@/pages/VideoSeries';
import { buildMetadata } from '@/lib/nextMetadata';
import { getRouteMetaByPath } from '@/lib/routeMetadata';

const routeMeta = getRouteMetaByPath('/video-series');

export const generateMetadata = (): Metadata => {
  return buildMetadata(
    routeMeta ?? {
      path: '/video-series',
      title: 'Rebel Video Series',
      description:
        'Stream short, rebellious conversations with Suz covering confidence, style, whole-food living, and community.',
    }
  );
};

export default function VideoSeriesPage() {
  return <VideoSeries />;
}
