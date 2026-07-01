export type GuideIcon = 'sprout' | 'leaf' | 'download';

export interface Guide {
  /** URL slug under /guides */
  slug: string;
  /** Page <h1> and <title> */
  title: string;
  /** Short label used in nav, cards, and cross-links */
  navLabel: string;
  /** Publishing organization */
  source: string;
  /** People behind the booklet */
  author?: string;
  /** Small uppercase label above the title */
  eyebrow: string;
  /** Meta description + card blurb (kept concise for SEO) */
  summary: string;
  /** Longer intro paragraph on the detail page */
  intro: string;
  /** "What's inside" bullet points */
  whatsInside: string[];
  /** Why Suz sends people here */
  whySuz: string;
  /** Primary call-to-action destination (external page or local file) */
  primaryUrl: string;
  /** Primary button label */
  primaryLabel: string;
  /** Optional direct-PDF download */
  pdfUrl?: string;
  /** Optional direct-PDF button label */
  pdfLabel?: string;
  /** true = outbound link (opens in a new tab); false = local download */
  external: boolean;
  /** Short reassurance about how the booklet opens */
  accessNote: string;
  /** Icon key mapped to a lucide icon in the view */
  icon: GuideIcon;
  /** Accent color */
  accent: 'teal' | 'coral';
  /** Extra terms to make the guide easy to find in on-site search */
  keywords: string[];
}

export const guides: Guide[] = [
  {
    slug: 'esselstyn-plant-based-jumpstart',
    title: 'Free Esselstyn Plant-Based Jumpstart Booklet',
    navLabel: 'Esselstyn Jumpstart Booklet',
    source: 'Esselstyn Family Foundation',
    author: 'Dr. Caldwell B. Esselstyn Jr. & Ann Crile Esselstyn',
    eyebrow: 'Free booklet · Esselstyn Family Foundation',
    summary:
      'Download the free Esselstyn Family Foundation Plant-Based Jumpstart Guide — the gentle "begin where you are" booklet Suz shares with everyone starting whole-food, plant-based living.',
    intro:
      'This is the free Plant-Based Jumpstart Guide from the Esselstyn Family Foundation — the work of Dr. Caldwell Esselstyn (author of Prevent and Reverse Heart Disease) and Ann Esselstyn. It is the resource Suz reaches for first when someone asks, "Where do I even begin?" Warm, practical, and completely free — the PDF opens straight from the Foundation with no sign-up.',
    whatsInside: [
      'Easy "build-a-bowl" formulas — a Breakfast Bowl, Salad Bowl, and Supper Bowl',
      'Simple 4 steps per bowl: whole grains, then fruit or beans, then vegetables and greens, then flavor',
      'Long shopping lists of approved, oil-free whole-plant foods',
      'Beginner-friendly nutrition graphics and "begin where you are" encouragement',
    ],
    whySuz:
      'Suz points nearly everyone here first. It is the kindest, least overwhelming on-ramp she knows, and it comes straight from the people who pioneered this approach.',
    primaryUrl:
      'https://esselstynfamilyfoundation.org/ef-content/uploads/2022/06/PB-jumpstart-guide.pdf',
    primaryLabel: 'Open the free booklet (PDF)',
    external: true,
    accessNote: 'Free · opens the PDF from the Esselstyn Family Foundation (no sign-up)',
    icon: 'sprout',
    accent: 'teal',
    keywords: [
      'esselstyn',
      'caldwell esselstyn',
      'ann esselstyn',
      'esselstyn family foundation',
      'jumpstart',
      'jump start',
      'booklet',
      'prevent and reverse heart disease',
      'heart disease',
      'plant-based',
      'plant based',
      'whole food plant based',
      'wfpb',
      'free guide',
      'free booklet',
    ],
  },
  {
    slug: 'campbell-whole-food-plant-based-guide',
    title: 'Free Campbell Whole Food, Plant-Based Guide',
    navLabel: 'Campbell Plant-Based Guide',
    source: 'T. Colin Campbell Center for Nutrition Studies',
    author: 'T. Colin Campbell, PhD',
    eyebrow: 'Free guide · Center for Nutrition Studies',
    summary:
      'Download the free "Living a Whole Food, Plant-Based Life" guide from the T. Colin Campbell Center for Nutrition Studies — a clear, friendly companion to the Esselstyn booklet.',
    intro:
      'A free introductory guide from the T. Colin Campbell Center for Nutrition Studies — founded on the research behind The China Study. It covers the same essentials as the Esselstyn booklet in a slightly different voice, so read whichever one clicks for you (most people love having both).',
    whatsInside: [
      'A plain-language explanation of what whole-food, plant-based really means',
      'Foods to eat freely, eat sparingly, and set aside — sorted for you',
      'Everyday basics like reading labels, B12, and simple substitutions',
      'A friendly, non-judgmental tone for anyone just getting started',
    ],
    whySuz:
      'Suz recommends it as the perfect companion to the Esselstyn booklet — same heart, slightly different voice. Between the two, almost everyone finds the words that finally make it click.',
    primaryUrl: 'https://nutritionstudies.org/whole-food-plant-based-diet-guide/',
    primaryLabel: 'Open the free guide',
    pdfUrl:
      'https://nutritionstudies.s3.us-east-2.amazonaws.com/resources/CNS_Whole_Food_Plant-Based_Guide.pdf',
    pdfLabel: 'Download the PDF',
    external: true,
    accessNote: 'Free · opens on the Center for Nutrition Studies website',
    icon: 'leaf',
    accent: 'teal',
    keywords: [
      'campbell',
      't. colin campbell',
      'colin campbell',
      'china study',
      'the china study',
      'center for nutrition studies',
      'nutrition studies',
      'nutritionstudies',
      'living a whole food plant-based life',
      'whole food plant based',
      'plant-based',
      'plant based',
      'wfpb',
      'beginner guide',
      "beginner's guide",
      'free guide',
      'booklet',
    ],
  },
  {
    slug: 'suz-plant-based-starter',
    title: "Suz's Plant-Based Starter (Free PDF)",
    navLabel: "Suz's Plant-Based Starter",
    source: 'Rebellious Aging',
    author: 'Suz',
    eyebrow: 'Free download · From Suz',
    summary:
      "Suz's one-page plant-based starter: the books, documentaries, and free guides she recommends, plus her plant-strong poem — made to print and stick on your fridge.",
    intro:
      'A one-page handout from Suz that gathers everything in one place — the books and documentaries she recommends, links to the free Esselstyn and Campbell guides above, her plant-strong poem, and the words she keeps close. Made to print and stick on your fridge.',
    whatsInside: [
      'Suz’s recommended books and documentaries',
      'Links to the free Esselstyn and Campbell guides',
      'Her plant-strong poem and the words she keeps close',
      'A one-page format made to print and post on your fridge',
    ],
    whySuz:
      'It is the cheat sheet Suz wishes she had at the beginning — one page that points you to everything else, so you never have to hunt for a link again.',
    primaryUrl: '/resources/suz-plant-based-starter.pdf',
    primaryLabel: 'Download the PDF',
    external: false,
    accessNote: 'Free · one-page PDF made to print',
    icon: 'download',
    accent: 'coral',
    keywords: [
      'suz',
      'starter',
      'plant-based starter',
      'printable',
      'fridge',
      'poem',
      'plant-strong poem',
      'recommendations',
      'books',
      'documentaries',
      'free download',
      'pdf',
    ],
  },
];

export const getGuideBySlug = (slug: string): Guide | undefined =>
  guides.find((guide) => guide.slug === slug);

export const getGuidePath = (slug: string): string => `/guides/${slug}`;
