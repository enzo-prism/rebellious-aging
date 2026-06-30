'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Carrot,
  Download,
  ExternalLink,
  Film,
  Heart,
  Leaf,
  PlayCircle,
  Quote,
  Sparkles,
  Sprout,
  Utensils,
} from 'lucide-react';

import ConnectCTA from '@/components/common/ConnectCTA';
import { FacebookGroupButton } from '@/components/common/FacebookGroupCta';
import Seo from '@/components/seo/Seo';
import PageShareButton from '@/components/share/PageShareButton';
import PageTopUtilityRow from '@/components/share/PageTopUtilityRow';
import { Button } from '@/components/ui/button';
import { getSeoRouteByPath } from '@/data/seoRoutes';
import { siteMetadata } from '@/lib/siteMetadata';
import { buildArticleJsonLd, buildOrganizationJsonLd } from '@/lib/structuredData';

const pagePath = '/the-talk';
const youtubeId = '9g79lPoQNkU';
const videoTitle =
  'Rebellious Aging: A Whole Food Plant-Based Lifestyle Before Illness Forces a Choice';
const watchUrl = `https://www.youtube.com/watch?v=${youtubeId}`;
const thumbUrl = `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`;

const whatItIsNot = [
  'Becoming invisible or fading into the background.',
  'Fighting what comes naturally or denying reality.',
  'Pretending more pills are always the answer.',
];

const whatItIs = [
  'Questioning outdated assumptions — like the idea that decline is inevitable. It is not.',
  'Choosing curiosity over fear.',
  'Choosing participation over resignation.',
];

const freeDownloads = [
  {
    eyebrow: 'Free guide · Esselstyn Family Foundation',
    title: 'Plant-Based Jumpstart Guide',
    description:
      'A practical, encouraging jump-start booklet from the Esselstyn Family Foundation — exactly the kind of "begin where you are" resource Suz points people toward.',
    href: 'https://esselstynfamilyfoundation.org/',
    buttonLabel: 'Get the free guide',
    external: true,
    icon: Sprout,
  },
  {
    eyebrow: 'Free guide · Center for Nutrition Studies',
    title: 'Living a Whole Food, Plant-Based Life',
    description:
      'A free guide from the T. Colin Campbell Center for Nutrition Studies that covers the same essentials in a slightly different voice. Great as a companion to the Esselstyn booklet.',
    href: 'https://nutritionstudies.org/whole-food-plant-based-diet-guide/',
    buttonLabel: 'Open the free guide',
    external: true,
    icon: Leaf,
  },
  {
    eyebrow: "Free download · From Suz",
    title: "Suz's Plant-Based Starter (PDF)",
    description:
      'A one-page handout from Suz with the books and documentaries she recommends, the guides above, her plant-strong poem, and the words she keeps close. Made to print and stick on your fridge.',
    href: '/resources/suz-plant-based-starter.pdf',
    buttonLabel: 'Download the PDF',
    external: false,
    icon: Download,
  },
];

const books = [
  {
    title: "For Fork's Sake",
    author: 'Rachael J. Brown (2022)',
    description:
      'An easy, warm starter book by a dear friend of Suz’s about moving a whole family to whole-food, plant-based living. The gentlest place to begin.',
    href: 'https://forforkssakebook.com/',
  },
  {
    title: 'The China Study',
    author: 'T. Colin Campbell, PhD & Thomas M. Campbell II, MD (2005)',
    description:
      'One of the most comprehensive looks at nutrition and long-term health ever conducted — a cornerstone of the whole-food, plant-based conversation.',
    href: 'https://nutritionstudies.org/the-china-study/',
  },
  {
    title: 'Whole: Rethinking the Science of Nutrition',
    author: 'T. Colin Campbell, PhD (2013)',
    description:
      'Campbell’s follow-up on why whole foods work the way they do — and why reductionist, one-nutrient-at-a-time thinking falls short.',
    href: 'https://www.simonandschuster.com/books/Whole/T-Colin-Campbell/9781939529848',
  },
  {
    title: 'Prevent and Reverse Heart Disease',
    author: 'Caldwell B. Esselstyn Jr., MD (2007)',
    description:
      'The nutrition-based approach to heart health from the surgeon behind the Esselstyn protocol — the science under the free Jumpstart guide above.',
    href: 'https://www.dresselstyn.com/site/books/',
  },
  {
    title: 'How Not to Die',
    author: 'Michael Greger, MD (2015)',
    description:
      'A readable tour of the foods shown to help prevent and reverse our most common diseases, from the doctor behind NutritionFacts.org.',
    href: 'https://nutritionfacts.org/book/how-not-to-die/',
  },
];

