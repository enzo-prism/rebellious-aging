import type { Metadata } from 'next';

import BlogPost from '@/pages/BlogPost';
import { buildMetadata } from '@/lib/nextMetadata';
import { buildMetaDescription } from '@/lib/seo';
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
      noindex: true,
    };
  }

  return {
    path,
    title: getBlogPostSeoTitle(post),
    description: buildMetaDescription(post.seoDescription, post.excerpt),
    ogType: 'article' as const,
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
