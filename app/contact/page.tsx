import type { Metadata } from 'next';

import Contact from '@/pages/Contact';
import { buildMetadata } from '@/lib/nextMetadata';
import { getRouteMetaByPath } from '@/lib/routeMetadata';

const routeMeta = getRouteMetaByPath('/contact');

export const generateMetadata = (): Metadata => {
  return buildMetadata(
    routeMeta ?? {
      path: '/contact',
      title: 'Contact Suz',
      description:
        'Reach out to Suz for plant-based guidance, speaking inquiries, or personalized support on your rebellious aging journey.',
    }
  );
};

export default function ContactPage() {
  return <Contact />;
}
