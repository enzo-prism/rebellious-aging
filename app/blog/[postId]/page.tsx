import type { Metadata } from 'next';

import BlogPost from '@/views/BlogPost';
import { buildMetadata } from '@/lib/nextMetadata';
import { buildMetaDescription } from '@/lib/seo';
import { siteMetadata } from '@/lib/siteMetadata';
import {
  blogPosts,
  getBlogPostSeoDescription,
  getBlogPostSeoTitle,
  getBlogPostById,
} from '@/data/blogPosts';

const resolvePostMeta = (postId: string) => {
  const post = getBlogPostById(postId);
  const path = `/blog/${postId}`;

  if (!post) {
    return {
      path,
      title: 'Blog Post Not Found',
      description: buildMetaDescription(
        'The blog post you are looking for does not exist. Explore more rebellious insights in our blog archive.'
      ),
      canonical: path,
      image: siteMetadata.defaultSocialImage,
      noindex: true,
    };
  }

  return {
    path,
    canonical: path,
    title: getBlogPostSeoTitle(post),
    description: buildMetaDescription(getBlogPostSeoDescription(post), post.excerpt),
    image: siteMetadata.defaultSocialImage,
    ogType: 'article' as const,
    publishedTime: post.date,
    // Password-gated previews stay out of the search-engine index even though
    // the route is still generated and linked from the public blog index.
    noindex: post.gated === true,
  };
};

export const generateStaticParams = () => {
  return blogPosts.map((post) => ({
    postId: post.id,
  }));
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ postId: string }>;
}): Promise<Metadata> => {
  const { postId } = await params;
  return buildMetadata(resolvePostMeta(postId));
};

export default async function BlogPostRoute({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;
  return <BlogPost postId={postId} />;
}
