import Link from 'next/link';

import { trustedVoiceEndorsements } from '@/data/endorsements';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface TrustedVoicesSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  ctaHref?: string;
  ctaLabel?: string;
  className?: string;
}

const TrustedVoicesSection = ({
  eyebrow = 'Trusted Voices',
  title = 'What trusted voices say about Suz',
  description = 'Warmth matters. Evidence matters. These words capture the way Suz brings both into the room.',
  ctaHref,
  ctaLabel,
  className,
}: TrustedVoicesSectionProps) => {
  return (
    <section
      className={cn(
        'bg-[linear-gradient(180deg,rgba(240,253,250,0.92)_0%,rgba(255,255,255,1)_100%)] py-12 sm:py-16 md:py-20 lg:py-24',
        className
      )}
    >
      <div className="container mx-auto container-padding">
        <div className="mx-auto max-w-3xl text-center prose-spacing">
          <p className="uppercase text-xs tracking-[0.3em] text-teal font-semibold">{eyebrow}</p>
          <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {trustedVoiceEndorsements.map((endorsement) => (
            <figure
              key={endorsement.name}
              className="flex h-full flex-col rounded-[2rem] border border-teal/15 bg-white p-6 shadow-sm"
            >
              <div className="text-5xl leading-none text-coral/30" aria-hidden="true">
                "
              </div>
              <blockquote className="mt-4 text-lg leading-relaxed text-gray-800">
                {endorsement.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-gray-100 pt-4">
                <p className="text-base font-semibold text-gray-900">{endorsement.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">{endorsement.title}</p>
                {endorsement.href && endorsement.linkLabel ? (
                  <a
                    href={endorsement.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex text-sm font-semibold text-teal transition hover:text-teal-dark"
                  >
                    {endorsement.linkLabel}
                    <span aria-hidden="true">&nbsp;-&gt;</span>
                  </a>
                ) : null}
              </figcaption>
            </figure>
          ))}
        </div>

        {ctaHref && ctaLabel ? (
          <div className="mt-8 flex justify-center">
            <Button asChild variant="outline" className="border-teal text-teal hover:bg-teal hover:text-white">
              <Link href={ctaHref}>{ctaLabel}</Link>
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default TrustedVoicesSection;
