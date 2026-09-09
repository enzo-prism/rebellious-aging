'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, ChefHat, Heart, Leaf, Search, Shirt, Sparkles } from 'lucide-react';
import PillarCard from '@/components/home/PillarCard';
import LatestBlogBadge from '@/components/home/LatestBlogBadge';
import LivingRoomSection from '@/components/home/LivingRoomSection';
import SubstackAnnouncement from '@/components/common/SubstackAnnouncement';
import TrustedVoicesSection from '@/components/common/TrustedVoicesSection';
import { FacebookGroupButton } from '@/components/common/FacebookGroupCta';
import { getSortedBlogPosts } from '@/data/blogPosts';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import PageShareButton from '@/components/share/PageShareButton';
import FaqSection from '@/components/seo/FaqSection';
import { homeFaqs } from '@/data/faqs';

const heroImages = [
  'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1775491548/IMG_4177_jgopw9.png',
  'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1775491546/Screenshot_2026-04-06_at_9.05.25_AM_wchjhz.png',
  'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1775491547/Screenshot_2026-04-06_at_9.04.56_AM_g0sot5.png',
  'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1774621574/IMG_7297_cldamj.jpg',
  'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1774621600/IMG_7191_d2qhec.jpg',
  'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1774621631/IMG_7082_a0qnyp.jpg',
  'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1774621666/IMG_6962_hbovuu.jpg',
  'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1774622273/IMG_6573_s5hok3.jpg',
  'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1774621518/IMG_7527_hrk5sa.jpg',
] as const;

const HERO_IMAGE_WIDTHS = [480, 768, 1080] as const;

const getCloudinaryHeroUrl = (src: string, width: number) =>
  src.replace(
    '/image/upload/',
    `/image/upload/c_limit,w_${width},f_auto,q_auto:good/`
  );

const pillars = [
  { title: 'Confidence', description: 'Make room for your voice, your ideas, and the woman you are becoming.', icon: Sparkles, link: '/pillars/confidence' },
  { title: 'Style', description: 'Wear what feels like you. Explore personal style without an age limit.', icon: Shirt, link: '/pillars/style' },
  { title: 'Health', description: 'Explore plant-based living, everyday movement, and caring for yourself.', icon: Leaf, link: '/pillars/health' },
  { title: 'Gratitude', description: 'Find a little more joy, perspective, and possibility in the everyday.', icon: Heart, link: '/pillars/gratitude' },
];

const startingPoints = [
  { title: 'Start with one small step', description: 'A gentle starter kit for your next chapter. No perfect plan required.', href: '/starter-kit', label: 'Open the starter kit', icon: Sparkles },
  { title: 'Put more plants on your plate', description: 'Find a recipe for tonight or a free guide to help you get started.', href: '/recipes', label: 'Find a plant-based recipe', icon: ChefHat },
  { title: 'Find a story that speaks to you', description: 'Suz’s reflections on confidence, connection, and becoming yourself.', href: '/blog', label: 'Browse Suz’s stories', icon: BookOpen },
];

