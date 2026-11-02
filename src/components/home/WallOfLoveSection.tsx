import Link from 'next/link';
import { ArrowRight, Heart, Quote } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  wallOfLoveComments,
  type WallOfLoveComment,
  type WallOfLovePlatform,
} from '@/data/wallOfLoveComments';
import { cn } from '@/lib/utils';

// Hand-picked so the quotes read well out of context. The first one is featured.
const HOME_COMMENT_IDS = ['wol-046', 'wol-004', 'wol-050', 'wol-063', 'wol-065'] as const;

const platformLabels: Record<WallOfLovePlatform, string> = {
  tiktok: 'TikTok',
  youtube: 'YouTube',
};

const homeComments = HOME_COMMENT_IDS.map((id) => wallOfLoveComments.find((comment) => comment.id === id)).filter(
  (comment): comment is WallOfLoveComment => Boolean(comment)
);

const Attribution = ({ comment, featured = false }: { comment: WallOfLoveComment; featured?: boolean }) => (
  <figcaption
    className={cn(
      'mt-auto flex items-center gap-3 border-t pt-4',
      featured ? 'border-white/20' : 'border-gray-100'
    )}
  >
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/5">
      <img
        src={`/logos/${comment.platform}.svg`}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="h-5 w-5 object-contain"
      />
    </span>
    <span className="min-w-0">
      <span className={cn('block break-words font-semibold', featured ? 'text-white' : 'text-gray-900')}>
        {comment.name}
      </span>
      <span className={cn('block text-sm', featured ? 'text-white/90' : 'text-gray-600')}>
        On {platformLabels[comment.platform]}
      </span>
    </span>
  </figcaption>
);

const WallOfLoveSection = () => {
  const [featured, ...supporting] = homeComments;
  if (!featured) return null;

  return (
    <section
      aria-labelledby="home-wall-of-love-heading"
      className="border-t border-coral/10 bg-[linear-gradient(180deg,#fcf5f3_0%,#fffaf8_100%)] px-4 py-12 sm:px-6 lg:py-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-2xl">
          <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-coral">
            <Heart className="h-4 w-4" aria-hidden="true" />
            From the Wall of Love
          </p>
          <h2 id="home-wall-of-love-heading" className="text-3xl font-bold sm:text-4xl">
            Kind words from the community
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            Real comments, word for word, from Suz’s TikTok and YouTube videos.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          <figure className="relative flex flex-col overflow-hidden rounded-3xl bg-teal p-6 text-white shadow-sm sm:p-8 md:col-span-2 lg:col-span-1 lg:row-span-2">
            <Quote
              aria-hidden="true"
              className="pointer-events-none absolute right-5 top-5 h-14 w-14 fill-current text-white/15 sm:right-7 sm:top-7"
              strokeWidth={0}
            />
            <p className="relative pr-16 text-xs font-semibold uppercase tracking-wide text-white/90">
              On &ldquo;{featured.context}&rdquo;
            </p>
            <blockquote className="relative mb-8 mt-4 text-2xl font-semibold leading-snug sm:text-[1.75rem] lg:text-[2rem] lg:leading-tight">
              {featured.quote}
            </blockquote>
            <Attribution comment={featured} featured />
          </figure>

          {supporting.map((comment, index) => (
            <figure
              key={comment.id}
              className={cn(
                'flex flex-col rounded-3xl border border-coral/10 bg-white p-6 shadow-sm',
                // Phones show the featured quote plus two; the rest appear from the tablet layout up.
                index >= 2 && 'hidden md:flex'
              )}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-coral">
                On &ldquo;{comment.context}&rdquo;
              </p>
              <blockquote className="mb-6 mt-3 text-lg leading-relaxed text-gray-800">{comment.quote}</blockquote>
              <Attribution comment={comment} />
            </figure>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
          <Button asChild variant="outline" size="lg" className="min-h-12 border-teal text-base text-teal">
            <Link href="/wall-of-love">
              Read the Wall of Love <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <p className="text-sm text-gray-600">{wallOfLoveComments.length} messages of love, and counting</p>
        </div>
      </div>
    </section>
  );
};

export default WallOfLoveSection;
