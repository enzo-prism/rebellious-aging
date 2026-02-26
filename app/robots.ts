import type { MetadataRoute } from 'next';

import { siteMetadata } from '@/lib/siteMetadata';

const baseUrl = siteMetadata.baseUrl.replace(/\/$/, '');

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/private/'],
      },
      {
        userAgent: ['AhrefsBot', 'MJ12bot', 'DotBot'],
        disallow: '/',
      },
      {
        userAgent: ['Googlebot', 'Bingbot', 'Slurp', 'Twitterbot', 'facebookexternalhit', 'LinkedInBot'],
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
