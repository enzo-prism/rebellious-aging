import Seo from '@/components/seo/Seo';
import { buildCollectionJsonLd } from '@/lib/structuredData';
import { getBlogPostsByDateDesc, isGatedBlogPost } from '@/data/blogPosts';
import PageBreadcrumbs from '@/components/seo/PageBreadcrumbs';
import type { Metadata } from 'next';

import Blog from '@/views/Blog';
import { buildMetadata } from '@/lib/nextMetadata';
import { getRouteMetaByPath } from '@/lib/routeMetadata';

const routeMeta = getRouteMetaByPath('/blog');

export const generateMetadata = (): Metadata => {
  return buildMetadata(
    routeMeta ?? {
      path: '/blog',
      title: 'Blog',
      description:
        'Catch up on Suz’s long-form reflections on gratitude, nourishment, style, mindset, and rebellious aging.',
    }
  );
};

export default function BlogPage() {
  return <>
    <Seo jsonLd={buildCollectionJsonLd(routeMeta?.title ?? 'Blog', '/blog', getBlogPostsByDateDesc().filter((post) => !isGatedBlogPost(post)).map((post) => ({ name: post.title, path: `/blog/${post.id}` })))} />
    <div className="container mx-auto px-4 pt-6"><PageBreadcrumbs items={[{ name: "Blog", path: "/blog" }]} /></div>
    <Blog />
  </>;
}
