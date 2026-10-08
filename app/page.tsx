import type { Metadata } from 'next';

import Home from '@/views/Home';
import { getHomeBlogCards, getLatestBlogCard } from '@/data/blogPosts';
import { buildMetadata } from '@/lib/nextMetadata';
import { getHomeMeta } from '@/lib/routeMetadata';

export const generateMetadata = (): Metadata => {
  const routeMeta = getHomeMeta();
  return buildMetadata(routeMeta);
};

export default function HomePage() {
  return <Home latestPosts={getHomeBlogCards()} latestPost={getLatestBlogCard()} />;
}
