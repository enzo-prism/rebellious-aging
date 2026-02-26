import React from 'react';
import Link from 'next/link';
import { getSortedBlogPosts } from '@/data/blogPosts';

const LatestBlogBadge = () => {
  const posts = getSortedBlogPosts();
  const latestPost = posts[posts.length - 1];

  if (!latestPost) {
    return null;
  }

  return (
    <Link
      href={`/blog/${latestPost.id}`}
      className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/10 px-4 py-2 text-sm text-teal transition hover:bg-teal/15"
      aria-label={`Read the latest blog post: Blog #${latestPost.blogNumber}`}
      title={`Blog #${latestPost.blogNumber}`}
    >
      <span className="uppercase tracking-[0.2em] text-[0.68rem] text-teal">Latest</span>
      <span className="font-semibold truncate max-w-[14rem] sm:max-w-[18rem]">Blog #{latestPost.blogNumber}</span>
      <span aria-hidden className="text-base">→</span>
    </Link>
  );
};

export default LatestBlogBadge;
