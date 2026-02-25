import React from 'react';
import Link from 'next/link';
import Seo from '@/components/seo/Seo';
import { Button } from '@/components/ui/button';
import { getSeoRouteByPath } from '@/data/seoRoutes';

const START_HERE_STEPS = [
  'Watch one documentary (Forks Over Knives, You Are What You Eat).',
  'Choose one book that speaks to your current health curiosity.',
  'Try one simple recipe.',
  'Watch a single Dr. Esselstyn or Dr. Barnard talk on YouTube.',
  'Give yourself grace. This is about progress not perfection.',
];

const DOCUMENTARIES = [
  {
    title: 'Forks Over Knives',
    description:
      'A foundational film exploring how whole-food, plant-based nutrition can prevent and reverse chronic disease.',
  },
  {
    title: 'Game Changers',
    description: 'A compelling look at plant-based eating and athletic performance.',
  },
  {
    title: 'You Are What You Eat / A Twin Experiment (Stanford)',
    description: 'A Stanford-led twin study showing how diet rapidly impacts health outcomes.',
  },
  {
    title: 'What The Health',
    description: 'Investigates the links between diet, chronic disease, and the healthcare system.',
  },
  {
    title: 'Plant Pure Nation',
    description: 'A behind-the-scenes look at food policy, industry influence, and grassroots change.',
  },
];

const BOOKS = [
  {
    title: 'The China Study',
    author: 'Dr. T. Colin Campbell, PhD',
    description: 'Landmark research on nutrition and chronic disease.',
  },
  {
    title: 'Whole',
    author: 'Dr. T. Colin Campbell, PhD',
    description: 'A clear explanation of why whole foods matter more than isolated nutrients.',
  },
  {
    title: 'Prevent and Reverse Heart Disease',
    author: 'Dr. Caldwell Esselstyn',
    description: 'A powerful clinical approach to heart disease reversal.',
  },
  {
    title: 'Fiber Fueled',
    author: 'Dr. Will Bulsiewicz',
    description: 'Gut health explained in an approachable, empowering way.',
  },
  {
    title: 'Reversing Diabetes',
    author: 'Dr. Neal Barnard',
    description: 'Evidence-based strategies for preventing and reversing type 2 diabetes.',
  },
  {
    title: 'For Forks Sake',
    author: 'Rachael Brown',
    description:
      'This 10-day guide simplifies the science of WFPB eating and will jump-start the journey to better health for you, your family, and the planet.',
  },
];

const COOKBOOKS = [
  {
    title: 'The Ultimate Weight Loss Program Cookbook',
    author: 'Chef AJ',
    description: 'Ultra-low-fat, no-nonsense cooking.',
  },
  {
    title: 'Plant-Based Women Warriors',
    author: 'Jane and Ann Esselstyn',
    description: 'A practical, oil-free cookbook designed for women who want vibrant health and heart protection.',
  },
  {
    title: 'Prevent and Reverse Heart Disease Cookbook',
    author: 'Jane and Ann Esselstyn',
    description: 'Cooking aligned with Dr. Esselstyn\'s heart-health protocol.',
  },
  {
    title: 'Straight Up Food',
    author: 'Cathy Fisher',
    description: 'Delicious food without added salt, oil, or sugar.',
  },
  {
    title: 'The China Study Cookbook',
    author: 'Campbell',
    description: 'Recipes aligned with the principles of The China Study.',
  },
];

const WEBSITES = [
  { label: 'rebelwithsuz.com', href: 'https://rebelwithsuz.com' },
  { label: 'dresselstyn.com', href: 'https://dresselstyn.com' },
  { label: 'centerfornutritionstudies.org', href: 'https://centerfornutritionstudies.org' },
  { label: 'chefaj.com', href: 'https://chefaj.com' },
  { label: 'pcrm.com', href: 'https://pcrm.org' },
  { label: 'nutritionfacts.org', href: 'https://nutritionfacts.org' },
];

const YOUTUBE_TALKS = [
  'Defense of a Plant-Based Diet: Dr. Esselstyn shares a new case. Esselstyn Foundation 10/13/2025',
  'Prevent and Reverse Heart Disease with Caldwell Esselstyn Jr., M.D. 12.21.2018',
  'Making Heart Attacks History, Caldwell Esselstyn at TEDx Cambridge (14 years ago)',
  'How Quickly Your Body Reacts to Healthy Food, with Dr. Neal Barnard, 2025',
  'Dr. Greger, The Exam Room with Chuck Carroll',
  'All cooking videos with Ann and Jane Esselstyn',
];

