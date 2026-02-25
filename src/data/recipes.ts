export interface Recipe {
  id: number;
  title: string;
  description: string;
  servings: string;
  source: string;
  category: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  storageInstructions?: string;
  suzNotes?: string;
  prepTime?: string;
  totalTime?: string;
  cookTime?: string;
  freezeTime?: string;
  difficulty?: string;
  author?: string;
  notes?: string;
  ingredients: string[];
  instructions: string[];
  components?: Record<
    string,
    {
      title?: string;
      ingredients: string[];
      instructions?: string[];
    }
  >;
}

export const slugifyRecipeTitle = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export const recipes: Recipe[] = [
    {
      id: 1,
      title: 'Orange Mango Bean Salad',
      description: 'A refreshing and nutritious salad combining cannellini beans with tropical fruits and fresh mint.',
      servings: '4',
      source: 'Plant-Based Women Warriors Cookbook P. 157',
      category: 'salads',
      tags: ['Lunch', 'Oil-Free', 'Quick'],
      prepTime: '15 minutes',
      difficulty: 'Beginner',
      ingredients: [
        '15 ounces canned cannellini beans (about 1½ cups), canned navy beans, or cooked large lima beans drained and rinsed',
        '1-2 mangoes (about 1½ cups), peeled and diced',
        '2 navel oranges (about 1½ cups), peeled, sectioned, and cubed',
        '1-2 teaspoons minced jalapeño pepper',
        '2 teaspoons lime zest (from 1½ to 2 limes)',
        '¼ cup lime juice or more to taste',
        '2 tablespoons fresh mint, chopped',
        '5-6 cups of arugula or greens of choice'
      ],
      instructions: [
        'In a large bowl, combine the beans, mangoes, oranges, jalapeño, lime zest and juice, and mint.',
        'Taste to see if you need more lime juice.',
        'Arrange the arugula or greens of choice in the bottom of a wide bowl, add the bean mixture, and feast on a combination of such good taste.'
      ]
    },
    {
      id: 2,
      title: 'Kale and Red Cabbage Salad with Apples and Dried Cherries',
      description: 'A nutrient-dense salad by Dr. Joel Fuhrman featuring massaged kale and fresh fruits.',
      servings: '2+',
      source: 'By Dr. Joel Fuhrman',
      author: 'Dr. Joel Fuhrman',
      category: 'salads',
      tags: ['Lunch', 'Oil-Free', 'High-Protein'],
      prepTime: '10 minutes',
      difficulty: 'Beginner',
      ingredients: [
        '1 bunch kale, tough stems and center ribs removed',
        '1 avocado, peeled and chopped',
        '2 tablespoons lemon juice',
        '1 tablespoon of white balsamic vinegar',
        '1 cup thinly sliced red cabbage',
        '1 large apple, cored and chopped',
        '2 tablespoons chopped unsweetened, unsulfured dried cherries, blueberries or currants',
        '½ medium red onion, minced',
        '2 tablespoons chives, chopped'
      ],
      instructions: [
        'Roll up each kale leaf and slice thinly. Add to a large salad bowl with avocado, lemon juice and vinegar.',
        'Using your hands massage the avocado, lemon juice, and vinegar into the kale leaves until the kale starts to soften and wilt and each leaf is coated, about 2-3 minutes.',
        'Mix in red cabbage, apple, dried cherries, onion and chives.',
        'Note: If you have problems finding unsweetened, unsulfured cherries or blueberries, they can be ordered on-line.'
      ]
    },
    {
      id: 3,
      title: 'Big Bean Barley and Sweet Potato Soup',
      description: 'A hearty, company-worthy soup that\'s absolutely delicious and nutritious.',
      servings: '6',
      source: 'Plant-Based Woman Warrior Cookbook P. 143',
      category: 'soups',
      tags: ['Dinner', 'Budget-Friendly', 'High-Protein'],
      prepTime: '15 minutes',
      totalTime: '45 minutes',
      difficulty: 'Intermediate',
      notes: 'I am addicted to this soup. Deelish! Company worthy.',
      ingredients: [
        '1 cup sliced shallots (about 2 large) or one onion sliced',
        '4 cloves chopped garlic',
        '1 tablespoon minced fresh ginger',
        '1 teaspoon dried rosemary',
        '6 cups vegetable broth (low or no salt)',
        '1 large skin on sweet potato cubed into about ¾ inch pieces',
        '½ cup barley or farro',
        '⅛ teaspoon cayenne pepper',
        '2 cups cooked large lima beans or 15 ounces canned kidney beans drained and rinsed',
        '1 bunch greens of your choice, swiss chard, spinach, kale',
        '1 tablespoon maple syrup optional',
        '1 tablespoon white miso',
        '1 tablespoon balsamic vinegar'
      ],
      instructions: [
        'In a large pot over medium-high heat, add 2 tablespoons of water. Add the shallots or onion and cook until translucent, about 3 minutes, adding more water as needed.',
        'Stir in the garlic, ginger and rosemary and continue cooking for about 30 seconds.',
        'Add the vegetable broth, sweet potato, barley, and cayenne pepper and bring just to a boil.',
        'Reduce the heat to a simmer and cook partially covered, 15-20 minutes, until the sweet potato is tender.',
        'Add the lima beans, swiss chard or greens of choice, maple syrup (if using) and cook for about 3 minutes, until the greens begin to soften.',
        'In a small bowl, place some of the soup liquid and stir in the miso. Add this mix to the pot and also stir in the balsamic vinegar.',
        'I am addicted to this soup. Deelish! Company worthy.'
      ]
    },
    {
      id: 4,
      title: 'Blueberry Muffins',
      description: 'Heart-healthy muffins from "Prevent and Reverse Heart Disease" - perfect for breakfast or snacks.',
      servings: '8-10 muffins',
      source: '"Prevent and Reverse Heart Disease" P. 133',
      category: 'baked',
      tags: ['Breakfast', 'Dessert', 'Oil-Free'],
      prepTime: '10 minutes',
      totalTime: '35 minutes',
      difficulty: 'Beginner',
      ingredients: [
        '1 cup whole wheat flour',
        '1 cup oat flour',
        '½ teaspoon baking powder',
        '½ teaspoon baking soda',
        '1 teaspoon ground cinnamon',
        '½ ground nutmeg',
        '¼ or less cup of maple syrup',
        '½ cup unsweetened applesauce',
        '2 teaspoons vanilla extract',
        '1 cup oat milk',
        '1 cup blueberries, fresh or frozen (If you can find them wild blueberries are wonderful)'
      ],
      instructions: [
        'Preheat oven to 400 degrees.',
        'Mix the first 6 ingredients in a large bowl.',
        'Place remaining ingredients in the center.',
        'Carefully fold from center to outside until all ingredients are blended. DO NOT OVER STIR.',
        'Spoon batter into a nonstick muffin pan. Makes 8-10 muffins.',
        'Bake for 25 minutes, or until the tops are brown and the toothpick is clean. Do not overbake.'
      ]
    },
    {
      id: 5,
      title: '3-2-1 Salad Dressing',
      description: 'A simple and delicious oil-free salad dressing by Jane and Anne Esselstyn.',
      servings: 'Several servings',
      source: 'Jane and Anne Esselstyn',
      author: 'Jane and Anne Esselstyn',
      category: 'dressings',
      tags: ['Quick', 'Oil-Free'],
      prepTime: '2 minutes',
      difficulty: 'Beginner',
      ingredients: [
        '3 tablespoons balsamic vinegar',
        '2 tablespoons of Dijon mustard',
        '1 tablespoon of maple syrup'
      ],
      instructions: [
        'Whisk the ingredients in a bowl or place in a jar and shake until smooth.',
        'Makes several servings.'
      ]
    },
    {
      id: 6,
      title: 'Mint Chocolate Mousse Torte',
      description: 'A healthier version of the Frango Mint Pie - elegant, dense, rich, and absolutely delicious. Perfect for entertaining.',
      author: 'Chef AJ',
      servings: '12+',
      source: '"unprocessed" Revitalize Your Health With Whole Foods by Chef AJ, page 132',
      prepTime: '30 minutes',
      freezeTime: '4+ hours',
      totalTime: '4+ hours 30 minutes',
      difficulty: 'Intermediate',
      category: 'desserts',
      tags: ['Dessert', 'No-Bake', 'Make-Ahead', 'Special Occasion', 'Raw', 'Oil-Free', 'Gluten-Free'],
      storageInstructions: 'Keeps well in the freezer. Can be made several days before an event.',
      notes: 'This is my "go to" recipe when I entertain. It always turns out great and is deelish, elegant, dense and rich. I have served 12 and still had leftovers.',
      ingredients: [],
      instructions: [],
      components: {
        filling: {
          ingredients: [
            '16 ounces of pitted dried dates',
            '2 cups unsweetened nondairy milk',
            '1 tablespoon alcohol-free vanilla extract, or 1 teaspoon vanilla powder',
            '1-2 teaspoons peppermint extract (depending on how minty you like it)',
            '½ cup of cocoa powder or carob powder',
            '12 ounces of walnuts',
            '½ cup unsweetened coconut'
          ],
          instructions: [
            'Soak the dates in the nondairy milk.',
            'Process the soaked dates with the vanilla and peppermint extract in a food processor, fitted with an "S" blade until very smooth.',
            'Add the cocoa powder and process again until smooth, then place the entire mixture in a bowl.',
            'In the same processor bowl, process the 12 ounces of walnuts until like nut butter.',
            'Add the coconut and process again.',
            'Add to the date mixture and combine the ingredients by hand until completely incorporated.'
          ]
        },
        crust: {
          ingredients: [
            '2 cups raw walnuts',
            '¼ cup cocoa powder or carob powder',
            '2 cups pitted dates',
            '1 tablespoon alcohol-free vanilla or 1 teaspoon vanilla powder',
            '1 teaspoon peppermint extract'
          ],
          instructions: [
            'Process the 2 cups of walnuts with the cocoa or carob powder in a food processor fitted with an "S" blade. Do NOT over process or you will have nut butter.',
            'Add the two cups of dates, a few at a time, until the mixture holds together and you can easily roll it into a ball.',
            'Add the vanilla and peppermint extracts and process again briefly.',
            'Press the crust into an 8 or 9 inch springform pan.'
          ]
        },
        garnish: {
          ingredients: [
            '½ cup cacao nibs (optional)',
            'Fresh mint leaves',
            'Fresh raspberries'
          ],
          instructions: [
            'Spread the filling over the crust.',
            'Garnish with cacao nibs if desired.',
            'Freeze until solid.',
            'Serve with a beautiful mint leaf and fresh raspberries.'
          ]
        }
      }
    },
    {
      id: 7,
      title: 'Lo Mein Noodle Sauce',
      description: 'A healthy version of lo mein sauce with toasted sesame seeds and walnuts, perfect with brown rice noodles.',
      author: 'Rip Esselstyn',
      servings: '1½ cups',
      source: 'plantstrong.com',
      category: 'soups',
      tags: ['Dinner', 'Quick', 'Oil-Free'],
      prepTime: '10 minutes',
      difficulty: 'Beginner',
      notes: 'I serve with Brown Rice Noodles. You can purchase noodles online or at Whole Foods. Delicious. - Suz',
      ingredients: [
        '⅓ cup sesame seeds toasted in a DRY skillet, until lightly browned and fragrant',
        '⅓ to ½ cup walnuts',
        '⅓ cup low-sodium tamari',
        '⅓ cup 100% pure maple syrup',
        '1 tablespoon minced fresh ginger',
        '2 tablespoons water',
        '½ teaspoon sriracha, or more to taste (OPTIONAL)'
      ],
      instructions: [
        'In a food processor or high speed blender, combine all ingredients and blend until smooth and uniform in texture.'
      ]
    },
    {
      id: 8,
      title: 'McDougall Wellness Soup',
      description: 'A nourishing vegetable soup with nutritional yeast and seasonings, perfect for a comforting meal.',
      author: 'Mary McDougall',
      servings: '6-8',
      source: 'mcdougall.com',
      category: 'soups',
      tags: ['Dinner', 'Budget-Friendly', 'Oil-Free'],
      prepTime: '10 minutes',
      totalTime: '45 minutes',
      difficulty: 'Beginner',
      notes: 'I use 8 cups broth, 4 tablespoons nutritional yeast, and add a tablespoon of allspice and spinach and arugula at the end. - Suz',
      ingredients: [
        '1 onion, chopped',
        '6 cups veg broth (I use 8 cups)',
        '2 carrots, sliced',
        '2 cups red potatoes, cubed',
        '2 tablespoons Nutritional Yeast (I use 4 tablespoons)',
        '2 teaspoons soy sauce (optional)',
        '½ teaspoon marjoram',
        '½ teaspoon sage',
        '¼ teaspoon thyme',
        'Several twists of fresh ground pepper',
        '2 cups broccoli florets',
        '2 cups cauliflower'
      ],
      instructions: [
        'Place the onion and ¼ cup of the broth in a large pot.',
        'Cook, stirring frequently, until the onion softens, about 2-3 minutes.',
        'Add remaining broth and the carrots and potatoes, nutritional yeast, soy sauce and seasonings.',
        'Bring to a boil, reduce heat, cover and cook for 20 minutes.',
        'Add broccoli and cauliflower and continue to cook another 20 minutes.'
      ]
    },
    {
      id: 9,
      title: 'Hummus',
      description: 'A classic hummus recipe with chickpeas, tahini, and aquafaba for the perfect creamy texture.',
      author: 'Ann and Jane Esselstyn',
      servings: '1¼ cups',
      source: 'Ann and Jane Esselstyn',
      category: 'appetizers',
      tags: ['Snack', 'Quick', 'Oil-Free', 'High-Protein'],
      prepTime: '5 minutes',
      difficulty: 'Beginner',
      storageInstructions: 'Store in a sealed container in the fridge for up to 5 days.',
      ingredients: [
        '15 oz canned low or no salt chickpeas (reserve aquafaba)',
        '2 cloves garlic or to taste',
        '2 tablespoons lemon juice',
        '1-2 tablespoons low sodium tamari',
        '2 tablespoons tahini, optional',
        '¼ teaspoon cumin',
        '2 squirts hot sauce',
        '¼-½ cup aquafaba, the reserved chickpea liquid'
      ],
      instructions: [
        'In a food processor or high speed blender, place garlic, lemon juice, tamari, tahini (if using), cumin and ¼ cup more of aquafaba until the hummus is a desired consistency.'
      ]
    },
    {
      id: 10,
      title: 'Five Ingredient Veggie Burger',
      description: 'Simple black bean burgers with only five main ingredients, perfect for a quick and satisfying meal.',
      author: 'Forks Over Knives',
      servings: '4 burgers',
      source: 'Forks Over Knives',
      category: 'mains',
      tags: ['Lunch', 'Dinner', 'High-Protein', 'Quick'],
      prepTime: '15 minutes',
      totalTime: '35 minutes',
      difficulty: 'Beginner',
      ingredients: [
        '2 cups no salt added black beans, drained and liquid reserved',
        '1 medium onion-quartered',
        '½ cup quick cooking rolled oats',
        '1 tablespoon lime juice',
        '2 teaspoons chile powder',
        'Salt and pepper',
        '4 100% whole wheat hamburger buns, split and toasted',
        'Romaine lettuce',
        '1 large tomato sliced',
        '4 red onion slices',
        'Condiments of your choosing'
      ],
      instructions: [
        'In a food processor combine the first 5 ingredients through chili powder. Pulse until chunky but NOT pureed.',
        'Add a small amount of reserved bean liquid, if the mixture seems dry or is not sticking together. The mixture should be moist but NOT wet. Season with S&P.',
        'With wet hands, shape mixture into four 3½ inch patties. Chill at least 20 minutes.',
        'In a large nonstick skillet cook burgers over medium-high heat for 8-10 minutes or until burgers are lightly browned and cooked through, turning only once.',
        'Serve burgers on hamburger buns of your choice.',
        'Add lettuce, tomato, and onion slices and condiments if using.'
      ]
    },
    {
      id: 11,
      title: 'Spinach and Avocado Dip',
      description: 'A delicious and nutritious dip with spinach, avocado, and seasonings - perfect with fresh veggies or chips.',
      servings: '4-6',
      source: 'Unknown (but it is deeelish! - Suz)',
      category: 'appetizers',
      tags: ['Snack', 'Quick', 'Oil-Free', 'Raw'],
      prepTime: '5 minutes',
      difficulty: 'Beginner',
      ingredients: [
        '2 cups baby spinach',
        '1 avocado, cut in chunks',
        '2 tablespoons flat leaf parsley, chopped',
        '1 tablespoon lemon juice',
        '1 tablespoon nutritional yeast',
        '¼ teaspoon ground cumin',
        '1 garlic clove chopped or grated',
        '1 pinch of chili flakes',
        'Salt and pepper (optional)',
        'Fresh cut veggies or tortilla chips'
      ],
      instructions: [
        'In a food processor pulse together the spinach, avocado, parsley, lemon juice, nutritional yeast, cumin, garlic and chili flakes until somewhat smooth but still chunky, about 20 seconds.',
        'Use a spatula to scrape it down and pulse again.',
        'Transfer to a mixing bowl, season with salt and pepper and mix.',
        'Serve with freshly cut veggies or tortilla chips.'
      ]
    },
    {
      id: 12,
      title: 'Super Salad',
      description: 'Dr. Esselstyn\'s favorite superfood salad with kale, Napa cabbage, and Jane\'s 3-2-1 dressing.',
      author: 'Ann Esselstyn',
      servings: '4-6',
      source: 'Ann Esselstyn',
      category: 'salads',
      tags: ['Lunch', 'Oil-Free', 'High-Protein', 'Raw'],
      prepTime: '15 minutes',
      difficulty: 'Beginner',
      notes: 'A favorite of Dr. Esselstyn',
      ingredients: [
        '1½ bunches of kale, leaves stripped of spines, chopped in fine strips (almost like ribbons)',
        '½ head of Napa cabbage, finely shredded or chopped',
        '¼ red onion, thinly sliced',
        '½ cup grape tomatoes, halved',
        '3-4 carrots, peeled and grated',
        '1 cup raw edamame, shelled',
        '1 cup blueberries',
        '½ cup red pepper chopped'
      ],
      instructions: [
        'Combine all ingredients and toss with your favorite dressing.',
        'Or try Jane Esselstyn\'s family favorite 3-2-1 dressing.'
      ],
      components: {
        dressing: {
          ingredients: [
            '3 tablespoons of balsamic vinegar',
            '2 tablespoons mustard of choice',
            '1 tablespoon maple syrup'
          ],
          instructions: [
            'Mix all ingredients in a small bowl and whisk until smooth.'
          ]
        }
      }
    },
    {
      id: 13,
      title: 'Vegan Cabbage Soup',
      description: 'A light, flavorful detoxing soup that comes together in less than 40 minutes using simple WFPB ingredients.',
      author: 'plantyou.com',
      servings: '6',
      source: 'plantyou.com',
      category: 'soups',
      tags: ['Dinner', 'Budget-Friendly', 'Oil-Free', 'High-Protein'],
      prepTime: '15 minutes',
      totalTime: '40 minutes',
      difficulty: 'Beginner',
      notes: 'I have added ¼ lb. of mushrooms, 1 tablespoon of allspice, 1 extra onion, 1 extra can of tomatoes and 2 handfuls of baby kale. It is deelish either way. - Suz',
      ingredients: [
        '4 cloves garlic',
        '4 yukon gold potatoes',
        '2 carrots, diced',
        '2 stalks celery, diced',
        '1 yellow onion, diced',
        '1 tsp. ginger',
        '1½ tsp. garlic powder',
        '8 cups vegetable broth',
        '1½ cups diced canned tomatoes',
        '½ cup green cabbage finely chopped',
        '500 grams extra firm tofu pressed and chopped'
      ],
      instructions: [
        'Add garlic and onion to a pot over medium heat and cook until translucent, approximately 3 minutes.',
        'Add the potatoes, carrots, celery and spices to the pot, stir and cook for an additional 5 minutes, until soft.',
        'Add the vegetable broth, diced tomatoes and cabbage to the pot. Bring to a boil, then simmer for 25 minutes until everything is cooked through.',
        'Add the tofu in the end, if using.'
      ]
    },
    {
      id: 14,
      title: 'Sweet Holy Deliciousness Soup',
      description: 'A comforting soup with lentils, sweet potatoes, and kale that can be served over whole grains.',
      author: 'Rip Esselstyn',
      servings: '6-8',
      source: 'plantstrong.com',
      category: 'soups',
      tags: ['Dinner', 'High-Protein', 'Oil-Free'],
      prepTime: '15 minutes',
      totalTime: '30 minutes',
      difficulty: 'Beginner',
      notes: 'Suz substitutions were for convenience only. I love this soup. - Suz',
      ingredients: [
        '2 large onions, chopped',
        '6 large garlic cloves, chopped',
        '2 pinches crushed red pepper flakes',
        '½ teaspoon ground turmeric',
        '1 teaspoon garam masala (I substituted allspice)',
        '6 cups low sodium vegetable broth',
        '1 cup dried red lentils (I used green lentils)',
        '2 large sweet potatoes, peeled and cut into cubes',
        '2 bunches kale or greens of choice, stripped and spines discarded and cut into bite-sized pieces (I used kale and arugula)',
        'Freshly ground black pepper to taste'
      ],
      instructions: [
        'In a soup pot, water, stir fry the onions and garlic for a few minutes, until the onions are limp. Add the pepper flakes, turmeric and garam masala and stir to coat the onions and garlic.',
        'Add the vegetable broth and lentils and bring to a boil.',
        'Decrease the heat to low, cover and simmer until the lentils are fully cooked and the sweet potatoes are tender, about 5-10 minutes.',
        'Add the kale and cook 5 minutes more, or until the kale is soft.',
        'Season with black pepper to taste.',
        'Serve on its own or over a mound of cooked whole grains.'
      ]
    },
    {
      id: 15,
      title: 'Suz\'s Polish Babcia\'s Noodle Soup',
      description: 'A comforting vegan noodle soup with Suz\'s personal Polish touches that tastes like "chicken" noodle soup.',
      author: 'Heather McDougall (with Suz\'s modifications)',
      servings: '8-10 cups',
      source: 'forksoverknives.com/recipes/ and drmcdougall.com',
      category: 'soups',
      tags: ['Dinner', 'Budget-Friendly', 'Oil-Free'],
      prepTime: '20 minutes',
      totalTime: '60 minutes',
      difficulty: 'Beginner',
      notes: 'This luscious vegan noodle soup tastes like comfort in a bowl and an awful lot like "chicken" noodle soup!',
      ingredients: [
        '1 cup chopped onion',
        '1 cup chopped celery',
        '1 cup chopped carrots',
        '6 cups vegetable stock',
        '1 teaspoon low-sodium tamari or soy sauce',
        '½ teaspoon dried marjoram, crushed',
        '½ teaspoon dried thyme, crushed',
        'Freshly ground black pepper',
        '3 cups dried brown rice fettuccine noodles or whole wheat pasta broken'
      ],
      instructions: [
        'Combine the onion, celery, carrots, stock, tamari, marjoram, sage, thyme and pepper in a 4qt Dutch oven. Bring to boil over high heat.',
        'Reduce heat to medium-low; cover and simmer for 20 minutes.',
        'Stir in noodles; return to a boil. Cook for 10 minutes more or until noodles are tender.'
      ],
      components: {
        suzAdjustments: {
          ingredients: [
            'Whole onion for braising',
            'Plant Strong broth',
            '1-2 Tablespoons low sodium tamari',
            '1 teaspoon of Turmeric for color',
            '1 tablespoon of whole allspice',
            'Pad Thai noodles (cooked separately)',
            'Fresh chopped parsley'
          ],
          instructions: [
            'Braise the whole onion on all sides on the stove top burner. Then cut in quarters or eighths and drop in the soup pot.',
            'Use really good veg stock (I use Plant Strong broth.)',
            'Add extra tamari and turmeric for color and flavor.',
            'Add allspice and fresh parsley while cooking.',
            'Cook noodles separately and add to serving bowls.'
          ]
        }
      }
    },
    {
      id: 16,
      title: 'No Tuna Salad Sandwich',
      description: 'A vegan version of tuna salad using chickpeas with extra tang and flavor from pickles and capers.',
      author: 'Diana Shultz (Minimalist Baker\'s Everyday Cooking)',
      servings: '4 sandwiches',
      source: 'Forks Over Knives/Minimalist Baker\'s Everyday Cooking',
      category: 'mains',
      tags: ['Lunch', 'High-Protein', 'Quick', 'Oil-Free'],
      prepTime: '15 minutes',
      difficulty: 'Beginner',
      ingredients: [
        '1 (15 oz) can chickpeas, rinsed and drained',
        '3 tablespoons tahini',
        '1 teaspoon Dijon or mustard of choice',
        '1 tablespoon maple syrup',
        '¼ cup diced red onions',
        '¼ diced celery',
        '¼ diced pickle',
        '1 teaspoon capers drained and loosely chopped',
        'Salt and pepper',
        '1 tablespoon roasted unsalted sunflower seeds (optional)',
        '8 slices whole grain bread',
        'Mustard',
        'Romaine Lettuce',
        'Tomato, sliced',
        'Red onion sliced'
      ],
      instructions: [
        'Place the chickpeas in a bowl and mash with a fork, leaving a few beans whole.',
        'Add tahini, mustard, maple syrup, red onion, celery, pickle, capers, S&P and sunflower seeds if using. Mix to incorporate.',
        'Taste and adjust seasonings as needed.',
        'Toast bread as desired and prepare any other sandwich toppings such as lettuce, tomato, onion, avocado.',
        'Scoop a healthy amount of the mixture (about ½ cup) onto one slice of bread. Add desired toppings and top with a second slice and repeat the process for additional sandwiches.'
      ],
      suzNotes: "I like to add sunflower seeds for extra crunch and nutrition."
    },
    {
      id: 17,
      title: "Vegan Taco Bowl",
      description: "A colorful and nutritious taco bowl with seasoned tofu, fresh vegetables, and a creamy yogurt-based dressing.",
      author: "plantyou.com",
      servings: "4",
      source: "plantyou.com",
      prepTime: "30 minutes",
      difficulty: "Beginner",
      category: 'mains',
      tags: ["Dinner", "Mexican", "Bowl", "Protein-Rich"],
      ingredients: [
        "1½ cups Mexican Rice",
        "1 avocado, stoned, peeled and diced",
        "1 cup cilantro finely chopped",
        "2 tomatoes, diced",
        "1 red onion diced",
        "1 cup black beans drained and rinsed",
        "1 pack firm tofu grated",
        "1 packet taco seasoning"
      ],
      components: {
        dressing: {
          title: "Dressing",
          ingredients: [
            "1 cup unsweetened vegan yogurt",
            "¾ teaspoon paprika",
            "¾ teaspoon chili powder",
            "1 teaspoon onion powder",
            "1 teaspoon garlic powder",
            "1 teaspoon apple cider vinegar",
            "½ teaspoon ground cumin"
          ]
        }
      },
      instructions: [
        "Toss tofu with seasoning.",
        "Spread it on a lined baking sheet and bake at 375 for 15 minutes.",
        "Prep the rest of the ingredients and add them to a bowl.",
        "Whisk all of the dressing ingredients together in a bowl.",
        "Once the grated tofu is ready, add it to the ingredient bowl, pour in the dressing and serve immediately."
      ],
      suzNotes: "I have doubled the apple cider vinegar, added 1 teaspoon Maple syrup, bake tofu at 400 but watch closely. I serve this on a bed of chopped Romaine lettuce. I offer additions of sliced avocado, chopped onions, chopped cilantro, salsa, guac and tortilla chips."
    },
    {
      id: 18,
      title: "Raw Blueberry Cheesecake",
      description: "An elegant raw dessert with a nutty oat crust and creamy cashew-blueberry filling that's naturally sweetened.",
      author: "Chef AJ (chefaj.com)",
      servings: "8",
      prepTime: "30 minutes (plus 4-6 hours soaking)",
      difficulty: "Intermediate",
      category: 'desserts',
      tags: ["Dessert", "Raw", "No-Bake", "Vegan", "Elegant"],
      ingredients: [],
      components: {
        crust: {
          title: "Crust",
          ingredients: [
            "2 cups oats (if you are strictly following a raw food diet use sprouted oats)",
            "12 oz. dates about 2 cups",
            "1 Tbsp. cinnamon",
            "1 tsp. Vanilla powder"
          ],
          instructions: [
            "In a food processor fitted with an 'S' blade, process the oats, cinnamon and vanilla bean powder into a flour-like consistency.",
            "Add the pitted dates and continue processing until the food processor starts to form a ball, and the ingredients are fully combined.",
            "Empty the food processor into a cheesecake pan and press the dough evenly on the bottom."
          ]
        },
        filling: {
          title: "Filling",
          ingredients: [
            "3 cups frozen wild blueberries defrosted",
            "12 oz. dates about 2 cups", 
            "3 cups raw cashews soaked",
            "1 cup unsweetened non dairy milk",
            "¼ cup lemon juice"
          ],
          instructions: [
            "Soak cashews for at least 4-6 hours to achieve a super smooth and creamy filling.",
            "Drain and rinse the cashews.",
            "In a food processor fitted with the 'S' blade, process the cashews until smooth then add the dates and process again.",
            "Add the remaining ingredients and process until smooth."
          ]
        }
      },
      instructions: [
        "Pour filling evenly over the crust.",
        "Sprinkle the top with unsweetened coconut, if desired.",
        "Place in freezer until firm"
      ],
      suzNotes: "I have not made this recipe (I typically only include recipes I have made.) That being said, I have tasted this and it is delicious. I have not tried a ChefAJ dessert I have not loved.",
      notes: "Soak The cashews: Be sure to soak your cashews for at least 4-6 hours to achieve a super smooth and creamy filling. Make Ahead: This cheesecake freezes beautifully, so you can make it in advance and have a ready-to-serve dessert for any occasion. Topping Ideas: For extra flavor and texture, sprinkle the top with unsweetened coconut, or add fresh berries for a pop of color. Enjoy, Suz",
      source: "Chef AJ chefaj.com",
      storageInstructions: "Store in freezer until ready to serve. Can be made in advance and frozen for up to 3 months."
    },
    {
      id: 19,
      title: "Avocado Black Bean Corn Salad",
      description: "A fresh and vibrant salad combining black beans, corn, tomatoes, and avocado with a zesty lime dressing.",
      author: "Melissa Huggins (veganhuggs.com)",
      servings: "6",
      source: "Melissa Huggins (veganhuggs.com)",
      prepTime: "20 minutes",
      difficulty: "Beginner",
      category: 'salads',
      tags: ["Salad", "Fresh", "Mexican", "Quick"],
      ingredients: [
        "2 15 oz cans black beans, rinsed and drained",
        "2 avocados, seeded and cubed",
        "2 cups corn, fresh or frozen (thawed)",
        "2 cups cherry tomatoes, halved",
        "½ cup diced red onion",
        "⅓ cup cilantro, rough chopped"
      ],
      components: {
        dressing: {
          title: "Dressing",
          ingredients: [
            "⅓ cup fresh lime juice",
            "3 tablespoons olive oil (I leave out)",
            "1 teaspoon maple syrup (any sweetener)",
            "2 tablespoons fresh cilantro, finely chopped",
            "½ teaspoon granulated garlic",
            "½ teaspoon chili powder",
            "1 teaspoon sea salt (I leave out)",
            "Ground pepper to taste"
          ]
        }
      },
      instructions: [
        "In a small bowl, whisk the lime juice, olive oil, sweetener of choice, cilantro, chili powder, granulated garlic, salt and pepper.",
        "Place all veggies in a large bowl (except the avocado) and pour the dressing over them. Toss gently to combine well.",
        "Add the avocado on top and toss gently or just leave them on top. Taste for seasoning and add more if needed.",
        "Serve immediately with fresh pita bread, tortilla chips or a side of rice."
      ],
      suzNotes: "Avocados that are just ripe work the best and will not get mushy in the salad. Squeeze a little lime on the fresh cut avocado to reduce browning. To keep the salad looking vibrant, toss with the dressing, tomatoes, and avocado just before serving."
    },
    {
      id: 20,
      title: "Avocado Caprese Salad",
      description: "A twist on the classic Caprese salad, substituting avocado for mozzarella with fresh tomatoes and basil.",
      author: "Recipe source unclear",
      servings: "4",
      source: "Recipe source unclear",
      prepTime: "15 minutes",
      difficulty: "Beginner",
      category: 'salads',
      tags: ["Salad", "Fresh", "Italian", "Quick", "Elegant"],
      ingredients: [
        "3 large heirloom tomatoes",
        "2 medium-sized avocados",
        "½ cup fresh basil",
        "1-2 tsp. Extra virgin olive oil (optional, I leave out)",
        "Sea salt and pepper to taste"
      ],
      instructions: [
        "Cut the tomatoes into thick discs and set aside.",
        "Cut the avocado across the middle (not lengthways) and remove the pit.",
        "Peel off the skin and cut into discs, about the same thickness as the tomato.",
        "Arrange the tomato slices on a plate or platter and top with avocado.",
        "Place a basil leaf on each, then drizzle with lemon juice and optional olive oil.",
        "Season as desired and serve immediately."
      ],
      suzNotes: "Instead of the EVOO I used a bit of Balsamic Glaze. I marked this recipe, deelish/ easy peasey/ shows well. A great source for deelish SOS free balsamic vinegars is California Balsamics. californiabalsamics.com. Show stoppers for sure."
    },
    {
      id: 21,
      title: "Marinara Sauce",
      description: "Mary McDougall's simple and healthy marinara sauce that's been a family favorite for over thirty years.",
      author: "Mary McDougall (drmcdougall.com)",
      servings: "Makes about 4 cups",
      source: "Mary McDougall (drmcdougall.com)",
      prepTime: "20 min prep, 60 min cook",
      difficulty: "Beginner",
      category: 'mains',
      tags: ["Sauce", "Italian", "Base Recipe", "Make-Ahead"],
      ingredients: [
        "2 Tbsp water",
        "2 onions, chopped",
        "4 cloves garlic, crushed",
        "½ pound mushrooms, chopped",
        "2-15 ounce cans tomato sauce",
        "15 ounce can chopped tomatoes",
        "1½ Tbsp parsley flakes",
        "2 tsp oregano",
        "1 tsp basil",
        "Dash of salt, if desired"
      ],
      instructions: [
        "Place the water, onions, garlic and mushrooms in a large pot.",
        "Cook, stirring frequently, until onions soften and begin to take on a golden color, about 10 minutes.",
        "Stir in remaining ingredients.",
        "Bring to a boil, reduce heat and simmer for about 1 hour, stirring occasionally. DO NOT COVER.",
        "Serve over your choice of pasta."
      ],
       suzNotes: "This is simple, healthy and really tasty. This may be made ahead and reheated. It also freezes well."
    },
    {
      id: 28,
      title: 'Jalapeño and Corn Muffins',
      author: 'Prevent and Reverse Heart Disease Cookbook',
      description: 'Savory muffins packed with vegetables, jalapeños, and corn - perfect for breakfast or as a side dish.',
      servings: '12 muffins',
      source: 'Prevent and Reverse Heart Disease Cookbook',
      category: 'baked',
      tags: ['savory', 'muffins', 'vegetables', 'spicy', 'oil-free'],
      prepTime: '40 mins',
      difficulty: 'Medium',
      ingredients: [
        '1 cup diced onions',
        '1 jalapeño (seeded and diced)',
        '2 cups kale (stems removed, leaves chopped small)',
        '¾ cup fresh or frozen corn',
        '1 cup cornmeal',
        '1 cup white whole wheat flour or oat flour',
        '1 tsp baking soda',
        '½ cup unsweetened oat milk',
        '¼ cup unsweetened applesauce',
        '3 tbsp pure maple syrup',
        '1 cup salsa'
      ],
      instructions: [
        'Preheat oven to 400°F.',
        'In a frying pan, cook the onion, jalapeño, kale, and corn over medium-high heat for 5 minutes, or until vegetables are cooked through.',
        'Add a teaspoon or two of water if the pan gets dry. Set aside to cool.',
        'In a large bowl, combine cornmeal, flour, and baking soda.',
        'Add oat milk, applesauce, and maple syrup to the dry ingredients and stir to combine.',
        'Add the cooked vegetables and salsa to the batter and stir until well mixed.',
        'Divide batter evenly among the wells of a standard muffin tin.',
        'Bake for 25-28 minutes or until tops are golden and a toothpick comes out clean.',
        'Serve hot for best flavor.'
      ]
    },
    {
      id: 29,
      title: 'Vegan Banana Bread',
      author: 'Jill Dalton',
      description: 'A wholesome banana bread made with oat flour and flax seeds - perfectly moist and naturally sweetened.',
      servings: '8 slices',
      source: 'Jill Dalton',
      category: 'baked',
      tags: ['bread', 'banana', 'oil-free', 'whole-grain', 'breakfast'],
      prepTime: '50 mins',
      difficulty: 'Easy',
      ingredients: [
        '2 tbsp flax seed powder',
        '6 tbsp water',
        '2 cups organic rolled oats (ground into flour)',
        '3 bananas (preferably overripe)',
        '1 tsp baking powder',
        '½ tsp baking soda',
        '1 tsp cinnamon',
        '¼ cup dates (finely chopped)',
        '1-2 tbsp sesame seeds (optional)'
      ],
      instructions: [
        'Preheat oven to 375°F.',
        'Mix flax seed powder with water and let sit for 5 minutes to thicken.',
        'Mash bananas well in a separate bowl.',
        'Combine the flax mixture with the mashed bananas.',
        'In a large mixing bowl, combine all dry ingredients (oat flour, baking powder, baking soda, cinnamon, and chopped dates).',
        'Blend the flax/banana mixture into the flour mixture until well combined.',
        'Pour the mixture into a silicone bread pan or parchment-lined bread pan.',
        'Sprinkle sesame seeds on top if using.',
        'Bake for 35-40 minutes or until a toothpick inserted in center comes out clean.',
        'Let cool before slicing.'
      ]
    },
    {
      id: 30,
      title: "Chef Aj's Oatmeal Cookies",
      author: 'Chef AJ',
      description: 'Simple and healthy oatmeal cookies made with just 4 ingredients - no oil, sugar, or flour needed!',
      servings: '24 cookies',
      source: 'Chef AJ',
      category: 'desserts',
      tags: ['dessert', 'cookies', 'oil-free', 'sugar-free', 'simple'],
      prepTime: '45 mins',
      difficulty: 'Easy',
      ingredients: [
        '4 very ripe bananas',
        '3½ cups old fashioned oats',
        '1 tablespoon cinnamon',
        '½ teaspoon vanilla powder or extract',
        'Raisins (optional)'
      ],
      instructions: [
        'Preheat oven to 350°F.',
        'Mash the bananas until smooth.',
        'Stir in the oats, cinnamon, and vanilla (add raisins if desired).',
        'Use a retractable cookie scoop to portion the batter onto a silicone baking mat on a cookie sheet.',
        'Bake for 30 minutes or until tops are not sticky.',
        'Gently flip cookies over and bake an additional 10 minutes.',
        'Let cool completely before serving.'
      ]
    },
    {
      id: 31,
      title: 'Vegan Peanut Butter Cup Blizzard',
      author: 'Jill Dalton - planbasedcookingshow.com',
      description: 'A delicious frozen treat that combines peanut butter crumbles with chocolate nice cream for the perfect healthy dessert.',
      servings: '3',
      source: 'Jill Dalton - planbasedcookingshow.com',
      category: 'desserts',
      tags: ['dessert', 'frozen', 'chocolate', 'peanut-butter', 'no-bake'],
      prepTime: '15 mins',
      difficulty: 'Medium',
      ingredients: [],
      instructions: [],
      storageInstructions: 'Keep extra crumbles in the fridge to use for your next blizzard.',
      components: {
        crumbles: {
          title: 'Crumbles',
          ingredients: [
            '1½ cups dates',
            '1 tsp vanilla',
            '1 cup almond meal or raw almonds', 
            '½ cup peanut butter'
          ],
          instructions: [
            'Mix all crumble ingredients together in a food processor or blender until combined.'
          ]
        },
        niceCream: {
          title: 'Nice Cream',
          ingredients: [
            '4 frozen bananas',
            '1 tsp vanilla',
            '4 tbsp cocoa powder (or less to taste)',
            '1 cup unsweetened almond milk or plant milk of choice'
          ],
          instructions: [
            'Blend all nice cream ingredients together in a blender until smooth.'
          ]
        },
        assembly: {
          title: 'Assembly',
          ingredients: [],
          instructions: [
            'Scoop a layer of nice cream into the bottom of a cup or glass.',
            'Sprinkle chunks of crumbles over the nice cream.',
            'Add another layer of nice cream.',
            'Top with more crumbles and enjoy immediately.'
          ]
        }
      }
    },
    {
      id: 32,
      title: "Ann's Open Faced Twice Baked Potatoes",
      author: 'Ann',
      description: 'Delicious twice-baked potatoes loaded with nutritional yeast, kale, and a savory onion-garlic mixture.',
      servings: '4-6',
      source: '"Be a Plant Based Woman Warrior" page 263',
      category: 'mains',
      tags: ['Dinner', 'Oil-Free', 'Make-Ahead'],
      prepTime: '20 minutes',
      totalTime: '1 hour 30 minutes',
      difficulty: 'Intermediate',
      ingredients: [
        '1 large Japanese sweet potato',
        '6 medium Yukon Gold potatoes',
        '1 large sweet onion, cut into 8 chunks',
        '6 large cloves garlic',
        '6 tablespoons nutritional yeast',
        'Pinch of cayenne pepper',
        '½ teaspoon of ground black pepper',
        '1 cup of unsweetened almond milk or other non dairy milk or veg broth, as needed',
        '1 bunch kale, stems removed, leaves chopped and cooked (4-6 cups before cooking), or greens of choice',
        '3 green onions chopped',
        'Sweet or smoked paprika, for garnish'
      ],
      instructions: [
        'Preheat the oven to 400°F. Line a sheet pan with parchment paper.',
        'Poke a knife in each potato before baking. Place all of the potatoes on the parchment lined sheet pan.',
        'Wrap the onion chunks and peeled whole garlic cloves together in foil. If you wish, place a layer of parchment paper between the foil and the onion and garlic.',
        'Place the onion and garlic bundle on the sheet pan along with the potatoes and bake for an hour or until the potatoes are soft.',
        'Carefully unwrap the onion and garlic bundle and place it into a food processor. Be careful unwrapping and saving as much liquid as possible. Blend until smooth, (this will be most of the liquid for the potatoes).',
        'Once the potatoes are cool enough to handle, cut them in half lengthwise and scoop out the flesh, and place it in a large bowl.',
        'Place the empty Yukon Gold potato skins in a baking dish.',
        'With a fork or potato masher, mash the Yukon Golds and the sweet potato until smooth.',
        'Stir in the onion and garlic liquid, along with the nutritional yeast, and cayenne and pepper. Add the milk or broth as needed.',
        'Stir in the kale and green onions.',
        'Add more almond milk or broth if the potatoes seem too thick. You may need a cup or more because nutritional yeast tends to absorb moisture.',
        'Fill each Yukon Gold potato skin with the mixture, sprinkle with paprika and bake for 30 minutes, until hot.'
      ]
    },
    {
      id: 33,
      title: "Taco Bar",
      author: 'Plant Based Woman Warrior',
      description: 'A customizable taco bar with fresh vegetables, beans, and optional chorizo tempeh/tofu for a complete plant-based meal.',
      servings: '6',
      source: '"Be a Plant Based Woman Warrior" page 237',
      category: 'mains',
      tags: ['Dinner', 'Oil-Free', 'Make-Ahead', 'Gluten-Free', 'Mexican'],
      prepTime: '30 minutes',
      totalTime: '45 minutes',
      difficulty: 'Medium',
      ingredients: [],
      instructions: [],
      components: {
        tacoBar: {
          title: 'Taco Bar Setup',
          ingredients: [
            '12 soft corn tortillas',
            '3 cups cooked brown rice or quinoa',
            '2 cups canned black beans, rinsed and warmed',
            '2 large sweet potatoes, roasted and diced',
            'Chorizo tofu (optional, see recipe below)',
            'Your favorite salsa',
            'Cubed mango',
            '1 head romaine lettuce, chopped in ribbons',
            '1 red pepper, diced',
            '2 carrots, shredded',
            '2 avocados, sliced or mashed (leave out to make heart disease friendly)',
            'Hot sauce, your favorite'
          ],
          instructions: [
            'Lay out your taco bar in this order: begin with tortillas, lettuce ribbons, rice, beans, sweet potatoes, tofu (if using), mango, bell pepper, carrots, avocados, followed by salsa and hot sauce.',
            'Allow guests to assemble their own tacos with their preferred combination of ingredients.',
            'Serve immediately while ingredients are fresh and warm components are still hot.'
          ]
        },
        chorizo: {
          title: 'Chorizo Tempeh or Tofu (Optional)',
          ingredients: [
            '3 tablespoons chili powder',
            '1 tablespoon garlic powder',
            '1 teaspoon cumin',
            '½ teaspoon turmeric',
            '1 tablespoon dried oregano',
            '½ teaspoon smoked paprika',
            '4 grinds black pepper',
            '¼ cup apple cider vinegar',
            '2 tablespoons low sodium tamari',
            '2 cups diced onion',
            '12 ounces tempeh or 12 ounces extra firm tofu (press the tofu), crumbled or diced',
            '½ teaspoon liquid smoke'
          ],
          instructions: [
            'Make the chorizo sauce: In a medium bowl, combine the chili powder, cumin, turmeric, oregano, smoked paprika, pepper, vinegar, tamari, and 3 tablespoons of water.',
            'In a large non-stick pan over medium high heat, cook the onions (add water to prevent sticking if necessary, no oil). Stir until they are translucent, about 3 minutes.',
            'Add the crumbled tempeh or tofu and liquid smoke. Stir until well mixed and the tempeh or tofu becomes well browned.',
            'Lower heat to medium low, and add chorizo sauce. Stir continuously until everything is well coated.',
            'If the sauce is sticking to the pan too much, add 1 tablespoon of water at a time and decrease the heat to low.',
            'The chorizo is ready when most of the sauce has cooked off and the tempeh or tofu is well coated and fragrant, about 5-8 minutes.'
          ]
        }
      }
    },
    {
      id: 34,
      title: "Intro to a Buddha Bowl (Rebel Remix)",
      author: "Rebellious Aging",
      description: "At Rebellious Aging we do not, do bland. A Buddha Bowl is anything but. It's a bold, beautiful burst of color and confidence in a bowl. Created by you in your way for your own enjoyment. Picture vibrant veggies strutting their stuff, grains with grit, plant based powerhouses like chickpeas or tofu showing up strong and a sauce that you love. It is not just food—it is fuel for rebels who nourish with flair, eat with intention, and simply never settle for ordinary.",
      prepTime: "15 minutes",
      servings: "1",
      difficulty: "Beginner",
      source: "Rebellious Aging 6/12/2025",
      category: "salads",
      tags: ['Lunch', 'Dinner', 'Oil-Free', 'Raw', 'Quick', 'High-Protein', 'Gluten-Free'],
      ingredients: [
        "BUILDING BLOCKS FOR YOUR REBEL BOWL:",
        "",
        "BASE GRAINS (choose 1-2):",
        "• Quinoa, brown rice, wild rice, farro, or cauliflower rice",
        "",
        "PLANT POWERHOUSES (choose 1-2):",
        "• Chickpeas, black beans, lentils, hemp hearts, or marinated tofu",
        "",
        "RAINBOW VEGETABLES (choose at least 10):",
        "• Bell peppers, cherry tomatoes, cucumbers, carrots, beets",
        "• Broccoli, snap peas, corn, avocado, red onion",
        "• Sweet potato, zucchini, radishes, sprouts",
        "",
        "GREENS FOUNDATION (choose at least 3):",
        "• Kale, arugula, red cabbage, spinach, mixed greens",
        "",
        "CRUNCH FACTOR (choose 1-2):",
        "• Chopped nuts, seeds (pumpkin, sunflower, hemp), roasted chickpeas",
        "",
        "DRESSING OPTIONS:",
        "• Esselstyn 321 Dressing",
        "• Oil-free flavored balsamic vinegar",
        "• Your favorite plant-based dressing"
      ],
      instructions: [
        "EMBRACE THE REBEL PHILOSOPHY: Remember, this is not just food—it's fuel for rebels who nourish with flair, eat with intention, and never settle for ordinary. You're eating the rainbow, nourishing your body, and feeling fabulous—no rules, just balance and bliss.",
        "BALANCE IS KEY: Aim to include grains, legumes, vegetables, fruits, nuts/seeds, and greens in your bowl. Think variety and nutrition working together.",
        "TEXTURE IS EVERYTHING: Combining different textures (the more the merrier) is key to a deliciously fabulous bowl. Mix soft with crunchy, fresh with roasted.",
        "SUZ'S METHOD: Begin with a large wooden bowl and fill it with greens of choice, typically at least three. Favorites include kale, arugula, and red cabbage.",
        "LOAD IT UP: Add at least 10 chopped vegetables to create a vibrant, nutrient-dense foundation.",
        "ADD THE CRUNCH: Sprinkle with chopped nuts or seeds for texture and healthy fats.",
        "DRESS LIGHTLY: Lightly drizzle with Esselstyn 321 Dressing or your favorite oil-free, flavored balsamic vinegar.",
        "MAKE IT YOURS: This is your creation—adjust ingredients based on what you love and what makes you feel amazing. Trust your rebel instincts!",
        "HISTORICAL NOTE: The phrase 'Buddha Bowl' first appears in Martha Stewart's 2013 cookbook 'Meatless'. Before that, similar meals were called grain bowls. The concept signifies balance, mindfulness, and variety in a single meal."
      ]
    },
    {
      id: 35,
      title: "Oil Free Hummus",
      author: "Jill Dalton",
      source: "The Whole Food Plant Based Cooking Show - plantbasedcookingshow.com",
      description: "A creamy, oil-free hummus made with chickpeas, tahini, and nutritional yeast for a healthy plant-based dip. The optional cashews add extra creaminess.",
      prepTime: "5 minutes",
      servings: "4-6",
      difficulty: "Beginner",
      tags: ["Snack", "Oil-Free", "Quick", "High-Protein"],
      category: "appetizers",
      ingredients: [
        "28 oz chickpeas (garbanzos), unsalted",
        "Liquid from one of the cans of chickpeas",
        "½ cup cashews (optional)",
        "1 clove garlic",
        "1 tablespoon Bragg's Liquid Aminos",
        "¼ cup lemon juice",
        "¼ cup nutritional yeast",
        "¼ cup tahini (slightly less)"
      ],
      instructions: [
        "Drain the chickpeas and reserve the liquid from one can.",
        "Add all ingredients into a high-speed blender or food processor.",
        "Blend until smooth and creamy, adding reserved chickpea liquid as needed to reach desired consistency.",
        "Taste and adjust seasonings as needed.",
        "Serve immediately or refrigerate for up to one week.",
        "Great with fresh vegetables, pita bread, or as a sandwich spread."
      ]
    },
    {
      id: 36,
      title: "Asian Chopped Salad with Sesame Ginger Dressing",
      author: "veganhuggs.com",
      description: "A fresh, crunchy salad with crisp vegetables and a flavorful sesame ginger dressing that brings Asian-inspired flavors to your table.",
      prepTime: "15 minutes",
      servings: "6",
      difficulty: "Beginner",
      source: "veganhuggs.com",
      category: "salads",
      tags: ['Lunch', 'Dinner', 'Oil-Free', 'Quick', 'Gluten-Free'],
      components: {
        dressing: {
          ingredients: [
            "2 tablespoons low sodium tamari (sub. soy sauce)",
            "3½ tablespoons rice vinegar",
            "1½ tablespoons toasted sesame oil (I used 1 drop just to get the flavor)",
            "1 tablespoon agave (I subbed maple syrup)",
            "1 clove garlic, minced",
            "½ tablespoon ginger, minced",
            "2½ tablespoons liquid from canned mandarin oranges",
            "1 tablespoon sesame seeds"
          ],
          instructions: [
            "Whisk together tamari, rice vinegar, sesame oil, and agave in a small bowl.",
            "Add minced garlic and ginger, mixing well.",
            "Stir in the mandarin orange liquid and sesame seeds.",
            "Set aside to let flavors meld while preparing the salad."
          ]
        }
      },
      ingredients: [
        "1 cup frozen shelled edamame, thawed",
        "1 large head (12 oz) romaine lettuce, shredded (about 7 cups)",
        "1½ cups red cabbage, shredded",
        "1½ cups carrots (julienne/matchstick or shredded)",
        "⅓ cup green onions, sliced thin",
        "½ cup sliced almonds, raw or toasted",
        "1 (10 oz) can mandarin oranges, reserve liquid",
        "½ cup crispy noodles for topping"
      ],
      instructions: [
        "Prepare all vegetables by shredding the romaine lettuce and red cabbage, julienning or shredding the carrots, and slicing the green onions.",
        "Thaw the edamame and drain the mandarin oranges, reserving the liquid for the dressing.",
        "In a large salad bowl, combine the romaine lettuce, red cabbage, carrots, green onions, and edamame.",
        "Add the mandarin oranges and sliced almonds to the salad.",
        "Drizzle with the prepared sesame ginger dressing and toss gently to combine.",
        "Top with crispy noodles just before serving for maximum crunch."
      ],
      suzNotes: "I found that ½ the amount of this delicious dressing was enough. Add dressing cautiously."
    }
  ];
