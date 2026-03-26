'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, HeartPulse, Laugh, Sparkles, Users } from 'lucide-react';

import ConnectCTA from '@/components/common/ConnectCTA';
import Seo from '@/components/seo/Seo';
import PageShareButton from '@/components/share/PageShareButton';
import PageTopUtilityRow from '@/components/share/PageTopUtilityRow';
import { Button } from '@/components/ui/button';
import { getSeoRouteByPath } from '@/data/seoRoutes';
import { getSpeakingEventPath } from '@/data/speakingEvents';
import { buildMetaDescription, buildSeoTitle, getCanonicalUrl } from '@/lib/seo';
import { FACEBOOK_GROUP_URL, handleFacebookGroupNavigation } from '@/lib/facebook';
import { buildArticleJsonLd, buildOrganizationJsonLd } from '@/lib/structuredData';

const themes = [
  {
    title: 'Aging and loss of control',
    icon: HeartPulse,
    description:
      'The book captures the disorienting feeling of being moved from room to room, told where to sit, what to wear, and what happens next. That emotional truth is deeply familiar to many older adults.',
  },
  {
    title: 'The absurdity of the system',
    icon: BookOpen,
    description:
      'Its ridiculous machines and specialist parade make a sharp point: healthcare can feel impersonal, bureaucratic, and strangely theatrical when you are the one inside the process.',
  },
  {
    title: 'Humor as a survival skill',
    icon: Laugh,
    description:
      'Dr. Seuss turns fear and indignity into comedy without pretending the experience is easy. The laughter does not erase the challenge; it makes the challenge more bearable.',
  },
  {
    title: 'Resilience without denial',
    icon: Sparkles,
    description:
      'The heart of the story is not pretending everything is perfect. It is facing the reality of aging while refusing to let it swallow your spirit, your wit, or your sense of self.',
  },
];

const rebelliousConnections = [
  {
    title: 'Rebellious aging tells the truth',
    description:
      'We do not need sugar-coated stories about getting older. We can name what feels scary, frustrating, inconvenient, or unfair and still remain hopeful.',
  },
  {
    title: 'Humor restores dignity',
    description:
      'Suz loves this book because it gives people permission to laugh at the very systems that can make them feel small. That laughter creates breathing room and brings humanity back into the room.',
  },
  {
    title: 'You are more than a case file',
    description:
      'Rebellious Aging insists that women are not problems to solve. We are full human beings with history, style, intelligence, preferences, and agency.',
  },
  {
    title: 'Spirit matters as much as statistics',
    description:
      'Health journeys involve numbers, scans, tests, and appointments, but they also involve courage, community, and mindset. That is exactly where Suz likes to begin the conversation.',
  },
];

const takeaways = [
  'Aging can feel confusing, vulnerable, and undignified at times, but that does not mean you are broken or alone.',
  'It is reasonable to feel skeptical of systems that treat people like moving pieces on a conveyor belt.',
  'Humor is not avoidance. It can be one of the strongest ways to keep your footing when life feels heavy.',
  'Acceptance is not surrender. You can acknowledge limits and still live with boldness, curiosity, and self-respect.',
];

const futureThreads = [
  'How literature helps us laugh at what medicine cannot always fix.',
  'What it means to keep your identity while navigating tests, diagnoses, and aging bodies.',
  'Why communities like Rebellious Aging make hard experiences feel less isolating.',
];

