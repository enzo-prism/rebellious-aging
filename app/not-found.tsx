import NotFound from '@/pages/NotFound';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'This page does not exist. Return to the Rebellious Aging home page.',
  robots: {
    index: false,
    follow: false,
  },
};

const NotFoundRoute = () => {
  return <NotFound />;
};

export default NotFoundRoute;
