import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CalendarDays, Download, ExternalLink, MapPin, Mic2, PlayCircle, Presentation, UserRound } from 'lucide-react';

import ConnectCTA from '@/components/common/ConnectCTA';
import Seo from '@/components/seo/Seo';
import PageShareButton from '@/components/share/PageShareButton';
import PageTopUtilityRow from '@/components/share/PageTopUtilityRow';
import { Button } from '@/components/ui/button';
import { getSpeakingEventPath, type SpeakingEventContent } from '@/data/speakingEvents';
import { buildMetaDescription, buildSeoTitle, getCanonicalUrl } from '@/lib/seo';
import { buildArticleJsonLd, buildOrganizationJsonLd } from '@/lib/structuredData';

interface SpeakingEventDetailProps {
  event: SpeakingEventContent;
}

const SpeakingEventDetail = ({ event }: SpeakingEventDetailProps) => {
  const canonicalPath = getSpeakingEventPath(event.slug);
  const canonicalUrl = getCanonicalUrl(canonicalPath);
  const articleJsonLd =
    canonicalUrl &&
    buildArticleJsonLd({
      title: buildSeoTitle(event.title),
      description: buildMetaDescription(event.seoDescription, event.summary),
      canonicalUrl,
    });

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal/10 via-white to-coral/5 py-12">
      <Seo
        title={event.title}
        description={event.seoDescription}
        canonicalPath={canonicalPath}
        canonicalUrl={canonicalUrl}
        ogType="article"
        jsonLd={[buildOrganizationJsonLd(), ...(articleJsonLd ? [articleJsonLd] : [])]}
      />

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <section className="rounded-[2rem] border border-teal/20 bg-white/90 px-6 py-8 shadow-sm md:px-10 md:py-12">
            <Link href="/speaking-events" className="inline-flex items-center gap-2 text-sm font-medium text-teal hover:underline">
              <ArrowLeft className="h-4 w-4" />
              Back to speaking events
            </Link>

            <PageTopUtilityRow className="mt-6">
              <PageShareButton />
            </PageTopUtilityRow>

            <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-coral/20 bg-coral/10 px-4 py-2 text-sm font-semibold text-coral">
                  <Mic2 className="h-4 w-4" />
                  {event.label}
                </div>

                <div className="space-y-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.32em] text-teal">Speaking Event</p>
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">{event.title}</h1>
                  <p className="max-w-3xl text-lg leading-relaxed text-gray-700">{event.summary}</p>
                </div>
              </div>

              <div className="rounded-[2rem] border border-teal/20 bg-gradient-to-br from-teal/10 via-white to-coral/10 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal">Quick facts</p>
                <div className="mt-5 space-y-4 text-gray-700">
                  <div className="flex items-start gap-3">
                    <CalendarDays className="mt-0.5 h-5 w-5 text-coral" />
                    <div>
                      <p className="font-semibold text-gray-900">Date</p>
                      <p>{event.dateLabel}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 text-coral" />
                    <div>
                      <p className="font-semibold text-gray-900">Location</p>
                      <p>{event.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <UserRound className="mt-0.5 h-5 w-5 text-coral" />
                    <div>
                      <p className="font-semibold text-gray-900">Host</p>
                      <p>{event.host}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-white/80 bg-white/85 p-4 text-sm leading-relaxed text-gray-700">
                  {event.spotlight}
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
            <div className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-coral">Event story</p>
              <h2 className="mt-3 text-3xl font-bold text-gray-900">Why this first talk mattered</h2>
              <div className="mt-5 space-y-4 text-gray-700 leading-relaxed">
                {event.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <p>{event.audienceResponse}</p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-teal/20 bg-teal/5 p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal">What Suz shared</p>
              <h2 className="mt-3 text-3xl font-bold text-gray-900">Ideas that shaped the room</h2>
              <div className="mt-6 space-y-4">
                {event.highlights.map((highlight) => (
                  <div key={highlight.title} className="rounded-2xl border border-white bg-white p-5 shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-900">{highlight.title}</h3>
                    <p className="mt-3 leading-relaxed text-gray-700">{highlight.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="rounded-[2rem] border border-coral/20 bg-coral/5 p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-coral">Audience takeaways</p>
              <h2 className="mt-3 text-3xl font-bold text-gray-900">What this event pointed toward</h2>
              <div className="mt-6 space-y-4">
                {event.takeaways.map((takeaway, index) => (
                  <div key={takeaway} className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal text-sm font-bold text-white">
                      {index + 1}
                    </div>
                    <p className="leading-relaxed text-gray-700">{takeaway}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 leading-relaxed text-gray-700">{event.nextChapter}</p>
            </div>

            <div className="space-y-6">
              {event.videoPreview ? (
                <div className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-sm">
                  <div className="flex items-center gap-3 text-coral">
                    <PlayCircle className="h-5 w-5" />
                    <p className="text-sm font-semibold uppercase tracking-[0.3em]">Video preview</p>
                  </div>
                  <h2 className="mt-3 text-3xl font-bold text-gray-900">{event.videoPreview.title}</h2>
                  <p className="mt-4 leading-relaxed text-gray-700">{event.videoPreview.description}</p>
                  <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-black shadow-sm">
                    <video
                      className="aspect-video h-full w-full"
                      controls
                      playsInline
                      preload="metadata"
                    >
                      <source src={event.videoPreview.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              ) : null}

              <div className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-sm">
                <div className="flex items-center gap-3 text-teal">
                  <Presentation className="h-5 w-5" />
                  <p className="text-sm font-semibold uppercase tracking-[0.3em]">Slide deck</p>
                </div>
                <h2 className="mt-3 text-3xl font-bold text-gray-900">Presentation materials</h2>

                {event.slideDeck.status === 'ready' && event.slideDeck.embedUrl ? (
                  <div className="mt-6 space-y-4">
                    <div className="flex flex-col gap-3 sm:flex-row">
                      {event.slideDeck.downloadUrl ? (
                        <Button asChild className="bg-teal text-white hover:bg-teal-dark">
                          <a href={event.slideDeck.downloadUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                            Open slides in a new tab
                          </a>
                        </Button>
                      ) : null}
                      {event.slideDeck.downloadUrl ? (
                        <Button asChild variant="outline" className="border-teal/30 text-teal hover:bg-teal/5">
                          <a href={event.slideDeck.downloadUrl} download>
                            <Download className="h-4 w-4" />
                            Download PDF
                          </a>
                        </Button>
                      ) : null}
                    </div>
                    <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-gray-200 bg-white">
                      <iframe
                        src={event.slideDeck.embedUrl}
                        title={`${event.title} slide deck`}
                        className="h-full w-full"
                      />
                    </div>
                    <p className="text-sm leading-relaxed text-gray-600">{event.slideDeck.note}</p>
                  </div>
                ) : (
                  <div className="mt-6 rounded-[1.75rem] border border-dashed border-teal/30 bg-teal/5 p-8">
                    <p className="text-lg font-semibold text-gray-900">Slides coming soon</p>
                    <p className="mt-3 leading-relaxed text-gray-700">{event.slideDeck.note}</p>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <Button asChild className="bg-teal text-white hover:bg-teal-dark">
                        <Link href="/contact">Ask about future speaking events</Link>
                      </Button>
                      <Button asChild variant="outline" className="border-teal/30 text-teal hover:bg-teal/5">
                        <Link href="/dr-seuss">
                          Read the Dr. Seuss reflection
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>

      <ConnectCTA />
    </div>
  );
};

export default SpeakingEventDetail;
