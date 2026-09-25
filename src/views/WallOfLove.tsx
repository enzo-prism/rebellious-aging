import React from 'react';
import { Heart } from 'lucide-react';
import ConnectCTA from '@/components/common/ConnectCTA';
import Seo from '@/components/seo/Seo';
import PageShareButton from '@/components/share/PageShareButton';
import PageTopUtilityRow from '@/components/share/PageTopUtilityRow';
import { getSeoRouteByPath } from '@/data/seoRoutes';
import { wallOfLoveComments, type WallOfLovePlatform } from '@/data/wallOfLoveComments';
import { cn } from '@/lib/utils';

// Logos come from svgl (https://svgl.app) and live in public/logos.
const platforms: Record<
  WallOfLovePlatform,
  { label: string; logoSrc: string; profileUrl: string; cta: string }
> = {
  tiktok: {
    label: 'TikTok',
    logoSrc: '/logos/tiktok.svg',
    profileUrl: 'https://www.tiktok.com/@rebelwithsuz',
    cta: 'Follow on TikTok',
  },
  youtube: {
    label: 'YouTube',
    logoSrc: '/logos/youtube.svg',
    profileUrl: 'https://www.youtube.com/@rebelliousaging-suz',
    cta: 'Subscribe on YouTube',
  },
};

const platformOrder: WallOfLovePlatform[] = ['tiktok', 'youtube'];

// Short comments ("Legend!") get display type so they don't float in an empty card.
const SHORT_QUOTE_MAX_LENGTH = 60;

const PlatformLogo = ({
  platform,
  className,
}: {
  platform: WallOfLovePlatform;
  className?: string;
}) => (
  <img
    src={platforms[platform].logoSrc}
    alt=""
    aria-hidden="true"
    loading="lazy"
    decoding="async"
    className={cn('shrink-0 object-contain', className)}
  />
);

const WallOfLove = () => {
  const seoConfig = getSeoRouteByPath('/wall-of-love');
  const countByPlatform = wallOfLoveComments.reduce<Record<WallOfLovePlatform, number>>(
    (counts, comment) => {
      counts[comment.platform] += 1;
      return counts;
    },
    { tiktok: 0, youtube: 0 }
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-coral/5 to-white">
      {seoConfig && (
        <Seo
          title={seoConfig.title}
          description={seoConfig.description}
          canonicalPath={seoConfig.path}
        />
      )}

      {/* Hero */}
      <section className="pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <PageTopUtilityRow className="mb-2">
              <PageShareButton />
            </PageTopUtilityRow>
            <div className="inline-flex items-center gap-2 rounded-full border border-coral/20 bg-white px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-coral shadow-sm">
              <Heart className="h-4 w-4" />
              Community Love
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Wall of Love
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
              Real comments from real people on Suz&apos;s videos. Every word below
              was left by someone in the Rebellious Aging community, and every one
              is a reminder of why she shares.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4">
              {platformOrder.map((platform) => (
                <a
                  key={platform}
                  href={platforms[platform].profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[52px] w-full max-w-[272px] items-center justify-center gap-3 rounded-full border border-gray-200 bg-white px-6 text-base font-semibold text-gray-900 shadow-sm transition-all duration-200 ease-out hover:border-gray-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0"
                >
                  <PlatformLogo platform={platform} className="h-6 w-6" />
                  {platforms[platform].cta}
                </a>
              ))}
            </div>
            <div className="space-y-2 pt-2">
              <p className="text-sm font-medium text-gray-700">
                {wallOfLoveComments.length} messages of love, and counting
              </p>
              <ul className="flex items-center justify-center gap-5 text-sm text-gray-500">
                {platformOrder.map((platform) => (
                  <li key={platform} className="inline-flex items-center gap-1.5">
                    <PlatformLogo platform={platform} className="h-4 w-4" />
                    {countByPlatform[platform]} from {platforms[platform].label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The wall */}
      <section className="pb-16 sm:pb-20 lg:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-6">
            {wallOfLoveComments.map((comment) => {
              const platform = platforms[comment.platform];
              const isShort = comment.quote.length <= SHORT_QUOTE_MAX_LENGTH;
              return (
                <figure
                  key={comment.id}
                  className="break-inside-avoid mb-6 rounded-2xl border border-gray-200/70 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
                >
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-coral">
                    On &ldquo;{comment.context}&rdquo;
                  </p>
                  <blockquote
                    className={cn(
                      isShort
                        ? 'text-xl sm:text-2xl font-semibold leading-snug text-gray-900'
                        : 'leading-relaxed text-gray-800'
                    )}
                  >
                    {comment.quote}
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/5">
                      <PlatformLogo platform={comment.platform} className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="break-words font-semibold text-gray-900">
                        {comment.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {platform.label} &middot; {comment.date}
                      </div>
                    </div>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      <ConnectCTA />
    </div>
  );
};

export default WallOfLove;
