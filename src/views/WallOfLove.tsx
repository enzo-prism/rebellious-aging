import React from 'react';
import { ExternalLink, Heart, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ConnectCTA from '@/components/common/ConnectCTA';
import Seo from '@/components/seo/Seo';
import PageShareButton from '@/components/share/PageShareButton';
import PageTopUtilityRow from '@/components/share/PageTopUtilityRow';
import { getSeoRouteByPath } from '@/data/seoRoutes';
import { wallOfLoveComments, type WallOfLovePlatform } from '@/data/wallOfLoveComments';

const TIKTOK_URL = 'https://www.tiktok.com/@rebelwithsuz';
const YOUTUBE_URL = 'https://www.youtube.com/@rebelliousaging-suz';

const TikTokMark = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

const YouTubeMark = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const platformBadge: Record<WallOfLovePlatform, { label: string; className: string }> = {
  tiktok: { label: 'TikTok', className: 'bg-black text-white' },
  youtube: { label: 'YouTube', className: 'bg-[#FF0000] text-white' },
};

const WallOfLove = () => {
  const seoConfig = getSeoRouteByPath('/wall-of-love');

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-coral/5 to-white pt-24">
      {seoConfig && (
        <Seo
          title={seoConfig.title}
          description={seoConfig.description}
          canonicalPath={seoConfig.path}
        />
      )}

      {/* Hero */}
      <section className="py-12 sm:py-16 lg:py-20">
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
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="min-w-[240px] bg-black text-white hover:bg-gray-800"
              >
                <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer">
                  <TikTokMark className="h-5 w-5 mr-2" />
                  Follow on TikTok
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                className="min-w-[240px] bg-[#FF0000] text-white hover:bg-[#cc0000]"
              >
                <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
                  <YouTubeMark className="h-5 w-5 mr-2" />
                  Subscribe on YouTube
                </a>
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              {wallOfLoveComments.length} messages of love, and counting.
            </p>
          </div>
        </div>
      </section>

      {/* The wall */}
      <section className="pb-16 sm:pb-20 lg:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-6">
            {wallOfLoveComments.map((comment) => {
              const badge = platformBadge[comment.platform];
              return (
                <figure
                  key={comment.id}
                  className="break-inside-avoid mb-6 rounded-2xl border border-teal/10 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <Quote className="h-6 w-6 text-coral/60 mb-3" aria-hidden="true" />
                  <blockquote className="text-gray-800 leading-relaxed">
                    {comment.quote}
                  </blockquote>
                  <figcaption className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                    <div className="font-semibold text-gray-900">{comment.name}</div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${badge.className}`}
                      >
                        {badge.label}
                      </span>
                      <span className="text-sm text-gray-500">{comment.date}</span>
                    </div>
                    <a
                      href={comment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-teal hover:text-teal-dark"
                    >
                      on &ldquo;{comment.context}&rdquo;
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
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
