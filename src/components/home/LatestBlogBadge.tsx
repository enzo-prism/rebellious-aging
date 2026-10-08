import React from 'react';
import Link from 'next/link';
import type { LatestBlogCard } from '@/data/blogListing';

const LatestBlogBadge = ({ post }: { post?: LatestBlogCard }) => {
  if (!post) {
    return null;
  }

  return (
    <Link
      href={`/blog/${post.id}`}
      className="group inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/10 px-4 py-2 text-sm text-teal transition hover:bg-teal/15"
      aria-label={`Read the latest blog post: Blog #${post.blogNumber}`}
      title={`Blog #${post.blogNumber}`}
    >
      <span className="uppercase tracking-[0.2em] text-[0.68rem] text-teal">Latest</span>
      <span className="font-semibold truncate max-w-[14rem] sm:max-w-[18rem]">Blog #{post.blogNumber}</span>
      <span aria-hidden className="arrow-nudge text-base">→</span>
    </Link>
  );
};

export default LatestBlogBadge;
