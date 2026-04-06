import React from 'react';
import Link from 'next/link';
import { ArrowRight, CalendarDays, MapPin, Mic2 } from 'lucide-react';

import ConnectCTA from '@/components/common/ConnectCTA';
import TrustedVoicesSection from '@/components/common/TrustedVoicesSection';
import Seo from '@/components/seo/Seo';
import PageShareButton from '@/components/share/PageShareButton';
import PageTopUtilityRow from '@/components/share/PageTopUtilityRow';
import { Button } from '@/components/ui/button';
import { getSeoRouteByPath } from '@/data/seoRoutes';
import { getSpeakingEventPath, speakingEvents, speakingEventsInfo } from '@/data/speakingEvents';
import { buildOrganizationJsonLd } from '@/lib/structuredData';

const SpeakingEvents = () => {
  const seoConfig = getSeoRouteByPath('/speaking-events');

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal/10 via-white to-coral/5 py-12">
      {seoConfig && (
        <Seo
          title={seoConfig.title}
          description={seoConfig.description}
          canonicalPath={seoConfig.path}
          jsonLd={buildOrganizationJsonLd()}
        />
      )}

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <section className="rounded-[2rem] border border-teal/20 bg-white/90 px-6 py-8 shadow-sm md:px-10 md:py-12">
            <PageTopUtilityRow>
              <PageShareButton />
            </PageTopUtilityRow>

            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-coral/20 bg-coral/10 px-4 py-2 text-sm font-semibold text-coral">
                  <Mic2 className="h-4 w-4" />
                  Talks, readings, and community conversations
                </div>
                <div className="space-y-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.32em] text-teal">Speaking Events</p>
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
                    Where Suz brings Rebellious Aging into the room
                  </h1>
                  <p className="max-w-3xl text-lg leading-relaxed text-gray-700">
                    {speakingEventsInfo.description} This archive is designed to grow over time, one event page at a time.
                  </p>
                </div>
              </div>

              <div className="rounded-[2rem] border border-teal/20 bg-gradient-to-br from-teal/10 via-white to-coral/10 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal">What to expect here</p>
                <div className="mt-4 space-y-3 text-gray-700">
                  <p>Event recaps with the context behind the talk.</p>
                  <p>Key ideas Suz shared from the stage.</p>
                  <p>Slide decks and supporting materials as they become available.</p>
                </div>
                <div className="mt-6 rounded-2xl border border-white/80 bg-white/80 p-4 text-sm leading-relaxed text-gray-700">
                  Looking to invite Suz to speak? Visit the contact page and share a few details about your community, event, or topic.
                </div>
                <Button asChild className="mt-5 bg-teal text-white hover:bg-teal-dark">
                  <Link href="/contact">Inquire About Speaking</Link>
                </Button>
              </div>
            </div>
          </section>

          <TrustedVoicesSection
            eyebrow="Why It Lands"
            title="What people notice when Suz is in the room"
            description="These endorsements reinforce what the speaking archive is designed to show: Suz pairs lived warmth with research, curiosity, and a message people genuinely want to hear."
            ctaHref="/contact"
            ctaLabel="Invite Suz to speak"
            className="rounded-[2rem] border border-teal/20 bg-white/90 py-10 shadow-sm"
          />

          <section className="grid gap-6 md:grid-cols-2">
            {speakingEvents.map((event) => (
              <article key={event.slug} className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-sm">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-teal">
                    {event.label}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] ${
                      event.slideDeck.status === 'ready'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-coral/10 text-coral'
                    }`}
                  >
                    {event.slideDeck.status === 'ready' ? 'Slides available' : 'Slides coming soon'}
                  </span>
                </div>
                <h2 className="mt-4 text-3xl font-bold text-gray-900">{event.title}</h2>
                <p className="mt-3 leading-relaxed text-gray-700">{event.summary}</p>

                <div className="mt-5 space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-teal" />
                    <span>{event.dateLabel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-teal" />
                    <span>{event.location}</span>
                  </div>
                  <p className="font-medium text-gray-700">Hosted by {event.host}</p>
                </div>

                <Button asChild variant="outline" className="mt-6 border-teal/30 text-teal hover:bg-teal/5">
                  <Link href={getSpeakingEventPath(event.slug)}>
                    Read the event page
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </article>
            ))}
          </section>

          <div className="text-center text-sm text-muted-foreground">
            More speaking events, workshops, and community recaps will be added here as the archive grows.
          </div>
        </div>
      </div>

      <ConnectCTA />
    </div>
  );
};

export default SpeakingEvents;
