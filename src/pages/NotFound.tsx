
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Seo from '@/components/seo/Seo';
import { getSeoRouteByPath } from '@/data/seoRoutes';

const NotFound = () => {
  const seoConfig = getSeoRouteByPath('/404');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      {seoConfig && (
        <Seo
          title={seoConfig.title}
          description={seoConfig.description}
          canonicalPath={seoConfig.path}
          noindex
        />
      )}
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-teal mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Oops! The page you're looking for seems to have wandered off. Don't worry, even the most rebellious pages find their way home eventually.
        </p>
        <Button asChild className="bg-teal hover:bg-teal-dark text-white">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
