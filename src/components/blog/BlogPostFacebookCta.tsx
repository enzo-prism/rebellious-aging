import React from 'react';
import { FacebookGroupButton, FacebookLogoMark } from '@/components/common/FacebookGroupCta';
import type { BlogPostCta } from '@/data/blogPostCtas';

interface BlogPostFacebookCtaProps {
  cta?: BlogPostCta;
}

export const BlogPostFacebookCta: React.FC<BlogPostFacebookCtaProps> = ({ cta }) => {
  if (!cta) {
    return null;
  }

  return (
    <aside className="my-12 overflow-hidden rounded-2xl border border-[#0866ff]/20 bg-gradient-to-br from-[#0866ff]/10 via-white to-teal/10 p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <FacebookLogoMark size="lg" />
        <div className="min-w-0">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#075ce5]">Continue on Facebook</p>
          <h2 className="mt-3 text-2xl font-bold text-foreground">{cta.title}</h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">{cta.body}</p>
          <FacebookGroupButton size="md" className="mt-5">
            {cta.buttonLabel}
          </FacebookGroupButton>
        </div>
      </div>
    </aside>
  );
};

export default BlogPostFacebookCta;