const documentaries = [
  {
    title: 'Forks Over Knives',
    year: '2011',
    description: 'The classic that features both Dr. Esselstyn and Dr. Campbell — the best first watch.',
    href: 'https://www.forksoverknives.com/',
  },
  {
    title: 'The Game Changers',
    year: '2019',
    description: 'Plant-based eating through the lens of strength, athletes, and performance.',
    href: 'https://gamechangersmovie.com/',
  },
  {
    title: 'What the Health',
    year: '2017',
    description: 'A look at the links between food, chronic disease, and the systems around them.',
    href: 'https://www.whatthehealthfilm.com/',
  },
];

const beginSteps = [
  {
    title: 'Add before you subtract',
    description:
      'Keep adding fruits, veggies, beans, whole grains, nuts, and seeds to your plate. The good stuff naturally crowds out the rest — no clean-out-the-pantry overhaul required.',
  },
  {
    title: 'One meal at a time',
    description:
      'One meal, one swap, one day a week. You can begin with a single curious choice and build from there.',
  },
  {
    title: 'Be intentional — think "nourish"',
    description:
      'Whenever you put something in your mouth, swap the word "eat" for the word "nourish." Watch your choices improve almost on their own.',
  },
  {
    title: 'Progress over perfection',
    description:
      'This is not about being perfect or judgy. The results are dose-responsive — the more plants, the better you feel — and progress tastes much better than perfection.',
  },
];

const poemStanzas = [
  [
    'Oh, the things that can happen — yes, truly it’s true —',
    'when plants fill your plate and you start feeding you.',
    'Not perfect, not rigid, no rule book, no fight,',
    'just small, kind choices, bite after bite.',
  ],
  [
    'Your energy rises — no crash, no regret.',
    'Your heart might whisper, “Thank you. How nice.”',
    'Your thinking gets clearer, your joints feel kinder,',
    'and inflammation quietly settles down.',
  ],
  [
    'Food becomes fuel, and joy, and a friend —',
    'something working with you, not against you.',
    'And then here’s the sneaky part: confidence grows.',
    'You realize one day, “Hey — I chose this.”',
  ],
  [
    'You’re never too late.',
    'Your next chapter might start on your very next plate.',
  ],
];

const quotes = [
  {
    text: 'Eat food. Not too much. Mostly plants.',
    attribution: 'Michael Pollan, In Defense of Food',
  },
  {
    text:
      'When you make only moderate changes, you get the worst of both worlds — deprivation without enough benefit to feel much better. But bigger, comprehensive changes can make you feel so much better, so quickly, that the choice becomes clear.',
    attribution: 'paraphrased from Dr. Dean Ornish, founder of the Preventive Medicine Research Institute',
  },
  {
    text: 'You’re off to great places. Today is your day. Your mountain is waiting, so get on your way.',
    attribution: 'Dr. Seuss, Oh, the Places You’ll Go!',
  },
];

