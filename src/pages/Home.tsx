'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import PillarCard from '@/components/home/PillarCard';
import WelcomeBanner from '@/components/home/WelcomeBanner';
import LatestBlogBadge from '@/components/home/LatestBlogBadge';
import ConnectCTA from '@/components/common/ConnectCTA';
import { getSortedBlogPosts } from '@/data/blogPosts';
import { useSearch } from '@/hooks/useSearch';
import type { SearchType } from '@/data/searchRecords';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from '@/components/ui/carousel';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Seo from '@/components/seo/Seo';
import { getSeoRouteByPath } from '@/data/seoRoutes';
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from '@/lib/structuredData';
import { Search, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
// import Autoplay from 'embla-carousel-autoplay'; // Removed to prevent auto-scrolling

const heroImages = [
  '/lovable-uploads/e383e12d-d193-4b00-864e-4593b167f3f4.png',
  '/lovable-uploads/a14b531d-8674-4949-9d29-5db73262868d.png',
  '/lovable-uploads/c1463203-92fc-434c-a583-4399bb786c73.png',
  '/lovable-uploads/30b1e0f5-39bd-4e3e-8a1f-6c10d54b384a.png',
  '/lovable-uploads/efa97b78-3cbb-4f8c-b543-050d2d59e578.png',
  '/lovable-uploads/08d809cc-1f8a-475d-b10f-17d66e8b0502.png',
  '/lovable-uploads/34f618fe-81a8-41b5-8235-6f432ce55ce7.png',
  '/lovable-uploads/6adf3183-9e2d-4253-98d4-ec336f1daa3e.png',
] as const;

const Home = () => {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]));
  const [preloadedImages, setPreloadedImages] = useState<Set<number>>(new Set());
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearchType, setActiveSearchType] = useState<SearchType | 'all'>('all');
  const { search, ensureIndex, loading: searchLoading, docs } = useSearch();
  const homeSeo = getSeoRouteByPath('/');
  const router = useRouter();

  // Prevent auto-scrolling during initial load
  // Removed scroll lock to fix intermittent scrolling issues


  // Track carousel current slide
  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrentSlide(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap());
    });
  }, [api]);

  const pillars = [
    {
      title: "Confidence",
      description: "Develop the mindset and tools to embrace your authentic self, speak your truth, and live boldly in every decade of life.",
      icon: "🌟",
      link: "/pillars/confidence"
    },
    {
      title: "Style",
      description: "Discover how to express yourself through fashion, appearance, and personal presentation that feels true to you.",
      icon: "👗",
      link: "/pillars/style"
    },
    {
      title: "Health",
      description: "Implement science-backed strategies for vibrant physical health, mental sharpness, and emotional wellbeing as you age.",
      icon: "🌱",
      link: "/pillars/health"
    },
    {
      title: "Gratitude",
      description: "Ground yourself in joy, resilience, and perspective with practices that turn everyday moments into fuel for rebellious aging.",
      icon: "💖",
      link: "/pillars/gratitude"
    }
  ];

  const featuredGuides = [
    {
      title: 'Whole-Food, Plant-Based Guide',
      description: 'Dive into what to eat, what to crowd out, and how to keep your Health pillar thriving.',
      link: '/pillars/health/nutrition-guide',
      icon: '🥗'
    },
    {
      title: 'Rebellious Aging Blog',
      description: 'Explore long-form stories, science-backed insights, and updates that weave every pillar together.',
      link: '/blog',
      icon: '📝'
    },
    {
      title: 'Gratitude Pillar',
      description: 'Ground your rebellion in joy with daily gratitude practices tailored to women 55–105.',
      link: '/pillars/gratitude',
      icon: '💖'
    },
    {
      title: 'Video Series',
      description: 'Watch Suz riff on confidence, style, and health in bite-sized, rebellious episodes.',
      link: '/video-series',
      icon: '🎥'
    },
    {
      title: 'Welcome Letter',
      description: 'New here? Start with Suz’s heartfelt invitation to age boldly and live loudly.',
      link: '/welcome-letter',
      icon: '💌'
    }
  ];

  const latestBlogs = getSortedBlogPosts()
    .slice()
    .sort((a, b) => b.blogNumber - a.blogNumber)
    .slice(0, 10);

  const searchResults = useMemo(
    () =>
      searchQuery
        ? search(searchQuery, activeSearchType === 'all' ? undefined : { types: [activeSearchType] }).slice(0, 5)
        : [],
    [activeSearchType, searchQuery, search]
  );
  const featuredRecipes = useMemo(
    () => docs.filter((doc) => doc.type === 'recipe').slice(0, 2),
    [docs]
  );
  const featuredVideos = useMemo(
    () => docs.filter((doc) => doc.type === 'video').slice(0, 2),
    [docs]
  );
  const featuredPillars = useMemo(
    () => docs.filter((doc) => doc.type === 'pillar').slice(0, 2),
    [docs]
  );
  const featuredBlogs = useMemo(
    () =>
      latestBlogs.slice(0, 2).map((post) => ({
        id: `blog:${post.id}`,
        title: post.title,
        summary: post.excerpt,
        path: `/blog/${post.id}`,
        type: 'blog' as const,
        blogNumber: post.blogNumber,
      })),
    [latestBlogs]
  );
  const defaultItems = useMemo(
    () => {
      if (activeSearchType === 'recipe') return featuredRecipes;
      if (activeSearchType === 'blog') return featuredBlogs;
      if (activeSearchType === 'video') return featuredVideos;
      if (activeSearchType === 'pillar') return featuredPillars;
      return [...featuredRecipes, ...featuredBlogs];
    },
    [activeSearchType, featuredBlogs, featuredPillars, featuredRecipes, featuredVideos]
  );
  const displayItems = searchQuery ? searchResults : defaultItems;
  const topItemId = displayItems[0]?.id;

  useEffect(() => {
    void ensureIndex();
  }, [ensureIndex]);

  // Preload the second image immediately
  useEffect(() => {
    if (heroImages.length > 1) {
      const img = new Image();
      img.onload = () => {
        setPreloadedImages(prev => new Set(prev).add(1));
      };
      img.src = heroImages[1];
    }
  }, []);

  // Progressive loading function
  const loadImage = (index: number) => {
    if (!loadedImages.has(index) && !preloadedImages.has(index)) {
      const img = new Image();
      img.onload = () => {
        setLoadedImages(prev => new Set(prev).add(index));
      };
      img.src = heroImages[index];
    }
  };

  // Load next images when carousel becomes active
  const handleCarouselSelect = (index: number) => {
    // Load current image if not loaded
    loadImage(index);
    
    // Preload next image
    const nextIndex = (index + 1) % heroImages.length;
    loadImage(nextIndex);
  };


  return (
    <>
      {homeSeo && (
        <Seo
          title={homeSeo.title}
          description={homeSeo.description}
          canonicalPath={homeSeo.path}
          jsonLd={[buildOrganizationJsonLd(), buildWebSiteJsonLd()]}
        />
      )}
      <WelcomeBanner />

      {/* Hero section */}
      <section className="hero-spacing">
        <div className="container mx-auto container-padding h-full">
          <div className="grid lg:grid-cols-2 grid-gap-responsive h-full items-center">
            {/* Text Content */}
            <div className="order-2 lg:order-1 flex flex-col justify-center">
              <div className="max-w-2xl text-spacing">
                <div className="mb-4">
                  <LatestBlogBadge />
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight animate-fade-in">
                  Age Boldly / Live Loudly
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-600 animate-fade-in leading-relaxed" style={{animationDelay: "0.2s"}}>
                  Ditch the outdated rules. Rebellious aging is where vibrant health, bold confidence, grounded gratitude, and signature style take center stage.
                </p>
                <div className="flex flex-col sm:flex-row button-spacing animate-fade-in" style={{animationDelay: "0.4s"}}>
                <Button asChild size="lg" className="bg-teal hover:bg-teal-dark text-white shadow-lg min-h-[44px] text-base font-semibold">
                  <Link href="/our-story">💌 Our Story</Link>
                </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-teal text-teal hover:bg-teal hover:text-white shadow-sm min-h-[44px] text-base font-medium"
                    onClick={() => {
                      const searchSection = document.getElementById('search-section');
                      if (searchSection) {
                        searchSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                  >
                    🔍 Search
                  </Button>
                </div>
              </div>
            </div>

            {/* Image Carousel */}
            <div className="order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Carousel
                  setApi={setApi}
                  className="w-full"
                  opts={{
                    align: "start",
                    loop: true,
                    dragFree: false,
                    containScroll: "trimSnaps",
                    skipSnaps: false,
                    watchDrag: true,
                  }}
                  plugins={[]} // Removed Autoplay to prevent auto-scrolling
                >
                  <CarouselContent className="-ml-0">
                    {heroImages.map((image, index) => (
                      <CarouselItem key={index} className="pl-0 basis-full">
                        <div className="relative w-full">
                          <AspectRatio ratio={1} className="bg-gray-200 overflow-hidden">
                            {(loadedImages.has(index) || preloadedImages.has(index) || index === 0) ? (
                             <img 
                                src={image}
                                alt={`Vibrant aging lifestyle ${index + 1}`}
                                className="w-full h-full object-cover transition-opacity duration-1000"
                                style={{
                                  objectPosition: 'center 30%'
                                }}
                                loading={index === 0 ? "eager" : "lazy"}
                                decoding="async"
                                onLoad={() => {
                                  if (index !== 0) {
                                    handleCarouselSelect(index);
                                  }
                                }}
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
                                <div className="text-gray-400">Loading...</div>
                              </div>
                            )}
                          </AspectRatio>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
                
                {/* Progress Bar */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {heroImages.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 md:h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        index === currentSlide 
                          ? 'w-10 md:w-8 bg-white' 
                          : 'w-2 md:w-1.5 bg-white/40 hover:bg-white/60'
                      }`}
                      onClick={() => api?.scrollTo(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Pillars section */}
      <section id="pillars-section" className="section-padding bg-gray-50">
        <div className="container mx-auto container-padding">
          <div className="text-center prose-spacing mb-12 lg:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">The Four Pillars</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg lg:text-xl leading-relaxed">
              Our holistic approach to rebellious aging is built on four foundational pillars that
              work together to help you create a vibrant, fulfilling life at any age.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 grid-gap-responsive">
            {pillars.map((pillar, index) => (
              <PillarCard 
                key={index}
                title={pillar.title}
                description={pillar.description}
                icon={pillar.icon}
                link={pillar.link}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto container-padding">
          <div className="text-center prose-spacing mb-12">
            <p className="uppercase text-xs tracking-[0.3em] text-teal font-semibold">Guides & Resources</p>
            <h2 className="text-3xl md:text-4xl font-bold">Follow Suz’s Recommended Starting Points</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              From gratitude rituals to whole-food plates, these guides link every pillar together so you can keep moving through the movement.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 grid-gap-responsive">
            {featuredGuides.map((guide) => (
              <div key={guide.title} className="border border-gray-200 rounded-3xl p-6 shadow-sm bg-white flex flex-col">
                <div className="text-4xl mb-4">{guide.icon}</div>
                <h3 className="text-2xl font-semibold mb-2">{guide.title}</h3>
                <p className="text-gray-600 flex-1">{guide.description}</p>
                <Button asChild variant="link" className="justify-start px-0 mt-4 text-teal">
                  <Link href={guide.link}>Explore →</Link>
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl border border-teal/20 bg-teal/5 px-6 py-5">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-teal font-semibold">New</p>
              <h3 className="text-xl font-semibold text-gray-900 mt-2">Rebellious Aging Starter Kit</h3>
              <p className="text-gray-600 mt-1">
                A gentle beginning for women 55-105: Nibble, Wiggle, Dazzle, Gratefulness.
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="border-teal text-teal hover:bg-teal hover:text-white"
            >
              <Link href="/starter-kit">View starter kit</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container mx-auto container-padding space-y-8">
          <div className="text-center prose-spacing max-w-3xl mx-auto">
            <p className="uppercase text-xs tracking-[0.3em] text-teal font-semibold">Latest From the Blog</p>
            <h2 className="text-3xl md:text-4xl font-bold">Fresh posts, delivered rebelliously</h2>
            <p className="text-gray-600">
              Swipe through the newest stories on confidence, style, gratitude, and plant-strong living.
            </p>
            <div className="mt-4">
              <Button asChild variant="outline" className="border-teal text-teal hover:bg-teal hover:text-white">
                <Link href="/blog">View all posts →</Link>
              </Button>
            </div>
          </div>

          <Carousel
            className="w-full"
            opts={{
              align: 'start',
              loop: true,
              dragFree: true,
            }}
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {latestBlogs.map((post) => (
                <CarouselItem
                  key={post.id}
                  className="pl-4 md:pl-6 basis-[85%] sm:basis-1/2 lg:basis-1/3"
                >
                  <Link
                    href={`/blog/${post.id}`}
                    className="block h-full rounded-3xl border border-gray-200 bg-white p-5 shadow-sm hover:-translate-y-1 hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.15em] text-teal font-semibold mb-2">
                      <span>Blog #{post.blogNumber}</span>
                      <span className="text-gray-300">•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                    <div className="text-teal font-semibold text-sm">Read post →</div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      <section id="search-section" className="section-padding">
        <div className="container mx-auto container-padding space-y-6">
          <div className="text-center prose-spacing max-w-3xl mx-auto">
            <p className="uppercase text-xs tracking-[0.3em] text-teal font-semibold">Search</p>
            <h2 className="text-3xl md:text-4xl font-bold">Find anything on Rebellious Aging</h2>
            <p className="text-gray-600">
              Looking for a specific recipe, blog, pillar, or video? Search the site right here.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const trimmed = searchQuery.trim();
              if (trimmed) {
                router.push(`/search?q=${encodeURIComponent(trimmed)}`);
              }
            }}
            className="max-w-3xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recipes, blogs, pillars, nutrition, video series…"
                className="w-full rounded-full border border-gray-200 bg-white px-11 py-3.5 text-base shadow-sm focus:border-teal focus:ring-2 focus:ring-teal/20 transition"
              />
              {searchLoading && (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin text-muted-foreground" />
              )}
            </div>
          </form>

          <div className="flex flex-wrap justify-center gap-2 text-sm">
            {([
              { label: 'All', value: 'all' },
              { label: 'Recipes', value: 'recipe' },
              { label: 'Blog', value: 'blog' },
              { label: 'Videos', value: 'video' },
              { label: 'Pillars', value: 'pillar' },
            ] as const).map((filter) => (
              <Button
                key={filter.value}
                variant={activeSearchType === filter.value ? 'default' : 'outline'}
                className="rounded-full px-4 py-2 text-xs"
                onClick={() => setActiveSearchType(filter.value)}
              >
                {filter.label}
              </Button>
            ))}
          </div>

          {displayItems.length === 0 ? (
            <div className="max-w-3xl mx-auto border border-dashed border-gray-200 rounded-2xl p-6 text-center text-sm text-gray-600">
              No matches yet. Try searching for “sweet potato,” “oil-free,” or “confidence.”
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {displayItems.map((item) => {
                  const isTop = item.id === topItemId;
                  const topLabel = searchQuery ? 'Top result' : 'Top pick';
                  const typeLabel = item.type ?? 'blog';
                  const blogNumber =
                    typeof item === 'object' &&
                    item !== null &&
                    'blogNumber' in item &&
                    typeof (item as { blogNumber?: unknown }).blogNumber === 'number'
                      ? (item as { blogNumber: number }).blogNumber
                      : null;
  
                  return (
                    <Link
                      key={item.id}
                      href={item.path ?? `/blog/${item.id}`}
                    className={`block rounded-2xl border bg-white p-5 shadow-sm hover:-translate-y-1 hover:shadow-md transition ${
                      isTop ? 'border-teal/50 ring-2 ring-teal/15' : 'border-gray-200'
                    }`}
                  >
                      <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-[0.12em] text-teal font-semibold">
                        <span>{typeLabel}</span>
                        {blogNumber !== null ? <span className="text-gray-300">•</span> : null}
                        {blogNumber !== null ? <span>Blog #{blogNumber}</span> : null}
                        {isTop ? <span className="ml-2 rounded-full bg-teal/10 px-2 py-0.5 text-[0.6rem]">{topLabel}</span> : null}
                      </div>
                      <h3 className="text-lg font-semibold mb-2 line-clamp-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2">{item.summary}</p>
                    </Link>
                );
              })}
            </div>
          )}

          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild className="bg-teal text-white hover:bg-teal-dark">
                <Link href="/recipes">Browse recipes</Link>
              </Button>
              <Button asChild variant="outline" className="border-teal text-teal hover:bg-teal hover:text-white">
                <Link href={searchQuery ? `/search?q=${encodeURIComponent(searchQuery.trim())}` : '/search'}>
                  Open full search →
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-teal/5">
        <div className="container mx-auto container-padding">
          <div className="rounded-3xl border border-teal/20 bg-white p-8 md:p-10 shadow-sm flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <div className="flex-1 space-y-3">
              <p className="uppercase text-xs tracking-[0.3em] text-teal font-semibold">Starter Kit</p>
              <h2 className="text-3xl md:text-4xl font-bold">Rebellious Aging Starter Kit</h2>
              <p className="text-gray-600 max-w-2xl">
                A gentle beginning for women 55-105. Nibble. Wiggle. Dazzle. Be Grateful.
              </p>
            </div>
            <Button asChild className="bg-teal text-white hover:bg-teal-dark">
              <Link href="/starter-kit">Go to the starter kit</Link>
            </Button>
          </div>
        </div>
      </section>

      <ConnectCTA />
    </>
  );
};

export default Home;
