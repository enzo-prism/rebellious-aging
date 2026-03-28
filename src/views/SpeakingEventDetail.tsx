import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CalendarDays, Download, ExternalLink, Images, MapPin, Mic2, PlayCircle, Presentation, UserRound } from 'lucide-react';

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
  const gallery = event.gallery ?? [];
  const heroImage = gallery.find((image) => image.layout === 'featured') ?? gallery[0];
  const galleryImages = heroImage ? gallery.filter((image) => image.src !== heroImage.src) : gallery;
  const articleJsonLd =
    canonicalUrl &&
    buildArticleJsonLd({
      title: buildSeoTitle(event.title),
      description: buildMetaDescription(event.seoDescription, event.summary),
      canonicalUrl,
    });

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,rgba(240,253,250,0.85)_0%,rgba(255,255,255,1)_28%,rgba(255,247,237,0.92)_100%)]">
      <Seo
        title={event.title}
        description={event.seoDescription}
        canonicalPath={canonicalPath}
        canonicalUrl={canonicalUrl}
        ogType="article"
        jsonLd={[buildOrganizationJsonLd(), ...(articleJsonLd ? [articleJsonLd] : [])]}
      />

      <section className="relative overflow-hidden border-b border-teal/10 bg-[#f8f3ea]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.12),transparent_36%),radial-gradient(circle_at_80%_20%,rgba(251,146,60,0.14),transparent_34%)]" />
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl pb-10 pt-24 md:pb-12 md:pt-28 lg:pb-16 lg:pt-32">
            <Link href="/speaking-events" className="inline-flex items-center gap-2 text-sm font-medium text-teal hover:underline">
              <ArrowLeft className="h-4 w-4" />
              Back to speaking events
            </Link>

            <PageTopUtilityRow className="mt-6">
              <PageShareButton />
            </PageTopUtilityRow>

            <div className="mt-6 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-coral/20 bg-white/75 px-4 py-2 text-sm font-semibold text-coral shadow-sm backdrop-blur-sm">
                  <Mic2 className="h-4 w-4" />
                  {event.label}
                </div>

                <div className="space-y-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.32em] text-teal">Speaking Event</p>
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">{event.title}</h1>
                  <p className="max-w-2xl text-lg leading-relaxed text-gray-700 md:text-xl">{event.summary}</p>
                </div>

                <div className="grid gap-3 text-sm text-gray-700 sm:grid-cols-3">
                  <div className="rounded-2xl border border-gray-200/80 bg-white/80 px-4 py-3 shadow-sm">
                    <p className="font-semibold text-gray-900">Date</p>
                    <p className="mt-1">{event.dateLabel}</p>
                  </div>
                  <div className="rounded-2xl border border-gray-200/80 bg-white/80 px-4 py-3 shadow-sm">
                    <p className="font-semibold text-gray-900">Location</p>
                    <p className="mt-1">{event.location}</p>
                  </div>
                  <div className="rounded-2xl border border-gray-200/80 bg-white/80 px-4 py-3 shadow-sm">
                    <p className="font-semibold text-gray-900">Host</p>
                    <p className="mt-1">{event.host}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  {gallery.length > 0 ? (
                    <Button asChild className="bg-teal text-white hover:bg-teal-dark">
                      <a href="#event-gallery">View photo gallery</a>
                    </Button>
                  ) : null}
                  {event.slideDeck.status === 'ready' && event.slideDeck.downloadUrl ? (
                    <Button asChild variant="outline" className="border-teal/30 text-teal hover:bg-teal/5">
                      <a href={event.slideDeck.downloadUrl} target="_blank" rel="noopener noreferrer">
                        Open slides
                      </a>
                    </Button>
                  ) : (
                    <Button asChild variant="outline" className="border-teal/30 text-teal hover:bg-teal/5">
                      <Link href="/contact">Ask about future speaking events</Link>
                    </Button>
                  )}
                </div>
              </div>

              <div className="group relative sm:pb-24 lg:pb-20">
                {heroImage ? (
                  <div className="overflow-hidden rounded-[2.5rem] border border-white/80 bg-white shadow-[0_30px_80px_-30px_rgba(15,23,42,0.35)]">
                    <img
                      src={heroImage.src}
                      alt={heroImage.alt}
                      className="aspect-[16/10] w-full object-cover object-center transition duration-700 ease-out group-hover:scale-[1.03]"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                ) : (
                  <div className="rounded-[2.5rem] border border-teal/20 bg-white/90 p-6 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.35)]">
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
                  </div>
                )}

                <div className="mt-6 sm:absolute sm:-bottom-10 sm:right-6 sm:mt-0 sm:max-w-md">
                  <div className="rounded-[1.75rem] border border-white/80 bg-white/95 p-5 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.45)] backdrop-blur-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal">Spotlight moment</p>
                    <p className="mt-3 text-sm leading-relaxed text-gray-700 md:text-base">{event.spotlight}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl py-14 md:py-16 lg:py-20">
          <section className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-coral">Event story</p>
                <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">Why this first talk mattered</h2>
              </div>

              <div className="space-y-4 leading-relaxed text-gray-700">
                {event.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <p>{event.audienceResponse}</p>
              </div>

              <div className="rounded-[1.75rem] border border-coral/15 bg-[#fff7f2] p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-coral">What the audience felt</p>
                <p className="mt-3 leading-relaxed text-gray-700">
                  The strongest response came from the mix of practical hope and shared laughter. The room didn&apos;t just hear ideas;
                  it recognized itself in them.
                </p>
              </div>
            </div>

            <div className="lg:border-l lg:border-gray-200 lg:pl-10">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal">What Suz shared</p>
              <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">Ideas that shaped the room</h2>
              <div className="mt-8 border-y border-gray-200">
                {event.highlights.map((highlight) => (
                  <div key={highlight.title} className="grid gap-3 border-b border-gray-200 py-6 last:border-b-0 sm:grid-cols-[20px_1fr] sm:gap-5">
                    <div className="mt-2 h-2.5 w-2.5 rounded-full bg-coral" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{highlight.title}</h3>
                      <p className="mt-3 leading-relaxed text-gray-700">{highlight.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {galleryImages.length > 0 ? (
            <section id="event-gallery" className="mt-16">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <div className="flex items-center gap-3 text-teal">
                    <Images className="h-5 w-5" />
                    <p className="text-sm font-semibold uppercase tracking-[0.3em]">Event gallery</p>
                  </div>
                  <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">Scenes from Santa Cruz</h2>
                </div>
                <p className="max-w-2xl leading-relaxed text-gray-700">
                  These moments show the room, the setup, the audience, and the playful Dr. Seuss touches that made the first
                  Rebellious Aging speaking event feel warm, grounded, and memorable.
                </p>
              </div>

              <div className="mt-8 columns-1 gap-4 md:columns-2 xl:columns-3">
                {galleryImages.map((image) => (
                  <figure key={image.src} className="group mb-4 break-inside-avoid">
                    <div className="overflow-hidden rounded-[1.75rem] border border-white/80 bg-white shadow-[0_20px_50px_-38px_rgba(15,23,42,0.35)]">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full object-cover object-center transition duration-700 ease-out group-hover:scale-[1.03]"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <figcaption className="px-1 pt-3 text-sm leading-relaxed text-gray-600">{image.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          ) : null}

          {event.connectionSection ? (
            <section className="mt-16 rounded-[2.25rem] border border-teal/10 bg-[linear-gradient(135deg,rgba(20,184,166,0.08),rgba(255,247,237,0.92))] px-6 py-8 shadow-sm md:px-8 md:py-10 lg:px-10">
              <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal">{event.connectionSection.eyebrow}</p>
                    <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">{event.connectionSection.title}</h2>
                  </div>

                  <div className="space-y-4 leading-relaxed text-gray-700">
                    {event.connectionSection.intro.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="rounded-[1.75rem] border border-white/80 bg-white/90 p-6 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-coral">Why it matters here</p>
                    <p className="mt-3 leading-relaxed text-gray-700">{event.connectionSection.closing}</p>
                  </div>

                  {event.connectionSection.links?.length ? (
                    <div className="flex flex-col gap-3 sm:flex-row">
                      {event.connectionSection.links.map((link, index) => (
                        <Button
                          key={link.href}
                          asChild
                          variant={index === 0 ? 'default' : 'outline'}
                          className={
                            index === 0
                              ? 'bg-teal text-white hover:bg-teal-dark'
                              : 'border-teal/30 text-teal hover:bg-teal/5'
                          }
                        >
                          <Link href={link.href}>
                            {link.label}
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 shadow-sm backdrop-blur-sm">
                  {event.connectionSection.cards.map((card, index) => (
                    <div
                      key={card.title}
                      className={`px-6 py-6 md:px-7 ${index < event.connectionSection.cards.length - 1 ? 'border-b border-gray-200' : ''}`}
                    >
                      <h3 className="text-xl font-semibold text-gray-900">{card.title}</h3>
                      <p className="mt-3 leading-relaxed text-gray-700">{card.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          <section className="mt-16 grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-coral">Audience takeaways</p>
                <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">What this event pointed toward</h2>
              </div>

              <div className="border-t border-gray-200">
                {event.takeaways.map((takeaway, index) => (
                  <div key={takeaway} className="grid gap-3 border-b border-gray-200 py-5 sm:grid-cols-[80px_1fr] sm:gap-6">
                    <div className="text-4xl font-bold tracking-tight text-teal/20 md:text-5xl">{index + 1}</div>
                    <p className="leading-relaxed text-gray-700 md:text-lg">{takeaway}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-[1.75rem] border border-teal/15 bg-teal/5 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">Next chapter</p>
                <p className="mt-3 leading-relaxed text-gray-700">{event.nextChapter}</p>
              </div>
            </div>

            <div id="event-media" className="space-y-6">
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
                    <p className="text-lg font-semibold text-gray-900">Presentation updates</p>
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
