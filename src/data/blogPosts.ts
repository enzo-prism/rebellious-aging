export interface BlogPostMetadata {
  id: string;
  blogNumber: number;
  title: string;
  seoTitle?: string;
  excerpt: string;
  date: string;
  dateSort: Date;
  readTime: string;
  seoDescription?: string;
}

export const getBlogPostSeoTitle = (post: BlogPostMetadata) =>
  post.seoTitle?.trim() || `Blog #${post.blogNumber}: ${post.title}`;

export const blogPosts: BlogPostMetadata[] = [
  {
    id: 'rebellious-guide-what-is-on-your-plate',
    title: 'The Rebellious Guide (What is on Your Plate)',
    excerpt: 'Let\'s set the table for something deliciously different. I am excited to talk with you about something that has transformed my life - the Whole Food Plant Based (WFPB) lifestyle.',
    date: '1/1/2025',
    dateSort: new Date('2025-01-01'),
    readTime: '8 min read',
    blogNumber: 1
  },
  {
    id: 'the-road-to-success-8-thoughts',
    title: 'The Road to Success: 8 Thoughts',
    excerpt: 'Eight powerful principles that pave the way to success: from hard work and patience to self-confidence and focus. Discover the mindset shifts that transform ordinary into extraordinary.',
    date: '1/2/2025',
    dateSort: new Date('2025-01-02'),
    readTime: '3 min read',
    blogNumber: 2
  },
  {
    id: 'wfpb-lifestyle-guide',
    title: 'A Quick Introduction and Guide to a Whole-Food Plant-Based (WFPB) Lifestyle',
    excerpt: 'The WFPB lifestyle is NOT a diet. It is a lifestyle which promotes better health, greater energy, and a deeper connection with the way humans chose to nourish themselves.',
    date: '1/3/2025',
    dateSort: new Date('2025-01-03'),
    readTime: '12 min read',
    blogNumber: 3
  },
  {
    id: 'a-love-letter-to-my-closet',
    title: 'A Love Letter to My Closet',
    excerpt: 'There was a time I dressed to impress. Now? I dress to express. My closet is no longer a holding pen for solid black.',
    date: '1/4/2025',
    dateSort: new Date('2025-01-04'),
    readTime: '10 min read',
    blogNumber: 4
  },
  {
    id: 'blueberries-and-wrinkles',
    title: 'Blueberries and Wrinkles, The Day I Knew I was Old.',
    excerpt: 'One bowl of wild blueberries, a casual walk out the door, and a bold little truth tucked into the confident grooves around my mouth—that was the day I knew I had crossed into "old" and the moment my rebellion revved up.',
    date: '1/5/2025',
    dateSort: new Date('2025-01-05'),
    readTime: '6 min read',
    blogNumber: 5
  },
  {
    id: 'gratitude-rebellious-soul',
    title: 'Gratitude and the Rebellious Soul',
    excerpt: 'Exploring the transformative power of gratitude in our journey toward rebellious aging. Discover how appreciation and thankfulness can reshape our perspective on life, aging, and personal growth.',
    date: '1/6/2025',
    dateSort: new Date('2025-01-06'),
    readTime: '15 min read',
    blogNumber: 6
  },
  {
    id: 'art-of-thriving-aging-expert',
    title: 'The Art of Thriving. What an Ageing Expert Wants You to Know',
    excerpt: 'Inspired by Dr. Kerry Burnight\'s wisdom on aging, this blog explores the concept of "joyspan" - living with connection, purpose, and soul-deep contentment that makes aging feel like a privilege.',
    date: '1/7/2025',
    dateSort: new Date('2025-01-07'),
    readTime: '12 min read',
    blogNumber: 7
  },
  {
    id: 'shop-window-aging-gracefully',
    title: 'What a Shop Window Taught Me About Aging Gracefully',
    excerpt: 'Who knew a shop window could deliver a life lesson? One early morning glance stopped me in my tracks and got me thinking about posture, presence, and how we carry ourselves through the years.',
    date: '1/8/2025',
    dateSort: new Date('2025-01-08'),
    readTime: '10 min read',
    blogNumber: 8
  },
  {
    id: 'set-record-straight-wfpb',
    title: 'It\'s Time to Set the Record Straight Regarding a Whole Food Plant Based Lifestyle',
    excerpt: 'Let\'s be honest. When you mention to other humans that you are eating mostly plants, the reactions range from curious to downright skeptical. Time to clear the air and debunk the myths.',
    date: '1/9/2025',
    dateSort: new Date('2025-01-09'),
    readTime: '8 min read',
    blogNumber: 9
  },
  {
    id: 'limiting-beliefs-not-boss',
    title: 'Shhh…That Voice in Your Head is Not the Boss of You',
    excerpt: 'Let\'s get one thing straight. Those whispers in your head saying you are too old, too late, not stylish enough, they are NOT the truth. They are old scripts, hand-me-down fears, and quite frankly, they are BORING!',
    date: '1/10/2025',
    dateSort: new Date('2025-01-10'),
    readTime: '9 min read',
    blogNumber: 10
  },
  {
    id: 'what-is-behind-limiting-beliefs',
    title: 'What is Behind Limiting Beliefs?',
    excerpt: 'The voices that taunt us, saying things like you are too old, or you are not enough, or you\'ll fail, are not a mystical curse. Here\'s the science behind it.',
    date: '1/11/2025',
    dateSort: new Date('2025-01-11'),
    readTime: '7 min read',
    blogNumber: 11
  },
  {
    id: 'wearing-who-you-are-style-rebellion',
    title: 'Wearing Who You Are, A Style Rebellion',
    excerpt: 'When it comes to aging and fashion, society hands us a beige cardigan and whispers "please, just fade away." Well thanks, but no thank you. Here at Rebellious Aging, we don\'t tone it down. WE TURN IT UP.',
    date: '1/12/2025',
    dateSort: new Date('2025-01-12'),
    readTime: '9 min read',
    blogNumber: 12
  },
  {
    id: 'the-new-classic-timeless-style',
    title: 'The New Classic, Timeless Style with a Rebellious Twist',
    excerpt: 'Fashion legends like Coco Chanel, Christian Dior, and Yves Saint Laurent gave the world timeless rules for elegance. As rebels we just give these rules a wink and twist them into something uniquely ours.',
    date: '1/14/2025',
    dateSort: new Date('2025-01-14'),
    readTime: '12 min read',
    blogNumber: 14
  },
  {
    id: 'bold-sassy-truth-wfpb',
    title: 'The Bold, Sassy Truth About a Whole Food Plant Based Lifestyle',
    excerpt: 'Who says aging gracefully has to be slow and quiet? Not me. I believe in aging rebelliously. With a plate full of vibrant colors, flavors, and life giving nutrients. A WFPB lifestyle isn\'t just about "rabbit food."',
    date: '1/13/2025',
    dateSort: new Date('2025-01-13'),
    readTime: '10 min read',
    blogNumber: 13
  },
  {
    id: 'wfpb-lifestyle-book-recommendations',
    title: 'WFPB Lifestyle Book Recommendations',
    excerpt: 'A comprehensive collection of essential books from leading plant-based nutrition experts and doctors to guide your whole food plant-based journey.',
    date: '1/15/2025',
    dateSort: new Date('2025-01-15'),
    readTime: '15 min read',
    blogNumber: 15
  },
  {
    id: 'boundaries-love-language',
    title: 'Are Boundaries a Love Language of Sorts?',
    excerpt: 'The Summer of 2025 has been one long crash course in awkward situations. Some mine, some borrowed from others, but all pointing to one glaring truth, I NEED BOUNDARIES.',
    date: '1/16/2025',
    dateSort: new Date('2025-01-16'),
    readTime: '12 min read',
    blogNumber: 16
  },
  {
    id: 'ditch-the-sweet-stuff',
    title: 'Ditch the Sweet Stuff',
    excerpt: 'Let\'s be honest, sugar is seductive. There is no upside to sugar. It sneaks into your morning coffee, whispers from your cookie jar, and struts through the grocery store in shiny packaging.',
    date: '1/17/2025',
    dateSort: new Date('2025-01-17'),
    readTime: '10 min read',
    blogNumber: 17
  },
  {
    id: 'eat-the-olive-not-the-oil',
    title: 'Eat the Olive, Not the Oil',
    excerpt: 'Oil has a shiny reputation. Olive oil, avocado oil, coconut oil—sure, they are marketed as “healthy fats,” but the truth is oil is oil and even the “best” versions are still calorie-dense, nutrient-poor processed foods.',
    date: '1/18/2025',
    dateSort: new Date('2025-01-18'),
    readTime: '11 min read',
    blogNumber: 18
  },
  {
    id: 'less-salt-more-sparkle',
    title: 'Less Salt, More Sparkle',
    excerpt: 'Let\'s be honest: salt has been riding high on its reputation as the magic dust that makes food taste better. Very fancy marketing, but let\'s cut through the hype, Salt is Salt.',
    date: '1/19/2025',
    dateSort: new Date('2025-01-19'),
    readTime: '12 min read',
    blogNumber: 19
  },
  {
    id: 'critical-thinking-secret-weapon-rebellious-aging',
    title: 'Critical Thinking: Your Secret Weapon for Rebellious Aging',
    excerpt: 'Critical Thinking is the rebel\'s power move. It is the ability to pause, question, and separate truth from noise. So instead of blindly accepting what you are told, ask: What\'s the evidence? Who benefits if I believe this? That is where the freedom and sparkle live.',
    date: '1/20/2025',
    dateSort: new Date('2025-01-20'),
    readTime: '10 min read',
    blogNumber: 20
  },
  {
    id: 'ultra-processed-trap-eat-whole-live-whole',
    title: 'The Ultra-Processed Trap: Eat Whole, Live Whole',
    excerpt: 'Did you know that more than HALF of the average American diet comes from ultra-processed food? 70-73% of the U.S. food supply is classified as ultra-processed. Discover why choosing whole foods over factory formulations is your path to vibrant health.',
    date: '1/21/2025',
    dateSort: new Date('2025-01-21'),
    readTime: '12 min read',
    blogNumber: 21
  },
  {
    id: 'if-not-now-when-new-beginnings',
    title: 'If Not Now, When? New Beginnings are up to YOU',
    excerpt: 'Have you ever scrolled through your feed when a phrase suddenly grabs you by the collar? "If not now, when?" stopped me cold. How many women are quietly living on autopilot? Rebellious Aging is about refusing to settle for bland.',
    date: '1/22/2025',
    dateSort: new Date('2025-01-22'),
    readTime: '8 min read',
    blogNumber: 22
  },
  {
    id: 'optimal-aging-colleen-murphy',
    title: 'Optimal Aging: As Seen Through the Lens of Princeton Professor Colleen Murphy',
    excerpt: 'A conversation between journalist Paul Von Zielbauer and Princeton Professor Colleen Murphy distilled the science of aging into practical, myth-busting tips. Exercise is NOT optional, sleep is your overnight cleaning crew, and food myths debunked.',
    date: '1/23/2025',
    dateSort: new Date('2025-01-23'),
    readTime: '10 min read',
    blogNumber: 23
  },
  {
    id: 'calorie-density-secret-seals-deal',
    title: 'Calorie Density: The Secret That Seals the Deal',
    excerpt: 'Managing weight doesn\'t have to be an uphill climb. When you choose the right foods, your body naturally regulates weight. The key is calorie density - the number of calories in a given weight of food. Plants hold the secret to eating until satisfied without overeating.',
    date: '1/24/2025',
    dateSort: new Date('2025-01-24'),
    readTime: '9 min read',
    blogNumber: 24
  },
  {
    id: 'join-rebellious-aging-facebook-group',
    title: 'Let\'s Continue the Conversation: Join The PRIVATE, Rebellious Aging Facebook Group',
    excerpt: 'Step into a private Facebook community where women 55-105 gather to share stories, support, and the courage to live vibrantly while eating powerfully, living loudly, and aging boldly.',
    date: '1/25/2025',
    dateSort: new Date('2025-01-25'),
    readTime: '5 min read',
    blogNumber: 25
  },
  {
    id: 'strength-and-balance-for-the-win',
    title: 'Strength and Balance for the Win!',
    excerpt: 'As we age, movement becomes about confidence, balance, and extending our health span; strength and steady footing keep us vibrant.',
    date: '1/26/2025',
    dateSort: new Date('2025-01-26'),
    readTime: '9 min read',
    blogNumber: 26
  },
  {
    id: 'style-still-counts-make-it-yours-at-every-age',
    title: 'Style Still Counts, Make it Yours at Every Age',
    excerpt: 'Refuse invisibility: curate a wardrobe that loves you back, shop with intention, and let personal style shine brighter with every decade.',
    date: '1/27/2025',
    dateSort: new Date('2025-01-27'),
    readTime: '8 min read',
    blogNumber: 27,
    seoDescription: 'Style has no expiration date - declutter with purpose, invest in flattering pieces, and embrace elegance that reflects your rebellious spirit.'
  },
  {
    id: 'following-the-science-and-your-common-sense',
    title: 'Following the Science (and Your Common Sense)',
    excerpt: 'Science evolves, gurus shout, and agendas creep in—here’s how Suz navigates the noise by trusting evidence, curiosity, and a WFPB lifestyle that has stood the test of decades.',
    date: '1/28/2025',
    dateSort: new Date('2025-01-28'),
    readTime: '6 min read',
    blogNumber: 28,
    seoDescription: 'Cut through nutrition confusion with curiosity, credible mentors like Dr. Campbell and Dr. Esselstyn, and your own common sense.'
  },
  {
    id: 'graceful-maybe-rebellious-definitely',
    title: 'Graceful? Maybe. Rebellious? Definitely.',
    excerpt: 'Inspired by Farley Ledgerwood’s reminder that aging isn’t fading, Suz shares six habits to drop after 60 so you can move, nourish, feel, and say yes to yourself with a rebellious glow.',
    date: '1/29/2025',
    dateSort: new Date('2025-01-29'),
    readTime: '7 min read',
    blogNumber: 29,
    seoDescription: 'Let go of optional movement, 25-year-old eating, people pleasing, comparisons, bottled emotions, and grudges so your next decades feel bold, conscious, and sparkling.'
  },
  {
    id: 'how-the-food-supply-stacks-the-deck-against-you',
    title: 'How the Food Supply Stacks the Deck Against You!',
    excerpt: 'Nutrition scientist Kevin Hall, PhD, explains why today’s ultra-processed food environment makes overeating effortless, and why compassion plus strategy—not shame—belongs at the center of the conversation.',
    date: '1/30/2025',
    dateSort: new Date('2025-01-30'),
    readTime: '6 min read',
    blogNumber: 30,
    seoDescription: 'Shift from self-blame to awareness as UPFs, engineered calories, and system-level incentives fuel weight gain—and learn small steps to reclaim agency.'
  },
  {
    id: 'losing-weight-without-losing-your-sparkle',
    title: 'Losing Weight Without Losing Your Sparkle',
    excerpt: 'Weight loss does not have to dim your joy. A Whole Food Plant Based lifestyle lets you trade restriction for color, freedom, and sparkle while the science quietly supports lasting results.',
    date: '1/31/2025',
    dateSort: new Date('2025-01-31'),
    readTime: '9 min read',
    blogNumber: 31,
    seoDescription: 'Discover how a Whole Food Plant Based lifestyle delivers natural weight loss, steady energy, and confidence without calorie counting or deprivation.'
  },
  {
    id: 'retirement-fade-or-focus',
    title: 'Retirement! Fade or Focus',
    excerpt: 'Retirement can feel exhilarating and disorienting at the same time. Let’s map the emotional landscape, prepare beyond finances, and enter this new chapter with curiosity, structure, and sparkle.',
    date: '2/1/2025',
    dateSort: new Date('2025-02-01'),
    readTime: '9 min read',
    blogNumber: 32,
    seoDescription: 'Learn how to prepare emotionally, mentally, and practically for retirement so you trade fading away for focused reinvention, connection, and purpose.'
  },
  {
    id: 'plants-do-not-disappoint',
    title: 'Plants Do NOT Disappoint',
    excerpt: 'Plants show up honest, vibrant, and nourishing—invite them onto your plate to restore energy without conditions.',
    date: '2/2/2025',
    dateSort: new Date('2025-02-02'),
    readTime: '6 min read',
    blogNumber: 33,
    seoDescription: 'Why whole, unprocessed plants never disappoint and how welcoming more of them into your kitchen sparks honest nourishment at any age.'
  },
  {
    id: 'motion-is-not-negotiable',
    title: 'Motion is Not Negotiable',
    excerpt: 'Movement is essential self-care—here’s how Suz keeps showing up with walking, strength, balance, and playful consistency.',
    date: '2/3/2025',
    dateSort: new Date('2025-02-03'),
    readTime: '8 min read',
    blogNumber: 34,
    seoDescription: 'Discover why motion stays non-negotiable for Suz and how simple, steady routines keep bodies strong, sharp, and joyful at any age.'
  },
  {
    id: 'lifestyle-medicine-six-pillars',
    title: 'Lifestyle Medicine: The Six Pillars',
    excerpt: 'Lifestyle Medicine offers six evidence-backed pillars—food, movement, sleep, stress, connection, and low-risk choices—to help you age rebelliously.',
    date: '2/4/2025',
    dateSort: new Date('2025-02-04'),
    readTime: '10 min read',
    blogNumber: 35,
    seoDescription: 'Explore the six Lifestyle Medicine pillars from ACLM and how simple daily habits power food-as-medicine, movement, rest, calm, community, and safer choices.'
  },
  {
    id: 'seven-day-balance-challenge',
    title: '7 Day Balance Challenge',
    excerpt: 'Seven bite-sized daily balance drills to boost confidence, stability, and freedom in one focused week.',
    date: '2/6/2025',
    dateSort: new Date('2025-02-06'),
    readTime: '4 min read',
    blogNumber: 37,
    seoDescription: 'Follow Suz’s 7-day balance challenge—stand, walk, shift, and steady yourself with simple daily drills for lifelong stability.'
  },
  {
    id: 'the-pleasure-trap-why-it-is-not-your-fault',
    title: 'The Pleasure Trap (Why it is NOT Your Fault)',
    excerpt: 'Discover Dr. Doug Lisle’s framework for understanding why modern food, sedentary defaults, and endless stimulation hijack biology—and how to step out of the trap.',
    date: '2/7/2025',
    dateSort: new Date('2025-02-07'),
    readTime: '7 min read',
    blogNumber: 38,
    seoDescription: 'Learn how The Pleasure Trap explains cravings, why willpower isn’t broken, and how whole foods plus gentle routines reset biology at any age.'
  },
  {
    id: 'b12-the-little-vitamin-with-a-big-job',
    title: 'B12, The Little Vitamin With A Big Job',
    excerpt: 'Why vitamin B12 is essential for energy, cognition, nerves, and emotional resilience—and how smart supplementation keeps rebels thriving past 50.',
    date: '2/8/2025',
    dateSort: new Date('2025-02-08'),
    readTime: '8 min read',
    blogNumber: 39,
    seoDescription: 'Dr. Greger’s B12 guidance explained: spot deficiency signs, choose cyanocobalamin, and test smarter so aging boldly never runs on empty.'
  },
  {
    id: 'the-secret-strength-of-rest-days',
    title: 'The Secret Strength of Rest Days, Why Pausing Makes You Powerful',
    excerpt: 'Discover how strategic rest keeps workouts joyful, hormones balanced, and bodies thriving—because pausing is power, not quitting.',
    date: '2/9/2025',
    dateSort: new Date('2025-02-09'),
    readTime: '5 min read',
    blogNumber: 40,
    seoDescription: 'Learn why women 55+ need intentional rest days to prevent injury, sharpen balance, and stay motivated in the Rebellious Aging movement.'
  },
  {
    id: 'the-15-second-shock-why-food-matters',
    title: 'The 15 Second Shock, Why Food Matters',
    excerpt: 'A jarring 15-second cancer statistic is a wake-up call to crowd out ultra-processed foods with colorful plants, movement, and intention.',
    date: '2/10/2025',
    dateSort: new Date('2025-02-10'),
    readTime: '7 min read',
    blogNumber: 41,
    seoDescription: 'Every 15 seconds a new cancer diagnosis lands - here is why food, movement, and choosing whole plants give you influence over your health span.'
  },
  {
    id: 'the-quiet-magic-of-consistency',
    title: 'The Quiet Magic of Consistency',
    excerpt: 'Consistency is the quiet hero that transforms health, confidence, and style through small daily actions after 55.',
    date: '2/11/2025',
    dateSort: new Date('2025-02-11'),
    readTime: '9 min read',
    blogNumber: 42,
    seoDescription: 'Discover how small, repeated choices around plants, movement, style, and self-compassion create rebellious results after 55.'
  },
  {
    id: 'the-weekend-epiphany-why-resting-is-the-new-rebellion',
    title: 'The Weekend Epiphany, Why Resting is the New Rebellion',
    excerpt: 'A quiet Saturday wake-up call turned weekends into sacred time for joy, softness, and honoring what truly nourishes you.',
    date: '2/12/2025',
    dateSort: new Date('2025-02-12'),
    readTime: '10 min read',
    blogNumber: 43,
    seoDescription: 'Reclaim weekends as rebellion—listen to your body, set boundaries with rest, and let joy-filled pauses fuel a vibrant life.'
  },
  {
    id: 'thanksgiving-recipes-plantstrong-favorites',
    title: 'Thanksgiving Recipes',
    excerpt: 'Suz shares her plantstrong Thanksgiving lineup—garlicky mashed potatoes, mushroom gravy, sweet potato casserole, super salad, pumpkin pie tart, stuffing, and cornbread.',
    date: '2/13/2025',
    dateSort: new Date('2025-02-13'),
    readTime: '14 min read',
    blogNumber: 44,
    seoDescription: 'Plantstrong Thanksgiving favorites with Ann Esselstyn’s mashed potatoes and gravy, sweet potato casserole, super salad, pumpkin pie tart, stuffing, and corn muffins.'
  },
  {
    id: 'when-joy-and-sorrow-share-a-seat-at-the-table',
    title: 'When Joy and Sorrow Share a Seat at the Table',
    excerpt: 'Holidays can hold belly laughs and tears at once—let joy and grief sit together so love keeps flowing.',
    date: '2/14/2025',
    dateSort: new Date('2025-02-14'),
    readTime: '7 min read',
    blogNumber: 45,
    seoDescription: 'Suz reflects on holidays after loss, how tears are love in motion, and why joy and sorrow can share space without canceling each other out.'
  },
  {
    id: 'passing-the-baton-thanksgiving-reflection',
    title: 'Passing the Baton, A Thanksgiving Reflection',
    excerpt: 'After 61 years of hosting, Suz hands the Thanksgiving baton to her daughter—honoring legacy, joy, and the evolution of family traditions.',
    date: '2/15/2025',
    dateSort: new Date('2025-02-15'),
    readTime: '9 min read',
    blogNumber: 46,
    seoDescription: 'Suz reflects on passing the Thanksgiving hosting legacy to her daughter, embracing change while keeping gratitude and warmth at the heart of the holiday.'
  },
  {
    id: 'time-is-calling-are-you-listening',
    title: 'Time is Calling. Are You Listening?',
    excerpt: 'Feeling the finiteness of time can be a clarifying gift—align your choices with what matters, and live with intentional joy and boldness.',
    date: '2/16/2025',
    dateSort: new Date('2025-02-16'),
    readTime: '6 min read',
    blogNumber: 47,
    seoDescription: 'Suz invites rebels 55+ to honor time as a teacher—choose joy, use your voice, invest in health, and align daily actions with what matters most.'
  },
  {
    id: 'the-original-rebellious-ager-diane-keaton',
    title: 'The Original Rebellious Ager, Diane Keaton',
    excerpt: 'Diane Keaton turned a personal uniform into power. Here are the style lessons she teaches about confidence, tailoring, humor, and standing out unapologetically.',
    date: '2/17/2025',
    dateSort: new Date('2025-02-17'),
    readTime: '7 min read',
    blogNumber: 48,
    seoDescription: 'Learn Diane Keaton’s rebel style playbook—signature looks, bold accessories, sharp tailoring, and humor—so you can own your lane at any age.'
  },
  {
    id: 'a-rebellious-aging-guide-to-dressing-like-you-mean-it',
    title: 'A Rebellious Aging Guide to Dressing Like YOU Mean It',
    excerpt: 'Claim your right to be seen—dress with color, signature pieces, and unapologetic confidence that feels like you.',
    date: '2/18/2025',
    dateSort: new Date('2025-02-18'),
    readTime: '6 min read',
    blogNumber: 49,
    seoDescription:
      'A rebellious aging style manifesto: wear what makes your soul hum, refuse invisibility, and blend comfort with bold expression without apology.'
  },
  {
    id: 'when-the-voice-gets-loud-limiting-beliefs',
    title: 'When the Voice Gets Loud/ A Rebellious Aging Reflection on Limiting Beliefs',
    excerpt: 'Even at 83.5, the old whispers try to shrink us. Here is how to answer them with courage, action, and self-compassion.',
    date: '2/19/2025',
    dateSort: new Date('2025-02-19'),
    readTime: '8 min read',
    blogNumber: 50,
    seoDescription:
      'Limiting beliefs shout loudly at any age—learn how to move before fear freezes you, borrow courage from Brene Brown and Mel Robbins, and choose new thoughts.'
  },
  {
    id: 'beginning-again-gentle-reminder-year-ahead',
    title: 'Beginning Again. A Gentle Reminder for the Year Ahead',
    excerpt:
      'January arrives boldly, but the most rebellious start may be a gentle one—listening inward, moving with care, and coming home to yourself.',
    date: '1/1/2026',
    dateSort: new Date('2026-01-01'),
    readTime: '6 min read',
    blogNumber: 51,
    seoDescription:
      'A gentle rebellion for the new year: begin without hustle, listen inward, and treat aging as a relationship with time, not a race.'
  },
  {
    id: 'meet-enzo-collaboration-across-generations',
    title: 'Meet Enzo: A Collaboration Across Generations',
    excerpt:
      'Meet Enzo Sison, the creative partner helping bring Rebellious Aging to life, and the cross-generational collaboration behind it.',
    date: '1/2/2026',
    dateSort: new Date('2026-01-02'),
    readTime: '4 min read',
    blogNumber: 52,
    seoDescription:
      'Meet Enzo Sison and the cross-generational partnership that turns Rebellious Aging ideas into grounded, meaningful work.'
  },
  {
    id: 'protein-panic-are-we-really-not-getting-enough',
    title: 'The Protein Panic: Are We Really Not Getting Enough?',
    excerpt:
      'Protein panic is everywhere, but deficiency is rare in the U.S. A balanced, calorie-adequate diet meets protein needs without hype.',
    date: '1/3/2026',
    dateSort: new Date('2026-01-03'),
    readTime: '7 min read',
    blogNumber: 53,
    seoDescription:
      'The protein panic is overblown. Most adults already meet protein needs, especially with a balanced, calorie-adequate plant-forward diet.'
  },
  {
    id: 'unapologetic-style-2026-stop-asking-permission',
    title: 'Unapologetic Style: What If 2026 is the Year You Stop Asking Permission',
    excerpt:
      '2026 is the year to stop asking permission and start expressing yourself through bold, confident style and intentional choices.',
    date: '1/4/2026',
    dateSort: new Date('2026-01-04'),
    readTime: '6 min read',
    blogNumber: 54,
    seoDescription:
      'Unapologetic style for 2026: stop asking permission, embrace color, confident statements, and fashion that matches your inner energy.'
  },
  {
    id: 'i-dont-need-to-be-perfect-i-just-need-to-keep-going',
    title: 'I Don’t Need to be Perfect. I Just Need to Keep Going',
    excerpt:
      'Perfection is a trap that keeps us stuck. Real confidence is built by showing up, staying present through discomfort, and taking the next step anyway.',
    date: '2/1/2026',
    dateSort: new Date('2026-02-01'),
    readTime: '6 min read',
    blogNumber: 55,
    seoDescription:
      'A rebellious reminder that confidence does not require perfection—just the courage to keep going, stay with yourself, and take one honest step at a time.'
  },
  {
    id: 'thrifting-as-a-quiet-act-of-rebellion',
    title: 'Thrifting as a Quiet Act of Rebellion',
    excerpt:
      'In a world that pushes faster and newer, thrifting invites intention, creativity, and individuality over excess.',
    date: '2/20/2026',
    dateSort: new Date('2026-02-20'),
    readTime: '5 min read',
    blogNumber: 56,
    seoDescription:
      'Thrifting is a thoughtful style rebellion that values story, craftsmanship, sustainability, and intentional choices over fast fashion pressure.'
  },
  {
    id: 'aging-myths-self-doubt-oatmeal-lessons',
    title: 'Aging Myths, Self Doubt and Oatmeal: Lessons From an Offhand Comment',
    excerpt:
      'One careless comment sparked self-doubt, but the deeper lesson was clear: vet your sources and do not hand over your confidence.',
    date: '2/21/2026',
    dateSort: new Date('2026-02-21'),
    readTime: '6 min read',
    blogNumber: 57,
    seoDescription:
      'A reminder to challenge nutrition myths, trust credible evidence, and protect your confidence from random opinions and fear-based noise.'
  },
  {
    id: 'what-happens-to-vegetables-after-harvest',
    title: 'What Happens to Vegetables After Harvest? After You Chop Them?',
    excerpt:
      'Fresh matters, but not perfectly fresh: learn how storage, temperature, chopping, and cooking affect nutrients in real life.',
    date: '2/22/2026',
    dateSort: new Date('2026-02-22'),
    readTime: '7 min read',
    blogNumber: 58,
    seoDescription:
      'How nutrient retention really works after harvest: what declines quickly, what stays stable, and practical ways to keep vegetables nourishing.'
  },
  {
    id: 'prime-not-past-it-refuse-invisibility',
    title: 'Prime, Not Past It',
    excerpt:
      'Here are 10 style moves that say you are in your prime, not past it—intentional, alive, and unapologetically visible.',
    date: '2/2026',
    dateSort: new Date('2026-02-01'),
    readTime: '5 min read',
    blogNumber: 60,
    seoDescription:
      'A practical 10-point style guide to look intentional and alive at every age: structure, color, fit, editing, posture, and presence.'
  }
];

export const getBlogPostById = (id: string) => blogPosts.find((post) => post.id === id);

export const getNextBlogPost = (blogNumber: number) =>
  blogPosts.find((post) => post.blogNumber === blogNumber + 1);

export const getSortedBlogPosts = () => [...blogPosts].sort((a, b) => a.blogNumber - b.blogNumber);

export const getBlogPostsByDateDesc = () =>
  [...blogPosts].sort((a, b) => {
    const timeDiff = b.dateSort.getTime() - a.dateSort.getTime();
    if (timeDiff !== 0) {
      return timeDiff;
    }
    return b.blogNumber - a.blogNumber;
  });
