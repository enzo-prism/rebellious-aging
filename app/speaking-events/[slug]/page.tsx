import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import SpeakingEventDetail from '@/views/SpeakingEventDetail';
import { getSpeakingEventBySlug, getSpeakingEventPath, speakingEvents } from '@/data/speakingEvents';
import { buildMetadata } from '@/lib/nextMetadata';

interface SpeakingEventPageProps {
  params: {
    slug: string;
  };
}

export const generateStaticParams = () =>
  speakingEvents.map((event) => ({
    slug: event.slug,
  }));

export const generateMetadata = ({ params }: SpeakingEventPageProps): Metadata => {
  const event = getSpeakingEventBySlug(params.slug);

  if (!event) {
    return buildMetadata({
      path: getSpeakingEventPath(params.slug),
      title: 'Speaking Event Not Found',
      description: 'The speaking event you are looking for could not be found.',
    });
  }

  return buildMetadata({
    path: getSpeakingEventPath(event.slug),
    title: event.title,
    description: event.seoDescription,
    ogType: 'article',
  });
};

export default function SpeakingEventPage({ params }: SpeakingEventPageProps) {
  const event = getSpeakingEventBySlug(params.slug);

  if (!event) {
    notFound();
  }

  return <SpeakingEventDetail event={event} />;
}
