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

const wfpbConnections = [
  {
    title: 'Food as upstream care',
    description:
      'The book is hilarious because it drops us into the middle of the medical conveyor belt, when everyone else seems to be in charge. Rebellious Aging talks so much about WFPB because it asks an earlier question: what daily choices help you stay stronger, clearer, and more able to live as yourself before the system starts dictating the script?',
  },
  {
    title: 'More agency, less avoidable decline',
    description:
      'No one gets a guaranteed pass from aging, doctors, tests, or diagnosis. But shifting toward whole, minimally processed plant foods can support blood pressure, cholesterol, energy, mobility, and quality of life so fewer years are shaped by preventable suffering and passive resignation.',
  },
  {
    title: 'Not anti-doctor. Pro-participation.',
    description:
      'Suz is not arguing that food replaces medicine or that nobody ever needs care. She is arguing for showing up as an active participant in your future. WFPB living is one of the clearest ways this site pushes back against the absurd, reactive medical maze that Dr. Seuss so brilliantly skewers.',
  },
] as const;

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

const drSeussImages = {
  cover: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1774622570/dr-seuss_tt5y37.jpg',
  catInTheHat: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1774622571/cat-n-hat_cjn9sw.webp',
  library: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1774622570/dr-s_hquwyt.avif',
} as const;

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
    <div className="min-h-screen bg-[linear-gradient(180deg,rgba(240,253,250,0.85)_0%,rgba(255,255,255,1)_30%,rgba(255,247,237,0.9)_100%)]">
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

      <section className="relative overflow-hidden border-b border-teal/10 bg-[#f7f1e6]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.12),transparent_38%),radial-gradient(circle_at_80%_20%,rgba(251,146,60,0.14),transparent_34%)]" />
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl pb-10 pt-24 md:pb-12 md:pt-28 lg:pb-16 lg:pt-32">
            <PageTopUtilityRow>
              <PageShareButton />
            </PageTopUtilityRow>

            <div className="mt-5 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-coral/25 bg-white/75 px-4 py-2 text-sm font-semibold text-coral shadow-sm backdrop-blur-sm">
                  <BookOpen className="h-4 w-4" />
                  Suz's literary spark
                </div>

                <div className="space-y-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.32em] text-teal">
                    Dr. Seuss and Rebellious Aging
                  </p>
                  <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                    Why "You're Only Old Once!" feels like a rebel handbook for getting older
                  </h1>
                  <p className="max-w-2xl text-lg leading-relaxed text-gray-700 md:text-xl">
                    Suz keeps returning to Dr. Seuss because he can tell the truth without draining the joy out of it. This book
                    names the absurdity of aging, the strangeness of healthcare, and the stubborn spark that still refuses to go
                    quiet.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                  <span className="rounded-full border border-gray-300/80 bg-white/70 px-3 py-1.5">Humor with bite</span>
                  <span className="rounded-full border border-gray-300/80 bg-white/70 px-3 py-1.5">Healthcare satire</span>
                  <span className="rounded-full border border-gray-300/80 bg-white/70 px-3 py-1.5">Resilience with personality</span>
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

              <div className="group relative z-10 sm:pb-20 lg:pb-8">
                <div className="ml-auto w-full max-w-[44rem] overflow-hidden rounded-[2.5rem] border border-white/80 bg-white shadow-[0_30px_80px_-30px_rgba(15,23,42,0.35)]">
                  <img
                    src={drSeussImages.library}
                    alt="A lineup of colorful Dr. Seuss book covers."
                    className="aspect-[1080/622] w-full object-cover object-center transition duration-700 ease-out group-hover:scale-[1.03]"
                    loading="eager"
                    decoding="async"
                  />
                </div>

                <div className="mt-4 w-44 sm:absolute sm:-bottom-8 sm:left-0 sm:mt-0 sm:w-[42%] sm:min-w-[170px] sm:max-w-[250px]">
                  <div className="rounded-[2rem] border border-white/85 bg-white p-3 shadow-[0_30px_60px_-32px_rgba(15,23,42,0.45)] transition duration-500 ease-out group-hover:-translate-y-1 group-hover:-rotate-2">
                    <img
                      src={drSeussImages.cover}
                      alt='Book cover of Dr. Seuss&apos;s "You&apos;re Only Old Once!".'
                      className="aspect-[462/630] w-full rounded-[1.4rem] object-cover"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                </div>

                <div className="mt-6 sm:ml-auto sm:max-w-xs lg:absolute lg:bottom-10 lg:right-0 lg:mt-0">
                  <div className="rounded-[1.75rem] border border-coral/20 bg-white/95 p-5 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.45)] backdrop-blur-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal">
                      The line Suz keeps returning to
                    </p>
                    <blockquote className="mt-3 text-xl font-bold leading-tight text-gray-900 md:text-2xl">
                      "You're in pretty good shape, for the shape you are in."
                    </blockquote>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">
                      Honest about reality, funny on purpose, and still fiercely alive. That balance is pure Rebellious Aging.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl py-14 md:py-18 lg:py-20">
          <section className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div className="space-y-8">
              <div className="overflow-hidden rounded-[2.25rem] border border-coral/15 bg-[#fff7f2] p-3 shadow-[0_20px_50px_-38px_rgba(15,23,42,0.35)]">
                <img
                  src={drSeussImages.catInTheHat}
                  alt="Illustration of the Cat in the Hat with Thing 1 and Thing 2."
                  className="aspect-[734/1079] w-full rounded-[1.6rem] object-cover object-center transition duration-700 ease-out hover:scale-[1.02]"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="space-y-5">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-coral">Why it landed in Santa Cruz</p>
                <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                  A first in-person event that felt instantly familiar
                </h2>
                <div className="space-y-4 leading-relaxed text-gray-700">
                  <p>
                    This book became one of the major talking points at Rebellious Aging&apos;s first in-person event in Santa Cruz.
                    Suz presented the Rebellious Aging vision, then read the book aloud to the audience, and it was a huge hit.
                  </p>
                  <p>
                    People recognized themselves in it immediately: the waiting rooms, the medical jargon, the strange mix of worry
                    and comedy, and the relief of hearing someone talk about aging in a way that felt honest rather than patronizing.
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
            </div>

            <div className="lg:border-l lg:border-gray-200 lg:pl-10">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal">A page for obsolete children</p>
              <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
                Themes that speak directly to rebellious agers
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-700">
                The book works because it never asks people to choose between honesty and hope. It lets frustration, absurdity, and
                resilience coexist on the same page.
              </p>

              <div className="mt-8 border-y border-gray-200">
                {themes.map((theme) => {
                  const Icon = theme.icon;

                  return (
                    <div key={theme.title} className="grid gap-4 border-b border-gray-200 py-6 last:border-b-0 sm:grid-cols-[auto_1fr] sm:gap-5">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-coral/10 text-coral">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{theme.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-gray-700 md:text-base">{theme.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="mt-14 rounded-[2.25rem] border border-teal/10 bg-teal/5 px-6 py-8 shadow-sm md:mt-16 md:px-8 md:py-10 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr]">
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal">Where the book meets the mission</p>
                  <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
                    What Rebellious Aging sees in these pages
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-gray-700">
                    Rebellious Aging is not about pretending bodies never change. It is about refusing to be reduced by those
                    changes. Dr. Seuss captures that beautifully by making room for frustration, absurdity, and resilience all at
                    once.
                  </p>
                </div>

                <div className="rounded-[1.75rem] border border-white/80 bg-white/85 p-5 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-coral">What Suz loves about it</p>
                  <p className="mt-3 leading-relaxed text-gray-700">
                    It lets older adults laugh at an experience that can otherwise feel lonely, clinical, and out of their control.
                    That blend of truth and levity is pure Rebellious Aging.
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 shadow-sm backdrop-blur-sm">
                {rebelliousConnections.map((item, index) => (
                  <div
                    key={item.title}
                    className={`px-6 py-6 md:px-7 ${index < rebelliousConnections.length - 1 ? 'border-b border-gray-200' : ''}`}
                  >
                    <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                    <p className="mt-3 leading-relaxed text-gray-700">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-14 rounded-[2.25rem] border border-coral/15 bg-[#fff7f2] px-6 py-8 shadow-sm md:mt-16 md:px-8 md:py-10 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-coral">The WFPB connection</p>
                  <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
                    How WFPB answers the Dr. Seuss problem
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-gray-700">
                    <span className="font-semibold text-gray-900">You&apos;re Only Old Once!</span> is such a sharp satire because it
                    captures what it feels like to be shuffled through a reactive system after things have already gone sideways.
                    The nutrition pillar across this website exists to push in the other direction: toward prevention, participation,
                    and enough daily agency to avoid getting trapped in as much avoidable chaos as possible.
                  </p>
                </div>

                <div className="rounded-[1.75rem] border border-white/80 bg-white/90 p-5 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">Why this matters here</p>
                  <p className="mt-3 leading-relaxed text-gray-700">
                    Suz&apos;s point is not that food makes you invincible. It is that a rebellious life includes doing what you can, while
                    you can, to protect your heart, your energy, your independence, and your right to keep being fully yourself.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild className="bg-teal text-white hover:bg-teal-dark">
                    <Link href="/nutrition">Explore WFPB basics</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-teal/30 text-teal hover:bg-teal/5">
                    <Link href="/pillars/health/nutrition-guide">Read the Nutrition Guide</Link>
                  </Button>
                </div>
              </div>

              <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 shadow-sm">
                {wfpbConnections.map((item, index) => (
                  <div
                    key={item.title}
                    className={`px-6 py-6 md:px-7 ${index < wfpbConnections.length - 1 ? 'border-b border-gray-200' : ''}`}
                  >
                    <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                    <p className="mt-3 leading-relaxed text-gray-700">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-14 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-coral">Main takeaways</p>
              <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">What this story gives older readers</h2>

              <div className="mt-8 border-t border-gray-200">
                {takeaways.map((takeaway, index) => (
                  <div
                    key={takeaway}
                    className="grid gap-3 border-b border-gray-200 py-5 sm:grid-cols-[80px_1fr] sm:gap-6"
                  >
                    <div className="text-4xl font-bold tracking-tight text-teal/20 md:text-5xl">{index + 1}</div>
                    <p className="leading-relaxed text-gray-700 md:text-lg">{takeaway}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-sm">
                <div className="flex items-center gap-3 text-teal">
                  <Users className="h-5 w-5" />
                  <p className="text-sm font-semibold uppercase tracking-[0.3em]">More conversations to come</p>
                </div>
                <h2 className="mt-3 text-3xl font-bold text-gray-900">Suz wants to keep sharing this wisdom</h2>
                <p className="mt-4 leading-relaxed text-gray-700">
                  The Santa Cruz response made one thing clear: Dr. Seuss still has a lot to teach adults about resilience,
                  identity, medicine, and humor. Suz is excited to keep returning to these themes in future gatherings.
                </p>
                <ul className="mt-6 space-y-4">
                  {futureThreads.map((thread) => (
                    <li key={thread} className="flex items-start gap-3 border-b border-gray-200 pb-4 text-gray-700 last:border-b-0 last:pb-0">
                      <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
                      <span>{thread}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[2rem] border border-coral/20 bg-[#fff7f2] p-7 shadow-sm">
                <p className="text-sm leading-relaxed text-gray-700">
                  This page shares Suz&apos;s reflections on Dr. Seuss&apos;s work in the spirit of literary appreciation.
                  Rebellious Aging is not affiliated with Dr. Seuss Enterprises.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button asChild className="bg-teal text-white hover:bg-teal-dark">
                    <Link href={getSpeakingEventPath('eat-for-the-earth-santa-cruz')}>Read the event recap</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-teal/30 text-teal hover:bg-teal/5">
                    <a
                      href={FACEBOOK_GROUP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleFacebookGroupNavigation}
                    >
                      Keep the conversation going
                    </a>
                  </Button>
                </div>
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
