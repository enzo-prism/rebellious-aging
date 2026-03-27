export interface SeoRouteConfig {
  path: string;
  title: string;
  description: string;
  ogType?: 'website' | 'article';
  image?: string;
  noindex?: boolean;
}

export const seoRoutes: SeoRouteConfig[] = [
  {
    path: '/',
    title: 'Rebellious Aging | Age Boldly, Live Loudly',
    description:
      'Rebellious Aging helps women 55+ expand confidence, style, and health through storytelling, plant-powered living, and an active community.',
  },
  {
    path: '/our-story',
    title: 'Our Story',
    description:
      'Meet Suz and discover how Rebellious Aging challenges outdated rules with science-backed lifestyle shifts rooted in compassion.',
  },
  {
    path: '/welcome-letter',
    title: 'Welcome Letter',
    description:
      'A heartfelt welcome from Suz inviting women 55-105 to join a bold movement centered on community, plant-strong nourishment, and confidence.',
  },
  {
    path: '/speaking-events',
    title: 'Speaking Events',
    description:
      "Explore Suz's talks, community presentations, and future speaking appearances as Rebellious Aging keeps growing.",
  },
  {
    path: '/dr-seuss',
    title: 'Dr. Seuss & Rebellious Aging',
    description:
      "Explore why Dr. Seuss's You're Only Old Once! resonates with Rebellious Aging through humor, healthcare satire, resilience, and Suz's Santa Cruz reading.",
    ogType: 'article',
  },
  {
    path: '/starter-kit',
    title: 'Starter Kit',
    description:
      'A gentle starter kit for women 55-105 to begin with Nibble, Wiggle, Dazzle, and Gratefulness in the Rebellious Aging journey.',
  },
  {
    path: '/nutrition',
    title: 'Nutrition',
    description:
      'Explore the what, why, and how of Whole-Food, Plant-Based (WFPB) living with protocols, benefits, recipes, and expert-backed guidance.',
  },
  {
    path: '/pillars/health/nutrition-guide',
    title: 'Nutrition Guide',
    description:
      'Dive into what to eat, what to crowd out, and how to read labels like a rebel with a printable WFPB roadmap for rebellious agers.',
  },
  {
    path: '/pillars/health/resource-guide',
    title: 'Resource Guide',
    description:
      'A curated library of documentaries, books, cookbooks, websites, and talks to explore WFPB living at your own pace.',
  },
  {
    path: '/team',
    title: 'Team',
    description:
      'Meet the collaborators and creatives bringing the Rebellious Aging vision to life through photography, storytelling, and design.',
  },
  {
    path: '/contact',
    title: 'Contact',
    description:
      'Reach out to Suz for plant-based guidance, speaking inquiries, or personalized support on your rebellious aging journey.',
  },
  {
    path: '/facebook-group',
    title: 'Facebook Group',
    description:
      'Join the private Rebellious Aging Facebook group for daily inspiration, accountability, and plant-strong conversation.',
  },
  {
    path: '/video-series',
    title: 'Video Series',
    description:
      'Stream short, rebellious conversations with Suz covering confidence, style, whole-food living, and community.',
  },
  {
    path: '/blog',
    title: 'Blog',
    description:
      'Catch up on Suz’s long-form reflections on gratitude, nourishment, style, mindset, and rebellious aging.',
  },
  {
    path: '/recipes',
    title: 'Recipes',
    description:
      'Browse plant-powered recipes from quick weeknight meals to celebratory favorites, built for vibrant, rebellious aging.',
  },
  {
    path: '/search',
    title: 'Search',
    description:
      'Search pillars, nutrition guides, blog posts, and videos to find exactly what you need on Rebellious Aging.',
    noindex: true,
  },
  {
    path: '/404',
    title: 'Page Not Found',
    description:
      'This page has gone rogue. Head back to the pillars, blog, or nutrition guide to keep aging rebelliously.',
    noindex: true,
  },
  {
    path: '/pillars/confidence',
    title: 'Confidence',
    description:
      'Ditch limiting beliefs and rebuild unshakable confidence with quizzes, checklists, and personalized support.',
  },
  {
    path: '/pillars/style',
    title: 'Style',
    description:
      'Express signature style with playful guidance, curated resources, and the Rebellious Aging style checklist.',
  },
  {
    path: '/pillars/health',
    title: 'Health',
    description:
      'Fuel longevity with Whole-Food, Plant-Based foundations, nutrition tools, and a daily health checklist.',
  },
  {
    path: '/pillars/gratitude',
    title: 'Gratitude',
    description:
      'Discover how gratitude becomes a rebellious daily practice that fuels joy, resilience, and purpose in every season of life.',
  },
];

export const getSeoRouteByPath = (path: string) =>
  seoRoutes.find((route) => route.path === path);
