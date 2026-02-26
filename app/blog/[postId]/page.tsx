import type { Metadata } from 'next';

import BlogPost from '@/pages/BlogPost';
import { buildMetadata } from '@/lib/nextMetadata';
import { buildMetaDescription } from '@/lib/seo';
import { siteMetadata } from '@/lib/siteMetadata';
import { blogPosts, getBlogPostSeoTitle, getBlogPostById } from '@/data/blogPosts';

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
    description: buildMetaDescription(post.seoDescription, post.excerpt),
    image: siteMetadata.defaultSocialImage,
    ogType: 'article' as const,
    publishedTime: post.date,
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
  params: { postId: string };
}): Promise<Metadata> => {
  return buildMetadata(resolvePostMeta(params.postId));
};

export default function BlogPostRoute({ params }: { params: { postId: string } }) {
  return <BlogPost postId={params.postId} />;
}
