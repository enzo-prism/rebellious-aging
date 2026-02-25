export interface NutritionTabDefinition {
  id: string;
  label: string;
  title: string;
  summary: string;
  tags: string[];
}

export const nutritionTabs: NutritionTabDefinition[] = [
  {
    id: 'what-is-wfpb',
    label: 'What is WFPB?',
    title: 'What is Whole-Food, Plant-Based Nutrition?',
    summary:
      'Learn what WFPB means, what foods it includes, and how it differs from typical vegan or vegetarian diets.',
    tags: ['nutrition', 'wfpb', 'whole-food', 'plant-based'],
  },
  {
    id: 'benefits',
    label: 'Benefits',
    title: 'Benefits of Whole-Food, Plant-Based Nutrition',
    summary:
      'Explore the science-backed benefits of WFPB eating for heart health, weight management, energy, and longevity.',
    tags: ['nutrition', 'benefits', 'health', 'longevity'],
  },
  {
    id: 'protocol',
    label: "Dr. Caldwell Esselstyn's Protocol",
    title: "Dr. Caldwell Esselstyn's Protocol",
    summary:
      'A heart-healthy, oil-free WFPB protocol focused on preventing and reversing coronary artery disease.',
    tags: ['nutrition', 'esselstyn', 'protocol', 'heart-health', 'oil-free'],
  },
  {
    id: 'dr-campbell',
    label: 'Dr. T. Colin Campbell',
    title: 'Dr. T. Colin Campbell, PhD',
    summary:
      'Key insights from Dr. Campbell and The China Study on WFPB nutrition and chronic disease prevention.',
    tags: ['nutrition', 'campbell', 'china-study', 'research'],
  },
  {
    id: 'dr-goldner',
    label: 'Dr. Brooke Goldner, MD',
    title: 'Dr. Brooke Goldner, MD',
    summary:
      'Learn about Dr. Goldner’s Hyper Nourishing Healing Protocol and her plant-based approach to disease reversal.',
    tags: ['nutrition', 'goldner', 'healing-protocol', 'greens', 'disease-reversal'],
  },
  {
    id: 'foods',
    label: 'Why & How',
    title: 'Why & How: Your Plant-Powered Rebellion',
    summary:
      'Why WFPB matters and practical steps to start, from pantry basics to crowding out ultra-processed foods.',
    tags: ['nutrition', 'why', 'how', 'getting-started', 'plant-powered'],
  },
  {
    id: 'recipes',
    label: 'Recipes',
    title: 'Recipes',
    summary:
      'Browse plant-strong, oil-free recipes organized by category and tag to make WFPB living delicious and easy.',
    tags: ['nutrition', 'recipes', 'recipe', 'wfpb', 'meal'],
  },
];

