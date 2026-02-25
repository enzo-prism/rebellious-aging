export interface NutritionGuideSection {
  id: string;
  title: string;
  summary: string;
  tags: string[];
}

export const nutritionGuideSections: NutritionGuideSection[] = [
  {
    id: 'what-is-wfpb',
    title: '📘 What Is a Whole-Food, Plant-Based Lifestyle?',
    summary:
      'A clear definition of WFPB and what foods belong on your plate.',
    tags: ['nutrition-guide', 'wfpb', 'plant-based', 'whole-food'],
  },
  {
    id: 'why-it-matters',
    title: '💪 Why It Matters Even More as We Age',
    summary:
      'How plant-strong eating supports health span, energy, and longevity as we age.',
    tags: ['nutrition-guide', 'health-span', 'longevity'],
  },
  {
    id: 'rebel-plate',
    title: '🥗 Your Rebel Plate: What to Pile On (Eat in Abundance)',
    summary:
      'The food groups to eat freely and generously on a WFPB lifestyle.',
    tags: ['nutrition-guide', 'rebel-plate', 'abundance'],
  },
  {
    id: 'crowd-out',
    title: '🚫 What to Crowd Out (Avoid as Much as You Can)',
    summary:
      'Foods to minimize so plants can take center stage.',
    tags: ['nutrition-guide', 'crowd-out', 'avoid'],
  },
  {
    id: 'b12',
    title: '🧬 A Quick Note on Vitamin B12',
    summary:
      'Why B12 matters on a WFPB diet and how to supplement safely.',
    tags: ['nutrition-guide', 'b12', 'supplement'],
  },
  {
    id: 'labels',
    title: '🔍 How to Read Labels Like a Rebel',
    summary:
      'Simple rules for choosing packaged foods when you need them.',
    tags: ['nutrition-guide', 'labels', 'shopping'],
  },
  {
    id: 'first-steps',
    title: '✨ Three Simple First Steps',
    summary:
      'Practical first moves to start WFPB without overwhelm.',
    tags: ['nutrition-guide', 'first-steps', 'getting-started'],
  },
  {
    id: 'connecting',
    title: '🌈 Connecting This to Your Rebellious Aging Journey',
    summary:
      'How WFPB supports the four pillars: Health, Confidence, Style, and Gratitude.',
    tags: ['nutrition-guide', 'pillars', 'rebellious-aging'],
  },
];