const DrSeussPage = () => {
  const seoConfig = getSeoRouteByPath('/dr-seuss');
  const canonicalUrl = seoConfig ? getCanonicalUrl(seoConfig.path) : undefined;
  const articleJsonLd =
    seoConfig && canonicalUrl
      ? buildArticleJsonLd({
          title: buildSeoTitle(seoConfig.title),
          description: buildMetaDescription(seoConfig.description),
          canonicalUrl,
        })
      : undefined;

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal/10 via-white to-coral/5 py-12">
      {seoConfig && (
        <Seo
          title={seoConfig.title}
          description={seoConfig.description}
          canonicalPath={seoConfig.path}
          canonicalUrl={canonicalUrl}
          ogType="article"
          jsonLd={[buildOrganizationJsonLd(), ...(articleJsonLd ? [articleJsonLd] : [])]}
        />
      )}

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <section className="rounded-[2rem] border border-teal/20 bg-white/90 px-6 py-8 shadow-sm md:px-10 md:py-12">
            <PageTopUtilityRow>
              <PageShareButton />
            </PageTopUtilityRow>

            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-coral/20 bg-coral/10 px-4 py-2 text-sm font-semibold text-coral">
                  <BookOpen className="h-4 w-4" />
                  Suz's literary spark
                </div>

                <div className="space-y-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.32em] text-teal">
                    Dr. Seuss and Rebellious Aging
                  </p>
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
                    Why "You're Only Old Once!" fits the Rebellious Aging spirit so well
                  </h1>
                  <p className="max-w-3xl text-lg leading-relaxed text-gray-700">
                    Suz often returns to Dr. Seuss when she wants to say something honest, funny, and deeply human about growing
                    older. Of all his books, "You're Only Old Once!" has become one of her favorites to share because it names the
                    absurdity of aging without stripping away dignity, humor, or hope.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild className="bg-teal text-white hover:bg-teal-dark">
                    <a
                      href={FACEBOOK_GROUP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleFacebookGroupNavigation}
                    >
                      Join the Conversation
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="border-teal/30 text-teal hover:bg-teal/5">
                    <Link href="/our-story">Read Suz's Story</Link>
                  </Button>
                </div>
              </div>

              <div className="rounded-[2rem] border border-teal/20 bg-gradient-to-br from-teal/10 via-white to-coral/10 p-6 shadow-inner">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal">The line Suz keeps returning to</p>
                <blockquote className="mt-4 text-2xl font-bold leading-tight text-gray-900 md:text-3xl">
                  "You're in pretty good shape, for the shape you are in."
                </blockquote>
                <p className="mt-4 text-base leading-relaxed text-gray-700">
                  That is the page's quiet rebel mantra: be honest about reality, but do not hand over your identity, humor, or
                  self-worth to it.
                </p>
                <div className="mt-6 rounded-2xl border border-white/80 bg-white/80 p-4 text-sm leading-relaxed text-gray-700">
                  <p className="font-semibold text-gray-900">What Suz loves about it</p>
                  <p className="mt-2">
                    It lets older adults laugh at an experience that can otherwise feel lonely, clinical, and out of their control.
                    That blend of truth and levity is pure Rebellious Aging.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-coral">Why it landed in Santa Cruz</p>
              <h2 className="mt-3 text-3xl font-bold text-gray-900">A first in-person event that really connected</h2>
              <div className="mt-5 space-y-4 text-gray-700 leading-relaxed">
                <p>
                  This book became one of the major talking points at Rebellious Aging's first in-person event in Santa Cruz. Suz
                  presented the Rebellious Aging vision, then read the book aloud to the audience, and it was a huge hit.
                </p>
                <p>
                  People recognized themselves in it immediately: the waiting rooms, the medical jargon, the strange mix of worry and
                  comedy, and the relief of hearing someone talk about aging in a way that felt honest rather than patronizing.
                </p>
                <p>
                  That reaction matters. It showed that this community is hungry for conversations that are realistic, emotionally
                  intelligent, and still full of spark.
                </p>
                <p>
                  There is now a dedicated recap of that gathering on the{' '}
                  <Link
                    href={getSpeakingEventPath('eat-for-the-earth-santa-cruz')}
                    className="font-semibold text-teal hover:underline"
                  >
                    Eat for the Earth event page
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-teal/20 bg-teal/5 p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal">A page for obsolete children</p>
              <h2 className="mt-3 text-3xl font-bold text-gray-900">Themes that speak directly to rebellious agers</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {themes.map((theme) => {
                  const Icon = theme.icon;

                  return (
                    <div key={theme.title} className="rounded-2xl border border-white bg-white p-5 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-coral/10 p-2 text-coral">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">{theme.title}</h3>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-gray-700">{theme.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-sm md:p-10">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal">Where the book meets the mission</p>
              <h2 className="mt-3 text-3xl font-bold text-gray-900">What Rebellious Aging sees in these pages</h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-700">
                Rebellious Aging is not about pretending bodies never change. It is about refusing to be reduced by those changes.
                Dr. Seuss captures that beautifully by making room for frustration, absurdity, and resilience all at once.
              </p>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {rebelliousConnections.map((item) => (
                <div key={item.title} className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                  <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="rounded-[2rem] border border-coral/20 bg-coral/5 p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-coral">Main takeaways</p>
              <h2 className="mt-3 text-3xl font-bold text-gray-900">What this story gives older readers</h2>
              <div className="mt-6 space-y-4">
                {takeaways.map((takeaway, index) => (
                  <div key={takeaway} className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal text-sm font-bold text-white">
                      {index + 1}
                    </div>
                    <p className="leading-relaxed text-gray-700">{takeaway}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-teal/20 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3 text-teal">
                <Users className="h-5 w-5" />
                <p className="text-sm font-semibold uppercase tracking-[0.3em]">More conversations to come</p>
              </div>
              <h2 className="mt-3 text-3xl font-bold text-gray-900">Suz wants to keep sharing this wisdom</h2>
              <p className="mt-4 leading-relaxed text-gray-700">
                The Santa Cruz response made one thing clear: Dr. Seuss still has a lot to teach adults about resilience, identity,
                medicine, and humor. Suz is excited to keep returning to these themes in future gatherings.
              </p>
              <ul className="mt-6 space-y-3">
                {futureThreads.map((thread) => (
                  <li key={thread} className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700">
                    <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
                    <span>{thread}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-2xl border border-teal/20 bg-teal/5 p-5 text-sm leading-relaxed text-gray-700">
                This page shares Suz's reflections on Dr. Seuss's work in the spirit of literary appreciation. Rebellious Aging is not
                affiliated with Dr. Seuss Enterprises.
              </div>
            </div>
          </section>
        </div>
      </div>

      <ConnectCTA />
    </div>
  );
};

export default DrSeussPage;
