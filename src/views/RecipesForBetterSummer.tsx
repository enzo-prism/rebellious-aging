'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CalendarDays,
  ChefHat,
  ExternalLink,
  Leaf,
  PlayCircle,
  Quote,
  Sparkles,
  Sprout,
  Utensils,
} from 'lucide-react';

import ConnectCTA from '@/components/common/ConnectCTA';
import Seo from '@/components/seo/Seo';
import PageShareButton from '@/components/share/PageShareButton';
import PageTopUtilityRow from '@/components/share/PageTopUtilityRow';
import { Button } from '@/components/ui/button';
import { getSeoRouteByPath } from '@/data/seoRoutes';
import { siteMetadata } from '@/lib/siteMetadata';
import { buildArticleJsonLd } from '@/lib/structuredData';

const pagePath = '/recipes-for-a-better-summer';
const sourceName = 'T. Colin Campbell Center for Nutrition Studies';
const sourceSiteUrl = 'https://nutritionstudies.org/';
const sourceLogoSrc = '/partner-logos/center-for-nutrition-studies-logo.png';
const originalNewsletterUrl =
  'https://mailchi.mp/nutritionstudies/summer-rolls-burgers-and-pies?e=b8ce8e0712';

const recipePicks = [
  {
    title: 'Summer Rolls',
    label: 'Center recipe',
    description:
      'A Nutrition Studies appetizer with rice paper wraps, crisp vegetables, and a bright dipping sauce.',
    imageSrc:
      'https://mcusercontent.com/51aa734ea43ee2d8487939510/images/71890411-4e18-397c-d89e-4a0d65471159.jpg',
    href: 'https://nutritionstudies.org/recipes/appetizer/summer-rolls/',
    buttonLabel: 'Open recipe',
    icon: ChefHat,
  },
  {
    title: 'Plant-Based Burger Ideas',
    label: 'Center recipe roundup',
    description:
      'A Nutrition Studies roundup of plant-based burger recipes for cookouts and mixed tables.',
    imageSrc:
      'https://mcusercontent.com/51aa734ea43ee2d8487939510/images/1d68a6cf-ddea-d791-0a4d-d06d26b4afcc.jpg',
    href: 'https://nutritionstudies.org/the-10-plant-based-burger-recipes-you-need-to-try/',
    buttonLabel: 'Browse burgers',
    icon: Utensils,
  },
  {
    title: 'No-Bake Strawberry Pie',
    label: 'Center video',
    description:
      'A Nutrition Studies video for a fruit-packed plant-based dessert that keeps the oven off.',
    imageSrc:
      'https://mcusercontent.com/51aa734ea43ee2d8487939510/images/f1bd6c10-848d-2312-30b4-d712086b4b14.jpg',
    href: 'https://www.youtube.com/watch?v=b_ZzfKcVb8w&list=PLkAZq6RYCquu5rqBQcFuYRsSfvvN8AkSL&index=15',
    buttonLabel: 'Watch video',
    icon: PlayCircle,
  },
];

const eventPicks = [
  {
    title: 'Coming Home Cornell 2026',
    date: 'September 4-8, 2026',
    description:
      'A Center for Nutrition Studies gathering around Dr. T. Colin Campbell, his research, and the future of plant-based nutrition.',
    href: 'https://retreats.nutritionstudies.org/coming-home-cornell-2026/',
    buttonLabel: 'Learn more',
    imageSrc:
      'https://mcusercontent.com/51aa734ea43ee2d8487939510/images/a0c15703-9fa1-f130-9e79-75371ebae6aa.jpg',
  },
  {
    title: 'WFPB Gluten-Free Cook Along',
    date: 'July 18-19, 2026',
    description:
      'A Center for Nutrition Studies class for building gluten-free skills inside a whole-food, plant-based kitchen.',
    href: 'https://nutritionstudies.org/classes/whole-food-plant-based-gluten-free-cook-along/',
    buttonLabel: 'Register',
    imageSrc:
      'https://mcusercontent.com/51aa734ea43ee2d8487939510/images/874487aa-41e3-37ae-50f0-9cabdf2be9d5.jpg',
  },
  {
    title: 'Cozy Fall Cooking Retreat',
    date: 'October 28 - November 1, 2026',
    description:
      'A Center for Nutrition Studies retreat with plant-based comfort food, hands-on cooking, and time in nature.',
    href: 'https://nutritionstudies.org/cooking-retreats/',
    buttonLabel: 'Learn more',
    imageSrc:
      'https://mcusercontent.com/51aa734ea43ee2d8487939510/images/4fdad645-b8c0-be1c-b1ed-32dbfa7c9e03.jpg',
  },
];