export default function Home() {
  const [requestedImages, setRequestedImages] = useState<Set<number>>(new Set([0]));
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const latestPosts = getSortedBlogPosts().slice(-3).reverse();

  useEffect(() => {
    if (!api) return;
    const handleSelect = () => {
      const selected = api.selectedScrollSnap();
      setCurrentSlide(selected);
      setRequestedImages((current) => current.has(selected) ? current : new Set(current).add(selected));
    };
    handleSelect();
    api.on('select', handleSelect);
    return () => { api.off('select', handleSelect); };
  }, [api]);

  return (
    <>
      <section className="px-4 py-6 sm:px-6 sm:py-10 lg:py-14">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="space-y-5 lg:space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-semibold tracking-wide text-teal">A community for women 55+</p>
              <PageShareButton />
            </div>
            <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl xl:text-6xl">Welcome Home</h1>
            <p className="max-w-xl text-xl font-medium leading-relaxed text-gray-800 sm:text-2xl">
              You do not have to figure this stage of life out alone.
            </p>
            <p className="max-w-xl text-lg leading-relaxed text-gray-700">
              Rebellious Aging is a warm, supportive community for women 55+ who want to age with
              vitality, curiosity, laughter, confidence, and connection.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <FacebookGroupButton size="lg" className="min-h-12 text-base">Join the Facebook Group</FacebookGroupButton>
              <Button asChild variant="outline" size="lg" className="min-h-12 border-teal text-base text-teal">
                <a href="#library-section">Explore the library <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
              </Button>
            </div>
            <Link href="/welcome-letter" className="inline-flex min-h-11 items-center gap-2 font-medium text-teal underline underline-offset-4">
              Read Suz’s welcome letter <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mx-auto w-full max-w-2xl lg:max-w-none">
            <Carousel setApi={setApi} aria-label="Life with Suz" opts={{ align: 'start', loop: true }}>
              <div className="overflow-hidden rounded-3xl border border-gray-200 shadow-sm">
                <CarouselContent className="ml-0">
                  {heroImages.map((src, index) => (
                    <CarouselItem key={src} className="basis-full pl-0">
                      <AspectRatio ratio={1} className="overflow-hidden bg-stone-100">
                        {requestedImages.has(index) && (
                          <img
                            src={getCloudinaryHeroUrl(src, 768)}
                            srcSet={HERO_IMAGE_WIDTHS.map((width) => `${getCloudinaryHeroUrl(src, width)} ${width}w`).join(', ')}
                            sizes="(min-width: 1280px) 608px, (min-width: 1024px) 50vw, (min-width: 640px) 672px, calc(100vw - 2rem)"
                            alt={`Vibrant aging lifestyle ${index + 1}`}
                            className="h-full w-full object-cover"
                            style={{ objectPosition: 'center 30%' }}
                            width={768}
                            height={768}
                            loading={index === 0 ? 'eager' : 'lazy'}
                            fetchPriority={index === 0 ? 'high' : 'auto'}
                            decoding="async"
                            draggable={false}
                          />
                        )}
                      </AspectRatio>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </div>
              <div className="mt-3 flex items-center justify-between gap-4">
                <p className="text-sm text-gray-600">A glimpse of life with Suz</p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" aria-label="Previous photo" disabled={!api} onClick={() => api?.scrollPrev()}>
                    <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                  </Button>
                  <span role="status" aria-label="Current photo" className="min-w-12 text-center text-sm tabular-nums text-gray-700">{currentSlide + 1} / {heroImages.length}</span>
                  <Button variant="outline" size="icon" aria-label="Next photo" disabled={!api} onClick={() => api?.scrollNext()}>
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </Carousel>
          </div>
        </div>
      </section>

      <section id="library-section" className="border-y border-teal/10 bg-[#f5f9f8] px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-2xl">
            <p className="mb-3 text-sm font-semibold tracking-wide text-teal">Make yourself at home</p>
            <h2 className="text-3xl font-bold sm:text-4xl">What would feel good today?</h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">Start where you are. Take what you need. There is no right order.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {startingPoints.map(({ title, description, href, label, icon: Icon }) => (
              <Link key={href} href={href} className="group flex flex-col rounded-2xl border border-teal/15 bg-white p-6 transition-colors hover:border-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal">
                <Icon className="mb-5 h-7 w-7 text-teal" aria-hidden="true" />
                <h3 className="text-xl font-semibold leading-snug text-gray-900">{title}</h3>
                <p className="mb-5 mt-3 flex-1 text-base leading-relaxed text-gray-600">{description}</p>
                <span className="flex items-center gap-2 font-semibold text-teal">{label}<ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
          <form action="/search" method="get" role="search" className="mt-8 rounded-2xl border border-teal/15 bg-white p-5 sm:p-6">
            <label htmlFor="home-library-search" className="mb-3 block text-base font-semibold text-gray-900">Looking for something specific?</label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-teal" aria-hidden="true" />
                <input id="home-library-search" name="q" type="search" placeholder="Try “balance,” “gratitude,” or “soup”" className="h-12 w-full rounded-xl border border-gray-300 pl-12 pr-4 text-base outline-none focus:border-teal focus:ring-2 focus:ring-teal/20" />
              </div>
              <Button type="submit" className="min-h-12 px-6">Search the library</Button>
            </div>
            <p className="mt-3 text-sm text-gray-600">Or explore the <Link href="/guides" className="font-medium text-teal underline">free guides</Link>, <Link href="/nutrition" className="font-medium text-teal underline">nutrition library</Link>, or <Link href="/video-series" className="font-medium text-teal underline">videos with Suz</Link>.</p>
          </form>
          <Link
            href="/live-loud-hat"
            className="mt-6 flex flex-col gap-3 rounded-2xl border border-teal/20 bg-white p-5 transition-colors hover:border-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal sm:flex-row sm:items-center sm:justify-between sm:p-6"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-teal">Invite-only</p>
              <h3 className="mt-2 text-xl font-semibold text-gray-900">The Live Loud hat</h3>
              <p className="mt-1 text-base leading-relaxed text-gray-600">
                A small-batch waitlist Suz reads herself. Not a shop — apply for the next round.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 font-semibold text-teal">
              Apply for a hat
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-2xl">
            <p className="mb-3 text-sm font-semibold tracking-wide text-teal">The four pillars</p>
            <h2 className="text-3xl font-bold sm:text-4xl">More ways to feel like yourself</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{pillars.map((pillar) => <PillarCard key={pillar.link} {...pillar} />)}</div>
        </div>
      </section>

      <section className="border-y border-gray-200 bg-stone-50 px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div><p className="mb-3 text-sm font-semibold tracking-wide text-teal">From Suz’s notebook</p><h2 className="text-3xl font-bold sm:text-4xl">A little perspective for your day</h2></div>
            <LatestBlogBadge />
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {latestPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`} className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-colors hover:border-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal">
                <p className="mb-3 text-sm text-gray-600">Blog #{post.blogNumber} · {post.readTime}</p>
                <h3 className="text-2xl font-semibold leading-snug text-gray-900 group-hover:text-teal">{post.title}</h3>
                <p className="mb-6 mt-4 flex-1 text-base leading-relaxed text-gray-600">{post.excerpt}</p>
                <span className="flex items-center gap-2 font-semibold text-teal">Read the story <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
          <div className="mt-6"><Button asChild variant="outline"><Link href="/blog">Browse all stories <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></Button></div>
          <div className="mt-10"><SubstackAnnouncement /></div>
        </div>
      </section>

      <TrustedVoicesSection title="What trusted voices say about Suz" description="Curiosity, evidence, warmth, and a contagious kind of energy." ctaHref="/our-story" ctaLabel="Meet Suz and read her story" />
      <FaqSection title="New to Rebellious Aging? Start here" questions={homeFaqs} />
      <LivingRoomSection />
    </>
  );
}
