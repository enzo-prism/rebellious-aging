import React from 'react';
import { ArrowUpRight, ExternalLink, Feather, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SUBSTACK_URL } from '@/lib/constants';

type SubstackAnnouncementVariant = 'banner' | 'feature';

interface SubstackAnnouncementProps {
  className?: string;
  variant?: SubstackAnnouncementVariant;
}

const SUBSTACK_HANDLE = 'substack.com/@rebelsuz';

const BannerAnnouncement: React.FC<{ className?: string }> = ({ className }) => (
  <div
    className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-coral/30 bg-coral/5 px-6 py-5 ${
      className ?? ''
    }`}
  >
    <div>
      <p className="text-xs uppercase tracking-[0.3em] text-coral font-semibold">New</p>
      <h3 className="text-lg font-semibold text-gray-900 mt-2">Suz is now on Substack 📬</h3>
      <p className="text-gray-600 mt-1">
        Follow along for fresh, rebellious reflections delivered straight to your inbox.
      </p>
    </div>
    <Button
      asChild
      className="bg-coral text-white hover:bg-coral-dark shrink-0"
    >
      <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer" className="group">
        Read on Substack
        <ExternalLink className="ml-2 h-4 w-4 transition-transform duration-300 ease-out motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" />
      </a>
    </Button>
  </div>
);

const FeatureAnnouncement: React.FC<{ className?: string }> = ({ className }) => (
  <div
    className={`group relative overflow-hidden rounded-[1.75rem] border border-coral/20 bg-gradient-to-br from-coral/10 via-white to-teal/10 p-6 shadow-sm card-lift-coral animate-slide-up-fade sm:p-9 ${
      className ?? ''
    }`}
  >
    {/* Decorative postmark sparkle, purely visual */}
    <Sparkles
      aria-hidden="true"
      className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rotate-12 text-coral/10"
    />

    <div className="relative flex flex-col gap-7 sm:flex-row sm:items-center sm:gap-8">
      <div className="flex items-start gap-5 sm:items-center">
        {/* Feather medallion with a live "new" pulse */}
        <div className="relative shrink-0">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-coral to-coral-dark text-white shadow-lg shadow-coral/30">
            <Feather className="h-7 w-7 icon-pop" aria-hidden="true" />
          </div>
          <span className="absolute -right-1 -top-1 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral opacity-70" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-coral ring-2 ring-white" />
          </span>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-coral">
            New · On Substack
          </p>
          <h3 className="mt-2 text-xl font-bold leading-snug text-gray-900 sm:text-2xl">
            Suz is now on Substack 📬
          </h3>
          <p className="mt-2 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
            Follow along for fresh, rebellious reflections delivered straight to your inbox.
          </p>
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-start gap-2 sm:ml-auto sm:items-end">
        <Button asChild size="lg" className="bg-coral text-white hover:bg-coral-dark">
          <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer" className="group/cta">
            Read on Substack
            <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 ease-out motion-safe:group-hover/cta:-translate-y-0.5 motion-safe:group-hover/cta:translate-x-0.5" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </Button>
        <span className="text-xs font-medium tracking-wide text-gray-500">{SUBSTACK_HANDLE}</span>
      </div>
    </div>
  </div>
);

const SubstackAnnouncement: React.FC<SubstackAnnouncementProps> = ({
  className,
  variant = 'banner',
}) =>
  variant === 'feature' ? (
    <FeatureAnnouncement className={className} />
  ) : (
    <BannerAnnouncement className={className} />
  );

export default SubstackAnnouncement;
