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
  {
    quote:
      'Suzanne decided not to bow to the standard notions about aging, and she is taking the lead in guiding others to stand up to the outdated concepts about what people should do and how they should be as they get older. With her ideas and energy, people can learn how to improve or maintain their health and confidence as the years go by. She knows what she is talking about and gives her time graciously to work with those who have questions. Suzanne is undeniably wisdom in action!',
    name: 'Valerie Sims',
    title: 'Retired RN and teacher, moderator with CNS Whole Communities, and inveterate volunteer',
  },
];
