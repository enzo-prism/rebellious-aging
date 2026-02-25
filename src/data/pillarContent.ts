export interface PillarContent {
  title: string;
  description: string;
  quizTitle: string;
  quizDescription: string;
  checklistTitle: string;
  checklistUrl: string;
  galleryImages: Array<{
    src: string;
    description: string;
  }>;
}

export const pillarContent: Record<string, PillarContent> = {
  confidence: {
    title: "Confidence - A Rebel's Superpower",
    description: "Rebels don't shrink back, they rise up. Confidence in your 50's, 60's, 70's, 80's, and beyond is about knowing your worth, owning your story, and most importantly embracing the power of your wisdom. At Rebellious Aging we are here to help you silence the inner critic, shake off limiting, and outdated beliefs and reignite your self-assurance. This is your time to show up boldly, speak your truth, and radiate the kind of confidence that does NOT ask permission.",
    quizTitle: "The Confidence Self-Assessment",
    quizDescription: "Discover your current confidence level and receive personalized recommendations to build unshakeable self-assurance.",
    checklistTitle: "7-Day Confidence Boosting Checklist",
    checklistUrl: "https://drive.google.com/file/d/1DnpdOVC4Nih7w79CftOvbqgPgVJKw_LL/view?usp=sharing",
    galleryImages: [
      {
        src: "/lovable-uploads/de04437d-18b0-4eca-86c4-53077d082060.png",
        description: "Embrace your authentic self with confidence"
      },
      {
        src: "/lovable-uploads/80d36c2d-c6e2-4381-b9a9-60b9a000b58f.png",
        description: "Stand tall and own your power"
      },
      {
        src: "/lovable-uploads/8a5c92a9-a9f5-46c7-a24a-8c9ce5b620d2.png",
        description: "Radiate confidence from within"
      }
    ],
  },
  style: {
    title: "Style - Dazzle",
    description: "Style is not superficial—it is soulful, it is how you tell the world who you are without saying a word. Whether it is bright red lips, a daring scarf, or the perfect pair of vintage shoes and matching purse, style at Rebellious Aging is about expressing your true self—-bold, bright and unapologetically you. The time is now, so sparkle and shine with personality, play, panache and let your style dreams emerge.",
    quizTitle: "Discover Your Authentic Style Personality",
    quizDescription: "Take this quiz to uncover your unique style personality and learn how to express yourself authentically through fashion.",
    checklistTitle: "The Rebellious Style Essentials Checklist",
    checklistUrl: "https://drive.google.com/file/d/1oa-nYeacG8s1A0qABH86tO3A7f1gWK37/view?usp=sharing",
    galleryImages: [
      {
        src: "/lovable-uploads/17f809d1-a0f0-4a27-90d7-c993471f07de.png",
        description: "Elegant style with sophistication and grace"
      },
      {
        src: "/lovable-uploads/94ed8310-7c9b-41fe-8292-33065ffa56eb.png",
        description: "Bold fashion choices for the rebellious spirit"
      },
      {
        src: "/lovable-uploads/a624ace1-6dc9-4ab4-846c-176e441f514f.png",
        description: "Timeless elegance meets modern rebellion"
      }
    ],
  },
  health: {
    title: "Health - Nourish to Flourish",
    description: "You were not meant to slow down. You were meant to thrive. At Rebellious Aging, we encourage and embrace a Whole- Food, Plant- Based Lifestyle, as a delicious, empowering way to add healthy years to your life AND at the same time easily settle into your best weight and add life to your years. With every healthy bite you are fueling your body with vitality, managing weight naturally (no calorie counting and eating as much as you like) and taking care of your health in the most delicious way. Health isn't about living longer—-it is about living better, with purpose, authenticity, and sparkle",
    quizTitle: "The Health Lifestyle Assessment",
    quizDescription: "Evaluate your current lifestyle habits and receive a personalized roadmap to optimize your health span.",
    checklistTitle: "Daily Health Practices Checklist",
    checklistUrl: "https://drive.google.com/file/d/14pJU6bViyM1JWYx5iqvgl3l9kqd__wTY/view?usp=sharing",
    galleryImages: [
      {
        src: "/lovable-uploads/cf105833-6fd8-4909-9750-38675de6241b.png",
        description: "Essential nutrition guides for plant-based living"
      },
      {
        src: "/lovable-uploads/34efa388-151a-455e-b488-c2eab5762e90.png",
        description: "Nourishing whole foods for vibrant health"
      },
      {
        src: "/lovable-uploads/035da362-e4a4-4878-9f56-1bf7c28634b7.png",
        description: "Fresh ingredients for a thriving lifestyle"
      }
    ],
  },
};

export const suzChoiceContent = {
  recipes: [
    {
      title: "Rainbow Buddha Bowl",
      description: "A vibrant, nutrient-packed bowl with quinoa, roasted vegetables, and tahini dressing.",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
      category: "Main Dish"
    },
    {
      title: "Green Goddess Smoothie",
      description: "Energizing blend of spinach, banana, mango, and coconut water.",
      image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&h=300&fit=crop",
      category: "Smoothie"
    },
    {
      title: "Lentil Power Salad",
      description: "Protein-rich lentils with fresh herbs, vegetables, and lemon vinaigrette.",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
      category: "Salad"
    }
  ],
  books: [
    {
      title: "How Not to Die",
      author: "Dr. Michael Greger",
      description: "The revolutionary guide to the foods that prevent and reverse disease.",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop"
    },
    {
      title: "The Blue Zones",
      author: "Dan Buettner",
      description: "Lessons for living longer from the people who've lived the longest.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
    },
    {
      title: "Eat to Live",
      author: "Dr. Joel Fuhrman",
      description: "The amazing nutrient-rich program for fast and sustained weight loss.",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop"
    }
  ],
  videos: [
    {
      title: "Forks Over Knives",
      description: "Documentary examining the claim that most diseases can be controlled by rejecting animal-based foods.",
      image: "https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?w=400&h=300&fit=crop",
      type: "Documentary"
    },
    {
      title: "Game Changers",
      description: "Revolutionary documentary about plant-based eating and athletic performance.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      type: "Documentary"
    },
    {
      title: "What the Health",
      description: "Uncovers the secret to preventing and even reversing chronic diseases.",
      image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=300&fit=crop",
      type: "Documentary"
    }
  ]
};
