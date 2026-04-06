export interface Endorsement {
  quote: string;
  name: string;
  title: string;
  href?: string;
  linkLabel?: string;
}

export const trustedVoiceEndorsements: Endorsement[] = [
  {
    quote:
      'Suzanne is a delight to listen to. Spirited, spunky, and full of wisdom, she presents information in an inviting fashion, inspiring others to join her in getting healthy at any age.',
    name: 'Rachael J. Brown',
    title:
      "Author of For Fork's Sake: A Quick Guide to Healing Yourself and the Planet Through a Plant-Based Diet",
    href: 'https://forforkssakebook.com/',
    linkLabel: "Explore For Fork's Sake",
  },
  {
    quote:
      "Suzanne cares, period! About people, about her work, about herself, about the world. She is prepared, curious, and eager to step outside her comfort zone to learn and help others grow. She does her research and shows up ready to listen. Suzanne creates a safe and respectful environment where she offers evidence-based insights wrapped in warmth and professionalism to inspire thoughtful action. Suzanne's enthusiasm is unstoppable, and her energy is contagious.",
    name: 'Natasha Lantz',
    title:
      'Executive Director of Core Operations, T. Colin Campbell Center for Nutrition Studies',
    href: 'https://nutritionstudies.org/',
    linkLabel: 'Visit NutritionStudies.org',
  },
];