const WfpbResourceGuide = () => {
  const seoConfig = getSeoRouteByPath('/pillars/health/resource-guide');

  return (
    <div className="bg-background">
      {seoConfig && (
        <Seo
          title={seoConfig.title}
          description={seoConfig.description}
          canonicalPath={seoConfig.path}
        />
      )}

      <section className="bg-gradient-to-b from-teal/20 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-sm uppercase tracking-[0.2em] text-teal">Whole-Food, Plant-Based Resource Guide</p>
            <h1 className="text-4xl md:text-5xl font-bold">Whole-Food, Plant-Based Resource Guide</h1>
            <p className="text-lg text-gray-700 font-semibold">Welcome,</p>
            <p className="text-lg text-gray-700">
              If you are feeling curious, inspired, or even a little overwhelmed by the world of Whole-Food, Plant-Based living, you are in
              exactly the right place. This resource list is not meant to be conquered or completed. It is only meant to be gently explored
              in your timing. One documentary, one book, one recipe at a time.
            </p>
            <p className="text-lg text-gray-700">
              You do not need to do everything. You just need to BEGIN. Trust that small thoughtful steps can lead to powerful change. Go
              ahead, be inspired.
            </p>
            <p className="text-sm text-gray-500">
              Want the roadmap? Visit the{' '}
              <Link href="/pillars/health/nutrition-guide" className="text-teal font-semibold hover:underline">
                Whole-Food, Plant-Based Guide
              </Link>{' '}
              or head back to the{' '}
              <Link href="/pillars/health" className="text-teal font-semibold hover:underline">
                Health pillar
              </Link>
              .
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild>
                <Link href="/pillars/health/nutrition-guide">Read the Nutrition Guide</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/pillars/health">Back to Health Pillar</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 space-y-16">
        <section id="where-to-begin" className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold">Where Should You Begin?</h2>
          <p className="text-lg text-gray-700">
            Watch one documentary, choose one book, try one simple recipe, and let that first spark guide your next step.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            {START_HERE_STEPS.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </section>

        <section className="max-w-4xl mx-auto space-y-6">
          <div>
            <h2 className="text-3xl font-bold">Documentaries</h2>
            <p className="text-lg text-gray-700">
              These films are engaging, accessible, and often serve as a powerful &quot;aha&quot; moment.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {DOCUMENTARIES.map((doc) => (
              <div key={doc.title} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <p className="text-xl font-semibold mb-2">{doc.title}</p>
                <p className="text-gray-700">{doc.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto space-y-6">
          <div>
            <h2 className="text-3xl font-bold">Books</h2>
            <p className="text-lg text-gray-700">Science-based, practical, and written by leaders in the field.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {BOOKS.map((book) => (
              <div key={book.title} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <p className="text-xl font-semibold">{book.title}</p>
                <p className="text-sm text-gray-500 mb-2">{book.author}</p>
                <p className="text-gray-700">{book.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto space-y-6">
          <div>
            <h2 className="text-3xl font-bold">Cookbooks</h2>
            <p className="text-lg text-gray-700">Simple, compliant, and designed for real life, not perfection.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {COOKBOOKS.map((book) => (
              <div key={book.title} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <p className="text-xl font-semibold">{book.title}</p>
                <p className="text-sm text-gray-500 mb-2">{book.author}</p>
                <p className="text-gray-700">{book.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold">Websites</h2>
          <p className="text-lg text-gray-700">Reliable, science-based hubs for ongoing learning.</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            {WEBSITES.map((site) => (
              <li key={site.href}>
                <a href={site.href} target="_blank" rel="noopener noreferrer" className="text-teal font-semibold hover:underline">
                  {site.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold">YouTube Talks and Videos</h2>
          <p className="text-lg text-gray-700">Excellent for sharing, discussion, and confidence building.</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            {YOUTUBE_TALKS.map((talk) => (
              <li key={talk}>{talk}</li>
            ))}
          </ul>
        </section>

        <section className="max-w-4xl mx-auto space-y-4">
          <p className="text-lg text-gray-700">I believe in you,</p>
          <p className="text-lg text-gray-700 font-semibold">Suz xo</p>
        </section>
      </div>
    </div>
  );
};

export default WfpbResourceGuide;
