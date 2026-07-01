import type { Metadata } from 'next';

import GuideDetail from '@/views/GuideDetail';
import { buildMetadata } from '@/lib/nextMetadata';
import { buildMetaDescription } from '@/lib/seo';
import { guides, getGuideBySlug, getGuidePath } from '@/data/guides';
import { siteMetadata } from '@/lib/siteMetadata';

const resolveGuideMeta = (slug: string) => {
  const guide = getGuideBySlug(slug);
  const path = getGuidePath(slug);

  if (!guide) {
    return {
      path,
      title: 'Guide Not Found',
      description: buildMetaDescription(
        "The guide you are looking for does not exist. Browse all of Suz's free plant-based booklets and guides."
      ),
      canonical: path,
      image: siteMetadata.defaultSocialImage,
      noindex: true,
    };
  }

  return {
    path,
    canonical: path,
    title: guide.title,
    description: buildMetaDescription(guide.summary),
    ogType: 'article' as const,
    image: siteMetadata.defaultSocialImage,
  };
};

export const generateStaticParams = () =>
  guides.map((guide) => ({
    slug: guide.slug,
  }));

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  return buildMetadata(resolveGuideMeta(params.slug));
};

export default function GuideDetailRoute({ params }: { params: { slug: string } }) {
  return <GuideDetail slug={params.slug} />;
}
