import React from 'react';
import Link from 'next/link';
import { ArrowRight, Download, Leaf, Sprout } from 'lucide-react';

import { Button } from '@/components/ui/button';
import PageShareButton from '@/components/share/PageShareButton';
import PageTopUtilityRow from '@/components/share/PageTopUtilityRow';
import { guides, getGuidePath, type GuideIcon } from '@/data/guides';

const iconMap: Record<GuideIcon, React.ComponentType<{ className?: string }>> = {
  sprout: Sprout,
  leaf: Leaf,
  download: Download,
};

const Guides = () => {
  return (
    <div className="min-h-screen bg-background">
      <section className="section-padding container-padding">
        <div className="mx-auto max-w-5xl">
          <PageTopUtilityRow className="justify-end">
            <PageShareButton />
          </PageTopUtilityRow>

          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal">
              Free · No sign-up
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
              Free Plant-Based Booklets &amp; Guides
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-gray-700">
              The two booklets Suz refers people to most — from the Esselstyn Family Foundation and the
              T. Colin Campbell Center for Nutrition Studies — plus her own one-page starter. All free,
              all in one place, so you never have to hunt for the link again.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {guides.map((guide) => {
              const Icon = iconMap[guide.icon];
              const accentBg = guide.accent === 'coral' ? 'bg-coral/10 text-coral' : 'bg-teal/10 text-teal';
              const hoverBorder = guide.accent === 'coral' ? 'hover:border-coral/40' : 'hover:border-teal/40';

              return (
                <article
                  key={guide.slug}
                  className={`flex flex-col rounded-[2rem] border border-gray-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${hoverBorder}`}
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full ${accentBg}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-coral">
                    {guide.eyebrow}
                  </p>
                  <h2 className="mt-2 text-xl font-bold text-gray-900">{guide.title}</h2>
                  <p className="mt-3 flex-1 leading-relaxed text-gray-700">{guide.summary}</p>
                  <p className="mt-4 text-sm text-gray-600">{guide.accessNote}</p>
                  <Button asChild className="mt-6 bg-teal text-white hover:bg-teal-dark">
                    <Link href={getGuidePath(guide.slug)} aria-label={`See the ${guide.navLabel}`}>
                      See the booklet
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </article>
              );
            })}
          </div>

          <div className="mx-auto mt-14 max-w-2xl rounded-[2rem] border border-gray-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900">New to whole-food, plant-based living?</h2>
            <p className="mt-3 leading-relaxed text-gray-700">
              Start with the free booklets above, then watch Suz&apos;s talk and explore the nutrition basics
              whenever you&apos;re ready.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild className="bg-coral text-white hover:bg-coral-dark">
                <Link href="/the-talk">
                  Watch: The Talk
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-teal text-teal hover:bg-teal hover:text-white">
                <Link href="/nutrition">Nutrition basics</Link>
              </Button>
              <Button asChild variant="outline" className="border-teal text-teal hover:bg-teal hover:text-white">
                <Link href="/pillars/health/resource-guide">
                  Full resource guide
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Guides;
