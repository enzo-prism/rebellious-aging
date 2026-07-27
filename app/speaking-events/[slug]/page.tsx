import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import SpeakingEventDetail from '@/views/SpeakingEventDetail';
import { getSpeakingEventBySlug, getSpeakingEventPath, speakingEvents } from '@/data/speakingEvents';
import { buildMetadata } from '@/lib/nextMetadata';

interface SpeakingEventPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const generateStaticParams = () =>
  speakingEvents.map((event) => ({
    slug: event.slug,
  }));

export const generateMetadata = async ({ params }: SpeakingEventPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const event = getSpeakingEventBySlug(slug);

  if (!event) {
    return buildMetadata({
      path: getSpeakingEventPath(slug),
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

export default async function SpeakingEventPage({ params }: SpeakingEventPageProps) {
  const { slug } = await params;
  const event = getSpeakingEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return <SpeakingEventDetail event={event} />;
}