const takeaways = [
  'The source is the Center for Nutrition Studies newsletter, not a Rebellious Aging recipe rewrite.',
  'The page keeps visitors moving to the original CNS recipe, video, and event pages.',
  'Suz is framing the resources for the Rebellious Aging health pillar.',
];

const SourceLogo = ({ className = '' }: { className?: string }) => (
  <img
    src={sourceLogoSrc}
    alt={`${sourceName} logo`}
    width={720}
    height={146}
    className={`block max-w-full ${className}`}
    loading="lazy"
    decoding="async"
  />
);

const RecipesForBetterSummer = () => {
  const seoConfig = getSeoRouteByPath(pagePath);
  const jsonLd = buildArticleJsonLd({
    title: seoConfig?.title ?? 'Recipes for a Better Summer',
    description:
      seoConfig?.description ??
      'A curated Rebellious Aging roundup of summer WFPB recipes and plant-based learning events.',
    canonicalUrl: `${siteMetadata.baseUrl}${pagePath}`,
    image: recipePicks[0].imageSrc,
  });

  return (
    <div className="min-h-screen bg-background">
      {seoConfig && (
        <Seo
          title={seoConfig.title}
          description={seoConfig.description}
          canonicalPath={seoConfig.path}
          jsonLd={jsonLd}
        />
      )}

      <section className="border-b border-teal/10 bg-white px-4 pb-14 pt-28 sm:pb-16">
        <div className="mx-auto max-w-6xl">
          <PageTopUtilityRow>
            <PageShareButton />
          </PageTopUtilityRow>

          <div className="mb-8 min-w-0 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <div className="grid min-w-0 gap-5 lg:grid-cols-[0.55fr_1fr] lg:items-center">
              <a href={sourceSiteUrl} target="_blank" rel="noopener noreferrer" className="block min-w-0">
                <SourceLogo className="h-auto max-h-20 w-full max-w-[27rem] object-contain lg:max-h-24" />
              </a>
              <div className="min-w-0 space-y-2 lg:border-l lg:border-gray-200 lg:pl-6">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal">
                  Original source
                </p>
                <p className="text-lg font-semibold text-gray-950">{sourceName}</p>
                <p className="leading-relaxed text-gray-700">
                  This page is a Rebellious Aging guide to a Center for Nutrition Studies newsletter. The recipe,
                  video, and event buttons take you back to their original pages.
                </p>
              </div>
            </div>
          </div>

          <div className="grid min-w-0 gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="min-w-0 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/5 px-4 py-2 text-sm font-semibold text-teal">
                <Sprout className="h-4 w-4" />
                Center for Nutrition Studies newsletter
              </div>

              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-coral">
                  Where decades of science meet real life
                </p>
                <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
                  Recipes for a Better Summer
                </h1>
                <p className="max-w-2xl text-lg leading-relaxed text-gray-700">
                  Fresh rolls, plant-based burgers, a berry dessert, and learning events originally shared by the
                  T. Colin Campbell Center for Nutrition Studies.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild className="bg-teal text-white hover:bg-teal-dark">
                  <a href="#summer-recipes">
                    See recipes
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-coral text-coral hover:bg-coral hover:text-white">
                  <a href={originalNewsletterUrl} target="_blank" rel="noopener noreferrer">
                    Original email
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>

              <p className="rounded-lg border border-coral/15 bg-coral/5 p-4 text-sm leading-relaxed text-gray-700">
                Suz&apos;s note: these resources fit the Health pillar because they bring plant-based science into
                everyday meals, gatherings, and learning.
              </p>
            </div>

            <div className="min-w-0 space-y-4">
              <div className="min-w-0 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                <img
                  src={recipePicks[0].imageSrc}
                  alt="Fresh summer rolls with dipping sauce"
                  className="block aspect-[16/9] w-full max-w-full object-cover"
                />
                <div className="flex flex-col gap-2 border-t border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal">Featured by CNS</p>
                    <p className="font-semibold text-gray-950">Summer Rolls</p>
                  </div>
                  <a
                    href={recipePicks[0].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-teal hover:underline"
                  >
                    Open original
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-teal/5 px-4 py-12">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {takeaways.map((takeaway, index) => (
            <div key={takeaway} className="rounded-lg border border-teal/15 bg-white p-5 shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-teal/10 text-teal">
                <Sparkles className="h-5 w-5" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-coral">Takeaway {index + 1}</p>
              <p className="mt-2 leading-relaxed text-gray-700">{takeaway}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="summer-recipes" className="px-4 py-16">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-teal">CNS recipe links</p>
            <h2 className="text-3xl font-bold text-gray-950 sm:text-4xl">Original recipes and video from the Center</h2>
            <p className="text-lg leading-relaxed text-gray-700">
              These are source links from NutritionStudies.org and the Center&apos;s YouTube channel. Rebellious Aging is
              pointing readers to the originals.
            </p>
          </div>

          <div className="grid min-w-0 gap-6 lg:grid-cols-3">
            {recipePicks.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="min-w-0 flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                  <img src={item.imageSrc} alt={item.title} className="block aspect-[4/3] w-full max-w-full object-cover" />
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-teal">
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-950">{item.title}</h3>
                    <p className="mt-3 flex-1 leading-relaxed text-gray-700">{item.description}</p>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                      Source: Center for Nutrition Studies
                    </p>
                    <Button asChild className="mt-6 bg-teal text-white hover:bg-teal-dark">
                      <a href={item.href} target="_blank" rel="noopener noreferrer">
                        {item.buttonLabel} at source
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="learning-events" className="bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-coral">CNS events</p>
              <h2 className="text-3xl font-bold text-gray-950 sm:text-4xl">Events from the Center for Nutrition Studies</h2>
            </div>
            <p className="text-lg leading-relaxed text-gray-700">
              Each event comes from the original newsletter and links back to the Center for details or registration.
            </p>
          </div>

          <div className="grid min-w-0 gap-6 lg:grid-cols-3">
            {eventPicks.map((event) => (
              <article key={event.title} className="min-w-0 flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                <img src={event.imageSrc} alt={event.title} className="block aspect-[4/3] w-full max-w-full object-cover" />
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-coral">
                    <CalendarDays className="h-4 w-4" />
                    {event.date}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-950">{event.title}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-gray-700">{event.description}</p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                    Source: Center for Nutrition Studies
                  </p>
                  <Button asChild variant="outline" className="mt-6 border-teal text-teal hover:bg-teal hover:text-white">
                    <a href={event.href} target="_blank" rel="noopener noreferrer">
                      {event.buttonLabel} at source
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-coral/10 via-white to-teal/10 px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-teal">
              <Leaf className="h-4 w-4" />
              Want to keep going?
            </div>
            <h2 className="text-3xl font-bold text-gray-950">Pair these picks with Suz&apos;s WFPB guide.</h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Use the guide for the everyday basics, then come back to this page when you need a summer meal idea fast.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Button asChild className="bg-teal text-white hover:bg-teal-dark">
              <Link href="/pillars/health/nutrition-guide">
                Read the guide
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-coral text-coral hover:bg-coral hover:text-white">
              <Link href="/recipes">
                Browse RA recipes
                <Utensils className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="px-4 py-10">
        <div className="mx-auto grid min-w-0 max-w-6xl gap-5 rounded-lg border border-gray-200 bg-white p-5 text-sm text-gray-600 shadow-sm lg:grid-cols-[0.35fr_1fr_auto] lg:items-center">
          <SourceLogo className="h-auto max-h-14 w-full max-w-[16rem] object-contain" />
          <div className="inline-flex items-start gap-2">
            <Quote className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
            <p>
              Content source: the {sourceName} newsletter, &quot;Summer Rolls, Burgers, and Pies!&quot; This page curates
              and links to the original recipe, video, and event resources.
            </p>
          </div>
          <a
            href={originalNewsletterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-semibold text-teal hover:underline"
          >
            Original email
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </section>

      <ConnectCTA />
    </div>
  );
};

export default RecipesForBetterSummer;
