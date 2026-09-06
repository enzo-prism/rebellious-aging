export interface FaqItem {
  question: string;
  answer: string;
  link?: { href: string; label: string };
}

export const homeFaqs: FaqItem[] = [
  {
    question: 'What is Rebellious Aging?',
    answer: 'Rebellious Aging is Suz’s community and resource library for women 55+ who want to age with confidence, curiosity, personal style, health, and gratitude. It brings together personal stories, plant-based recipes, free guides, and a private Facebook community.',
    link: { href: '/our-story', label: 'Meet Suz and read our story' },
  },
  {
    question: 'Who is Rebellious Aging for?',
    answer: 'Suz welcomes women 55–105 who are exploring a new chapter, looking for connection, or ready to challenge limiting beliefs about getting older. You can start with whichever of the four pillars speaks to you: confidence, style, health, or gratitude.',
    link: { href: '/starter-kit', label: 'Explore the starter kit' },
  },
  {
    question: 'How can I join the community?',
    answer: 'Request to join the private Rebellious Aging Facebook group. The group is a place for conversation, encouragement, and community updates. Suz shares links to the community’s Zoom gatherings inside the group.',
    link: { href: '/facebook-group', label: 'Learn about the Facebook group' },
  },
  {
    question: 'Where should I start with plant-based living?',
    answer: 'Start with the whole-food, plant-based nutrition guide, then explore the recipe collection and free booklets. Suz’s guide collection includes the Esselstyn Family Foundation jumpstart booklet, the Center for Nutrition Studies guide, and her own one-page starter.',
    link: { href: '/guides', label: 'Browse the free plant-based guides' },
  },
];

export const nutritionFaqs: FaqItem[] = [
  {
    question: 'What is a whole-food, plant-based (WFPB) lifestyle?',
    answer: 'Whole-food, plant-based eating emphasizes vegetables, fruit, beans and other legumes, whole grains, nuts, and seeds in whole or minimally processed forms. The resources Suz shares focus on these foods while limiting refined foods and added oils.',
    link: { href: '/pillars/health/nutrition-guide', label: 'Read the whole-food, plant-based guide' },
  },
  {
    question: 'How is whole-food, plant-based eating different from vegan eating?',
    answer: 'Vegan eating excludes animal products. Whole-food, plant-based eating also emphasizes how much a food is processed. A food can be vegan, such as a packaged sweet or snack, without being a whole plant food.',
    link: { href: '/nutrition', label: 'Explore the nutrition topics' },
  },
  {
    question: 'Where can I find beginner-friendly plant-based recipes?',
    answer: 'The Rebellious Aging recipe collection includes salads, soups, main dishes, and desserts. Each recipe page includes its ingredient list, step-by-step instructions, and source notes so you can explore the original creators’ work.',
    link: { href: '/recipes', label: 'Browse plant-based recipes' },
  },
  {
    question: 'Are the plant-based booklets free?',
    answer: 'Yes. The guide collection links to free booklets from the Esselstyn Family Foundation and the T. Colin Campbell Center for Nutrition Studies, alongside Suz’s downloadable starter. Each guide page explains where the resource comes from and how to open it.',
    link: { href: '/guides', label: 'Open the free guide collection' },
  },
  {
    question: 'Is Suz’s nutrition content medical advice?',
    answer: 'No. Suz shares education, resources, and her personal experience with plant-based living. The website does not provide individual medical advice. Consult a qualified healthcare professional before making significant changes to your diet or lifestyle.',
    link: { href: '/our-story#suz', label: 'Read about Suz’s experience and education' },
  },
];
