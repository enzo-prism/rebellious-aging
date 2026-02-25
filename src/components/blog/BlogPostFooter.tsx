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
    <div className="mt-12 border-t border-border pt-8">
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
