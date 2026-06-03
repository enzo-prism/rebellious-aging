import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { BlogPostCta } from '@/data/blogPostCtas';
import { FACEBOOK_GROUP_URL } from '@/lib/constants';

interface BlogPostFacebookCtaProps {
  cta?: BlogPostCta;
}

export const BlogPostFacebookCta: React.FC<BlogPostFacebookCtaProps> = ({ cta }) => {
  if (!cta) {
    return null;
  }

  return (
    <aside className="my-12 rounded-lg border border-teal/20 bg-teal/5 p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal">Continue the conversation</p>
      <h2 className="mt-3 text-2xl font-bold text-foreground">{cta.title}</h2>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">{cta.body}</p>
      <a
        href={FACEBOOK_GROUP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-2 rounded-md bg-teal px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {cta.buttonLabel}
        <ArrowRight size={16} aria-hidden="true" />
      </a>
    </aside>
  );
};

export default BlogPostFacebookCta;