const crossLinks = [
  {
    title: 'Dr. Seuss & Rebellious Aging',
    description: 'The book that sparked this talk: You’re Only Old Once! and why it still rings true.',
    href: '/dr-seuss',
    icon: BookOpen,
  },
  {
    title: 'What is WFPB?',
    description: 'The whole-food, plant-based basics, the benefits, and the science behind them.',
    href: '/nutrition',
    icon: Leaf,
  },
  {
    title: 'The Nutrition Guide',
    description: 'A deeper, practical guide for everyday plant-strong living.',
    href: '/pillars/health/nutrition-guide',
    icon: Carrot,
  },
  {
    title: 'Recipes',
    description: 'Plant-powered meals to put what you just watched onto your plate tonight.',
    href: '/recipes',
    icon: Utensils,
  },
];

const VideoEmbed = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-black shadow-[0_30px_80px_-30px_rgba(15,23,42,0.45)]">
      <div className="relative aspect-video w-full">
        {isPlaying ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={videoTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            aria-label={`Play the video: ${videoTitle}`}
            className="group absolute inset-0 h-full w-full"
          >
            <img
              src={thumbUrl}
              alt={`Suz presenting "${videoTitle}"`}
              className="h-full w-full object-cover"
              loading="eager"
              decoding="async"
            />
            <span className="absolute inset-0 bg-black/30 transition group-hover:bg-black/20" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-teal shadow-lg transition group-hover:scale-105">
                <PlayCircle className="h-10 w-10" />
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

const TheTalk = () => {
  const seoConfig = getSeoRouteByPath(pagePath);
  const canonicalUrl = `${siteMetadata.baseUrl}${pagePath}`;
  const articleJsonLd = buildArticleJsonLd({
    title: seoConfig?.title ?? 'The Talk: Be the CEO of Your Own Health',
    description:
      seoConfig?.description ??
      'Suz’s talk on whole-food, plant-based living and rebellious aging, with free guides, recommended books, and documentaries.',
    canonicalUrl,
    image: thumbUrl,
  });
  const videoJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: videoTitle,
    description:
      'Suz reflects on Dr. Seuss’s You’re Only Old Once! and makes the case for a whole-food, plant-based lifestyle as a way to age boldly and stay well.',
    thumbnailUrl: [thumbUrl],
    uploadDate: '2026-06-30',
    contentUrl: watchUrl,
    embedUrl: `https://www.youtube-nocookie.com/embed/${youtubeId}`,
    publisher: {
      '@type': 'Organization',
      name: siteMetadata.name,
      url: siteMetadata.baseUrl,
    },
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,rgba(240,253,250,0.85)_0%,rgba(255,255,255,1)_28%,rgba(255,247,237,0.9)_100%)]">
      {seoConfig && (
        <Seo
          title={seoConfig.title}
          description={seoConfig.description}
          canonicalPath={seoConfig.path}
          canonicalUrl={canonicalUrl}
          ogType="article"
          jsonLd={[buildOrganizationJsonLd(), articleJsonLd, videoJsonLd]}
        />
      )}

      {/* Hero + video */}
      <section className="relative overflow-hidden border-b border-teal/10 bg-[#f7f1e6]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.12),transparent_40%),radial-gradient(circle_at_82%_18%,rgba(251,146,60,0.14),transparent_34%)]" />
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl pb-12 pt-24 md:pt-28 lg:pt-32">
            <PageTopUtilityRow>
              <PageShareButton />
            </PageTopUtilityRow>

            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-coral/25 bg-white/75 px-4 py-2 text-sm font-semibold text-coral shadow-sm backdrop-blur-sm">
                <PlayCircle className="h-4 w-4" />
                The Talk
              </div>
              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.32em] text-teal">
                Rebellious Aging
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                Be the CEO of your own health
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-700 md:text-xl">
                Suz on what Dr. Seuss&apos;s <span className="font-semibold text-gray-900">You&apos;re Only Old Once!</span>{' '}
                taught her about aging, the medical maze, and the quiet power of what you put on your plate — plus
                every free resource she mentions, gathered in one place.
              </p>
            </div>

            <div className="relative z-10 mx-auto mt-10 max-w-4xl">
              <VideoEmbed />
              <div className="mt-4 flex flex-col items-center justify-between gap-3 text-sm text-gray-600 sm:flex-row">
                <p className="font-medium text-gray-700">{videoTitle}</p>
                <a
                  href={watchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-teal hover:underline"
                >
                  Watch on YouTube
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            <div className="relative z-10 mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild className="bg-teal text-white hover:bg-teal-dark">
                <a href="#resources">
                  Get the free downloads
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <FacebookGroupButton variant="outline" size="md">
                Join the conversation
              </FacebookGroupButton>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl py-14 md:py-18 lg:py-20">
          {/* The story / premise */}
          <section className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-coral">Why this talk</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
              Forty years later, not much has changed
            </h2>
            <div className="mt-5 space-y-4 text-left text-lg leading-relaxed text-gray-700">
              <p>
                In 1986, at the age of 82, Dr. Seuss published an unusual book:{' '}
                <span className="font-semibold text-gray-900">You&apos;re Only Old Once!: A Book for Obsolete Children</span>
                . It was not the Cat in the Hat. It was waiting rooms, specialists, tests, procedures, pills, and bills
                &mdash; the whole bewildering experience of navigating the medical system as an older adult.
              </p>
              <p>
                Read it today and almost nothing has changed. People are still bounced from specialist to specialist,
                still testing, still collecting prescriptions, still searching for answers. So Rebellious Aging asks a
                different question:{' '}
                <span className="font-semibold text-gray-900">
                  what if we focused on staying well long before we ever reach the waiting room?
                </span>
              </p>
            </div>
          </section>

          {/* What rebellious aging is / is not */}
          <section className="mt-14 grid gap-6 lg:grid-cols-2 md:mt-16">
            <div className="rounded-[2rem] border border-gray-200 bg-white/85 p-7 shadow-sm md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gray-500">It is not</p>
              <ul className="mt-5 space-y-4">
                {whatItIsNot.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-700">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gray-300" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[2rem] border border-teal/15 bg-teal/5 p-7 shadow-sm md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-teal">It is</p>
              <ul className="mt-5 space-y-4">
                {whatItIs.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-800">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* The one simple tool */}
          <section className="mt-14 rounded-[2.25rem] border border-coral/15 bg-[#fff7f2] px-6 py-9 shadow-sm md:mt-16 md:px-10 md:py-11">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-white px-4 py-2 text-sm font-semibold text-teal">
                  <Sprout className="h-4 w-4" />
                  The one surprisingly simple tool
                </div>
                <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">It is how we feed ourselves</h2>
              </div>
              <div className="space-y-4 text-lg leading-relaxed text-gray-700">
                <p>
                  A whole-food, plant-based lifestyle focuses on foods that come from the ground &mdash; fruits,
                  vegetables, beans, whole grains, nuts, and seeds, prepared as close to their natural form as possible.
                  The real stuff, not the factory.
                </p>
                <p>
                  This is not about perfection, judgment, or deprivation. It is about nourishment. Switch the word{' '}
                  <span className="font-semibold text-gray-900">eat</span> for the word{' '}
                  <span className="font-semibold text-gray-900">nourish</span>, and watch your choices improve, your
                  energy soar, and your weight stabilize &mdash; without counting a single calorie.
                </p>
              </div>
            </div>
          </section>

          {/* FREE DOWNLOADS */}
          <section id="resources" className="mt-16 scroll-mt-24 md:mt-20">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal">As promised in the talk</p>
              <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">Free downloads to get you started</h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-700">
                Three free resources to help you begin a whole-food, plant-based life. Take what is useful, leave the
                rest, and go at your own loving pace.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {freeDownloads.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="flex flex-col rounded-[2rem] border border-gray-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-teal/40 hover:shadow-md"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal/10 text-teal">
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-coral">{item.eyebrow}</p>
                    <h3 className="mt-2 text-xl font-bold text-gray-900">{item.title}</h3>
                    <p className="mt-3 flex-1 leading-relaxed text-gray-700">{item.description}</p>
                    <Button asChild className="mt-6 bg-teal text-white hover:bg-teal-dark">
                      {item.external ? (
                        <a href={item.href} target="_blank" rel="noopener noreferrer">
                          {item.buttonLabel}
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      ) : (
                        <a href={item.href} download>
                          {item.buttonLabel}
                          <Download className="h-4 w-4" />
                        </a>
                      )}
                    </Button>
                  </article>
                );
              })}
            </div>
            <p className="mt-5 text-center text-sm text-gray-500">
              The Esselstyn and Center for Nutrition Studies guides open on their original sites. Rebellious Aging is
              sharing them, not rehosting them.
            </p>
          </section>

          {/* BOOKS */}
          <section className="mt-16 md:mt-20">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-coral">Suz&apos;s bookshelf</p>
                <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">The books that helped Suz</h2>
              </div>
              <p className="max-w-md text-gray-600">
                Start with <span className="font-semibold text-gray-800">For Fork&apos;s Sake</span> if you want the
                gentlest on-ramp; the rest go deeper when you are ready.
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {books.map((book) => (
                <article
                  key={book.title}
                  className="flex flex-col rounded-[1.75rem] border border-gray-200 bg-white p-6 shadow-sm transition hover:border-coral/40 hover:shadow-md sm:flex-row sm:items-start sm:gap-5"
                >
                  <div className="mb-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-coral/10 text-coral sm:mb-0">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <h3 className="text-lg font-bold text-gray-900">{book.title}</h3>
                    <p className="mt-1 text-sm font-medium text-teal">{book.author}</p>
                    <p className="mt-3 flex-1 leading-relaxed text-gray-700">{book.description}</p>
                    <a
                      href={book.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:underline"
                    >
                      Learn more
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* DOCUMENTARIES */}
          <section className="mt-16 md:mt-20">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal">Press play</p>
              <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">Documentaries worth watching</h2>
              <p className="mt-4 leading-relaxed text-gray-700">
                Suz didn&apos;t name titles in the talk, so here are the canonical few &mdash; the first one features
                both Dr. Esselstyn and Dr. Campbell.
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {documentaries.map((doc) => (
                <article
                  key={doc.title}
                  className="flex flex-col rounded-[1.75rem] border border-gray-200 bg-white p-6 shadow-sm transition hover:border-teal/40 hover:shadow-md"
                >
                  <div className="flex items-center gap-2 text-sm font-semibold text-coral">
                    <Film className="h-4 w-4" />
                    {doc.year}
                  </div>
                  <h3 className="mt-3 text-xl font-bold text-gray-900">{doc.title}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-gray-700">{doc.description}</p>
                  <Button asChild variant="outline" className="mt-6 border-teal text-teal hover:bg-teal hover:text-white">
                    <a href={doc.href} target="_blank" rel="noopener noreferrer">
                      Visit site
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </article>
              ))}
            </div>
          </section>

          {/* HOW TO BEGIN */}
          <section className="mt-16 rounded-[2.25rem] border border-teal/10 bg-teal/5 px-6 py-9 shadow-sm md:mt-20 md:px-10 md:py-12">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal">How to begin</p>
              <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">You can start with one curious choice</h2>
            </div>
            <div className="mt-9 grid gap-5 md:grid-cols-2">
              {beginSteps.map((step, index) => (
                <div key={step.title} className="rounded-[1.75rem] border border-white/80 bg-white p-6 shadow-sm">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold tracking-tight text-teal/25">{index + 1}</span>
                    <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                  </div>
                  <p className="mt-3 leading-relaxed text-gray-700">{step.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* THE POEM */}
          <section className="mt-16 md:mt-20">
            <div className="overflow-hidden rounded-[2.25rem] border border-coral/15 bg-gradient-to-br from-coral/10 via-white to-teal/10 px-6 py-12 shadow-sm md:px-12 md:py-16">
              <div className="mx-auto max-w-2xl text-center">
                <Leaf className="mx-auto h-6 w-6 text-teal" />
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.3em] text-coral">A poem by Suz</p>
                <h2 className="mt-3 text-2xl font-bold text-gray-900 md:text-3xl">
                  Oh, the Things That Can Happen When Plants Fill Your Plate
                </h2>
                <div className="mt-8 space-y-6">
                  {poemStanzas.map((stanza, stanzaIndex) => (
                    <p key={stanzaIndex} className="text-lg leading-relaxed text-gray-800">
                      {stanza.map((line, lineIndex) => (
                        <React.Fragment key={lineIndex}>
                          {line}
                          {lineIndex < stanza.length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </p>
                  ))}
                </div>
                <p className="mt-8 text-sm italic text-gray-500">
                  &mdash; Suz, with permission and forgiveness asked of Dr. Seuss
                </p>
              </div>
            </div>
          </section>

          {/* QUOTES */}
          <section className="mt-16 md:mt-20">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal">Words to carry with you</p>
            </div>
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {quotes.map((quote) => (
                <figure
                  key={quote.attribution}
                  className="flex flex-col rounded-[1.75rem] border border-gray-200 bg-white p-7 shadow-sm"
                >
                  <Quote className="h-6 w-6 text-coral/40" />
                  <blockquote className="mt-4 flex-1 text-lg font-medium leading-relaxed text-gray-900">
                    {quote.text}
                  </blockquote>
                  <figcaption className="mt-5 border-t border-gray-100 pt-4 text-sm text-gray-600">
                    {quote.attribution}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          {/* CROSS LINKS */}
          <section className="mt-16 md:mt-20">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-coral">Keep going</p>
              <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">Where to go from here</h2>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {crossLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex flex-col rounded-[1.75rem] border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-teal/40 hover:shadow-md"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-teal/10 text-teal">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-gray-900">{link.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-700">{link.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal">
                      Explore
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Closing rallying cry */}
          <section className="mt-16 md:mt-20">
            <div className="rounded-[2.25rem] border border-teal/15 bg-teal/5 px-6 py-10 text-center shadow-sm md:px-12 md:py-12">
              <Heart className="mx-auto h-6 w-6 text-coral" />
              <p className="mx-auto mt-4 max-w-2xl text-2xl font-bold leading-tight text-gray-900 md:text-3xl">
                Be the CEO of your own health. Be too much. Be extra.
              </p>
              <p className="mx-auto mt-4 max-w-xl leading-relaxed text-gray-700">
                Your next chapter might start on your very next plate. If anything here sparked your curiosity, Suz would
                love to hear from you.
              </p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild className="bg-teal text-white hover:bg-teal-dark">
                  <a href="#resources">
                    Back to the free downloads
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <FacebookGroupButton variant="outline" size="md">
                  Join the Facebook group
                </FacebookGroupButton>
              </div>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="mt-12">
            <div className="rounded-[1.75rem] border border-gray-200 bg-white/80 p-6 text-sm leading-relaxed text-gray-600 shadow-sm">
              <p>
                This page shares Suz&apos;s reflections in the spirit of literary appreciation and education. Rebellious
                Aging is not affiliated with Dr. Seuss Enterprises, the Esselstyn Family Foundation, the T. Colin
                Campbell Center for Nutrition Studies, or any author or film linked above. It is not medical advice
                &mdash; please talk with your physician before making changes, especially if you take medication.
              </p>
            </div>
          </section>
        </div>
      </div>

      <ConnectCTA />
    </div>
  );
};

export default TheTalk;
