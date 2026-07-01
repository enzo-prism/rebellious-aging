import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Download, ExternalLink, Leaf, Sprout } from 'lucide-react';

import { Button } from '@/components/ui/button';
import Seo from '@/components/seo/Seo';
import PageShareButton from '@/components/share/PageShareButton';
import PageTopUtilityRow from '@/components/share/PageTopUtilityRow';
import { guides, getGuideBySlug, getGuidePath, type GuideIcon } from '@/data/guides';
import { getCanonicalUrl } from '@/lib/seo';

interface GuideDetailProps {
  slug?: string;
}

const iconMap: Record<GuideIcon, React.ComponentType<{ className?: string }>> = {
  sprout: Sprout,
  leaf: Leaf,
  download: Download,
};

const GuideDetail = ({ slug }: GuideDetailProps) => {
  const guide = slug ? getGuideBySlug(slug) : undefined;

  if (!guide) {
    return (
      <div className="min-h-screen bg-background px-4 py-12 max-w-3xl mx-auto">
        <Link href="/guides" className="mb-8 inline-block text-sm hover:underline">
          ← Back to Free Guides
        </Link>
        <h1 className="mb-4 text-4xl font-bold">Guide Not Found</h1>
        <p>The guide you&apos;re looking for doesn&apos;t exist. Browse all of Suz&apos;s free plant-based guides instead.</p>
      </div>
    );
  }

  const Icon = iconMap[guide.icon];
  const canonicalPath = getGuidePath(guide.slug);
  const canonicalUrl = getCanonicalUrl(canonicalPath);
  const otherGuides = guides.filter((item) => item.slug !== guide.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: guide.title,
    description: guide.summary,
    url: canonicalUrl,
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    learningResourceType: 'Guide',
    author: guide.author ? { '@type': 'Person', name: guide.author } : undefined,
    publisher: { '@type': 'Organization', name: guide.source },
  };

  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <Seo jsonLd={jsonLd} />

      <div className="mx-auto max-w-4xl space-y-10">
        <Link
          href="/guides"
          className="inline-block text-sm hover:underline focus-visible:underline focus-visible:outline-none"
        >
          ← Back to Free Guides
        </Link>

        <PageTopUtilityRow className="-mt-4">
          <PageShareButton />
        </PageTopUtilityRow>

        {/* Hero */}
        <div className="space-y-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal/10 text-teal">
            <Icon className="h-7 w-7" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-coral">{guide.eyebrow}</p>
            <h1 className="mt-2 text-4xl font-bold leading-tight text-gray-900 md:text-5xl">{guide.title}</h1>
            {guide.author && <p className="mt-3 text-lg font-medium text-teal">{guide.author}</p>}
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-gray-700">{guide.intro}</p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="bg-teal text-white hover:bg-teal-dark">
              {guide.external ? (
                <a href={guide.primaryUrl} target="_blank" rel="noopener noreferrer">
                  {guide.primaryLabel}
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : (
                <a href={guide.primaryUrl} download>
                  {guide.primaryLabel}
                  <Download className="h-4 w-4" />
                </a>
              )}
            </Button>
            {guide.pdfUrl && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-teal text-teal hover:bg-teal hover:text-white"
              >
                <a href={guide.pdfUrl} target="_blank" rel="noopener noreferrer">
                  {guide.pdfLabel ?? 'Download the PDF'}
                  <Download className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
          <p className="text-sm text-gray-600">{guide.accessNote}</p>
        </div>

        {/* What's inside */}
        <div className="rounded-[2rem] border border-gray-200 bg-white p-7 shadow-sm md:p-8">
          <h2 className="text-2xl font-bold text-gray-900">What&apos;s inside</h2>
          <ul className="mt-5 space-y-3">
            {guide.whatsInside.map((item, index) => (
              <li key={index} className="flex items-start gap-3 leading-relaxed text-gray-700">
                <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal">
                  <Check className="h-4 w-4" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Why Suz recommends it */}
        <div className="rounded-[2rem] border border-coral/20 bg-coral/5 p-7 md:p-8">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-coral">Why Suz recommends it</h2>
          <p className="mt-3 text-lg leading-relaxed text-gray-800">{guide.whySuz}</p>
        </div>

        {/* Repeat CTA */}
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <Button asChild size="lg" className="bg-coral text-white hover:bg-coral-dark">
            {guide.external ? (
              <a href={guide.primaryUrl} target="_blank" rel="noopener noreferrer">
                {guide.primaryLabel}
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : (
              <a href={guide.primaryUrl} download>
                {guide.primaryLabel}
                <Download className="h-4 w-4" />
              </a>
            )}
          </Button>
          {guide.external && (
            <p className="text-sm text-gray-600">
              Opens on the {guide.source} site. Rebellious Aging is sharing this free resource, not rehosting it.
            </p>
          )}
        </div>

        {/* Other guides */}
        {otherGuides.length > 0 && (
        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-xl font-bold text-gray-900">More free guides</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {otherGuides.map((item) => (
              <Link
                key={item.slug}
                href={getGuidePath(item.slug)}
                aria-label={`See the ${item.navLabel}`}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-teal/40 hover:shadow-md focus-visible:border-teal/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/40"
              >
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-coral">
                    {item.eyebrow}
                  </span>
                  <span className="mt-1 block font-bold text-gray-900">{item.navLabel}</span>
                </span>
                <ArrowRight className="h-5 w-5 flex-shrink-0 text-teal transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default GuideDetail;
