export type BlogListingCard = {
  id: string;
  blogNumber: number;
  title: string;
  excerpt: string;
  date: string;
  dateSortIso: string;
  readTime: string;
  gated?: boolean;
  releaseLabel?: string;
};

export type HomeBlogCard = {
  id: string;
  blogNumber: number;
  title: string;
  excerpt: string;
  readTime: string;
};

export type LatestBlogCard = {
  id: string;
  blogNumber: number;
};

export const formatBlogListingDate = (dateSortIso: string) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(dateSortIso));

export const getBlogListingYear = (dateSortIso: string) =>
  String(new Date(dateSortIso).getUTCFullYear());

export const isGatedBlogListing = (post: { gated?: boolean }) => post.gated === true;
