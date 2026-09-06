import React from 'react';
import Link from 'next/link';

import type { BlogPostMetadata } from '@/data/blogPosts';

interface BlogPostFooterProps {
  nextPost?: BlogPostMetadata;
}

export const BlogPostFooter: React.FC<BlogPostFooterProps> = ({
  nextPost
}) => {
  return (
    <div className="mt-12 border-t border-border pt-8 space-y-6">
      <Link href="/blog" className="inline-flex min-h-11 items-center font-semibold text-teal underline underline-offset-4">← All articles</Link>
      {nextPost && (
        <div>
          <p className="text-sm text-muted-foreground mb-2">Next Article</p>
          <Link href={`/blog/${nextPost.id}`} className="text-xl hover:underline">
            {nextPost.title}
          </Link>
        </div>
      )}
    </div>
  );
};

export default BlogPostFooter;
