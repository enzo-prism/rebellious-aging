import React from 'react';
import Link from 'next/link';
import { BlogPostFooter } from '@/components/blog/BlogPostFooter';
import { BlogShareActions } from '@/components/blog/BlogShareActions';
import Seo from '@/components/seo/Seo';
import { blogPostContent } from '@/data/blogPostContent';
import { getBlogPostById, getBlogPostSeoTitle, getNextBlogPost } from '@/data/blogPosts';
import { buildMetaDescription, buildSeoTitle, getCanonicalUrl, resolveSocialImage } from '@/lib/seo';
import { buildArticleJsonLd } from '@/lib/structuredData';
import { siteMetadata } from '@/lib/siteMetadata';

interface BlogPostProps {
  postId: string;
}

const BlogPost = ({ postId }: BlogPostProps) => {
  const canonicalPath = postId ? `/blog/${postId}` : '/blog';
  const currentPost = postId ? getBlogPostById(postId) : undefined;
  const postContent = postId ? blogPostContent[postId] : undefined;

  if (!currentPost || !postContent) {
    const fallbackDescription = buildMetaDescription(
      'The blog post you are looking for does not exist. Explore more rebellious insights in our blog archive.'
    );
    const canonicalUrl = getCanonicalUrl(canonicalPath);

    return (
      <div className="min-h-screen bg-background px-4 py-12 max-w-3xl mx-auto">
        <Seo
          title="Blog Post Not Found"
          description={fallbackDescription}
          canonicalPath={canonicalPath}
          canonicalUrl={canonicalUrl}
          noindex
        />

        <Link href="/blog" className="text-sm hover:underline mb-8 inline-block">← Back to Blog</Link>
        <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
        <p>The blog post you're looking for doesn't exist.</p>
      </div>
    );
  }

  const nextPost = getNextBlogPost(currentPost.blogNumber);
  const canonicalUrl = getCanonicalUrl(canonicalPath);
  const pageTitle = getBlogPostSeoTitle(currentPost);
  const metaDescription = buildMetaDescription(currentPost.seoDescription, currentPost.excerpt);
  const publishedTime = currentPost.dateSort.toISOString();
  const socialImage = resolveSocialImage(siteMetadata.defaultSocialImage);

  const articleJsonLd =
    canonicalUrl &&
    buildArticleJsonLd({
      title: buildSeoTitle(pageTitle),
      description: metaDescription,
      canonicalUrl,
      image: socialImage,
      datePublished: publishedTime,
    });

  const withSeo = (node: React.ReactNode) => (
    <>
      <Seo
        title={pageTitle}
        description={metaDescription}
        canonicalPath={canonicalPath}
        canonicalUrl={canonicalUrl}
        ogType="article"
        publishedTime={publishedTime}
        jsonLd={articleJsonLd}
      />
      {node}
    </>
  );

  return withSeo(
    <div className="min-h-screen bg-background px-4 py-12 max-w-3xl mx-auto">
      <Link href="/blog" className="text-sm hover:underline mb-8 inline-block">← Back to Blog</Link>

      <div className="mb-4">
        <span className="text-primary font-bold text-lg">Blog #{currentPost.blogNumber}</span>
      </div>

      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
          Share this article
        </p>
        <BlogShareActions
          title={pageTitle}
          excerpt={currentPost.excerpt}
          url={canonicalUrl}
        />
      </div>

      {postContent.heading}
      {postContent.body}

      <BlogPostFooter nextPost={nextPost} />
    </div>
  );
};

export default BlogPost;
